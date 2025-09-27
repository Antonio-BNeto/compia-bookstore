package com.compia.payment.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.util.List;

public record CreatePreferenceRequestDTO(
        Long userId,

        @DecimalMin(value = "0.01", message = "Total amount must be positive")
        BigDecimal totalAmount,

        @NotEmpty(message = "Items list cannot be empty")
        @Valid
        List<ItemDTO> items,

        @NotNull(message = "Payer information cannot be null")
        @Valid
        PayerDTO payer,

        @NotNull(message = "Back URLs cannot be null")
        @Valid
        BackUrlsDTO backUrls,

        @NotNull(message = "Delivery address cannot be null")
        @Valid
        DeliveryAddressDTO deliveryAddress,

        String notificationUrl
) {}
