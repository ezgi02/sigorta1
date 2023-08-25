package com.sigorta.demo1.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

import com.sigorta.demo1.entities.Dask;
import com.sigorta.demo1.entities.Home;
import com.sigorta.demo1.entities.User;
import com.sigorta.demo1.error.ApiError;
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
	@PostMapping("/calculatePrice")
	public ResponseEntity<Double[]> calculateDaskPrice(@RequestBody Dask daskRequest) {
        try {
        	Dask dask=new Dask();
			dask.setHome(daskRequest.getHome());
			dask.setUser(daskRequest.getUser());
			
			User user=userRepository.save(dask.getUser());
			Home home=homeRepository.save(dask.getHome());
			dask.setUser(user);
			dask.setHome(home);
			Double[] calculatedDaskValues = daskService.calculateDaskPrice(user, home, daskRequest);
            return ResponseEntity.ok(calculatedDaskValues);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
	@ExceptionHandler(MethodArgumentNotValidException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ApiError handleValidationException(MethodArgumentNotValidException exception) {
		ApiError error = new ApiError(400, "Validation error", "/api/1.0/dask/calculatePrice");
		Map<String,String> validationErrors=new HashMap<>();
		for(FieldError fieldError:exception.getBindingResult().getFieldErrors()) {
			validationErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
		}
		error.setValidationErrors(validationErrors);
		return error;
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
	@GetMapping
	public ResponseEntity<List<Dask>> getAllDask(){
		List<Dask> dasks=daskService.getAllDask();
		return ResponseEntity.ok(dasks);
	}
	@DeleteMapping("/{daskId}")
	public void deleteDask(@PathVariable Long daskId) {
		daskService.deleteById(daskId);
	}
}
