package com.compia.payment.controller;

import com.compia.payment.dto.CreatePreferenceRequestDTO;
import com.compia.payment.dto.CreatePreferenceResponseDTO;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/payment")
public class PaymentController {

    @PostMapping
    public ResponseEntity<CreatePreferenceResponseDTO> createReference(@Valid @RequestBody CreatePreferenceRequestDTO request) {


    }
}
