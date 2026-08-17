package com.finsight.backend.repository;

import com.finsight.backend.model.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {

    Optional<Complaint> findByComplaintId(String complaintId);

    boolean existsByComplaintId(String complaintId);
}