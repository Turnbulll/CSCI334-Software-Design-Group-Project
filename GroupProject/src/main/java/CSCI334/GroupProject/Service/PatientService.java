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
	
	//find by name
	public ResponseEntity<List<Patient>> getUsersByName(String name) {
		return new ResponseEntity<List<Patient>>(patientRepository.findByName(name), HttpStatus.OK);
	}
	
	//add a prescription to a patient
	public void addPrescription(Long userId, Long prescriptionId) {
		Patient patient = patientRepository.findById(userId).get();
		Prescription prescription = prescriptionRepository.findById(prescriptionId).get();
		if(patient != null && prescription != null) {
			patient.addPrescription(prescription);
			System.out.println(patient);
			patient.getTreatment().addMedicines(prescription.getMedicine());
			patientRepository.save(patient);
		}
		else {
			log.info("failed to add prescription patient or prescription is null" );
		}
	}
	
	//set treatmentPlan for patient
	public void setTreatment(Long userId, Long treatmentId) {
		Patient patient = patientRepository.findById(userId).get();
		Treatment treatment = treatmentRepository.findById(treatmentId).get();
		if(patient != null && treatment != null) {
			patient.setTreatment(treatment);
			patientRepository.save(patient);
		}
		else {
			log.info("failed to set treatment either treatment or patient is null" );
		}
	}

}
