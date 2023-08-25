package com.sigorta.demo1.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
//import jakarta.validation.constraints.NotEmpty;
//import jakarta.validation.constraints.NotNull;
//import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
@Entity
@Table(name="homes")
public class Home {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	//@NotEmpty
	private String city;
	//@NotEmpty
	private String district;
	//@NotEmpty
	private String buildingStyle;
	//@NotEmpty
	private String constructionYear;
	//@NotEmpty
	private String numberofFloors;
	//@NotEmpty
	private double area;
	//@NotEmpty
	private String selection;
	
	

}
