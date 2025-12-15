const mongoose = require('mongoose');

const decisionSchema = new mongoose.Schema({
    topic: String,
    decision: String,
    reason: String
});

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    tagline: String,
    description: {
        type: String,
        required: true
    },
    fullContent: String, // Markdown content for deep dive
    technologies: [String],
    tags: [String],
    githubUrl: String,
    liveUrl: String,
    imageUrl: String,
    featured: {
        type: Boolean,
        default: false
    },
    category: {
        type: String,
        enum: ['MERN', 'AWS', 'Frontend', 'Backend', 'Fullstack'],
        default: 'Fullstack'
    },
    caseStudy: {
        problem: String,
        solution: String,
        challenges: [String],
        metrics: {
            performance: String,
            impact: String
        }
    },
    thinkingProcess: {
        decisions: [decisionSchema],
        architectureDiagram: String, // URL or description
        lessonsLearned: [String]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Project', projectSchema);
