package com.finsight.backend.model;

public class Complaint {

    private Long id;
    private String complaintId;
    private String dateReceived;
    private String product;
    private String subProduct;
    private String issue;
    private String subIssue;
    private String company;
    private String state;
    private String submittedVia;
    private String dateSentToCompany;
    private String companyResponse;
    private String timelyResponse;
    private String consumerDisputed;

    public Complaint() {
    }

    public Complaint(Long id, String complaintId, String dateReceived, String product, String subProduct,
                     String issue, String subIssue, String company, String state, String submittedVia,
                     String dateSentToCompany, String companyResponse, String timelyResponse,
                     String consumerDisputed) {
        this.id = id;
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

    public String getDateReceived() {
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

    public String getDateSentToCompany() {
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