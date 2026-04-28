import React, { useState, useEffect } from 'react';
import { Lock, Unlock, X, AlertTriangle } from 'lucide-react';
import gsap from 'gsap';

const generatePuzzle = () => {
  const operations = ['+', '-', '*'];
  const op = operations[Math.floor(Math.random() * operations.length)];
  let a, b;
  
  if (op === '*') {
    a = Math.floor(Math.random() * 12) + 1;
    b = Math.floor(Math.random() * 12) + 1;
  } else {
    a = Math.floor(Math.random() * 50) + 10;
    b = Math.floor(Math.random() * 50) + 1;
  }

  if (op === '-' && b > a) {
    const temp = a;
    a = b;
    b = temp;
  }

  let answer;
  switch (op) {
    case '+': answer = a + b; break;
    case '-': answer = a - b; break;
    case '*': answer = a * b; break;
  }

  return { question: `What is ${a} ${op} ${b}?`, answer: answer.toString() };
};

const PuzzleGate = ({ onSuccess, onCancel, theme }) => {
  const [puzzle, setPuzzle] = useState({ question: '', answer: '' });
  const [input, setInput] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [error, setError] = useState('');
  const [isLockedOut, setIsLockedOut] = useState(false);
  const [lockoutTimeLeft, setLockoutTimeLeft] = useState('');

  // Changed key to bypass previous lockout
  const LOCKOUT_KEY = 'fixo_builder_lockout_v2';
  const LOCKOUT_DURATION = 5 * 60 * 60 * 1000;

  useEffect(() => {
    checkLockout();
    if (!isLockedOut) {
      setPuzzle(generatePuzzle());
    }
  }, []);

  const checkLockout = () => {
    const lockoutTime = localStorage.getItem(LOCKOUT_KEY);
    if (lockoutTime) {
      const remainingTime = parseInt(lockoutTime) - Date.now();
      if (remainingTime > 0) {
        setIsLockedOut(true);
        updateLockoutDisplay(remainingTime);
        const interval = setInterval(() => {
          const newRemaining = parseInt(lockoutTime) - Date.now();
          if (newRemaining <= 0) {
            clearInterval(interval);
            localStorage.removeItem(LOCKOUT_KEY);
            setIsLockedOut(false);
            setPuzzle(generatePuzzle());
          } else {
            updateLockoutDisplay(newRemaining);
          }
        }, 1000);
        return () => clearInterval(interval);
      } else {
        localStorage.removeItem(LOCKOUT_KEY);
      }
    }
  };

  const updateLockoutDisplay = (ms) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    setLockoutTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLockedOut) return;

    if (input.trim() === puzzle.answer) {
      onSuccess();
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setInput('');
      
      if (newAttempts >= 3) {
        const lockoutTime = Date.now() + LOCKOUT_DURATION;
        localStorage.setItem(LOCKOUT_KEY, lockoutTime.toString());
        setIsLockedOut(true);
        checkLockout();
      } else {
        setError(`Incorrect. ${3 - newAttempts} attempts remaining.`);
        setPuzzle(generatePuzzle());
      }
    }
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center backdrop-blur-xl bg-black/60 rounded-2xl animate-in fade-in zoom-in-95 duration-300">
      <div className={`relative w-[90%] p-6 rounded-2xl border ${theme === 'dark' ? 'bg-black/80 border-white/10 shadow-[0_0_30px_rgba(168,85,247,0.2)]' : 'bg-white/90 border-purple-500/20 shadow-[0_0_30px_rgba(168,85,247,0.2)]'} backdrop-blur-xl`}>
        <button onClick={onCancel} className={`absolute top-4 right-4 ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black'} transition-colors`}>
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center space-y-4 mt-2">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30 rotate-3 hover:rotate-0 transition-transform">
            {isLockedOut ? <Lock size={28} className="text-white" /> : <Unlock size={28} className="text-white" />}
          </div>
          
          <h2 className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500`}>
            FixO The Builder
          </h2>

          {isLockedOut ? (
            <div className="space-y-3 w-full">
              <div className="flex items-center justify-center gap-2 text-red-500">
                <AlertTriangle size={18} />
                <span className="font-semibold text-sm">Security Lockout Active</span>
              </div>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                You failed the security challenge 3 times. Access to Builder Mode is restricted.
              </p>
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                <p className="text-xs text-red-400 font-mono">Unlocks in: {lockoutTimeLeft}</p>
              </div>
              <button onClick={onCancel} className="mt-4 w-full py-2.5 bg-black/50 hover:bg-black/70 border border-white/10 text-white rounded-xl text-sm transition-colors">
                Return to Normal Chat
              </button>
            </div>
          ) : (
            <>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                To access advanced code generation, prove you are human.
              </p>
              
              <div className={`w-full p-4 rounded-xl font-mono text-lg font-bold tracking-widest border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-purple-400' : 'bg-purple-50 border-purple-100 text-purple-600'}`}>
                {puzzle.question}
              </div>

              {error && <p className="text-xs text-red-500 animate-pulse">{error}</p>}

              <form onSubmit={handleSubmit} className="w-full space-y-3 pt-2">
                <input
                  type="number"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter answer..."
                  className={`w-full text-center p-3 rounded-xl border focus:outline-none focus:border-purple-500 transition-all ${
                    theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'
                  }`}
                  autoFocus
                />
                <button type="submit" className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white font-bold rounded-xl shadow-lg shadow-purple-500/25 transition-all">
                  Unlock Builder Mode
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PuzzleGate;
