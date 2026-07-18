import { createContext, useContext, useEffect, useState } from "react";
import api from "../../utils/axios";


const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadStudent = async () => {
    try {
      const res = await api.get("/students/get");
    
      
      setStudent(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudent();
  }, []);

  const refreshStudent = async () => {
    await loadStudent();
  };

  return (
    <StudentContext.Provider
      value={{
        student,
        setStudent,
        refreshStudent,
        loading,
        setLoading
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => useContext(StudentContext);