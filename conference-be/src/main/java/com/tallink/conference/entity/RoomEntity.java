package com.tallink.conference.entity;

import com.tallink.conference.models.RoomRequest;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Data
@Table(name = "rooms")
@NoArgsConstructor
public class RoomEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String location;
    private Integer maxSeats;

    public RoomEntity(RoomRequest request) {
        setName(request.getName());
        setLocation(request.getLocation());
        setMaxSeats(request.getMaxSeats());
    }
}
