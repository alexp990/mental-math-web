import { useState, useEffect } from 'react';
import { Button } from './components/ui/button';

const randomIntegerRange = (mi, ma) => {
  return Math.floor(Math.random() * (ma - mi + 1) + mi);
}
// sdfasdfasdfasdfasdfasdfasdfafff
// branch testing
const brrr = "brr";
export function GameScreen({ onGoHome, selectedModes, ranges }) {

      const [answer, setAnswer] = useState("");
      const [flash,setFlash] = useState(null);
      const [score,setScore] = useState(0);
      const [time,setTime] = useState(20);
      const [elapsed,setElapsed] = useState(0);
      const [started,setStarted] = useState(false);

  const generateQuestion = () => {
    const operator = selectedModes[Math.floor(Math.random() * selectedModes.length)];
    const num1 = randomIntegerRange(ranges[operator]["min1"],ranges[operator]["max1"]);
    const num2 = randomIntegerRange(ranges[operator]["min2"], ranges[operator]["max2"]);
    let correct;

    switch (operator) {
      case "addition":
        correct = num1 + num2;
        break;
      case "subtraction":
        correct = num1 - num2;
        break;
      case "multiplication":
        correct = num1 * num2;
        break;
      case "division":
        correct = num1 / num2;
        break;
  }
    return { num1, operator, num2,correct};
  }

  const [currQuestion, setCurrQuestion] = useState(() => generateQuestion());

  useEffect(() => {
    setStarted(true);
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onGoHome();
      }
      else if (event.key === "Enter") {
        if (Number(answer) === currQuestion.correct) {
          setFlash("green");
          setTimeout(() => {
            setFlash("");
            setCurrQuestion(generateQuestion());
            setAnswer("");
            setScore(c => (c+1));
  }, 300);

        }else {
          setFlash("red");
          setTimeout(() => {
            setFlash("");
            setAnswer("");
          }, 300);

        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {

      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onGoHome,answer,currQuestion]);

  useEffect(() => {
    if (!started) return;

    const interval = setInterval(() => {
      setTime(t => {
        if (t <= 1) {
          setStarted(false);
          return 0;
    }
    return t - 1;
  });
      setElapsed(e => (e+1))
    },1000);
    return () => clearInterval(interval);

  }, [started])

  return (
    <div className='flex flex-col justify-center items-center gap-2 text-6xl text-red-600'>
      Mental Maths
      <div className="text-2xl text-white">Score:{score}</div>
      <div className="text-2xl text-white" >Time left:{time}</div>
      <div className='flex flex-row justify-center items-center gap-2 text-4xl text-white'>
        <div className='whitespace-nowrap '>
          {currQuestion.num1} {currQuestion.operator} {currQuestion.num2} =
        </div>
        <input autoFocus type="text" className={`w-32 outline-none  border-2 border-amber-400 rounded-md bg-blue-600 ${
    flash === "green"
      ? "bg-green-500 border-green-500"
      : flash === "red"
      ? "bg-red-500 border-red-500"
      : "bg-blue-600 border-amber-400"
  }`} value={answer} onChange={(e) => setAnswer(e.target.value)}/>
      </div>
      <Button onClick={() => setCurrQuestion(generateQuestion())}>New Question</Button>

      <Button className='bg-blue-300 hover:bg-blue-200 w-fit p-6' onClick={onGoHome}>Home</Button>
    </div>
  );
}
