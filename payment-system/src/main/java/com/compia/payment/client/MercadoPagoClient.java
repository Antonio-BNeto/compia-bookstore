package com.compia.payment.client;


import com.compia.payment.dto.CreatePreferenceRequestDTO;
import com.compia.payment.dto.CreatePreferenceResponseDTO;
import com.mercadopago.MercadoPagoConfig;
import com.mercadopago.client.preference.*;
import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.preference.Preference;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class MercadoPagoClient {

    @Value(value = "${api.v1.mercadopago-access-token}")
    private String accessToken;

    @Value(value = "${api.v1.mercadopago-notification-url}")
    private String notificationUrl;

    public void init() {
        MercadoPagoConfig.setAccessToken(accessToken);
    }

    public CreatePreferenceResponseDTO createPreference(CreatePreferenceRequestDTO createPreferenceRequestDTO, String orderNumber) {

        try {
            PreferenceClient preferenceClient = new PreferenceClient();
            List<PreferenceItemRequest> items = createPreferenceRequestDTO.items().stream()
                    .map(item -> PreferenceItemRequest.builder()
                            .id(item.id())
                            .title(item.title())
                            .description(item.description())
                            .quantity(item.quantity())
                            .unitPrice(item.unitPrice())
                            .build())
                    .toList();

            PreferencePayerRequest payer = PreferencePayerRequest.builder()
                    .name(createPreferenceRequestDTO.payer().name())
                    .build();

            PreferenceBackUrlsRequest backUrlsRequest = PreferenceBackUrlsRequest.builder()
                    .success(createPreferenceRequestDTO.backUrls().success())
                    .pending(createPreferenceRequestDTO.backUrls().pending())
                    .failure(createPreferenceRequestDTO.backUrls().failure())
                    .build();

            PreferenceRequest preferenceRequest = PreferenceRequest.builder()
                    .items(items)
                    .payer(payer)
                    .backUrls(backUrlsRequest)
                    .notificationUrl(notificationUrl)
                    .externalReference(orderNumber)
                    .autoReturn("approved")
                    .build();

            Preference preference = preferenceClient.create(preferenceRequest);

            return new CreatePreferenceResponseDTO(
                    preference.getId(),
                    preference.getInitPoint()
            );
        } catch (MPException | MPApiException e) {
            throw new RuntimeException(e);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }
}
