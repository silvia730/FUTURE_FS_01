import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '#', number: '00' },
        { name: 'About', path: '#about', number: '01' },
        { name: 'Skills', path: '#skills', number: '02' },
        { name: 'Work', path: '#work', number: '03' },
        { name: 'Experience', path: '#experience', number: '04' },
        { name: 'Certifications', path: '#certifications', number: '05' },
        { name: 'Blog', path: '#blog', number: '06' },
        { name: 'Contact', path: '#contact', number: '07' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-navy shadow-lg" style={{ height: scrolled ? '64px' : '80px' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">

                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex-shrink-0"
                >
                    <Link to="/" className="text-teal font-mono text-lg md:text-xl font-bold border-2 border-teal p-2 rounded hover:bg-teal/10 transition-colors">
                        SN
                    </Link>
                </motion.div>

                {/* Desktop Menu */}
                <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-8">
                        {navLinks.map((link, index) => (
                            <motion.div
                                key={link.name}
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <a
                                    href={link.path}
                                    className="text-lightest-slate hover:text-teal px-3 py-2 rounded-md text-sm font-mono transition-colors"
                                >
                                    <span className="text-teal mr-1">{link.number}.</span> {link.name}
                                </a>
                            </motion.div>
                        ))}

                    </div>
                </div>

                {/* Mobile Menu Button - ULTRA VISIBLE - NO ANIMATIONS */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="rounded-lg active:scale-95"
                        style={{
                            position: 'relative',
                            zIndex: 9999,
                            padding: '16px',
                            backgroundColor: isOpen ? '#64ffda' : '#ffffff',
                            borderWidth: '4px',
                            borderStyle: 'solid',
                            borderColor: '#64ffda',
                            boxShadow: '0 4px 15px rgba(100, 255, 218, 0.8), 0 0 30px rgba(100, 255, 218, 0.5)',
                            opacity: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minWidth: '56px',
                            minHeight: '56px',
                        }}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? (
                            <X size={36} strokeWidth={3.5} color="#0a192f" style={{ display: 'block' }} />
                        ) : (
                            <Menu size={36} strokeWidth={3.5} color="#0a192f" style={{ display: 'block' }} />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay - ENHANCED */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="md:hidden fixed inset-0 top-0 bg-navy h-screen w-3/4 ml-auto shadow-2xl flex flex-col items-center justify-center space-y-10 z-40 border-l-4 border-teal"
                >
                    {navLinks.map((link, index) => (
                        <motion.a
                            key={link.name}
                            href={link.path}
                            onClick={() => setIsOpen(false)}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="text-lightest-slate hover:text-teal text-2xl font-mono transition-colors hover:scale-110 active:scale-95"
                        >
                            <span className="text-teal mr-2">{link.number}.</span>
                            {link.name}
                        </motion.a>
                    ))}

                </motion.div>
            )}
        </nav>
    );
};

export default Navbar;
