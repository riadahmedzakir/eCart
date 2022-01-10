package com.silver.ecart.ecartmicroservice.repositories;

import java.util.Map;

public interface ICartRepository {
    void save(String user);

    Map<String, String> findAll();

    String findById(String id);

    void update(String user);

    void delete(String id);
}
