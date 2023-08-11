package com.sigorta.demo1.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sigorta.demo1.services.HasarsizGunSayiService;

@RestController
@RequestMapping("/api/1.0/hasarsiz")
public class HasarsizGunSayiController {
 private final HasarsizGunSayiService hasarsizGunSayiService;
 	@Autowired
 	public HasarsizGunSayiController(HasarsizGunSayiService hasarsizGunSayiService) {
 		this.hasarsizGunSayiService=hasarsizGunSayiService;
 }
 	@GetMapping("/katsayi/hasarsizgunsayi")
 	public Double  getHasarsizKatsayi(@PathVariable String hasarsizgunsayi){
 		return hasarsizGunSayiService.getHasarsizKatsayi(hasarsizgunsayi);
 	}
 	@GetMapping("/all-hasarsizgunsayileri")
 	public ResponseEntity<List<String>> getAllHasarsizGunSayi(){
 		List<String> hasarsizGunSayileri=hasarsizGunSayiService. getAllHasarsizGunSayi();
 		return ResponseEntity.ok(hasarsizGunSayileri);
 	}
 	
}
