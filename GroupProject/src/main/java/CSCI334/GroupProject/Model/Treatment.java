package CSCI334.GroupProject.Model;

import java.util.ArrayList;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import CSCI334.GroupProject.Model.Prescription;

@Entity
@Table(name = "TREATMENT_TABLE")
public class Treatment {
	//variables
	private @Id @GeneratedValue Long treatmentId;
	private ArrayList<String> allergies;
	private ArrayList<String> reactions;
	private ArrayList<String> medicines;
	
    @OneToOne(mappedBy = "treatment")
    @JsonIgnore
    private Patient patient;
	
    public Treatment(){};
    
	public Treatment(ArrayList<String> allergies, ArrayList<String> reactions, ArrayList<String> medicines){
		this.setAllergies(allergies);
		this.setReactions(reactions);
		this.setMedicines(medicines);
	}
	
	//setter 
	public void setTreatmentId(Long treatmentId){
		this.treatmentId = treatmentId;
	}
	
	public void setAllergies(ArrayList<String> allergies){
		this.allergies = allergies;
	}
	
	public void setReactions(ArrayList<String> reactions){
		this.reactions = reactions;
	}
	
	public void setMedicines(ArrayList<String> medicines){
		this.medicines = medicines;
	}
	
	//getter
	public Long getTreatmentId() {
		return treatmentId;
	}
	
	public ArrayList<String> getAllergies(){
		return allergies;
	}
	
	public ArrayList<String> getReactions(){
		return reactions;
	}
	
	public ArrayList<String> getMedicines(){
		return medicines;
	}
	
	//add an allergy
	public void addAllergy(String allergy) {
		allergies.add(allergy);
	}
	
	//add a reaction
	public void addReaction(String reaction) {
		reactions.add(reaction);
	}
	
	//add medicine
	public void addMedicines(String medicine) {
		medicines.add(medicine);
	}
	
	public String toString(){
		return "Treatment { treatmentId= " + treatmentId + ", allergies= " + allergies + ", reactions= " + reactions + ", medicines= " + medicines +"}"; 
	}
}
