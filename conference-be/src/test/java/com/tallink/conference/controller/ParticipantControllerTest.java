package com.tallink.conference.controller;

import io.restassured.http.ContentType;
import io.restassured.response.Response;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

public class ParticipantControllerTest extends BaseControllerTest {

    @BeforeEach
    void setUp() {
        super.setUp();
        addRoom();
        addConference();
    }

    @Test
    public void addsNewParticipantAndReturnsStatus201() {
        String payload = "{\n" +
                "  \"conferenceId\": 1,\n" +
                "  \"fullName\": \"John Black\",\n" +
                "  \"birthDate\": \"1970-05-20\"\n" +
                "}";
        Response response = given()
                .contentType(ContentType.JSON)
                .body(payload)
                .post("/api/participants")
                .then()
                .statusCode(201)
                .extract()
                .response();

        response.then()
                .body("conferenceId", equalTo(1))
                .body("fullName", equalTo("John Black"));
    }
}
