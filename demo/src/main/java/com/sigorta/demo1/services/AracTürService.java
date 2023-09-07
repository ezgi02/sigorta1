package com.sigorta.demo1.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sigorta.demo1.entities.AracTür;
import com.sigorta.demo1.repos.AracTürRepository;

@Service
public class AracTürService {
	private final AracTürRepository aracTürRepository;
	@Autowired
	public AracTürService(AracTürRepository aracTürRepository) {
		this.aracTürRepository=aracTürRepository;
	}
	public Double getAracTürKatsayi(String name) {
		AracTür aracTür1=aracTürRepository.findByName(name);
		if(aracTür1!=null) {
			return aracTür1.getKatsayi();
		}
		return null;
	}
	public List<String> getAllAracTürleri(){
		List<AracTür> aracTürleri=aracTürRepository.findAll();
		return  aracTürleri.stream()
				.map(AracTür::getName)
				.collect(Collectors.toList());
	}
	
}
