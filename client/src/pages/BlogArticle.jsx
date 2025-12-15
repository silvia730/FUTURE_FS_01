import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';

const articles = {
    'debugging-complex-systems': {
        id: 1,
        title: "The Art of Debugging Complex Systems",
        date: "Dec 01, 2025",
        readTime: "6 min read",
        tags: ["Debugging", "Engineering"],
        content: `
# The Art of Debugging Complex Systems

Debugging is more than just finding and fixing errors—it's a detective's journey through the intricate maze of code, logic, and system interactions. After years of debugging everything from MERN stack applications to AWS infrastructure issues, I've learned that **systematic thinking beats random console.logs every time**.

## Beyond Console.log

We've all been there: frantically adding console.log statements everywhere, hoping to catch that elusive bug. While console logging has its place, mature debugging requires a more sophisticated approach.

### The Three Pillars of Effective Debugging:

**1. Observability First**
- Implement structured logging with Winston or similar tools
- Use log levels appropriately (DEBUG, INFO, WARN, ERROR)
- Include context: timestamps, request IDs, user actions
- Set up monitoring dashboards (Grafana, CloudWatch)

**2. Error Boundaries**
In React applications, error boundaries are your first line of defense:
- Catch errors in component trees
- Display fallback UIs gracefully
- Log errors to monitoring services
- Prevent entire app crashes

**3. Root Cause Analysis**
Ask "why" five times. When debugging a production issue:
- What was the user doing?
- What changed recently?
- What does the data flow look like?
- Are there any dependencies that failed?
- What assumptions did we make?

## Distributed Systems: A Different Beast

Debugging distributed systems introduces unique challenges:
- **Network latency** can mask timing issues
- **State inconsistency** across services
- **Cascading failures** from one service to another

### My Debugging Toolkit:
- **Distributed tracing**: Jaeger or AWS X-Ray
- **Request correlation IDs**: Track requests across services
- **Circuit breakers**: Prevent cascading failures
- **Health checks**: Know when services are struggling

## The Defensive Programming Mindset

Instead of asking "how do I make this succeed?", I ask **"how could this fail?"**

This mindset leads to:
- Input validation at every boundary
- Graceful degradation when services are unavailable
- Comprehensive error handling
- Meaningful error messages (for both users and developers)

## Production War Stories

One of my most challenging bugs was a race condition in a MongoDB aggregation pipeline that only appeared under high load. The symptoms were subtle: occasionally missing data in reports.

The fix? Adding proper indexing and implementing optimistic concurrency control. But the lesson was invaluable: **performance issues in development amplify exponentially in production**.

## Key Takeaways

1. **Build observability from day one** - Don't wait for bugs to add logging
2. **Reproduce reliably** - If you can't reproduce it, you can't fix it
3. **Test edge cases** - Most bugs hide in the corners
4. **Document your fixes** - Future you will thank present you
5. **Learn from every bug** - Each one teaches you something about your system

Debugging is both an art and a science. The more systematic your approach, the faster you'll find those needle-in-haystack bugs that keep production systems running smoothly.

---

*Have a debugging war story or technique to share? I'd love to hear about it! Connect with me through the contact form.*
        `
    },
    'aws-cost-optimization': {
        id: 2,
        title: "AWS Cost Optimization: Lessons from Production",
        date: "Nov 03, 2025",
        readTime: "7 min read",
        tags: ["AWS", "DevOps"],
        content: `
# AWS Cost Optimization: Lessons from Production

When I first deployed applications to AWS, I was amazed by the power and scalability. Then I got my first monthly bill—and learned very quickly that **cloud costs can spiral out of control** if you're not careful.

After implementing cost optimization strategies across multiple projects, I've reduced infrastructure costs by up to 40% without sacrificing performance or reliability. Here's what I learned.

## The Cost Surprise

Many developers focus on getting their application running, treating AWS as "someone else's problem." But whether you're working at a startup or enterprise, **wasteful cloud spending directly impacts the business**.

### Common Cost Culprits:

1. **Over-provisioned resources** - Running larger instances than needed
2. **Idle resources** - Development servers running 24/7
3. **Unoptimized storage** - Keeping old snapshots and logs forever
4. **Data transfer costs** - Moving data between regions unnecessarily
5. **No reserved capacity** - Paying on-demand prices for predictable workloads

## Strategy 1: Right-Size Your EC2 Instances

**The Problem**: We often start with larger instances "just to be safe" and never scale down.

**The Solution**:
- Use AWS Compute Optimizer to analyze actual usage
- Start smaller and scale up only when needed
- Consider burstable instances (t3/t4g) for variable workloads
- Monitor CPU, memory, and network utilization

**Real Example**: We moved a low-traffic API from t3.medium ($30/month) to t3.micro ($7.50/month) saving $270/year per instance. Multiply by 5 instances = $1,350/year saved.

## Strategy 2: Implement S3 Lifecycle Policies

**The Problem**: S3 storage seems cheap until you accumulate terabytes of old data.

**The Solution**:
\`\`\`json
{
  "Rules": [
    {
      "Id": "Archive old logs",
      "Status": "Enabled",
      "Transitions": [
        {
          "Days": 30,
          "StorageClass": "STANDARD_IA"
        },
        {
          "Days": 90,
          "StorageClass": "GLACIER"
        }
      ],
      "Expiration": {
        "Days": 365
      }
    }
  ]
}
\`\`\`

**Results**: Moving infrequently accessed data to cheaper storage tiers can save 50-90% on storage costs.

## Strategy 3: Use Reserved Instances and Savings Plans

For workloads running 24/7, reserved capacity offers dramatic savings:
- **1-year commitment**: ~30-40% savings
- **3-year commitment**: ~50-60% savings

**Pro tip**: Start with Convertible Reserved Instances for flexibility.

## Strategy 4: Auto-Scaling for Variable Loads

Instead of running peak capacity 24/7:
- Scale down during off-hours
- Use target tracking scaling policies
- Set minimum and maximum instance counts
- Consider Spot Instances for fault-tolerant workloads

## Strategy 5: Monitor Everything

**Set up cost alerts**:
- Daily spending notifications
- Budget thresholds
- Anomaly detection

**Use Cost Explorer**:
- Identify cost trends
- Find unused resources
- Tag resources by project/team

## The 40% Reduction Breakdown

Here's how I achieved 40% cost savings on a real project:
- EC2 right-sizing: 15% savings
- S3 lifecycle policies: 8% savings
- Reserved Instances: 12% savings
- Deleting unused resources: 5% savings

## Common Pitfalls to Avoid

1. **Don't delete resources blindly** - Understand what everything does first
2. **Test cost changes in staging** - Some optimizations can impact performance
3. **Consider data transfer costs** - Moving data isn't free
4. **Factor in management overhead** - Sometimes slightly higher costs = much less complexity

## Tools I Use

- **AWS Cost Explorer**: Visualize spending patterns
- **CloudWatch**: Monitor resource utilization  
- **AWS Budgets**: Set spending limits and alerts
- **Third-party tools**: CloudHealth, CloudCheckr for advanced analytics

## The Bottom Line

Cost optimization isn't a one-time task—it's an ongoing practice. Set aside time monthly to:
- Review your AWS bill
- Identify cost anomalies
- Check for unused resources
- Optimize based on actual usage patterns

**Remember**: Every dollar saved on infrastructure is a dollar that can be invested in building better features for users.

---

*Want to discuss AWS cost optimization strategies? Let's connect!*
        `
    },
    'why-mern-stack': {
        id: 3,
        title: "Why I Chose MERN for Scalable Applications",
        date: "Oct 12, 2025",
        readTime: "5 min read",
        tags: ["Architecture", "MERN"],
        content: `
# Why I Chose MERN for Scalable Applications

After building applications with various tech stacks—from traditional PHP/MySQL to modern frameworks—I keep coming back to the **MERN stack** (MongoDB, Express, React, Node.js) for scalable, high-growth applications. Here's why.

## The Non-Blocking Advantage

**JavaScript everywhere** isn't just about convenience—it's about performance.

Node.js's event-driven, non-blocking I/O model excels at handling concurrent requests:
- Thousands of simultaneous connections
- Minimal memory footprint per connection
- Perfect for real-time features (WebSockets, SSE)

### Real-World Impact:
A typical PHP/Apache setup can handle ~100-200 concurrent connections before struggling. Node.js? **Tens of thousands** on the same hardware.

## MongoDB: Flexibility in a Changing World

Startups pivot. Requirements change. MongoDB's schema flexibility is a superpower:

**Traditional SQL approach**:
\`\`\`sql
-- Oh no, we need to add a new field
ALTER TABLE users ADD COLUMN preferences JSON;
-- Migration headaches for millions of rows
\`\`\`

**MongoDB approach**:
\`\`\`javascript
// Just start using the new field
await User.updateOne(
  { _id: userId },
  { $set: { preferences: { theme: 'dark' } } }
);
\`\`\`

### When MongoDB Shines:
- Rapidly evolving data models
- Varying document structures (user profiles, content management)
- Hierarchical data (nested comments, categories)
- High write throughput

### When to Reconsider:
- Complex multi-table joins
- Strict ACID requirements across documents
- Financial transactions

## React: Component-Based Thinking

React transformed how I think about UIs:

**Before React**:
- Spaghetti jQuery selectors
- Manually managing DOM updates
- State scattered everywhere

**With React**:
- Reusable, testable components
- Predictable state management
- Virtual DOM for performance

### The Power of Composition:
\`\`\`jsx
<DashboardLayout>
  <Header user={currentUser} />
  <Sidebar notifications={unreadCount} />
  <MainContent>
    <DataTable data={projects} />
  </MainContent>
</DashboardLayout>
\`\`\`

Each component is:
- **Isolated**: Easier to reason about
- **Reusable**: Use across multiple pages
- **Testable**: Unit test in isolation

## Express: Minimalist but Powerful

Express doesn't impose opinions—it provides flexibility:

\`\`\`javascript
// Clean, readable routing
app.post('/api/projects', authenticate, validate, async (req, res) => {
  const project = await Project.create(req.body);
  res.status(201).json(project);
});
\`\`\`

**Middleware pattern** = Composable logic:
- Authentication
- Validation
- Error handling
- Logging
- Rate limiting

## The JavaScript Ecosystem

**npm** is the largest package ecosystem:
- 2+ million packages
- Solutions for almost any problem
- Active community and frequent updates

**But beware**: Package fatigue and security vulnerabilities are real concerns. I'm selective about dependencies.

## MERN in Production: What I've Built

**E-commerce Platform**:
- 10K+ daily active users
- Real-time inventory updates
- Payment processing integration
- MongoDB for flexible product catalogs

**SaaS Dashboard**:
- Real-time analytics with Socket.io
- Complex aggregation pipelines
- Role-based access control
- Responsive React UI

**Project Management Tool**:
- Kanban boards with drag-and-drop
- WebSocket for live collaboration
- File uploads to AWS S3
- MongoDB for nested task hierarchies

## When MERN Might Not Be the Answer

**Choose something else if you need**:
- Extremely complex relational queries (PostgreSQL)
- CPU-intensive processing (Go, Rust)
- Simple static sites (Next.js, Gatsby)
- Mature enterprise ecosystem (Java Spring)

## The Learning Curve

MERN requires understanding:
- Async/await patterns
- NoSQL data modeling
- React component lifecycle
- REST/GraphQL API design

**But the payoff**: Unified language, fast iteration, strong job market.

## My MERN Best Practices

1. **Structure matters**: Use clear folder organization (MVC pattern)
2. **Validation everywhere**: Never trust client-side validation alone
3. **Error handling**: Centralized error middleware in Express
4. **Security**: Helmet.js, rate limiting, input sanitization
5. **Testing**: Jest for backend, React Testing Library for frontend
6. **Performance**: Indexes in MongoDB, lazy loading in React

## The Verdict

MERN isn't perfect for every project, but for **startups and products that need to move fast while maintaining scalability**, it's hard to beat.

The ability to:
- Iterate quickly
- Scale horizontally
- Use one language across stack
- Tap into vibrant ecosystem

Makes MERN my go-to choice for modern web applications.

---

*Building with MERN? I'd love to hear about your experience. Let's connect!*
        `
    }
};

const BlogArticle = () => {
    const { slug } = useParams();
    const article = articles[slug];

    if (!article) {
        return (
            <div className="min-h-screen bg-navy flex items-center justify-center px-4">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-lightest-slate mb-4">Article Not Found</h1>
                    <Link to="/" className="text-teal hover:underline">← Back to Home</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-navy pt-32 pb-20 px-4">
            <article className="max-w-4xl mx-auto">
                {/* Back Button */}
                <Link
                    to="/"
                    className="inline-flex items-center text-teal hover:text-lightest-slate transition-colors mb-8 text-lg"
                >
                    <ArrowLeft size={20} className="mr-2" />
                    Back to Portfolio
                </Link>

                {/* Article Header */}
                <header className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-lightest-slate mb-6">
                        {article.title}
                    </h1>

                    <div className="flex flex-wrap gap-4 text-slate font-mono text-sm mb-6">
                        <div className="flex items-center">
                            <Calendar size={16} className="mr-2 text-teal" />
                            {article.date}
                        </div>
                        <div className="flex items-center">
                            <Clock size={16} className="mr-2 text-teal" />
                            {article.readTime}
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {article.tags.map(tag => (
                            <span
                                key={tag}
                                className="flex items-center text-sm font-mono text-teal bg-teal/10 px-3 py-1 rounded"
                            >
                                <Tag size={12} className="mr-2" />
                                {tag}
                            </span>
                        ))}
                    </div>
                </header>

                {/* Article Content */}
                <div className="prose prose-invert prose-lg max-w-none">
                    <div className="text-slate leading-relaxed space-y-6">
                        {article.content.split('\n\n').map((paragraph, index) => {
                            // Handle headings
                            if (paragraph.startsWith('# ')) {
                                return (
                                    <h1 key={index} className="text-4xl font-bold text-lightest-slate mt-12 mb-6">
                                        {paragraph.replace('# ', '')}
                                    </h1>
                                );
                            }
                            if (paragraph.startsWith('## ')) {
                                return (
                                    <h2 key={index} className="text-3xl font-bold text-lightest-slate mt-10 mb-5">
                                        {paragraph.replace('## ', '')}
                                    </h2>
                                );
                            }
                            if (paragraph.startsWith('### ')) {
                                return (
                                    <h3 key={index} className="text-2xl font-bold text-light-slate mt-8 mb-4">
                                        {paragraph.replace('### ', '')}
                                    </h3>
                                );
                            }

                            // Handle code blocks
                            if (paragraph.startsWith('```')) {
                                const code = paragraph.replace(/```\w*\n?|\n?```/g, '');
                                return (
                                    <pre key={index} className="bg-light-navy p-6 rounded-lg overflow-x-auto border border-teal/20">
                                        <code className="text-sm text-lightest-slate font-mono">{code}</code>
                                    </pre>
                                );
                            }

                            // Handle bold text
                            const formattedText = paragraph.split('**').map((part, i) =>
                                i % 2 === 1 ? <strong key={i} className="text-teal font-bold">{part}</strong> : part
                            );

                            // Handle horizontal rules
                            if (paragraph.startsWith('---')) {
                                return <hr key={index} className="border-slate/30 my-12" />;
                            }

                            // Handle list items
                            if (paragraph.startsWith('- ')) {
                                return (
                                    <li key={index} className="text-lg leading-relaxed ml-6 list-disc list-inside">
                                        {formattedText}
                                    </li>
                                );
                            }

                            // Regular paragraphs
                            return paragraph.trim() && (
                                <p key={index} className="text-lg leading-relaxed">
                                    {formattedText}
                                </p>
                            );
                        })}
                    </div>
                </div>

                {/* Back to Portfolio CTA */}
                <div className="mt-16 pt-8 border-t border-slate/30">
                    <Link
                        to="/"
                        className="inline-flex items-center text-teal hover:text-lightest-slate transition-colors text-lg"
                    >
                        <ArrowLeft size={20} className="mr-2" />
                        Back to Portfolio
                    </Link>
                </div>
            </article>
        </div>
    );
};

export default BlogArticle;
