package CSCI334.GroupProject.Model;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
	
	@ManyToOne
    @JsonIgnore
    private Patient patient;
	
	public Prescription() {};
	
	//constructor 
	public Prescription(String medicine, Float dosage, int repeats){
		this.setMedicine(medicine);
		this.setDosage(dosage);
		this.setRepeats(repeats);
	}
	
	public Prescription(Prescription prescription){
		this.setPrescriptionId(prescription.getPrescriptionId());
		this.setMedicine(prescription.getMedicine());
		this.setDosage(prescription.getDosage());
		this.setRepeats(prescription.getRepeats());
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
	
	public Patient getPatient() {
		return patient;
	}
	
	//setters
	public void setPrescriptionId(Long prescriptionId) {
		this.prescriptionId = prescriptionId;
	}
	
	public void setMedicine(String medicine) {
		this.medicine = medicine;
	}
	
	public void setDosage(Float dosage) {
		this.dosage = dosage;
	}
	
	public void setRepeats(int repeats) {
		this.repeats = repeats;
	}
	
	public void setPatient(Patient patient) {
		this.patient = patient;
	}
	
	public String toString(){
		return "Prescription { prescriptionId= " + prescriptionId + ", medicine= " + medicine + ", dosage= " + dosage + ", repeats= " + repeats +"})"; 
	}
	
}

