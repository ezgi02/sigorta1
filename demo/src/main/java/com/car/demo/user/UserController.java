package com.car.demo.user;

//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.car.demo.shared.GenericResponse;



@RestController
public class UserController {
	//private static final Logger log=LoggerFactory.getLogger(UserController.class);
	
	@Autowired
	UserService userService;
	
	@PostMapping("/api/1.0/users")
	public GenericResponse createUser(@RequestBody User user) {
		//log.info(user.toString());
		userService.save(user);
		GenericResponse response=new GenericResponse();
		response.setMessage("user created");
		
		return response;
	}

}
