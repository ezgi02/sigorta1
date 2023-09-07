package com.sigorta.demo1.repos;

//import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sigorta.demo1.entities.AracTür;

public interface AracTürRepository extends JpaRepository<AracTür, Long>{
	AracTür findByName(String name);
	//List<String> findAracTür();
}
