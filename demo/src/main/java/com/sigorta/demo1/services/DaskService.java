package com.sigorta.demo1.services;

import org.springframework.stereotype.Service;

import com.sigorta.demo1.entities.Dask;
import com.sigorta.demo1.entities.Home;
import com.sigorta.demo1.entities.User;
import com.sigorta.demo1.repos.DaskRepository;

@Service
public class DaskService {
	private final DaskRepository daskRepository;
	private final BuildCoeffcientService buildCoeffcientService;
	private final BuildYearService buildYearService;
	private final BuildingStyleService buildingStyleService;
	public DaskService(DaskRepository daskRepository,BuildCoeffcientService buildCoeffcientService,BuildingStyleService buildingStyleService,BuildYearService buildYearService) {
		this.daskRepository=daskRepository;
		this.buildCoeffcientService=buildCoeffcientService;
		this.buildingStyleService=buildingStyleService;
		this.buildYearService=buildYearService;
	}
	public Double calculateDaskPrice(User user,Home home,Dask dask) {
		double dasksigorta=0;
		//double dasksigorta2=0;
		//sigorta+=buildingStyleService.
		dasksigorta+=buildingStyleService.getFiyat(home.getBuildingStyle());
		dasksigorta=((100+buildYearService.getFiyat(home.getConstructionYear()))*dasksigorta)/100;
		
		return dasksigorta=dasksigorta+dask.getSigortaPrim();
	}
	public Dask createDask(User user,Home home,Dask dask) {
		double calculatedDaskPrice=calculateDaskPrice(user, home, dask);
		dask.setSigortaPrim(calculatedDaskPrice);
		dask.setUser(user);
		dask.setHome(home);
		return daskRepository.save(dask);
	}
}
