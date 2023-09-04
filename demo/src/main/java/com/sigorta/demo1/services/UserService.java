package com.sigorta.demo1.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sigorta.demo1.UserWithInsurancesResponse;
import com.sigorta.demo1.entities.Dask;
import com.sigorta.demo1.entities.Traffic;
import com.sigorta.demo1.entities.User;
import com.sigorta.demo1.entities.Kasko;
import com.sigorta.demo1.repos.DaskRepository;
import com.sigorta.demo1.repos.KaskoRepository;
import com.sigorta.demo1.repos.TrafficRepository;
import com.sigorta.demo1.repos.UserRepository;

@Service
public class UserService {
	UserRepository userRepository;
	@Autowired
    private KaskoRepository kaskoRepository;
    @Autowired
    private TrafficRepository trafficRepository;
    @Autowired
    private DaskRepository daskRepository;
	
	public UserService(UserRepository userRepository) {
		this.userRepository=userRepository;  
	}
	 public List<UserWithInsurancesResponse> getAllUsersWithInsurances() {
	        List<User> users = userRepository.findAll();
	        List<UserWithInsurancesResponse> usersWithInsurances = new ArrayList<>();

	        for (User user : users) {
	            List<Kasko> kaskoList = kaskoRepository.findByUser(user);
	            List<Traffic> trafficList = trafficRepository.findByUser(user);
	            List<Dask> daskList = daskRepository.findByUser(user);

	            UserWithInsurancesResponse userWithInsurances = new UserWithInsurancesResponse(
	                user.getUsername(),
	                user.getSurname(),
	                kaskoList,
	                trafficList,
	                daskList
	            );

	            usersWithInsurances.add(userWithInsurances);
	        }

	        return usersWithInsurances;
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
	


