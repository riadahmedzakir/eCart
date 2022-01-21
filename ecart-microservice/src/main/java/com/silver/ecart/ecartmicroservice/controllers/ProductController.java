package com.silver.ecart.ecartmicroservice.controllers;

import java.util.List;
import javax.validation.Valid;

import com.silver.ecart.ecartmicroservice.entities.Product;
import com.silver.ecart.ecartmicroservice.models.Product.ProductByIdRequest;
import com.silver.ecart.ecartmicroservice.models.Product.ProductResponse;
import com.silver.ecart.ecartmicroservice.repositories.IProductRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    @GetMapping(value = "/get/{Page}")
    public ProductResponse getProduct(@PathVariable int Page) {
        List<Product> items = _productRepository.findCustomByActive(PageRequest.of(Page, 10));
        int totalRecord = (int) _productRepository.countProduct();

        ProductResponse response = new ProductResponse();
        response.setData(items);
        response.setTotalRecord(totalRecord);

        return response;
    }

    @GetMapping(value = "/getById/{ItemId}")
    public Product getProductById(@PathVariable String ItemId) {
        Product items = _productRepository.findCustomByItemId(ItemId);
        return items;
    }

    @PostMapping(value = "/getProductByIds")
    public List<Product> getProductByIds(@Valid @RequestBody ProductByIdRequest payload) {
        List<Product> items = _productRepository.findCustomByItemIds(payload.getItemIds());
        return items;
    }

    @GetMapping(value = "/get/{Page}/{ProductId}")
    public ProductResponse getProductId(@PathVariable("ProductId") String ProductId, @PathVariable int Page) {
        List<Product> items = _productRepository.findCustomByProductId(ProductId, PageRequest.of(Page, 10));
        int totalRecord = (int) _productRepository.countByProductId(ProductId);

        ProductResponse response = new ProductResponse();
        response.setData(items);
        response.setTotalRecord(totalRecord);

        return response;
    }
}
