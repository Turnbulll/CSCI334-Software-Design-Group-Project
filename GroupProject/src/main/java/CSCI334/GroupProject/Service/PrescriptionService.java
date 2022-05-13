package CSCI334.GroupProject.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;

import CSCI334.GroupProject.Model.Prescription;
import CSCI334.GroupProject.Model.Treatment;
import CSCI334.GroupProject.Repository.PrescriptionRepository;
import CSCI334.GroupProject.Repository.TreatmentRepository;

@Service
public class PrescriptionService {
	private final PrescriptionRepository prescriptionRepository;
	
	//sets the treatment repository
	@Autowired
	public PrescriptionService(PrescriptionRepository prescriptionRepository) {
		this.prescriptionRepository = prescriptionRepository;
	}
	
	//returns a list of all prescriptions
	public List<Prescription> findAllPrescriptions() {
		return prescriptionRepository.findAll();
	}
	
	//returns a single prescription
	public Optional<Prescription> findPrescriptionById(Long prescriptionId) {
		if(validatePrescription(prescriptionId)) {
			return prescriptionRepository.findById(prescriptionId);
		}
		else {
			new IllegalStateException("prescription with id " + prescriptionId + " does not exist" );
			return null;
		}	
	}

	//adds a list of prescription
	public void addNewPrescriptions(Prescription[] prescriptions) {
		for (Prescription prescription : prescriptions) {
            addNewPrescription(prescription);
        }
	}
	
	//adds a single prescription
	public void addNewPrescription(Prescription prescription) {
		prescriptionRepository.save(prescription);
	}

	//updates a prescription
	@Transactional
	public void updatePrescription(@PathVariable Long prescriptionId, @PathVariable String medicine, @PathVariable Float dosage, @PathVariable Integer repeats) {
		Prescription prescription = prescriptionRepository.findById(prescriptionId)
	                .orElseThrow(()-> new IllegalStateException("prescription with id " + prescriptionId + " does not exist" ));
			if(medicine != null && prescription.getMedicine().length() > 0 && !Objects.equals(prescription.getMedicine(), medicine)){
	        	prescription.setMedicine(medicine);
	        }
	        if(dosage != null && prescription.getDosage() >= 0 && !Objects.equals(prescription.getDosage(), dosage)){  
	        	prescription.setDosage(dosage);
	        }
	        if(repeats != null && prescription.getRepeats()  >= 0 && !Objects.equals(prescription.getRepeats(), repeats)){  
	        	prescription.setRepeats(repeats);
	        }
	        prescriptionRepository.save(prescription);
	}
	
	//returns true if a prescription is found
	public boolean validatePrescription(Long prescriptionId) {
		return prescriptionRepository.findById(prescriptionId).isPresent(); 
	}
}
