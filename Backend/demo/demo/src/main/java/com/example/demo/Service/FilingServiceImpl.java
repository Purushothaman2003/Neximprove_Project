package com.example.demo.Service;

import org.springframework.stereotype.Service;

import com.example.demo.Model.Filing;
import com.example.demo.Repo.FilingRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Service
public class FilingServiceImpl implements FilingService {

    private final FilingRepository filingRepository;

    public FilingServiceImpl(FilingRepository filingRepository) {
        this.filingRepository = filingRepository;
    }

    @Override
    public Filing createFiling(Filing filing) {
        filing.setStatus("DRAFT");
        return filingRepository.save(filing);
    }

    @Override
    public Filing getFilingById(Long id) {
        return filingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Filing not found"));
    }

@Override
public Filing updateFilingStatus(Long id, String status) {
    Filing filing = filingRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Filing not found with ID: " + id));
    
    filing.setStatus(status.toUpperCase()); 
    filing.setUpdatedAt(LocalDateTime.now());
    
    return filingRepository.save(filing); 
}


    @Override
    public List<Filing> simulateStatusUpdates() {
        List<Filing> submittedFilings = filingRepository.findByStatus("SUBMITTED");
        Random random = new Random();
        
        submittedFilings.forEach(filing -> {
            // String newStatus = random.nextBoolean() ? "APPROVED" : "REJECTED";
            String newStatus = random.nextBoolean() ? "Approved" : "Rejected";
            filing.setStatus(newStatus);
            filingRepository.save(filing);
        });
        
        return submittedFilings;
    }
}