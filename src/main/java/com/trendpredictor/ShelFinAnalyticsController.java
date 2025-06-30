package com.trendpredictor;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

// Author: Shelton Bumhe
// ShelFinAnalyticsController.java - Controller for analytics endpoints, including inflation-adjusted analytics

@RestController
@RequestMapping("/api/shelfin/analytics")
public class ShelFinAnalyticsController {
    @Autowired
    private TransactionRepository transactionRepository;
    @Autowired
    private ExchangeRateService exchangeRateService;
    @Autowired
    private InflationRateService inflationRateService;

    @GetMapping("/spending-by-category/{userId}")
    public Map<String, Double> spendingByCategory(@PathVariable Long userId) {
        List<Transaction> txs = transactionRepository.findByUserId(userId);
        Map<String, Double> result = new HashMap<>();
        for (Transaction tx : txs) {
            if ("expense".equalsIgnoreCase(tx.getType())) {
                result.put(tx.getCategory(), result.getOrDefault(tx.getCategory(), 0.0) + tx.getAmount());
            }
        }
        return result;
    }

    @GetMapping("/spending-by-month/{userId}")
    public Map<String, Double> spendingByMonth(@PathVariable Long userId) {
        List<Transaction> txs = transactionRepository.findByUserId(userId);
        Map<String, Double> result = new HashMap<>();
        for (Transaction tx : txs) {
            if ("expense".equalsIgnoreCase(tx.getType())) {
                String month = tx.getDate().getYear() + "-" + String.format("%02d", tx.getDate().getMonthValue());
                result.put(month, result.getOrDefault(month, 0.0) + tx.getAmount());
            }
        }
        return result;
    }

    @GetMapping("/tips/{userId}")
    public List<String> smartTips(@PathVariable Long userId) {
        List<Transaction> txs = transactionRepository.findByUserId(userId);
        double total = txs.stream().filter(tx -> "expense".equalsIgnoreCase(tx.getType())).mapToDouble(Transaction::getAmount).sum();
        List<String> tips = new ArrayList<>();
        if (total > 1000) tips.add("Consider reducing your monthly expenses. Try setting a budget goal!");
        if (txs.stream().anyMatch(tx -> tx.getCategory().equalsIgnoreCase("dining"))) tips.add("Dining out is a common expense. Cooking at home can save money.");
        if (txs.stream().anyMatch(tx -> tx.getCategory().equalsIgnoreCase("subscriptions"))) tips.add("Review your subscriptions. Cancel those you don't use.");
        if (tips.isEmpty()) tips.add("Great job managing your budget!");
        return tips;
    }

    @GetMapping("/inflation-adjusted/{userId}")
    public List<Map<String, Object>> inflationAdjustedAnalytics(
            @PathVariable Long userId,
            @RequestParam(defaultValue = "USD") String currency,
            @RequestParam(defaultValue = "US") String country) {
        List<Transaction> txs = transactionRepository.findByUserId(userId);
        double inflation = inflationRateService.getInflation(country);
        List<Map<String, Object>> result = new ArrayList<>();
        for (Transaction tx : txs) {
            Map<String, Object> entry = new HashMap<>();
            entry.put("id", tx.getId());
            entry.put("date", tx.getDate());
            entry.put("category", tx.getCategory());
            entry.put("type", tx.getType());
            entry.put("description", tx.getDescription());
            entry.put("recurring", tx.isRecurring());
            entry.put("originalAmount", tx.getAmount());
            entry.put("originalCurrency", tx.getCurrency());
            double converted = exchangeRateService.getRate(tx.getCurrency(), currency) * tx.getAmount();
            entry.put("convertedAmount", converted);
            // Simple inflation adjustment: real = nominal / (1 + inflation/100)
            double real = converted / (1.0 + inflation / 100.0);
            entry.put("inflationAdjustedAmount", real);
            entry.put("targetCurrency", currency);
            entry.put("country", country);
            entry.put("inflationRate", inflation);
            result.add(entry);
        }
        return result;
    }
} 