export const initialStudent = {
  id: null,

  user: {
    id: null,
    name: null,
    email: null,
    role: null,
    status: false
  },

  prn: null,
  rollNo: null,
  firstName: null,
  lastName: null,
  gender: null,
  dob: null,
  phone: null,
  email: null,
  address: null,

  passingYear: null,
  cgpa: null,
  backlog: null,

  resumeUrl: null,
  photo: null,

  department: {
    id: null,
    departmentName: null
  },

  academics: {
    id: null,
    collegeName: null,
    currentYear: null,
    sscPercentage: null,
    hscPercentage: null,
    linkedinUrl: null,
    githubUrl: null,
    resumeFile: null
  },

  skills: [],

  projects: [
    {
      id: null,
      studentId: null,
      title: null,
      des: null,
      githubUrl: null
    }
  ],

  certifications: [
    {
      id: null,
      name: null,
      issuer: null
    }
  ]
};