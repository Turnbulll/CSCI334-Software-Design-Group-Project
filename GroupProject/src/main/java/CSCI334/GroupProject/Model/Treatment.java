package CSCI334.GroupProject.Model;

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
	private String description;
	
    @OneToOne(mappedBy = "treatment")
    @JsonIgnore
    private Prescription prescription;
	
    public Treatment(){};
    
	public Treatment(String description){
		this.description = description;
	}
	
	//setter 
	public void setDescription(String description){
		this.description = description;
	}
	
	//getter
	public Long getTreatmentId() {
		return treatmentId;
	}
	
	public String getDescription(){
		return description;
	}
	
	public String toString(){
		return "Treatment { treatmentId= " + treatmentId + ", description= " + description + "}"; 
	}
}
