package com.nekocodes.freshly.service;

import com.nekocodes.freshly.model.User;
import com.nekocodes.freshly.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.swing.text.Document;
import java.util.Objects;

@Service
public class UserService {

    @Autowired
    UserRepository repo;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public User getUserByEmail(String email)
    {
        if(repo.findByEmail(email) == null)
            return new User();
        else {
            return repo.findByEmail(email);
        }
    }

    public String encryptPassword(String password)
    {
        return passwordEncoder.encode(password);
    }

    public boolean checkUserExists(String email)
    {
        User userFound=getUserByEmail(email);
        return Objects.equals(userFound.getEmail(), email);
    }
    public void save(User user) {
            String encryptedPassword = encryptPassword(user.getPassword());
            user.setPassword(encryptedPassword);
            repo.save(user);
    }

    public String loginUser(String email, String password)
    {
        User userObj = getUserByEmail(email);
        System.out.println(userObj);
        System.out.println(password);
        if(userObj.getEmail() == null)
            return "Invalid Email Id provided";
        else if (passwordEncoder.matches(password,userObj.getPassword())) {
            return "Successfully Authenticated";
        }
        else return "Password provided is Invalid";
        
    }

    public User getUserByName(String name) {
        return repo.findByName(name);
    }

}
