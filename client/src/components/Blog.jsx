import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Calendar, Tag } from 'lucide-react';

const posts = [
    {
        id: 1,
        title: "The Art of Debugging Complex Systems",
        date: "Dec 01, 2024",
        readTime: "6 min read",
        tags: ["Debugging", "Engineering"],
        excerpt: "Moving beyond console.log: A systematic approach to observability, error boundaries, and root cause analysis in distributed systems.",
        link: "/blog/debugging-complex-systems"
    },
                            
    {
        id: 2,
        title: "AWS Cost Optimization: Lessons from Production",
        date: "Nov 03, 2024",
        readTime: "7 min read",
        tags: ["AWS", "DevOps"],
        excerpt: "Practical strategies for managing EC2 instances and leveraging S3 lifecycles to reduce cloud infrastructure costs by up to 40%.",
        link: "/blog/aws-cost-optimization"
    },
    {
        id: 3,
        title: "Why I Chose MERN for Scalable Applications",
        date: "Oct 12, 2024",
        readTime: "5 min read",
        tags: ["Architecture", "MERN"],
        excerpt: "Exploring the non-blocking architecture of Node.js and how MongoDB's flexibility powers rapid iteration in high-growth startups.",
        link: "/blog/why-mern-stack"
    }
];

const Blog = () => {
    return (
        <section id="blog" className="py-12 md:py-24 px-4 md:px-6 lg:px-12 max-w-7xl mx-auto">
            <div className="flex items-center mb-12 md:mb-16">
                <span className="text-teal font-mono text-xl md:text-xl mr-2 md:mr-4">06.</span>
                <h2 className="text-3xl md:text-3xl font-bold text-lightest-slate">Latest Insights</h2>
                <div className="h-px bg-slate/30 flex-grow ml-2 md:ml-4 max-w-xs"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {posts.map((post, index) => (
                    <motion.article
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group bg-light-navy rounded-xl overflow-hidden hover:-translate-y-2 transition-all duration-300 border border-transparent hover:border-teal/30 flex flex-col h-full shadow-lg"
                    >
                        {/* Decorative Header (could be an image in future) */}
                        <div className="h-2 bg-gradient-to-r from-teal to-blue-500 w-full group-hover:h-3 transition-all duration-300"></div>

                        <div className="p-6 md:p-8 flex flex-col flex-grow">
                            <div className="flex justify-between items-center text-xs md:text-xs font-mono text-slate mb-4">
                                <div className="flex items-center">
                                    <Calendar size={12} className="mr-2" />
                                    {post.date}
                                </div>
                                <div className="flex items-center">
                                    <Clock size={12} className="mr-2" />
                                    {post.readTime}
                                </div>
                            </div>

                            <h3 className="text-xl md:text-xl font-bold text-lightest-slate mb-4 group-hover:text-teal transition-colors">
                                <Link to={post.link} className="focus:outline-none">
                                    <span className="absolute inset-0" aria-hidden="true" />
                                    {post.title}
                                </Link>
                            </h3>

                            <p className="text-slate text-base md:text-sm leading-relaxed mb-6 flex-grow">
                                {post.excerpt}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {post.tags.map(tag => (
                                    <span key={tag} className="flex items-center text-xs font-mono text-teal bg-teal/10 px-2 py-1 rounded">
                                        <Tag size={10} className="mr-1" />
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <Link
                                to={post.link}
                                className="mt-auto pt-6 border-t border-slate/10 flex items-center text-teal font-mono text-sm md:text-xs group-hover:translate-x-2 transition-transform duration-300"
                            >
                                Read Article <ArrowRight size={14} className="ml-2" />
                            </Link>
                        </div>
                    </motion.article>
                ))}
            </div>
        </section>
    );
};

export default Blog;
