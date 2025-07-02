package com.trendpredictor;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/shelfin/rates")
public class ShelFinRatesController {
    @Autowired
    private InflationRateService inflationRateService;
    @Autowired
    private InterestRateService interestRateService;

    @GetMapping("/inflation")
    public Map<String, Double> getInflationRates() {
        return inflationRateService.getAllInflation();
    }

    @GetMapping("/interest")
    public Map<String, Double> getInterestRates() {
        return interestRateService.getAllInterest();
    }
} 