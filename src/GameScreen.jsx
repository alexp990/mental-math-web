import { useState, useEffect } from 'react';
import { Button } from './components/ui/button';

// 2 minute timer const

const randomIntegerRange = (mi, ma) => {
  return Math.floor(Math.random() * (ma - mi + 1) + mi);
}

export function GameScreen({ onGoHome }) {

  const generateQuestion = () => {
    const num1 = randomIntegerRange(12, 100);
    const num2 = randomIntegerRange(12, 100);
    return { num1, num2 };
  };

  const [currQuestion, setCurrQuestion] = useState(() => generateQuestion());

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onGoHome();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {

      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onGoHome]);

  return (
    <div className='flex flex-col justify-center items-center gap-2 text-6xl text-red-600'>
      Mental Maths
      <div className='flex flex-row justify-center items-center gap-2 text-4xl text-white'>
        <div className='whitespace-nowrap '>
          {currQuestion.num1} + {currQuestion.num2} =
        </div>
        <input autoFocus type="text" className='w-32 outline-none  border-2 border-amber-400 rounded-md bg-blue-600' />
      </div>
      <Button onClick={() => setCurrQuestion(generateQuestion())}>New Question</Button>

      <Button className='bg-blue-300 hover:bg-blue-200 w-fit p-6' onClick={onGoHome}>Home</Button>
    </div>
  );
}
