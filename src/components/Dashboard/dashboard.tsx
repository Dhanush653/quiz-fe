import React from 'react'

const Dashboard = () => {
  const isAdmin = JSON.parse(localStorage.getItem('userInfo') || '{}').admin;
  return (
    <div>
      {isAdmin ? (
        <h1>Welcome Admin</h1>
      ) : (
        <h1>Welcome User</h1>
      )}
    </div>
  )
}

export default Dashboard;