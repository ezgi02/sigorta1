package com.sigorta.demo1.controllers;


import java.util.Map;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sigorta.demo1.entities.User;
import com.sigorta.demo1.error.ApiError;
import com.sigorta.demo1.services.UserService;
import com.sigorta.demo1.shared.GenericResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/1.0/users")
public class UserController {
	@Autowired
	UserService userService;
	/*@GetMapping
	public List<User> getAllUsers(){
		return userService.getAllUsers();
	}*/
	
	@PostMapping
	public ResponseEntity<?> createUser(@Valid @RequestBody User user) {
		//log.info(user.toString());
		ApiError error=new ApiError(400,"Validation error","/api/1.0/users");
		Map<String,String>validationErrors=new HashMap<>();
		String username=user.getUsername();	
		String surname=user.getSurname();	
		if(username==null || username.isEmpty()) {
			validationErrors.put("username", "username cannot be null");
		}
		if(surname==null || surname.isEmpty()) {
			
			validationErrors.put("surname", "surname cannot be null");
		}
		if(validationErrors.size()>0) {
			error.setValidationErrors(validationErrors);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
			
		}
		
		userService.save(user);
		return ResponseEntity.ok(new GenericResponse("user created"));}
		
		 @GetMapping("/{userId}")
		 public User getOneUser(@PathVariable Long userId) {
			 return userService.getOneUser(userId);
		 }
		 @PutMapping("/{userId}")
		 public User updateOneUser(@PathVariable Long userId,@RequestBody User newUser) {
			 return userService.updateOneUser(userId,newUser);
		 }
		 @DeleteMapping("/{userId}")
		 public void deleteOneUser(@PathVariable Long userId) {
			 userService.deleteById(userId);
		 }
		
		
		
	}

