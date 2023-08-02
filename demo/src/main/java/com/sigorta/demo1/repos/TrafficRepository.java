package com.sigorta.demo1.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sigorta.demo1.entities.Traffic;

public interface TrafficRepository extends JpaRepository<Traffic, Long> {

}
