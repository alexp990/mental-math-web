import { useState, useEffect } from 'react';
import { Button } from './components/ui/button';
// function for random ranges
const randomIntegerRange = (mi, ma) => {
  return Math.floor(Math.random() * (ma - mi + 1) + mi);
}

export function GameScreen({ onGoHome, selectedModes, ranges, onGameOver, userTime }) {

  const [answer, setAnswer] = useState("");
  const [flash, setFlash] = useState(null);
  const [score, setScore] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [time, setTime] = useState(userTime);
  const [elapsed, setElapsed] = useState(0);
  const [started, setStarted] = useState(false);

  const wordToSymbolMap = {
    'addition': '+',
    'subtraction': '-',
    'multiplication': '×',
    'division': '÷'
  }; // Maps words onto symbols for display

  const generateQuestion = () => {
    const operator = selectedModes[Math.floor(Math.random() * selectedModes.length)];
    let num1 = randomIntegerRange(ranges[operator]["min1"], ranges[operator]["max1"]);
    let num2 = randomIntegerRange(ranges[operator]["min2"], ranges[operator]["max2"]);

    let correct;

    switch (operator) {
      case "addition":
        correct = num1 + num2;
        break;
      case "subtraction":
        // Makes sure that num2 is smaller than num1 to avoid negative answer
        const actualNum1 = Math.max(num1, num2);
        const actualNum2 = Math.min(num1, num2)
        num1 = actualNum1;
        num2 = actualNum2;
        correct = num1 - num2;
        break;
      case "multiplication":
        correct = num1 * num2;
        break;
      case "division":
        // Makes sure that correct divides by num2
        correct = randomIntegerRange(ranges[operator]["min1"], ranges[operator]["max1"]);
        num2 = randomIntegerRange(ranges[operator]["min2"], ranges[operator]["max2"]);
        num1 = correct * num2;
        break;
    }
    return { num1, operator, num2, correct };
  }

  const [currQuestion, setCurrQuestion] = useState(() => generateQuestion());

  useEffect(() => {
    setStarted(true);
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onGoHome();
      }
      else if (event.key === "Enter") {
        // Checks if the answer is correct and updates score
        if (Number(answer) === currQuestion.correct) {
          setFlash("green");
          setTimeout(() => {
            setFlash("");
            setCurrQuestion(generateQuestion());
            setAnswer("");
            setScore(s => (s + 1));
          }, 75);

        } else {
          setFlash("red");
          setTimeout(() => {
            setFlash("");
            setAnswer("");
            setWrong(w => (w + 1));
            // setCurrQuestion(generateQuestion());
          }, 75);

        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {

      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onGoHome, answer, currQuestion]);
  // Timer logic
  useEffect(() => {
    if (!started) return;

    const interval = setInterval(() => {
      setTime(t => (t - 1));
      setElapsed(e => (e + 1));
    }, 1000);
    return () => clearInterval(interval);

  }, [started])
  useEffect(() => {
    if (time <= 0) {
      setStarted(false);
      onGameOver({ score, wrong });
    }
  }, [time, score, wrong, onGameOver]);

  return (
    <div className='flex flex-col justify-center items-center gap-2 text-6xl text-red-600'>
      Mental Maths
      <div className="text-2xl text-white">Score:{score}</div>
      <div className='text-2xl text-white'>Wrong:{wrong}</div>
      <div className="text-2xl text-white" >Time left:{time}</div>
      <div className='flex flex-row justify-center items-center gap-2 text-4xl text-white'>
        <div className='whitespace-nowrap '>
          {currQuestion.num1} {wordToSymbolMap[currQuestion.operator]} {currQuestion.num2} =
        </div>
        {/* Makes button flash green/red depending on answer*/}
        <input autoFocus type="text" className={`w-32 outline-none  border-2 border-amber-400 rounded-md bg-blue-600 ${flash === "green"
          ? "bg-green-500 border-green-500"
          : flash === "red"
            ? "bg-red-500 border-red-500"
            : "bg-blue-600 border-amber-400"
          }`} value={answer} onChange={(e) => setAnswer(e.target.value)} />
      </div>
      <Button className='bg-blue-300 hover:bg-blue-200 w-fit p-6' onClick={onGoHome}>Home</Button>
    </div>
  );
}
