package com.finsight.backend.service;

import com.finsight.backend.model.Complaint;
import com.finsight.backend.repository.ComplaintRepository;
import org.springframework.stereotype.Service;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

import java.net.URI;
import java.net.URL;
import java.time.LocalDate;

@Service
public class CfpbImportService {

    private static final String CFPB_API_BASE_URL =
            "https://www.consumerfinance.gov/data-research/consumer-complaints/search/api/v1/";

    private final ComplaintRepository complaintRepository;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public CfpbImportService(ComplaintRepository complaintRepository) {
        this.complaintRepository = complaintRepository;
    }

    public int importLatestComplaints(int limit) {
        int totalImported = 0;

        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusDays(7);

        while (totalImported < limit) {
            int remaining = limit - totalImported;
            int currentLimit = Math.min(remaining, 1000);

            String url = CFPB_API_BASE_URL
                    + "?field=all"
                    + "&no_aggs=true"
                    + "&size=" + currentLimit
                    + "&sort=created_date_desc"
                    + "&date_received_min=" + startDate
                    + "&date_received_max=" + endDate;

            int importedThisWindow = importPage(url);

            totalImported += importedThisWindow;

            endDate = startDate.minusDays(1);
            startDate = endDate.minusDays(7);

            if (startDate.isBefore(LocalDate.of(2011, 1, 1))) {
                break;
            }
        }

        return totalImported;
    }

    private int importPage(String apiUrl) {
        int importedCount = 0;

        try {
            URL url = URI.create(apiUrl).toURL();
            JsonNode root = objectMapper.readTree(url.openStream());

            JsonNode records = root.path("hits").path("hits");

            for (JsonNode record : records) {
                JsonNode source = record.path("_source");

                String complaintId = getValue(source, "complaint_id");

                if (complaintId.isBlank()) {
                    continue;
                }

                if (complaintRepository.existsByComplaintId(complaintId)) {
                    continue;
                }

                Complaint complaint = new Complaint(
                        complaintId,
                        parseDate(getValue(source, "date_received")),
                        getValue(source, "product"),
                        getValue(source, "sub_product"),
                        getValue(source, "issue"),
                        getValue(source, "sub_issue"),
                        getValue(source, "company"),
                        getValue(source, "state"),
                        getValue(source, "submitted_via"),
                        parseDate(getValue(source, "date_sent_to_company")),
                        getValue(source, "company_response"),
                        getValue(source, "timely"),
                        getValue(source, "consumer_disputed")
                );

                complaintRepository.save(complaint);
                importedCount++;
            }

        } catch (Exception e) {
            throw new RuntimeException("Failed to import complaints from CFPB API. URL: " + apiUrl, e);
        }

        return importedCount;
    }

    private String getValue(JsonNode source, String fieldName) {
        JsonNode value = source.get(fieldName);

        if (value == null || value.isNull()) {
            return "";
        }

        return value.asText().trim();
    }

    private LocalDate parseDate(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }

        return LocalDate.parse(value.substring(0, 10));
    }
}