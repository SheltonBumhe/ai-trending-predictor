package com.trendpredictor;

import java.util.HashMap;
import java.util.Map;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

// Author: Shelton Bumhe
// InflationRateService.java - Service for fetching and providing inflation rates

@Service
public class InflationRateService {
    private Map<String, Double> inflationRates = new HashMap<>();

    @Scheduled(cron = "0 0 3 * * *") // Update daily at 3am
    public void updateInflationRates() {
        RestTemplate restTemplate = new RestTemplate();
        // Example: fetch inflation rates for multiple countries from a real API
        // For demo, we'll mock the data for more countries
        inflationRates.put("US", 3.2);
        inflationRates.put("UK", 2.1);
        inflationRates.put("EU", 2.5);
        inflationRates.put("JP", 1.0); // Japan
        inflationRates.put("IN", 5.5); // India
        inflationRates.put("CA", 3.0); // Canada
        inflationRates.put("AU", 3.6); // Australia
        inflationRates.put("CH", 1.7); // Switzerland
        inflationRates.put("CN", 2.2); // China
        inflationRates.put("BR", 4.1); // Brazil
    }

    public double getInflation(String country) {
        return inflationRates.getOrDefault(country, 0.0);
    }

    public Map<String, Double> getAllInflation() {
        return inflationRates;
    }
} 