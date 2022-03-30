package CSCI334.GroupProject.Model;

import java.util.ArrayList;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "DOCTOR_TABLE")
public class Doctor extends User {
	ArrayList<String> prescriptions;
	
	public Doctor() {};
	
	public Doctor(	String name, String password, 
					String userType, ArrayList<String> prescriptions) {
		super(name, password, userType);
		this.prescriptions = prescriptions;
	}
	
	public Doctor(String name, String password, String userType) {
		super(name, password, userType);
	}
	
	public ArrayList<String> getPrescriptions(){
		return prescriptions;
	}
	
	public void setPrescriptions(ArrayList<String> prescriptions){
		this.prescriptions = prescriptions;
	}
}
