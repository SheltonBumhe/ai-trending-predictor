package com.trendpredictor;

import java.util.HashMap;
import java.util.Map;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

// Author: Shelton Bumhe
// ExchangeRateService.java - Service for fetching and providing currency exchange rates

@Service
public class ExchangeRateService {
    private Map<String, Double> rates = new HashMap<>();

    @Scheduled(cron = "0 0 2 * * *") // Update daily at 2am
    public void updateRates() {
        RestTemplate restTemplate = new RestTemplate();
        // Fetch all available currencies
        Map response = restTemplate.getForObject("https://api.exchangerate.host/latest?base=USD", Map.class);
        Map<String, Double> newRates = (Map<String, Double>) response.get("rates");
        if (newRates != null) {
            rates.putAll(newRates);
        }
    }

    public double getRate(String from, String to) {
        if (from.equalsIgnoreCase(to)) return 1.0;
        if (!rates.containsKey(from) || !rates.containsKey(to)) return 1.0;
        return rates.get(to) / rates.get(from);
    }
} 