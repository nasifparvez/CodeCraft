import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProjectCard from './ProjectCard';

function Projects() {
    const projects = useSelector((state) => state.projects?.projects);
    const searchTerm = useSelector((state) => state.searchTerm?.searchTerm ? state.searchTerm?.searchTerm : "");
    const [filteredProjects, setFilteredProjects] = useState([]);

    useEffect(() => {
        if (searchTerm?.length > 0) {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            const filtered = projects.filter(project => {
                const lowerCaseTitle = project.title.toLowerCase();
                return lowerCaseTitle.includes(lowerCaseSearchTerm);
            });
            setFilteredProjects(filtered);
        } else {
            setFilteredProjects([]);
        }
    }, [searchTerm, projects]);

    const projectsToRender = searchTerm ? filteredProjects : projects;

    return (
        <div className='w-full py-6 flex items-center justify-center gap-6 flex-wrap'>
            {projectsToRender.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
            ))}
        </div>
    );
}

export default Projects;
