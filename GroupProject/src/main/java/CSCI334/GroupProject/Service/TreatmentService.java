package CSCI334.GroupProject.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import CSCI334.GroupProject.Model.Treatment;
import CSCI334.GroupProject.Repository.TreatmentRepository;

@Service
public class TreatmentService {
	private final TreatmentRepository treatmentRepository;
	
	//sets the treatment repository
	@Autowired
	public TreatmentService(TreatmentRepository treatmentRepository) {
		this.treatmentRepository = treatmentRepository;
	}
	
	//returns a list of all treatments
	public List<Treatment> findAllTreatments() {
		return treatmentRepository.findAll();
	}
	
	//returns a single treatment 
	public Optional<Treatment> findTreatmentById(Long treatmentId) {
		if(validateTreatment(treatmentId)) {
			return treatmentRepository.findById(treatmentId);
		}
		else {
			new IllegalStateException("treatment with id " + treatmentId + " does not exist" );
			return null;
		}	
	}

	//adds a list of treatments
	public void addNewTreatments(Treatment[] treatments) {
		for (Treatment treatment : treatments) {
            addNewTreatment(treatment);
        }
	}
	
	//adds a single treatment
	public void addNewTreatment(Treatment treatment) {
		treatmentRepository.save(treatment);
	}
	
	//returns true if a treatment is found
	public boolean validateTreatment(Long treatmentId) {
		return treatmentRepository.findById(treatmentId).isPresent(); 
	}
	
	//add an allergy
	public String addAllergy(Long treatmentId, String allergy) {
		Treatment treatment = treatmentRepository.findById(treatmentId).get();
		treatment.addAllergy(allergy);
		treatmentRepository.save(treatment);
		return allergy + " added to treatment " + treatmentId.toString();
	}
	
	//add a reaction
	public String addReaction(Long treatmentId, String reaction) {
		Treatment treatment = treatmentRepository.findById(treatmentId).get();
		treatment.addReaction(reaction);
		treatmentRepository.save(treatment);
		return reaction + " added to treatment " + treatmentId.toString();
	}
	
	//add a physical condition
	public String addPhysicalCondition(Long treatmentId, String physicalCondition) {
		Treatment treatment = treatmentRepository.findById(treatmentId).get();
		treatment.addPhysicalCondition(physicalCondition);
		treatmentRepository.save(treatment);
		return physicalCondition + " added to treatment " + treatmentId.toString();
	}
}
