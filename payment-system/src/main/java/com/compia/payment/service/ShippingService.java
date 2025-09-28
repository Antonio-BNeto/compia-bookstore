package com.compia.payment.service;

import com.compia.payment.client.MelhorEnvioClient;
import com.compia.payment.dto.MelhorEnvioRequestDTO;
import com.compia.payment.dto.MelhorEnvioResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ShippingService {

    private final MelhorEnvioClient melhorEnvioClient;

    public MelhorEnvioResponseDTO calculateShippingFee(MelhorEnvioRequestDTO melhorEnvioRequestDTO) {
        return melhorEnvioClient.postRequest(melhorEnvioRequestDTO).block();
    }
}
