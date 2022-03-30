package CSCI334.GroupProject;

import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import CSCI334.GroupProject.Model.Doctor;
import CSCI334.GroupProject.Model.Patient;
import CSCI334.GroupProject.Model.Pharmacist;
import CSCI334.GroupProject.Service.DoctorService;
import CSCI334.GroupProject.Service.PatientService;
import CSCI334.GroupProject.Service.PharmacistService;

@Component
public class DatabaseLoader implements CommandLineRunner {
	//variables
	final org.slf4j.Logger log = LoggerFactory.getLogger(DatabaseLoader.class);
	
	DoctorService doctorService;
	PatientService patientService;
	PharmacistService pharmacistService;
	
	Doctor[] doctors;
	Patient[] patients;
	Pharmacist[] pharmacists;
	
	//constructor
	public DatabaseLoader(DoctorService doctorService, PatientService patientService, PharmacistService pharmacistService) {
		this.doctorService = doctorService;
		this.patientService = patientService;
		this.pharmacistService = pharmacistService;
	}
	
	@Override
	public void run(String... strings) throws Exception{
		//memory allocation
		doctors = new Doctor[3];
		patients = new Patient[3];
		pharmacists = new Pharmacist[3];

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
		
	}
	

	 
}
