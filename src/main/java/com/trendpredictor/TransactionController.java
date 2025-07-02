package com.trendpredictor;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {
    @Autowired
    private TransactionRepository transactionRepository;
    @Autowired
    private ExchangeRateService exchangeRateService;

    // Mock rates for demo; in production, fetch from real API
    private static final double USD_TO_EUR = 0.92;
    private static final double USD_TO_GBP = 0.78;

    @GetMapping("/{userId}")
    public List<Transaction> getAll(@PathVariable Long userId, @RequestParam(required = false) String currency) {
        List<Transaction> txs = transactionRepository.findByUserId(userId);
        if (currency == null || currency.equalsIgnoreCase("USD")) return txs;
        return txs.stream().map(tx -> {
            Transaction copy = new Transaction();
            copy.setId(tx.getId());
            copy.setUserId(tx.getUserId());
            copy.setDate(tx.getDate());
            copy.setAmount(convert(tx.getAmount(), tx.getCurrency(), currency));
            copy.setCategory(tx.getCategory());
            copy.setType(tx.getType());
            copy.setDescription(tx.getDescription());
            copy.setRecurring(tx.isRecurring());
            copy.setCurrency(currency);
            return copy;
        }).collect(Collectors.toList());
    }

    private double convert(double amount, String from, String to) {
        return exchangeRateService.getRate(from, to) * amount;
    }

    @PostMapping
    public Transaction create(@RequestBody Transaction tx) {
        return transactionRepository.save(tx);
    }

    @PutMapping("/{id}")
    public Transaction update(@PathVariable Long id, @RequestBody Transaction tx) {
        tx.setId(id);
        return transactionRepository.save(tx);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        transactionRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
} 