import { useState, useCallback, useEffect, useRef } from "react"

function App() {
  const [password, setPassword] = useState('')
  const [numAllow, setNumAllow] = useState(false)
  const [charAllow, setCharAllow] = useState(false)
  const [length, setLength] = useState(8)
  const [title,setTitle] = useState('Copy')
  const PasswordRef = useRef('null')
  // password genrator
  const passwordGenrator = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if (numAllow) str += '0123456789'
    if (charAllow) str += '@#$%^&*_+-='
    //for loop for finding the random password
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass+=str.charAt(char)
    }
    setPassword(pass)
  }, [length, numAllow, , charAllow, setPassword])
  let CopyPass = useCallback(()=>{
    window.navigator.clipboard.writeText(password)
    PasswordRef.current?.select()
    setTitle('copied!');
    setTimeout(() => setTitle('Copy'), 2000);
  
    // PasswordRef.current?.setSelectionRange(0,20)   how may range will be selected their
  },[password])
  
  useEffect(() => { passwordGenrator() }, [length, numAllow, charAllow,passwordGenrator])
  return (
    <>
      {/* main div box which have some box */}
      <div className="w-full max-w-md mx-auto shadow-md  rounded-lg px-4 py-3 my-10 text-orange-500 bg-gray-700">
        <h1 className="text-4xl text-center my-3 text-white" >Password Genretor</h1>
        {/* here we have input box for password */}
        <div className="flex shadow  rounded-lg overflow-hidden my-6">
          <input type="text"
            value={password}
            className="outline-none cursor-not-allowed bg-white w-full py-1 px-3"
            placeholder='Password'
            readOnly
            ref={PasswordRef}/>

          <button onClick={CopyPass} title={title} className="outline-none cursor-pointer bg-blue-700 text-white px-3 py-0.5 shrink-0">
            Copy</button>
        </div>
        {/* range button  */}
        <div className="flex text-sm gap-x-4 font-semibold">
          <div className="flex items-center gap-x-1">
            <input type="range"
              min={8}
              max={50}
              value={length}
              className="cursor-pointer" onChange={(e) => { setLength(e.target.value) }}></input>
            <label>Lenth:{length}</label>
          </div>
          {/* number and charector checkBox */}
          <div className="flex items-center gap-x-1">
            <input type="checkbox"
              defaultChecked={numAllow}
              id="NumberInput"
              onChange={() => {
                setNumAllow((prev) => !prev)
              }} />
            <label htmlFor="NumberInput">Numbers</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input type="checkbox"
              defaultChecked={charAllow}
              id="charecterInput"
              onChange={() => {
                setCharAllow((prev) => !prev)
              }} />
            <label htmlFor="charecterInput">Charecters</label>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
