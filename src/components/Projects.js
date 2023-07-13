import {useState, useEffect} from 'react';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate } from 'react-router-dom';
import useMessage from '../hooks/useMessage';
import useModal from '../hooks/useModal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

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
        <>
            <div className='container-header'>
                <h2>Projects</h2>
                <button className='primary' onClick={() => setShowCreate(true)}>Create a Project</button>
            

                {
                    showCreate && (
                        <form className='dropdown' onSubmit={createProject}>                
                            <label htmlFor='create_project'>Create a Project</label>
                            <input
                            type="text"
                            id='create_project'
                            value={newProject}
                            onChange={(e) => setNewProject(e.target.value)}
                            />
                            <div className='actions'>
                                            
                                <button className='primary' type='submit'>Submit</button>
                                <button className='secondary' onClick={()=> {setNewProject(''); setShowCreate(false); setMessage({})} }>Cancel</button>
                            </div>
                        </form>
                    )
                }
            </div>
            <ul className='item-cards'>
            {
                projects.map(p => {
                    return (
                        
                        <li key={p._id} className='item-card'>
                            <h3 
                            onClick={() => {
                                setMessage({});
                                navigate(`projects/${p._id}`, 
                                {state: {currentProject: p}})
                            }}
                            className='as-link'
                            >
                                {p.projectName}
                            </h3>
                            <button className='remove' onClick={() => {
                                setShowModal(true);
                                setModalContent(
                                    <p>{`Are you sure you want to remove ${p.projectName}?`}</p>
                                );
                                setModalCallback(() => {
                                    return () => deleteProject(p._id);
                                })
                            }}>
                                <span className='sr-only'>Remove</span>
                                <FontAwesomeIcon icon={faTrashCan} />
                            </button>
                            <hr />
                            <h4>DOMAINS</h4>
                            <div><span className='count'>{p.domains.length}</span></div>                      
                        </li>
                    )
                })
            }
            </ul>
        </>
     );
}
 
export default Projects;