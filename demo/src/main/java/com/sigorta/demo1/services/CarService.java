package com.sigorta.demo1.services;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.sigorta.demo1.entities.Car;

import com.sigorta.demo1.repos.CarRepository;

@Service
public class CarService {
	CarRepository carRepository;
	public CarService(CarRepository carRepository) {
		this.carRepository=carRepository;
	}
	public Car save(Car car) {
        return carRepository.save(car);
    }
	
	public Car updateOneCar(Long carId,Car newCar) {
		Optional<Car> car=carRepository.findById(carId);
		 if(car.isPresent()) {
			 Car foundCar=car.get();
			 foundCar.setFiyat(newCar.getFiyat());
			 foundCar.setMarka(newCar.getMarka());
			 foundCar.setModel(newCar.getModel());
			 foundCar.setYil(newCar.getYil());
			 carRepository.save(foundCar);
			 return foundCar;
			 }else
				 return null;
	 }

	public void deleteById(Long carId) {
		
		carRepository.deleteById(carId);
		}
	
	public double calculateKasko(Car car) {
		double kaskoFiyati=car.getFiyat()*0.3;
		return kaskoFiyati;
    }

    public Car getCarById(long carId) {
        return carRepository.findById(carId).orElse(null);
    }


}
