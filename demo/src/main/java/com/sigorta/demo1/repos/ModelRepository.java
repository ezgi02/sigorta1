package com.sigorta.demo1.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sigorta.demo1.entities.Model;

public interface ModelRepository extends JpaRepository<Model, Long> {

}
