package com.skillstorm.project1.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skillstorm.project1.models.Item;
import com.skillstorm.project1.models.Warehouse;
import com.skillstorm.project1.repositories.ItemRepository;
import com.skillstorm.project1.repositories.ProductRepository;
import com.skillstorm.project1.repositories.WarehouseRepository;

@Service
public class ItemService {

    @Autowired
    ItemRepository itemRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    WarehouseRepository warehouseRepository;

    public List<Item> findAllItems() {
        return itemRepository.findAll();
    }

    public List<Item> findItemsByWarehouseId(int warehouseId) {
        return itemRepository.findAllByWarehouseId(warehouseId);
    }

    public Item saveItem(Item item) {

        // if the given product and warehouse exist
        if(productRepository.existsById(item.getProductId()) && warehouseRepository.existsById(item.getWarehouseId())) {

            // get the requested warehouse
            Warehouse warehouse = warehouseRepository.getReferenceById(item.getWarehouseId());

            int sum = 0;

            List<Item> items = findItemsByWarehouseId(item.getWarehouseId());

            for(Item i : items) {
                if(i.getId() != item.getId()){
                    sum += i.getItem_quantity();
                }
            }

            // if the given quantity does not exceed the warehouse's limit
            if(sum + item.getItem_quantity() <= warehouse.getMax_capacity()) {

                // update warhouse number of items here when time to work on warehouse CRUD

                return itemRepository.save(item);
            }
        }

        return null;
    }

    public int updateProductId(Item item, int newProductId) {

        // if the updated product exists
        if(productRepository.existsById(item.getProductId())) {
            return itemRepository.updateProductId(item.getId(), newProductId);
        }

        return 0;
    }

    public void deleteItem(Item item) {
        itemRepository.delete(item);
    }
    
}
