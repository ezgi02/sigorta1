package com.sigorta.demo1.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sigorta.demo1.entities.District;

public interface DistrictRepository extends JpaRepository<District, Long> {
	List<District> findByCityId(Long cityId);
}
