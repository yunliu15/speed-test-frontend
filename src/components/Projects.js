import {useState, useEffect} from 'react';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Project from './Project';

const Projects = () => {
    const [projects, setPorjects] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const controller = new AbortController();
    const deleteProject = async (id) => {
        try {
            const result = await axiosPrivate.delete(
                '/projects', 
                {
                    data: JSON.stringify({ id }),
                    signal: controller.signal
                }
                );
            const newProjects = projects.filter(p => p._id !== result.data._id)
            setPorjects(newProjects);
        } catch(err) {
            console.error(err);
        }
    }

    const createProject = async (name) => {
        try {
            const result = await axiosPrivate.post(
                '/projects', 
                {
                    data: JSON.stringify({ projectName: name }),
                    signal: controller.signal
                }
                );
            const newProjects = projects.filter(p => p._id !== result.data._id)
            setPorjects(newProjects);
        } catch(err) {
            console.error(err);
        }
    } 

    useEffect(() => {
        let ignore = false;
        const getProjects = async () => {
            try {
                const result = await axiosPrivate.get('/projects');
                !ignore && setPorjects(result.data);
            } catch(err) {
                console.error(err);
            }
        }
        getProjects();
        
        return () => {
            ignore = true;
            controller.abort();
        }

    }, [])
    return ( 
        <ul>
        {
            projects.map(p => {
                return (
                    <li key={p.projectName}>
                        <Project 
                        project={p}
                        handleDelete={deleteProject}
                        />
                    </li>
                )
            })
        }
        </ul>
     );
}
 
export default Projects;