import React, { useState } from 'react'
import "./Addfriend.scss"
import { ArrowBack, Search } from "@mui/icons-material"
import Conversation from '../Conversation/Conversation'
import axios from 'axios'
import { CircularProgress } from '@mui/material'



const Addfriend = ({ display, removeDisplay }) => {
    const [loading, setLoading] = useState(false);
    const [userIds, setUserIds] = useState(null);
    const [search, setSearch] = useState("")

    const fetchIds = async () => {
        setLoading(true)
        try {
            const res = await axios.post(`http://localhost:5000/users/search?query=${search}`);
            setUserIds(res.data.ids);
        } catch (err) {

        }
        setLoading(false)
    }
    return (
        <div className={`addfriend-container ${display && "display"}`}>
            <div className="addfriend-wrapper">
                <div className="header">
                    <ArrowBack onClick={removeDisplay} />
                    <div className="search-box">
                        <input type="text" onChange={(e) => setSearch(e.target.value)} placeholder='search users' />
                        <Search className='icon' onClick={() => { search.length > 0 && fetchIds() }} />
                    </div>
                </div>
                <div className="body">
                    <div className="users-wrapper">

                        {userIds && userIds.length !== 0 ?
                            userIds.map((userId, index) => {
                                return <Conversation key={index} personId={userId} convId={null} />
                            })
                            : loading ? <CircularProgress className='loader' /> : <div>No user Found</div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Addfriend