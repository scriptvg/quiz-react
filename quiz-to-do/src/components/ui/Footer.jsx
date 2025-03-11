import React from 'react'
import { Facebook, Twitter, Instagram, Github } from 'lucide-react'
import '../../styles/footer.css'

function Footer() {
  return (
    <footer className="footer bg-dark text-light py-4 mt-auto">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-4 text-center text-md-start mb-3 mb-md-0">
            <h5 className="fw-bold mb-2">Quiz App</h5>
            <p className="mb-0">Expand your knowledge through interactive quizzes</p>
          </div>
          <div className="col-md-4 text-center mb-3 mb-md-0">
            <p className="mb-2 fw-medium">Connect with us</p>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-light social-icon" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-light social-icon" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-light social-icon" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-light social-icon" aria-label="GitHub">
                <Github size={20} />
              </a>
            </div>
          </div>
          <div className="col-md-4 text-center text-md-end">
            <p className="mb-1">&copy; {new Date().getFullYear()} Quiz App</p>
            <p className="mb-0">All rights reserved</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
