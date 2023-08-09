package com.sigorta.demo1.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sigorta.demo1.entities.Model;
import com.sigorta.demo1.repos.ModelRepository;

@Service
public class ModelService {
	 @Autowired
	 private ModelRepository modelRepository;
	 public List<Model> getAllModeller() {
	        return modelRepository.findAll();
	    }

}
