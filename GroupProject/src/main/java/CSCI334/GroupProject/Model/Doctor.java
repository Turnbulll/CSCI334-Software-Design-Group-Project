package CSCI334.GroupProject.Model;

import java.util.ArrayList;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "DOCTOR_TABLE")
public class Doctor extends User {
	
	public Doctor() {};
	
	public Doctor(String name, String password, String userType,String email) {
		super(name, password, userType, email);
	}
	
}
