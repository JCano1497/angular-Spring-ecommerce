package springbootecommerce.Spring.Boot.Ecommerce.Project.config;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

import java.util.List;
import java.util.Optional;

@NoRepositoryBean
public interface ReadOnlyRepository<T, ID> extends JpaRepository<T, ID> {
    Optional<T> findById(ID id);
    List<T> findAll();
    //extended out the JPA rep so user wouldn't be able to make non reading actions
}
