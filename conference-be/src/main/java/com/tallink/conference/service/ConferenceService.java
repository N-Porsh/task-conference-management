package com.tallink.conference.service;

import com.tallink.conference.entity.ConferenceEntity;
import com.tallink.conference.models.ConferenceRequest;
import com.tallink.conference.repository.ConferenceRepository;
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

        log.info("Adding new conference");

        ConferenceEntity conferenceEntity = conferenceRepository.save(newConference);
        return ResponseEntity.status(HttpStatus.CREATED).body(conferenceEntity);
    }

    public ResponseEntity updateConference(ConferenceRequest conferenceRequest, Long id) {
        ConferenceEntity conference = getById(id);
        if (conference == null) {
            return ResponseEntity.notFound().build();
        }

        conference.setRoomId(conferenceRequest.getRoomId());
        conference.setName(conferenceRequest.getName());
        conference.setDateTime(conferenceRequest.getDateTime());
        conferenceRepository.save(conference);

        return ResponseEntity.noContent().build();
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
