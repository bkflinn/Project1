package com.skillstorm.project1.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skillstorm.project1.models.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    
}
