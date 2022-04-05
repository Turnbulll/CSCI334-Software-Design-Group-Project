package CSCI334.GroupProject.Model;

import java.util.ArrayList;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "PATIENT_TABLE")

public class Patient extends User {
	public Patient(){};
	
	public Patient(String name, String password, String userType) {
		super(name, password, userType);
	}
}
