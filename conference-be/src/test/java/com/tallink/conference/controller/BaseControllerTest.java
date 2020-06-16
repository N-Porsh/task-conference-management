package com.tallink.conference.controller;

import com.tallink.conference.entity.ConferenceEntity;
import com.tallink.conference.entity.RoomEntity;
import com.tallink.conference.models.ConferenceRequest;
import com.tallink.conference.models.RoomRequest;
import com.tallink.conference.repository.ConferenceRepository;
import com.tallink.conference.repository.RoomRepository;
import io.restassured.RestAssured;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.test.context.ActiveProfiles;

import java.util.Calendar;
import java.util.GregorianCalendar;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class BaseControllerTest {

    @LocalServerPort
    private int port;

    @BeforeEach
    void setUp() {
        RestAssured.port = port;
    }

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private ConferenceRepository conferenceRepository;

    void addRoom() {
        RoomRequest request = new RoomRequest();
        request.setName("Room Nr1");
        request.setLocation("Somewhere");
        request.setMaxSeats(5);
        roomRepository.save(new RoomEntity(request));
    }

    void addConference() {
        ConferenceRequest request = new ConferenceRequest();
        request.setName("Java Summit 2021");
        request.setDateTime(new GregorianCalendar(2021, Calendar.JANUARY, 10).getTime());
        request.setRoomId(1L);
        conferenceRepository.save(new ConferenceEntity(request));
    }
}
