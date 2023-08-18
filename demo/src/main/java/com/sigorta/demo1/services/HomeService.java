package com.sigorta.demo1.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sigorta.demo1.entities.Home;
import com.sigorta.demo1.repos.HomeRepository;

@Service
public class HomeService {
	private final HomeRepository homeRepository;
	@Autowired
	public HomeService(HomeRepository homeRepository) {
		this.homeRepository=homeRepository;
	}
	public Home saveHome(Home home) {
		return homeRepository.save(home);
	}
}
