import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Layout,
    Server,
    Terminal,
    Code2,
    Database,
    GitBranch,
    Box,
    Cpu,
    CheckCircle2
} from 'lucide-react';

const categories = [
    {
        id: 'frontend',
        label: 'Frontend',
        icon: Layout,
        description: "I build responsive, accessible, and performant user interfaces with modern React ecosystems. My focus is on component reusability and seamless user experiences.",
        skills: [
            { name: "React", level: "Advanced", tags: ["Hooks", "Context"] },
            { name: "Next.js", level: "Advanced", tags: ["SSR", "App Router"] },
            { name: "TypeScript", level: "Intermediate", tags: ["Types", "Interfaces"] },
            { name: "Tailwind CSS", level: "Advanced", tags: ["Responsive", "Custom"] },
            { name: "Material-UI", level: "Intermediate", tags: ["Theming"] },
            { name: "Shadcn/UI", level: "Intermediate", tags: ["Radix"] }
        ]
    },
    {
        id: 'backend',
        label: 'Backend',
        icon: Server,
        description: "I design scalable server-side architectures using Node.js and Python. I prioritize security, API efficiency, and robust database management.",
        skills: [
            { name: "Node.js", level: "Advanced", tags: ["Event Loop", "Streams"] },
            { name: "Express", level: "Advanced", tags: ["Middleware"] },
            { name: "Python", level: "Intermediate", tags: ["FastAPI", "Scripts"] },
            { name: "PostgreSQL", level: "Intermediate", tags: ["Relational"] },
            { name: "MongoDB", level: "Advanced", tags: ["Mongoose", "Aggregation"] },
            { name: "GraphQL", level: "Intermediate", tags: ["Apollo"] }
        ]
    },
    {
        id: 'devops',
        label: 'DevOps & Tools',
        icon: Terminal,
        description: "I streamline development workflows with CI/CD pipelines and containerization. I ensure code quality and reliability through automated testing and cloud deployment.",
        skills: [
            { name: "Git", level: "Advanced", tags: ["Workflows"] },
            { name: "Docker", level: "Intermediate", tags: ["Containers"] },
            { name: "GitHub Actions", level: "Intermediate", tags: ["CI/CD"] },
            { name: "AWS", level: "Intermediate", tags: ["EC2", "S3"] },
            { name: "Linux", level: "Intermediate", tags: ["Shell Scripting"] },
            { name: "Testing", level: "Intermediate", tags: ["Jest", "Cypress"] }
        ]
    },
    {
        id: 'languages',
        label: 'Languages',
        icon: Code2,
        description: "I am polyglot-proficient, selecting the best language for the task at hand. I write clean, maintainable code with a focus on type safety and modern standards.",
        skills: [
            { name: "JavaScript", level: "Advanced", tags: ["ES6+", "Async/Await"] },
            { name: "TypeScript", level: "Intermediate", tags: ["Types"] },
            { name: "Python", level: "Intermediate", tags: ["OOP"] },
            { name: "SQL", level: "Intermediate", tags: ["Queries"] },
            { name: "HTML5/CSS3", level: "Advanced", tags: ["Semantic", "Animations"] }
        ]
    }
];

const TechnicalDepth = () => {
    const [activeTab, setActiveTab] = useState(categories[0].id);

    return (
        <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto" id="skills">
            <div className="flex items-center mb-16">
                <span className="text-teal font-mono text-xl mr-4">02.</span>
                <h2 className="text-3xl md:text-4xl font-bold text-lightest-slate">Technical Skills</h2>
                <div className="h-px bg-slate/30 flex-grow ml-4 max-w-xs"></div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                {/* Navigation - Mobile: Horizontal Scroll, Desktop: Vertical List */}
                <div className="flex md:flex-col overflow-x-auto md:overflow-visible pb-4 md:pb-0 md:w-64 gap-2 flex-shrink-0 scrollbar-hide">
                    {categories.map((cat) => {
                        const Icon = cat.icon;
                        const isActive = activeTab === cat.id;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setActiveTab(cat.id)}
                                className={`
                                    flex items-center gap-3 px-6 py-4 rounded-lg transition-all duration-300 whitespace-nowrap
                                    ${isActive
                                        ? 'bg-light-navy text-teal shadow-lg translate-x-2'
                                        : 'text-slate hover:bg-light-navy/50 hover:text-lightest-slate'
                                    }
                                `}
                            >
                                <Icon size={20} />
                                <span className="font-mono text-sm tracking-wide">{cat.label}</span>
                                {isActive && (
                                    <motion.div
                                        layoutId="active-pill"
                                        className="ml-auto w-1.5 h-1.5 rounded-full bg-teal hidden md:block"
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Content Area */}
                <div className="flex-1 min-h-[400px]">
                    <AnimatePresence mode="wait">
                        {categories.map((cat) => (
                            cat.id === activeTab && (
                                <motion.div
                                    key={cat.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-light-navy/40 p-6 md:p-8 rounded-xl border border-slate/20 hover:border-teal/30 transition-colors"
                                >
                                    <div className="mb-8">
                                        <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                                            <cat.icon className="text-teal" size={24} />
                                            {cat.label}
                                        </h3>
                                        <p className="text-slate leading-relaxed max-w-2xl">
                                            {cat.description}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {cat.skills.map((skill, idx) => (
                                            <motion.div
                                                key={skill.name}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.05 }}
                                                className="group flex items-center justify-between p-3 rounded bg-navy border border-slate/10 hover:border-teal/30 transition-all hover:-translate-y-1"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <CheckCircle2 size={16} className="text-teal/70 group-hover:text-teal transition-colors" />
                                                    <span className="text-lightest-slate font-medium">{skill.name}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {skill.tags && skill.tags.map(tag => (
                                                        <span key={tag} className="text-[10px] uppercase tracking-wider font-mono text-slate/60 bg-slate/10 px-2 py-1 rounded">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default TechnicalDepth;
