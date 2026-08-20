package com.hamarashops.contact.model;

public class ContactInquiryResponse {
    private String inquiryId;
    private String status;
    private String timestamp;
    private String message;

    public ContactInquiryResponse() {}

    public ContactInquiryResponse(String inquiryId, String status, String timestamp, String message) {
        this.inquiryId = inquiryId;
        this.status = status;
        this.timestamp = timestamp;
        this.message = message;
    }

    public String getInquiryId() {
        return inquiryId;
    }

    public void setInquiryId(String inquiryId) {
        this.inquiryId = inquiryId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
