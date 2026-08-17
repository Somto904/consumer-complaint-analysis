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
                String[] values = line.split(",", -1);

                Complaint complaint = new Complaint(
                        id++,
                        values[0],
                        values[1],
                        values[2],
                        values[3],
                        values[4],
                        values[5],
                        values[6],
                        values[7],
                        values[8],
                        values[9],
                        values[10],
                        values[11],
                        values[12]
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
                .filter(complaint -> company == null || complaint.getCompany().equalsIgnoreCase(company))
                .filter(complaint -> product == null || complaint.getProduct().equalsIgnoreCase(product))
                .filter(complaint -> state == null || complaint.getState().equalsIgnoreCase(state))
                .filter(complaint -> issue == null || complaint.getIssue().equalsIgnoreCase(issue))
                .filter(complaint -> timelyResponse == null || complaint.getTimelyResponse().equalsIgnoreCase(timelyResponse))
                .toList();
    }

    public int getComplaintCount() {
        return complaints.size();
    }

    public Map<String, Long> getComplaintCountByCompany() {
        return complaints
                .stream()
                .collect(Collectors.groupingBy(
                        Complaint::getCompany,
                        Collectors.counting()
                ));
    }

    public Map<String, Long> getComplaintCountByProduct() {
        return complaints
                .stream()
                .collect(Collectors.groupingBy(
                        Complaint::getProduct,
                        Collectors.counting()
                ));
    }

    public Map<String, Long> getComplaintCountByState() {
        return complaints
                .stream()
                .collect(Collectors.groupingBy(
                        Complaint::getState,
                        Collectors.counting()
                ));
    }

    public Map<String, Long> getComplaintCountByIssue() {
        return complaints
                .stream()
                .collect(Collectors.groupingBy(
                        Complaint::getIssue,
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

    private String getTopValue(Map<String, Long> groupedData) {
        return groupedData.entrySet()
                .stream()
                .max(Comparator.comparingLong(Map.Entry::getValue))
                .map(Map.Entry::getKey)
                .orElse("N/A");
    }
}