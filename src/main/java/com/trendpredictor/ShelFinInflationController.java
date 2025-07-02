package com.trendpredictor;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/shelfin/inflation")
public class ShelFinInflationController {
    @GetMapping
    public Map<String, Object> getInflationAndRates() {
        // In production, fetch from a real API
        Map<String, Object> data = new HashMap<>();
        data.put("inflation", 3.2); // %
        data.put("usd_to_eur", 0.92);
        data.put("usd_to_gbp", 0.78);
        data.put("last_updated", new Date());
        return data;
    }
} 