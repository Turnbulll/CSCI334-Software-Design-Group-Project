package CSCI334.GroupProject.Model;

import java.util.ArrayList;
import java.util.List;
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
	
	@OneToOne(cascade=CascadeType.MERGE)
    @JoinColumn(name = "treatment_id", referencedColumnName= "treatmentId")
	private Treatment treatment;
	
	@OneToMany(mappedBy = "patient")
	private List<Prescription> prescriptions;
	
	public Patient(){};
	
	public Patient(String name, String password, String userType, Treatment treatment) {
		super(name, password, userType);
		this.treatment = treatment;
	}
	
	public Patient(String name, String password, String userType) {
		super(name, password, userType);
	}
	
	//getters
	public List<Prescription> getPrescriptions(){
		return prescriptions;
	}
	
	public Treatment getTreatment() {
		return treatment;
	}
	
	//setters
	public void setTreatment(Treatment treatment) {
		this.treatment = treatment;
	}
	
	public void setPrescriptions(List<Prescription> prescriptions){
		this.prescriptions = prescriptions;
	}
	
	//add prescription
	public void addPrescription(Prescription prescription) {
		this.prescriptions.add(prescription);
	}
	
	@Override
	public String toString() {
		return super.toString() + " " + treatment.toString() + " "+ prescriptions.toString(); 
		
	}
	
}
