package com.sigorta.demo1.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sigorta.demo1.services.BuildingStyleService;

@RestController
@RequestMapping("/api/1.0/style")
public class BuildingStyleController {
	private final BuildingStyleService  buildingStyleService;
	@Autowired
	public BuildingStyleController(BuildingStyleService buildingStyleService) {
		this.buildingStyleService=buildingStyleService;
	}
	
	
	@GetMapping("/allStyle")
	public ResponseEntity<List<String>> getAllStyle(){
		List<String>styles=buildingStyleService.getAllStyle();
		return ResponseEntity.ok(styles);
	}
	
}
