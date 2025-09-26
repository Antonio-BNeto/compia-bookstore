package com.compia.payment.dto;

import jakarta.validation.constraints.NotBlank;

public record DeliveryAddressDTO(
        @NotBlank(message = "Street cannot be blank")
        String street,
        @NotBlank(message = "Number cannot be blank")
        String number,
        String complement,
        @NotBlank(message = "Neighborhood cannot be blank")
        String neighborhood,
        @NotBlank(message = "City cannot be blank")
        String city,
        @NotBlank(message = "State cannot be blank")
        String state,
        @NotBlank(message = "Zipcode cannot be blank")
        String zipCode
) {}
