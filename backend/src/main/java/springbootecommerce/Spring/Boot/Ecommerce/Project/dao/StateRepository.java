package springbootecommerce.Spring.Boot.Ecommerce.Project.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;
import springbootecommerce.Spring.Boot.Ecommerce.Project.entity.State;

import java.util.List;

@CrossOrigin("http://localhost:4200")
public interface StateRepository extends JpaRepository<State, Integer> {
  List<State> findByCountryCode(@Param("code") String code);
}
