package com.sigorta.demo1.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sigorta.demo1.services.AracTürService;

@RestController
@RequestMapping("/api/1.0/aracTürleri")
public class AracTürController {
private final AracTürService aracTürService;
	@Autowired
	public AracTürController(AracTürService aracTürService) {
		this.aracTürService=aracTürService;
	}
	@GetMapping
	public ResponseEntity<List<String>> getAllAracTürleri(){
		List<String> aracTürleri=aracTürService.getAllAracTürleri();
		return ResponseEntity.ok(aracTürleri);
	}
}
