package CSCI334.GroupProject.Service;

import java.util.List;
import java.util.Optional;
import java.util.Objects;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import CSCI334.GroupProject.DatabaseLoader;
import CSCI334.GroupProject.Model.Doctor;
import CSCI334.GroupProject.Model.Patient;
import CSCI334.GroupProject.Model.Prescription;
import CSCI334.GroupProject.Model.Treatment;
import CSCI334.GroupProject.Repository.PatientRepository;
import CSCI334.GroupProject.Repository.PrescriptionRepository;
import CSCI334.GroupProject.Repository.TreatmentRepository;


@Service
public class PatientService implements UserServiceInterface<Patient> {
	private final PatientRepository patientRepository;
	private final PrescriptionRepository prescriptionRepository;
	private final TreatmentRepository treatmentRepository;
	final org.slf4j.Logger log = LoggerFactory.getLogger(PatientService.class);
	
	//sets the patient repository
	@Autowired
	public PatientService(PatientRepository patientRepository, PrescriptionRepository prescriptionRepository, TreatmentRepository treatmentRepository) {
		this.patientRepository = patientRepository;
		this.prescriptionRepository = prescriptionRepository;
		this.treatmentRepository = treatmentRepository;
	}
	
	//returns a list of all patients
	@Override
	public List<Patient> findAllUsers() {
		return patientRepository.findAll();
	}
	
	//returns a single patient
	@Override
	public Optional<Patient> findUserById(Long userId) {
		if(validateUser(userId)) {
			return patientRepository.findById(userId);
		}
		else {
			new IllegalStateException("patient with id " + userId + " does not exist" );
			return null;
		}	
	}

	//adds a list of patients
	@Override
	public void addNewUsers(Patient[] patients) {
		for (Patient patient : patients) {
            addNewUser(patient);
        }
	}
	
	//adds a single patient
	@Override
	public void addNewUser(Patient patient) {
		patientRepository.save(patient);
	}

	//updates a patient
	@Override
	@Transactional
	public void updateUser(Long userId, String name, String password, String userType) {
		Patient patient = patientRepository.findById(userId)
	                .orElseThrow(()-> new IllegalStateException("patient with id " + userId + " does not exist" ));
	        
	        if(name != null && patient.getName().length() > 0 && !Objects.equals(patient.getName(), name)){
	        	patient.setName(name);
	        }
	        
	        if(password != null && password.length() > 0 && !Objects.equals(patient.getPassword(), password)){
	        	patient.setPassword(password);
	        }
	        
	        if(userType != null && userType.length() > 0 && !Objects.equals(patient.getUserType(), userType)){
	        	patient.setUserType(userType);
	        }
	        patientRepository.save(patient);
	}
	
	//returns true if a patient is found
	@Override
	public boolean validateUser(Long userId) {
		return patientRepository.findById(userId).isPresent(); 
	}
	
	//returns true if a treatment is found
	public boolean validateTreatment(Long treatmentId) {
		return treatmentRepository.findById(treatmentId).isPresent(); 
	}
	
	//returns true if a prescription is found
	public boolean validatePrescription(Long prescriptionId) {
		return prescriptionRepository.findById(prescriptionId).isPresent(); 
	}
	
	//find by name
	public ResponseEntity<List<Patient>> getUsersByName(String name) {
		return new ResponseEntity<List<Patient>>(patientRepository.findByName(name), HttpStatus.OK);
	}
	
	//set treatmentPlan for patient
	@Transactional
	public void setTreatment(Long userId, Long treatmentId) {
		if(validateUser(userId) && validateTreatment(treatmentId)) {
			Patient patient = patientRepository.findById(userId).get();
			Treatment treatment = treatmentRepository.findById(treatmentId).get();
			patient.setTreatment(treatment);
			patientRepository.saveAndFlush(patient);
		}
		else {
			log.info("failed to set treatment either patient or treatment is not present" );
		}
	}
	
	//add a prescription to a patient
	@Transactional
	public boolean addPrescription(Long userId, Long prescriptionId) {
		if(validateUser(userId) && validatePrescription(prescriptionId)) {
			Patient patient = new Patient(patientRepository.findById(userId).get());
			Prescription prescription = new Prescription (prescriptionRepository.findById(prescriptionId).get());
			if(!patient.isAllergic(prescription.getMedicine()) && !patient.isReaction(prescription.getMedicine())) {
				patient.addPrescription(prescription);
				patient.getTreatment().addMedicines(prescription.getMedicine());
				patientRepository.saveAndFlush(patient);
				return true;
			}
			else {
				if(patient.isAllergic(prescription.getMedicine())) {
					log.error("failed to add prescription patient " + patient.getName() + "is allergic to " + prescription.getMedicine() );
				}
				if(patient.isReaction(prescription.getMedicine())) {
					log.error("failed to add prescription patient " + patient.getName() + "is has a reaction to " + prescription.getMedicine());
				}
				return false;
			}
			
		}
		else {
			log.error("failed to add prescription patient or prescription is null" );
			return false;
		}
	}
	
	//remove medicine from patient treatment
	@Transactional
	public boolean removeMedicineFromPatientTreatment(Long userId, String medicine) {
		if(validateUser(userId)) {
			Patient patient = new Patient(patientRepository.findById(userId).get());
			patient.removeMedicineFromPatientTreatment(medicine);
			patientRepository.saveAndFlush(patient);
			return true;
		}
		else {
			log.info("patient is null" );
			return false;
		}
	}
	
}
