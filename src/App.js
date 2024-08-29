import React, { useState } from 'react';
import QuizComponent from './components/QuizComponent';
import './App.css';
import { FaBrain } from 'react-icons/fa';

const App = () => {
    const [started, setStarted] = useState(false);

    const handleStart = () => {
        setStarted(true);
    };

    return (
        <div>
            <header>
                <h1><FaBrain size={30} color="#4a90e2" /> Quiz-Game</h1>
            </header>
            {!started ? (
                <div className='container'>
                    <FaBrain size={60} color="#4a90e2" />
                    <h1>Welcome to the Quiz Game</h1>
                    <p>Test Your Knowledge and Have Fun!</p>
                    <p>Challenge yourself with multiple levels of questions. Can you beat the high score?</p>
                    <button onClick={handleStart}>Start Quiz</button>
                </div>
            ) : (
                <QuizComponent />
            )}
        </div>
    );
};

export default App;
