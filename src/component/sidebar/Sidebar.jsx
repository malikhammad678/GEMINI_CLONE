import React, { useContext, useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets.js'
import { Context } from '../../context/Context.jsx'
const Sidebar = () => {

    const [extend,setExtend] = useState(true)

    const {prevPrompt, setPrevPrompt, onSent,setRecentPrompt,newChat} = useContext(Context);

    const toggleSideBar = () => {
        setExtend(!extend);
    }

    const loadPrompt = async (prompt) => {
      setRecentPrompt(prompt);
      await onSent(prompt)
    }

  return (
    <div className='sidebar'>
      <div className="top">
        <img className='logo' onClick={toggleSideBar} src={assets.menu_icon} alt="" />
        <div className="new_chat"onClick={() => newChat()}>
            <img  src={assets.plus_icon} style={{width:'20px'}} alt="" />
            {
                extend ? <p>New Chat</p> : null
            }
        </div>
        {
            extend ? <div className="recent">
            <p className="recent_title">
               Recent  
            </p>
            {
              prevPrompt.map((item,index) => {
                return (
                <div onClick={() => loadPrompt(item)} className="recent_entry">
             <img src={assets.message_icon} alt="" />
              <p>{item.slice(0,18)}...</p>
            </div>
                )
              })
            }
            
        </div> : null
        }
      </div>
      <div className="bottom">
         <div className="bottom_item recent_entry">
            <img src={assets.question_icon } alt="" />
            {
                extend ? <p>Help</p> : null
            }
         </div>
         <div className="bottom_item recent_entry">
            <img src={assets.history_icon } alt="" />
            {
                extend ? <p>Activity</p> : null
            }
         </div>
         <div className="bottom_item recent_entry">
            <img src={assets.setting_icon } alt="" />
            {
                extend ? <p>Settings</p> : null
            }
         </div>
      </div>
    </div>
  )
}

export default Sidebar
