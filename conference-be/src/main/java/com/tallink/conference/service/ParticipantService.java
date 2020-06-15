package com.tallink.conference.service;

import com.tallink.conference.entity.ConferenceEntity;
import com.tallink.conference.entity.ParticipantEntity;
import com.tallink.conference.models.ParticipantRequest;
import com.tallink.conference.repository.ParticipantRepository;
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
public class ParticipantService {

    private final ParticipantRepository participantRepository;
    private final ConferenceService conferenceService;
    private final RoomService roomService;

    public List<ParticipantEntity> getAllParticipants() {
        return participantRepository.findAll();
    }

    private ParticipantEntity getById(Long id) {
        Optional<ParticipantEntity> participant = participantRepository.findById(id);
        return participant.orElse(null);
    }

    public ResponseEntity getParticipant(Long id) {
        ParticipantEntity participantEntity = getById(id);

        if (participantEntity == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(participantEntity);
    }

    public ResponseEntity addParticipant(ParticipantRequest participantRequest) {
        ParticipantEntity newParticipant = new ParticipantEntity(participantRequest);

        boolean isAvailable = checkAvailability(participantRequest.getConferenceId());
        if (!isAvailable) {
            return ResponseEntity.status(HttpStatus.OK).body("Seats not available! Participant not added.");
        }
        log.info("Adding new participant: {}", newParticipant.getFullName());

        ParticipantEntity participantEntity = participantRepository.save(newParticipant);
        return ResponseEntity.status(HttpStatus.CREATED).body(participantEntity);
    }

    private boolean checkAvailability(long conferenceId) {
        ConferenceEntity conference = conferenceService.getById(conferenceId);
        int maxSeats = roomService.getById(conference.getRoomId()).getMaxSeats();

        long participantCount = participantRepository.findAll()
                .stream()
                .filter(p -> p.getConferenceId() == conference.getId())
                .count();

        short availableSeats = (short) (maxSeats - participantCount);
        return availableSeats > 0;
    }

    public ResponseEntity deleteById(Long id) {
        ParticipantEntity participant = getById(id);
        if (participant == null) {
            return ResponseEntity.notFound().build();
        }
        log.info("Deleting  participant: {}", participant.getFullName());
        participantRepository.deleteById(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
