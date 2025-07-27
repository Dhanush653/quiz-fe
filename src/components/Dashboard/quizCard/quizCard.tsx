import React, {useEffect} from 'react';
import { formatDateTime } from '../../Utils/utils';
import './quizCard.css';

interface QuizCardProps {
  quiz: {
    id: number;
    title: string;
    description: string;
    duration: string;
    deadLine: string;
    numberOfQuestions: number;
    active: boolean;
  };
  isAdmin: boolean;
}

const QuizCard:React.FC<QuizCardProps> = ({quiz, isAdmin}) => {

  useEffect(() => {
    console.log(quiz);
  }, [quiz]);

  return (
    <div className={`quiz-card ${quiz.active ? 'active' : 'inactive'}`}>
      <div className="quiz-status">
        <span className={`status-indicator ${quiz.active ? 'active' : 'inactive'}`}></span>
        {quiz.active ? 'Active' : 'Inactive'}
      </div>
      <h3 className="quiz-title">{quiz.title}</h3>
      <p className="quiz-desc">{quiz.description}</p>
      <div className="quiz-info">
        <div className="info-item">
          <span className="info-icon">⏱️</span>
          <div className="info-content">
            <label>Duration</label>
            <strong>{quiz.duration}</strong>
          </div>
        </div>
        <div className="info-item">
          <span className="info-icon">📅</span>
          <div className="info-content">
            <label>Deadline</label>
            <strong>{formatDateTime(quiz.deadLine)}</strong>
          </div>
        </div>
        <div className="info-item">
          <span className="info-icon">❓</span>
          <div className="info-content">
            <label>Questions</label>
            <strong>{quiz.numberOfQuestions}</strong>
          </div>
        </div>
      </div>
      <button className={`card-btn ${isAdmin ? 'admin' : ''}`}>
        <span className="btn-icon">{isAdmin ? '📊' : '▶️'}</span>
        {isAdmin ? 'View Details' : 'Start Quiz'}
      </button>
    </div>
  );
};

export default QuizCard;