import React, { useState } from 'react';

export default function QuestionComponent({ question, onSubmit }) {
    const [userAnswer, setUserAnswer] = useState('');

    const handleChange = (e) => {
        setUserAnswer(e.target.value);
    };

    const handleSubmit = () => {
        // if (!userAnswer.trim()) {
        //     return;
        // }
        onSubmit(userAnswer);
        setUserAnswer('');
    };

    return (
        <div>
            <h2 className='question'>{question.question}</h2>
            {question.type === 'multiple-choice' && (
                <div>
                    {question.options.map((option, index) => (
                        <div key={index} className="answer">
                            <label>
                                <input 
                                    type="radio" 
                                    value={option} 
                                    checked={userAnswer === option}
                                    onChange={handleChange}
                                />
                                {option}
                            </label>
                        </div>
                    ))}
                </div>
            )}
            {question.type === 'true-false' && (
                <div>
                    <label>
                        <input 
                            type="radio" 
                            value="true" 
                            checked={userAnswer === 'true'} 
                            onChange={handleChange}
                        />
                        True
                    </label>
                    <label>
                        <input 
                            type="radio" 
                            value="false" 
                            checked={userAnswer === 'false'} 
                            onChange={handleChange}
                        />
                        False
                    </label>
                </div>
            )}
            {question.type === 'text-input' && (
                <>
                    <textarea 
                        value={userAnswer} 
                        onChange={handleChange} 
                        placeholder="Type your best guess..."
                        rows="4" 
                        cols="50"
                    />
                </>
            )}
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}
