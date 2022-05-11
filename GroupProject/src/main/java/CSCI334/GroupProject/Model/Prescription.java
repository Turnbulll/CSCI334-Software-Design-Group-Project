package CSCI334.GroupProject.Model;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "PRESCRIPTION_TABLE")
public class Prescription {
	//variables
	private @Id @GeneratedValue Long prescriptionId;
	private String medicine;
	private Float dosage;
	private int repeats;
	/*
	@OneToMany(mappedBy = "prescription")
    @JsonIgnore
    private Patient patient;
	*/
	@OneToOne(cascade=CascadeType.MERGE)
    @JoinColumn(name = "treatment_id", referencedColumnName= "treatmentId")
	private Treatment treatment;
	
	public Prescription() {};
	
	//constructor without treatment
	public Prescription(String medicine, Float dosage, int repeats){
		this.setMedicine(medicine);
		this.setDosage(dosage);
		this.setRepeats(repeats);
	}
	
	public Prescription(String medicine, Float dosage,int repeats,  Treatment treatment){
		this.setMedicine(medicine);
		this.setDosage(dosage);
		this.setRepeats(repeats);
		this.setTreatment(treatment);
	}
	
	//getters
	
	public Long getPrescriptionId() {
		return prescriptionId;
	}
	
	public String getMedicine() {
		return medicine;
	}
	
	public float getDosage() {
		return dosage;
	}
	
	public int getRepeats() {
		return repeats;
	}

	public Treatment getTreatment() {
		return treatment;
	}
	
	//setters
	public void setMedicine(String medicine) {
		this.medicine = medicine;
	}
	
	public void setDosage(Float dosage) {
		this.dosage = dosage;
	}
	
	public void setRepeats(int repeats) {
		this.repeats = repeats;
	}

	public void setTreatment(Treatment treatment) {
		this.treatment = treatment;
	}
	
	public String toString(){
		
		if(treatment == null) {
			return "Prescription { prescriptionId= " + prescriptionId + ", medicine= " + medicine + ", dosage= " + dosage + ", repeats= " + repeats +"}"; 
		}
		else {
			return "Prescription { prescriptionId= " + prescriptionId + ", medicine= " + medicine + ", dosage= " + dosage + ", repeats= " + repeats +"}, " + treatment.toString(); 
		}
	}
	
}

