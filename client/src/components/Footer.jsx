import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="py-8 text-center bg-navy text-slate text-sm font-mono relative z-10">
            <div className="flex justify-center space-x-6 mb-4">
                <a href="#" className="hover:text-teal transition-colors"><Github size={20} /></a>
                <a href="#" className="hover:text-teal transition-colors"><Linkedin size={20} /></a>
                <a href="#" className="hover:text-teal transition-colors"><Twitter size={20} /></a>
            </div>
            <p className="hover:text-teal transition-colors cursor-default">
                Designed & Built by Silvia Njeri
            </p>
        </footer>
    );
};

export default Footer;
