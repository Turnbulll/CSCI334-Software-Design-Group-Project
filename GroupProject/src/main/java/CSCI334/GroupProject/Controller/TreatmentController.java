package CSCI334.GroupProject.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import CSCI334.GroupProject.Model.Treatment;
import CSCI334.GroupProject.Service.TreatmentService;


@CrossOrigin("*")//had to ass this to get frontend communication working. there's deffo a better way to do it. If you work it out lemme know
@RestController
public class TreatmentController {
	TreatmentService treatmentService;
	
	//sets the treatment service
	@Autowired
	public TreatmentController(TreatmentService treatmentService) {
		this.treatmentService = treatmentService;
	}
	
	//get request to return a list of treatment
	@GetMapping("/Treatment")
	public List<Treatment> findAllTreatments() {
		return treatmentService.findAllTreatments();
	}

	//get request that returns a single treatment via id
	@GetMapping("/Treatment/{treatmentId}")
	public Optional<Treatment> findTreatmentById(@PathVariable("treatmentId") Long treatmentId) {
		return treatmentService.findTreatmentById(treatmentId);
	}
	
	//post request to add a list of new treatment
	@PostMapping("/Treatments/New")
	public Treatment[] addNewTreatments(@RequestBody Treatment[] treatments) {
		treatmentService.addNewTreatments(treatments);
		return treatments;
	}
	
	//post request to add a new treatment
	@PostMapping("/Treatment/New")
	public Treatment addNewTreatment(@RequestBody Treatment treatment) {
		treatmentService.addNewTreatment(treatment);
		return treatment;
	}

	//get request that returns a true if a treatment is found
	@GetMapping("/Treatment/Valid/{treatmentId}")
	public boolean validateTreatment(@PathVariable("treatmentId") Long treatmentId) {
		return treatmentService.validateTreatment(treatmentId);
	}
	
	//add an allergy
	@PutMapping("/Treatment/Allergy")
	public String addAllergy(@RequestParam(required = true) Long treatmentId, @RequestParam(required = true) String allergy) {
		return treatmentService.addAllergy(treatmentId, allergy);
	}
	
	//add a reaction
	@PutMapping("/Treatment/Reaction")
	public String addReaction(@RequestParam(required = true) Long treatmentId, @RequestParam(required = true) String reaction) {
		return treatmentService.addReaction(treatmentId, reaction);
	}
	
	//add a physical condition
	@PutMapping("/Treatment/PhysicalCondition")
	public String addPhysicalCondition(@RequestParam(required = true) Long treatmentId, @RequestParam(required = true) String physicalCondition) {
		return treatmentService.addPhysicalCondition(treatmentId, physicalCondition);
	}
}
