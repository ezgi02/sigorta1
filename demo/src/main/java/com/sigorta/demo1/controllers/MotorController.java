package com.sigorta.demo1.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sigorta.demo1.services.MotorService;

@RestController
@RequestMapping("/api/1.0/motor")
public class MotorController {
	private final MotorService motorService;
	@Autowired
	public MotorController(MotorService motorService) {
		this.motorService=motorService;
	}
	
	@GetMapping("/price/hacim")
	public Double getMotorPrice(@PathVariable String hacim ) {
		return motorService.getMotorPrice(hacim);
	}
	 @GetMapping("/all-hacimleri")
	    public ResponseEntity<List<String>> getAllMotorHacimleri() {
	        List<String> motorHacimleri = motorService.getAllMotorHacimleri();
	        return ResponseEntity.ok(motorHacimleri);
	    }

	
}
