package com.sigorta.demo1.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.sigorta.demo1.entities.Car;
import com.sigorta.demo1.entities.Traffic;
import com.sigorta.demo1.entities.User;
import com.sigorta.demo1.repos.TrafficRepository;

@Service
public class TrafficService {
private final TrafficRepository trafficRepository;
private final MotorService motorService;
private final HasarsizGunSayiService hasarsizGunSayiService;
	public TrafficService( TrafficRepository trafficRepository,MotorService motorService,HasarsizGunSayiService hasarsizGunSayiService) {
		this.trafficRepository=trafficRepository;
		this.motorService=motorService;
		this.hasarsizGunSayiService=hasarsizGunSayiService;
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
		
		trafikHesap1+=motorService.getMotorPrice(car.getMotorHacim());
		double trafficPrice=trafikHesap1+trafikHesap;
		trafficPrice*=hasarsizGunSayiService.getHasarsizKatsayi(car.getHasarsizGunSayisi());
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
}   
	public Traffic createTraffic(User user, Car car, Traffic traffic) {
        double calculatedPrice = calculateTrafficPrice(user, car, traffic);

        traffic.setFiyat(calculatedPrice);
        traffic.setUser(user);
        traffic.setCar(car);

        return trafficRepository.save(traffic);
    }
	 public List<Traffic> getAllTraffic() {
	        return trafficRepository.findAll();	    
	        }
	 
	 public void deleteById(Long trafficId) {
		 trafficRepository.deleteById(trafficId);
	 }

	}


