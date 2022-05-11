package CSCI334.GroupProject.Model;

import java.util.ArrayList;
import java.util.Objects;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "PATIENT_TABLE")

public class Patient extends User {
	
	/*@OneToMany(cascade=CascadeType.MERGE)
    @JoinColumn(name = "prescription_Id", referencedColumnName= "prescriptionId")
	private ArrayList<Prescription> prescriptions;
	*/
	public Patient(){};
	
	public Patient(String name, String password, String userType) {
		super(name, password, userType);
	}
	
	/*
	public ArrayList<String> getPrescriptions(){
		return prescriptions;
	}
	
	public void setPrescriptions(ArrayList<String> prescriptions){
		this.prescriptions = prescriptions;
	}
	*/
}
