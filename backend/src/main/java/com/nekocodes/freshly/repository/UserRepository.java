package com.nekocodes.freshly.repository;

import com.nekocodes.freshly.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends MongoRepository <User, String>{
    User findByEmail(String email);
    User findByName(String name);


}
