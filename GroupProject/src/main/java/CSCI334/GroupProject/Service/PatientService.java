package CSCI334.GroupProject.Service;

import java.util.List;
import java.util.Optional;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import CSCI334.GroupProject.Model.Patient;
import CSCI334.GroupProject.Repository.PatientRepository;


@Service
public class PatientService implements UserServiceInterface<Patient> {
	private final PatientRepository patientRepository;
	
	//sets the patient repository
	@Autowired
	public PatientService(PatientRepository patientRepository) {
		this.patientRepository = patientRepository;
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

}
