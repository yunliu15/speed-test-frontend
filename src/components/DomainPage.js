import { useParams, useLocation, Link } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useMessage from '../hooks/useMessage';
import TestLog from "./TestLog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import ResultChart from "./ResultChart";

const getChartData = (testResults, attribute) => {
    let mobileData = [];
    let desktopData = [];
    testResults.forEach(item => {
        const theDate = (new Date(item.logTimestamp)).toLocaleDateString();
        switch(attribute) {
            case 'Performance':
                item.mobilePerformanceScore && mobileData.unshift([theDate, Number((item.mobilePerformanceScore * 100).toFixed(0))]);
                item.desktopPerformanceScore && desktopData.unshift([theDate, Number((item.desktopPerformanceScore * 100).toFixed(0))]);
                break;
            case 'CLS':
                item.mobileClsScore.value !=='' && mobileData.unshift([theDate, Number(item.mobileClsScore.value)])
                item.desktopClsScore.value !=='' && desktopData.unshift([theDate,  Number(item.desktopClsScore.value)]);
                break;
            case 'LCP':
                item.mobileLcpScore.value !=='' && mobileData.unshift([theDate, Number(item.mobileLcpScore.value.replace("s", ""))])
                item.desktopLcpScore.value !=='' && desktopData.unshift([theDate,  Number(item.desktopLcpScore.value.replace("s", ""))]);
                break;
            case 'FCP':
                item.mobileFcpScore.value !=='' && mobileData.unshift([theDate, Number(item.mobileFcpScore.value.replace("s", ""))])
                item.desktopFcpScore.value !=='' && desktopData.unshift([theDate,  Number(item.desktopFcpScore.value.replace("s", ""))]);
                break;
            case 'TBT':
                item.mobileTbtScore.value !=='' && mobileData.unshift([theDate, Number(item.mobileTbtScore.value.replace("ms", "").replace(",", ""))])
                item.desktopTbtScore.value !=='' && desktopData.unshift([theDate,  Number(item.desktopTbtScore.value.replace("ms", "").replace(",", ""))]);
                break;
            case 'TTI':console.log(item.desktopTtiScore.value)
                item.mobileTtiScore.value !=='' && mobileData.unshift([theDate, Number(item.mobileTtiScore.value.replace("s", ""))])
                item.desktopTtiScore.value !=='' && desktopData.unshift([theDate,  Number(item.desktopTtiScore.value.replace("s", ""))]);
                break;
            case 'Speed Index':console.log(item.desktopSpeedIndex)
                item.mobileSpeedIndex.value !=='' && mobileData.unshift([theDate, Number(item.mobileSpeedIndex.value.replace("s", ""))])
                item.desktopSpeedIndex.value !=='' && desktopData.unshift([theDate,  Number(item.desktopSpeedIndex.value.replace("s", ""))]);
                break;
            default:
                item.mobilePerformanceScore && mobileData.unshift([theDate, Number((item.mobilePerformanceScore * 100).toFixed(0))]);
                item.desktopPerformanceScore && desktopData.unshift([theDate, Number((item.desktopPerformanceScore * 100).toFixed(0))]);
        }
       
    });
    mobileData.unshift(['Date', attribute]);
    desktopData.unshift(['Date', attribute]);
    return [mobileData, desktopData];
}

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
    const [dataView, setDataView] = useState('mobile');
    const [chartAttribute, setAttribute] = useState('Performance');
    const [mobileData, desktopData] = getChartData(testResults, chartAttribute);
    
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
                <h1>{currentDomain?.domainName}</h1>
                {!!currentDomain?.domainName && <button className={testing? 'secondary testing': 'secondary'} onClick={testSpeed} >{testing? <FontAwesomeIcon icon={faSpinner} />: 'Run Test'}</button>}
            </div>
            <div className="chart-select-forms">
                <select className="form-control form-control-sm mb-2" value={dataView} onChange={(e)=>setDataView(e.target.value)}>
                    <option value="mobile">Mobile</option>
                    <option value="desktop">Desktop</option>
                </select>
                <select className="form-control form-control-sm mb-2" value={chartAttribute} onChange={(e)=>setAttribute(e.target.value)}>
                    <option value="Performance">Performance</option>
                    <option value="CLS">CLS</option>
                    <option value="LCP">LCP</option>
                    <option value="FCP">FCP</option>
                    <option value="TBT">TBT</option>
                    <option value="TTI">TTI</option>
                    <option value="Speed Index">Speed Index</option>
                </select>
            </div>
            {(mobileData && mobileData.length > 1) && (desktopData && desktopData.length > 1) ? 
                <ResultChart data={dataView === 'mobile' ? mobileData : desktopData}/>
            : <p className='no-test-notice'>Please run some test to view the performance statistics for the domain!</p>}
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