package com.sigorta.demo1.services;

import java.util.List;
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

	public User save(User user) {
		return userRepository.save(user);
		
	}
	public User getOneUser(Long userId) {
		return userRepository.findById(userId).orElse(null);
	}
	 public List<User> getAllUsers() {
	        return userRepository.findAll();
	    }

	public User updateOneUser(Long userId,User newUser) {
		Optional<User> user=userRepository.findById(userId);
		 if(user.isPresent()) {
			 User foundUser=user.get();
			 foundUser.setUsername(newUser.getUsername());
			 foundUser.setSurname(newUser.getSurname());
			 foundUser.setPhone(newUser.getPhone());
			 foundUser.setTc(newUser.getTc());
			 foundUser.setBirthDate(newUser.getBirthDate());
		//	 foundUser.setYas(newUser.getYas());
			 userRepository.save(foundUser);
			 return foundUser;
			 }else
				 return null;
	 }

	public void deleteById(Long userId) {
		// TODO Auto-generated method stub
		userRepository.deleteById(userId);
		}
	 public User getUserWithSameTc(String tc) {
	        return userRepository.findByTc(tc);
	    }
	}
	


