package com.compia.payment.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record BackUrlsDTO(
        @NotBlank(message = "Success URL cannot be blank")
        String success,
        @NotBlank(message = "Failure URL cannot be blank")
        String failure,
        @NotBlank(message = "Pending URL cannot be blank")
        String pending
) {}