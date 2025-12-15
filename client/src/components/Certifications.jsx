import React from 'react';
import { motion } from 'framer-motion';
import { Award, Shield, Cloud, Server, Terminal, ExternalLink } from 'lucide-react';

const certifications = [
    {
        id: 1,
        title: "Full Stack Development (MERN)",
        issuer: "Powerlearn Project",
        date: "2025",
        icon: Award,
        skills: "React, Node.js, MongoDB, Express, REST APIs",
        link: "#"
    },
    {
        id: 2,
        title: "AWS Cloud Practitioner",
        issuer: "Amazon Web Services (AWS)",
        date: "2025",
        icon: Cloud,
        skills: "Cloud Computing, Security, Billing, Global Infrastructure",
        link: "#"
    },
    {
        id: 3,
        title: "Kubernetes Fundamentals",
        issuer: "Andela",
        date: "2025",
        icon: Server,
        skills: "Container Orchestration, Pods, Deployments, Services",
        link: "#"
    },
    {
        id: 4,
        title: "Linux Fundamentals",
        issuer: "Andela",
        date: "2025",
        icon: Terminal,
        skills: "CLI, File Systems, Permissions, Bash Scripting",
        link: "#"
    },
    {
        id: 5,
        title: "Cisco Networking",
        issuer: "Cisco",
        date: "2025",
        icon: Shield,
        skills: "Network Protocols, OSI Model, Routing, Switching",
        link: "#"
    }
];

const Certifications = () => {
    return (
        <section id="certifications" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
            <div className="flex items-center mb-16">
                <span className="text-teal font-mono text-xl mr-4">05.</span>
                <h2 className="text-3xl font-bold text-lightest-slate">Certifications</h2>
                <div className="h-px bg-slate/30 flex-grow ml-4 max-w-xs"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certifications.map((cert, index) => {
                    const Icon = cert.icon;
                    return (
                        <motion.div
                            key={cert.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-light-navy p-6 rounded-xl border border-slate/10 hover:border-teal/30 hover:-translate-y-1 transition-all duration-300 group shadow-lg flex flex-col"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-teal/10 rounded-lg text-teal group-hover:bg-teal group-hover:text-navy transition-colors duration-300">
                                    <Icon size={24} />
                                </div>
                                <a href={cert.link} className="text-slate hover:text-teal transition-colors" title="View Certificate">
                                    <ExternalLink size={18} />
                                </a>
                            </div>

                            <h3 className="text-lg font-bold text-lightest-slate mb-1 group-hover:text-teal transition-colors">
                                {cert.title}
                            </h3>
                            <p className="text-teal font-mono text-xs mb-4">
                                {cert.issuer} <span className="text-slate/50">•</span> {cert.date}
                            </p>

                            <div className="mt-auto">
                                <p className="text-slate text-sm text-xs border-t border-slate/10 pt-4 leading-relaxed">
                                    <span className="text-teal/70 font-mono block mb-1">Skills:</span>
                                    {cert.skills}
                                </p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
};

export default Certifications;
