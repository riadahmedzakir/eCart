package com.silver.ecart.ecartmicroservice.controllers;

import java.util.List;

import com.silver.ecart.ecartmicroservice.entities.ProductCategory;
import com.silver.ecart.ecartmicroservice.repositories.IProductCategoryRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/productcategory")
public class ProductCategoryController {

    @Autowired
    private IProductCategoryRepository _productCategoryRepository;

    @GetMapping("/status/check")
    public String status() {
        return "working... ";
    }

    @GetMapping()
    public List<ProductCategory> getProduct() {
        List<ProductCategory> items = _productCategoryRepository.findCustomCategories();
        return items;
    }
}
