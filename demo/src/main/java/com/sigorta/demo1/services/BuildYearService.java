package com.sigorta.demo1.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.sigorta.demo1.entities.BuildYear;
import com.sigorta.demo1.repos.BuildYearRepository;

@Service
public class BuildYearService {
	BuildYearRepository buildYearRepository;
	public BuildYearService(BuildYearRepository buildYearRepository) {
		this.buildYearRepository=buildYearRepository;
	}
	public Double getFiyat(String buildYear) {
		BuildYear buildYear2=buildYearRepository.findByBuildYear(buildYear);
		if(buildYear2!=null) {
			return buildYear2.getFiyat();
		}
		return null;
	}
	public List<String> getAllYear(){
		List<BuildYear> years=buildYearRepository.findAll();
		return years.stream()
				.map(BuildYear::getBuildYear)
				.collect(Collectors.toList());
	}

}
