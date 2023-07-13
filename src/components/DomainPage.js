import { useParams, useLocation, Link } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useMessage from '../hooks/useMessage';
import TestLog from "./TestLog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";


const Domain = () => {
    const {setMessage} = useMessage();
    const params = useParams();
    const projectId = params.id;
    const domainId = params.domainid;
    const {state} = useLocation();
    const [currentDomain, setCurrentDomain] = useState(state?.currentDomain);
    const axiosPrivate = useAxiosPrivate();
    const [testResults, setTestResults] = useState([]);
    const [testing, setTesting] = useState(false);


    const fetchResult = useCallback(async () => {
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
    }, [domainId, projectId, axiosPrivate])

    const testSpeed = async () => {
        setMessage({});
        setTesting(true)
        try {
            const result = await axiosPrivate.post(
                '/speedTest', 
                JSON.stringify({ domainName: currentDomain.domainName, projectId, domainId})
            );
            console.log(result);
            fetchResult();
            setTesting(false)
        } catch(err) {
            console.error(err)
            setMessage({content: 'Something went wrong, please try again later', type: 'error'});
            setTesting(false)
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
        fetchResult();

    }, [fetchResult])
    
    return ( 
        <section>
            <Link to={`/projects/${projectId}`} > Back to Project </Link>
            <div className='container-header'>
                <h2>{currentDomain?.domainName}</h2>
                {!!currentDomain?.domainName && <button className={testing? 'secondary testing': 'secondary'} onClick={testSpeed} >{testing? <FontAwesomeIcon icon={faSpinner} />: 'Run Test'}</button>}
            </div>
            <h2 className="log-table-header">Recent Results</h2>
            <table className="table log-table">
                <thead>
                <tr>
                    <th className="text-left">
                    Date
                    </th>
                    <th className="text-left">
                    Performance Score
                    </th>
                    <th className="text-left">
                    Cumulative Layout Shift
                    </th>
                    <th className="text-left">
                    Largest Contentful Paint
                    </th>
                    <th className="text-left">
                    First Contentful Paint
                    </th>
                    <th className="text-left">
                    Total Blocking Time
                    </th>
                    <th className="text-left">
                    Time to Interactive
                    </th>
                    <th className="text-left">
                    Speed Index
                    </th>
                    <th className="text-left">
                    Loading Experience
                    </th>
                </tr>
                </thead>
                <tbody>
                {testResults.length? testResults.map(item => {
                    return (
                        <TestLog
                            key={item._id}
                            result={item}
                        />
                    )
                }) : <tr></tr>}
                </tbody>
            </table>
        </section>
     );
}
 
export default Domain;