package com.tallink.conference.entity;

import com.tallink.conference.models.ParticipantRequest;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Data
@Table(name = "participants")
@NoArgsConstructor
public class ParticipantEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long conferenceId;

    @Column(length = 128)
    private String fullName;

    @Column(name = "birthdate")
    private Date birthDate;

    public ParticipantEntity(ParticipantRequest participantRequest) {
        setConferenceId(participantRequest.getConferenceId());
        setFullName(participantRequest.getFullName());
        setBirthDate(participantRequest.getBirthDate());
    }
}
