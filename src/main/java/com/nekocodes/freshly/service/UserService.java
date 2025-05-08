package com.nekocodes.freshly.service;

import com.nekocodes.freshly.model.User;
import com.nekocodes.freshly.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    UserRepository repo;

    public User getUserByEmail(String email)
    {
        return repo.findByEmail(email);
    }


    public User save(User user) {
        return (User) repo.save(user);
    }
}
