package com.sigorta.demo1.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.sigorta.demo1.entities.Car;
import com.sigorta.demo1.entities.Kasko;

import com.sigorta.demo1.entities.User;
import com.sigorta.demo1.error.ApiError;
import com.sigorta.demo1.repos.CarRepository;
import com.sigorta.demo1.repos.UserRepository;
import com.sigorta.demo1.services.CarService;
import com.sigorta.demo1.services.KaskoService;

import jakarta.validation.Valid;


@RestController

@RequestMapping("/api/1.0/kasko")
public class KaskoController {
	private final KaskoService kaskoService;
	private final UserRepository userRepository;
	private final CarRepository carRepository;
	private final CarService carService;

    public KaskoController(KaskoService kaskoService,UserRepository userRepository,CarRepository carRepository,CarService carService) {
        this.kaskoService = kaskoService;
        this.userRepository=userRepository;
        this.carRepository=carRepository;
        this.carService=carService;
    }
    @PostMapping("/kaydetme")
    public ResponseEntity<?> saveKaskoPrice(@Valid @RequestBody Kasko kaskoRequest) {
        try {
            
        	if (kaskoService.isCarWithPlakaKoduExists(kaskoRequest.getCar().getPlakaKodu())) {
                // Kullanıcıya uyarı mesajı dönebilirsiniz
                String warningMessage = "Bu plaka koduna sahip bir araç zaten kayıtlı.";
                return ResponseEntity.badRequest().body(warningMessage);
            }
            Kasko kasko = new Kasko();
            kasko.setUser(kaskoRequest.getUser());
            kasko.setCar(kaskoRequest.getCar());	
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
  
    @PostMapping("/kaskofiyati")
    public ResponseEntity<Double> calculateKaskoPrice(@Valid @RequestBody Kasko kaskoRequest) {
        try {
            double calculatedPrice = kaskoService.kaskoFiyat(kaskoRequest.getUser(), kaskoRequest.getCar(), kaskoRequest);
            return ResponseEntity.ok(calculatedPrice);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }



}
