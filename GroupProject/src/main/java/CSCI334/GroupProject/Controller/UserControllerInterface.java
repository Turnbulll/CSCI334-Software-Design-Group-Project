package CSCI334.GroupProject.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import CSCI334.GroupProject.Model.User;

public interface UserControllerInterface<T extends User> {
	
	//get request to return a list of users
	List<T> getUsers();
	
	//get request to return a single user
	public Optional<T> getUser(@PathVariable("userId") Long userId);
	
	//post request that adds a list of new users
	public T[] newUsers(@RequestBody T[] users);
	
	//post request to add a single new user
	public T newUser(@RequestBody T user);
	
	//put request that updates user information
	public Optional<T> updateUser(
	        @PathVariable("userId") Long userId,
	        @RequestParam(required = false) String name,
	        @RequestParam(required = false) String password,
	        @RequestParam(required = false) String userType);
	
	//get request that checks if user is valid
	public boolean validateUser(@PathVariable("userId") Long userId);
	
	
}
