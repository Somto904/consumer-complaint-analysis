package com.finsight.backend.config;

import com.finsight.backend.model.Complaint;
import com.finsight.backend.repository.ComplaintRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;

@Component
public class DataLoader implements CommandLineRunner {

    private final ComplaintRepository complaintRepository;

    public DataLoader(ComplaintRepository complaintRepository) {
        this.complaintRepository = complaintRepository;
    }

    @Override
    public void run(String... args) {
        if (complaintRepository.count() > 0) {
            return;
        }

        loadSampleComplaintsFromCsv();
    }

    private void loadSampleComplaintsFromCsv() {
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

            while ((line = reader.readLine()) != null) {
                if (line.isBlank()) {
                    continue;
                }

                String[] values = line.split(",", -1);

                if (values.length < 13) {
                    throw new RuntimeException("Invalid CSV row: " + line);
                }

                Complaint complaint = new Complaint(
                        values[0].trim(),
                        LocalDate.parse(values[1].trim()),
                        values[2].trim(),
                        values[3].trim(),
                        values[4].trim(),
                        values[5].trim(),
                        values[6].trim(),
                        values[7].trim(),
                        values[8].trim(),
                        LocalDate.parse(values[9].trim()),
                        values[10].trim(),
                        values[11].trim(),
                        values[12].trim()
                );

                complaintRepository.save(complaint);
            }

        } catch (Exception e) {
            throw new RuntimeException("Failed to load sample complaint data into PostgreSQL", e);
        }
    }
}