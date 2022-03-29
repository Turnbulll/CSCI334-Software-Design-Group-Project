package CSCI334.GroupProject.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import CSCI334.GroupProject.Model.User;




public interface UserServiceInterface<T extends User> {
	
	//abstract method subclass returns a list of all users in the subclass repository
    public abstract List<T> findAllUsers();
    
    //subclass returns a single user from the subclasses repository
    public abstract Optional<T> findUserById(Long userId);

    //subclass adds a list of new users to the subclasses repository
    public abstract void addNewUsers(T[] users);
    
    //subclass adds a new user to the subclass repository
    public abstract void addNewUser(T user);
    
    //subclass updates a user within the repository
    @Transactional
    public abstract void updateUser(Long userId, String name, String password, String userType);
    
    //returns true if user is found in repository
    public abstract boolean validateUser(Long userId);


}
