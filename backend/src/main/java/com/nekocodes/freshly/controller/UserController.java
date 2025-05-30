package com.nekocodes.freshly.controller;

import com.nekocodes.freshly.exception.UserAlreadyExistException;
import com.nekocodes.freshly.model.User;
import com.nekocodes.freshly.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@Slf4j
public class UserController {

    @Autowired
    UserService service;

    @PostMapping("/signup")
    public ResponseEntity<String> createUser(@RequestBody User user) {
        log.info("calling /signup to add users");
        boolean userExists=service.checkUserExists(user.getEmail());
        if(userExists) {
            log.info("Duplicate user found. Throwing error.");
            throw new UserAlreadyExistException("User already exists. Please log in.");
        }
        service.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body("User has been created successfully");
    }

    @GetMapping("/email/{email}")
    public User getUserEmail(@PathVariable String email) {
        log.info(service.getUserByEmail(email).toString());
        if(service.getUserByEmail(email) == null)
            return new User();
        else
            return service.getUserByEmail(email);
    }

    @PostMapping("/login")
    public String getUserEmail(@RequestBody User user) {
        return service.loginUser(user.getEmail(), user.getPassword());
    }

    @GetMapping("/name/{name}")
    public User getUserName(@PathVariable String name) {

        if(service.getUserByName(name) == null)
            return new User();
        else
            return service.getUserByName(name);
    }

    @PutMapping("/update/{email}")
    public ResponseEntity<?> updateUserDetails(@PathVariable String email, @RequestBody User updatedUserRequest){
        return service.updateUserDetails(email, updatedUserRequest);
    }


}
