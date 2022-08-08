package springbootecommerce.Spring.Boot.Ecommerce.Project.controller;


import org.springframework.web.bind.annotation.*;
import springbootecommerce.Spring.Boot.Ecommerce.Project.dto.Purchase;
import springbootecommerce.Spring.Boot.Ecommerce.Project.dto.PurchaseResponse;
import springbootecommerce.Spring.Boot.Ecommerce.Project.service.CheckoutService;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {
  private CheckoutService checkoutService;

  public CheckoutController(CheckoutService checkoutService){
    this.checkoutService = checkoutService;
  }

  @PostMapping("/purchase")
  public PurchaseResponse placeOrder(@RequestBody Purchase purchase){
    PurchaseResponse purchaseResponse = checkoutService.placeOrder(purchase);
    return purchaseResponse;
  }
}
