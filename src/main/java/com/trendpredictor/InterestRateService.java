package com.trendpredictor;

import java.util.HashMap;
import java.util.Map;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class InterestRateService {
    private Map<String, Double> interestRates = new HashMap<>();

    @Scheduled(cron = "0 0 4 * * *") // Update daily at 4am
    public void updateInterestRates() {
        RestTemplate restTemplate = new RestTemplate();
        // Example: fetch US interest rate from FRED (replace with your API key and endpoint)
        // String url = "https://api.stlouisfed.org/fred/series/observations?series_id=FEDFUNDS&api_key=YOUR_API_KEY&file_type=json";
        // Map response = restTemplate.getForObject(url, Map.class);
        // if (response != null && response.containsKey("observations")) {
        //     List<Map> obs = (List<Map>) response.get("observations");
        //     if (!obs.isEmpty()) {
        //         Double usRate = Double.valueOf((String) obs.get(obs.size()-1).get("value"));
        //         interestRates.put("US", usRate);
        //     }
        // }
        // For demo, we'll mock the data
        interestRates.put("US", 5.25);
        interestRates.put("UK", 4.5);
        interestRates.put("EU", 3.75);
    }

    public double getInterest(String country) {
        return interestRates.getOrDefault(country, 0.0);
    }

    public Map<String, Double> getAllInterest() {
        return interestRates;
    }
} 