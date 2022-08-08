package springbootecommerce.Spring.Boot.Ecommerce.Project.dto;

import lombok.Data;
import springbootecommerce.Spring.Boot.Ecommerce.Project.entity.Address;
import springbootecommerce.Spring.Boot.Ecommerce.Project.entity.Customer;
import springbootecommerce.Spring.Boot.Ecommerce.Project.entity.Order;
import springbootecommerce.Spring.Boot.Ecommerce.Project.entity.OrderItem;

import java.util.Set;

@Data
public class Purchase {

  private Customer customer;

  private Address shippingAddress;

  private Address billingAddress;

  private Order order;

  private Set<OrderItem> orderItems;

}
