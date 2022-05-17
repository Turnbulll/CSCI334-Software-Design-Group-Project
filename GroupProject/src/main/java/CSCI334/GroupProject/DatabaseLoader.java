package CSCI334.GroupProject;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

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

@Component
public class DatabaseLoader implements CommandLineRunner {
	//variables
	final org.slf4j.Logger log = LoggerFactory.getLogger(DatabaseLoader.class);
	
	DoctorService doctorService;
	PatientService patientService;
	PharmacistService pharmacistService;
	TreatmentService treatmentService;
	PrescriptionService prescriptionService;
	
	Doctor[] doctors;
	Patient[] patients;
	Pharmacist[] pharmacists;
	Treatment[] treatments;
	Prescription[] prescriptions;
	
	//constructor
	public DatabaseLoader(
			DoctorService doctorService, PatientService patientService, 
			PharmacistService pharmacistService, TreatmentService treatmentService,
			PrescriptionService prescriptionService) {
		this.doctorService = doctorService;
		this.patientService = patientService;
		this.pharmacistService = pharmacistService;
		this.treatmentService = treatmentService;
		this.prescriptionService = prescriptionService;
	}
	
	@Override
	public void run(String... strings) throws Exception{
		//memory allocation
		int noOfRecords = 100;
		doctors = new Doctor[noOfRecords];
		patients = new Patient[noOfRecords];
		pharmacists = new Pharmacist[noOfRecords];
		treatments = new Treatment[noOfRecords];
		prescriptions = new Prescription[noOfRecords];

		ArrayList<String> allergies = new ArrayList<String>();
		ArrayList<String> reactions = new ArrayList<String>();
		ArrayList<String> medicines = new ArrayList<String>();
		
		log.info("Treatments are being created...");

		for(int i = 0; i<noOfRecords; i++) {
			treatments[i] = new Treatment(allergies, reactions, medicines, "");
		}
		log.info("Adding treatments to the database...");
		treatmentService.addNewTreatments(treatments);
		log.info("Finished adding treatments to the database");
		
		log.info("Prescriptions are being created...");
		for(int i = 0; i<noOfRecords; i++) {
			prescriptions[i] = new Prescription("medicine" + i , 1.0f, 3);
		}
		log.info("Adding prescriptions to the database...");
		prescriptionService.addNewPrescriptions(prescriptions);
		log.info("Finished adding prescriptions to the database");
		
		List<Prescription> emptyPrescriptions = new ArrayList<Prescription>();
		log.info("Patients are arriving..");
		for(int i = 0; i<noOfRecords; i++) {
			patients[i] = new Patient("Patient"+ i, "password", "Patient", treatments[i], emptyPrescriptions);
		}
		log.info("Adding patients to the database...");
		patientService.addNewUsers(patients);
		log.info("Finished adding patients to the database");
		
		log.info("Hiring doctors..");
		for(int i = 0; i<noOfRecords; i++) {
			doctors[i] = new Doctor("Doctor"+i, "password", "Doctor");
		}
		log.info("Adding doctors to the database...");	
		doctorService.addNewUsers(doctors);
		log.info("Finished adding doctors to the database");
		
		log.info("Hiring pharmacists..");
		for(int i = 0; i<noOfRecords; i++) {
			pharmacists[i] = new Pharmacist("Pharmacist"+i, "password", "Pharmacist");
		}
		log.info("Adding pharmacists to the database...");
		pharmacistService.addNewUsers(pharmacists);
		log.info("Finished adding pharmacists to the database");	
	}
	

	 
}
