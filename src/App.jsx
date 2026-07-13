import { useState } from 'react';
import { LandingScreen } from './LandingScreen';
import { GameScreen } from './GameScreen';
import { ScoreScreen} from './ScoreScreen';


function App() {
  const [gameOver,setGameOver] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentScreen, setCurrentScreen] = useState('landing') // landing, game, results
  const [selectedModes, setSelectedModes] = useState(['addition', 'subtraction', 'multiplication', 'division']) // a list of selected modes e.g. ['addition', 'division', 'multiplication'] of any length max 4 
  const [ranges, setRanges] = useState({
    addition: { min1: 2, max1: 100, min2: 2, max2: 100 },
    subtraction: { min1: 2, max1: 100, min2: 2, max2: 100 },
    multiplication: { min1: 2, max1: 12, min2: 2, max2: 12 },
    division: { min1: 2, max1: 12, min2: 2, max2: 12 }
  });

  const [finalScore, setFinalScore] = useState(0)

  // Hand-off actions 
  const startGame = () => {
    // Dont start if no game modes selected
    if (selectedModes.length === 0) {
      alert("Please select at least one game mode before starting!");
      return;
    }
    setCurrentScreen('game');
  };

  const endGame = (score) => {
    setFinalScore(score);
    setCurrentScreen('results');
  };

  const resetToHome = () => {
    setFinalScore(0);
    setCurrentScreen('landing');
  };

  return (
    <div className='flex min-h-screen w-full flex-col justify-center items-center bg-blue-950'>

      {/* SCREEN 1: LANDING SCREEN */}
      {currentScreen === 'landing' && (
        <LandingScreen
          onStartGame={startGame}
          selectedModes={selectedModes}
          setSelectedModes={setSelectedModes}
          ranges={ranges}
          setRanges={setRanges}
        />
      )}

      {/* SCREEN 2: GAMEPLAY SCREEN */}
      {currentScreen === 'game' && (
        <GameScreen
          onGoHome={resetToHome}
          onGameOver={endGame}
          selectedModes={selectedModes}
          ranges={ranges}
        />
      )}
      {/* SCREEN 3: SCORE SCREEN */}
      {currentScreen === "results" && (
        <ScoreScreen
        score={finalScore}
        onGoHome={resetToHome}
        />
      )}

    </div>
  );
}
export default App;
