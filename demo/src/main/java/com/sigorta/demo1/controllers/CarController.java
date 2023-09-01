package com.sigorta.demo1.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.sigorta.demo1.entities.Car;
import com.sigorta.demo1.error.ApiError;
import com.sigorta.demo1.services.CarService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/1.0/cars")
public class CarController {
	@Autowired
	CarService carService;
	@PostMapping
	public ResponseEntity<?> createCar(@Valid @RequestBody Car car) {
		/*ApiError error=new ApiError(400,"Validation error","/api/1.0/cars");
		Map<String,String> validationErrors=new HashMap<>();
		String marka=car.getMarka();
		if(marka==null || marka.isEmpty()) {
			validationErrors.put("marka", "marka can not  be null");
		}
		if(validationErrors.size()>0) {
			error.setValidationErrors(validationErrors);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
		}*/
        Car createdCar = carService.save(car);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCar);
    }
	/*@ExceptionHandler(MethodArgumentNotValidException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiError handleValidationException(MethodArgumentNotValidException exception) {
		//ApiError error=new ApiError(400,"Validation error","/api/1.0/cars");
        Map<String, String> validationErrors = new HashMap<>();
        BindingResult bindingResult = exception.getBindingResult();
        for (FieldError fieldError : bindingResult.getFieldErrors()) {
            validationErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
        }
        
        ApiError apiError = new ApiError(HttpStatus.BAD_REQUEST.value(), "Validation error", "/api/1.0/cars");
        apiError.setValidationErrors(validationErrors);
        
     //   return ResponseEntity.badRequest().body(apiError);
        return apiError;
    }*/
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
