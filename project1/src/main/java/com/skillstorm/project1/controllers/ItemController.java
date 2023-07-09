package com.skillstorm.project1.controllers;

import java.util.List;

import javax.validation.Valid;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.project1.models.Item;
import com.skillstorm.project1.services.ItemService;

@RestController
@RequestMapping("/items")
public class ItemController {

    @Autowired
    ItemService itemService;

    @GetMapping
    public ResponseEntity<List<Item>> findAllItems() {
        List<Item> items = itemService.findAllItems();

        return new ResponseEntity<List<Item>>(items, HttpStatus.OK);
    }

    @PostMapping("/item")
    public ResponseEntity<Item> createItem(@Valid @RequestBody Item item) {
        Item newItem = itemService.saveItem(item);
        
        return new ResponseEntity<Item>(newItem, HttpStatus.CREATED);
    }

    @PutMapping("/item")
    public ResponseEntity<Item> updateItem(@Valid @RequestBody Item item) {
        Item updatedItem = itemService.saveItem(item);
        
        return new ResponseEntity<Item>(updatedItem, HttpStatus.OK);
    }

    @PutMapping("/item/updateProductId")
    public ResponseEntity<Integer> updateProductId(@Valid @RequestBody Item item, @RequestParam int newProductId) {
        int updatedItem = itemService.updateProductId(item, newProductId);

        return new ResponseEntity<Integer>(updatedItem, HttpStatus.OK);
    }

    @DeleteMapping("/item")
    public ResponseEntity<Item> deleteItem(@RequestBody Item item) {
        itemService.deleteItem(item);
        return ResponseEntity.noContent().build();
    }
    
}
