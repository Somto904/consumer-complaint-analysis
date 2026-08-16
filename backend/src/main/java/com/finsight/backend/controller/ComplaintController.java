package com.finsight.backend.controller;

import com.finsight.backend.model.Complaint;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ComplaintController {

    @GetMapping("/api/complaints")
    public List<Complaint> getComplaints() {
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
}