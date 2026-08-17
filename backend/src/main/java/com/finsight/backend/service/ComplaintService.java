package com.finsight.backend.service;

import com.finsight.backend.dto.DashboardSummary;
import com.finsight.backend.model.Complaint;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;

@Service
public class ComplaintService {

    private final List<Complaint> complaints = new ArrayList<>();

    @PostConstruct
    public void loadComplaintsFromCsv() {
        try {
            InputStream inputStream = getClass()
                    .getClassLoader()
                    .getResourceAsStream("data/sample_complaints.csv");

            if (inputStream == null) {
                throw new RuntimeException("CSV file not found: data/sample_complaints.csv");
            }

            BufferedReader reader = new BufferedReader(
                    new InputStreamReader(inputStream, StandardCharsets.UTF_8)
            );

            reader.readLine(); // skip header row

            String line;
            long id = 1L;

            while ((line = reader.readLine()) != null) {
                if (line.isBlank()) {
                    continue;
                }

                String[] values = line.split(",", -1);

                if (values.length < 13) {
                    throw new RuntimeException("Invalid CSV row: " + line);
                }

                Complaint complaint = new Complaint(
                        id++,
                        values[0].trim(),
                        values[1].trim(),
                        values[2].trim(),
                        values[3].trim(),
                        values[4].trim(),
                        values[5].trim(),
                        values[6].trim(),
                        values[7].trim(),
                        values[8].trim(),
                        values[9].trim(),
                        values[10].trim(),
                        values[11].trim(),
                        values[12].trim()
                );

                complaints.add(complaint);
            }

        } catch (Exception e) {
            throw new RuntimeException("Failed to load complaint data from CSV", e);
        }
    }

    public List<Complaint> getAllComplaints() {
        return complaints;
    }

    public List<Complaint> getFilteredComplaints(String company, String product, String state,
                                                 String issue, String timelyResponse) {
        return complaints.stream()
                .filter(complaint -> matchesFilter(complaint.getCompany(), company))
                .filter(complaint -> matchesFilter(complaint.getProduct(), product))
                .filter(complaint -> matchesFilter(complaint.getState(), state))
                .filter(complaint -> matchesFilter(complaint.getIssue(), issue))
                .filter(complaint -> matchesFilter(complaint.getTimelyResponse(), timelyResponse))
                .toList();
    }

    public int getComplaintCount() {
        return complaints.size();
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
        return complaints.stream()
                .collect(Collectors.groupingBy(
                        complaint -> extractYear(complaint.getDateReceived()),
                        TreeMap::new,
                        Collectors.counting()
                ));
    }

    public double getTimelyResponseRate() {
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
        return complaints.stream()
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

    private String extractYear(String dateReceived) {
        if (dateReceived == null || dateReceived.length() < 4) {
            return "Unknown";
        }

        return dateReceived.substring(0, 4);
    }

    private String getTopValue(Map<String, Long> groupedData) {
        return groupedData.entrySet()
                .stream()
                .max(Comparator.comparingLong(Map.Entry::getValue))
                .map(Map.Entry::getKey)
                .orElse("N/A");
    }
}