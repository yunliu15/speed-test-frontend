import {useState, useEffect} from 'react';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate } from 'react-router-dom';
import useMessage from '../hooks/useMessage';
import useModal from '../hooks/useModal';

const Projects = () => {
    const [projects, setPorjects] = useState([]);
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const [showCreate, setShowCreate] = useState(false);
    const [newProject, setNewProject] = useState('');
    const {setMessage} = useMessage();
    const {setShowModal, setModalContent, setModalCallback} = useModal();

    const deleteProject = async (id) => {
        try {
            const result = await axiosPrivate.delete(
                '/projects', 
                {
                    data: JSON.stringify({ id })
                }
                );
            if(result.data?._id) {
                const newProjects = projects.filter(p => p._id !== result.data._id)
                setPorjects(newProjects);
                setMessage({content: `${result.data.projectName} deleted`, type: 'success'});
                
            } else {
                setMessage({content: 'Project not found', type: 'error'})
            }
        } catch(err) {
            console.error(err);
            setMessage({content: err.message, type: 'error'})
        }
    }

    const createProject = async (e) => {
        e.preventDefault();
        try {
            const result = await axiosPrivate.post(
                '/projects', 
                JSON.stringify({ projectName: newProject })
                );
                if (result.data?._id) {
                    const newProjects = [...projects, result.data];
                    setPorjects(newProjects);
                    setShowCreate(false);
                    setMessage({content: `${result.data.projectName} created`, type: 'success'});
                    setNewProject('');
                } else {
                    console.log(result)
                }

            
        } catch(err) {
            console.error(err);
            if (err.response?.data?.message){
                setMessage({content: err.response.data.message, type: 'error'})
            } else {
                setMessage({content: err.message, type: 'error'})
            }
            
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
        }

    }, [axiosPrivate])
    return (
        <div>
            <button onClick={() => setShowCreate(true)}>Create a Project</button>

        {
            showCreate && (
                <form onSubmit={createProject}>                
                    <label htmlFor='create_project'>Create a Project</label>
                    <input
                    id='create_project'
                    value={newProject}
                    onChange={(e) => setNewProject(e.target.value)}
                    />                
                    <button type='submit'>Submit</button>
                    <button onClick={()=> {setNewProject(''); setShowCreate(false); setMessage({})} }>Cancel</button>
                </form>
            )
        }
        <ul>
        {
            projects.map(p => {
                return (
                    
                    <li key={p._id}>
                        <h2 
                        onClick={() => {
                            setMessage({});
                            navigate(`projects/${p._id}`, 
                            {state: {currentProject: p}})
                        }}
                        >
                            {p.projectName}
                        </h2>
                        <button onClick={() => {
                            setShowModal(true);
                            setModalContent(
                                <p>{`Are you sure you want to remove ${p.projectName}?`}</p>
                            );
                            console.log('clicked')
                            setModalCallback(() => {
                                return () => deleteProject(p._id);
                            })
                        }}>Remove</button>                        
                    </li>
                )
            })
        }
        </ul>
        </div>
     );
}
 
export default Projects;