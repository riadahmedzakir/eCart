package com.silver.ecart.ecartmicroservice.controllers;

import java.util.List;

import com.silver.ecart.ecartmicroservice.entities.Product;
import com.silver.ecart.ecartmicroservice.repositories.IProductRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/product")
public class ProductController {

    @Autowired
    private IProductRepository _productRepository;

    @GetMapping("/status/check")
    public String status() {
        return "working... ";
    }

    @GetMapping()
    public List<Product> getUser(String userId) {
        List<Product> items = _productRepository.findCustomByActive();
        return items;
    }
}
