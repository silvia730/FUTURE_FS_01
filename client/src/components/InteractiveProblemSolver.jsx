import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Play, RotateCcw } from 'lucide-react';

const scenarios = [
    {
        id: 1,
        title: "Slow API Response (500ms -> 50ms)",
        steps: [
            { type: 'thoughts', content: "User reports endpoint /api/users is slow. Initiating diagnostics..." },
            { type: 'cmd', content: "> check_logs --endpoint /api/users --duration 1h" },
            { type: 'output', content: "Avg Latency: 480ms. DB_READ accounts for 420ms." },
            { type: 'thoughts', content: "Database bottleneck. Likely missing index or N+1 problem. Checking query plan." },
            { type: 'cmd', content: "> db.users.find({ role: 'admin' }).explain('executionStats')" },
            { type: 'output', content: "COLLSCAN (Collection Scan). Docs examined: 50,000." },
            { type: 'thoughts', content: "Found it. Full collection scan on 'role' field. Needs an index." },
            { type: 'solution', content: "db.users.createIndex({ role: 1 }); // Reduces lookup to O(log n)" },
            { type: 'result', content: "New Latency: 35ms. Improvement: 13x." }
        ]
    },
    {
        id: 2,
        title: "Memory Leak in Node.js",
        steps: [
            { type: 'thoughts', content: "Production server keeps restarting. OOM (Out of Memory) errors." },
            { type: 'cmd', content: "> node --inspect index.js" },
            { type: 'thoughts', content: "Taking heap snapshot to compare allocation over time." },
            { type: 'output', content: "Snapshot 1: 50MB. Snapshot 2: 150MB. Delta: +100MB in 5 min." },
            { type: 'thoughts', content: "Analyzing retained objects. 'GlobalListeners' array is growing indefinitely." },
            { type: 'thoughts', content: "Ah, event listeners are being added in a request handler but never removed." },
            { type: 'solution', content: "server.on('close', () => removeListener(handler)); // Cleanup phase added" },
            { type: 'result', content: "Memory stabilized at 55MB." }
        ]
    }
];

const InteractiveProblemSolver = () => {
    const [selectedScenario, setSelectedScenario] = useState(null);
    const [logs, setLogs] = useState([]);
    const [isSimulating, setIsSimulating] = useState(false);

    const runSimulation = (scenario) => {
        setLogs([]);
        setSelectedScenario(scenario);
        setIsSimulating(true);
        let i = 0;

        const interval = setInterval(() => {
            if (i >= scenario.steps.length) {
                clearInterval(interval);
                setIsSimulating(false);
                return;
            }
            setLogs(prev => [...prev, scenario.steps[i]]);
            i++;
        }, 1500);
    };

    return (
        <section className="py-24 px-8 max-w-5xl mx-auto">
            <div className="flex items-center mb-12">
                <span className="text-teal font-mono text-xl mr-4">05.</span>
                <h2 className="text-3xl font-bold text-lightest-slate">Interactive Problem Solver</h2>
                <div className="h-px bg-slate/30 flex-grow ml-4"></div>
            </div>

            <p className="text-slate mb-8 max-w-2xl">
                I don't just write code; I debug systems. Select a scenario below to see how I approach complex technical challenges in real-time.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Sidebar */}
                <div className="space-y-4">
                    {scenarios.map((scenario) => (
                        <button
                            key={scenario.id}
                            disabled={isSimulating}
                            onClick={() => runSimulation(scenario)}
                            className={`w-full text-left p-4 rounded border transition-all flex items-center justify-between
                                ${selectedScenario?.id === scenario.id
                                    ? 'bg-teal/10 border-teal text-teal'
                                    : 'bg-light-navy border-slate/10 text-slate hover:bg-light-navy/80 hover:text-white'}`}
                        >
                            <span>{scenario.title}</span>
                            <Play size={16} />
                        </button>
                    ))}
                </div>

                {/* Terminal Window */}
                <div className="md:col-span-2 bg-navy border border-slate/30 rounded-lg overflow-hidden shadow-2xl font-mono text-sm h-[400px] flex flex-col">
                    <div className="bg-light-navy p-3 border-b border-slate/30 flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="ml-4 text-slate text-xs">debug_console — -zsh</span>
                    </div>

                    <div className="p-6 overflow-y-auto flex-1 space-y-4">
                        {!selectedScenario && (
                            <div className="text-slate/50 text-center mt-20">
                                &lt; Select a scenario to begin debugging session /&gt;
                            </div>
                        )}
                        {logs.map((log, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="break-words"
                            >
                                {log.type === 'thoughts' && (
                                    <span className="text-slate italic"># {log.content}</span>
                                )}
                                {log.type === 'cmd' && (
                                    <span className="text-teal font-bold">{log.content}</span>
                                )}
                                {log.type === 'output' && (
                                    <span className="text-slate/70">{log.content}</span>
                                )}
                                {log.type === 'solution' && (
                                    <div className="bg-light-navy/50 p-3 rounded border-l-2 border-green-500 my-2 text-green-400">
                                        {log.content}
                                    </div>
                                )}
                                {log.type === 'result' && (
                                    <span className="text-teal font-bold block mt-2">✨ {log.content}</span>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InteractiveProblemSolver;
