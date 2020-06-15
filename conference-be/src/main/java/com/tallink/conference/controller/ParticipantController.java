package com.tallink.conference.controller;

import com.tallink.conference.entity.ParticipantEntity;
import com.tallink.conference.models.ParticipantRequest;
import com.tallink.conference.service.ParticipantService;
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
@RequestMapping(value = "api/participants")
@RequiredArgsConstructor
public class ParticipantController {

    private final ParticipantService service;

    @GetMapping()
    public List<ParticipantEntity> getConferences() {
        return service.getAllParticipants();
    }

    @GetMapping("/{id}")
    public ResponseEntity retrieveParticipant(@PathVariable Long id) {
        return service.getParticipant(id);
    }

    @PostMapping()
    public ResponseEntity addParticipant(@Valid @RequestBody ParticipantRequest request) {
        return service.addParticipant(request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteParticipant(@PathVariable Long id) {
        return service.deleteById(id);
    }
}
