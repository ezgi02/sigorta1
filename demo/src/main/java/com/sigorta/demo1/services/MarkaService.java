package com.sigorta.demo1.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sigorta.demo1.entities.Marka;
import com.sigorta.demo1.repos.MarkaRepository;

@Service
public class MarkaService {
    @Autowired
    private MarkaRepository markaRepository;

    public List<Marka> getAllMarkalar() {
        return markaRepository.findAll();
    }

}
