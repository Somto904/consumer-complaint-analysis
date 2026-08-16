package com.finsight.backend.service;

import java.util.Map;
import java.util.stream.Collectors;

import com.finsight.backend.model.Complaint;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ComplaintService {

    public List<Complaint> getAllComplaints() {
        return List.of(
                new Complaint(
                        1L,
                        "100001",
                        "2024-01-15",
                        "Credit card",
                        "General-purpose credit card",
                        "Billing dispute",
                        "Problem with a purchase shown on statement",
                        "Bank of America",
                        "NY",
                        "Web",
                        "2024-01-16",
                        "Closed with explanation",
                        "Yes",
                        "No"
                ),
                new Complaint(
                        2L,
                        "100002",
                        "2024-02-10",
                        "Checking or savings account",
                        "Checking account",
                        "Managing an account",
                        "Funds not available",
                        "Chase Bank",
                        "NC",
                        "Web",
                        "2024-02-11",
                        "Closed with monetary relief",
                        "Yes",
                        "No"
                ),
                new Complaint(
                        3L,
                        "100003",
                        "2024-03-05",
                        "Credit reporting",
                        "Credit reporting",
                        "Incorrect information on your report",
                        "Information belongs to someone else",
                        "Experian",
                        "TX",
                        "Referral",
                        "2024-03-06",
                        "In progress",
                        "No",
                        "N/A"
                )
        );
    }

    public int getComplaintCount() {
        return getAllComplaints().size();
    }

    public Map<String, Long> getComplaintCountByCompany() {
        return getAllComplaints()
                .stream()
                .collect(Collectors.groupingBy(
                        Complaint::getCompany,
                        Collectors.counting()
                ));
    }

    public Map<String, Long> getComplaintCountByProduct() {
        return getAllComplaints()
                .stream()
                .collect(Collectors.groupingBy(
                        Complaint::getProduct,
                        Collectors.counting()
                ));
    }

    public Map<String, Long> getComplaintCountByState() {
        return getAllComplaints()
                .stream()
                .collect(Collectors.groupingBy(
                        Complaint::getState,
                        Collectors.counting()
                ));
    }

    public Map<String, Long> getComplaintCountByIssue() {
        return getAllComplaints()
                .stream()
                .collect(Collectors.groupingBy(
                        Complaint::getIssue,
                        Collectors.counting()
                ));
    }

    public double getTimelyResponseRate() {
        List<Complaint> complaints = getAllComplaints();

        long timelyCount = complaints.stream()
                .filter(complaint -> "Yes".equalsIgnoreCase(complaint.getTimelyResponse()))
                .count();

        return (timelyCount * 100.0) / complaints.size();
    }



}