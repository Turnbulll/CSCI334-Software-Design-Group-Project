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
	public void addAllergy(Treatment treatment, String allergy) {
		treatment.addAllergy(allergy);
		treatmentRepository.save(treatment);
	}
	
	//add a reaction
	public void addReaction(Treatment treatment, String reaction) {
		treatment.addReaction(reaction);
		treatmentRepository.save(treatment);
	}
}
