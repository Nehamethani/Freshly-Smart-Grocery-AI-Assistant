package com.nekocodes.freshly.controller;

import com.nekocodes.freshly.model.User;
import com.nekocodes.freshly.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    @Autowired
    UserService service;

    @PostMapping
    public User createUser(@RequestBody User user) {
        return service.save(user);
    }

    @GetMapping("/{email}")
    public User getUser(@PathVariable String email) {
        System.out.println(service.getUserByEmail(email).toString());
        return service.getUserByEmail(email);
    }


}
