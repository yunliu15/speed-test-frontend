import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useMessage from '../hooks/useMessage';
import useModal from '../hooks/useModal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

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
    const {setShowModal, setModalContent, setModalCallback} = useModal();

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
            const result = await axiosPrivate.patch(
                `projects/${projectId}/domains/${domainId}`
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
            <Link to='/' onClick={() => setMessage({})}>Back to Dashboard</Link>
            <div className='container-header'>

                <h2>{currentProject?.projectName}</h2>
                <button onClick={() => setShowCreate(true)}>Add a domain</button>
                {
                    showCreate && (
                        <form onSubmit={createDomain} className="dropdown">                
                            <label htmlFor='create_Domain'>Create a Domain</label>
                            <input
                            type="text"
                            id='create_Domain'
                            value={newDomain}
                            onChange={(e) => setNewDomain(e.target.value)}
                            />                
                            <div className="actions">
                                <button className="primary" type='submit'>Submit</button>
                                <button className="secondary" onClick={()=> {setNewDomain(''); setShowCreate(false);setMessage({})} }>Cancel</button>
                            </div>
                        </form>
                    )
                }
            </div>
            <ul className="item-cards">
            {
                currentProject?.domains?.map(d => {
                    return (<li key={d._id} className="item-card">
                        <h3
                        onClick={() => {
                            setMessage({});
                            navigate(`/projects/${projectId}/domains/${d._id}`, 
                            {state: {currentDomain: d}})
                        }}
                        className="as-link"
                        >
                            {d.domainName}
                        </h3>
                        <button
                            className="remove"
                            onClick={() => {
                                setShowModal(true);
                                setModalContent(
                                    <p>{`Are you sure you want to remove ${d.domainName}? All test results in this domain will be deleted.`}</p>
                                );
                                console.log('clicked')
                                setModalCallback(() => {
                                    return () => deleteDomain(d._id, d.domainName);
                                })
                            }}
                        ><span className='sr-only'>Remove</span>
                        <FontAwesomeIcon icon={faTrashCan} /></button> 
                        </li>)
                })
            }
            </ul>
        </section>
    );
}
 
export default Project;