package com.skillstorm.project1.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skillstorm.project1.models.Item;
import com.skillstorm.project1.models.Product;
import com.skillstorm.project1.repositories.ItemRepository;
import com.skillstorm.project1.repositories.ProductRepository;

@Service
public class ProductService {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    ItemRepository itemRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public int updateProductName(Product product, String newName) {
        return productRepository.updateProductName(product.getId(), newName);
    }

    public int updateProductColor(Product product, String newColor) {
        return productRepository.updateProductColor(product.getId(), newColor);
    }

    public void deleteProduct(Product product) {
        itemRepository.deleteAllByProductId(product.getId());
        productRepository.delete(product);
    }
    
}
