package com.silver.ecart.ecartmicroservice.entities;

import lombok.Data;

public @Data class CartItems {
    private String ItemId;
    private int Quantity;
    private double Price;
}
