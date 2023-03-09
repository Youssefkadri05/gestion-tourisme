package com.gestion.tourisme.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TSortieSorService {

    @Autowired
    private TSortieSorRepository tSortieSorRepository;

    public List<TSortieSor> getAllTSortieSors() {
        return tSortieSorRepository.findAll();
    }
}
