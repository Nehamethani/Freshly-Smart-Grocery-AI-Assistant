package com.nekocodes.freshly.controller;

import com.nekocodes.freshly.model.OpenAiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import static com.nekocodes.freshly.constants.Constants.OPENAI_URL;
import static com.nekocodes.freshly.constants.Constants.PROMPT_REQ;

@RestController
@RequiredArgsConstructor
public class OpenAiController {

    private final RestTemplate restTemplate;

    @GetMapping("/suggest-meal")
    public String triggerPrompt() {
        ResponseEntity<OpenAiResponse> response = restTemplate.postForEntity(OPENAI_URL, PROMPT_REQ, OpenAiResponse.class);
        if (response.getBody() != null) {
            return response.getBody()
                    .getOutput().get(0)
                    .getContent().get(0)
                    .getText();
        }
        return "No Response from OpenAI";
    }
}

