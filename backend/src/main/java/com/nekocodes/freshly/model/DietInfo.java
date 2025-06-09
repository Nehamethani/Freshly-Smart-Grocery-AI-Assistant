package com.nekocodes.freshly.model;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DietInfo {
  private List<String> cuisines;
  private List<String> allergies;
  private String goal; // to be ENUM
  private String dietType; // to be ENUM
  private String likedFood;
  private String dislikedFood;
}
