package CSCI334.GroupProject.Model;


import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.MappedSuperclass;
import javax.persistence.Table;

@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public abstract class User {
	//variables
	private @Id @GeneratedValue Long userId;
	private String name;
	private String password;
	private String userType;
	private String email;
	
	//default constructor
	public User() {};
	
	//constructor
	public User(String name, String password, String userType, String email) {
		setName(name);
		setPassword(password);
		setUserType(userType);
		setEmail(email);
	}
	
	public User(Long userId, String name, String password, String userType, String email) {
		setUserId(userId);
		setName(name);
		setPassword(password);
		setUserType(userType);
		setEmail(email);
	}
	
	//getters
	public Long getUserId(){
		return userId;
	}
	
	public String getName(){
		return name;
	}
	
	public String getPassword(){
		return password;
	}
	
	public String getUserType(){
		return userType;
	}
	
	public String getEmail(){
		return email;
	}
	
	//setters
	public void setUserId(Long userId){
		this.userId = userId;
	}
	
	public void setName(String name){
		this.name = name;
	}
	
	public void setPassword(String password){
		this.password = password;
	}
	
	public void setUserType(String userType){
		this.userType = userType; 
	}
	
	public void setEmail(String email){
		this.email = email; 
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
        if (!Objects.equals(this.email, other.email)) {
            return false;
        }
        return Objects.equals(this.userId, other.userId);
    }
	
	@Override
	public String toString() {
        return "User{" + "userId=" + userId + ", name=" + name + ", password=" + password + ", userType=" + userType + ", email=" + email + '}';
	}
	
	
}
