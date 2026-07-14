import { Button } from './components/ui/button';
export function ScoreScreen({ score, onGoHome, wrong }) {
  return (
    <div className='flex flex-col justify-center items-center gap-6'>
      <h1 className="text-green-700 text-8xl">Well Done</h1>
      <p className='text-4xl text-amber-400'>Your score: {score}</p>
      <p className='text-4xl text-red-600'>Number of wrong answers: {wrong}</p>
      <p className='text-4xl text-green-500'>Percentage: {`${(score/(score+wrong)).toFixed(2)*100}%`}</p>
      <Button className='bg-blue-300 hover:bg-blue-200 w-fit p-6' onClick={onGoHome}>Home</Button>
    </div>
  );
}
