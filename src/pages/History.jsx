import React, {useEffect, useState} from 'react'
import { InitHistory } from '../components/LocalStorage'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

export default function History() {
    const [history,setHistory] = useState([])
    
    useEffect(()=>{
        setHistory(InitHistory())
    },[])

    useEffect(()=> {
        console.log('history',history)
    },[history])
    return (
       <React.Fragment>
           <div className="history-title">Riwayat pembelanjaan</div>
           
            {
                   history.map((data,index)=>(
                        <div className="history-item" key={index}>
                            <div className="history-title-container">
                                <div className="history-icon"><ShoppingBasketIcon/></div>
                                <div className="history-shoping">
                                    <div className="history-shoping-label">Belanja</div>
                                    <div className="history-date">{data.transaction_created_datetime}</div>
                                </div>
                                <div className={
                                    data.transaction_approve_status===0?`status-pending`:
                                    data.transaction_approve_status===1?`status-processing`:
                                    data.transaction_approve_status===2?`status-verified`:
                                    data.transaction_approve_status===3?`status-approved`:`status-rejjected`}>{data.transaction_approve_status_name}</div>
                            </div>
                            <div className="history-detail">
                                <div className="history-shoping-label">Kode Transaksi</div>
                                <div className="history-date">{data.transaction_number}</div>
                            </div>
                            
                        </div>
                   ))
            }
            
       </React.Fragment>
    )
}
    