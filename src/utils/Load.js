import api from "./axios";

const getToken = () => localStorage.getItem("token");

export const loadStudent = async (
  setStudent,
  initialStudent,
  setshow,
  setError,
  navigate
) => {
  try {
    const response = await api.get("/students/get", {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });

    const data = response.data.data;

    setStudent({
      ...initialStudent,
      ...data,

      firstName: data.firstName?.trim() || "",
      lastName: data.lastName?.trim() || "",
      prn: data.prn?.trim() || "",
      rollNo: data.rollNo?.trim() || "",
      gender: data.gender?.trim() || "",
      dob: data.dob || "",
      phone: data.phone?.trim() || "",
      email: data.email?.trim() || "",
      address: data.address?.trim() || "",

      department: {
        ...initialStudent.department,
        ...(data.department || {})
      },

      academics: {
        ...initialStudent.academics,
        ...(data.academics || {})
      },

      projects:
        data.projects?.length > 0
          ? data.projects.map(project => ({
              ...project,
              title: project.title?.trim() || "",
              des: project.des?.trim() || "",
              githubUrl: project.githubUrl?.trim() || ""
            }))
          : initialStudent.projects,

      certifications:
        data.certifications?.length > 0
          ? data.certifications.map(cert => ({
              ...cert,
              name: cert.name?.trim() || "",
              issuer: cert.issuer?.trim() || ""
            }))
          : initialStudent.certifications,

      skills:
        data.skills?.length > 0
          ? data.skills.map(skill => ({
              ...skill,
              skillName: skill.skillName?.trim() || ""
            }))
          : []
    });
  } catch (error) {
    setshow(true);

    console.log("Error loading student:", error.response?.status);

    setError({
      title: "Profile Fetched Error",
      msg:
        error.response?.status !== 403
          ? error.response?.data?.message
          : "UnAuthorized User"
    });

    setTimeout(() => {
      setshow(false);
      navigate("/login");
    }, 2000);
  }
};

export const removeSkill = async (
  skillId,
  setShow,
  setError,
  setStudent
) => {
  try {
    await api.delete(`/student-skills/remove/${skillId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });

    setStudent(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== skillId)
    }));
  } catch (error) {
    setShow(true);

    setError({
      title: "Remove Skill",
      msg: error.response?.data?.message || "Unable to remove skill"
    });

    setTimeout(() => {
      setShow(false);
    }, 2000);
  }
};

export const loadSkills = async (setAllSkills) => {
  try {
    const response = await api.get("/skills");

    const skills = response.data.data.map(skill => ({
      value: skill.id,
      label: skill.skillName.trim()
    }));

    setAllSkills(skills);
  } catch (error) {
    console.log(error);
  }
};

export const assignSkill = async (
  skillName,
  setshow,
  setError,
  setStudent
) => {
  try {
    const res = await api.post(
      `/student-skills/assign?name=${encodeURIComponent(skillName)}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }
    );

    setStudent(prev => {
      const exists = prev.skills.some(
        skill => skill.id === res.data.data.id
      );

      if (exists) return prev;

      return {
        ...prev,
        skills: [...prev.skills, res.data.data]
      };
    });
  } catch (error) {
    setshow(true);

    setError({
      title: "Skill Assigned Status",
      msg: error.response?.data?.message || ""
    });

    setTimeout(() => {
      setshow(false);
    }, 2000);
  }
};

export const loadDepartments = async (setDepartments, setPassingYears) => {
  try {
    const response = await api.get("/departments");

    setDepartments(response.data.data || []);
     const currentYear = new Date().getFullYear();

        const years = Array.from({ length: 5 }, (_, i) => currentYear + i);

        setPassingYears(years);
  } catch (err) {
    console.error(err);
  }
};

export const saveStudent = async (
  student,
  setShow,
  setError,
  setStudent
) => {
  const studentData = convertEmptyToNull(student);

  setStudent(studentData);

  console.log(studentData);
  
  
  try {
    const response = await api.post("/students/create",studentData);
    console.log(response);
    

    setShow(true);
    setError({
      title: "Success",
      msg: response.data.message || "Profile updated successfully."
    });

    setTimeout(() => {
      setShow(false);
    }, 2000);

    return response.data;
  } catch (error) {
    setShow(true);

    setError({
      title: "Update Failed",
      msg: error.response?.data?.message || "Unable to update profile."
    });

    setTimeout(() => {
      setShow(false);
    }, 2000);

    console.error(error);
    return null;
  }
};

const convertEmptyToNull = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(convertEmptyToNull);
  }

  if (obj && typeof obj === "object") {
    const result = {};

    Object.keys(obj).forEach((key) => {
      result[key] = convertEmptyToNull(obj[key]);
    });

    return result;
  }

  if (typeof obj === "string") {
    const value = obj.trim();
    return value === "" ? null : value;
  }

  return obj;
};