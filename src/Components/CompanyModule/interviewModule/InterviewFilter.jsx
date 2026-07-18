import React, { useMemo, useState } from 'react'
import InterviewTable from './InterviewTable';

const InterviewFilter = ({interviews, loading, updateStatus}) => {

      const [jobRoleFilter, setJobRoleFilter] = useState("");
        const [search, setSearch] = useState("");
      
    

     const jobRoles = useMemo(
    () => [...new Set(interviews.map((i) => i.jobRole))],
    [interviews]
  );

    const  filteredInterviews = interviews.filter((item) => {
    const roleMatch =
      jobRoleFilter === "" || item.jobRole === jobRoleFilter;

    const searchMatch =
      search === "" ||
      item.jobRole.toLowerCase().includes(search.toLowerCase());

    return roleMatch && searchMatch;
  });
  
  


  return (
    <>
   
      <div className="card shadow-sm mb-4">

        <div className="card-body">

          <div className="row g-3">

            <div className="col-md-4">

              <select
                className="form-select"
                value={jobRoleFilter}
                onChange={(e) =>
                  setJobRoleFilter(e.target.value)
                }
              >
                <option value="">All Job Roles</option>

                {jobRoles.map((role) => (
                  <option
                    key={role}
                    value={role}
                  >
                    {role}
                  </option>
                ))}
              </select>

            </div>

            <div className="col-md-4">

              <input
                className="form-control"
                placeholder="Search Job Role..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>

          </div>

        </div>

      </div>
     <InterviewTable loading={loading} filteredInterviews={filteredInterviews} updateStatus={updateStatus}/>
      </>
  )
}

export default InterviewFilter
