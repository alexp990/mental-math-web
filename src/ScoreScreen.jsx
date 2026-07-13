export function ScoreScreen({ score, onGoHome }) {
  return (
    <div>
      <h1>END SCREEN</h1>
      <p>Your score: {score}</p>

      <button onClick={onGoHome}>
        Home
      </button>
    </div>
  );
}