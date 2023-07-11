const TestLog = ({result}) => {
    const mobileCLS=result.mobileClsScore,
        mobileFCP=result.mobileFcpScore,
        mobileLCP=result.mobileLcpScore,
        mobileLoadTime=result.mobileLoadTime,
        mobileLoadingExperienceOverall=result.mobileLoadingExperienceOverall,
        logTimestamp=result.logTimestamp,
        mobilePerformanceScore=result.mobilePerformanceScore,
        mobileSpeedIndex=result.mobileSpeedIndex,
        mobileTbtScore=result.mobileTbtScore,
        mobileTtiScore=result.mobileTtiScore,
        desktopCLS=result.desktopClsScore,
        desktopFCP=result.desktopFcpScore,
        desktopLCP=result.desktopLcpScore,
        desktopLoadTime=result.desktopLoadTime,
        desktopLoadingExperienceOverall=result.desktopLoadingExperienceOverall,
        desktopPerformanceScore=result.desktopPerformanceScore,
        desktopSpeedIndex=result.desktopSpeedIndex,
        desktopTbtScore=result.desktopTbtScore,
        desktopTtiScore=result.desktopTtiScore;
    const theDate = new Date(logTimestamp);
    
    return (
        <tr> 
            <td>
            <div>
                <span>{theDate.toLocaleDateString()}</span><span className="smaller lighter"> {theDate.toLocaleTimeString()}</span>
            </div>
            </td>
            <td className="text-left nowrap">
                <div className={`result-container ${mobilePerformanceScore && mobilePerformanceScore >= 0.8 ? 'good-score' : (mobilePerformanceScore >= 0.6 && mobilePerformanceScore <= 0.79 ? 'medium-score' : 'low-score')}`}>
                    <i className="os-icon os-icon-tablet"></i> {mobilePerformanceScore ? ((mobilePerformanceScore * 100).toFixed(0) + ' / 100') : 'N/A'}
                </div>
                <div className={`result-container ${desktopPerformanceScore && desktopPerformanceScore >= 0.8 ? 'good-score' : (desktopPerformanceScore >= 0.6 && desktopPerformanceScore <= 0.79 ? 'medium-score' : 'low-score')}`}>
                    <i className="os-icon os-icon-monitor"></i> {desktopPerformanceScore ? ((desktopPerformanceScore * 100).toFixed(0) + ' / 100') : 'N/A'}
                </div>
            </td>
            <td className="text-left nowrap">
                <div className={`result-container ${mobileCLS && mobileCLS.score >= 0.8 ? 'good-score' : (mobileCLS.score >= 0.6 && mobileCLS.score <= 0.79 ? 'medium-score' : 'low-score')}`}><i className="os-icon os-icon-tablet"></i> {mobileCLS.value}</div>
                <div className={`result-container ${desktopCLS && desktopCLS.score >= 0.8 ? 'good-score' : (desktopCLS.score >= 0.6 && desktopCLS.score <= 0.79 ? 'medium-score' : 'low-score')}`}><i className="os-icon os-icon-monitor"></i> {desktopCLS.value}</div>
            </td>
            <td className="text-left nowrap">
                <div className={`result-container ${mobileLCP && mobileLCP.score >= 0.8 ? 'good-score' : (mobileLCP.score >= 0.6 && mobileLCP.score <= 0.79 ? 'medium-score' : 'low-score')}`}><i className="os-icon os-icon-tablet"></i> {mobileLCP.value}</div>
                <div className={`result-container ${desktopLCP && desktopLCP.score >= 0.8 ? 'good-score' : (desktopLCP.score >= 0.6 && desktopLCP.score <= 0.79 ? 'medium-score' : 'low-score')}`}><i className="os-icon os-icon-monitor"></i> {desktopLCP.value}</div>
            </td>
            <td className="text-left nowrap">
                <div className={`result-container ${mobileFCP && mobileFCP.score >= 0.8 ? 'good-score' : (mobileFCP.score >= 0.6 && mobileFCP.score <= 0.79 ? 'medium-score' : 'low-score')}`}><i className="os-icon os-icon-tablet"></i> {mobileFCP.value}</div>
                <div className={`result-container ${desktopFCP && desktopFCP.score >= 0.8 ? 'good-score' : (desktopFCP.score >= 0.6 && desktopFCP.score <= 0.79 ? 'medium-score' : 'low-score')}`}><i className="os-icon os-icon-monitor"></i> {desktopFCP.value}</div>
            </td>
            <td className="text-left nowrap">
                <div className={`result-container ${mobileTbtScore && mobileTbtScore.score >= 0.8 ? 'good-score' : (mobileTbtScore.score >= 0.6 && mobileTbtScore.score <= 0.79 ? 'medium-score' : 'low-score')}`}><i className="os-icon os-icon-tablet"></i> {mobileTbtScore.value}</div>
                <div className={`result-container ${desktopTbtScore && desktopTbtScore.score >= 0.8 ? 'good-score' : (desktopTbtScore.score >= 0.6 && desktopTbtScore.score <= 0.79 ? 'medium-score' : 'low-score')}`}><i className="os-icon os-icon-monitor"></i> {desktopTbtScore.value}</div>
            </td>
            <td className="text-left nowrap">
                <div className={`result-container ${mobileTtiScore && mobileTtiScore.score >= 0.8 ? 'good-score' : (mobileTtiScore.score >= 0.6 && mobileTtiScore.score <= 0.79 ? 'medium-score' : 'low-score')}`}><i className="os-icon os-icon-tablet"></i> {mobileTtiScore.value}</div>
                <div className={`result-container ${desktopTtiScore && desktopTtiScore.score >= 0.8 ? 'good-score' : (desktopTtiScore.score >= 0.6 && desktopTtiScore.score <= 0.79 ? 'medium-score' : 'low-score')}`}><i className="os-icon os-icon-monitor"></i> {desktopTtiScore.value}</div>
            </td>
            <td className="text-left nowrap">
                <div className={`result-container ${mobileSpeedIndex && mobileSpeedIndex.score >= 0.8 ? 'good-score' : (mobileSpeedIndex.score >= 0.6 && mobileSpeedIndex.score <= 0.79 ? 'medium-score' : 'low-score')}`}><i className="os-icon os-icon-tablet"></i> {mobileSpeedIndex.value}</div>
                <div className={`result-container ${desktopSpeedIndex && desktopSpeedIndex.score >= 0.8 ? 'good-score' : (desktopSpeedIndex.score >= 0.6 && desktopSpeedIndex.score <= 0.79 ? 'medium-score' : 'low-score')}`}><i className="os-icon os-icon-monitor"></i> {desktopSpeedIndex.value}</div>
            </td>
            <td className="text-left nowrap">
                <div className='result-container'><i className="os-icon os-icon-tablet"></i>
                    <div className='result-container'><span>{mobileLoadingExperienceOverall ? mobileLoadingExperienceOverall : 'N/A'}</span><span className={`status-pill ${mobileLoadingExperienceOverall === 'AVERAGE' ? 'yellow' : (mobileLoadingExperienceOverall === 'FAST' ? 'green' : 'red')}`}></span></div>
                </div>
                <div className='result-container'><i className="os-icon os-icon-monitor"></i>
                    <div className='result-container'><span>{desktopLoadingExperienceOverall ? desktopLoadingExperienceOverall : 'N/A'}</span><span className={`status-pill ${desktopLoadingExperienceOverall === 'AVERAGE' ? 'yellow' : (desktopLoadingExperienceOverall === 'FAST' ? 'green' : 'red')}`}></span></div>
                </div>
            </td>
        </tr>
    )
}

export default TestLog;