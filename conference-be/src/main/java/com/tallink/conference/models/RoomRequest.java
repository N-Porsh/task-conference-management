package com.tallink.conference.models;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@Data
@NoArgsConstructor
public class RoomRequest {

    @NotBlank
    private String name;

    @NotBlank
    private String location;

    @NotNull
    @Positive
    private Integer maxSeats;
}
