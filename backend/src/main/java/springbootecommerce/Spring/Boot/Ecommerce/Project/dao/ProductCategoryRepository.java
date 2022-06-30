package springbootecommerce.Spring.Boot.Ecommerce.Project.dao;

import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import springbootecommerce.Spring.Boot.Ecommerce.Project.config.ReadOnlyRepository;
import springbootecommerce.Spring.Boot.Ecommerce.Project.entity.ProductCategory;


@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "productCategory", path = "product-category")
public interface ProductCategoryRepository extends ReadOnlyRepository<ProductCategory,Long> {
}
