package com.compia.payment.dto;

import jakarta.validation.constraints.NotNull;

public record MelhorEnvioRequestDTO(
        @NotNull(message = "Package receiver must be informed")
        CepDTO to
) {

}
