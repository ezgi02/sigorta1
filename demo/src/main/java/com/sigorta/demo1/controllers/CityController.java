package com.sigorta.demo1.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sigorta.demo1.entities.City;
import com.sigorta.demo1.services.CityService;

@RestController
@RequestMapping("/api/1.0")
public class CityController {
	@Autowired
	private CityService cityService;
	@GetMapping("/cities")
	public List<City> getAllCity(){
		return cityService.getAllCity();
	}
	
}
