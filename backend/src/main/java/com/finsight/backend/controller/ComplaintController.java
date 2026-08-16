package com.finsight.backend.controller;

import java.util.Map;
import com.finsight.backend.model.Complaint;
import com.finsight.backend.service.ComplaintService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
}