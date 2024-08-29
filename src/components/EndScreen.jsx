import React from 'react';

export default function EndScreen({ score, onRestart }) {
    return (
        <div className="endScreenContainer">
            <h2 className="endScreenTitle">🎉 Quiz Completed!</h2>
            <p className="endScreenScore">Your final score is: <strong>{score}</strong></p>
            <button className="restartButton" onClick={onRestart}>Restart Quiz</button>
        </div>
    );
};
