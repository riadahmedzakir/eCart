package com.silver.ecart.ecartmicroservice.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document(collection = "ProductCategorys")
public @Data class ProductCategory {

    @Id
    private String ItemId;
    private String Name;
    private String Description;
    private boolean HasItems;
}
