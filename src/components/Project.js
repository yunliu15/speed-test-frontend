const Project = ({project, handleDelete}) => {
    return ( 
        <>
            <h2>{project.projectName}</h2>
            <button onClick={() => handleDelete(project._id)}>Remove</button>
        </>
    );
}
 
export default Project;