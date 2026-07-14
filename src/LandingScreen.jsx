import { Button } from './components/ui/button';

export function LandingScreen({ onSignOut, onStartGame, selectedModes, setSelectedModes, ranges, setRanges, userTime, setUserTime }) {

  const handleRangeChange = (mode, field, newValue) => {
    setRanges({
      ...ranges, [mode]: { ...ranges[mode], [field]: parseInt(newValue) || 0 }
    });
  };

  const handleCheckboxChange = (mode) => {
    if (selectedModes.includes(mode)) {
      setSelectedModes(selectedModes.filter(m => m !== mode));
    }
    else {
      setSelectedModes([...selectedModes, mode]);
    }
  }
  const availableModes = ['addition', 'subtraction', 'multiplication', 'division'];
  const inputStyle = "w-20 text-white text-center px-1 rounded [appearance:textfield] border border-game-secondary";

  return (
    <div className='flex flex-col justify-center items-center gap-8 text-game-text'>
      <h2 className='text-6xl'>Select Gamemodes</h2>
      <Button onClick={onSignOut}>
        Sign out
      </Button>
      <div className='flex flex-col items-start gap-6'>
        {availableModes.map((mode) => (
          <div key={mode} className='flex flex-row gap-5 items-center text-4xl'>

            <label className=' flex flex-row justify-center gap-4 capitalize'>
              <input type="checkbox" checked={selectedModes.includes(mode)} onChange={() => handleCheckboxChange(mode)} className='accent-game-accent w-10 h-10' />
              {mode}:
            </label>

            <div className='flex items-center gap-3'>
              <span> (</span>
              <input className={inputStyle} type="number" value={ranges[mode].min1 || ''} onChange={(e) => handleRangeChange(mode, 'min1', e.target.value)} />
              <span >to</span>
              <input className={inputStyle} type="number" value={ranges[mode].max1 || ''} onChange={(e) => handleRangeChange(mode, 'max1', e.target.value)} />
              <span>) </span>

              <span>and</span>

              <span> (</span>
              <input className={inputStyle} type="number" value={ranges[mode].min2 || ''} onChange={(e) => handleRangeChange(mode, 'min2', e.target.value)} />
              <span >to</span>
              <input className={inputStyle} type="number" value={ranges[mode].max2 || ''} onChange={(e) => handleRangeChange(mode, 'max2', e.target.value)} />
              <span>) </span>


            </div>

          </div>
        ))}
      </div>
      <div className='flex flex-row justify-center items-center gap-4 text-3xl'>
        <div>
          Set User Time:
        </div>
        <input className={inputStyle} type="number" value={userTime} onChange={(e) => setUserTime(parseInt(e.target.value) || '')} />
      </div>
      <Button className='bg-game-primary hover:bg-game-secondary p-6 w-30 h-20' onClick={onStartGame}>Start Game</Button>
    </div>
  );
}
