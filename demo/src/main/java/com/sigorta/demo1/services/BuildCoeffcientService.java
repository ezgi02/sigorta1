package com.sigorta.demo1.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.sigorta.demo1.entities.BuildCoefficient;
import com.sigorta.demo1.repos.BuildCoeffcientRepository;

@Service
public class BuildCoeffcientService {
	BuildCoeffcientRepository buildCoeffcientRepository;
	public BuildCoeffcientService(BuildCoeffcientRepository buildCoeffcientRepository) {
		this.buildCoeffcientRepository=buildCoeffcientRepository;
	}
	public List<String> getAllCoeffcient(){
		List<BuildCoefficient> coeffcients=buildCoeffcientRepository.findAll();
		return coeffcients.stream()
				.map(BuildCoefficient::getCoeffcient)
				.collect(Collectors.toList());
	}
}
