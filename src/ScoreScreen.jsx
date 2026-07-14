import { Button } from './components/ui/button';
import { useEffect } from 'react';

export function ScoreScreen({ score, onGoHome, wrong, time }) {

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onGoHome();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [onGoHome]);

  return (
    <div className='flex flex-col justify-center items-center gap-6'>
      <h1 className="text-green-700 text-8xl">Well Done</h1>
      <p className='text-4xl text-amber-400'>Your score: {score}</p>
      <p className='text-4xl text-red-600'>Number of wrong answers: {wrong}</p>
      <p className='text-4xl text-green-500'>Percentage: {`${(score / (score + wrong)).toFixed(2) * 100}%`}</p>
      <p className='text-4xl text-green-500'>Score/Time ratio:{score / time}</p>
      <Button className='bg-blue-300 hover:bg-blue-200 w-30 h-20 p-6' onClick={onGoHome}>Home</Button>
    </div>
  );
}
