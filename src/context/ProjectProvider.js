import {createContext, useState} from 'react';

const ProjectContext = createContext({});
export const ProjectProvider = ({children}) => {
    const [currentProject, setCurrentProject] = useState({});
    const [currentDomain, setCureentDomain] = useState({});
    return ( 
        <ProjectContext.Provider value={{currentProject, setCurrentProject, currentDomain, setCureentDomain}}>
            {children}
        </ProjectContext.Provider>
     );
}
 
export default ProjectContext;