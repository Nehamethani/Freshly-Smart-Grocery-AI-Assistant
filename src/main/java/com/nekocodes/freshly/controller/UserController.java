package com.nekocodes.freshly.controller;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.nekocodes.freshly.model.User;
import com.nekocodes.freshly.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {


    @Autowired
    UserService service;

    @PostMapping("/signup")
    public String createUser(@RequestBody User user) {
        return service.save(user);
    }

    @GetMapping("/login")
    public String LoginUser(@RequestParam String email, String password)
    {
         return service.loginUser(email, password);
    }

    @GetMapping("/email/{email}")
    public User getUserEmail(@PathVariable String email) {
        System.out.println(service.getUserByEmail(email).toString());


            return service.getUserByEmail(email);
    }
    @GetMapping("/name/{name}")
    public User getUserName(@PathVariable String name) {

        if(service.getUserByName(name) == null)
            return new User();
        else
            return service.getUserByName(name);

    }


}
