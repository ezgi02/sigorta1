package com.sigorta.demo1.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sigorta.demo1.entities.City;

public interface CityRepository extends JpaRepository<City,Long>{

}
