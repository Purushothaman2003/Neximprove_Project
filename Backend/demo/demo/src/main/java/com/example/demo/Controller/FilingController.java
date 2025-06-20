package com.example.demo.Controller;

// import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Model.Filing;
import com.example.demo.Service.FilingService;
// import com.example.demo.dto.StatusUpdateRequest;
import com.example.demo.dto.StatusUpdateRequest;

import java.util.List;
// import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") 
public class FilingController {

    private final FilingService filingService;

    public FilingController(FilingService filingService) {
        this.filingService = filingService;
    }

  @PostMapping("/filings")
public ResponseEntity<?> submitFiling(@RequestBody Filing filing) {
    try {
        if (filing.getFilingNo() == null || filing.getCustomerId() == null || filing.getPort() == null) {
            return ResponseEntity.badRequest().body("Missing required fields");
        }
        
        Filing savedFiling = filingService.createFiling(filing);
        return ResponseEntity.ok(savedFiling);
    } catch (Exception e) {
        return ResponseEntity.status(500).body("Error creating filing: " + e.getMessage());
    }
}
    @GetMapping("/filings/{id}")
    public ResponseEntity<Filing> getFilingStatus(@PathVariable Long id) {
        Filing filing = filingService.getFilingById(id);
        return ResponseEntity.ok(filing);
    }

@PutMapping("/filings/{id}/status")
public ResponseEntity<Filing> updateFilingStatus(
        @PathVariable Long id,
        @RequestBody StatusUpdateRequest request) {
    Filing updatedFiling = filingService.updateFilingStatus(id, request.getStatus());
    return ResponseEntity.ok(updatedFiling);
}



    @PostMapping("/simulate-webhook")
    public ResponseEntity<List<Filing>> simulateWebhookUpdate() {
        List<Filing> updatedFilings = filingService.simulateStatusUpdates();
        return ResponseEntity.ok(updatedFilings);
    }

    
}