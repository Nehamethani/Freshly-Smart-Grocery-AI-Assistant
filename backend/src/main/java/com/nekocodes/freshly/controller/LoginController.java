package com.nekocodes.freshly.controller;

import com.nekocodes.freshly.model.AuthRequest;
import com.nekocodes.freshly.service.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Slf4j
public class LoginController {
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;
  String token;

  @PostMapping("/authenticate")
  public ResponseEntity<?> authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
    log.info("Login attempt for: {}", authRequest.getUsername());

    try {
      Authentication authentication =
          authenticationManager.authenticate(
              new UsernamePasswordAuthenticationToken(
                  authRequest.getUsername(), authRequest.getPassword()));

      log.info("Authentication successful for: {}", authRequest.getUsername());

      if (authentication.isAuthenticated()) {
        token = jwtService.generateToken(authRequest.getUsername());
        log.info("Token generated: {}", token);
      }
    } catch (UsernameNotFoundException e) {
      log.warn("Username Not found: {}", authRequest.getUsername());
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User does not exists.");
    } catch (BadCredentialsException e) {
      log.error("BadCredential error: {}", e.getMessage(), e);
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Bad Credentials.");
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body("Authentication Failed due to Internal server Error");
    }
    return ResponseEntity.ok(token);
  }
}
