import React from 'react'

const InterviewStats = ({interviews}) => {
    
  const stats = {
    scheduled: interviews.filter(
      (i) => i.status === "SCHEDULED"
    ).length,

    completed: interviews.filter(
      (i) => i.status === "COMPLETED"
    ).length,

    cancelled: interviews.filter(
      (i) => i.status === "CANCELLED"
    ).length,

    rescheduled: interviews.filter(
      (i) => i.status === "RESCHEDULED"
    ).length,
  };
  return (
   
      <div className="row g-3 mb-4">

        <div className="col-md-3">
          <div className="card shadow-sm border-0 text-center">
            <div className="card-body">
              <h6>Scheduled</h6>
              <h2>{stats.scheduled}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-0 text-center">
            <div className="card-body">
              <h6>Completed</h6>
              <h2>{stats.completed}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-0 text-center">
            <div className="card-body">
              <h6>Cancelled</h6>
              <h2>{stats.cancelled}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-0 text-center">
            <div className="card-body">
              <h6>Rescheduled</h6>
              <h2>{stats.rescheduled}</h2>
            </div>
          </div>
        </div>

      </div>
  )
}

export default InterviewStats
