package com.finsight.backend.controller;

import com.finsight.backend.service.CfpbImportService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
public class CfpbImportController {

    private final CfpbImportService cfpbImportService;

    public CfpbImportController(CfpbImportService cfpbImportService) {
        this.cfpbImportService = cfpbImportService;
    }

    @PostMapping("/api/admin/import/cfpb")
    public ResponseEntity<Map<String, Object>> importCfpbComplaints(
            @RequestParam(defaultValue = "5000") int limit
    ) {
        Map<String, Object> response = new LinkedHashMap<>();

        try {
            int importedCount = cfpbImportService.importLatestComplaints(limit);

            response.put("source", "CFPB Consumer Complaint Database API");
            response.put("requestedLimit", limit);
            response.put("importedCount", importedCount);
            response.put("status", "completed");

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            response.put("source", "CFPB Consumer Complaint Database API");
            response.put("requestedLimit", limit);
            response.put("status", "failed");
            response.put("error", e.getMessage());

            if (e.getCause() != null) {
                response.put("cause", e.getCause().getMessage());
            }

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}