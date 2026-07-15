import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import { isPostRead } from '../../lib/blogUtils';

const BRANCH_COLORS = {
  'LLMs': { bg: 'rgba(255, 90, 31, 0.1)', border: 'rgba(255, 90, 31, 0.3)', text: '#FF5A1F', glow: 'rgba(255, 90, 31, 0.2)' },
  'Computer Vision': { bg: 'rgba(31, 111, 92, 0.1)', border: 'rgba(31, 111, 92, 0.3)', text: '#1F6F5C', glow: 'rgba(31, 111, 92, 0.2)' },
  'Web Dev': { bg: 'rgba(59, 91, 219, 0.1)', border: 'rgba(59, 91, 219, 0.3)', text: '#3B5BDB', glow: 'rgba(59, 91, 219, 0.2)' },
  'DevOps': { bg: 'rgba(160, 50, 90, 0.1)', border: 'rgba(160, 50, 90, 0.3)', text: '#A0325A', glow: 'rgba(160, 50, 90, 0.2)' },
  'General': { bg: 'rgba(201, 212, 65, 0.1)', border: 'rgba(201, 212, 65, 0.3)', text: '#C9D441', glow: 'rgba(201, 212, 65, 0.2)' },
};

function getColor(branch) {
  return BRANCH_COLORS[branch] || BRANCH_COLORS['General'];
}

function TreeNode({ blog, color, isUnlocked, index }) {
  const read = isPostRead(blog.slug);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="relative"
    >
      {/* Connector line */}
      {index > 0 && (
        <div
          className="absolute -top-6 left-6 w-0.5 h-6"
          style={{ background: `linear-gradient(to bottom, transparent, ${color.border})` }}
        />
      )}

      {isUnlocked ? (
        <Link to={`/blog/${blog.slug}`} className="block group">
          <div
            className="relative p-4 rounded-xl border transition-all duration-300 group-hover:scale-[1.02]"
            style={{
              backgroundColor: read ? color.bg : 'var(--color-surface)',
              borderColor: read ? color.border : 'var(--color-line)',
              boxShadow: read ? `0 0 20px ${color.glow}` : 'none',
            }}
          >
            {/* Status icon */}
            <div className="absolute -left-3 top-4">
              {read ? (
                <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: color.text }}>
                  <CheckCircle2 size={14} className="text-canvas" />
                </div>
              ) : (
                <div className="w-6 h-6 rounded-full bg-surface border-2 flex items-center justify-center" style={{ borderColor: color.border }}>
                  <Zap size={10} style={{ color: color.text }} />
                </div>
              )}
            </div>

            <div className="pl-4">
              <p className="text-[10px] font-mono uppercase tracking-widest mb-1" style={{ color: color.text }}>
                Level {blog.techTree?.level || 1}
              </p>
              <h3 className="text-sm font-medium text-fg group-hover:text-accent transition-colors tracking-tight line-clamp-1">
                {blog.title}
              </h3>
              <p className="text-xs text-muted mt-1 line-clamp-1">{blog.description}</p>
              <div className="flex items-center gap-2 mt-2">
                {blog.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="text-[9px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded" style={{ backgroundColor: color.bg, color: color.text }}>
                    {tag}
                  </span>
                ))}
                <ChevronRight size={12} className="text-muted ml-auto group-hover:text-accent transition-colors" />
              </div>
            </div>
          </div>
        </Link>
      ) : (
        <div className="relative p-4 rounded-xl border border-line bg-surface/50 opacity-50 cursor-not-allowed">
          <div className="absolute -left-3 top-4">
            <div className="w-6 h-6 rounded-full bg-elevated border border-line flex items-center justify-center">
              <Lock size={10} className="text-faint" />
            </div>
          </div>
          <div className="pl-4">
            <p className="text-[10px] font-mono uppercase tracking-widest text-faint mb-1">Locked</p>
            <h3 className="text-sm font-medium text-faint tracking-tight line-clamp-1">{blog.title}</h3>
            <p className="text-xs text-faint/60 mt-1">Read prerequisites to unlock</p>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default function TechTree({ blogs }) {
  const [expandedBranch, setExpandedBranch] = useState(null);

  const branches = useMemo(() => {
    const grouped = {};
    const blogsWithTree = blogs.filter((b) => b.techTree);
    const blogsWithoutTree = blogs.filter((b) => !b.techTree);

    for (const blog of blogsWithTree) {
      const branch = blog.techTree.branch || 'General';
      if (!grouped[branch]) grouped[branch] = [];
      grouped[branch].push(blog);
    }

    // Sort each branch by level
    for (const branch in grouped) {
      grouped[branch].sort((a, b) => (a.techTree.level || 0) - (b.techTree.level || 0));
    }

    // Add non-tree blogs to "General"
    if (blogsWithoutTree.length > 0) {
      if (!grouped['General']) grouped['General'] = [];
      grouped['General'].push(...blogsWithoutTree);
    }

    return grouped;
  }, [blogs]);

  const branchNames = Object.keys(branches);

  // Check if a blog is "unlocked" (all prerequisites are read)
  function checkUnlocked(blog) {
    if (!blog.techTree?.requires || blog.techTree.requires.length === 0) return true;
    return blog.techTree.requires.every((req) => isPostRead(req));
  }

  return (
    <div className="space-y-4">
      {branchNames.map((branch) => {
        const color = getColor(branch);
        const branchBlogs = branches[branch];
        const isExpanded = expandedBranch === branch || branchNames.length <= 3;
        const completedCount = branchBlogs.filter((b) => isPostRead(b.slug)).length;

        return (
          <motion.div
            key={branch}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-line bg-surface/30 overflow-hidden"
          >
            {/* Branch Header */}
            <button
              onClick={() => setExpandedBranch(expandedBranch === branch ? null : branch)}
              className="w-full flex items-center justify-between p-4 md:p-5 hover:bg-surface/50 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: color.text, boxShadow: `0 0 8px ${color.glow}` }}
                />
                <h3 className="text-lg font-display font-medium text-fg tracking-tight">{branch}</h3>
                <span className="text-xs font-mono text-faint">
                  {completedCount}/{branchBlogs.length}
                </span>
              </div>

              {/* Progress bar */}
              <div className="flex items-center gap-3">
                <div className="hidden md:block w-24 h-1.5 bg-elevated rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: color.text }}
                    initial={{ width: 0 }}
                    animate={{ width: `${branchBlogs.length > 0 ? (completedCount / branchBlogs.length) * 100 : 0}%` }}
                    transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                  />
                </div>
                <motion.div
                  animate={{ rotate: isExpanded ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight size={16} className="text-muted" />
                </motion.div>
              </div>
            </button>

            {/* Branch Nodes */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 pl-8 space-y-8">
                    {branchBlogs.map((blog, i) => (
                      <TreeNode
                        key={blog.slug}
                        blog={blog}
                        color={color}
                        isUnlocked={checkUnlocked(blog)}
                        index={i}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
