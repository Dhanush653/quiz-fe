import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';
import QuizCard from './quizCard/quizCard';
import userService from '../../service/userService';
import { adminDashboardData } from '../Types/types';

const Dashboard = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  const isAdmin = userInfo.admin || false;
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [adminDashboardData, setAdminDashboardData] = useState<adminDashboardData>({
    noOfRooms: 0,
    noOfActiveRooms: 0,
    noOfInactiveRooms: 0,
    adminScreenDTOS: []
  });

  const filteredQuizzes = adminDashboardData.adminScreenDTOS.filter(q =>
    q.title.toLowerCase().includes(search.toLowerCase())
  );

  const fetchData = async () => {
    try {
      if(isAdmin) {
        const response = await userService.getAdminDashboard();
        if (response && response.status === 200) {
          const data = response.data;
          const now = new Date();
          const istOffset = 5.5 * 60 * 60 * 1000;
          const currentIST = new Date(now.getTime() + istOffset);

          const updatedQuizzes = data.adminScreenDTOS.map((quiz: any) => {
            const quizDeadline = new Date(quiz.deadLine);
            const isActive = quizDeadline > currentIST;

            return {
              ...quiz,
              active: isActive
            };
          });

          setAdminDashboardData({
            noOfRooms: data.noOfRooms,
            noOfActiveRooms: data.noOfActive,
            noOfInactiveRooms: data.noOfInActive,
            adminScreenDTOS: updatedQuizzes
          })
        }
      }
    } catch (error){
      console.error('Error fetching dashboard data:', error);
    }
  }

  useEffect(() => {
    fetchData();
  },[]);

  const handleCreateQuiz = () => {
    navigate('/create-quiz');
  }

  return (
    <div className="dashboard-container">
      {isAdmin && (
        <div className="summary-section">
          <div className="summary-box active-summary" data-label="Total Quizzes">
            <span className="summary-value">{adminDashboardData.noOfRooms}</span>
          </div>
          <div className="summary-box active-summary" data-label="Active Quizzes">
            <span className="summary-value">{adminDashboardData.noOfActiveRooms}</span>
          </div>
          <div className="summary-box inactive-summary" data-label="Inactive Quizzes">
            <span className="summary-value">{adminDashboardData.noOfInactiveRooms}</span>
          </div>
        </div>
      )}

      <div className="dashboard-actions">
        {isAdmin && <button className="create-button" onClick={handleCreateQuiz}>Create Quiz Room</button>}
        <div className="search-wrapper">
          <input
            className="search-bar"
            type="text"
            placeholder="Search quizzes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="quiz-list">
        {filteredQuizzes.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} isAdmin={isAdmin} />
        ))}
        {filteredQuizzes.length === 0 && (
            <p className="no-quizzes-message">No quizzes found matching your search.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;