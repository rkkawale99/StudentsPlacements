import React from 'react'
import { useNavigate } from 'react-router-dom';

const InterviewRow = ({interview, updateStatus}) => {

     
     const startInterview = (interview) => {
    if (!interview.meetingLink) {
      alert("Meeting link is not available.");
      return;
    }
      window.location.href = interview.meetingLink;
  };

  

    const badge = {
    SCHEDULED: "bg-primary",
    COMPLETED: "bg-success",
    CANCELLED: "bg-danger",
    RESCHEDULED: "bg-warning text-dark",
  };
    
  return (
        <tr key={interview.id}>

                      <td>{interview.id}</td>

                      <td>{interview.jobRole}</td>

                      <td>{interview.interviewDate}</td>

                      <td>{interview.mode}</td>

                      <td>{interview.round || "-"}</td>

                      <td>
                        <span
                          className={`badge ${badge[interview.status]}`}
                        >
                          {interview.status}
                        </span>
                      </td>

                      <td>

                        <div className="d-flex gap-2">

                          <button
                            className="btn btn-info btn-sm"
                            disabled={!interview.meetingLink}
                            onClick={() =>
                              startInterview(interview)
                            }
                          >
                            Start Now
                          </button>

                          <select
                            className="form-select form-select-sm"
                            value={interview.status}
                            onChange={(e) =>
                              updateStatus(
                                interview,
                                e.target.value
                              )
                            }
                          >
                            <option value="SCHEDULED" className='hover-bg-primary'>
                              SCHEDULED
                            </option>

                            <option value="COMPLETED">
                              COMPLETED
                            </option>

                            <option value="CANCELLED">
                              CANCELLED
                            </option>

                            <option value="RESCHEDULED">
                              RESCHEDULED
                            </option>

                          </select>

                        </div>

                      </td>

                    </tr>
  )
}

export default InterviewRow
