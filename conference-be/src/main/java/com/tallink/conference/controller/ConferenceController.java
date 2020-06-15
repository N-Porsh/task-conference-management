package com.tallink.conference.controller;

import com.tallink.conference.entity.ConferenceEntity;
import com.tallink.conference.models.ConferenceRequest;
import com.tallink.conference.service.ConferenceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value = "api/conferences")
@RequiredArgsConstructor
public class ConferenceController {

    private final ConferenceService service;

    @GetMapping()
    public List<ConferenceEntity> getConferences() {
        return service.getAllConferences();
    }

    @GetMapping("/{id}")
    public ResponseEntity retrieveConference(@PathVariable Long id) {
        return service.getConference(id);
    }

    @PostMapping()
    public ResponseEntity addNewConference(@Valid @RequestBody ConferenceRequest request) {
        return service.addConference(request);
    }

    @PutMapping("/{id}")
    public ResponseEntity updateConference(@RequestBody ConferenceRequest request, @PathVariable Long id) {
        return service.updateConference(request, id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteConference(@PathVariable Long id) {
        return service.deleteById(id);
    }
}
