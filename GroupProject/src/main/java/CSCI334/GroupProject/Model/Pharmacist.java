package CSCI334.GroupProject.Model;

import java.util.ArrayList;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "PHARMACIST_TABLE")
public class Pharmacist extends User {
	//variables
	ArrayList<String> prescriptions = new ArrayList<String>();
	
	public Pharmacist() {};
	
	public Pharmacist(String name, String password, String userType, ArrayList<String> prescriptions) {
		super(name, password, userType);
		this.prescriptions = prescriptions;
	}
	
	public Pharmacist(String name, String password, String userType) {
		super(name, password, userType);
	}
	
	ArrayList<String> getPrescriptions(){
		return prescriptions;
	}
}
