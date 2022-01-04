package com.silver.ecart.ecartmicroservice.repositories;

import java.util.List;

import com.silver.ecart.ecartmicroservice.entities.Product;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface IProductRepository extends MongoRepository<Product, Long> {
    @Query("{ Active: true }")
    List<Product> findCustomByActive();
}
