import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Chatbot from './Chatbot';
import CyberSphere from './CyberSphere';

const Hero = () => {
    const [textIndex, setTextIndex] = useState(0);
    const phrases = ["Systems Thinker", "MERN Stack Specialist", "AWS Certified", "Problem Solver"];

    useEffect(() => {
        const interval = setInterval(() => {
            setTextIndex((prev) => (prev + 1) % phrases.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-8 lg:px-24 max-w-7xl mx-auto pt-20">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 w-full items-center">

                {/* Mobile Profile Photo - Shows only on mobile */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="lg:hidden flex justify-center order-1"
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-teal rounded-full opacity-20 blur-xl"></div>
                        <img
                            src="/images/profile.jpg"
                            alt="Silvia Njeri"
                            className="relative w-48 h-48 rounded-full object-cover border-4 border-teal shadow-2xl"
                        />
                    </div>
                </motion.div>

                {/* Left Column: Text Content */}
                <div className="flex flex-col justify-center order-2 lg:order-1">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <span className="text-teal font-mono text-lg md:text-lg mb-3 md:mb-4 block">Hi, my name is</span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-lightest-slate mb-3 md:mb-4">
                            Silvia Njeri.
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                    >
                        {/* User explicitly removed the h2 here, respecting that choice */}
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className="text-slate max-w-xl text-lg md:text-lg mb-8 md:mb-10 leading-relaxed"
                    >
                        I'm a software engineer specializing in building (and occasionally designing) exceptional digital experiences.
                        Currently, I'm focused on accessible, human-centered products at <span className="text-teal">The Intersection of Logic & Empathy</span>.
                    </motion.p>

                    <motion.div
                        key={textIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="h-8 md:h-8 mb-6 md:mb-8"
                    >
                        <span className="font-mono text-teal text-xl md:text-xl">
                            &gt; {phrases[textIndex]}_
                        </span>
                    </motion.div>


                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.9 }}
                        className="flex flex-col sm:flex-row gap-4 relative z-20"
                    >
                        <a
                            href="#work"
                            className="inline-block text-center border border-teal text-teal py-4 md:py-4 px-8 md:px-10 rounded text-base md:text-base font-mono hover:bg-teal/10 transition-colors cursor-pointer"
                        >
                            Check out my work!
                        </a>
                        <a
                            href="/documents/Silvia_Njeri_CV.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block text-center bg-teal/10 text-teal py-4 md:py-4 px-8 md:px-10 rounded text-base md:text-base font-mono hover:bg-teal/20 transition-colors cursor-pointer"
                        >
                            Resume
                        </a>
                    </motion.div>
                </div>

                {/* Right Column: Visuals & Chatbot - Desktop Only */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="relative hidden lg:flex flex-col items-center justify-center order-1 lg:order-2 h-[600px] gap-8"
                >
                    {/* Background Diagram */}
                    <div className="absolute inset-0 z-0">
                        <CyberSphere />
                    </div>

                    {/* Profile Photo - Desktop */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 1.2 }}
                        className="relative z-10"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-teal rounded-full opacity-30 blur-2xl"></div>
                            <img
                                src="/images/profile.jpg"
                                alt="Silvia Njeri"
                                className="relative w-56 h-56 rounded-full object-cover border-4 border-teal shadow-2xl hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    </motion.div>

                    {/* Floating Chatbot - Desktop */}
                    <motion.div
                        initial={{ y: 20 }}
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                        className="relative z-10 w-full max-w-md"
                    >
                        <Chatbot />
                    </motion.div>
                </motion.div>

                {/* Floating Chatbot Widget - Mobile Only */}
                <div className="lg:hidden fixed bottom-4 right-4 z-50 max-w-[calc(100vw-2rem)]">
                    <Chatbot />
                </div>

            </div>
        </section>
    );
};

export default Hero;
