package com.sigorta.demo1.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sigorta.demo1.entities.Dask;
import com.sigorta.demo1.entities.Home;
import com.sigorta.demo1.entities.User;
import com.sigorta.demo1.repos.HomeRepository;
import com.sigorta.demo1.repos.UserRepository;
import com.sigorta.demo1.services.DaskService;

@RestController
@RequestMapping("/api/1.0/dask")
public class DaskController {
	private final DaskService daskService;
	private final UserRepository userRepository;
	private final HomeRepository homeRepository;
	@Autowired
	public DaskController(DaskService daskService,UserRepository userRepository,HomeRepository homeRepository) {
		this.daskService=daskService;
		this.userRepository=userRepository;
		this.homeRepository=homeRepository;
	}
	@PostMapping("/calculateDaskPrice")
	public ResponseEntity<Double> calculateDaskPrice(@RequestBody Dask daskRequest) {
        try {
        	Dask dask=new Dask();
			dask.setHome(daskRequest.getHome());
			dask.setUser(daskRequest.getUser());
			
			User user=userRepository.save(dask.getUser());
			Home home=homeRepository.save(dask.getHome());
			dask.setUser(user);
			dask.setHome(home);
			Double calculatedDaskPrice = daskService.calculateDaskPrice(user, home, daskRequest);
            return ResponseEntity.ok(calculatedDaskPrice);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
	@PostMapping("/saveDask")
	public ResponseEntity<Dask> saveDask(@RequestBody Dask daskRequest) {
        try {
        	Dask dask=new Dask();
			dask.setHome(daskRequest.getHome());
			dask.setUser(daskRequest.getUser());
			
			User user=userRepository.save(dask.getUser());
			Home home=homeRepository.save(dask.getHome());
			dask.setUser(user);
			dask.setHome(home);
			
			Dask createdDask = daskService.createDask(user, home, daskRequest);
            return ResponseEntity.ok(createdDask);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
	
}
