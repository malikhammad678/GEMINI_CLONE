import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'
import { Loader2 } from 'lucide-react'
const Main = () => {


    const {onSent,showResult,recentPrompt,loading,resultData,input,setInput} = useContext(Context);

  return (
    <div className='main'>
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main_container">

        {
            !showResult ? 
            <>
            <div className="greet">
            <p><span>Hello, Dev.</span></p>
            <p>How can I help you today?</p>
        </div>
        <div className="cards">
            <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
            </div>
            <div className="card">
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="" />
            </div>
            <div className="card">
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="" />
            </div>
            <div className="card">
                <p>Tell me about React js and React native</p>
                <img src={assets.code_icon} alt="" />
            </div>
        </div>
            </> : <div className='result'>
             <div className="result_title">
                <img  src={assets.user_icon} alt="" />
                <p>{recentPrompt}</p>
             </div>
             <div className="result_data">
                <img src={assets.gemini_icon} alt="" />
                {
                    loading ? <div className='loading'>
                        <hr />
                        <hr />
                        <hr />
                    </div> : <p dangerouslySetInnerHTML={{__html:resultData}}></p>
                }
             </div>
            </div>
        }
        

        <div className="main_bottom">
            <div className="search_box">
                <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Prompt' />
                <div>
                    <img src={assets.gallery_icon} alt="" />
                    <img src={assets.mic_icon} alt="" />
                    
                         <img onClick={() => onSent()} src={assets.send_icon} alt="" />
                    
                </div>
            </div>
            <p className='credit'>Developed by <span>Muhammad Hammad</span></p>
        </div>
      </div>
    </div>
  )
}

export default Main
