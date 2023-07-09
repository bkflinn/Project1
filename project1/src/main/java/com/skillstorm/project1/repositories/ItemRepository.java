package com.skillstorm.project1.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.skillstorm.project1.models.Item;

public interface ItemRepository extends JpaRepository<Item, Integer> {

    @Modifying
    @Transactional
    public void deleteAllByProductId(int productId);

    @Query("update Item i set i.productId = :new_ProductId where id = :item_id")
    @Modifying
    @Transactional
    public int updateProductId(@Param("item_id") int id, @Param("new_ProductId") int newProductId);
}
