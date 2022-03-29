package CSCI334.GroupProject.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import CSCI334.GroupProject.Model.Prescription;

@Repository
public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {

}
