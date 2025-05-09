package com.nekocodes.freshly.service;

import com.nekocodes.freshly.model.User;
import com.nekocodes.freshly.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    UserRepository repo;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public User getUserByEmail(String email)
    {
        return repo.findByEmail(email);
    }


    public User save(User user) {
        String encryptedPassword = passwordEncoder.encode(user.getPassword());
        System.out.println("Provided password: " + user.getPassword());
        //user.setPassword(encryptedPassword);
        System.out.println("Encrypted password: " + encryptedPassword);
        return (User) repo.save(user);
    }

    public User getUserByName(String name) {
        return repo.findByName(name);
    }


}
