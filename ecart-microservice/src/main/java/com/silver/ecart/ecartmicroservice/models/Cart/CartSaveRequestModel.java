package com.silver.ecart.ecartmicroservice.models.Cart;

import java.util.List;

import com.silver.ecart.ecartmicroservice.entities.Product;

import lombok.Data;

public @Data class CartSaveRequestModel {
    private String id;
    private List<Product> ProductList;
}
