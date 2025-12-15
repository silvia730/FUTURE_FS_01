import React from 'react';

const Blog = () => {
    const posts = [
        { title: "Why I Chose MERN for Scalable Applications", date: "Oct 12, 2025", tags: ["Architecture", "MERN"] },
        { title: "AWS Cost Optimization: Lessons from Production", date: "Nov 03, 2025", tags: ["AWS", "DevOps"] },
        { title: "The Art of Debugging Complex Systems", date: "Dec 01, 2025", tags: ["Debugging", "Engineering"] }
    ];

    return (
        <div className="pt-32 px-8 max-w-4xl mx-auto min-h-screen">
            <h1 className="text-4xl font-bold text-lightest-slate mb-12">Technical Writing</h1>
            <div className="space-y-8">
                {posts.map((post, i) => (
                    <div key={i} className="border-b border-light-navy pb-8 hover:bg-light-navy/30 p-4 -mx-4 rounded transition-colors cursor-pointer">
                        <div className="flex justify-between items-baseline mb-2">
                            <h2 className="text-2xl font-bold text-light-slate hover:text-teal">{post.title}</h2>
                            <span className="font-mono text-sm text-slate">{post.date}</span>
                        </div>
                        <div className="flex space-x-2">
                            {post.tags.map(tag => (
                                <span key={tag} className="text-xs font-mono text-teal border border-teal rounded-full px-2 py-1">{tag}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Blog;
