package com.sigorta.demo1.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity 
@Table(name="traffic_insurances")
public class Traffic {
	 @Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	 private Long id;

	 private String hasarsizGunSayisi;
	 @ManyToOne
	 @JoinColumn(name="user_id")
		private User user;
		
	 @ManyToOne
	 @JoinColumn(name = "car_id")
	 private Car car;
	 
	 
	 private double fiyat;
	 
	 
	 public Traffic() {
		 this.fiyat =1000.0;
	   }
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}



	public String getHasarsizGunSayisi() {
		return hasarsizGunSayisi;
	}

	public void setHasarsizGunSayisi(String hasarsizGunSayisi) {
		this.hasarsizGunSayisi = hasarsizGunSayisi;
	}

	public double getFiyat() {
		return fiyat;
	}

	public void setFiyat(double fiyat) {
		this.fiyat = fiyat;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public Car getCar() {
		return car;
	}
	public void setCar(Car car) {
		this.car = car;
	}
}
