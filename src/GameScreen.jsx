import { useState, useEffect, useRef } from 'react';
import { Button } from './components/ui/button';

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

  const scoreRef = useRef(0);
  const wrongRef = useRef(0);

  const wordToSymbolMap = {
    addition: '+',
    subtraction: '-',
    multiplication: '×',
    division: '÷'
  };

  const generateQuestion = () => {
    const operator = selectedModes[Math.floor(Math.random() * selectedModes.length)];

    let num1 = randomIntegerRange(
      ranges[operator].min1,
      ranges[operator].max1
    );

    let num2 = randomIntegerRange(
      ranges[operator].min2,
      ranges[operator].max2
    );

    let correct;

    switch (operator) {
      case "addition":
        correct = num1 + num2;
        break;

      case "subtraction":
        if (num2 > num1) [num1, num2] = [num2, num1];
        correct = num1 - num2;
        break;

      case "multiplication":
        correct = num1 * num2;
        break;

      case "division":
        correct = randomIntegerRange(
          ranges[operator].min1,
          ranges[operator].max1
        );
        num2 = randomIntegerRange(
          ranges[operator].min2,
          ranges[operator].max2
        );
        num1 = correct * num2;
        break;
    }

    return { num1, operator, num2, correct };
  };


  const [currQuestion, setCurrQuestion] = useState(() => generateQuestion());


  // start timer
  useEffect(() => {
    setStarted(true);
  }, []);


  // keyboard
  useEffect(() => {

    const handleKeyDown = (event) => {

      if (event.key === "Escape") {
        onGoHome();
      }


      if (event.key === "Enter") {

        if (Number(answer) === currQuestion.correct) {

          setFlash("green");

          setTimeout(() => {
            setFlash(null);
            setAnswer("");
            setCurrQuestion(generateQuestion());

            setScore(s => {
              scoreRef.current = s + 1;
              return s + 1;
            });

          }, 75);


        } else {

          setFlash("red");

          setTimeout(() => {
            setFlash(null);
            setAnswer("");
            setCurrQuestion(generateQuestion());

            setWrong(w => {
              wrongRef.current = w + 1;
              return w + 1;
            });

          }, 75);

        }
      }
    };


    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };


  }, [answer, currQuestion, onGoHome]);



  // timer
  useEffect(() => {

    if (!started) return;


    const interval = setInterval(() => {

      setTime(t => {

        if (t <= 1) {

          clearInterval(interval);
          setStarted(false);

          onGameOver({
            score: scoreRef.current,
            wrong: wrongRef.current,
            elapsed
          });


          return 0;
        }


        return t - 1;

      });


      setElapsed(e => e + 1);


    },1000);



    return () => clearInterval(interval);


  }, [started]);



  return (
    <div className='flex flex-col justify-center items-center gap-6 text-6xl text-white'>

      Mental Maths

      <div className='flex gap-5 text-4xl'>
        <div>Score: {score}</div>
        <div>Wrong: {wrong}</div>
      </div>


      <div className="text-4xl">
        Time left: {time}
      </div>


      <div className='flex items-center gap-2 text-5xl border-2 border-blue-400 p-4 rounded-md'>

        <div>
          {currQuestion.num1} {wordToSymbolMap[currQuestion.operator]} {currQuestion.num2} =
        </div>


        <input
          autoFocus
          className={`w-32 outline-none border-2 rounded-md p-1 ${
            flash === "green"
            ? "bg-green-500"
            : flash === "red"
            ? "bg-red-500"
            : "bg-blue-600"
          }`}
          value={answer}
          onChange={(e)=>setAnswer(e.target.value)}
        />

      </div>


      <Button
        className="bg-blue-700 p-6"
        onClick={onGoHome}
      >
        Home
      </Button>


    </div>
  );
}