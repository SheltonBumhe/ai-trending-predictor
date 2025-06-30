package com.trendpredictor;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class RecurringTransactionService {
    @Autowired
    private TransactionRepository transactionRepository;

    // Run at 1am on the 1st of every month
    @Scheduled(cron = "0 0 1 1 * *")
    public void generateRecurringTransactions() {
        List<Transaction> recurring = transactionRepository.findAll();
        for (Transaction tx : recurring) {
            if (tx.isRecurring()) {
                Transaction newTx = new Transaction();
                newTx.setUserId(tx.getUserId());
                newTx.setDate(LocalDate.now());
                newTx.setAmount(tx.getAmount());
                newTx.setCategory(tx.getCategory());
                newTx.setType(tx.getType());
                newTx.setDescription("[Recurring] " + tx.getDescription());
                newTx.setRecurring(false); // Only the template is recurring
                newTx.setCurrency(tx.getCurrency());
                transactionRepository.save(newTx);
            }
        }
    }
} 