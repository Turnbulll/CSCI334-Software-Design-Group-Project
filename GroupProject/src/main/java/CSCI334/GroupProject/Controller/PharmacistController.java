package CSCI334.GroupProject.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import CSCI334.GroupProject.Model.Patient;
import CSCI334.GroupProject.Model.Pharmacist;
import CSCI334.GroupProject.Service.PharmacistService;

@CrossOrigin("*")//had to ass this to get frontend communication working. there's deffo a better way to do it. If you work it out lemme know
@RestController
public class PharmacistController implements UserControllerInterface<Pharmacist> {
	private final PharmacistService pharmacistService;
	
	//sets the pharmacist service
	PharmacistController(PharmacistService pharmacistService){
		this.pharmacistService = pharmacistService;
	}
	
	//get request to return a list of pharmacists
	@Override
	@GetMapping("/Pharmacist")
	public List<Pharmacist> getUsers() {
		return pharmacistService.findAllUsers();
	}

	//get request that returns a single pharmacist via id
	@Override
	@GetMapping("/Pharmacist/{userId}")
	public Optional<Pharmacist> getUser(@PathVariable("userId") Long userId) {
		return pharmacistService.findUserById(userId);
	}
	
	//post request to add a list of new pharmacists
	@Override
	@PostMapping("/Pharmacists/New")
	public Pharmacist[] newUsers(@RequestBody Pharmacist[] pharmacists) {
		pharmacistService.addNewUsers(pharmacists);
		return pharmacists;
	}
	
	//post request to add a new pharmacist
	@Override
	@PostMapping("/Pharmacist/New")
	public Pharmacist newUser(@RequestBody Pharmacist pharmacist) {
		pharmacistService.addNewUser(pharmacist);
		return pharmacist;
	}

	//put request to update a pharmacists information
	@Override
	@PutMapping("Pharmacist/{userId}")
	public Optional<Pharmacist> updateUser(
		@PathVariable("userId") Long userId,
        @RequestParam(required = false) String name,
        @RequestParam(required = false) String password,
        @RequestParam(required = false) String userType){
			pharmacistService.updateUser(userId, name, password, userType);
			return pharmacistService.findUserById(userId);
		}

	//get request that returns a true if a pharmacist is found
	@Override
	@GetMapping("/Pharmacist/Valid/{userId}")
	public boolean validateUser(@PathVariable("userId") Long userId) {
		return pharmacistService.validateUser(userId);
	}
	
	//find by name
	@GetMapping("/Pharmacist/Name")
	public ResponseEntity<List<Pharmacist>> getUsersByName(@RequestParam String name) {
		return pharmacistService.getUsersByName(name);
	}
	
	/*TODO
	+UpdatePresciption()
	+MonitorPatient()
	+AdvisePatient()
	 */


}


