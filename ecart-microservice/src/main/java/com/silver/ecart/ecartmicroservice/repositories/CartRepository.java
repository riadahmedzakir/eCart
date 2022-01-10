package com.silver.ecart.ecartmicroservice.repositories;

import com.silver.ecart.ecartmicroservice.entities.Cart;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends CrudRepository<Cart, String> {

}
