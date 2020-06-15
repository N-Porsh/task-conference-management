package com.tallink.conference.controller;

import com.tallink.conference.entity.RoomEntity;
import com.tallink.conference.models.RoomRequest;
import com.tallink.conference.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value = "api/rooms")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService service;

    @GetMapping()
    public List<RoomEntity> getRooms() {
        return service.getAllRooms();
    }

    @GetMapping("/{id}")
    public ResponseEntity retrieveRoom(@PathVariable Long id) {
        return service.getRoom(id);
    }

    @PostMapping()
    public ResponseEntity addRoom(@Valid @RequestBody RoomRequest request) {
        return service.addRoom(request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteRoom(@PathVariable Long id) {
        return service.deleteById(id);
    }
}
