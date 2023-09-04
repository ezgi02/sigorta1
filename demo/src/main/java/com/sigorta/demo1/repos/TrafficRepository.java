package com.sigorta.demo1.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sigorta.demo1.entities.Traffic;
import com.sigorta.demo1.entities.User;

public interface TrafficRepository extends JpaRepository<Traffic, Long> {
	List<Traffic> findByUser(User user);

}
