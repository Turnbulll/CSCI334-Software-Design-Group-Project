package CSCI334.GroupProject.Repository;

import CSCI334.GroupProject.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

//user repository
@Repository
public abstract interface UserRepository extends JpaRepository<User, Long> {
    
}