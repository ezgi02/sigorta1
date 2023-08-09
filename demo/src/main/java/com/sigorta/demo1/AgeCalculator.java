package com.sigorta.demo1;

import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;

public class AgeCalculator {
	public static int calculateAge(String birthDateStr) {
		LocalDate birthDate=LocalDate.parse(birthDateStr,DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        LocalDate currentDate = LocalDate.now();
        Period ageDifference = Period.between(birthDate, currentDate);
        return ageDifference.getYears();
    }

}
