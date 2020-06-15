package com.tallink.conference.service;

import com.tallink.conference.entity.RoomEntity;
import com.tallink.conference.models.RoomRequest;
import com.tallink.conference.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Slf4j
public class RoomService {

    private final RoomRepository roomRepository;

    public List<RoomEntity> getAllRooms() {
        return roomRepository.findAll();
    }

    public RoomEntity getById(Long id) {
        Optional<RoomEntity> room = roomRepository.findById(id);
        return room.orElse(null);
    }

    public ResponseEntity getRoom(Long id) {
        RoomEntity RoomEntity = getById(id);

        if (RoomEntity == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(RoomEntity);
    }

    public ResponseEntity addRoom(RoomRequest roomRequest) {
        RoomEntity newRoom = new RoomEntity(roomRequest);

        log.info("Adding new room");

        RoomEntity RoomEntity = roomRepository.save(newRoom);
        return ResponseEntity.status(HttpStatus.CREATED).body(RoomEntity);
    }

    public ResponseEntity deleteById(Long id) {
        RoomEntity room = getById(id);
        if (room == null) {
            return ResponseEntity.notFound().build();
        }

        roomRepository.deleteById(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
