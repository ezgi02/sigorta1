package com.sigorta.demo1.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sigorta.demo1.entities.Car;

import com.sigorta.demo1.services.CarService;

@RestController
@RequestMapping("/api/1.0/cars")
public class CarController {
	@Autowired
	CarService carService;
	@PostMapping
	public ResponseEntity<Car> createCar(@RequestBody Car car) {
        Car createdCar = carService.save(car);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCar);
    }
	@PutMapping("/{carId}")
	 public Car updateOneCar(@PathVariable Long carId,@RequestBody Car newCar) {
		 return carService.updateOneCar(carId,newCar);
	 }
	 @DeleteMapping("/{carId}")
	 public void deleteOneUser(@PathVariable Long carId) {
		 carService.deleteById(carId);
	 }

	@PostMapping("/{carId}/calculateKasko")
    public double calculateKasko(@PathVariable Long carId) {
        Car car = carService.getCarById(carId);
        if (car == null) {
            throw new RuntimeException("Car not found!");
        }

        double kaskoValue= carService.calculateKasko(car);
        return kaskoValue;
        
    }

}
