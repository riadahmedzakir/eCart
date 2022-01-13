package com.silver.ecart.ecartmicroservice.controllers;

import java.util.Optional;

import com.silver.ecart.ecartmicroservice.entities.Cart;
import com.silver.ecart.ecartmicroservice.models.Cart.CartSaveRequestModel;
import com.silver.ecart.ecartmicroservice.repositories.CartRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartRepository _cartRepository;

    @GetMapping("/get/{id}")
    public Optional<Cart> GetAll(@PathVariable("id") final String id) {
        Optional<Cart> cart = _cartRepository.findById(id);
        return cart;
    }

    @PostMapping("/add")
    public String add(@RequestBody CartSaveRequestModel request) {
        Cart cart = new Cart();
        cart.setId(request.getId());
        cart.setTotal(request.getTotal());
        cart.setProductList(request.getProductList());

        _cartRepository.save(cart);
        return "saved";
    }
}
