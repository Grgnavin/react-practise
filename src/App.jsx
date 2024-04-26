import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [isNumber, setIsNumber] = useState(false);
  const [isCharacter, setIsCharacter] = useState(false);
  const [password, setPassword] = useState('');

  //useRef hook
  const passwordRef = useRef(null);
  
  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ';

    if(isNumber) str += "0123456789";
    if(isCharacter) str += "~!@#$%^&*(){}[]?<>";

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, isCharacter, isNumber, setPassword]);

  useEffect(() => {
    passwordGenerator()
  }, [length, isCharacter, isNumber, passwordGenerator]);

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 49)
    window.navigator.clipboard.writeText(password);
  }, [password])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md px-4 my-8 text-orange-600 bg-gray-700 rounded text-xl'>
          <div className='flex shadow rounded-lg overflow-hidden mb-4 pt-3'>
              <input 
              type="text" 
              value={password}
              className='outline-none w-full py-1 px-3'
              placeholder='password'
              readOnly
              ref={passwordRef}
              />
              <button onClick={copyToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
          </div>
          <div className='flex text-sm gap-x-2 pb-3'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range"
            min={6}
            max={50}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {
              setLength(e.target.value)
            }}
            />
            <label>Length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox"
            defaultChecked = {isNumber}
            id='numberInput'
            onChange={() => {
              setIsNumber((prev) => !prev);
            }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox"
            defaultChecked = {isCharacter}
            id='characterInput'
            onChange={() => {
              setIsCharacter((prev) => !prev);
            }}
            />
            <label htmlFor="characterInput">Special Character</label>
          </div>
          </div>
      </div>
    </>
  )
}

export default App
