package springbootecommerce.Spring.Boot.Ecommerce.Project.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;
import springbootecommerce.Spring.Boot.Ecommerce.Project.config.ReadOnlyRepository;
import springbootecommerce.Spring.Boot.Ecommerce.Project.entity.Product;

@CrossOrigin("http://localhost:4200")// origin is protocol,hostname and port
public interface ProductRepository extends ReadOnlyRepository<Product,Long> {
    Page<Product> findByCategoryId(@RequestParam("id") long id, Pageable pageable);
    Page<Product> findByNameContaining(@RequestParam("name") String name, Pageable pageable);
}
