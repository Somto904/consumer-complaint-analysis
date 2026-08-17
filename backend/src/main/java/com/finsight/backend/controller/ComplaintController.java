package com.finsight.backend.controller;

import com.finsight.backend.dto.DashboardSummary;
import com.finsight.backend.model.Complaint;
import com.finsight.backend.service.ComplaintService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class ComplaintController {

    private final ComplaintService complaintService;

    public ComplaintController(ComplaintService complaintService) {
        this.complaintService = complaintService;
    }

    @GetMapping("/api/complaints")
    public List<Complaint> getComplaints() {
        return complaintService.getAllComplaints();
    }

    @GetMapping("/api/complaints/count")
    public int getComplaintCount() {
        return complaintService.getComplaintCount();
    }

    @GetMapping("/api/complaints/top-companies")
    public Map<String, Long> getComplaintCountByCompany() {
        return complaintService.getComplaintCountByCompany();
    }

    @GetMapping("/api/complaints/by-product")
    public Map<String, Long> getComplaintCountByProduct() {
        return complaintService.getComplaintCountByProduct();
    }

    @GetMapping("/api/complaints/by-state")
    public Map<String, Long> getComplaintCountByState() {
        return complaintService.getComplaintCountByState();
    }

    @GetMapping("/api/complaints/by-issue")
    public Map<String, Long> getComplaintCountByIssue() {
        return complaintService.getComplaintCountByIssue();
    }

    @GetMapping("/api/complaints/timely-response-rate")
    public double getTimelyResponseRate() {
        return complaintService.getTimelyResponseRate();
    }

    @GetMapping("/api/dashboard/summary")
    public DashboardSummary getDashboardSummary() {
        return complaintService.getDashboardSummary();
    }
}