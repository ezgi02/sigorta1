package com.sigorta.demo1.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sigorta.demo1.entities.Model;
import com.sigorta.demo1.services.ModelService;

@RestController
@RequestMapping("/api/1.0")
public class ModelController {
	@Autowired
	private ModelService modelService;
	  @GetMapping("/modeller")
	    public List<Model> getAllModeller() {
	        return modelService.getAllModeller();
	    }
	
}
