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
	private ArrayList<String> conflicts;
	private ArrayList<String> medicines;
	private String physicalCondition;
	
    @OneToOne(mappedBy = "treatment")
    @JsonIgnore
    private Patient patient;
	
    public Treatment(){};
    
	public Treatment(ArrayList<String> allergies, ArrayList<String> conflicts, ArrayList<String> medicines, String physicalCondition){
		this.setAllergies(allergies);
		this.setConflicts(conflicts);
		this.setMedicines(medicines);
		this.setPhysicalCondition(physicalCondition);
	}
	
	//setter 
	public void setTreatmentId(Long treatmentId){
		this.treatmentId = treatmentId;
	}
	
	public void setAllergies(ArrayList<String> allergies){
		this.allergies = allergies;
	}
	
	public void setConflicts(ArrayList<String> conflicts){
		this.conflicts = conflicts;
	}
	
	public void setMedicines(ArrayList<String> medicines){
		this.medicines = medicines;
	}
	
	public void setPhysicalCondition(String physicalCondition){
		this.physicalCondition = physicalCondition;
	}
	
	//getter
	public Long getTreatmentId() {
		return treatmentId;
	}
	
	public ArrayList<String> getAllergies(){
		return allergies;
	}
	
	public ArrayList<String> getConflicts(){
		return conflicts;
	}
	
	public ArrayList<String> getMedicines(){
		return medicines;
	}
	
	public String getPhysicalConditionCondition(){
		return physicalCondition;
	}
	
	
	//add an allergy
	public void addAllergy(String allergy) {
		allergies.add(allergy);
	}
	
	//add a reaction
	public void addConflict(String conflict) {
		conflicts.add(conflict);
	}
	
	//add medicine
	public void addMedicines(String medicine) {
		medicines.add(medicine);
	}
	
	//add to physical condition
	public void addPhysicalCondition(String physicalCondition) {
		this.physicalCondition += " " + physicalCondition;
	}
	
	public String toString(){
		return "Treatment { treatmentId= " + treatmentId + ", allergies= " + allergies + ", conflicts= " + conflicts + ", medicines= " + medicines + ", physcicalCondition= " + physicalCondition +"}"; 
	}
}
