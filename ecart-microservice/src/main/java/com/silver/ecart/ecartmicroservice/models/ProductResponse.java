package com.silver.ecart.ecartmicroservice.models;

import java.util.List;

import com.silver.ecart.ecartmicroservice.entities.Product;

import lombok.Data;

public @Data class ProductResponse {
    private List<Product> Data;
    private int TotalRecord;
}
