import {Outlet} from 'react-router-dom';
import {ProjectProvider} from '../context/ProjectProvider';

const ProjectContextLayout = () => {
    return ( 
        <ProjectProvider>
            <Outlet />
        </ProjectProvider>
     );
}
 
export default ProjectContextLayout ;