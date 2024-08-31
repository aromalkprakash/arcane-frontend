import React from 'react';
import "../../../../styles/about.scss";

const About: React.FC = () => {
    return (
        <div className="about">
            <div className="about-div">
                <h1 className="about-h1">About Us</h1>
            <p className="about-p">
                wwhwhhwh is a platform for rating and reviewing movies.
                It offers functionality such as following other users and seeing their reviews about movies.
                Users can add movies to their watchlist, mark their favorite movies, and view all reviews about particular films.
                Additionally, users can like reviews and chat with others in the app. The platform helps users connect with movie enthusiasts who share their interests.
            </p>
            </div>
        </div>
    );
};

export default About;
