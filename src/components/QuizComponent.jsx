import React, { useState, useEffect } from 'react';
import questionsData from '../json/questions.json';
import QuestionComponent from './QuestionComponent';
import EndScreen from './EndScreen';

const QuizComponent = () => {
    const [level, setLevel] = useState('easy');
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [completed, setCompleted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(20);

    const handleAnswerSubmit = (answer) => {
        if (questions[currentQuestion]) {
            const correct = questions[currentQuestion].correctAnswer.toLowerCase() === answer.toLowerCase();
            setFeedback(correct ? 'Great job! That’s the right answer!' : 'Not quite, but don’t give up!');
            setScore(score + (correct ? getPointsForLevel(level) : 0));
            
            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
                setTimeLeft(20); 
            } else {
                handleLevelCompletion();
            }
        }
    };

    const handleLevelCompletion = () => {
        if (level === 'hard') {
            setCompleted(true);
        } else {
            if (score >= 20) {
                setLevel(level === 'easy' ? 'medium' : 'hard');
                setCurrentQuestion(0);
                setFeedback('');
                setTimeLeft(20);
            } else {
                setCompleted(true);
            }
        }
    };

    const handleRestart = () => {
        setLevel('easy');
        setCurrentQuestion(0);
        setScore(0);
        setFeedback('');
        setCompleted(false);
        setTimeLeft(20);
    };

    const getPointsForLevel = (level) => {
        switch (level) {
            case 'easy': return 10;
            case 'medium': return 20;
            case 'hard': return 30;
            default: return 0;
        }
    };

    useEffect(() => {
        if (questionsData[level]) {
            setQuestions(questionsData[level]);
        }
    }, [level]);


    useEffect(() => {
        if (timeLeft > 0) {
            const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timerId);
        } else {
            handleAnswerSubmit(''); // Move to the next question automatically if time runs out
        }
    }, [timeLeft,handleAnswerSubmit]);
    
    return (
        <div className='quizComponent'>
            {!completed ? (
                <div>
                <div className="level">
                    <h1>Level: {level}</h1> 
                    <h2>Time: 00:00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</h2> 
                </div>
                    {questions.length > 0 && currentQuestion < questions.length ? (
                        <QuestionComponent 
                            question={questions[currentQuestion]} 
                            onSubmit={handleAnswerSubmit} 
                        />
                    ) : (
                        <p>Loading questions...</p>
                    )}
                    <p className='feedback'><span>{feedback && "Feedback:" }</span> {feedback}</p>
                </div>
            ) : (
                <EndScreen score={score} onRestart={handleRestart} />
            )}
        </div>
    );
};

export default QuizComponent;
