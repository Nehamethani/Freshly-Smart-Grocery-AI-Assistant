package com.nekocodes.freshly.constants;

import java.util.Map;

public class Constants {
    public static final String OPENAI_URL = "https://api.openai.com/v1/responses";
    public static final String MODEL = "gpt-4o-mini";
    public static final String PROMPT = "Add 10 and 10";
    public static final Map<String, Object> PROMPT_REQ = Map.of(
            "model", Constants.MODEL,
            "input", PROMPT);

    //TODO: Add the prompt here
}
