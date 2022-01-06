package com.silver.ecart.ecartmicroservice.repositories;

import java.util.List;

import com.silver.ecart.ecartmicroservice.entities.ProductCategory;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface IProductCategoryRepository extends MongoRepository<ProductCategory, Long> {
    @Query("{ HasItems: true }")
    List<ProductCategory> findCustomCategories();
}
