import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, X } from 'lucide-react';

// Knowledge base about Silvia's work
const knowledgeBase = {
    projects: [
        {
            name: "EcoTracker",
            type: "Full-Stack",
            description: "AI-powered health risk assessment platform analyzing environmental factors like CO₂ and pollution to evaluate cancer risk. Currently piloted in Nairobi with plans for AI-driven public health insights.",
            tech: ["React", "TypeScript", "Python", "FastAPI", "Tailwind", "PostgreSQL"],
            link: "https://ecotracker-frontend-ktlm.onrender.com",
            keywords: ["ecotracker", "health", "environment", "AI", "cancer", "pollution", "nairobi", "fastapi", "python"]
        },
        {
            name: "Aegis Shield",
            type: "Full-Stack",
            description: "Real-time crisis management platform using social media analysis to identify threats and coordinate emergency services with high availability architecture.",
            tech: ["React", "Node.js", "MongoDB", "Socket.io", "AWS SES"],
            link: "https://digital-shield-pro.vercel.app/",
            keywords: ["aegis", "shield", "emergency", "crisis", "real-time", "websocket", "social media", "mongodb"]
        },
        {
            name: "Le Concierge",
            type: "Frontend",
            description: "Premium concierge service platform featuring seamless PayPal integration for consultation bookings, focusing on high-end aesthetics and user experience.",
            tech: ["React", "Tailwind CSS", "Node.js", "PayPal API"],
            link: "https://la-concierge-website.onrender.com/",
            keywords: ["concierge", "luxury", "paypal", "booking", "frontend", "tailwind"]
        },
        {
            name: "TaskMaster Pro",
            type: "Frontend",
            description: "Advanced task management application exploring complex state management patterns and local storage synchronization.",
            tech: ["React", "Local Storage", "Context API", "CSS Modules"],
            keywords: ["todo", "task", "state management", "context api", "frontend"]
        }
    ],
    skills: {
        frontend: ["React", "TypeScript", "Tailwind CSS", "Responsive Design"],
        backend: ["Node.js", "Express", "Python", "FastAPI"],
        database: ["MongoDB", "PostgreSQL"],
        tools: ["AWS", "Socket.io", "Git", "REST APIs"],
        concepts: ["System Design", "First Principles Thinking", "Debugging", "Cost Optimization"]
    },
    experience: [
        "Full Stack Developer - PowerLearn Project (MERN stack)",
        "AWS re/Start Graduate - Cloud Computing",
        "AWS Certified Cloud Practitioner",
        "Networking - NetAcad",
        "Internship - Huduma Center GPO",
        "Freelancer - Naivacom Company"
    ],
    education: "Diploma in Software Engineering - Kiriri Women's University",
    about: "I'm a software engineer specializing in building scalable systems. I focus on first principles thinking, system design, and creating accessible, human-centered products."
};

// Simple intent matching function
const matchIntent = (query) => {
    const q = query.toLowerCase();

    // Project-specific questions
    if (q.includes('ecotracker') || (q.includes('health') && q.includes('project'))) {
        const project = knowledgeBase.projects[0];
        return `EcoTracker is one of my favorite projects! It's an ${project.description} I built it using ${project.tech.slice(0, 3).join(', ')}, and more. Check it out: ${project.link}`;
    }

    if (q.includes('aegis') || q.includes('shield') || (q.includes('emergency') && q.includes('project'))) {
        const project = knowledgeBase.projects[1];
        return `Aegis Shield is a ${project.description} It uses ${project.tech.join(', ')} for real-time functionality. Live demo: ${project.link}`;
    }

    if (q.includes('concierge') || (q.includes('luxury') && q.includes('project'))) {
        const project = knowledgeBase.projects[2];
        return `Le Concierge is ${project.description} Built with ${project.tech.join(', ')}. See it here: ${project.link}`;
    }

    // General project questions
    if (q.includes('projects') || q.includes('built') || q.includes('work')) {
        return `I've built several impressive projects:
        
1. **EcoTracker** - AI-powered health risk assessment (React, Python, FastAPI)
2. **Aegis Shield** - Real-time crisis management (MERN stack, WebSockets)
3. **Le Concierge** - Luxury concierge platform (React, PayPal API)

Would you like to know more about any specific project?`;
    }

    // Skills questions
    if (q.includes('skills') || q.includes('stack') || q.includes('technologies')) {
        return `My technical skills include:

**Frontend**: ${knowledgeBase.skills.frontend.join(', ')}
**Backend**: ${knowledgeBase.skills.backend.join(', ')}
**Databases**: ${knowledgeBase.skills.database.join(', ')}
**Cloud & Tools**: ${knowledgeBase.skills.tools.join(', ')}

I specialize in the MERN stack and have AWS certification!`;
    }

    // Experience questions
    if (q.includes('experience') || q.includes('worked') || q.includes('background')) {
        return `My professional experience includes:

• ${knowledgeBase.experience.slice(0, 3).join('\n• ')}

I also have ${knowledgeBase.education}. I'm passionate about system design and creating scalable applications!`;
    }

    // Education
    if (q.includes('education') || q.includes('school') || q.includes('university')) {
        return `I hold a ${knowledgeBase.education}. I'm also ${knowledgeBase.experience[1]} and ${knowledgeBase.experience[2]}.`;
    }

    // AWS questions
    if (q.includes('aws') || q.includes('cloud')) {
        return `I'm AWS Certified Cloud Practitioner and completed the AWS re/Start program! I've worked with EC2, S3, CloudWatch, and other AWS services. I even wrote a blog post about AWS cost optimization - reduced costs by 40%!`;
    }

    // MERN stack
    if (q.includes('mern') || q.includes('mongodb') || q.includes('node')) {
        return `I specialize in the MERN stack (MongoDB, Express, React, Node.js)! I chose MERN because of Node.js's non-blocking I/O and MongoDB's schema flexibility. I have a detailed blog post explaining why I chose MERN for scalable applications.`;
    }

    // Contact/hire
    if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('reach')) {
        return `I'd love to hear from you! You can reach me at **silvianjeri730@gmail.com** or use the contact form at the bottom of the page. I'm currently open to new opportunities!`;
    }

    // About/personal
    if (q.includes('who are you') || q.includes('about you') || q.includes('tell me about')) {
        return `${knowledgeBase.about} I believe in first principles thinking - deconstructing problems to their fundamentals. I'm passionate about building systems that scale and solving real-world problems with code!`;
    }

    // Blog questions
    if (q.includes('blog') || q.includes('article') || q.includes('wrote')) {
        return `I write about technical topics! I've published articles on:
• Debugging complex systems
• AWS cost optimization strategies
• Why I chose MERN for scalable apps

Check out the Blog section (#06) to read them!`;
    }

    // Default response with suggestions
    return `I can help you learn about:
• My **projects** (EcoTracker, Aegis Shield, Le Concierge)
• My **skills** and tech stack
• My **experience** and background
• My **blog** articles
• How to **contact** me

What would you like to know?`;
};

const Chatbot = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi! I'm Silvia's AI assistant. Ask me about her projects, skills, or experience! 👋", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const [isOpen, setIsOpen] = useState(true);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim() || isTyping) return;

        const newMsg = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, newMsg]);
        const userQuery = input;
        setInput('');
        setIsTyping(true);

        // Simulate typing delay
        setTimeout(() => {
            const response = matchIntent(userQuery);
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: response,
                sender: 'bot'
            }]);
            setIsTyping(false);
        }, 800);
    };

    if (!isOpen) return (
        <button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-8 right-8 bg-light-navy p-4 rounded-full border border-teal text-teal shadow-xl hover:bg-navy transition-all z-50 animate-pulse hover:animate-none"
        >
            <Bot size={24} />
        </button>
    );

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-sm bg-navy border-2 border-teal/30 rounded-lg shadow-2xl overflow-hidden relative z-20"
        >
            {/* Header */}
            <div className="bg-light-navy p-4 border-b border-teal/20 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <div className="relative">
                        <Bot className="text-teal" size={20} />
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    </div>
                    <div>
                        <span className="font-mono text-white font-bold block">Silvia AI</span>
                        <span className="text-xs text-teal font-mono">Ask me anything!</span>
                    </div>
                </div>
                <button
                    onClick={() => setIsOpen(false)}
                    className="text-slate hover:text-white transition-colors"
                    aria-label="Close chatbot"
                >
                    <X size={18} />
                </button>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4 bg-navy/50">
                {messages.map((msg) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`max-w-[85%] p-3 rounded-lg text-sm ${msg.sender === 'user'
                            ? 'bg-teal text-navy rounded-br-none font-medium'
                            : 'bg-light-navy text-slate rounded-bl-none border border-teal/20'
                            }`}
                            style={{ whiteSpace: 'pre-line' }}
                        >
                            {msg.text}
                        </div>
                    </motion.div>
                ))}

                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-light-navy text-slate p-3 rounded-lg rounded-bl-none border border-teal/20">
                            <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-teal rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                <div className="w-2 h-2 bg-teal rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                <div className="w-2 h-2 bg-teal rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-3 bg-light-navy border-t border-teal/20 flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about projects, skills..."
                    disabled={isTyping}
                    className="flex-1 bg-navy text-slate text-sm rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal border border-teal/20 placeholder:text-slate/50 disabled:opacity-50"
                />
                <button
                    type="submit"
                    disabled={isTyping || !input.trim()}
                    className="p-2 bg-teal text-navy rounded hover:bg-teal/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Send message"
                >
                    <Send size={18} />
                </button>
            </form>

            {/* Quick Actions */}
            <div className="p-2 bg-navy border-t border-teal/10 flex gap-2 flex-wrap">
                {['Projects', 'Skills', 'Contact'].map(action => (
                    <button
                        key={action}
                        onClick={() => {
                            setInput(action);
                            handleSend({ preventDefault: () => { } });
                        }}
                        className="text-xs px-2 py-1 rounded bg-teal/10 text-teal hover:bg-teal/20 transition-colors font-mono"
                    >
                        {action}
                    </button>
                ))}
            </div>
        </motion.div>
    );
};

export default Chatbot;
