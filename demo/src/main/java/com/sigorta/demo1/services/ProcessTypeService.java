package com.sigorta.demo1.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sigorta.demo1.entities.ProcessType;
import com.sigorta.demo1.repos.ProcessTypeRepository;

@Service
public class ProcessTypeService {
	private final ProcessTypeRepository processTypeRepository;
	@Autowired
	public ProcessTypeService(ProcessTypeRepository processTypeRepository) {
		this.processTypeRepository=processTypeRepository;
	}
	public Double getPrice(String selection) {
		ProcessType processType=processTypeRepository.findBySelection(selection);
		if(processType!=null) {
			return processType.getPrice();
		}
		return null;
	}
	public List<String>getAllSelection(){
		List<ProcessType> processTypes=processTypeRepository.findAll();
		return processTypes.stream()
				.map(ProcessType::getSelection)
				.collect(Collectors.toList());
	}
}
