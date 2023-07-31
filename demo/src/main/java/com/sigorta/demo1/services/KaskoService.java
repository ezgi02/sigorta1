package com.sigorta.demo1.services;

import org.springframework.stereotype.Service;

import com.sigorta.demo1.entities.Car;
import com.sigorta.demo1.entities.Kasko;
import com.sigorta.demo1.entities.User;
//import com.sigorta.demo1.repos.CarRepository;
import com.sigorta.demo1.repos.KaskoRepository;

@Service
public class KaskoService {
	private final KaskoRepository kaskoRepository;
	//private final CarRepository carRepository;;

    public KaskoService(KaskoRepository kaskoRepository/*,CarRepository carRepository*/) {
        this.kaskoRepository = kaskoRepository;
        //this.carRepository=carRepository;
        
    }
    public Kasko createKaskoForUserAndCar(User user, Car car, Kasko kasko) {
        kasko.setUser(user);
        kasko.setCar(car);
        double kaskoPrice=(car.getFiyat()*0.5)+kasko.getFiyat();
        kasko.setFiyat(kaskoPrice);
        return kaskoRepository.save(kasko);
    }
	/*public double calculateKaskoPrice(Long carId) {
		Car car=carRepository.findById(carId).orElse(null);
		if(car==null) {
			return 0.0;
		}
		return (car.getFiyat()*0.5);
	}*/
    
}
