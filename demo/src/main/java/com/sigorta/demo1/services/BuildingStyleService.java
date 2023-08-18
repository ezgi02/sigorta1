package com.sigorta.demo1.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.sigorta.demo1.entities.BuildingStyle;
import com.sigorta.demo1.repos.BuildingStyleRepository;

@Service
public class BuildingStyleService {
	BuildingStyleRepository buildingStyleRepository;
	public BuildingStyleService(BuildingStyleRepository buildingStyleRepository) {
		this.buildingStyleRepository=buildingStyleRepository;
	}
		public Double getFiyat(String buildingStyle) {
		BuildingStyle buildingStyle2=buildingStyleRepository.findByBuildingStyle(buildingStyle);
		if(buildingStyle2!=null) {
			return buildingStyle2.getFiyat();
		}
		return null;
	}
	public List<String> getAllStyle(){
		List<BuildingStyle> styles=buildingStyleRepository.findAll();
		return styles.stream()
				.map(BuildingStyle::getBuildingStyle)
				.collect(Collectors.toList());
	}

}
