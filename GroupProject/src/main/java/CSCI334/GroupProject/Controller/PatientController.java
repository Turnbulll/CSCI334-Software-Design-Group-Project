package CSCI334.GroupProject.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import CSCI334.GroupProject.Model.Doctor;
import CSCI334.GroupProject.Model.Patient;
import CSCI334.GroupProject.Service.PatientService;


@CrossOrigin("*")//had to ass this to get frontend communication working. there's deffo a better way to do it. If you work it out lemme know
@RestController
public class PatientController implements UserControllerInterface<Patient> {
	private final PatientService patientService;
	
	//sets the patient service
	PatientController(PatientService patientService){
		this.patientService = patientService;
	}
	
	//get request to return a list of patients
	@Override
	@GetMapping("/Patient")
	public List<Patient> getUsers() {
		return patientService.findAllUsers();
	}

	//get request that returns a single patient via id
	@Override
	@GetMapping("/Patient/{userId}")
	public Optional<Patient> getUser(@PathVariable("userId") Long userId) {
		return patientService.findUserById(userId);
	}
	
	//post request to add a list of new patients
	@Override
	@PostMapping("/Patients/New")
	public Patient[] newUsers(@RequestBody Patient[] patients) {
		patientService.addNewUsers(patients);
		return patients;
	}
	
	//post request to add a new patient
	@Override
	@PostMapping("/Patient/New")
	public Patient newUser(@RequestBody Patient patient) {
		patientService.addNewUser(patient);
		return patient;
	}

	//put request to update a patients information
	@Override
	@PutMapping("Patient/{userId}")
	public Optional<Patient> updateUser(
		@PathVariable("userId") Long userId,
        @RequestParam(required = false) String name,
        @RequestParam(required = false) String password,
        @RequestParam(required = false) String userType){
			patientService.updateUser(userId, name, password, userType);
			return patientService.findUserById(userId);
		}

	//get request that returns a true if a patient is found
	@Override
	@GetMapping("/Patient/Valid/{userId}")
	public boolean validateUser(@PathVariable("userId") Long userId) {
		return patientService.validateUser(userId);
	}
	
	//find by name
	@GetMapping("/Patient/Name")
	public ResponseEntity<List<Patient>> getUsersByName(@RequestParam String name) {
		return patientService.getUsersByName(name);
	}
	
	//put request to add a new prescription to a patient
	@PutMapping("/Patient/AddPrescription/{userId}")
	public ResponseEntity<String> addPrescription(
			@PathVariable("userId") Long userId,
			@RequestParam(required = true) Long prescriptionId){
		if (patientService.addPrescription(userId, prescriptionId)) {
			return new ResponseEntity<>(patientService.findUserById(userId).toString(), HttpStatus.OK);
		}
		else
			return new ResponseEntity<>("Failed to add prescription to patient " + userId.toString() + " check if patient is allergic or has reaction to a medicine in prescription " + prescriptionId , HttpStatus.BAD_REQUEST);
	}
	
	//set treatment plan
	//put request to add a new prescription to a patient
	@PutMapping("/Patient/SetTreatment/{userId}")
	public Optional<Patient> setTreatment(
			@PathVariable("userId") Long userId,
			@RequestParam(required = true) Long treatmentId){
		patientService.setTreatment(userId, treatmentId);
		return patientService.findUserById(userId);
	}
	
	//remove medicine from patient treatment
	@PutMapping("/Patient/RemoveMedicine/{userId}")
	public boolean removeMedicineFromPatientTreatment(
			@PathVariable("userId") Long userId,
			@RequestParam(required = true) String medicine) {
		return patientService.removeMedicineFromPatientTreatment(userId, medicine);
	}

}

