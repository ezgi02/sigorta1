package com.sigorta.demo1.services;

import org.springframework.stereotype.Service;

import com.sigorta.demo1.entities.Car;
import com.sigorta.demo1.entities.Traffic;
import com.sigorta.demo1.entities.User;
import com.sigorta.demo1.repos.TrafficRepository;

@Service
public class TrafficService {
private final TrafficRepository trafficRepository;
	
	public TrafficService( TrafficRepository trafficRepository) {
		this.trafficRepository=trafficRepository;
	}
	public Traffic createTraffic(User user, Car car,Traffic traffic) {
		double trafikHesap=0;
		double trafikHesap1=0;
		int yil=car.getYil();
		if(yil>=2010 && yil<=2015) {
			trafikHesap+=800;
		}
		else if(yil>2015 && yil<2020) {
			trafikHesap+=400;
		}
		else {
			trafikHesap+=200;
		}
		if (car.getAracTür().equals("Otomobil")) {
			trafikHesap1 += 800;
		} else if (car.getAracTür().equals("Motorsiklet")) {
			trafikHesap1 += 300;
		} else if (car.getAracTür().equals("Kamyonet")) {
			trafikHesap1 += 1000;
		} else {
			trafikHesap1 += 100;
		}
		double trafficPrice=trafikHesap1+trafikHesap;
		traffic.setFiyat(trafficPrice+traffic.getFiyat());
		traffic.setUser(user);
		traffic.setCar(car);
		
		//traffic.setFiyat(trafficPrice+traffic.getFiyat());
		return trafficRepository.save(traffic);
}}
