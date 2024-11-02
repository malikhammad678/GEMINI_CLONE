import { Children, createContext, useState } from "react";
import runChat from "../config/Gemini.js";


export const Context = createContext();


const ContextProvider = (props) => {

    const [input,setInput] = useState("")
    const [recentPrompt,setRecentPrompt] = useState("")
    const [prevPrompt,setPrevPrompt] = useState([])
    const [showResult,setShowResult] = useState(false)
    const [loading,setLoading] = useState(false)
    const [resultData,setResultData] = useState("")

    const delayPara = (index,nextWord) => {
       setTimeout(() => {
           setResultData(prev => prev + nextWord)
       },75 * index)
    }

    const newChat = () => {
        setLoading(false)
        setShowResult(false)
    }


    const onSent = async (prompt) => {
        setResultData("");
        setShowResult(true);
        setLoading(true);
        
        try {
            let response;
            
            // Ensure the prompt is used correctly whether it's provided or from input
            if (prompt !== undefined && prompt !== "") {
                response = await runChat(prompt);
                setRecentPrompt(prompt);
            } else if (input) {
                setPrevPrompt(prev => [...prev, input]);
                setRecentPrompt(input);
                response = await runChat(input);
            }
        
            // Process response by formatting **bold** text and line breaks
            const responseArray = response.split("**");
            let formattedResponse = "";
            
            for (let i = 0; i < responseArray.length; i++) {
                formattedResponse += (i % 2 === 1) 
                    ? `<b>${responseArray[i]}</b>` 
                    : responseArray[i];
            }
        
            // Replace "*" with line breaks and add delay effect for each word
            let finalResponse = formattedResponse.split("*").join("<br/>");
            const finalResponseArray = finalResponse.split(" ");
            
            for (let i = 0; i < finalResponseArray.length; i++) {
                const nextWord = finalResponseArray[i];
                delayPara(i, nextWord + " ");
            }
        
            // Update result data with formatted response
            setResultData(finalResponse);
            setInput("");
        
        } catch (error) {
            console.error("Error in sending message:", error);
        } finally {
            setLoading(false);
        }
    }

    const contextValue = {
        prevPrompt,
        setPrevPrompt,
        onSent,
        recentPrompt,
        setPrevPrompt,
        showResult,
        loading,
        resultData,
        input,setInput,
        setRecentPrompt,
        newChat
    }

    return (
        <Context.Provider value={contextValue}>
             {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;