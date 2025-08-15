/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const copyPasswordToClipboard = useCallback(() => {
    if (passwordRef.current) {
      passwordRef.current.select();
      passwordRef.current.setSelectionRange(0, password.length);
      navigator.clipboard.writeText(password);
    }
  }, [password]);

  const generatePassword = useCallback(() => {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) chars += "0123456789";
    if (charAllowed) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?/";

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      newPassword += chars[randomIndex];
    }

    setPassword(newPassword);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, charAllowed, generatePassword]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-orange-400 mb-6">
          Password Generator
        </h1>
        
        <div className="flex mb-4">
          <input
            ref={passwordRef}
            type="text"
            readOnly
            value={password}
            placeholder="Generated Password"
            className="w-full p-2 rounded-l-md bg-gray-200 text-gray-700 focus:outline-none"
          />
          <button
            onClick={copyPasswordToClipboard}
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold p-2 rounded-r-md"
          >
            Copy
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={8}
              max={30}
              value={length}
              className="cursor-pointer w-full"
              onChange={(e) => setLength(Number(e.target.value))}
            />
            <label className="text-white">Length: {length}</label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={numberAllowed}
              id="numbers"
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label htmlFor="numbers" className="text-white">
              Include Numbers
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={charAllowed}
              id="characters"
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label htmlFor="characters" className="text-white">
              Include Special Characters
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
