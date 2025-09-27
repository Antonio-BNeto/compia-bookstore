package com.compia.payment.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record ItemDTO(
        @NotBlank(message = "Item ID cannot be blank")
        String id,
        @NotBlank(message = "Item title cannot be blank")
        String title,
        @NotBlank(message = "Description cannot be blank")
        String description,
        @NotNull(message = "Item quantity cannot be null")
        Integer quantity,
        @NotNull(message = "Item unit price cannot be null")
        @DecimalMin(value = "0.01", message = "Item unit price must be positive")
        BigDecimal unitPrice
) {}
