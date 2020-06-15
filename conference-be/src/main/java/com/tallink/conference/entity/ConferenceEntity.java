package com.tallink.conference.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tallink.conference.models.ConferenceRequest;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Data
@Table(name = "conferences")
@NoArgsConstructor
public class ConferenceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long roomId;

    @Column(length = 150)
    private String name;
    private Date dateTime;

    @Column(nullable = false, updatable = false)
    @JsonIgnore
    @CreationTimestamp
    private Date created;

    @Column(nullable = false)
    @UpdateTimestamp
    @JsonIgnore
    private Date updated;

    public ConferenceEntity(ConferenceRequest request) {
        setRoomId(request.getRoomId());
        setName(request.getName());
        setDateTime(request.getDateTime());
    }
}
