package CSCI334.GroupProject.Model;

import java.util.ArrayList;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "PATIENTTABLE")
public class Patient extends User {
	//variables
	ArrayList<String> prescriptions = new ArrayList<String>();
	
	public Patient(String name, String password, String userType, ArrayList<String> prescriptions) {
		super(name, password, userType);
		setPrescriptions(prescriptions);
	}
	
	public Patient(String name, String password, String userType) {
		super(name, password, userType);
	}

	public ArrayList<String> getPrescriptions(){
		return prescriptions;
	}
	
	public void setPrescriptions(ArrayList<String> prescriptions){
		this.prescriptions = prescriptions;
	}
}
