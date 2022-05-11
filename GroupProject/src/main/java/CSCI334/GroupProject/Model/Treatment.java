package CSCI334.GroupProject.Model;

import java.util.ArrayList;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import CSCI334.GroupProject.Model.Prescription;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "TREATMENT_TABLE")
public class Treatment {
	//variables
	private @Id @GeneratedValue Long treatmentId;
	private ArrayList<String> allergies;
	private ArrayList<String> reactions;
	
    @OneToOne(mappedBy = "treatment")
    @JsonIgnore
    private Prescription prescription;
	
    public Treatment(){};
    
	public Treatment(ArrayList<String> allergies, ArrayList<String> reactions){
		this.setAllergies(allergies);
		this.setReactions(reactions);
	}
	
	//setter 
	public void setAllergies(ArrayList<String> allergies){
		this.allergies = allergies;
	}
	
	public void setReactions(ArrayList<String> reactions){
		this.reactions = reactions;
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
	
	//add an allergy
	public void addAllergy(String allergy) {
		allergies.add(allergy);
	}
	
	//add a reaction
	public void addReaction(String reaction) {
		reactions.add(reaction);
	}
	
	public String toString(){
		return "Treatment { treatmentId= " + treatmentId + ", allergies= " + allergies + ", reactions= " + reactions +"}"; 
	}
}
