package CSCI334.GroupProject.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import CSCI334.GroupProject.Model.Treatment;
import CSCI334.GroupProject.Service.TreatmentService;

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
	public String addNewTreatments(@RequestBody Treatment[] treatments) {
		treatmentService.addNewTreatments(treatments);
		return "New list of treatments added";
	}
	
	//post request to add a new treatment
	@PostMapping("/Treatment/New")
	public String addNewTreatment(@RequestBody Treatment treatment) {
		treatmentService.addNewTreatment(treatment);
		return treatment.toString() + " added \n";
	}

	//put request to update a treatment information
	@PutMapping("Treatment/{treatmentId}")
	public String updateTreatment(
		@PathVariable("treatmentId") Long treatmentId,
        @RequestParam(required = false) String description){
		treatmentService.updateTreatment(treatmentId, description);
			return treatmentService.findTreatmentById(treatmentId).toString() + " updated \n";
	}

	//get request that returns a true if a treatment is found
	@GetMapping("/Treatment/Valid/{treatmentId}")
	public boolean validateTreatment(@PathVariable("treatmentId") Long treatmentId) {
		return treatmentService.validateTreatment(treatmentId);
	}
}
