package com.sigorta.demo1.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sigorta.demo1.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {

}
