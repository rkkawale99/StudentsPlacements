import React, { useState } from 'react'

import './Styles/Common.css'
import { Link,  useLocation, useNavigate } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css';



const Start = () => {
  let loc = useLocation();
  const navigate = useNavigate();
  
 
  return (
   <div style={{ backgroundColor: '#020617', color: '#F8FAFC', fontFamily: 'system-ui, sans-serif' }}>
   {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-surface border-bottom border-secondary border-opacity-25 py-3">
        <div className="container">
          <a className="navbar-brand fw-bold text-primary-custom fs-4" href="#home">
            <i className="bi bi-mortarboard-fill me-2"></i>PLACEMENT PORTAL
          </a>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto gap-3">
              <li className="nav-item"><a className={`nav-link ${loc.hash=="#home" ? "active" : ""} text-muted-custom`} href="#home">Home</a></li>
              <li className="nav-item"><a className={`nav-link ${loc.hash=="#stats" ? "active" : ""} text-muted-custom`} href="#stats">Statistics</a></li>
              <li className="nav-item"><a className={`nav-link ${loc.hash=="#recruiters" ? "active" : ""} text-muted-custom`} href="#recruiters">Companies</a></li>
              <li className="nav-item"><a className={`nav-link ${loc.hash=="#stories" ? "active" : ""} text-muted-custom`} href="#stories">Success Stories</a></li>
              <li className="nav-item"><a className={`nav-link ${loc.hash=="#features" ? "active" : ""} text-muted-custom`} href="#features">Why Us</a></li>
            </ul>
            <button className="btn btn-custom-primary ms-lg-4 px-4 btn-press"><Link className='text-white border-white' to={'/login'} style={{textDecoration : "none"}}>Login</Link></button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header id="home" className="container py-5 my-3 appear">
        <div className="row align-items-center justify-content-center g-5">
          <div className="col-md-12">
            <h1 className="display-4 fw-bold lh-sm mb-3 text-center">
              Connect. Prepare.<br /><span className="text-primary-custom">Get Placed.</span>
            </h1>
            <p className="lead text-muted-custom mb-4">
              Your gateway to dream careers. We match ambitious students with top-tier global organizations through structured pre-placement prep and streamlined recruitment pipelines.
            </p>
            <div className="d-flex gap-3 mb-5 justify-content-center">
              <button className="btn btn-custom-primary btn-lg px-4 hover-scale btn-press" onClick={()=>{navigate('/signin')}}>Get Started</button>
              <button className="btn btn-custom-outline btn-lg px-4 hover-scale btn-press onClick={()=>{navigate('/aboutus')}}">Learn More</button>
            </div>
            <div className="d-flex gap-5 border-top border-secondary border-opacity-25 pt-4 justify-content-center">
              <div>
                <h3 className="fw-bold mb-0 text-light">120+</h3>
                <small className="text-muted-custom">Hiring Partners</small>
              </div>
              <div>
                <h3 className="fw-bold mb-0 text-light">2500+</h3>
                <small className="text-muted-custom">Students Placed</small>
              </div>
            </div>
          </div>
          <div className="col--6 text-center">
            {/* Interactive Vector Space Replacement */}
            <div className="p-5 bg-surface rounded-4 shadow border border-secondary border-opacity-10 opacity-75 d-flex justify-content-center align-items-center" style={{ minHeight: '350px' }}>
             <img src="/favicon.svg" alt="Logo" />
            </div>
          </div>
        </div>
      </header>

      {/* STATISTICS SECTION */}
      <section id="stats" className="bg-surface py-5 border-top border-bottom border-secondary border-opacity-15">
        <div className="container py-4">
          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="card bg-card border-0 p-4 text-center hover-lift rounded-3 h-100">
                <i className="bi bi-people-fill text-primary-custom fs-1 mb-2"></i>
                <h2 className="fw-bold text-light mb-1">2500+</h2>
                <span className="text-muted-custom text-uppercase small tracking-wider">Students Placed</span>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card bg-card border-0 p-4 text-center hover-lift rounded-3 h-100">
                <i className="bi bi-building text-primary-custom fs-1 mb-2"></i>
                <h2 className="fw-bold text-light mb-1">120+</h2>
                <span className="text-muted-custom text-uppercase small tracking-wider">Companies Vetted</span>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card bg-card border-0 p-4 text-center hover-lift rounded-3 h-100">
                <i className="bi bi-graph-up-arrow text-primary-custom fs-1 mb-2"></i>
                <h2 className="fw-bold text-light mb-1">95%</h2>
                <span className="text-muted-custom text-uppercase small tracking-wider">Placement Rate</span>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card bg-card border-0 p-4 text-center hover-lift rounded-3 h-100">
                <i className="bi bi-currency-rupee text-primary-custom fs-1 mb-2"></i>
                <h2 className="fw-bold text-light mb-1">12 LPA</h2>
                <span className="text-muted-custom text-uppercase small tracking-wider">Highest Package</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TOP RECRUITING COMPANIES */}
      <section id="recruiters" className="container py-5 my-4">
        <div className="text-center mb-5">
          <h2 className="fw-bold text-light">TOP RECRUITERS</h2>
          <div className="mx-auto bg-custom-primary rounded" style={{ height: '3px', width: '60px', backgroundColor: '#8B5CF6' }}></div>
        </div>
        <div className="row row-cols-2 row-cols-md-4 g-4 mb-4">
          {['Amazon', 'TCS', 'Infosys', 'Wipro', 'Google', 'Accenture', 'Capgemini', 'IBM', 'Cognizant', 'Deloitte', 'Oracle', 'Microsoft'].map((company, index) => (
            <div className="col" key={index}>
              <div className="recruiter-logo shadow-sm">{company}</div>
            </div>
          ))}
        </div>
        <div className="text-center mt-5">
          <button className="btn btn-custom-outline px-4 py-2">View All Companies</button>
        </div>
      </section>

      {/* SUCCESS STORIES */}
      <section id="stories" className="bg-surface py-5 border-top border-bottom border-secondary border-opacity-15">
        <div className="container py-4">
          <div className="text-center mb-5">
            <h2 className="fw-bold text-light">SUCCESS STORIES</h2>
            <div className="mx-auto rounded" style={{ height: '3px', width: '60px', backgroundColor: '#8B5CF6' }}></div>
          </div>
          <div className="row g-4">
            <div className="col-md-6">
              <div className="card bg-card border-0 p-4 rounded-3 hover-lift h-100">
                <div className="d-flex align-items-center mb-3">
                  <i className="bi bi-person-circle fs-1 text-primary-custom me-3"></i>
                  <div>
                    <h5 className="mb-0 text-light fw-bold">Rahul Patil</h5>
                    <small className="text-muted-custom">Software Engineer @ Google</small>
                  </div>
                </div>
                <p className="text-muted-custom italic">"The placement portal helped me prepare immaculately. The integrated real-time notifications made sure I never missed a deadline."</p>
                <div className="text-warning"><i className="bi bi-star-fill me-1"></i><i className="bi bi-star-fill me-1"></i><i className="bi bi-star-fill me-1"></i><i className="bi bi-star-fill me-1"></i><i className="bi bi-star-fill"></i></div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card bg-card border-0 p-4 rounded-3 hover-lift h-100">
                <div className="d-flex align-items-center mb-3">
                  <i className="bi bi-person-circle fs-1 text-primary-custom me-3"></i>
                  <div>
                    <h5 className="mb-0 text-light fw-bold">Sneha Sharma</h5>
                    <small className="text-muted-custom">SDE @ Microsoft</small>
                  </div>
                </div>
                <p className="text-muted-custom italic">"Mock interview support directly from dynamic alumni panels significantly improved my overall confidence before the final rounds."</p>
                <div className="text-warning"><i className="bi bi-star-fill me-1"></i><i className="bi bi-star-fill me-1"></i><i className="bi bi-star-fill me-1"></i><i className="bi bi-star-fill me-1"></i><i className="bi bi-star-fill"></i></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section id="features" className="container py-5 my-4">
        <div className="text-center mb-5">
          <h2 className="fw-bold text-light">WHY CHOOSE US</h2>
          <div className="mx-auto rounded" style={{ height: '3px', width: '60px', backgroundColor: '#8B5CF6' }}></div>
        </div>
        <div className="row g-4">
          {[
            { title: "AI Resume Screening", icon: "bi-cpu" },
            { title: "Mock Interviews", icon: "bi-chat-left-quote" },
            { title: "Real-time Job Notifications", icon: "bi-bell" },
            { title: "Company-wise Eligibility", icon: "bi-check-circle" },
            { title: "Track Placement Progress", icon: "bi-sliders" },
            { title: "Secure Student Dashboard", icon: "bi-shield-lock" }
          ].map((feature, idx) => (
            <div className="col-md-6 col-lg-4" key={idx}>
              <div className="d-flex align-items-start p-3 bg-surface rounded-3 border border-secondary border-opacity-10 h-100">
                <div className="bg-card p-2 rounded-2 text-primary-custom me-3 border border-secondary border-opacity-25">
                  <i className={`bi ${feature.icon} fs-4`}></i>
                </div>
                <div>
                  <h5 className="text-light fw-semibold mb-1">{feature.title}</h5>
                  <p className="small text-muted-custom mb-0">Automated workflows optimized to increase conversion rates across technical rounds.</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="container py-4 my-5">
        <div className="cta-gradient p-5 rounded-4 text-center shadow-lg border border-primary border-opacity-25">
          <h2 className="display-6 fw-bold text-light mb-3">Ready to Start Your Career?</h2>
          <p className="text-light text-opacity-75 max-w-md mx-auto mb-4">Register your system account today and start tracking active openings instantly.</p>
          <button className="btn btn-light btn-lg text-dark fw-bold px-5 py-3 rounded-pill shadow-sm" onClick={()=>{
            navigate("/role");}}>Register Now</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-surface border-top border-secondary border-opacity-25 pt-5 pb-3">
        <div className="container">
          <div className="row g-4 mb-5">
            <div className="col-lg-4">
              <h4 className="fw-bold text-primary-custom mb-3"><i className="bi bi-mortarboard-fill me-2"></i>Placement Portal</h4>
              <p className="text-muted-custom max-w-xs">Connecting institutional merit with international industry requirements seamlessly.</p>
            </div>
            <div className="col-6 col-md-3 col-lg-2">
              <h6 className="text-light fw-bold text-uppercase mb-3">Quick Links</h6>
              <ul className="list-unstyled d-flex flex-column gap-2">
                <li><a href="#home" className="text-muted-custom text-decoration-none">Home</a></li>
                <li><a href="#recruiters" className="text-muted-custom text-decoration-none">Companies</a></li>
                <li><a href="#stats" className="text-muted-custom text-decoration-none">Placements</a></li>
              </ul>
            </div>
            <div className="col-6 col-md-3 col-lg-3">
              <h6 className="text-light fw-bold text-uppercase mb-3">Contact Us</h6>
              <ul className="list-unstyled text-muted-custom d-flex flex-column gap-2">
                <li><i className="bi bi-envelope-at me-2"></i>placement@college.edu</li>
                <li><i className="bi bi-telephone me-2"></i>+91 9876543210</li>
              </ul>
            </div>
            <div className="col-md-6 col-lg-3">
              <h6 className="text-light fw-bold text-uppercase mb-3">Follow Us</h6>
              <div className="d-flex gap-3 fs-4">
                <a href="#" className="text-muted-custom hover-lift"><i className="bi bi-facebook"></i></a>
                <a href="#" className="text-muted-custom hover-lift"><i className="bi bi-instagram"></i></a>
                <a href="#" className="text-muted-custom hover-lift"><i className="bi bi-linkedin"></i></a>
                <a href="#" className="text-muted-custom hover-lift"><i className="bi bi-github"></i></a>
                <a href="#" className="text-muted-custom hover-lift"><i className="bi bi-twitter-x"></i></a>
              </div>
            </div>
          </div>
          <div className="border-top border-secondary border-opacity-25 pt-4 text-center">
            <p className="small text-muted-custom mb-0">&copy; 2026 Placement Portal. Built with premium utility architecture.</p>
          </div>
        </div>
      </footer>


   </div>
  
  )
}

export default Start
