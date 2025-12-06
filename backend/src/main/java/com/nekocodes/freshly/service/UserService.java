package com.nekocodes.freshly.service;

import com.nekocodes.freshly.model.DietInfo;
import com.nekocodes.freshly.model.User;
import com.nekocodes.freshly.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserService implements UserDetailsService {
  public final PasswordEncoder passwordEncoder;
  private final UserRepository repo;

  public User getUserByEmail(String email) {
    return repo.findByEmail(email);
  }

  public String encryptPassword(String password) {
    return passwordEncoder.encode(password);
  }

  public boolean checkUserExists(String email) {
    User userFound = getUserByEmail(email);
    return userFound != null;
  }

  public void save(User user) {
    String encryptedPassword = encryptPassword(user.getPassword());
    user.setPassword(encryptedPassword);
    repo.save(user);
  }

  public String loginUser(String email, String password) {
    User userObj = getUserByEmail(email);
    System.out.println(userObj);
    System.out.println(password);
    if (userObj.getEmail() == null) return "Invalid Email Id provided";
    else if (passwordEncoder.matches(password, userObj.getPassword())) {
      return "Successfully Authenticated";
    } else return "Password provided is Invalid";
  }

  public User getUserByName(String name) {
    return repo.findByName(name);
  }

  public User updateUserDetails(String email, User updatedUserRequest) {

    User user = getUserByEmail(email);
    if (updatedUserRequest.getName() != null) user.setName(updatedUserRequest.getName());
    if (updatedUserRequest.getAge() != 0) user.setAge(updatedUserRequest.getAge());
    if (updatedUserRequest.getGender() != null) user.setGender(updatedUserRequest.getGender());
    if (updatedUserRequest.getHeight() != 0) user.setHeight(updatedUserRequest.getHeight());
    if (updatedUserRequest.getWeight() != 0) user.setWeight(updatedUserRequest.getWeight());
    if (updatedUserRequest.getActivityLevel() != null)
      user.setActivityLevel(updatedUserRequest.getActivityLevel());

    // updating dietinfo values
    if (updatedUserRequest.getDietInfo() != null) {
      DietInfo dietInfo = user.getDietInfo();
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
    log.info("User updated successfully");
    return repo.save(user);
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = getUserByEmail(username);
    if (user == null) throw new UsernameNotFoundException("User with email doesnt exists.");
    return new UserInfoDetails(user);
  }
}
