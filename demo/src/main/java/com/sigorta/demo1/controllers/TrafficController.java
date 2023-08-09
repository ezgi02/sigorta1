package com.sigorta.demo1.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sigorta.demo1.entities.Car;
import com.sigorta.demo1.entities.Traffic;
import com.sigorta.demo1.entities.User;
import com.sigorta.demo1.repos.CarRepository;
import com.sigorta.demo1.repos.UserRepository;
import com.sigorta.demo1.services.TrafficService;

@RestController
@RequestMapping("/api/1.0/traffic")
public class TrafficController {
	private final TrafficService trafficService;
	private final UserRepository userRepository;
	private final CarRepository carRepository;
	

	@Autowired
	public TrafficController(TrafficService trafficService, UserRepository userRepository, CarRepository carRepository) {
		
	    this.trafficService = trafficService;
	    this.userRepository = userRepository;
        this.carRepository = carRepository;
	 }
	
	@PostMapping("/calculatePrice")
    public ResponseEntity<Double> calculateTrafficPrice(@RequestBody Traffic trafficRequest) {
        try {
        	Traffic traffic=new Traffic();
			traffic.setCar(trafficRequest.getCar());
			traffic.setUser(trafficRequest.getUser());
			
			User user=userRepository.save(traffic.getUser());
			Car car=carRepository.save(traffic.getCar());
			traffic.setUser(user);
			traffic.setCar(car);
			Double calculatedPrice = trafficService.calculateTrafficPrice(user, car, trafficRequest);
            return ResponseEntity.ok(calculatedPrice);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
	 @PostMapping("/saveTraffic")
	 public ResponseEntity<Traffic> saveTraffic(@RequestBody Traffic trafficRequest) {
	        try {
	            Traffic traffic = new Traffic();
	            traffic.setCar(trafficRequest.getCar());
	            traffic.setUser(trafficRequest.getUser());

	            User user = userRepository.save(traffic.getUser());
	            Car car = carRepository.save(traffic.getCar());
	            traffic.setUser(user);
	            traffic.setCar(car);

	            Traffic createdTraffic = trafficService.createTraffic(user, car, traffic);

	            return ResponseEntity.ok(createdTraffic);
	        } catch (Exception ex) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
	        }
	    }
}







