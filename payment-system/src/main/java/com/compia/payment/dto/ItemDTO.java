package com.compia.payment.dto;

import java.math.BigDecimal;

public record ItemDTO(
        Long id,
        String title,
        String description,
        BigDecimal quantity,
        BigDecimal unitPrice
) {
}
