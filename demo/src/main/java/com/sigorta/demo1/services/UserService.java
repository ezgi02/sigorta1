package com.sigorta.demo1.services;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.sigorta.demo1.entities.User;
import com.sigorta.demo1.repos.UserRepository;

@Service
public class UserService {
	UserRepository userRepository;
	
	public UserService(UserRepository userRepository) {
		this.userRepository=userRepository;  
	}

	public void save(User user) {
		// 
		userRepository.save(user);
		
	}
	public User getOneUser(Long userId) {
		return userRepository.findById(userId).orElse(null);
	}
	public User updateOneUser(Long userId,User newUser) {
		Optional<User> user=userRepository.findById(userId);
		 if(user.isPresent()) {
			 User foundUser=user.get();
			 foundUser.setUsername(newUser.getUsername());
			 foundUser.setSurname(newUser.getSurname());
			 foundUser.setPhone(newUser.getPhone());
			 foundUser.setTc(newUser.getTc());
			 userRepository.save(foundUser);
			 return foundUser;
			 }else
				 return null;
	 }

	public void deleteById(Long userId) {
		// TODO Auto-generated method stub
		userRepository.deleteById(userId);
		}
	}
	


