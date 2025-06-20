package com.example.demo.Service;


import java.util.List;

import com.example.demo.Model.Filing;

public interface FilingService {
    Filing createFiling(Filing filing);
    Filing getFilingById(Long id);
    Filing updateFilingStatus(Long id, String status);
    List<Filing> simulateStatusUpdates();
}