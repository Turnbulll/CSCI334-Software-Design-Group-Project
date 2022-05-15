package CSCI334.GroupProject.Service;

import java.util.List;
import java.util.Optional;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import CSCI334.GroupProject.Model.Doctor;
import CSCI334.GroupProject.Repository.DoctorRepository;

@Service
public class DoctorService implements UserServiceInterface<Doctor> {
	private final DoctorRepository doctorRepository;
	
	//sets the doctor repository
	@Autowired
	public DoctorService(DoctorRepository doctorRepository) {
		this.doctorRepository = doctorRepository;
	}
	
	//returns a list of all doctors
	@Override
	public List<Doctor> findAllUsers() {
		return doctorRepository.findAll();
	}
	
	//returns a single doctor
	@Override
	public Optional<Doctor> findUserById(Long userId) {
		if(validateUser(userId)) {
			return doctorRepository.findById(userId);
		}
		else {
			new IllegalStateException("doctor with id " + userId + " does not exist" );
			return null;
		}	
	}

	//adds a list of doctors
	@Override
	public void addNewUsers(Doctor[] doctors) {
		for (Doctor doctor : doctors) {
            addNewUser(doctor);
        }
	}
	
	//adds a single doctor
	@Override
	public void addNewUser(Doctor doctor) {
		doctorRepository.save(doctor);
	}

	//updates a doctor
	@Override
	@Transactional
	public void updateUser(Long userId, String name, String password, String userType) {
		 Doctor doctor = doctorRepository.findById(userId)
	                .orElseThrow(()-> new IllegalStateException("doctor with id " + userId + " does not exist" ));
	        
	        if(name != null && doctor.getName().length() > 0 && !Objects.equals(doctor.getName(), name)){
	            doctor.setName(name);
	        }
	        
	        if(password != null && password.length() > 0 && !Objects.equals(doctor.getPassword(), password)){
	            doctor.setPassword(password);
	        }
	        
	        if(userType != null && userType.length() > 0 && !Objects.equals(doctor.getUserType(), userType)){
	        	doctor.setUserType(userType);
	        }
	        doctorRepository.save(doctor);
	}
	
	//returns true if a doctor is found
	@Override
	public boolean validateUser(Long userId) {
		return doctorRepository.findById(userId).isPresent(); 
	}
	
	//find by name
	public ResponseEntity<List<Doctor>> getUsersByName(String name) {
		return new ResponseEntity<List<Doctor>>(doctorRepository.findByName(name), HttpStatus.OK);
	}

}
