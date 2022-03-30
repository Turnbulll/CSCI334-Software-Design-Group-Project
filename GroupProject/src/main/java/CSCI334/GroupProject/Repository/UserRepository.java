package CSCI334.GroupProject.Repository;

import CSCI334.GroupProject.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.stereotype.Repository;

//user repository
@NoRepositoryBean
public abstract interface UserRepository extends JpaRepository<User, Long> {
    
}