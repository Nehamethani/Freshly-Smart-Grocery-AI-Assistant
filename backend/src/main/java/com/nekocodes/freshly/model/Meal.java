package com.nekocodes.freshly.model;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Meal {
    Long id;
    String mealType; // Breakfast, Lunch, etc.
    String mealName;
    List<GroceryItem> items;
}
