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
	public Double calculateTrafficPrice(User user, Car car,Traffic traffic) {
		double trafikHesap=0;
		double trafikHesap1=0;
		int yil=car.getYil();
		if(yil>=2010 && yil<=2015) {
			trafikHesap+=1000;
		}
		else if(yil>2015 && yil<2020) {
			trafikHesap+=600;
		}
		else {
			trafikHesap+=400;
		}
		if (car.getAracTür().equals("Otomobil")) {
			trafikHesap1 += 600;
		} else if (car.getAracTür().equals("Motorsiklet")) {
			trafikHesap1 += 300;
		} else if (car.getAracTür().equals("Kamyonet")) {
			trafikHesap1 += 1000;
		} else {
			trafikHesap1 += 100;
		}
		if(car.getMotorHacim().equals("1300")) {
			trafikHesap1+=400;
		}else if(car.getMotorHacim().equals("1301-1600")) {
			trafikHesap1+=800;
		}else if(car.getMotorHacim().equals("1601 - 1800")) {
			trafikHesap1+=1200;
		}else if(car.getMotorHacim().equals("1801 - 2000")) {
			trafikHesap1+=1600;
		}else if(car.getMotorHacim().equals("2001 - 2500")) {
			trafikHesap1+=2000;
		}
		else {
			trafikHesap1+=0;
		}
		double trafficPrice=trafikHesap1+trafikHesap;
		if(car.getHasarsizGunSayisi().equals("0-180'")) {
			trafficPrice=trafficPrice*2.3;
		}else if(car.getHasarsizGunSayisi().equals("181-365")) {
			trafficPrice=trafficPrice*1.9;
		}else if(car.getHasarsizGunSayisi().equals("366-540")) {
			trafficPrice=trafficPrice*1.5;
		}else if(car.getHasarsizGunSayisi().equals("541-720")) {
			trafficPrice=trafficPrice*0.2;
		}else if(car.getHasarsizGunSayisi().equals("721-1095")) {
			trafficPrice=trafficPrice*0.3;
		}else if(car.getHasarsizGunSayisi().equals("1096-1825")) {
			trafficPrice=trafficPrice*0.5;
		}else {
			trafficPrice*=1;
		}
		if(user.getYas()>18 && user.getYas()<=36) {
			trafficPrice+=100;
		}
		else if(user.getYas()>37 && user.getYas()<=44) {
			trafficPrice+=600;
		}
		else if(user.getYas()>45 && user.getYas()<52) {
			trafficPrice+=900;
		}
		else {
			trafficPrice+=1000;
		}
		return trafficPrice= trafficPrice+traffic.getFiyat();
				
		//traffic.setFiyat(trafficPrice+traffic.getFiyat());
		//return trafficRepository.save(traffic);
		
}   
	public Traffic createTraffic(User user, Car car, Traffic traffic) {
        double calculatedPrice = calculateTrafficPrice(user, car, traffic);

        traffic.setFiyat(calculatedPrice);
        traffic.setUser(user);
        traffic.setCar(car);

        return trafficRepository.save(traffic);
    }
	}
