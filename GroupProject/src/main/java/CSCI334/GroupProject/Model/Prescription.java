package CSCI334.GroupProject.Model;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "PRESCRIPTION_TABLE")
public class Prescription {
	//variables
	private @Id @GeneratedValue Long prescriptionId;
	private String medicine;
	private Float dosage;
	
	
	@OneToOne(cascade=CascadeType.MERGE)
    @JoinColumn(name = "treatment_id", referencedColumnName= "treatmentId")
	private Treatment treatment;
	
	public Prescription() {};
	
	//constructor without treatment
	public Prescription(String medicine, Float dosage){
		this.setMedicine(medicine);
		this.setDosage(dosage);
	}
	
	public Prescription(String medicine, Float dosage, Treatment treatment){
		this.setMedicine(medicine);
		this.setDosage(dosage);
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

	public void setTreatment(Treatment treatment) {
		this.treatment = treatment;
	}
	
	public String toString(){
		
		if(treatment == null) {
			return "Prescription { prescriptionId= " + prescriptionId + ", medicine= " + medicine + ", dosage= " + dosage + "}"; 
		}
		else {
			return "Prescription { prescriptionId= " + prescriptionId + ", medicine= " + medicine + ", dosage= " + dosage + "}, " + treatment.toString(); 
		}
	}
	
}

