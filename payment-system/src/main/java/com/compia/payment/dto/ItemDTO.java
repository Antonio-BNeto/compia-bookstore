package com.compia.payment.dto;

import java.math.BigDecimal;

public record ItemDTO(
        String id,
        String title,
        String description,
        int quantity,
        BigDecimal unitPrice
) {
}
