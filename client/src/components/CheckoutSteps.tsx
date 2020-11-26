import React from 'react'

export interface checkoutStepPropsType {
    step: {
        step1: boolean,
        step2: boolean,
        step3: boolean,
        step4: boolean
    }
}

export const CheckoutSteps: React.FC<checkoutStepPropsType> = ({ step }) => {
    return (
        <div className="row checkout-steps">
            <div className={step.step1 ? 'active' : ''}>Sign-In</div>
            <div className={step.step2 ? 'active' : ''}>Shipping</div>
            <div className={step.step3 ? 'active' : ''}>Payment</div>
            <div className={step.step4 ? 'active' : ''}>Place Order</div>
        </div>
    )
}
