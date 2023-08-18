package com.sigorta.demo1.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sigorta.demo1.services.BuildYearService;

@RestController
@RequestMapping("/api/1.0/year")
public class BuildYearController {
	private final BuildYearService buildYearService;
	@Autowired
	public BuildYearController(BuildYearService buildYearService) {
		this.buildYearService=buildYearService;
	}
	@GetMapping("/allYear")
	public ResponseEntity<List<String>> getAllYear(){
		List<String>years=buildYearService.getAllYear();
		return ResponseEntity.ok(years);
	}
	

}
