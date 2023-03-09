package com.gestion.tourisme.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TSortieSorController {

    @Autowired
    private TSortieSorService tSortieSorService;

    @GetMapping("/t_sortie_sor")
    public List<TSortieSor> getAllTSortieSors() {
        return tSortieSorService.getAllTSortieSors();
    }
}
