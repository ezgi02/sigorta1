package com.sigorta.demo1.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sigorta.demo1.entities.BuildYear;

public interface BuildYearRepository extends JpaRepository<BuildYear, Long>{
	BuildYear findByBuildYear(String buildYear);
}
