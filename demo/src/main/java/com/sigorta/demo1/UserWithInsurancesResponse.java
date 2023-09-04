package com.sigorta.demo1;

import java.util.List;

import com.sigorta.demo1.entities.Dask;
import com.sigorta.demo1.entities.Kasko;
import com.sigorta.demo1.entities.Traffic;

import lombok.Data;

@Data
public class UserWithInsurancesResponse {
    private String username;
    private String surname;
    private List<Kasko> kaskoList;
    private List<Traffic> trafficList;
    private List<Dask> daskList;
    public UserWithInsurancesResponse(String username, String surname,List<Kasko> kaskoList, List<Traffic> trafficList, List<Dask> daskList) {
        this.username = username;
        this.surname=surname;
        this.kaskoList = kaskoList;
        this.trafficList = trafficList;
        this.daskList = daskList;
    }

}
