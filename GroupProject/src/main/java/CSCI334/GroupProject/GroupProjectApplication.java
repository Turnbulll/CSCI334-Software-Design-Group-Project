package CSCI334.GroupProject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import CSCI334.GroupProject.Model.Doctor;

@SpringBootApplication
public class GroupProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(GroupProjectApplication.class, args);
		Doctor doctor = new Doctor("Steve", "123", "Doctor");
		System.out.println(doctor.toString());
	}

}
