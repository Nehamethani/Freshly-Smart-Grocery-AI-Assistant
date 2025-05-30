package com.nekocodes.freshly.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class User {
    @Id
    private String id;
    private String name;
    private String email;
    private String password;

    //values after successful signup
    private int age;
    private String gender;
    private double height;
    private double weight;
    private String activityLevel;

    //dietInfo class
    private DietInfo dietInfo;

}
