import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useMessage from '../hooks/useMessage';

const Project = () => {
    const params = useParams();
    const projectId = params.id;
    const {state} = useLocation();
    const navigate = useNavigate();
    const [currentProject, setCurrentProject] = useState(state?.currentProject)
    const axiosPrivate = useAxiosPrivate();
    const {setMessage} = useMessage();
    const [showCreate, setShowCreate] = useState(false);
    const [newDomain, setNewDomain] = useState('');

    const createDomain = async (e) => {
        e.preventDefault();
        try {
            const result = await axiosPrivate.put(
                `projects/${projectId}/domains`, 
                JSON.stringify({ domain: newDomain })
                );
                if (result.data?._id) {
                    setCurrentProject(result.data);
                    setShowCreate(false);
                    setMessage({content: `${newDomain} created`, type: 'success'});
                    setNewDomain('');
                } else {
                    console.log(result);
                    setMessage({content: `${newDomain} already exists`, type: 'error'});
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

    const deleteDomain = async (domainId, domainName) => {
        try {
            const result = await axiosPrivate.put(
                `projects/${projectId}/domains/delete`, 
                JSON.stringify({domainid: domainId })
                );
            if(result.data?._id) {
                setCurrentProject(result.data);
                setMessage({content: `${domainName} deleted`, type: 'success'});
                
            } else {
                console.log(result);
                
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
    
    useEffect( () => {
        let ignore = false;
        const getProject = async () => {
            console.log('get project call')
            try {
                const result = await axiosPrivate.get(`projects/${projectId}`);
                if (result.data) {
                    !ignore  && setCurrentProject(result.data)
                } else {
                    console.log(result)
                }
            } catch(err) {
                console.error(err);
                setMessage({content: err.message, type: 'error'});
                
            }
        }
        if (!currentProject) {
            getProject();
        }

        return () => {
            ignore = true;
        }
    }, [axiosPrivate, projectId, currentProject, setMessage])

    return ( 
        <section>
            <Link to='/'>Back to Dashboard</Link>
            <button onClick={() => setShowCreate(true)}>Add a domain</button>
            {
                showCreate && (
                    <form onSubmit={createDomain}>                
                        <label htmlFor='create_Domain'>Create a Domain</label>
                        <input
                        id='create_Domain'
                        value={newDomain}
                        onChange={(e) => setNewDomain(e.target.value)}
                        />                
                        <button type='submit'>Submit</button>
                        <button onClick={()=> {setNewDomain(''); setShowCreate(false);setMessage({})} }>Cancel</button>
                    </form>
                )
            }
            <h2>{currentProject?.projectName}</h2>
            <ul>
            {
                currentProject?.domains?.map(d => {
                    return (<li key={d._id}>
                        <Link to={`/projects/${projectId}/domains/${d._id}`}>
                            <h3
                            onClick={() => {
                                navigate(`/projects/${projectId}/domains/${d._id}`, 
                                {state: {currentDomain: d}})
                            }}
                            >
                                {d.domainName}
                            </h3>
                        </Link>
                        <button onClick={() => deleteDomain(d._id, d.domainName)}>Remove</button> 
                        </li>)
                })
            }
            </ul>
        </section>
    );
}
 
export default Project;