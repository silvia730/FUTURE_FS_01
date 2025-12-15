import React from 'react';
import Hero from '../components/Hero';
import ThinkingManifesto from '../components/ThinkingManifesto';
import TechnicalDepth from '../components/TechnicalDepth';
import Experience from '../components/Experience';
import Certifications from '../components/Certifications';
import Blog from '../components/Blog';
import FeaturedProjects from '../components/FeaturedProjects';
import Contact from '../components/Contact';

const Home = () => {
    return (
        <div className="flex flex-col w-full">
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
