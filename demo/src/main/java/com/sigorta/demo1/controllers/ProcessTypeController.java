package com.sigorta.demo1.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sigorta.demo1.services.ProcessTypeService;

@RestController
@RequestMapping("api/1.0/process")
public class ProcessTypeController {
	private final ProcessTypeService processTypeService;
	@Autowired
	public ProcessTypeController(ProcessTypeService processTypeService) {
		this.processTypeService=processTypeService;
	}
	@GetMapping("/allProcessTypes")
	public ResponseEntity<List<String>> getAllSelection(){
		List<String>processTypes=processTypeService.getAllSelection();
		return ResponseEntity.ok(processTypes);
	}
}
