package com.sigorta.demo1.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
//import jakarta.validation.constraints.NotNull;

@Entity
@Table(name="cars")
public class Car {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@NotEmpty//(message="Marka boş bırakılamaz.")
    private String marka;
	@NotEmpty(message="Model boş bırakılamaz.")
    private String model;
	
    private int yil;
	
    private int fiyat;
	
    private String aracTür;
    private String hasarsizGunSayisi;

   	public String getHasarsizGunSayisi() {
		return hasarsizGunSayisi;
	}
	public void setHasarsizGunSayisi(String hasarsizGunSayisi) {
		this.hasarsizGunSayisi = hasarsizGunSayisi;
	}
	public String getAracTür() {
		return aracTür;
	}
	public void setAracTür(String aracTür) {
		this.aracTür = aracTür;
	}
	public String getMotorHacim() {
		return motorHacim;
	}
	public void setMotorHacim(String motorHacim) {
		this.motorHacim = motorHacim;
	}
	private String motorHacim;
    
    
	public int getFiyat() {
		return fiyat;
	}
	public void setFiyat(int fiyat) {
		this.fiyat = fiyat;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getMarka() {
		return marka;
	}
	public void setMarka(String marka) {
		this.marka = marka;
	}
	public String getModel() {
		return model;
	}
	public void setModel(String model) {
		this.model = model;
	}
	public int getYil() {
		return yil;
	}
	public void setYil(int yil) {
		this.yil = yil;
	}
	

}
