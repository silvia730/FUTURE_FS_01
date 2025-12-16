import React from 'react';
import Hero from '../components/Hero';
import ThinkingManifesto from '../components/ThinkingManifesto';
import TechnicalDepth from '../components/TechnicalDepth';
import Experience from '../components/Experience';
import Certifications from '../components/Certifications';
import Blog from '../components/Blog';
import FeaturedProjects from '../components/FeaturedProjects';
import Contact from '../components/Contact';

import SEO from '../components/SEO';

const Home = () => {
    return (
        <div className="flex flex-col w-full">
            <SEO
                title="Home"
                description="Portfolio of Silvia Njeri, a Full Stack Developer specializing in MERN stack and AWS cloud solutions."
                keywords="Full Stack Developer, MERN, AWS, React, Node.js, Portfolio"
            />
            <Hero />
            <ThinkingManifesto />
            <TechnicalDepth />
            <FeaturedProjects />
            <Experience />
            <Certifications />
            <Blog />
            <Contact />
        </div>
    );
};

export default Home;
