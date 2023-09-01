package com.sigorta.demo1.entities;


import com.sigorta.demo1.AgeCalculator;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Entity
@Table(name="users")
public class User {
	@Id
	@GeneratedValue
	private long id;
	@NotNull
	@NotEmpty
	private String username;
	@NotEmpty
	@NotNull
	private String surname;
	@NotNull
	@NotEmpty(message="TC Kimlik Numarası boş bırakılamaz")
    @Size(min = 11, max = 11, message = "TC Kimlik Numarası 11 haneli olmalıdır")
    @Pattern(regexp = "\\d+", message = "TC Kimlik Numarası sadece rakamlardan oluşmalıdır")
	
	private String tc;
	@NotNull
	@Pattern(regexp = "\\d{3}-\\d{3}-\\d{4}", message = "Geçerli bir telefon numarası formatı kullanın")
	@Size(min = 10, max = 15, message = "Telefon numarası 10 ile 15 karakter arasında olmalıdır")
	private String phone;
	@NotNull
	@NotEmpty(message="doğum tarihi boş bırakılamaz")
	private String birthDate;
	
	
	public int getYas() {
		if(birthDate !=null) {
			return AgeCalculator.calculateAge(birthDate);
		}
		return 0;
		
	}
	
	public String getBirthDate() {
		return birthDate;
	}
	public void setBirthDate(String birthDate) {
		this.birthDate = birthDate;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getSurname() {
		return surname;
	}
	public void setSurname(String surname) {
		this.surname = surname;
	}
	public String getTc() {
		return tc;
	}
	public void setTc(String tc) {
		this.tc = tc;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	@Override
	public String toString() {
		return "User [username=" + username + ", surname=" + surname + ", tc=" + tc + ", phone=" + phone + "]";
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}

}
