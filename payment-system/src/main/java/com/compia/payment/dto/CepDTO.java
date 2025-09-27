package com.compia.payment.dto;


import jakarta.validation.constraints.NotBlank;

public record CepDTO(
        @NotBlank(message = "Postal code cannot be blank")
        String postal_code
) {
}
