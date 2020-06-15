package com.tallink.conference.repository;

import com.tallink.conference.entity.ConferenceEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConferenceRepository extends JpaRepository<ConferenceEntity, Long> {

}
