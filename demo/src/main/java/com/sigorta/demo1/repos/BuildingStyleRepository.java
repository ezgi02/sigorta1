package com.sigorta.demo1.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sigorta.demo1.entities.BuildingStyle;

public interface BuildingStyleRepository extends JpaRepository<BuildingStyle,Long >{
	BuildingStyle findByBuildingStyle(String buildingStyle);
}
