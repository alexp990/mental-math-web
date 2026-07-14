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
      <p className='text-6xl text-game-text'>Your score: {score}</p>
      <p className='text-4xl text-game-text'>Wrong answers: {wrong}</p>
      {/* <p className='text-4xl text-game-text'>Percentage: {`${(score / (score + wrong)).toFixed(2) * 100}%`}</p> */}
      <p className='text-4xl text-game-text'>Score/Time ratio:{score / time}</p>
      <Button className='bg-game-primary hover:bg-game-secondary w-30 h-20 p-6' onClick={onGoHome}>Home</Button>
    </div>
  );
}
