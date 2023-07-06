package com.skillstorm.project1.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skillstorm.project1.models.Item;

public interface ItemRepository extends JpaRepository<Item, Integer> {
    
}
