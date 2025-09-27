package com.compia.payment.client;

import com.compia.payment.dto.CepDTO;
import com.compia.payment.dto.MelhorEnvioRequestDTO;
import com.compia.payment.dto.MelhorEnvioResponseDTO;
import com.compia.payment.dto.PackageDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import javax.annotation.PostConstruct;
import java.util.Map;

@Component
@RequiredArgsConstructor
@Slf4j
public class MelhorEnvioClient {

    @Value("${api.v1.melhorenvio-access-token}")
    private String accessToken;

    private WebClient webClient;

    @PostConstruct
    public void init() {
        this.webClient = WebClient.builder()
                .baseUrl("https://sandbox.melhorenvio.com.br")
                .defaultHeader(HttpHeaders.ACCEPT, "application/json")
                .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .defaultHeader(HttpHeaders.USER_AGENT, "Aplicação gabri1020m@gmail.com")
                .defaultHeader(HttpHeaders.CONTENT_TYPE, "application/json")
                .build();

        log.info("Melhor Envio client initialized succesfully");
    }

    public Mono<MelhorEnvioResponseDTO> postRequest(MelhorEnvioRequestDTO melhorEnvioRequestDTO) {
        log.info("Melhor Envio client postRequest called");

        PackageDTO fixedPackage = new PackageDTO(4, 12, 17, 0.3);

        CepDTO ufcgCep = new CepDTO("58429900");

        Map<String, Object> payload = Map.of(
                "from", ufcgCep,
                "to", melhorEnvioRequestDTO.to(),
                "services", "2",
                "package", fixedPackage
        );

        Mono<MelhorEnvioResponseDTO> response =  webClient
                .post()
                .uri("/api/v2/me/shipment/calculate")
                .bodyValue(payload)
                .retrieve()
                .onStatus(HttpStatusCode::isError,
                        clientResponse -> clientResponse.bodyToMono(String.class)
                                .map(body -> new RuntimeException("Melhor Envio API Error: " + body)))
                .bodyToMono(MelhorEnvioResponseDTO.class);

        log.info("Melhor Envio client postResponse was successful");

        return response;
    }



}
