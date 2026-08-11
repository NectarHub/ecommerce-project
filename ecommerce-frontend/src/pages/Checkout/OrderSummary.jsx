
import { DeliveryOption } from './DeliveryOption';
import { CartItemDetails } from './CartItemDetails';
import { DeliveryDate } from './DeliveryDate';


export function OrderSummary({ cart, deliveryOptions, loadCart}) {
    return (
        <div className="order-summary">
            {deliveryOptions.length > 0 && cart.map((cartItem) => {
                const selectedDeliveryOption = deliveryOptions
                    .find((deliveryOption) => {
                        return deliveryOption.id === cartItem.deliveryOptionId;
                    })
                return (
                    <div key={cartItem.productId} className="cart-item-container">
                        
                        <DeliveryDate selectedDeliveryOption={selectedDeliveryOption}/>
                        <div className="cart-item-details-grid">
                            <CartItemDetails cartItem={cartItem} loadCart={loadCart}/>

                            <DeliveryOption deliveryOptions={deliveryOptions} cartItem={cartItem} loadCart={loadCart} />
                        </div>
                    </div>
                )
            })}

        </div>
    );
}