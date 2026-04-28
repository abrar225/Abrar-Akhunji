import React from 'react';
import { ArrowUpRight, Github, CheckCircle2 } from 'lucide-react';

const ProjectCard = ({ project, theme }) => (
  <div className="w-[85vw] md:w-[60vw] flex-shrink-0 snap-center min-h-[500px] h-auto md:h-[75vh]">
    <div className={`group relative h-full rounded-3xl overflow-hidden border ${theme === 'dark' ? 'border-white/10 bg-black/40' : 'border-black/5 bg-white/60'} backdrop-blur-md transition-all duration-500 hover:border-purple-500/30 shadow-2xl`}>
      <div className="grid md:grid-cols-2 h-full">
        <div className={`p-6 md:p-8 lg:p-10 flex flex-col justify-between relative z-20 ${theme === 'dark' ? 'bg-black/20' : 'bg-white/20'} overflow-y-auto custom-scrollbar`}>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full border ${theme === 'dark' ? 'border-white/10 bg-white/5 text-purple-300' : 'border-black/5 bg-black/5 text-purple-600'} text-[10px] font-mono uppercase tracking-wider`}>{project.category}</span>
              <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} font-mono`}>{project.year}</span>
            </div>
            <h3 className={`text-2xl md:text-3xl lg:text-4xl font-light ${theme === 'dark' ? 'text-white' : 'text-black'} mb-4 leading-tight`}>{project.title}</h3>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm leading-relaxed mb-6`}>{project.description}</p>
            <ul className="space-y-3 mb-6">
              {project.features.map((feature, idx) => (
                <li key={idx} className={`flex items-start gap-3 text-xs md:text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <CheckCircle2 size={14} className="text-purple-500 mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className={`text-[10px] font-mono ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} uppercase mb-3`}>Tech Stack</h4>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map(t => <span key={t} className={`px-2 py-1 text-[10px] border ${theme === 'dark' ? 'border-white/10 text-gray-400' : 'border-black/10 text-gray-500'} rounded`}>{t}</span>)}
            </div>
            <div className="flex gap-4">
              {project.demo ? (
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 text-xs md:text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-black'} border-b border-purple-500 pb-1 hover:text-purple-400 transition-colors`}>Live Demo <ArrowUpRight size={14} /></a>
              ) : (
                <span className="flex items-center gap-2 text-xs md:text-sm font-bold text-gray-400 cursor-not-allowed">Live Demo (Soon)</span>
              )}

              {project.github ? (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 text-xs md:text-sm font-bold ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'} hover:text-purple-500 transition-colors`}><Github size={14} /> Source</a>
              ) : (
                <span className="flex items-center gap-2 text-xs md:text-sm font-bold text-gray-400 cursor-not-allowed"><Github size={14} /> Source (Soon)</span>
              )}
            </div>
          </div>
        </div>
        <div className="relative h-[250px] md:h-full overflow-hidden order-first md:order-last">
          <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gradient-to-b from-transparent to-black/80 md:bg-gradient-to-l' : 'bg-gradient-to-b from-transparent to-white/40 md:bg-gradient-to-l'} z-10`} />
          <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
        </div>
      </div>
    </div>
  </div>
);

export default ProjectCard;
