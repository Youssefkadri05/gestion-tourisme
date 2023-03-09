package com.gestion.tourisme.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan(basePackages = {"com.gestion.tourisme.demo"})
public class DemoGestionTourismeApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoGestionTourismeApplication.class, args);
		System.out.println("Run application gestion tourisme");
	}

}
