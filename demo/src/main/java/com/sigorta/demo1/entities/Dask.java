package com.sigorta.demo1.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
//import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity 
public class Dask {
	 @Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	 private Long id;

	
	 @ManyToOne
	 @JoinColumn(name="user_id")
		private User user;
	 
	 //@NotNull
	 @ManyToOne
	 @JoinColumn(name = "home_id")
	 private Home home;
	 
	 private double fiyat;
	 private double sigortaPrim;
	 public Dask() {
		 this.fiyat=200000;
		 this.sigortaPrim=300;
	 }
}
