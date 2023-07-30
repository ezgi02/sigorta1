package com.sigorta.demo1.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sigorta.demo1.entities.Car;

public interface CarRepository extends JpaRepository<Car, Long>{

}
