package CSCI334.GroupProject;

import java.util.ArrayList;

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
		doctors = new Doctor[3];
		patients = new Patient[3];
		pharmacists = new Pharmacist[3];
		treatments = new Treatment[3];
		prescriptions = new Prescription[3];

		log.info("Hiring doctors..");
		doctors[0] = new Doctor("Doctor1", "password", "Doctor");
		doctors[1] = new Doctor("Doctor2", "password", "Doctor");
		doctors[2] = new Doctor("Doctor3", "password", "Doctor");
		
		log.info("Adding doctors to the database...");	
		doctorService.addNewUsers(doctors);
		log.info("Finished adding doctors to the database");
		
		log.info("Patients are arriving..");
		patients[0] = new Patient("Patient1", "password", "Patient");
		patients[1] = new Patient("Patient2", "password", "Patient");
		patients[2] = new Patient("Patient3", "password", "Patient");
		
		log.info("Adding patients to the database...");
		patientService.addNewUsers(patients);
		log.info("Finished adding patients to the database");
		
		log.info("Hiring pharmacists..");
		pharmacists[0] = new Pharmacist("Pharmacist1", "password", "Pharmacist");
		pharmacists[1] = new Pharmacist("Pharmacist2", "password", "Pharmacist");
		pharmacists[2] = new Pharmacist("Pharmacist3", "password", "Pharmacist");
		
		log.info("Adding pharmacists to the database...");
		pharmacistService.addNewUsers(pharmacists);
		log.info("Finished adding pharmacists to the database");
		
		log.info("Treatments are being created...");
		treatments[0] = new Treatment(new ArrayList<String>(), new ArrayList<String>());
		treatments[1] = new Treatment(new ArrayList<String>(), new ArrayList<String>());
		treatments[2] = new Treatment(new ArrayList<String>(), new ArrayList<String>());
		
		log.info("Adding treatments to the database...");
		treatmentService.addNewTreatments(treatments);
		log.info("Finished adding treatments to the database");
		
		
		log.info("Prescriptions are being created...");
		prescriptions[0] = new Prescription("medicine1" , 1.0f, 3, treatments[0]);
		prescriptions[1] = new Prescription("medicine2" , 1.0f, 3, treatments[1]);
		prescriptions[2] = new Prescription("medicine3" , 1.0f, 3, treatments[2]);
		
		log.info("Adding prescriptions to the database...");
		prescriptionService.addNewPrescriptions(prescriptions);
		log.info("Finished adding prescriptions to the database");
		
		
	}
	

	 
}
