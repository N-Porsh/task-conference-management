package com.tallink.conference.controller;

import com.tallink.conference.entity.RoomEntity;
import com.tallink.conference.models.RoomRequest;
import com.tallink.conference.repository.RoomRepository;
import io.restassured.response.ValidatableResponse;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

import static io.restassured.RestAssured.get;
import static org.hamcrest.Matchers.*;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

public class RoomControllerTest extends BaseControllerTest {

    @Autowired
    private RoomRepository roomRepository;

    @BeforeEach
    void setUp() {
        super.setUp();
        addRoom();
    }

    @Test
    public void givenRoomEntityRepository_whenSaveAndRetreiveEntity_thenOK() {
        RoomRequest request = new RoomRequest();
        request.setName("M/S Baltic Queen Room 1");
        request.setLocation("Tallink");
        request.setMaxSeats(3);
        RoomEntity roomEntity = roomRepository
                .save(new RoomEntity(request));
        Optional<RoomEntity> foundEntity = roomRepository.findById(roomEntity.getId());

        assertNotNull(foundEntity);
        assertEquals(roomEntity.getName(), foundEntity.get().getName());
    }

    @Test
    public void returnsRoomListArray_when_requestingRoomAPI() {
        ValidatableResponse response = get("/api/rooms")
                .then().body("$", Matchers.not(empty()));
        response.assertThat().contentType("application/json").statusCode(200);
    }

    @Test
    public void returnsOneRoom_when_requestingRoomAPI() {
        ValidatableResponse response = get("/api/rooms/1")
                .then().body("name", equalTo("Room Nr1"))
                .and().body("location", equalTo("Somewhere"))
                .and().body("maxSeats", equalTo(5));
        response.assertThat().contentType("application/json").statusCode(200);
    }
}
