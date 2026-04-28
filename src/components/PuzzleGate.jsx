import React, { useState, useEffect } from 'react';
import { Lock, Unlock, X, AlertTriangle } from 'lucide-react';

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

  // Ensure a > b for subtraction to avoid negatives
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

  const LOCKOUT_KEY = 'fixo_builder_lockout';
  const LOCKOUT_DURATION = 5 * 60 * 60 * 1000; // 5 hours

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
        setPuzzle(generatePuzzle()); // Generate new puzzle on fail to prevent brute force
      }
    }
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/60 rounded-2xl animate-in fade-in zoom-in-95 duration-300">
      <div className={`relative w-[90%] p-6 rounded-xl border ${theme === 'dark' ? 'bg-zinc-900 border-white/10' : 'bg-white border-black/10'} shadow-2xl`}>
        <button onClick={onCancel} className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors">
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
            {isLockedOut ? <Lock size={32} className="text-white" /> : <Unlock size={32} className="text-white" />}
          </div>
          
          <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            FixO The Builder Mode
          </h2>

          {isLockedOut ? (
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 text-red-500">
                <AlertTriangle size={18} />
                <span className="font-semibold text-sm">Security Lockout Active</span>
              </div>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                You failed the security challenge 3 times. Access to Builder Mode is restricted.
              </p>
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                <p className="text-xs text-red-400 font-mono">Unlocks in: {lockoutTimeLeft}</p>
              </div>
              <button onClick={onCancel} className="mt-4 w-full py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-sm transition-colors">
                Return to Normal Chat
              </button>
            </div>
          ) : (
            <>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                To access advanced code generation, prove you are human.
              </p>
              
              <div className={`w-full p-4 rounded-lg font-mono text-lg font-bold tracking-widest ${theme === 'dark' ? 'bg-black/50 text-yellow-400' : 'bg-gray-100 text-orange-600'}`}>
                {puzzle.question}
              </div>

              {error && <p className="text-xs text-red-500 animate-pulse">{error}</p>}

              <form onSubmit={handleSubmit} className="w-full space-y-3">
                <input
                  type="number"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter answer..."
                  className={`w-full text-center p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${
                    theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'
                  }`}
                  autoFocus
                />
                <button type="submit" className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white font-bold rounded-lg shadow-lg hover:shadow-orange-500/25 transition-all">
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
