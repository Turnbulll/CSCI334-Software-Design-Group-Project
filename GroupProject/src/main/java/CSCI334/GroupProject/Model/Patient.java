package CSCI334.GroupProject.Model;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
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
	
	@OneToMany(mappedBy = "patient", cascade=CascadeType.MERGE, fetch = FetchType.EAGER)
	private List<Prescription> prescriptions = new ArrayList<>();
	
	public Patient(){};
	
	public Patient(String name, String password, String userType, Treatment treatment , List<Prescription> prescriptions) {
		super(name, password, userType);
		this.treatment = treatment;
		this.prescriptions = prescriptions;
	}
	
	public Patient(String name, String password, String userType) {
		super(name, password, userType);
	}
	
	public Patient(Patient patient) {
		super(patient.getUserId(), patient.getName(), patient.getPassword(), patient.getUserType());
		setTreatment(patient.getTreatment());
		setPrescriptions(patient.getPrescriptions());
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
		prescription.setPatient(this);
		this.prescriptions.add(prescription);
	}
	
	//check allergy
	public boolean isAllergic(String medicine) {
		for(int i = 0; i < getTreatment().getAllergies().size(); i++ ) {
			if(getTreatment().getAllergies().get(i).equals(medicine)) {
				return true;
			}
		}
		return false;
	}
	
	//check reactions
	public boolean isReaction(String medicine) {
		for(int i = 0; i < getTreatment().getReactions().size(); i++ ) {
			if(getTreatment().getReactions().get(i).equals(medicine)) {
				return true;
			}
		}
		return false;
	}
	
	//remove medicine
	public boolean removeMedicineFromPatientTreatment(String medicine) {
		for(int i = 0; i < getTreatment().getMedicines().size(); i++ ) {
			if(getTreatment().getMedicines().get(i).equals(medicine)) {
				getTreatment().getMedicines().remove(i);
				return true;
			}
		}
		return false;
	}
	
	@Override
	public String toString() {
		return super.toString() + ", " + treatment.toString() + ", Prescriptions{ "+ prescriptions.toString() + " }"; 
		
	}
	
}
