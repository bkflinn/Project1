package com.skillstorm.project1.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import com.skillstorm.project1.models.Item;

public interface ItemRepository extends JpaRepository<Item, Integer> {

    @Modifying
    @Transactional
    public void deleteAllByProductId(int productId);
}
