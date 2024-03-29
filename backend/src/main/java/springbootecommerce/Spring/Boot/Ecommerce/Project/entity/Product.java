package springbootecommerce.Spring.Boot.Ecommerce.Project.entity;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name="product")
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="sku")
    private String sku;

    @ManyToOne
    @JoinColumn(name ="category_id", nullable = false)
    private ProductCategory category;

    @Column(name="name")
    private String name;

    @Column(name="description")
    private String description;

    @Column(name="unit_price")
    private BigDecimal unitPrice;

    @Column(name="image_url")
    private String imageUrl;

    @Column(name="active")
    private boolean active;

    @Column(name="units_in_stock")
    private int unitsInStock;

    @Column(name="date_created")
    @CreationTimestamp //hibernate will automatically manage the timestamps
    private Date dateCreated;

    @Column(name="last_updated")
    @CreationTimestamp
    private Date lastUpdated;

}
