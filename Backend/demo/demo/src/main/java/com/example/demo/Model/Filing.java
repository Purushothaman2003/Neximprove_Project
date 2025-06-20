package com.example.demo.Model;


import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
public class Filing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String filingNo;
    
    @Column(name = "status")
    private String status = "DRAFT";
    
    @Column(name = "customer_id", nullable = false)
    private String customerId;
    
    @Column(nullable = false)
    private String port;
    
    @Column(name = "created_at", columnDefinition = "datetime", updatable = false)
private LocalDateTime createdAt = LocalDateTime.now();

@Column(name = "updated_at", columnDefinition = "datetime")
private LocalDateTime updatedAt = LocalDateTime.now();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFilingNo() {
        return filingNo;
    }

    public void setFilingNo(String filingNo) {
        this.filingNo = filingNo;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public String getPort() {
        return port;
    }

    public void setPort(String port) {
        this.port = port;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

}