package com.silver.ecart.ecartmicroservice.entities;

import java.math.BigDecimal;
import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document(collection = "Products")
public @Data class Product {
    @Id
    private String ItemId;
    private String Name;
    private String Description;
    private BigDecimal UnitPrice;
    private boolean Active;
    private String ImageUrl;
    private int Stock;
    private Date CreateDate;
    private Date LastUpdateDate;
}
