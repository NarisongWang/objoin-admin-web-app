import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getInstallationOrder } from '../../features/installationOrder/installationOrderSlice'
import { parseDate, parseTime } from '../../utils/utils'
import Spinner from '../../components/Spinner'
import CheckListItem from '../../components/CheckListItem'
import styles from './InstallationOrderReport.module.css'

const InstallationOrderReport = () => {
    const { installationOrderId } = useParams()

    const { dictionary } = useSelector((state)=>state.auth)
    const { installationOrder, isLoading, error } = useSelector((state) => state.installationOrder)
    
    const dispatch = useDispatch()

    useEffect( () => {
        dispatch(getInstallationOrder(installationOrderId))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(()=>{
      if(error!==''){
          toast.error(error)
      }
    },[error])

    if(isLoading){
        return <Spinner />
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                Installation Report: {installationOrder.installationOrderNumber}
            </div>
            <div className={styles.title2}>
                Report Date: {new Date().toLocaleString('en-AU').split(',')[0]}
            </div>
            <div className={styles.info}>Customer: {installationOrder.customer} </div>
            <div className={styles.info}>Ship Name: {installationOrder.shipName} </div>
            <div className={styles.info}>Ship Address: {installationOrder.shipAddress} </div>
            <div className={styles.info}>Entry Date: {parseDate(installationOrder.entryDate)} </div>
            <div className={styles.info}>Due Date: {parseDate(installationOrder.dueDate)} </div>
            <div className={styles.info}>Deliverers: </div> {installationOrder.deliverers?installationOrder.deliverers.map((deliverer,index)=>{
                return <li className={styles.liInfo} key={index}>{deliverer.fullName}</li>
            }):''}
            <div className={styles.info}>Installers: </div> {installationOrder.installers?installationOrder.installers.map((installer,index)=>{
                return <li className={styles.liInfo} key={index}>{installer.fullName}</li>
            }):''}
            
            <div className={styles.info}>Time Frames: </div>
            <div className={styles.timeFrame}>{installationOrder.timeFrames?installationOrder.timeFrames.map((timeFrame,index)=>{
                return <div className={styles.timeInfoTop} key={index}>{index%2===1?dictionary.workStatus[timeFrame.workStatus].statusDesc:parseDate(timeFrame.time)+' '+parseTime(timeFrame.time)}</div>
            }):''}</div>
            <img className={styles.line} alt='' src={require('../../assets/line.png')}></img>
            <div className={styles.timeFrame}>{installationOrder.timeFrames?installationOrder.timeFrames.map((timeFrame,index)=>{
                return <div className={styles.timeInfoBottom} key={index}>{index%2!==1?dictionary.workStatus[timeFrame.workStatus].statusDesc:parseDate(timeFrame.time)+' '+parseTime(timeFrame.time)}</div>
            }):''}</div>
            <div className={styles.info}> </div>
            <div className={styles.pagebreak}></div>


            <div>
                <div className={styles.headerContainer}>
                    <img width={250} height={100} alt='OBJOIN' src={require('../../assets/OBJOIN.png')}/>
                    <div className={styles.infoRight}>
                        Unit 2/18a Hull St, Glenorchy, TAS 7010<br/>
                        PO Box: 125 Glenorchy, TAS 7010<br/>
                        Phone: (03) 62733141<br/>
                        email: enquiries@objoin.com.au<br/>
                        web: objoin.com.au<br/>
                        ABN: 39 604 613 916<br/>
                    </div>
                </div>
                <div className={styles.headerTitle}>KITCHEN INSTALL CHECKLIIST</div> 

                <div className={styles.headerContainer}>
                    <div className={styles.infoRight2}>
                        Installer Name:<br/>
                        DATE:<br/>
                        Installation Order Number:<br/>
                        Site Address:<br/>
                    </div>
                    <div className={styles.infoLeft}>
                        {installationOrder.installers?installationOrder.installers[0].fullName:''}<br/>
                        {installationOrder.checkListSignature?`${installationOrder.checkListSignature.time.toString().substring(8,10)}/${installationOrder.checkListSignature.time.toString().substring(5,7)}/${installationOrder.checkListSignature.time.toString().substring(0,4)}`:''}<br/>
                        {installationOrder.installationOrderNumber}<br/>
                        {installationOrder.shipAddress}<br/>
                    </div>
                </div>
                
                {installationOrder.checkList?installationOrder.checkList.map((checkItem,index)=>{
                    return <CheckListItem key={index} title={checkItem.title} status={checkItem.status} note={checkItem.note}/>
                }):''}
                {installationOrder.checkListSignature?installationOrder.checkListSignature.signed?<img src={'https://objoinfiles.blob.core.windows.net/installation-orders/'+installationOrder.checkListSignature.signature+'?'+process.env.REACT_APP_AZURE_STORAGE_CONN} alt='' width='240' height='100' />:null:null}
            </div>
            <div className={styles.pagebreak}></div>
            <div className={styles.info}>Delivery Photos:</div>
            {installationOrder.photos0? installationOrder.photos0.map((photo,index)=>{
                return (
                    <div key={index} className={styles.responsive}>
                        <div className={styles.gallery}>
                            <a target='_blank' rel='noreferrer' href={'/display-photo/'+photo.replaceAll('/','-')}>
                            <img src={'https://objoinfiles.blob.core.windows.net/installation-orders/'+photo+'?'+process.env.REACT_APP_AZURE_STORAGE_CONN} alt='delivery' width='600' height='400' />
                            </a>
                            <div className={styles.desc}>{photo.split('/').pop()}</div>
                        </div>
                    </div>
                )
            }):''}
            <br clear='ALL'/>
            <div className={styles.liInfo}>Delivery Comment: {installationOrder.deliveryComment}</div>
            <br clear='ALL'/>
            <div className={styles.pagebreak}></div>

            <div className={styles.info}>Installation Photos:</div> 
            {installationOrder.photos1? installationOrder.photos1.map((photo,index)=>{
                return (
                    <div key={index} className={styles.responsive}>
                        <div className={styles.gallery}>
                            <a target='_blank' rel='noreferrer' href={'/display-photo/'+photo.replaceAll('/','-')}>
                            <img src={'https://objoinfiles.blob.core.windows.net/installation-orders/'+photo+'?'+process.env.REACT_APP_AZURE_STORAGE_CONN} alt='installation' width='600' height='400' />
                            </a>
                            <div className={styles.desc}>{photo.split('/').pop()}</div>
                        </div>
                    </div>
                )
            }):''}
        </div>
    )
}

export default InstallationOrderReport