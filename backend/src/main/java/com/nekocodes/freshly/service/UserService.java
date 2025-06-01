package com.nekocodes.freshly.service;

import com.nekocodes.freshly.model.DietInfo;
import com.nekocodes.freshly.model.User;
import com.nekocodes.freshly.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.swing.text.Document;
import java.util.Objects;
import java.util.Optional;

@Slf4j
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

    public ResponseEntity<?> updateUserDetails(String email, User updatedUserRequest){
        boolean emailExists=checkUserExists(email);
        if(!emailExists){
            log.info("Email does not exist");
            return ResponseEntity.notFound().build();
        }
        else {
            User user = getUserByEmail(email);
            if(updatedUserRequest.getAge()!=0)
                user.setAge(updatedUserRequest.getAge());
            if(updatedUserRequest.getGender()!=null)
                user.setGender(updatedUserRequest.getGender());
            if(updatedUserRequest.getHeight()!=0)
                user.setHeight(updatedUserRequest.getHeight());
            if(updatedUserRequest.getWeight()!=0)
                user.setWeight(updatedUserRequest.getWeight());
            if(updatedUserRequest.getActivityLevel()!=null)
                user.setActivityLevel(updatedUserRequest.getActivityLevel());

            //updating dietinfo values
            if(updatedUserRequest.getDietInfo()!=null){
                DietInfo dietInfo=new DietInfo();
                DietInfo getDietInfo = updatedUserRequest.getDietInfo();

                    if (getDietInfo.getDietType() != null)
                        dietInfo.setDietType(updatedUserRequest.getDietInfo().getDietType());
                    if (getDietInfo.getGoal() != null)
                        dietInfo.setGoal(updatedUserRequest.getDietInfo().getGoal());
                    if (getDietInfo.getLikedFood() != null)
                        dietInfo.setLikedFood(updatedUserRequest.getDietInfo().getLikedFood());
                    if (getDietInfo.getDislikedFood() != null)
                        dietInfo.setDislikedFood(updatedUserRequest.getDietInfo().getDislikedFood());
                    if (getDietInfo.getCuisines() != null)
                        dietInfo.setCuisines(updatedUserRequest.getDietInfo().getCuisines());
                    if (getDietInfo.getAllergies() != null)
                        dietInfo.setAllergies(updatedUserRequest.getDietInfo().getAllergies());
                    user.setDietInfo(dietInfo);

            }

            repo.save(user);
            return ResponseEntity.ok(user);
        }
    }

}
