package com.sigorta.demo1.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sigorta.demo1.entities.District;
import com.sigorta.demo1.services.DistrictService;

@RestController
@RequestMapping("/api/1.0")
public class DistrictController {
	
	private final DistrictService districtService;
	@Autowired
	public DistrictController(DistrictService districtService) {
		this.districtService=districtService;
	}
	@GetMapping("/{cityId}/districts")
    public ResponseEntity<List<District>> getDistrictsByCityId(@PathVariable Long cityId) {
        List<District> districts = districtService.getDistrictByCityId(cityId);
        return ResponseEntity.ok(districts);
    }
}
