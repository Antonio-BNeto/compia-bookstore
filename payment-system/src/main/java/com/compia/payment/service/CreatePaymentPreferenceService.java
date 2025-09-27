package com.compia.payment.service;

import com.compia.payment.client.MercadoPagoClient;
import com.compia.payment.dto.*;
import com.compia.payment.exception.ErrorException;
import com.compia.payment.exception.PaymentException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import io.micrometer.common.util.StringUtils;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Objects;

@Service
@AllArgsConstructor
@Slf4j
public class CreatePaymentPreferenceService {

    private final MercadoPagoClient mercadoPagoClient;

    public CreatePreferenceResponseDTO createPreference(CreatePreferenceRequestDTO createPreferenceRequestDTO) {
        log.info("Executing CreatePaymentPreferenceUseCase for userId: {}", createPreferenceRequestDTO.userId());

        validateInput(createPreferenceRequestDTO);

        String orderNumber = genenateOrderNumber(createPreferenceRequestDTO);

        try {
            CreatePreferenceResponseDTO output = mercadoPagoClient.createPreference(createPreferenceRequestDTO, orderNumber);
            log.info("Payment preference created successfully. PreferenceId: {}", output.preferenceId());
            return output;
        } catch (PaymentException e) {
            log.error("Error creating payment preference via gateway for orderId {}: {}", orderNumber, e.getMessage(), e);
            throw e;
        } catch (Exception e) {
            log.error("Unexpected error during payment preference creation for orderId {}: {}", orderNumber, e.getMessage(), e);
            throw new RuntimeException("An unexpected error occurred while creating the payment preference.", e);
        }
    }

    private void validateInput(CreatePreferenceRequestDTO createPreferenceRequestDTO) {
        validateBasicFields(createPreferenceRequestDTO);
        validatePayer(createPreferenceRequestDTO.payer());
        validateAddress(createPreferenceRequestDTO.deliveryAddress());
        validateItems(createPreferenceRequestDTO.items());
    }

    private void validateBasicFields(CreatePreferenceRequestDTO input) {
        if (Objects.isNull(input.userId()) ||
                Objects.isNull(input.totalAmount()) ||
                Objects.isNull(input.items()) || input.items().isEmpty()) {
            throw new ErrorException("Missing basic input fields for creating preference.");
        }
    }

    private void validatePayer(PayerDTO payer) {
        if (Objects.isNull(payer) ||
                StringUtils.isBlank(payer.name())
                ) {
            throw new ErrorException("Invalid payer information.");
        }
    }

    private void validateAddress(DeliveryAddressDTO address) {
        if (Objects.isNull(address) ||
                StringUtils.isBlank(address.street()) ||
                StringUtils.isBlank(address.city()) ||
                StringUtils.isBlank(address.neighborhood()) ||
                StringUtils.isBlank(address.number()) ||
                StringUtils.isBlank(address.zipCode())) {
            throw new ErrorException("Invalid delivery address.");
        }
    }

    private void validateItems(List<ItemDTO> items) {
        for (int i = 0; i < items.size(); i++) {
            ItemDTO item = items.get(i);
            if (Objects.isNull(item)) {
                throw new ErrorException("Item at index " + i + " is null.");
            }
            if (StringUtils.isBlank(item.title())) {
                throw new ErrorException("Item at index " + i + " has a blank title.");
            }
            if (Objects.isNull(item.quantity()) || item.quantity() <= 0) {
                throw new ErrorException("Item at index " + i + " has invalid quantity.");
            }
            if (Objects.isNull(item.unitPrice()) || item.unitPrice().compareTo(BigDecimal.ZERO) <= 0) {
                throw new ErrorException("Item at index " + i + " has invalid unit price.");
            }
        }
    }

    private static String genenateOrderNumber(CreatePreferenceRequestDTO input) {
        String date = LocalDate.now().format(DateTimeFormatter.ofPattern("ddMMyy"));
        String random = String.valueOf(System.currentTimeMillis() % 10000);
        return String.format("ORD-%d%s%s", input.userId(), date, random);
    }
}