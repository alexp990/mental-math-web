import { useState, useEffect} from 'react';
import { LandingScreen } from './LandingScreen';
import { GameScreen } from './GameScreen';
import { ScoreScreen } from './ScoreScreen';
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { LoginScreen } from "./LoginScreen";
import { doc, setDoc, getDoc, addDoc, collection} from "firebase/firestore";
import { db } from "./firebase";
import { useRef } from 'react'


function App() {
  const gameSaved = useRef(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [gameOver, setGameOver] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentScreen, setCurrentScreen] = useState('landing') // landing, game, results
  const [selectedModes, setSelectedModes] = useState(['addition', 'subtraction', 'multiplication', 'division']) // a list of selected modes e.g. ['addition', 'division', 'multiplication'] of any length max 4 
  const [userTime, setUserTime] = useState(120) // 2 minutes default
  const [stats, setStats] = useState({
    highScore: 0,
    gamesPlayed: 0,
    totalCorrect: 0,
    totalWrong: 0
  });

  const [ranges, setRanges] = useState({
    addition: { min1: 2, max1: 100, min2: 2, max2: 100 },
    subtraction: { min1: 100, max1: 2, min2: 100, max2: 2 },
    multiplication: { min1: 2, max1: 12, min2: 2, max2: 12 },
    division: { min1: 2, max1: 12, min2: 2, max2: 12 }
  });

  const [finalScore, setFinalScore] = useState(0);
  const [finalWrong, setFinalWrong] = useState(0);

  // Hand-off actions 
  const startGame = () => {
    // Don't start if no game modes selected
    if (selectedModes.length === 0) {
      alert("Please select at least one game mode before starting!");
      return;
    }
    setCurrentScreen('game');
  };

  const endGame = async ({score, wrong}) => {

    if (gameSaved.current) return;

    gameSaved.current = true;
    setFinalScore(score);
    setFinalWrong(wrong);

    const totalQuestions = score + wrong;

    const percentage = totalQuestions === 0
      ? 0
      : `${Math.round((score / totalQuestions) * 100)}%`;

    const session = {
      score: score,
      wrong: wrong,
      percentage: percentage,
      time: userTime,
      date: new Date().toISOString()
    };

    // Save this individual game session
    await addDoc(
      collection(db, "users", user.uid, "sessions"),
      session
    );


    // Update overall stats
    const newStats = {
      highScore: Math.max(stats.highScore, score),
      gamesPlayed: stats.gamesPlayed + 1,
      totalCorrect: stats.totalCorrect + score,
      totalWrong: stats.totalWrong + wrong
    };

    await setDoc(
      doc(db, "users", user.uid, "stats", "overall"),
      newStats
    );

    setStats(newStats);
    setCurrentScreen("results");
  };

  const resetToHome = () => {
    setFinalScore(0);
    setCurrentScreen('landing');
  };
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (!user) return;

    const loadStats = async () => {
      const ref = doc(db, "users", user.uid);
      const snapshot = await getDoc(ref);

      if (snapshot.exists()) {
        setStats(snapshot.data());
      } else {
        await setDoc(ref, stats);
      }
    };

    loadStats();
  }, [user]);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);
    if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <LoginScreen />;
  }

  return (
    <div className='flex min-h-screen w-full flex-col justify-center items-center bg-blue-950'>

      {/* SCREEN 1: LANDING SCREEN */}
      {currentScreen === 'landing' && (
        <LandingScreen
          onSignOut={logout}
          onStartGame={startGame}
          selectedModes={selectedModes}
          setSelectedModes={setSelectedModes}
          ranges={ranges}
          setRanges={setRanges}
          userTime={userTime}
          setUserTime={setUserTime}
        />
      )}

      {/* SCREEN 2: GAMEPLAY SCREEN */}
      {currentScreen === 'game' && (
        <GameScreen
          onGoHome={resetToHome}
          onGameOver={endGame}
          selectedModes={selectedModes}
          ranges={ranges}
          userTime={userTime}
        />
      )}
      {/* SCREEN 3: SCORE SCREEN */}
      {currentScreen === "results" && (
        <ScoreScreen
          score={finalScore}
          wrong={finalWrong}
          time={userTime}
          onGoHome={resetToHome}
        />
      )}

    </div>
  );
}
export default App;
