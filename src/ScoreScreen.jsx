import { Button } from './components/ui/button';
export function ScoreScreen({ score, onGoHome }) {
  return (
    <div>
      <h1 className="">END SCREEN</h1>
      <p>Your score: {score}</p>

        <Button onClick={onGoHome}>Home</Button>
    </div>
  );
}