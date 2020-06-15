package com.tallink.conference.models;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;
import javax.validation.constraints.Size;
import java.util.Date;

@Data
@NoArgsConstructor
public class ParticipantRequest {

    @NotNull
    private Long conferenceId;

    @NotBlank
    @Size(min = 3, max = 128)
    private String fullName;

    @NotNull
    @Past
    private Date birthDate;
}
