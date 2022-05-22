package CSCI334.GroupProject;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import CSCI334.GroupProject.Model.Doctor;

@SpringBootTest
class GroupProjectApplicationTests {

	@Test
	void contextLoads() {
		Doctor doctor = new Doctor("Steve", "123", "Doctor", "");
		System.out.println(doctor.toString());
	}

}
