import React from 'react';
import github from '../images/github-icon.png'
import linkedin from '../images/linkedin-icon.png'
import youtube from '../images/youtube-icon.png'

const style = {
    maxWidth: '50px'
}
export default function Footer() {
    return (
        <footer className="footer mt-auto py-4">
            <div className="d-flex justify-content-center py-2">
                <a className = "mx-2" href="https://www.github.com/rpgarde">
                    <img src={github} alt="github" style={style} />
                </a>
                <a className = "mx-2" href="https://www.linkedin.com/in/paologarde">
                    <img src={linkedin} alt="linkedin" style={style} />
                </a>
                <a className = "mx-2" href="https://www.youtube.com/pgblanks">
                    <img src={youtube} alt="youtube" style={style} />
                </a>
            </div>
            <div className="container d-flex justify-content-center">
                <span className="text-muted">roomEZ is developed by Paolo Garde. Follow him on socials above.</span>
            </div>
        </footer>
    )
}