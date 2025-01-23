import React, { useState } from 'react'
import {GoogleGenerativeAI} from "@google/generative-ai";

const App = () => {
  const [content, setContent] = useState("")
  const [error, setError] = useState("")
  const [response, setResponse] = useState("")  
  const [loading, setLoading] = useState(false)

  const Api_key = import.meta.env.VITE_GEMINI_API_KEY;



  const handleSend = async () => {
  
    setLoading(true)
    try {
      const genAI = new GoogleGenerativeAI(Api_key);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(content);
      // console.log(result.response.text());
      setResponse(result.response.text());
      
    } catch (error) {
      // console.log(error.message);
      setError(error.message);
    }finally{
      setLoading(false)
    }
  }





  return (
    <div className="bg-slate-800 w-full min-h-screen flex flex-col justify-center items-center">
     
<div className="chat">
<h1 className='text-white text-center text-4xl font-semibold mb-4'>Chat with Gemini</h1>
      <div className="input flex gap-4 w-[700px]">
        <input type="text" className='w-full p-2 text-xl outline-none rounded-lg' placeholder='enter your promt '
         value={content}
         onChange={(e) => setContent(e.target.value)}
         onKeyDown={(e) => 
          e.key === "Enter" && handleSend()
        }
         />
        <button
        onClick={handleSend}
       
        className='p-2 text-xl text-white bg-green-500 rounded-lg'>{loading ? "Thinking" : "Send"}</button>
      </div>
      <div className="result text-white text-xl mt-4 w-[800px]  ">
        <pre className='text-white text-xl text-wrap'>
{response && response}
        </pre>
      </div>
</div>


    </div>
  )
}

export default App