package com.sigorta.demo1.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sigorta.demo1.entities.Marka;
import com.sigorta.demo1.services.MarkaService;

@RestController
@RequestMapping("/api/1.0")
public class MarkaController {
	 @Autowired
	    private MarkaService markaService;

	    @GetMapping("/markalar")
	    public List<Marka> getMarkalar() {
	        return markaService.getAllMarkalar();
	    }
}
