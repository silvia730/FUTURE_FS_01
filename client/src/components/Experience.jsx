import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Calendar, MapPin } from 'lucide-react';

const experiences = [
    {
        id: 'future-interns',
        company: "Future Interns",
        role: "Developer",
        period: "Dec 2025 – Present",
        description: [
            "Contributing to full-stack development projects using modern JavaScript frameworks.",
            "Collaborating with cross-functional teams to deliver scalable software solutions.",
            "implementing robust features and focusing on code quality and performance."
        ],
        tech: ["React", "Node.js", "Agile"]
    },
    {
        id: 'huduma',
        company: "Huduma Center GPO",
        role: "Software Intern",
        period: "Sep 2025 – Dec 2025",
        location: "Nairobi, Kenya",
        description: [
            "Supported daily IT operations and software maintenance tasks.",
            "Assisted in the development of internal tools to streamline service delivery.",
            "Gained hands-on experience with government digital infrastructure and user support."
        ],
        tech: ["IT Support", "System Admin", "Troubleshooting"]
    },
    {
        id: 'naivacom',
        company: "Naivacom",
        role: "Freelance Developer",
        period: "May 2025 – Nov 2025",
        description: [
            "Delivered custom web solutions for diverse clients, focusing on responsive design.",
            "Managed the full project lifecycle from requirement gathering to deployment.",
            "Integrated payment gateways and CMS solutions for e-commerce clients."
        ],
        tech: ["WordPress", "PHP", "CSS3", "JavaScript"]
    }
];

const education = [
    {
        id: 'cisco',
        school: "Cisco Networking Academy",
        degree: "Networking Essentials",
        period: "Oct 2025 – Dec 2025",
        description: "Comprehensive study of network protocols, architecture, and troubleshooting."
    },
    {
        id: 'aws',
        school: "AWS Restart Program",
        degree: "Cloud Practitioner",
        period: "May 2025 – Aug 2025",
        description: "Intensive training in cloud computing fundamentals, AWS services, and security compliance."
    },
    {
        id: 'plp',
        school: "Power Learn Project",
        degree: "Full-Stack Development (MERN)",
        period: "Feb 2025 – July 2025",
        description: "Specialized in MongoDB, Express, React, and Node.js. Built multiple capstone projects."
    },
    {
        id: 'kiriri',
        school: "Kiriri Women's Univ. of Science & Tech",
        degree: "Diploma in Software Engineering",
        period: "Sep 2024 – Present",
        description: "Core computer science curriculum focusing on algorithms, data structures, and software engineering principles."
    }
];

const Experience = () => {
    return (
        <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto" id="experience">
            <div className="flex items-center mb-16">
                <span className="text-teal font-mono text-xl mr-4">04.</span>
                <h2 className="text-3xl font-bold text-lightest-slate">Experience & Education</h2>
                <div className="h-px bg-slate/30 flex-grow ml-4 max-w-xs"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Work Experience Column */}
                <div>
                    <div className="flex items-center mb-8 text-light-slate">
                        <Briefcase className="text-teal mr-3" size={24} />
                        <h3 className="text-2xl font-semibold">Work History</h3>
                    </div>

                    <div className="space-y-12 border-l border-slate/30 pl-8 ml-3 relative">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="relative"
                            >
                                {/* Timeline Dot */}
                                <span className="absolute -left-[41px] top-1 w-5 h-5 rounded-full border-2 border-teal bg-navy"></span>

                                <h4 className="text-xl font-bold text-lightest-slate leading-tight">{exp.role}</h4>
                                <h5 className="text-teal font-mono text-sm mb-2">{exp.company}</h5>

                                <div className="flex items-center text-slate text-xs font-mono mb-4">
                                    <Calendar size={14} className="mr-2" />
                                    {exp.period}
                                    {exp.location && (
                                        <>
                                            <span className="mx-2">•</span>
                                            <MapPin size={14} className="mr-2" />
                                            {exp.location}
                                        </>
                                    )}
                                </div>

                                <ul className="list-disc list-outside ml-4 text-slate space-y-2 mb-4 text-sm">
                                    {exp.description.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>

                                {exp.tech && (
                                    <div className="flex flex-wrap gap-2 text-xs font-mono text-teal/80">
                                        {exp.tech.map(t => (
                                            <span key={t} className="bg-teal/10 px-2 py-1 rounded">{t}</span>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Education Column */}
                <div>
                    <div className="flex items-center mb-8 text-light-slate">
                        <GraduationCap className="text-teal mr-3" size={24} />
                        <h3 className="text-2xl font-semibold">Education</h3>
                    </div>

                    <div className="space-y-8">
                        {education.map((edu, index) => (
                            <motion.div
                                key={edu.id}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-light-navy p-6 rounded-lg hover:-translate-y-1 transition-transform duration-300 border-l-4 border-teal/0 hover:border-teal"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="text-lg font-bold text-lightest-slate">{edu.school}</h4>
                                    <span className="text-xs font-mono text-slate bg-navy px-2 py-1 rounded hidden sm:inline-block">{edu.period}</span>
                                </div>
                                <h5 className="text-teal text-sm font-medium mb-3">{edu.degree}</h5>
                                <span className="text-xs font-mono text-slate bg-navy px-2 py-1 rounded sm:hidden mb-3 inline-block">{edu.period}</span>
                                <p className="text-slate text-sm">
                                    {edu.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
