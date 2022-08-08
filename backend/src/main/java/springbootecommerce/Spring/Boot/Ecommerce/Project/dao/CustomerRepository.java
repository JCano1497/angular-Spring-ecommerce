package springbootecommerce.Spring.Boot.Ecommerce.Project.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import springbootecommerce.Spring.Boot.Ecommerce.Project.entity.Customer;

public interface CustomerRepository  extends JpaRepository<Customer, Long> {


}
