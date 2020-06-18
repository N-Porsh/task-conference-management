package com.tallink.conference.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tallink.conference.models.ConferenceRequest;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@Table(name = "conferences")
@NoArgsConstructor
public class ConferenceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "room_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private RoomEntity room;

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
        setName(request.getName());
        setDateTime(request.getDateTime());
    }

    public Long getRoomId(){
        return getRoom().getId();
    }
}
