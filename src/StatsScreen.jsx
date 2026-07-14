
import { Button } from './components/ui/button';
export function StatsScreen({ onGoHome }) {
  return (
    <div className="flex flex-col w-screen min-h-screen">
      {/* Graph Space */}
      <div className="flex-1 bg-game-bg flex justify-center items-center border-b border-game-secondary">
        <h2 className="text-4xl text-game-text">Graph Space</h2>
      </div>

      {/* Stats Space */}
      <div className="flex-1 bg-blue-900 flex flex-col justify-center items-center gap-4">
        <h2 className="text-4xl text-game-text">Stats Space</h2>
        <Button
          type="button"
          onClick={onGoHome}
          className="bg-game-primary w-30 h-20 p-6"
        >
          Home
        </Button>
      </div>
    </div>
  );
}
