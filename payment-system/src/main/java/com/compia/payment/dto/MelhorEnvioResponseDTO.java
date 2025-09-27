package com.compia.payment.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;

@JsonIgnoreProperties(ignoreUnknown = true)
public record MelhorEnvioResponseDTO(
        String id,
        String name,
        double price,
        @JsonProperty("delivery_time")
        int deliveryTime
) {
}
