package com.sigorta.demo1.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sigorta.demo1.entities.AracYil;
import com.sigorta.demo1.repos.AracYilRepository;

@Service
public class AracYilService {
	private final AracYilRepository aracYilRepository;
	@Autowired
	public AracYilService( AracYilRepository aracYilRepository) {
		this.aracYilRepository=aracYilRepository;
	}
	public List<Integer> getAllYil() {
	    List<AracYil> yilListesi = aracYilRepository.findAll();
	    return yilListesi.stream()
	            .map(AracYil::getYil)
	            .collect(Collectors.toList());
	}

	
}
