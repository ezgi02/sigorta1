package com.sigorta.demo1.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sigorta.demo1.entities.Kasko;
import com.sigorta.demo1.entities.User;

public interface KaskoRepository extends JpaRepository<Kasko, Long>{
	List<Kasko> findByUser(User user);
}
