package com.nekocodes.freshly.controller;

import com.nekocodes.freshly.exception.UserAlreadyExistException;
import com.nekocodes.freshly.exception.UserNotFoundException;
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

  @Autowired UserService service;

  @PostMapping("/signup")
  public ResponseEntity<String> createUser(@RequestBody User user) {
    log.info("calling /signup to add users");
    boolean userExists = service.checkUserExists(user.getEmail());
    if (userExists) {
      log.info("Duplicate user found. Throwing error.");
      throw new UserAlreadyExistException("User already exists. Please log in.");
    }
    service.save(user);
    return ResponseEntity.status(HttpStatus.CREATED).body("User has been created successfully.");
  }

  @GetMapping("/user/{email}")
  public ResponseEntity<User> getUserEmail(@PathVariable String email) {
    log.info("Searching user with email id: {}", email);
    User user = service.getUserByEmail(email);
    if (user == null) {
      log.error("User does not exist");
      throw new UserNotFoundException("User with associated email does not exist.");
    }
    return ResponseEntity.status(HttpStatus.FOUND).body(user);
  }

  @PostMapping("/login")
  public String getUserEmail(@RequestBody User user) {
    return service.loginUser(user.getEmail(), user.getPassword());
  }

  @PutMapping("/update/{email}")
  public ResponseEntity<?> updateUserDetails(
      @PathVariable String email, @RequestBody User updatedUserRequest) {
    User user = service.getUserByEmail(email);
    if (user == null) {
      log.error("User does not exist");
      throw new UserNotFoundException("User with associated email does not exist.");
    }
    user = service.updateUserDetails(email, updatedUserRequest);
    return ResponseEntity.status(HttpStatus.OK).body(user);
  }
}
