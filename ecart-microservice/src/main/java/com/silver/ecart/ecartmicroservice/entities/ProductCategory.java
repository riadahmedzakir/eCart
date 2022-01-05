package com.silver.ecart.ecartmicroservice.entities;

import javax.persistence.Id;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document(collection = "ProductCategorys")
public @Data class ProductCategory {
    @Id
    private String ItemId;
    private String Name;
    private String Description;
}
