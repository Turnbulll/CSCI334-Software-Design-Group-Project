package CSCI334.GroupProject.Service;

import java.util.List;
import java.util.Optional;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import CSCI334.GroupProject.Model.Patient;
import CSCI334.GroupProject.Model.Pharmacist;
import CSCI334.GroupProject.Repository.PharmacistRepository;

@Service
public class PharmacistService implements UserServiceInterface<Pharmacist> {
	private final PharmacistRepository pharmacistRepository;
	
	//sets the pharmacist repository
	@Autowired
	public PharmacistService(PharmacistRepository pharmacistRepository) {
		this.pharmacistRepository = pharmacistRepository;
	}
	
	//returns a list of all pharmacists
	@Override
	public List<Pharmacist> findAllUsers() {
		return pharmacistRepository.findAll();
	}
	
	//returns a single pharmacist
	@Override
	public Optional<Pharmacist> findUserById(Long userId) {
		if(validateUser(userId)) {
			return pharmacistRepository.findById(userId);
		}
		else {
			new IllegalStateException("pharmacist with id " + userId + " does not exist" );
			return null;
		}	
	}

	//adds a list of pharmacist
	@Override
	public void addNewUsers(Pharmacist[] pharmacists) {
		for (Pharmacist pharmacist : pharmacists) {
            addNewUser(pharmacist);
        }
	}
	
	//adds a single pharmacist
	@Override
	public void addNewUser(Pharmacist pharmacist) {
		pharmacistRepository.save(pharmacist);
	}

	//updates a pharmacist
	@Override
	@Transactional
	public void updateUser(Long userId, String name, String password, String userType) {
		Pharmacist pharmacist = pharmacistRepository.findById(userId)
	                .orElseThrow(()-> new IllegalStateException("pharmacist with id " + userId + " does not exist" ));
	        
	        if(name != null && pharmacist.getName().length() > 0 && !Objects.equals(pharmacist.getName(), name)){
	        	pharmacist.setName(name);
	        }
	        
	        if(password != null && password.length() > 0 && !Objects.equals(pharmacist.getPassword(), password)){
	        	pharmacist.setPassword(password);
	        }
	        
	        if(userType != null && userType.length() > 0 && !Objects.equals(pharmacist.getUserType(), userType)){
	        	pharmacist.setUserType(userType);
	        }
	        pharmacistRepository.save(pharmacist);
	}
	
	//returns true if a pharmacist is found
	@Override
	public boolean validateUser(Long userId) {
		return pharmacistRepository.findById(userId).isPresent(); 
	}
	
	//find by name
	public ResponseEntity<List<Pharmacist>> getUsersByName(String name) {
		return new ResponseEntity<List<Pharmacist>>(pharmacistRepository.findByName(name), HttpStatus.OK);
	}
	
	/*TODO
	+UpdatePresciption()
	+MonitorPatient()
	+AdvisePatient()
	 */

}
