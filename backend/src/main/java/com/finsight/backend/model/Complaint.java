package com.finsight.backend.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "complaints")
public class Complaint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "complaint_id")
    private String complaintId;

    @Column(name = "date_received")
    private LocalDate dateReceived;

    private String product;

    @Column(name = "sub_product")
    private String subProduct;

    private String issue;

    @Column(name = "sub_issue")
    private String subIssue;

    private String company;

    private String state;

    @Column(name = "submitted_via")
    private String submittedVia;

    @Column(name = "date_sent_to_company")
    private LocalDate dateSentToCompany;

    @Column(name = "company_response")
    private String companyResponse;

    @Column(name = "timely_response")
    private String timelyResponse;

    @Column(name = "consumer_disputed")
    private String consumerDisputed;

    public Complaint() {
    }

    public Complaint(String complaintId, LocalDate dateReceived, String product, String subProduct,
                     String issue, String subIssue, String company, String state, String submittedVia,
                     LocalDate dateSentToCompany, String companyResponse, String timelyResponse,
                     String consumerDisputed) {
        this.complaintId = complaintId;
        this.dateReceived = dateReceived;
        this.product = product;
        this.subProduct = subProduct;
        this.issue = issue;
        this.subIssue = subIssue;
        this.company = company;
        this.state = state;
        this.submittedVia = submittedVia;
        this.dateSentToCompany = dateSentToCompany;
        this.companyResponse = companyResponse;
        this.timelyResponse = timelyResponse;
        this.consumerDisputed = consumerDisputed;
    }

    public Long getId() {
        return id;
    }

    public String getComplaintId() {
        return complaintId;
    }

    public LocalDate getDateReceived() {
        return dateReceived;
    }

    public String getProduct() {
        return product;
    }

    public String getSubProduct() {
        return subProduct;
    }

    public String getIssue() {
        return issue;
    }

    public String getSubIssue() {
        return subIssue;
    }

    public String getCompany() {
        return company;
    }

    public String getState() {
        return state;
    }

    public String getSubmittedVia() {
        return submittedVia;
    }

    public LocalDate getDateSentToCompany() {
        return dateSentToCompany;
    }

    public String getCompanyResponse() {
        return companyResponse;
    }

    public String getTimelyResponse() {
        return timelyResponse;
    }

    public String getConsumerDisputed() {
        return consumerDisputed;
    }
}