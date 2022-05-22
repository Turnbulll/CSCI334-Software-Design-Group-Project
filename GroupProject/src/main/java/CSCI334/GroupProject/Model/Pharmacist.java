package CSCI334.GroupProject.Model;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "PHARMACIST_TABLE")
public class Pharmacist extends User {	
	public Pharmacist() {};
	
	public Pharmacist(String name, String password, String userType, String email ) {
		super(name, password, userType, email);
	}

}
