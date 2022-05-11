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
import CSCI334.GroupProject.Service.DoctorService;

@CrossOrigin("*")//had to ass this to get frontend communication working. there's deffo a better way to do it. If you work it out lemme know
@RestController
public class DoctorController implements UserControllerInterface<Doctor> {
	private final DoctorService doctorService;
	
	//sets the doctor service
	DoctorController(DoctorService doctorService){
		this.doctorService = doctorService;
	}
	
	//get request to return a list of users
	@Override
	@GetMapping("/Doctor")
	public List<Doctor> getUsers() {
		return doctorService.findAllUsers();
	}

	//get request that returns a single doctor via id
	@Override
	@GetMapping("/Doctor/{userId}")
	public Optional<Doctor> getUser(@PathVariable("userId") Long userId) {
		return doctorService.findUserById(userId);
	}
	
	//post request to add a list of new doctors
	@Override
	@PostMapping("/Doctors/New")
	public Doctor[] newUsers(@RequestBody Doctor[] doctors) {
		doctorService.addNewUsers(doctors);
		return doctors;
	}
	
	//post request to add a new doctor
	@Override
	@PostMapping("/Doctor/New")
	public Doctor newUser(@RequestBody Doctor doctor) {
		doctorService.addNewUser(doctor);
		return doctor;
	}

	//put request to update a doctors information
	@Override
	@PutMapping("Doctor/{userId}")
	public Optional<Doctor> updateUser(
		@PathVariable("userId") Long userId,
        @RequestParam(required = false) String name,
        @RequestParam(required = false) String password,
        @RequestParam(required = false) String userType){
			doctorService.updateUser(userId, name, password, userType);
			return doctorService.findUserById(userId);
		}

	//get request that returns a true if a doctor is found
	@Override
	@GetMapping("/Doctor/Valid/{userId}")
	public boolean validateUser(@PathVariable("userId") Long userId) {
		return doctorService.validateUser(userId);
	}
	
	//find by name
	@GetMapping("/Doctor/Name")
	public ResponseEntity<List<Doctor>> getUsersByName(@RequestParam String name) {
		return doctorService.getUsersByName(name);
	}


}
