package com.compia.payment.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.util.List;

public record CreateReferenceRequestDTO(

        @NotNull
        Long userId,

        @NotNull
        @DecimalMin(value = "0.01", message = "Total amount must be greater than zero")
        BigDecimal totalAmount,

        @NotNull
        PayerDTO payer,

        @NotNull
        BackUrlsDTO backUrls,

        @NotNull
        DeliveryAddressDTO deliveryAddress,

        @NotNull
        String notificationUrl,

        @NotNull
        List<ItemDTO> items
) {
}
