import React, { useState } from 'react';

const QuickSubscribe: React.FC = () => {
    const [showField, setShowField] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [inputFocused, setInputFocused] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setShowField(false);
    };

    const handleButtonClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setShowField(true);
    };

    const handleInputFocus = (focused: boolean) => {
        setInputFocused(focused);
        alert('focused');   
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    return (
        <form className={`quick-subscribe ${submitted ? 'submitted' : ''}`}>
            <div className={`subscribe-field ${inputFocused ? 'focused' : ''}`}>
                <label htmlFor="subscribe-input">Enter your email</label>
                <input
                    type="email"
                    id="subscribe-input"
                    required
                    value={inputValue}
                    onFocus={() => handleInputFocus(true)}
                    onBlur={() => handleInputFocus(false)}
                    onChange={handleInputChange}
                />
            </div>
            <button className="subscribe-button" onClick={handleButtonClick}>
                Subscribe
            </button>
            <div className="subscribe-sent">Thank you</div>
            <button type="submit" className="subscribe-submit" onClick={handleFormSubmit}>
                Send
            </button>
        </form>
    );
};

export default QuickSubscribe;
