package com.tallink.conference.service;

import com.tallink.conference.entity.ConferenceEntity;
import com.tallink.conference.models.ConferenceRequest;
import com.tallink.conference.repository.ConferenceRepository;
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
public class ConferenceService {

    private final ConferenceRepository conferenceRepository;
    private final RoomRepository roomRepository;

    public List<ConferenceEntity> getAllConferences() {
        return conferenceRepository.findAll();
    }

    public ConferenceEntity getById(Long id) {
        Optional<ConferenceEntity> conference = conferenceRepository.findById(id);
        return conference.orElse(null);
    }

    public ResponseEntity getConference(Long id) {
        ConferenceEntity conferenceEntity = getById(id);

        if (conferenceEntity == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(conferenceEntity);
    }

    public ResponseEntity addConference(ConferenceRequest conferenceRequest) {
        ConferenceEntity newConference = new ConferenceEntity(conferenceRequest);
        Long roomId = conferenceRequest.getRoomId();
        log.info("Adding new conference");

        return roomRepository.findById(roomId).map(room -> {
            newConference.setRoom(room);
            conferenceRepository.save(newConference);
            return ResponseEntity.status(HttpStatus.CREATED).body(newConference);
        }).orElse(ResponseEntity.notFound().build());
    }

    public ResponseEntity deleteById(Long id) {
        ConferenceEntity conference = getById(id);
        if (conference == null) {
            return ResponseEntity.notFound().build();
        }

        conferenceRepository.deleteById(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
