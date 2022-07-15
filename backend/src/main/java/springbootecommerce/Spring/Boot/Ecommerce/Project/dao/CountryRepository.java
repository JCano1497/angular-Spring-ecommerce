package springbootecommerce.Spring.Boot.Ecommerce.Project.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;
import springbootecommerce.Spring.Boot.Ecommerce.Project.entity.Country;

@RepositoryRestResource(collectionResourceRel = "countries", path="countries")
@CrossOrigin("http://localhost:4200")
public interface CountryRepository extends JpaRepository<Country, Integer> {
}
