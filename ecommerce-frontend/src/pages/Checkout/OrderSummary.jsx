import dayjs from 'dayjs';

import { DeliveryOption } from './DeliveryOption';
import { CartItemDetails } from './CartItemDetails';

export function OrderSummary({ cart, deliveryOptions }) {
    return (
        <div className="order-summary">
            {deliveryOptions.length > 0 && cart.map((cartItem) => {
                const selectedDeliveryOption = deliveryOptions
                    .find((deliveryOption) => {
                        return deliveryOption.id === cartItem.deliveryOptionId;
                    })
                return (
                    <div key={cartItem.productId} className="cart-item-container">
                        <div className="delivery-date">
                            Delivery Date: {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                        </div>

                        <div className="cart-item-details-grid">
                            <CartItemDetails cartItem={cartItem}/>

                            <DeliveryOption deliveryOptions={deliveryOptions} cartItem={cartItem} />
                        </div>
                    </div>
                )
            })}

        </div>
    );
}