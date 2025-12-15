import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Code2, Database, Layout, Server, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const projects = [
    {
        id: 'ecotracker',
        title: "EcoTracker",
        tagline: "AI-Powered Health Risk Assessment",
        category: "Full-Stack",
        description: "A scalable platform analyzing environmental factors like CO₂ and pollution to evaluate cancer risk, currently piloted in Nairobi with plans for AI-driven public health insights.",
        tech: ["React", "TypeScript", "Python", "FastAPI", "Tailwind", "PostgreSQL"],
        github: "https://github.com/silvia730/Ecotracker-system.git",
        link: "https://ecotracker-frontend-ktlm.onrender.com",
        featured: true
    },
    {
        id: 'aegis-shield',
        title: "Aegis Shield",
        tagline: "Real-time Crisis Management",
        category: "Full-Stack",
        description: "Emergency response platform using real-time social media analysis to identify threats and coordinate services with high availability architecture.",
        tech: ["React", "Node.js", "MongoDB", "Socket.io", "AWS SES"],
        github: "https://github.com/silvia730/digital-shield-pro.git",
        link: "https://digital-shield-pro.vercel.app/",
        featured: true
    },
    {
        id: 'le-concierge',
        title: "Le Concierge",
        tagline: "Luxury Lifestyle Management",
        category: "Frontend",
        description: "Premium concierge service platform featuring seamless PayPal integration for consultation bookings, focusing on high-end aesthetics and user experience.",
        tech: ["React", "Tailwind CSS", "Node.js", "PayPal API"],
        github: "https://github.com/silvia730/la_concierge-website.git",
        link: "https://la-concierge-website.onrender.com/",
        featured: true
    },
    {
        id: 'todo-app',
        title: "TaskMaster Pro",
        tagline: "Advanced State Synchronization",
        category: "Frontend",
        description: "Robust task management application exploring complex state management patterns and local storage synchronization mechanisms.",
        tech: ["React", "Local Storage", "Context API", "CSS Modules"],
        github: "https://github.com/silvia730/TO-DO-APP.git",
        link: "#",
        featured: false
    }
];

const filters = ["All", "Full-Stack", "Frontend", "Backend", "DevOps"];

const FeaturedProjects = () => {
    const [activeFilter, setActiveFilter] = useState("All");

    const filteredProjects = projects.filter(project =>
        activeFilter === "All" || project.category === activeFilter
    );

    return (
        <section id="work" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
            {/* Header & Filter */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div>
                    <div className="flex items-center mb-4">
                        <span className="text-teal font-mono text-xl mr-4">03.</span>
                        <h2 className="text-3xl font-bold text-lightest-slate">Selected Work</h2>
                        <div className="h-px bg-slate/30 w-32 ml-4"></div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    {filters.map(filter => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-4 py-2 rounded-full text-xs font-mono transition-all
                                ${activeFilter === filter
                                    ? 'bg-teal/10 text-teal border border-teal'
                                    : 'text-slate hover:bg-light-navy hover:text-lightest-slate border border-transparent'
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid Layout */}
            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                <AnimatePresence>
                    {filteredProjects.map((project) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            key={project.id}
                            className="bg-light-navy rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-transparent hover:border-teal/30 group flex flex-col h-full"
                        >
                            {/* Card Content */}
                            <div className="p-8 flex flex-col flex-grow relative">
                                {/* Top Actions */}
                                <div className="flex justify-between items-start mb-6">
                                    <div className="folder-icon p-3 bg-teal/10 rounded-lg text-teal">
                                        {project.category === 'Frontend' ? <Layout size={24} /> :
                                            project.category === 'Backend' ? <Server size={24} /> :
                                                <Database size={24} />}
                                    </div>
                                    <div className="flex gap-4">
                                        {project.github && (
                                            <a href={project.github} target="_blank" rel="noreferrer" className="text-slate hover:text-teal transition-colors" aria-label="GitHub">
                                                <Github size={20} />
                                            </a>
                                        )}
                                        {project.link !== '#' && (
                                            <a href={project.link} target="_blank" rel="noreferrer" className="text-slate hover:text-teal transition-colors" aria-label="Live Demo">
                                                <ExternalLink size={20} />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-lightest-slate mb-2 group-hover:text-teal transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-teal font-mono text-xs mb-4 tracking-wide">
                                    {project.tagline}
                                </p>

                                <p className="text-slate text-sm leading-relaxed mb-6 flex-grow">
                                    {project.description}
                                </p>

                                {/* Tech Stack */}
                                <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-slate/10">
                                    {project.tech.map((tech) => (
                                        <span
                                            key={tech}
                                            className="text-[10px] font-mono text-slate/80 bg-navy px-2 py-1 rounded"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* View More Link (Optional) */}
            <div className="mt-16 text-center">
                {/* Re-using the case study link logic if desired, or can be omitted if the card is sufficient */}
            </div>
        </section>
    );
};

export default FeaturedProjects;
