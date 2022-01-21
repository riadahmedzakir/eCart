package com.silver.ecart.ecartmicroservice.models.Product;

import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor

public class ProductByIdRequest {
    @NotNull(message = "First Name cannot be null")
    private String[] ItemIds;
}
