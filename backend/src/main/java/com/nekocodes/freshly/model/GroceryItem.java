package com.nekocodes.freshly.model;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class GroceryItem {
    Long id;
    String name;
    boolean done;
}
