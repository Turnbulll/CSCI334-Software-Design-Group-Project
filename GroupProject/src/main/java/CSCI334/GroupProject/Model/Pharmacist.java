package CSCI334.GroupProject.Model;

import java.util.ArrayList;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "PHARMACISTABLE")
public class Pharmacist extends User {
	//variables
	ArrayList<String> prescriptions = new ArrayList<String>();
	
	public Pharmacist(String name, String password, String userType, ArrayList<String> prescriptions) {
		super(name, password, userType);
		this.prescriptions = prescriptions;
	}
	
	ArrayList<String> getPrescriptions(){
		return prescriptions;
	}
}
