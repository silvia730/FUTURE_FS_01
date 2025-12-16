import React, { useState, useEffect } from 'react';
import { projectsAPI, contactAPI } from '../services/api';

const AdminDashboard = () => {
    // Auth State
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState('');

    // Dashboard State
    const [projects, setProjects] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);
    const [connectionStatus, setConnectionStatus] = useState('Testing...');
    const [activeTab, setActiveTab] = useState('contacts');

    useEffect(() => {
        if (isAuthenticated) {
            testConnection();
            fetchContacts();
        }
    }, [isAuthenticated]);

    const handleLogin = (e) => {
        e.preventDefault();
        // Simple hardcoded password for now - acceptable for this specific user request
        if (password === 'admin123') {
            setIsAuthenticated(true);
            setAuthError('');
        } else {
            setAuthError('Invalid password');
        }
    };

    const testConnection = async () => {
        try {
            setLoading(true);
            setConnectionStatus('Connecting to backend...');

            const data = await projectsAPI.getAll();
            setProjects(data);
            setConnectionStatus('✅ Connected successfully!');
            setError(null);
        } catch (err) {
            setConnectionStatus('❌ Connection failed');
            setError(err.message);
            console.error('Backend connection error:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchContacts = async () => {
        try {
            setRefreshing(true);
            const data = await contactAPI.getAll();
            setContacts(data);
        } catch (err) {
            console.error('Error fetching contacts:', err);
            setError('Failed to fetch contacts');
        } finally {
            setRefreshing(false);
        }
    };

    const handleDeleteContact = async (id) => {
        if (window.confirm('Are you sure you want to delete this message?')) {
            try {
                await contactAPI.delete(id);
                // Remove from local state immediately
                setContacts(contacts.filter(c => c._id !== id));
            } catch (err) {
                console.error('Error deleting contact:', err);
                alert('Failed to delete message');
            }
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleString('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short'
        });
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-navy px-4">
                <div className="bg-light-navy p-8 rounded-lg border border-teal/20 w-full max-w-md">
                    <h2 className="text-2xl font-bold text-lightest-slate mb-6 text-center">Admin Access</h2>
                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label className="block text-slate mb-2 text-sm font-mono">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-navy border border-slate/30 rounded px-4 py-2 text-lightest-slate focus:border-teal outline-none transition-colors"
                                placeholder="Enter admin password"
                            />
                        </div>
                        {authError && <p className="text-red-400 text-sm mb-4">{authError}</p>}
                        <button
                            type="submit"
                            className="w-full bg-teal/10 text-teal border border-teal py-2 rounded hover:bg-teal/20 transition-colors font-mono"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 px-8 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-lightest-slate">Admin Dashboard</h1>
                <button
                    onClick={() => setIsAuthenticated(false)}
                    className="text-slate hover:text-red-400 text-sm font-mono"
                >
                    Logout
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mb-8">
                <button
                    onClick={() => setActiveTab('contacts')}
                    className={`px-6 py-3 rounded-lg font-mono transition-colors ${activeTab === 'contacts'
                        ? 'bg-teal text-navy'
                        : 'bg-light-navy text-slate hover:text-teal'
                        }`}
                >
                    Contact Messages ({contacts.length})
                </button>
                <button
                    onClick={() => setActiveTab('connection')}
                    className={`px-6 py-3 rounded-lg font-mono transition-colors ${activeTab === 'connection'
                        ? 'bg-teal text-navy'
                        : 'bg-light-navy text-slate hover:text-teal'
                        }`}
                >
                    Connection Test
                </button>
            </div>

            {/* Contact Messages Tab */}
            {activeTab === 'contacts' && (
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-lightest-slate">
                            Contact Form Submissions
                        </h2>
                        <button
                            onClick={fetchContacts}
                            disabled={refreshing}
                            className="border border-teal text-teal py-2 px-4 rounded text-sm font-mono hover:bg-teal/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {refreshing ? (
                                <>
                                    <span className="animate-spin">↻</span> Refreshing...
                                </>
                            ) : (
                                'Refresh'
                            )}
                        </button>
                    </div>

                    {contacts.length === 0 ? (
                        <div className="bg-light-navy p-8 rounded-lg text-center border border-slate/20">
                            <p className="text-slate mb-2">No messages yet</p>
                            <p className="text-teal text-sm font-mono">
                                Messages from your contact form will appear here
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {contacts.map((contact) => (
                                <div
                                    key={contact._id}
                                    className="bg-light-navy p-6 rounded-lg border border-slate/20 hover:border-teal/30 transition-colors group"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-teal">{contact.name}</h3>
                                            <a
                                                href={`mailto:${contact.email}`}
                                                className="text-lightest-slate hover:text-teal transition-colors text-sm"
                                            >
                                                {contact.email}
                                            </a>
                                        </div>
                                        <div className="text-right flex flex-col items-end gap-2">
                                            <span className={`inline-block px-3 py-1 rounded text-xs font-mono bg-slate/20 text-slate`}>
                                                {formatDate(contact.createdAt)}
                                            </span>
                                            <button
                                                onClick={() => handleDeleteContact(contact._id)}
                                                className="text-red-400 text-xs font-mono hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                [Delete Message]
                                            </button>
                                        </div>
                                    </div>

                                    <div className="bg-navy p-4 rounded border-l-4 border-teal">
                                        <p className="text-slate whitespace-pre-wrap">{contact.message}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Connection Test Tab */}
            {activeTab === 'connection' && (
                <div>
                    <div className={`p-6 rounded-lg mb-8 ${connectionStatus.includes('✅') ? 'bg-green-500/10 border border-green-500' :
                        connectionStatus.includes('❌') ? 'bg-red-500/10 border border-red-500' :
                            'bg-yellow-500/10 border border-yellow-500'
                        }`}>
                        <h2 className="text-2xl font-bold text-white mb-2">{connectionStatus}</h2>
                        {error && <p className="text-red-400 font-mono text-sm">Error: {error}</p>}
                    </div>

                    <div className="bg-light-navy p-6 rounded-lg mb-8">
                        <h3 className="text-xl font-bold text-teal mb-4">Connection Details</h3>
                        <ul className="text-slate space-y-2 font-mono text-sm">
                            <li><span className="text-teal">Frontend:</span> {window.location.origin}</li>
                            <li><span className="text-teal">Backend:</span> {import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}</li>
                            <li><span className="text-teal">MongoDB:</span> {connectionStatus.includes('✅') ? 'Connected' : 'Unknown'}</li>
                        </ul>
                    </div>

                    {loading ? (
                        <div className="text-center text-slate">
                            <p>Loading projects from database...</p>
                        </div>
                    ) : (
                        <div>
                            <h3 className="text-2xl font-bold text-lightest-slate mb-4">
                                Projects from Database ({projects.length})
                            </h3>

                            {projects.length === 0 ? (
                                <div className="bg-light-navy p-8 rounded-lg text-center">
                                    <p className="text-slate mb-4">No projects found in database.</p>
                                    <p className="text-teal text-sm font-mono">
                                        You can add projects via MongoDB or create a POST endpoint.
                                    </p>
                                </div>
                            ) : (
                                <div className="grid gap-4">
                                    {projects.map((project) => (
                                        <div key={project._id} className="bg-light-navy p-6 rounded-lg border border-slate/20">
                                            <h4 className="text-xl font-bold text-teal mb-2">{project.title}</h4>
                                            <p className="text-slate mb-3">{project.description}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {project.technologies?.map((tech, i) => (
                                                    <span key={i} className="text-xs bg-navy px-2 py-1 rounded text-teal font-mono">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    <div className="mt-8 p-6 bg-light-navy rounded-lg">
                        <h3 className="text-xl font-bold text-teal mb-4">Quick Actions</h3>
                        <button
                            onClick={testConnection}
                            className="border border-teal text-teal py-2 px-6 rounded text-sm font-mono hover:bg-teal/10 transition-colors"
                        >
                            Retry Connection
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
