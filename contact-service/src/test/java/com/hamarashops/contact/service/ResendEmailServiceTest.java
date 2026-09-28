package com.hamarashops.contact.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hamarashops.contact.model.ContactInquiryRequest;
import com.hamarashops.contact.service.impl.ResendEmailServiceImpl;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class ResendEmailServiceTest {

    @Test
    public void testSendInquiryEmail() {
        ObjectMapper objectMapper = new ObjectMapper();
        ResendEmailServiceImpl service = new ResendEmailServiceImpl(objectMapper);

        ContactInquiryRequest request = new ContactInquiryRequest(
                "HamaraShops Tester",
                "customer@example.com",
                "General Inquiries",
                "HamaraShops Test",
                "This is a test email from HamaraShops.ai."
        );

        String apiKey = System.getenv("RESEND_API_KEY");
        if (apiKey != null && !apiKey.trim().isEmpty()) {
            String emailId = service.sendInquiryEmail(request);
            assertNotNull(emailId, "Resend Email ID should not be null when valid RESEND_API_KEY is provided.");
            System.out.println("Resend Test Email ID: " + emailId);
        } else {
            assertThrows(IllegalStateException.class, () -> service.sendInquiryEmail(request),
                    "Should throw IllegalStateException when RESEND_API_KEY is not set.");
        }
    }

    @Test
    public void testSendAppointmentEmail() {
        ObjectMapper objectMapper = new ObjectMapper();
        ResendEmailServiceImpl service = new ResendEmailServiceImpl(objectMapper);

        com.hamarashops.contact.model.AppointmentRequest request = new com.hamarashops.contact.model.AppointmentRequest(
                "Test Client",
                "test@example.com",
                "+91 98765 43210",
                "2026-09-10",
                "10:00 AM",
                "AI Architecture Review",
                "Testing appointment request email dispatch."
        );

        String apiKey = System.getenv("RESEND_API_KEY");
        if (apiKey != null && !apiKey.trim().isEmpty()) {
            String emailId = service.sendAppointmentEmail(request);
            assertNotNull(emailId, "Resend Email ID should not be null when valid RESEND_API_KEY is provided.");
        } else {
            assertThrows(IllegalStateException.class, () -> service.sendAppointmentEmail(request),
                    "Should throw IllegalStateException when RESEND_API_KEY is not set.");
        }
    }

    @Test
    public void testBuildDynamicFrom_WithRithika() {
        ObjectMapper objectMapper = new ObjectMapper();
        ResendEmailServiceImpl service = new ResendEmailServiceImpl(objectMapper);
        String from = service.buildDynamicFrom("Rithika");
        assertEquals("Rithika <onboarding@resend.dev>", from);
    }

    @Test
    public void testBuildDynamicFrom_WithCharanRanga() {
        ObjectMapper objectMapper = new ObjectMapper();
        ResendEmailServiceImpl service = new ResendEmailServiceImpl(objectMapper);
        String from = service.buildDynamicFrom("Charan Ranga");
        assertEquals("Charan Ranga <onboarding@resend.dev>", from);
    }

    @Test
    public void testBuildDynamicFrom_WithEmptyAndNullFallback() {
        ObjectMapper objectMapper = new ObjectMapper();
        ResendEmailServiceImpl service = new ResendEmailServiceImpl(objectMapper);
        assertEquals("HamaraShops.ai <onboarding@resend.dev>", service.buildDynamicFrom(null));
        assertEquals("HamaraShops.ai <onboarding@resend.dev>", service.buildDynamicFrom(""));
        assertEquals("HamaraShops.ai <onboarding@resend.dev>", service.buildDynamicFrom("   "));
        assertEquals("HamaraShops.ai <onboarding@resend.dev>", service.buildDynamicFrom("N/A"));
    }

    @Test
    public void testResolveSenderAddress_PreventsNestedDisplayNames() {
        ObjectMapper objectMapper = new ObjectMapper();
        ResendEmailServiceImpl service = new ResendEmailServiceImpl(objectMapper);
        String senderAddress = service.resolveSenderAddress();
        assertEquals("onboarding@resend.dev", senderAddress);
    }

    @Test
    public void testAppointmentEmail_WithRithika() {
        ObjectMapper objectMapper = new ObjectMapper();
        ResendEmailServiceImpl service = new ResendEmailServiceImpl(objectMapper);

        com.hamarashops.contact.model.AppointmentRequest request = new com.hamarashops.contact.model.AppointmentRequest(
                "Rithika",
                "pulipati.rithu@gmail.com",
                "+91 98765 43210",
                "2026-10-15",
                "11:00 AM",
                "Enterprise AI Consultation",
                "Looking for AI solutions"
        );

        String dynamicFrom = service.buildDynamicFrom(request.getClientName());
        assertEquals("Rithika <onboarding@resend.dev>", dynamicFrom);
        assertEquals("pulipati.rithu@gmail.com", request.getEmail());
    }
}
