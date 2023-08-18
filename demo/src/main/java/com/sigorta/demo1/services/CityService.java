package com.sigorta.demo1.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sigorta.demo1.entities.City;
import com.sigorta.demo1.repos.CityRepository;

@Service
public class CityService {
	@Autowired
	private CityRepository cityRepository;
	
	public List<City>getAllCity(){
		return cityRepository.findAll();
	}
}
