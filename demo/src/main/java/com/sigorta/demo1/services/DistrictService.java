package com.sigorta.demo1.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sigorta.demo1.entities.District;
import com.sigorta.demo1.repos.DistrictRepository;

@Service
public class DistrictService {
	@Autowired
	private DistrictRepository districtRepository;
	public List<District> getDistrictByCityId(Long cityId){
		return districtRepository.findByCityId(cityId);
	}
}
