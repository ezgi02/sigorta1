package com.sigorta.demo1.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sigorta.demo1.entities.Motor;

public interface MotorRepository extends JpaRepository<Motor, Long>{
	 Motor findOneByHacim(String hacim);
}
