package CSCI334.GroupProject.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import CSCI334.GroupProject.Model.Doctor;
import CSCI334.GroupProject.Model.Patient;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
	List<Patient> findByName(String name);
}
