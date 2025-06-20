package com.example.demo.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Model.Filing;

import java.util.List;

public interface FilingRepository extends JpaRepository<Filing, Long> {
    
    List<Filing> findByStatus(String status);
}