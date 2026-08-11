import axios from 'axios';
import { formatMoney } from '../../utils/money';
import { useState } from 'react';

export function CartItemDetails({ cartItem, loadCart }) {
    const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);
    const [quantity, setQuantity] = useState(cartItem.quantity);

    const deleteCartItems = async () => {
        await axios.delete(`/api/cart-items/${cartItem.productId}`);
        await loadCart();
    }

    const updateQuantityInput = (e) => {
        setQuantity(e.target.value);
    }

    const updateQuantity = async () => {
        if (isUpdatingQuantity) {
            await axios.put(`/api/cart-items/${cartItem.productId}`,
                { quantity: Number(quantity) }
            )
            await loadCart();
            setIsUpdatingQuantity(false);
        }
        else {
            setIsUpdatingQuantity(true)
        }
    }

    const handleQuantityKeyDown = (e) =>{
        const keyPressed = e.key;

        if(keyPressed === 'Enter'){
            updateQuantity();
        }
        else if(keyPressed === 'Escape'){
            setQuantity(cartItem.quantity);
            setIsUpdatingQuantity(false);
        }
    }

    return (
        <>
            <img className="product-image"
                src={cartItem.product.image} />

            <div className="cart-item-details">
                <div className="product-name">
                    {cartItem.product.name}
                </div>
                <div className="product-price">
                    {formatMoney(cartItem.product.priceCents)}
                </div>
                <div className="product-quantity">
                    <span>
                        Quantity: {isUpdatingQuantity
                            ? <input type="text" className='quantity-textbox'
                                value={quantity}
                                onChange={updateQuantityInput}
                                onKeyDown={handleQuantityKeyDown}
                                />
                            : <span className="quantity-label">{cartItem.quantity}</span>
                        }


                    </span>
                    <span className="update-quantity-link link-primary"
                        onClick={updateQuantity}
                    >
                        Update
                    </span>
                    <span className="delete-quantity-link link-primary"
                        onClick={deleteCartItems}>
                        Delete
                    </span>
                </div>
            </div>
        </>
    )
}