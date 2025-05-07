import { useState, useCallback, useEffect, useRef } from "react"


function PassGenrator() {
  const [length, setLength] = useState(8)
  const [isNumAllowed, setNumAllow] = useState(false)
  const [isCharAllowed, setCharAllow] = useState(false)
  const [password, setPassword] = useState("");
  const [isCopied,setCopy] = useState(false);

  // useRef hook
  const passRef = useRef(null)

  const passwordGenrator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (isNumAllowed) str += "0123456789"
    if (isCharAllowed) str += "~!@#$%^&*_-+=[]{}:;"

    for (let i = 1; i <= length; ++i) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, isNumAllowed, isCharAllowed, setPassword])

  const copyPassToClipboard = useCallback(()=>{

    passRef.current?.select()
    window.navigator.clipboard.writeText(password)
    setCopy((prev)=> password?true:false);
  },[password])


  useEffect(()=>{passwordGenrator()},[length, isNumAllowed, isCharAllowed, setPassword])
  return (
    <div className="w-full max-w-md mx-auto text-center shadow-md rounded-2xl px-4 py-2 my-8 bg-gray-600">
      <h1 className="my-3">Password Generator</h1>
      <div className="flex text-orange-400 shadow rounded-lg overflow-hidden mb-4" >
        <input
          className="outline-none w-full py-1 px-3 bg-white"
          type="text"
          value={password}
          placeholder="password"
          readOnly
          ref={passRef}
        />
        <button 
        className="bg-blue-500 text-white font-bold px-3 hover:bg-blue-800"
        onClick={copyPassToClipboard}
        >{isCopied?"Copied":"Copy"}</button>
      </div>

      <div className="flex text-sm gap-x-2" >
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={32}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(e.target.value)
              setCopy(false)
            }}
          />
          <label>Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={isNumAllowed}
            id="numberInput"
            onChange={() => {
              setNumAllow((num) =>  !num )
              setCopy(false)
            }}

          />
          <label htmlFor="numberInput">Numbers</label>

        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={isCharAllowed}
            id="charInput"
            onChange={() => {
              setCharAllow((char) =>  !char )
              setCopy(false)
            }}

          />
          <label htmlFor="charInput">Characters</label>

        </div>
      </div>
    </div>
  )
}

export default PassGenrator
