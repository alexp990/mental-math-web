import { useState, useEffect, useRef } from 'react';
import { LandingScreen } from './LandingScreen';
import { GameScreen } from './GameScreen';
import { ScoreScreen } from './ScoreScreen';

import { auth, db } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { LoginScreen } from "./LoginScreen";

import {
  doc,
  getDoc,
  setDoc,
  addDoc,
  collection
} from "firebase/firestore";


function App(){

const gameSaved = useRef(false);

const [user,setUser] = useState(null);
const [loading,setLoading] = useState(true);

const [currentScreen,setCurrentScreen] = useState("landing");

const [selectedModes,setSelectedModes] = useState([
  "addition",
  "subtraction",
  "multiplication",
  "division"
]);

const [userTime,setUserTime] = useState(120);


const [stats,setStats] = useState({
 highScore:0,
 gamesPlayed:0,
 totalCorrect:0,
 totalWrong:0
});


const [ranges,setRanges]=useState({
 addition:{min1:2,max1:100,min2:2,max2:100},
 subtraction:{min1:2,max1:100,min2:2,max2:100},
 multiplication:{min1:2,max1:12,min2:2,max2:12},
 division:{min1:2,max1:12,min2:2,max2:12}
});


const [finalScore,setFinalScore]=useState(0);
const [finalWrong,setFinalWrong]=useState(0);



useEffect(()=>{

const unsub = onAuthStateChanged(auth,(u)=>{
 setUser(u);
 setLoading(false);
});

return unsub;

},[]);



useEffect(()=>{

if(!user)return;


async function load(){

const ref = doc(db,"users",user.uid,"stats","overall");

const snap = await getDoc(ref);


if(snap.exists()){
 setStats(snap.data());
}


}


load();


},[user]);




const startGame=()=>{

gameSaved.current=false;

setCurrentScreen("game");

};



const endGame=async({score,wrong,time,elapsed})=>{


if(gameSaved.current)return;

gameSaved.current=true;


setFinalScore(score);
setFinalWrong(wrong);



await addDoc(
 collection(db,"users",user.uid,"sessions"),
 {
  score,
  wrong,
  percentage: Math.round(score/(score+wrong)*100) || 0,
  time:userTime,
  scoretimeratio: (score/userTime),
  date:new Date().toISOString()
 }
);



const newStats={
 highScore:Math.max(stats.highScore,score),
 gamesPlayed:stats.gamesPlayed+1,
 totalCorrect:stats.totalCorrect+score,
 totalWrong:stats.totalWrong+wrong
};


await setDoc(
 doc(db,"users",user.uid,"stats","overall"),
 newStats
);


setStats(newStats);

setCurrentScreen("results");

};



const logout=()=>{
 signOut(auth);
};



if(loading)return <div>Loading...</div>;

if(!user)return <LoginScreen/>;



return (

<div className="flex min-h-screen w-full flex-col justify-center items-center bg-blue-950">


{currentScreen==="landing" &&
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
}



{currentScreen==="game" &&
<GameScreen
onGoHome={()=>setCurrentScreen("landing")}
onGameOver={endGame}
selectedModes={selectedModes}
ranges={ranges}
userTime={userTime}
/>
}



{currentScreen==="results" &&
<ScoreScreen
score={finalScore}
wrong={finalWrong}
time={userTime}
onGoHome={()=>setCurrentScreen("landing")}
/>
}



</div>

);

}


export default App;