package com.sigorta.demo1.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sigorta.demo1.entities.Car;
import com.sigorta.demo1.entities.Kasko;
import com.sigorta.demo1.entities.User;
import com.sigorta.demo1.repos.CarRepository;
import com.sigorta.demo1.repos.UserRepository;

import com.sigorta.demo1.services.KaskoService;


@RestController

@RequestMapping("/api/1.0/kasko")
public class KaskoController {
	private final KaskoService kaskoService;
	private final UserRepository userRepository;
	private final CarRepository carRepository;

    public KaskoController(KaskoService kaskoService,UserRepository userRepository,CarRepository carRepository) {
        this.kaskoService = kaskoService;
        this.userRepository=userRepository;
        this.carRepository=carRepository;
    }
    @PostMapping
    public ResponseEntity<Kasko> calculateKaskoPrice(@RequestBody Kasko kaskoRequest) {
        try {
            
           // double kaskoPrice = kaskoService.calculateKaskoPrice(kaskoRequest.getCar().getId());

            // Kasko nesnesi oluşturulup dönüş yapılır
            Kasko kasko = new Kasko();
            kasko.setUser(kaskoRequest.getUser());
            kasko.setCar(kaskoRequest.getCar());
          /*  double kaskoPrice;
			kasko.setFiyat(kaskoPrice);*/

            
			
			User user = userRepository.save(kasko.getUser());
            Car car = carRepository.save(kasko.getCar());
            kasko.setUser(user);
            kasko.setCar(car);
           
			Kasko savedKasko = kaskoService.createKaskoForUserAndCar(user, car, kasko);

            return ResponseEntity.ok(savedKasko);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


}
