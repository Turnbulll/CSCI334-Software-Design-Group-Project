package CSCI334.GroupProject.Model;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "PRESCRIPTION_TABLE")
public class Prescription {
	//variables
	private @Id @GeneratedValue Long prescriptionId;
	private String medicine;
	private float dosage;
	
	@OneToOne(cascade=CascadeType.PERSIST)
    @JoinColumn(name = "treatment_id", referencedColumnName= "treatmentId")
	private Treatment treatment;
	
	public Prescription() {};
	
	//constructor without treatment
	public Prescription(String medicine, float dosage){
		this.setMedicine(medicine);
		this.setDosage(dosage);
	}
	
	public Prescription(String medicine, float dosage, Treatment treatment){
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
