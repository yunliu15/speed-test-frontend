import { useParams, useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Domain = () => {

    const params = useParams();
    const projectId = params.id;
    const domainId = params.domainid;
    const {state} = useLocation();
    const [currentDomain, setCurrentDomain] = useState(state?.currentDomain);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        let ignore = false;
        const fetchDomain = async () =>{
            try {
                const result = await axiosPrivate.get(`/projects/${projectId}/domains/${domainId}`);
                if (result.data?._id) {
                    !ignore && setCurrentDomain(result.data);
                } else {
                    console.log(result)
                }
            } catch(err) {
                console.error(err);
                
            }
        }
        if (!currentDomain) {
            fetchDomain();
        }

        return () => {
            ignore = true;
        }

    }, [])
    
    return ( 
        <section>
            <Link to={`/projects/${projectId}`} > Back to Project </Link>
            {currentDomain?.domainName}
        </section>
     );
}
 
export default Domain;