import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const ProjectDetails = () => {
    const { id } = useParams();

    return (
        <div className="pt-32 px-8 max-w-4xl mx-auto min-h-screen">
            <Link to="/" className="text-teal font-mono text-sm flex items-center hover:underline mb-8">
                <ArrowLeft size={16} className="mr-2" /> Back to Home
            </Link>
            <h1 className="text-4xl font-bold text-lightest-slate mb-4">Case Study: {id}</h1>
            <p className="text-slate">
                Detailed architecture deep dive, challenges faced, and metrics would go here.
            </p>
        </div>
    );
};

export default ProjectDetails;
