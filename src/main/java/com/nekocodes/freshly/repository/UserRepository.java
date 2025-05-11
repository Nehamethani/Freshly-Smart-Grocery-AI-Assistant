package com.nekocodes.freshly.repository;

import com.nekocodes.freshly.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import javax.swing.text.Document;


@Repository
public interface UserRepository extends MongoRepository <User, String>{
    User findByEmail(String email);
    User findByName(String name);
    @Query(value = "{ 'email' : ?0 }", fields = "{ 'email' : 1, '_id' : 0 }")
    String findEmailByEmail(String email);


}
