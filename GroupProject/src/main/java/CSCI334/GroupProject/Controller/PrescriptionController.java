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

import CSCI334.GroupProject.Model.Prescription;
import CSCI334.GroupProject.Service.PrescriptionService;
import CSCI334.GroupProject.Service.TreatmentService;

@CrossOrigin("*")//had to ass this to get frontend communication working. there's deffo a better way to do it. If you work it out lemme know
@RestController
public class PrescriptionController {
	PrescriptionService prescriptionService;
	
	//sets the prescription service
	@Autowired
	public PrescriptionController(PrescriptionService prescriptionService) {
		this.prescriptionService = prescriptionService;
	}
	
	//get request to return a list of prescriptions
	@GetMapping("/Prescription")
	public List<Prescription> findAllprescriptions() {
		return prescriptionService.findAllPrescriptions();
	}

	//get request that returns a single prescription via id
	@GetMapping("/Prescription/{prescriptionId}")
	public Optional<Prescription> findPrescriptionById(@PathVariable("prescriptionId") Long prescriptionId) {
		return prescriptionService.findPrescriptionById(prescriptionId);
	}
	
	//post request to add a list of new prescription
	@PostMapping("/Prescriptions/New")
	public Prescription[] addNewPrescriptions(@RequestBody Prescription[] prescriptions) {
		prescriptionService.addNewPrescriptions(prescriptions);
		return prescriptions;
	}
	
	//post request to add a new prescription
	@PostMapping("/Prescription/New")
	public Prescription addNewPrescription(@RequestBody Prescription prescription) {
		prescriptionService.addNewPrescription(prescription);
		return prescription;
	}

	//put request to update a prescription information
	@PutMapping("Prescription/{prescriptionId}")
	public Optional<Prescription> updatePrescripton(
		@PathVariable("prescriptionId") Long prescriptionId,
        @RequestParam(required = false) String medicine,
        @RequestParam(required = false) Float dosage){
		prescriptionService.updatePrescription(prescriptionId, medicine, dosage);
			return prescriptionService.findPrescriptionById(prescriptionId);
	}

	//get request that returns a true if a prescription is found
	@GetMapping("/Prescription/Valid/{prescriptionId}")
	public boolean validatePrescription(@PathVariable("prescriptionId") Long prescriptionId) {
		return prescriptionService.validatePrescription(prescriptionId);
	}
	
	/*
	//CURRENTLY BROKEN
	//put request to update a prescriptions treatment
	@PutMapping("/Prescription/{prescriptionId}/Treatment/{treatmentId}")
	public Prescription updatePrescriptionTreatment(
					@PathVariable("prescriptionId") Long prescriptionId, 
					@PathVariable("treatmentId") Long treatmentId) {
		return prescriptionService.updatePrescriptionTreatment(prescriptionId, treatmentId);
	}
	*/
}
