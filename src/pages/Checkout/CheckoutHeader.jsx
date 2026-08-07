import { NavLink } from 'react-router'
import './checkout-header.css'

export function CheckoutHeader() {
    return (
        <>
            <div className="checkout-header">
                <div className="header-content">
                    <div className="checkout-header-left-section">
                        <NavLink to="/">
                            <img className="logo" src="images/logo.png" />
                            <img className="mobile-logo" src="images/mobile-logo.png" />
                        </NavLink>
                    </div>

                    <div className="checkout-header-middle-section">
                        Checkout (<NavLink className="return-to-home-NavLink"
                            to="/">3 items</NavLink>)
                    </div>

                    <div className="checkout-header-right-section">
                        <img src="images/icons/checkout-lock-icon.png" />
                    </div>
                </div>
            </div>
        </>
    )
}