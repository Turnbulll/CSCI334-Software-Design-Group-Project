package CSCI334.GroupProject.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import CSCI334.GroupProject.Model.Patient;
import CSCI334.GroupProject.Service.PatientService;

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
	public String newUsers(@RequestBody Patient[] patients) {
		patientService.addNewUsers(patients);
		return "New list of patients added";
	}
	
	//post request to add a new patient
	@Override
	@PostMapping("/Patient/New")
	public String newUser(@RequestBody Patient patient) {
		patientService.addNewUser(patient);
		return patient.toString() + " added \n";
	}

	//put request to update a patients information
	@Override
	@PutMapping("Patient/{userId}")
	public String updateUser(
		@PathVariable("userId") Long userId,
        @RequestParam(required = false) String name,
        @RequestParam(required = false) String password,
        @RequestParam(required = false) String userType){
			patientService.updateUser(userId, name, password, userType);
			return patientService.findUserById(userId).toString() + " updated \n";
		}

	//get request that returns a true if a patient is found
	@Override
	@GetMapping("/Patient/Valid/{userId}")
	public boolean validateUser(@PathVariable("userId") Long userId) {
		return patientService.validateUser(userId);
	}
	
	/*TODO
	+ViewPrescriptions()
	+InputMedication()
	+InputReaction()
	 */


}

