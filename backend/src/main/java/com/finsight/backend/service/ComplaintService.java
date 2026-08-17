package com.finsight.backend.service;

import com.finsight.backend.dto.DashboardSummary;
import com.finsight.backend.model.Complaint;
import com.finsight.backend.repository.ComplaintRepository;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;

@Service
public class ComplaintService {

    private final ComplaintRepository complaintRepository;

    public ComplaintService(ComplaintRepository complaintRepository) {
        this.complaintRepository = complaintRepository;
    }

    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }

    public List<Complaint> getFilteredComplaints(String company, String product, String state,
                                                 String issue, String timelyResponse) {
        return complaintRepository.findAll()
                .stream()
                .filter(complaint -> matchesFilter(complaint.getCompany(), company))
                .filter(complaint -> matchesFilter(complaint.getProduct(), product))
                .filter(complaint -> matchesFilter(complaint.getState(), state))
                .filter(complaint -> matchesFilter(complaint.getIssue(), issue))
                .filter(complaint -> matchesFilter(complaint.getTimelyResponse(), timelyResponse))
                .toList();
    }

    public int getComplaintCount() {
        return (int) complaintRepository.count();
    }

    public Map<String, Long> getComplaintCountByCompany() {
        return groupAndSortByCount(Complaint::getCompany);
    }

    public Map<String, Long> getComplaintCountByProduct() {
        return groupAndSortByCount(Complaint::getProduct);
    }

    public Map<String, Long> getComplaintCountByState() {
        return groupAndSortByCount(Complaint::getState);
    }

    public Map<String, Long> getComplaintCountByIssue() {
        return groupAndSortByCount(Complaint::getIssue);
    }

    public Map<String, Long> getComplaintCountByYear() {
        return complaintRepository.findAll()
                .stream()
                .collect(Collectors.groupingBy(
                        complaint -> complaint.getDateReceived() == null
                                ? "Unknown"
                                : String.valueOf(complaint.getDateReceived().getYear()),
                        TreeMap::new,
                        Collectors.counting()
                ));
    }

    public double getTimelyResponseRate() {
        List<Complaint> complaints = complaintRepository.findAll();

        if (complaints.isEmpty()) {
            return 0.0;
        }

        long timelyCount = complaints.stream()
                .filter(complaint -> "Yes".equalsIgnoreCase(complaint.getTimelyResponse()))
                .count();

        return Math.round(((timelyCount * 100.0) / complaints.size()) * 100.0) / 100.0;
    }

    public DashboardSummary getDashboardSummary() {
        return new DashboardSummary(
                getComplaintCount(),
                getTopValue(getComplaintCountByCompany()),
                getTopValue(getComplaintCountByProduct()),
                getTopValue(getComplaintCountByIssue()),
                getTimelyResponseRate()
        );
    }

    private boolean matchesFilter(String fieldValue, String filterValue) {
        if (filterValue == null || filterValue.isBlank()) {
            return true;
        }

        if (fieldValue == null) {
            return false;
        }

        return fieldValue.toLowerCase().contains(filterValue.toLowerCase());
    }

    private Map<String, Long> groupAndSortByCount(java.util.function.Function<Complaint, String> classifier) {
        return complaintRepository.findAll()
                .stream()
                .collect(Collectors.groupingBy(
                        classifier,
                        Collectors.counting()
                ))
                .entrySet()
                .stream()
                .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        Map.Entry::getValue,
                        (oldValue, newValue) -> oldValue,
                        java.util.LinkedHashMap::new
                ));
    }

    private String getTopValue(Map<String, Long> groupedData) {
        return groupedData.entrySet()
                .stream()
                .max(Comparator.comparingLong(Map.Entry::getValue))
                .map(Map.Entry::getKey)
                .orElse("N/A");
    }
}