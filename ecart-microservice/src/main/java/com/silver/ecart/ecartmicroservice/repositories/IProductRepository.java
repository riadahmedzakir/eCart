package com.silver.ecart.ecartmicroservice.repositories;

import java.util.List;

import com.silver.ecart.ecartmicroservice.entities.Product;

import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface IProductRepository extends MongoRepository<Product, Long> {
    @Query("{ Active: true }")
    List<Product> findCustomByActive(Pageable pageable);

    @Query("{ ProductId: ?0, Active: true }")
    List<Product> findCustomByProductId(String ProductId, Pageable pageable);

    @Query(value = "{ ProductId : ?0, Active: true }", count = true)
    int countByProductId(String ProductId);

    @Query(value = "{ Active: true }", count = true)
    int countProduct();
}
