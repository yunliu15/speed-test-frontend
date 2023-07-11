import { useParams, useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useMessage from '../hooks/useMessage';
const Domain = () => {
    const {setMessage} = useMessage();
    const params = useParams();
    const projectId = params.id;
    const domainId = params.domainid;
    const {state} = useLocation();
    const [currentDomain, setCurrentDomain] = useState(state?.currentDomain);
    const axiosPrivate = useAxiosPrivate();
    const [testResults, setTestResults] = useState([]);


    const fetchResult = async () => {
        try {
            const result = await axiosPrivate.get(`/speedTest/${projectId}/${domainId}`);
            if (result.data) {
                setTestResults(result.data);
            } else {
                console.log(result)
            }
        } catch(err) {
            console.error(err);
        }
    }

    const testSpeed = async () => {
        try {
            const result = await axiosPrivate.post(
                '/speedTest', 
                JSON.stringify({ domainName: currentDomain.domainName, projectId, domainId})
            );
            console.log(result);
            fetchResult();
        } catch(err) {
            console.error(err)
            setMessage({content: err.message, type: 'error'})
        }
    }

    useEffect(() => {
        let ignore = false;
        const fetchDomain = async () =>{
            try {
                const result = await axiosPrivate.get(`/projects/${projectId}/domains/${domainId}`);
                if (result.data?._id) {
                    !ignore && setCurrentDomain(result.data);
                } else if (result.status === 400) {
                    setMessage({content: 'Something went wrong, please try again later', type: 'error'})
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

    }, [currentDomain, domainId, projectId, setMessage, axiosPrivate])

    useEffect(() => {
        if (projectId && domainId) {
            fetchResult();
        }

    }, [domainId, projectId])
    
    return ( 
        <section>
            <Link to={`/projects/${projectId}`} > Back to Project </Link>
            {currentDomain?.domainName}
            {!!currentDomain?.domainName && <button onClick={testSpeed} >Test Speed</button>}
            <ul>
                {
                    testResults.map(t => {
                        return (
                            <li key={t._id} >
                                <div>{t.logTimestamp}</div>
                                <div>Mobile: {t.mobilePerformanceScore} </div>
                                <div>Desktop: {t.desktopPerformanceScore}</div>
                            </li>
                        )
                    })
                }
            </ul>
        </section>
     );
}
 
export default Domain;