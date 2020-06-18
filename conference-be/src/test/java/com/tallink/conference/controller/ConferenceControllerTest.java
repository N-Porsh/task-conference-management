package com.tallink.conference.controller;

import com.tallink.conference.entity.ConferenceEntity;
import com.tallink.conference.entity.RoomEntity;
import com.tallink.conference.models.ConferenceRequest;
import com.tallink.conference.repository.ConferenceRepository;
import com.tallink.conference.repository.RoomRepository;
import io.restassured.response.ValidatableResponse;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.Optional;

import static io.restassured.RestAssured.get;
import static org.hamcrest.Matchers.empty;
import static org.hamcrest.Matchers.equalTo;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

public class ConferenceControllerTest extends BaseControllerTest {

    @Autowired
    private ConferenceRepository conferenceRepository;

    @Autowired
    private RoomRepository roomRepository;

    @BeforeEach
    void setUp() {
        super.setUp();
        addRoom();
        addConference();
    }

    @Test
    public void givenConferenceEntityRepository_whenSaveAndRetrieveEntity_thenOK() {
        ConferenceRequest request = new ConferenceRequest();
        request.setName("Big Conf!");
        request.setDateTime(new GregorianCalendar(2020, Calendar.FEBRUARY, 10).getTime());

        ConferenceEntity newConference = new ConferenceEntity(request);
        RoomEntity room = roomRepository.findById(1L).get();
        newConference.setRoom(room);
        conferenceRepository.save(newConference);

        Optional<ConferenceEntity> foundEntity = conferenceRepository.findById(newConference.getId());

        assertNotNull(foundEntity);
        assertEquals(newConference.getName(), foundEntity.get().getName());
    }

    @Test
    public void returnsConferenceListArray_when_requestingAPI() {
        ValidatableResponse response = get("/api/conferences")
                .then().body("$", Matchers.not(empty()));
        response.assertThat().contentType("application/json").statusCode(200);
    }

    @Test
    public void returnsOneConference_when_requestingAPI() {
        ValidatableResponse response = get("/api/conferences/1")
                .then().body("name", equalTo("Java Summit 2021"))
                .and().body("roomId", equalTo(1));
        response.assertThat().contentType("application/json").statusCode(200);
    }
}
