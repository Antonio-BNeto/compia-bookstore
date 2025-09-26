package com.compia.payment.dto;

public record DeliveryAddressDTO(String zipCode,
                                 String streetName,
                                 String streeNumber,
                                 String complement,
                                 String city,
                                 String state,
                                 String country) {
}
