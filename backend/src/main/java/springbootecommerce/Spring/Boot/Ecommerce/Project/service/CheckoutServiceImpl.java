package springbootecommerce.Spring.Boot.Ecommerce.Project.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import springbootecommerce.Spring.Boot.Ecommerce.Project.dao.CustomerRepository;
import springbootecommerce.Spring.Boot.Ecommerce.Project.dto.Purchase;
import springbootecommerce.Spring.Boot.Ecommerce.Project.dto.PurchaseResponse;
import springbootecommerce.Spring.Boot.Ecommerce.Project.entity.Customer;
import springbootecommerce.Spring.Boot.Ecommerce.Project.entity.Order;
import springbootecommerce.Spring.Boot.Ecommerce.Project.entity.OrderItem;

import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutServiceImpl implements CheckoutService{

  private CustomerRepository customerRepository;

  public CheckoutServiceImpl(CustomerRepository customerRepository){
    this.customerRepository = customerRepository;
  }
  @Override
  @Transactional
  public PurchaseResponse placeOrder(Purchase purchase) {

    Order order = purchase.getOrder();

    String orderTrackingNumber = generateOrderTrackingNumber();

    order.setOrderTrackingNumber(orderTrackingNumber);

    Set< OrderItem> orderItems = purchase.getOrderItems();
    orderItems.forEach(item -> order.add(item));

    order.setBillingAddress(purchase.getBillingAddress());

    order.setShippingAddress(purchase.getShippingAddress());

    Customer customer = purchase.getCustomer();

    customer.add(order);

    customerRepository.save(customer);
    return new PurchaseResponse(orderTrackingNumber);
  }

  private String generateOrderTrackingNumber() {
    return UUID.randomUUID().toString();
  }

}
