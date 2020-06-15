package com.tallink.conference.models;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Future;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.util.Date;

@Data
@NoArgsConstructor
public class ConferenceRequest {

    @NotNull
    @Positive
    private Long roomId;

    @NotBlank
    private String name;

    @NotNull
    @Future
    private Date dateTime;
}
