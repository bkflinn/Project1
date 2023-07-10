package com.skillstorm.project1.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.project1.models.Product;
import com.skillstorm.project1.services.ProductService;

@RestController
@RequestMapping("/products")
@CrossOrigin
public class ProductController {

    @Autowired
    ProductService productService;

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.getAllProducts();

        return new ResponseEntity<List<Product>>(products, HttpStatus.OK);
    }

    @PostMapping("/product")
    public ResponseEntity<Product> createProduct(@Valid @RequestBody Product product) {
        Product newProduct = productService.saveProduct(product);

        return new ResponseEntity<Product>(newProduct, HttpStatus.CREATED);
    }

    @PutMapping("/product")
    public ResponseEntity<Product> updateProduct(@Valid @RequestBody Product product) {
        Product updatedProduct = productService.saveProduct(product);

        return new ResponseEntity<Product>(updatedProduct, HttpStatus.OK);
    }

    @PutMapping("/product/updateName")
    public ResponseEntity<Integer> updateProductName(@Valid @RequestBody Product product, @RequestParam String newName) {
        int updatedProduct = productService.updateProductName(product, newName);

        return new ResponseEntity<Integer>(updatedProduct, HttpStatus.OK);
    }

    @PutMapping("/product/updateColor")
    public ResponseEntity<Integer> updateProductColor(@Valid @RequestBody Product product, @RequestParam String newColor) {
        int updatedProduct = productService.updateProductColor(product, newColor);

        return new ResponseEntity<Integer>(updatedProduct, HttpStatus.OK);
    }

    @DeleteMapping("/product")
    public ResponseEntity<Product> deleteProduct(@RequestBody Product product) {
        productService.deleteProduct(product);
        return ResponseEntity.noContent().build();
    }
    
}
