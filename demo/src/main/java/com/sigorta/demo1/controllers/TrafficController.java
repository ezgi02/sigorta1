package com.sigorta.demo1.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.sigorta.demo1.entities.Car;
import com.sigorta.demo1.entities.Traffic;
import com.sigorta.demo1.entities.User;
import com.sigorta.demo1.error.ApiError;
import com.sigorta.demo1.repos.CarRepository;
import com.sigorta.demo1.repos.UserRepository;
import com.sigorta.demo1.services.TrafficService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/1.0/traffic")
public class TrafficController {
	private final TrafficService trafficService;
	private final UserRepository userRepository;
	private final CarRepository carRepository;

	@Autowired
	public TrafficController(TrafficService trafficService, UserRepository userRepository,
			CarRepository carRepository) {

		this.trafficService = trafficService;
		this.userRepository = userRepository;
		this.carRepository = carRepository;
	}

	@PostMapping("/calculatePrice")
	public ResponseEntity<?> calculateTrafficPrice(@Valid @RequestBody Traffic trafficRequest) {
		ApiError error = new ApiError(400, "Validation error", "/api/1.0/traffic/saveTraffic");
		Map<String, String> validationErrors = new HashMap<>();
		String marka = trafficRequest.getCar().getMarka();
		String model = trafficRequest.getCar().getModel();
		String aracTür=trafficRequest.getCar().getAracTür();
		String motorHacim=trafficRequest.getCar().getAracTür();
		String hasarsizGunSayisi=trafficRequest.getCar().getHasarsizGunSayisi();
		String plakaKodu=trafficRequest.getCar().getPlakaKodu();
		//Integer fiyat=trafficRequest.getCar().getFiyat();
		Integer yil=trafficRequest.getCar().getYil();
		if (marka == null || marka.isEmpty()) {
			validationErrors.put("marka", "marka cannot be null");
		}
		if (model == null || model.isEmpty()) {
			validationErrors.put("model", "model cannot be null");
		}
		if (aracTür == null || aracTür.isEmpty()) {
			validationErrors.put("aracTür", "aracTür cannot be null");
		}
		if(motorHacim==null || motorHacim.isEmpty()) {
			validationErrors.put("motorHacim", "Lutfen motor hacmini boş bırakmayınız");
		}
		if(hasarsizGunSayisi==null || hasarsizGunSayisi.isEmpty()) {
			validationErrors.put("hasarsizGunSayisi","Lutfen hasarsiz gun sayisi boş bırakmayınız" );
		}
		if (plakaKodu == null || plakaKodu.length() != 8) {
		    validationErrors.put("plakaKodu", "Lütfen 8 karakterden oluşan bir plaka kodu giriniz");
		}
		
		
		

		/*if (yil.toString().isEmpty()|| yil.toString()==null) {
		    validationErrors.put("yil", "Lütfen bir yıl giriniz");
		} */

		if (validationErrors.size() > 0) {
			error.setValidationErrors(validationErrors);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
		}
		
		

		Traffic traffic = new Traffic();
		traffic.setCar(trafficRequest.getCar());
		traffic.setUser(trafficRequest.getUser());

		Double calculatedPrice = trafficService.calculateTrafficPrice(trafficRequest.getUser(), trafficRequest.getCar(),
				trafficRequest);
		return ResponseEntity.ok(calculatedPrice);

	}

	@PostMapping("/saveTraffic")
	public ResponseEntity<?> saveTraffic(@RequestBody Traffic trafficRequest) {
		// try {
		if (trafficService.isCarWithPlakaKoduExists(trafficRequest.getCar().getPlakaKodu())) {

			String warningMessage = "Bu plaka koduna sahip bir araç zaten kayıtlı.";
			return ResponseEntity.badRequest().body(warningMessage);
		}

		Traffic traffic = new Traffic();
		traffic.setCar(trafficRequest.getCar());
		traffic.setUser(trafficRequest.getUser());

		// User user = userRepository.save(traffic.getUser());
	Car car = carRepository.save(traffic.getCar());
		// traffic.setUser(user);
	traffic.setCar(car);

		Traffic createdTraffic = trafficService.createTraffic(trafficRequest.getUser(), trafficRequest.getCar(), traffic);

		return ResponseEntity.ok(createdTraffic);
		// } catch (Exception ex) {
		/*
		 * return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); }
		 */
	}

	@GetMapping
	public ResponseEntity<List<Traffic>> getAllTraffic() {
		List<Traffic> traffics = trafficService.getAllTraffic();
		return ResponseEntity.ok(traffics);
	}

	@DeleteMapping("/{trafficId}")
	public void deleteTraffic(@PathVariable Long trafficId) {
		trafficService.deleteById(trafficId);
	}
}
