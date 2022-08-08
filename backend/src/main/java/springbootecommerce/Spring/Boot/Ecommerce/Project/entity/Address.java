package springbootecommerce.Spring.Boot.Ecommerce.Project.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name="address")
public class Address {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name="id")
  private Long id;

  @Column(name="street")
  private String street;

  @Column(name="city")
  private String city;

  @Column(name="country")
  private String country;

  @Column(name="zip_code")
  private String zipcode;


  @OneToOne
  @PrimaryKeyJoinColumn
  private Order order;


}
