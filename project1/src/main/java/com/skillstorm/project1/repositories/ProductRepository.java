package com.skillstorm.project1.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.skillstorm.project1.models.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {

    @Query("update Product p set p.product_name = :new_name where id = :product_id")
    @Modifying
    @Transactional
    public int updateProductName(@Param("product_id") int id, @Param("new_name") String newName);

    @Query("update Product p set p.color = :new_color where id = :product_id")
    @Modifying
    @Transactional
    public int updateProductColor(@Param("product_id") int id, @Param("new_color") String newColor);
        
}
