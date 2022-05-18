package CSCI334.GroupProject.Controller;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import CSCI334.GroupProject.DatabaseLoader;
import CSCI334.GroupProject.Model.Doctor;
import CSCI334.GroupProject.Model.Patient;
import CSCI334.GroupProject.Model.Pharmacist;
import CSCI334.GroupProject.Model.Prescription;
import CSCI334.GroupProject.Model.Treatment;
import CSCI334.GroupProject.Service.DoctorService;
import CSCI334.GroupProject.Service.PatientService;
import CSCI334.GroupProject.Service.PharmacistService;
import CSCI334.GroupProject.Service.PrescriptionService;
import CSCI334.GroupProject.Service.TreatmentService;

@CrossOrigin("*")//had to ass this to get frontend communication working. there's deffo a better way to do it. If you work it out lemme know
@RestController
public class ReportController {
final org.slf4j.Logger log = LoggerFactory.getLogger(DatabaseLoader.class);
	
	DoctorService doctorService;
	PatientService patientService;
	PharmacistService pharmacistService;
	TreatmentService treatmentService;
	PrescriptionService prescriptionService;
	
	//sets the services
	@Autowired
	public ReportController(
			DoctorService doctorService, PatientService patientService, 
			PharmacistService pharmacistService, TreatmentService treatmentService,
			PrescriptionService prescriptionService) {
		this.doctorService = doctorService;
		this.patientService = patientService;
		this.pharmacistService = pharmacistService;
		this.treatmentService = treatmentService;
		this.prescriptionService = prescriptionService;
	}
	
	@GetMapping("/Report/Doctor")
	public String doctorReport() {
		return "There is " + doctorService.report().toString() + " Doctors currently in the database";
	}
	
	@GetMapping("/Report/Patient")
	public String patientReport() {
		return "There is " + patientService.report().toString() + " Patients currently in the database";
	}
	
	@GetMapping("/Report/Pharmacist")
	public String pharmacistReport() {
		return "There is " + pharmacistService.report().toString() + " Pharmacists currently in the database";
	}
	
	@GetMapping("/Report/Treatment")
	public String treatmentReport() {
		return "There is " + treatmentService.report().toString() + " Treatments currently in the database";
	}
	
	@GetMapping("/Report/Prescription")
	public String prescriptionReport() {
		return "There is " +  prescriptionService.report().toString() + " Prescriptions currently in the database";
	}
	
	
}
