import { Button } from './components/ui/button';

export function LandingScreen({ onStartGame }) {
  return (
    <Button className='bg-emerald-700 hover:bg-emerald-500 w-fit p-6' onClick={onStartGame}>Start</Button>
  );
}
