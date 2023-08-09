package com.sigorta.demo1.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sigorta.demo1.entities.User;

public interface UserRepository extends JpaRepository<User,Long> {

	
	 List<User> findByUsername(String username);
	    User findByTc(String tc);
	    List<User> findByUsernameAndTcNot(String username, String tc);

}
