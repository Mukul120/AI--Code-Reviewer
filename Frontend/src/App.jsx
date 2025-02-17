import './App.css'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism, { languages } from "prismjs"
import { useEffect, useState } from 'react'
import Markdown from "react-markdown"
import axios from 'axios'
import PropagateLoader
  from "react-spinners/PropagateLoader"
import rehypelight from "rehype-highlight"
import "highlight.js/styles/github-dark.css"
import rehypeHighlight from 'rehype-highlight'


function App() {
  const [code, setCode] = useState(`function ac() {
    return  1+1;
  }`)
  const [aiResponse, setAiResponse] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    prism.highlightAll()
    // console.log(process.env.REACT_APP_BACKEND_URL);
  }, [])

  const review = async () => {
    setLoading(true)
    try {
      // const response = await axios.post(process.env.PORT, { code })
      // const response = await axios.post("http://localhost:4000/ai/get-response", { code });
      // const response = await axios.post(process.env.REACT_APP_BACKEND_URL, { code });
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL, { code });

      setAiResponse(response.data)
    } catch (error) {
      setAiResponse("Error fetching response. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className='h-screen w-screen bg-[#E3F0AF] flex flex-col gap-3 pt-2 pb-5 px-3 overflow-hidden'>
        <h1 className='text-[#D49B54] text-center font-semibold text-2xl mb-2 rounded-lg'>
          <span className='text-[#0F0E0E] font-extrabold '>&lt;</span>
          Code Reviewer
          <span className='text-[#0F0E0E] font-extrabold'>/&gt;</span>
        </h1>

        <div className="flex h-full w-full gap-5">
          {/* Code Container */}
          <div className="h-[90vh] w-1/2 bg-zinc-950 rounded-lg relative border border-white overflow-auto scrollbar-hide">
            <Editor
              value={code}
              onValueChange={setCode}
              highlight={(code) => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={15}
              className="scrollbar-hide"
              style={{
                border: "none",
                outline: "none",
                boxShadow: "none",
                background: "transparent",
              }}
            />

            <button
              onClick={review}
              className='fixed bottom-7 left-150 px-10 bg-[#D6BD98] py-2 font-semibold rounded-2xl'
              disabled={loading}
            >
              {/* {loading ? "Reviewing..." : "Review"} */}
              Review
            </button>
          </div>

          {/* Result Container */}
          <div className="h-[90vh] w-1/2 bg-[#40534C] rounded-lg border border-white text-white p-5 overflow-auto scrollbar-hide">
            {loading ? <div className="flex justify-center items-center w-full h-full">
              <PropagateLoader

                color={"#EFF3EA"}
                loading={loading}

                size={30}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div> : <Markdown
              rehypePlugins={[rehypeHighlight]}
            >{aiResponse}</Markdown>}
          </div>
        </div>
      </div>
    </>
  )
}

export default App


