package com.finsight.backend.dto;

public class DashboardSummary {

    private int totalComplaints;
    private String topCompany;
    private String topProduct;
    private String topIssue;
    private double timelyResponseRate;

    public DashboardSummary(int totalComplaints, String topCompany, String topProduct,
                            String topIssue, double timelyResponseRate) {
        this.totalComplaints = totalComplaints;
        this.topCompany = topCompany;
        this.topProduct = topProduct;
        this.topIssue = topIssue;
        this.timelyResponseRate = timelyResponseRate;
    }

    public int getTotalComplaints() {
        return totalComplaints;
    }

    public String getTopCompany() {
        return topCompany;
    }

    public String getTopProduct() {
        return topProduct;
    }

    public String getTopIssue() {
        return topIssue;
    }

    public double getTimelyResponseRate() {
        return timelyResponseRate;
    }
}