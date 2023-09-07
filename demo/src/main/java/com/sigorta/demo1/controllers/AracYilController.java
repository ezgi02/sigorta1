package com.sigorta.demo1.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sigorta.demo1.services.AracYilService;

@RestController
@RequestMapping("/api/1.0/yillar")
public class AracYilController {
	@Autowired
    private AracYilService aracYilService; 

    @GetMapping
    public List<Integer> getAllYil() {
        return aracYilService.getAllYil(); 
    }
}
