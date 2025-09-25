package com.nekocodes.freshly.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class OpenAiResponse {
    private List<Output> output;

    @Getter
    @Setter
    public static class Output {
        private List<Content> content;
    }

    @Getter
    @Setter
    public static class Content {
        private String text;
    }
}
