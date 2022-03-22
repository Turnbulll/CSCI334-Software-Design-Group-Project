package CSCI334.GroupProject.Model;

import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "USERTABLE")
public class User {
	//variables
	private @Id @GeneratedValue long userId;
	private String name;
	private String password;
	private String userType;
	
	//default constructor
	public User() {};
	
	//constructor
	public User(long userId, String name, String password, String userType) {
		this.userId = userId;
		this.name = name;
		this.password = password;
		this.userType = userType;
	}
	
	//getters
	public long getUserId(){
		return userId;
	}
	
	public String getUserName(){
		return name;
	}
	
	public String getUserPassword(){
		return password;
	}
	
	public String getUserType(){
		return userType;
	}
	
	@Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final User other = (User) obj;
        if (!Objects.equals(this.userId, other.userId)) {
            return false;
        }
        if (!Objects.equals(this.name, other.name)) {
            return false;
        }
        if (!Objects.equals(this.password, other.password)) {
            return false;
        }
        if (!Objects.equals(this.userType, other.userType)) {
            return false;
        }
        return Objects.equals(this.userId, other.userId);
    }
	
	@Override
	public String toString() {
        return "User{" + "userId=" + userId + ", name=" + name + ", userType=" + userType + '}';
	}
	
	
}
