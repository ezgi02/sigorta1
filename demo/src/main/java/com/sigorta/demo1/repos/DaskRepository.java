package com.sigorta.demo1.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sigorta.demo1.entities.Dask;
import com.sigorta.demo1.entities.User;

public interface DaskRepository extends JpaRepository<Dask, Long>{
	List<Dask> findByUser(User user);
}
