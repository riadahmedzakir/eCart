package com.silver.ecart.ecartmicroservice.entities;

import java.io.Serializable;
import java.util.List;

import org.springframework.data.redis.core.RedisHash;

import lombok.Data;

@RedisHash("Cart")
public @Data class Cart implements Serializable {
    private String id;
    private double Total;
    private List<CartItems> ProductList;
}
