package com.skillstorm.project1.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skillstorm.project1.models.Item;
import com.skillstorm.project1.models.Warehouse;
import com.skillstorm.project1.repositories.ItemRepository;
import com.skillstorm.project1.repositories.WarehouseRepository;

@Service
public class WarehouseService {

    @Autowired
    WarehouseRepository warehouseRepository;

    @Autowired
    ItemRepository itemRepository;

    public List<Warehouse> findAllWarehouses() {
        List<Warehouse> warehouses = warehouseRepository.findAll();

        for(Warehouse warehouse : warehouses){
            warehouse.setNumber_of_items(updateNumberOfItems(warehouse));
        }

        return warehouses;
    }

    public Warehouse saveWarehouse(Warehouse warehouse) {
        Warehouse newWarehouse = warehouseRepository.save(warehouse);

        // make sure new warehouses and updated warehouses have the correct number of items
        newWarehouse.setNumber_of_items(updateNumberOfItems(newWarehouse));

        return newWarehouse;
    }

    public void deleteWarehouse(Warehouse warehouse) {
        itemRepository.deleteAllByWarehouseId(warehouse.getId());
        warehouseRepository.delete(warehouse);
    }

    // updates the number of items in a warehouse
    public int updateNumberOfItems(Warehouse warehouse) {
        List<Item> relevantItems = itemRepository.findAllByWarehouseId(warehouse.getId());

        int sum = 0;

        for(Item item : relevantItems){
            sum += item.getItem_quantity();
        }

        return sum;
    }
    
}
