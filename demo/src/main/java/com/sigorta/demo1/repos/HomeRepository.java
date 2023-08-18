package com.sigorta.demo1.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sigorta.demo1.entities.Home;

public interface HomeRepository extends JpaRepository<Home,Long> {

}
