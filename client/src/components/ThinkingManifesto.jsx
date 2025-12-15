import React from 'react';
import { motion } from 'framer-motion';
import { Database, Cpu, Layers } from 'lucide-react';

const ThinkingManifesto = () => {
    const principles = [
        {
            title: "First Principles Thinking",
            icon: <Cpu size={40} />,
            description: "I don't just use tools; I deconstruct problems to their fundamental truths. Whether it's optimizing a React render cycle or schema design, I start from 'why'."
        },
        {
            title: "Inversion Mental Model",
            icon: <Database size={40} />,
            description: "Instead of asking 'how do I make this succeed?', I ask 'how could this fail?'. This defensive programming mindset leads to robust error boundaries and secure APIs."
        },
        {
            title: "System Design & Scalability",
            icon: <Layers size={40} />,
            description: "Code doesn't live in a vacuum. I design with the future in mind—considering database read/write ratios, network latency, and the cost of abstraction."
        }
    ];

    return (
        <section id="about" className="py-12 md:py-24 px-4 md:px-8 max-w-7xl mx-auto">
            <div className="flex items-center mb-8 md:mb-12">
                <span className="text-teal font-mono text-xl md:text-xl mr-2 md:mr-4">01.</span>
                <h2 className="text-3xl md:text-3xl lg:text-4xl font-bold text-lightest-slate">Thinking Manifesto</h2>
                <div className="h-px bg-slate/30 flex-grow ml-2 md:ml-4"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                {principles.map((p, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.2 }}
                        className="bg-light-navy p-6 md:p-8 rounded-lg hover:-translate-y-2 transition-transform duration-300"
                    >
                        <div className="text-teal mb-4 md:mb-6">{p.icon}</div>
                        <h3 className="text-xl md:text-xl font-bold text-lightest-slate mb-3 md:mb-4">{p.title}</h3>
                        <p className="text-slate leading-relaxed text-lg md:text-base">
                            {p.description}
                        </p>
                    </motion.div>
                ))}
            </div>

            <div className="mt-10 md:mt-16 bg-light-navy p-6 md:p-8 rounded-lg border-l-4 border-teal">
                <h3 className="text-xl md:text-xl font-bold text-white mb-4 md:mb-6">Production-Ready Standards</h3>
                <div className="grid md:grid-cols-2 gap-4 text-slate text-base md:text-base">
                    <ul className="space-y-3 md:space-y-2">
                        <li className="flex items-start"><span className="text-teal mr-2 mt-1">▹</span> Automated CI/CD Pipelines</li>
                        <li className="flex items-start"><span className="text-teal mr-2 mt-1">▹</span> Comprehensive Unit & E2E Testing</li>
                    </ul>
                    <ul className="space-y-3 md:space-y-2">
                        <li className="flex items-start"><span className="text-teal mr-2 mt-1">▹</span> Logging & Monitoring (Winston/Grafana)</li>
                        <li className="flex items-start"><span className="text-teal mr-2 mt-1">▹</span> Accessibility First (WCAG 2.1)</li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default ThinkingManifesto;
