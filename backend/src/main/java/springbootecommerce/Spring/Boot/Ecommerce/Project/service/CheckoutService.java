package springbootecommerce.Spring.Boot.Ecommerce.Project.service;

import springbootecommerce.Spring.Boot.Ecommerce.Project.dto.Purchase;
import springbootecommerce.Spring.Boot.Ecommerce.Project.dto.PurchaseResponse;

public interface CheckoutService {

  PurchaseResponse placeOrder(Purchase purchase);

}
