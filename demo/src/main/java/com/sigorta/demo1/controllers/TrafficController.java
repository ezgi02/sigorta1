package com.sigorta.demo1.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.sigorta.demo1.entities.Car;
import com.sigorta.demo1.entities.Traffic;
import com.sigorta.demo1.entities.User;
import com.sigorta.demo1.error.ApiError;
import com.sigorta.demo1.repos.CarRepository;
import com.sigorta.demo1.repos.UserRepository;
import com.sigorta.demo1.services.TrafficService;

import jakarta.validation.Valid;

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
    public ResponseEntity<Double> calculateTrafficPrice(@Valid @RequestBody Traffic trafficRequest) {
      //  try {
        	Traffic traffic=new Traffic();
			traffic.setCar(trafficRequest.getCar());
			traffic.setUser(trafficRequest.getUser());
			
			User user=userRepository.save(traffic.getUser());
			Car car=carRepository.save(traffic.getCar());
			traffic.setUser(user);
			traffic.setCar(car);
			Double calculatedPrice = trafficService.calculateTrafficPrice(user, car, trafficRequest);
            return ResponseEntity.ok(calculatedPrice);
       // } /*catch (Exception ex) {
          /*  return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }*/
    }
	@ExceptionHandler(MethodArgumentNotValidException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiError handleValidationException(MethodArgumentNotValidException exception) {
		//ApiError error=new ApiError(400,"Validation error","/api/1.0/traffic/calculatePrice");
        Map<String, String> validationErrors = new HashMap<>();
        BindingResult bindingResult = exception.getBindingResult();
        for (FieldError fieldError : bindingResult.getFieldErrors()) {
            validationErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
        }
        
        ApiError apiError = new ApiError(HttpStatus.BAD_REQUEST.value(), "Validation error", "/api/1.0/traffic/calculatePrice");
        apiError.setValidationErrors(validationErrors);
        
     //   return ResponseEntity.badRequest().body(apiError);
        return apiError;
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
	 /*@GetMapping
	    public ResponseEntity<List<User>> getAllUsers() {
	        List<User> users = userService.getAllUsers();
	        return ResponseEntity.ok(users);
	    }*/
	 @GetMapping
	 public ResponseEntity<List<Traffic>> getAllTraffic(){
		 List<Traffic> traffics=trafficService.getAllTraffic();
		 return ResponseEntity.ok(traffics);
		 
		 
	 }
	
	 @DeleteMapping("/{trafficId}")
	 public void deleteTraffic(@PathVariable Long trafficId) {
		 trafficService.deleteById(trafficId);
	 }
}







