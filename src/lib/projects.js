import data from '../data/portfolio.json';

/** @typedef {{slug:string,title:string,status:string,summary:string,problem:string,contribution:string,image:string,imageAlt:string,layers:Array<{title:string,detail:string}>,evidence:Array<{label:string,url?:string,detail:string}>}} Project */
export const projects = data.projects;
export const featuredProjects = projects.filter((p) => p.featured);
export const archiveProjects = projects.filter((p) => !p.featured);
export const projectPath = (slug) => `/work/${slug}/`;
export const findProject = (slug) => projects.find((p) => p.slug === slug);
export const selectedProject = (slug) => featuredProjects.find((p) => p.slug === slug) || featuredProjects[0];
export const RESUME = 'https://drive.google.com/file/d/1dV5ukxF-i-9JcWCaxsbQljNwL7Dni8Jc/view?usp=sharing';
export const EMAIL = 'abrar@abrarakhunji.com';
