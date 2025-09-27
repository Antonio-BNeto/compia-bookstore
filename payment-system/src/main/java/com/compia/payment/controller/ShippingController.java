package com.compia.payment.controller;

import com.compia.payment.dto.MelhorEnvioRequestDTO;
import com.compia.payment.dto.MelhorEnvioResponseDTO;
import com.compia.payment.service.ShippingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/shipping")
@RequiredArgsConstructor
@Slf4j
public class ShippingController {
    private final ShippingService shippingService;

    @PostMapping
    public ResponseEntity<MelhorEnvioResponseDTO> calculateShippingFee(@RequestBody MelhorEnvioRequestDTO requestDTO) {
        log.info("Received request to calculate shipping fee for request: {}", requestDTO);
        return ResponseEntity.ok(shippingService.calculateShippingFee(requestDTO));
    }
}
