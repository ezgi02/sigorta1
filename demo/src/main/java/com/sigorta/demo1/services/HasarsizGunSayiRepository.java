package com.sigorta.demo1.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sigorta.demo1.entities.HasarsizGunSayi;

public interface HasarsizGunSayiRepository  extends JpaRepository<HasarsizGunSayi,Long>{
	 HasarsizGunSayi findByHasarsizgunsayi(String hasarsizgunsayi);

}
