package com.sigorta.demo1.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sigorta.demo1.services.BuildCoeffcientService;

@RestController
@RequestMapping("/api/1.0/coefficient")
public class BuildCoefficientController {
	private final BuildCoeffcientService buildCoeffcientService;
	@Autowired
	public BuildCoefficientController(BuildCoeffcientService buildCoeffcientService) {
		this.buildCoeffcientService=buildCoeffcientService;
	}
	@GetMapping("/allCoeffcient")
	public ResponseEntity<List<String>> getAllCoeffcient(){
		List<String>coeffcients=buildCoeffcientService.getAllCoeffcient();
		return ResponseEntity.ok(coeffcients);
	}
	
}
