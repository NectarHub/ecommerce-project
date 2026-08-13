import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter,useLocation } from "react-router";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { PaymentSummary } from "./PaymentSummary";

vi.mock('axios');

describe('Payment summary component', () => {
    let paymentSummary;
    let loadCart;
    let user;

    beforeEach(() => {
        paymentSummary = {
            "totalItems": 6,
            "productCostCents": 8550,
            "shippingCostCents": 499,
            "totalCostBeforeTaxCents": 9049,
            "taxCents": 905,
            "totalCostCents": 9954
        };
        loadCart = vi.fn();
        user = userEvent.setup();
    })

    it('display the correct details', () => {
        render(
            <MemoryRouter>
                <PaymentSummary
                    paymentSummary={paymentSummary}
                    loadCart={loadCart}
                />
            </MemoryRouter>
        );

        expect(
            screen.getByText("Items (6):")
        ).toBeInTheDocument();

        expect(
            within(screen.getByTestId('payment-summary-product-cost'))
            .getByText('$85.50')
        ).toBeInTheDocument();

        expect(
            screen.getByTestId('payment-summary-shipping-cost')
        ).toHaveTextContent('$4.99');

        expect(
            screen.getByTestId('payment-summary-total-before-tax')
        ).toHaveTextContent('$90.49');

        expect(
            screen.getByTestId('payment-summary-tax')
        ).toHaveTextContent('$9.05');

        expect(
            screen.getByTestId('payment-summary-total')
        ).toHaveTextContent('$99.54');
    });

    it('place an order',async()=>{
        function Location(){
            const location = useLocation();
            return <div data-testid="url-path">{location.pathname}</div>
        }
        render(
            <MemoryRouter>
                <PaymentSummary
                paymentSummary={paymentSummary}
                loadCart={loadCart}
                />
                <Location />
            </MemoryRouter>
        );
        const placeOrderButton = screen.getByTestId('place-order-button');
        await user.click(placeOrderButton);

        expect(axios.post).toHaveBeenCalledWith('/api/orders');
        expect(loadCart).toHaveBeenCalled();
        expect(screen.getByTestId('url-path')).toHaveTextContent('/orders');
    })
})