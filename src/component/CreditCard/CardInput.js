import React, { useState } from 'react';
import CreditCardInput from 'react-credit-card-input';

function CreditCardForm() {
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('');

    return (
        <div style={{width:'70%'}}>
            <CreditCardInput
                // cardNumberInputProps={{ value: cardNumber, onChange: this.handleCardNumberChange }}
                // cardExpiryInputProps={{ value: expiry, onChange: this.handleCardExpiryChange }}
                // cardCVCInputProps={{ value: cvc, onChange: this.handleCardCVCChange }}
                fieldClassName="input"
                
            />
        </div>
    );
}

export default CreditCardForm;
