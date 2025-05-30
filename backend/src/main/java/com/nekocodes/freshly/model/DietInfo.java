package com.nekocodes.freshly.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
public class DietInfo {
    private List<String> cuisines;
    private List<String> allergies;
    private String goal;
    private String dietType;
    private String likedFood;
    private String dislikedFood;
}
