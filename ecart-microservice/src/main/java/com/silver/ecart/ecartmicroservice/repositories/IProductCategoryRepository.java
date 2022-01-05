package com.silver.ecart.ecartmicroservice.repositories;

import com.silver.ecart.ecartmicroservice.entities.ProductCategory;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface IProductCategoryRepository extends MongoRepository<ProductCategory, Long> {

}
