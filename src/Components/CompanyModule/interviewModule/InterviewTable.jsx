import React from 'react'
import InterviewRow from './InterviewRow';
import Spinner from '../../CommonComp/Spinner';


const InterviewTable = ({loading, filteredInterviews, updateStatus}) => {
   
   
   

  return (
      <div className="card shadow">

        <div className="card-body p-0">

          {loading ? (
            <Spinner/>
          ) : (
            <table className="table table-hover mb-0">

              <thead className="table-light">

                <tr>
                  <th>ID</th>
                  <th>Job Role</th>
                  <th>Date</th>
                  <th>Mode</th>
                  <th>Round</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>

              </thead>

              <tbody>

                {filteredInterviews.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center p-4"
                    >
                      No interviews found.
                    </td>
                  </tr>
                ) : (
                  filteredInterviews.map((interview) => (
                    <InterviewRow interview={interview} updateStatus={updateStatus}/>
                  ))
                )}

              </tbody>

            </table>
          )}

        </div>

      </div>
  )
}

export default InterviewTable
