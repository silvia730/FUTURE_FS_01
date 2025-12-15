import React, { useState } from 'react';
import { contactAPI } from '../services/api';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: '', message: '' });

        try {
            const response = await contactAPI.send(formData);

            if (response.success) {
                setStatus({
                    type: 'success',
                    message: 'Message sent successfully! I\'ll get back to you soon.'
                });
                // Clear form
                setFormData({ name: '', email: '', message: '' });
            }
        } catch (error) {
            setStatus({
                type: 'error',
                message: error.response?.data?.message || 'Failed to send message. Please try emailing me directly.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="py-12 md:py-24 px-4 md:px-8 max-w-4xl mx-auto text-center">
            <p className="text-teal font-mono text-sm md:text-base mb-3 md:mb-4">07. What's Next?</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-lightest-slate mb-4 md:mb-6">Get In Touch</h2>
            <p className="text-slate text-base md:text-lg mb-8 md:mb-12 max-w-xl mx-auto leading-relaxed">
                I'm currently looking for new opportunities to build scalable systems. Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>

            <div className="grid md:grid-cols-2 gap-4 md:gap-8 text-left max-w-2xl mx-auto mb-8 md:mb-12">
                <div className="bg-light-navy p-5 md:p-6 rounded border border-teal/10">
                    <h3 className="text-white font-bold mb-2 text-base md:text-lg">Collaboration Style</h3>
                    <p className="text-slate text-sm md:text-base leading-relaxed">
                        I value clear communication, detailed documentation, and iterative feedback. I thrive in environments that prioritize code quality and user impact.
                    </p>
                </div>
                <div className="bg-light-navy p-5 md:p-6 rounded border border-teal/10">
                    <h3 className="text-white font-bold mb-2 text-base md:text-lg">Response Time</h3>
                    <p className="text-slate text-sm md:text-base leading-relaxed">
                        I typically respond within 24 hours. For urgent inquiries, please mention "Urgent" in the subject line.
                    </p>
                </div>
            </div>


            {/* Status Message */}
            {status.message && (
                <div className={`max-w-2xl mx-auto mb-6 p-4 rounded-lg text-sm md:text-base ${status.type === 'success'
                    ? 'bg-green-500/10 border border-green-500 text-green-400'
                    : 'bg-red-500/10 border border-red-500 text-red-400'
                    }`}>
                    {status.message}
                </div>
            )}

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-8">
                <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
                    <div className="text-left">
                        <label htmlFor="name" className="block text-teal font-mono text-sm mb-2">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your Name"
                            className="w-full bg-light-navy border border-slate/20 text-lightest-slate text-base px-4 py-3 rounded focus:outline-none focus:border-teal transition-colors"
                            required
                            disabled={isSubmitting}
                        />
                    </div>
                    <div className="text-left">
                        <label htmlFor="email" className="block text-teal font-mono text-sm mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your.email@example.com"
                            className="w-full bg-light-navy border border-slate/20 text-lightest-slate text-base px-4 py-3 rounded focus:outline-none focus:border-teal transition-colors"
                            required
                            disabled={isSubmitting}
                        />
                    </div>
                </div>

                <div className="text-left mb-6">
                    <label htmlFor="message" className="block text-teal font-mono text-sm mb-2">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your message..."
                        rows="6"
                        className="w-full bg-light-navy border border-slate/20 text-lightest-slate text-base px-4 py-3 rounded focus:outline-none focus:border-teal transition-colors resize-none"
                        required
                        disabled={isSubmitting}
                    ></textarea>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto border border-teal text-teal py-3 md:py-4 px-8 md:px-10 rounded text-sm md:text-base font-mono hover:bg-teal/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
            </form>

            <a
                href="mailto:silvia@example.com"
                className="inline-block text-teal text-sm md:text-base font-mono hover:underline"
            >
                Or email me directly: silvianjeri730@gmail.com
            </a>
        </section>
    );
};

export default Contact;
