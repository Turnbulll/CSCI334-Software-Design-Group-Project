package CSCI334.GroupProject.Model;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "PRESCRIPTIONTABLE")
public class Prescription {
	//variables
	private @Id @GeneratedValue Long prescriptionId;
	private String medicine;
	private float dosage;
	
	@OneToOne(cascade=CascadeType.PERSIST)
    @JoinColumn(name = "treatment_id", referencedColumnName= "treatmentId")
	private Treatment treatment;
	
	//constructor without treatment
	public Prescription(Long prescriptionId, String medicine, float dosage){
		this.prescriptionId = prescriptionId;
		this.setMedicine(medicine);
		this.setDosage(dosage);
	}
	
	public Prescription(Long prescriptionId, String medicine, float dosage, Treatment treatment){
		this.prescriptionId = prescriptionId;
		this.setMedicine(medicine);
		this.setDosage(dosage);
		this.setTreatment(treatment);
	}
	
	//getters
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
	
	public void setDosage(float dosage) {
		this.dosage = dosage;
	}

	public void setTreatment(Treatment treatment) {
		this.treatment = treatment;
	}
	
	public String toString(){
		return "Prescription { prescriptionId= " + prescriptionId + ", medicine= " + medicine + ", dosage= " + dosage + "treatment= " + treatment.toString(); 
	}







}
