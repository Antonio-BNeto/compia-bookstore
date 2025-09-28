package com.compia.payment.client;


import com.compia.payment.dto.CreatePreferenceRequestDTO;
import com.compia.payment.dto.CreatePreferenceResponseDTO;
import com.compia.payment.exception.PaymentException;
import com.mercadopago.MercadoPagoConfig;
import com.mercadopago.client.preference.*;
import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.preference.Preference;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
@Slf4j
public class MercadoPagoClient {

    @Value("${api.v1.mercadopago-access-token}")
    private String accessToken;

    @PostConstruct
    public void init() {
        MercadoPagoConfig.setAccessToken(accessToken);
        log.info("Mercado Pago SDK initialized successfully.");
    }

    public CreatePreferenceResponseDTO createPreference(CreatePreferenceRequestDTO createPreferenceRequestDTO, String orderNumber) throws PaymentException {
        log.info("Creating Mercado Pago preference for orderNumber: {}", orderNumber);
        try {
            PreferenceClient client = new PreferenceClient();

            List<PreferenceItemRequest> items = createPreferenceRequestDTO.items().stream()
                    .map(itemInput -> PreferenceItemRequest.builder()
                            .id(itemInput.id())
                            .title(itemInput.title())
                            .description(itemInput.description())
                            .quantity(itemInput.quantity())
                            .unitPrice(itemInput.unitPrice())
                            .build())
                    .collect(Collectors.toList());

            PreferencePayerRequest payer = PreferencePayerRequest.builder()
                    .name(createPreferenceRequestDTO.payer().name())
                    .email(createPreferenceRequestDTO.payer().email())
                    .build();

            PreferenceBackUrlsRequest backUrls = PreferenceBackUrlsRequest.builder()
                    .success(createPreferenceRequestDTO.backUrls().success())
                    .failure(createPreferenceRequestDTO.backUrls().failure())
                    .pending(createPreferenceRequestDTO.backUrls().pending())
                    .build();

            PreferenceRequest request = PreferenceRequest.builder()
                    .items(items)
                    .payer(payer)
                    .backUrls(backUrls)
                    .externalReference(orderNumber)
                    .build();

            Preference preference = client.create(request);

            log.info("Mercado Pago preference created. ID: {}, InitPoint: {}", preference.getId(), preference.getInitPoint());

            return new CreatePreferenceResponseDTO(preference.getId(), preference.getInitPoint());

        } catch (MPApiException e) {
            log.error("Mercado Pago API error creating preference for orderNumber {}: Status Code: {}, Response: {}",
                    orderNumber, e.getStatusCode(), e.getApiResponse().getContent(), e);
            throw new PaymentException("Mercado Pago API error: " + e.getApiResponse().getContent(), e);
        } catch (MPException e) {
            log.error("Mercado Pago SDK error creating preference for orderNumber {}: {}", orderNumber, e.getMessage(), e);
            throw new PaymentException("Mercado Pago SDK error: " + e.getMessage(), e);
        } catch (Exception e) {
            log.error("Unexpected error creating Mercado Pago preference for orderNumber {}: {}", orderNumber, e.getMessage(), e);
            throw new PaymentException("Unexpected error creating preference.", e);
        }
    }
}
