package com.sigorta.demo1.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sigorta.demo1.entities.Home;
import com.sigorta.demo1.services.HomeService;

@RestController
@RequestMapping("/api/1.0/homes")
public class HomesController {
	private final HomeService homeService;
	@Autowired
	public HomesController(HomeService homeService) {
		this.homeService=homeService;
	}
	@PostMapping
	public ResponseEntity<Home> createHomes(@RequestBody Home home){
		Home savedHome=homeService.saveHome(home);
		return ResponseEntity.ok(savedHome);
	}
	
}
