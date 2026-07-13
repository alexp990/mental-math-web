import { Button } from './components/ui/button';

export function LandingScreen({ onStartGame, selectedModes, setSelectedModes, ranges, setRanges }) {
  const handleCheckboxChange = (mode) => {
    if (selectedModes.includes(mode)) {
      setSelectedModes(selectedModes.filter(m => m !== mode));
    }
    else {
      setSelectedModes([...selectedModes, mode]);
    }
  }
  const availableModes = ['addition', 'subtraction', 'multiplication', 'division'];
  return (
    <div className='flex flex-col justify-center items-center gap-8 text-white'>
      <h2 className='text-6xl'>Select Gamemodes</h2>
      <div className='flex flex-col items-start gap-6'>
        {availableModes.map((mode) => (
          <div key={mode} className='flex flex-row gap-5 items-center text-4xl'>

            <label className=' flex flex-row justify-center gap-4'>
              <input type="checkbox" checked={selectedModes.includes(mode)} onChange={() => handleCheckboxChange(mode)} className='accent-blue-600 w-10 h-10' />
              {mode}
            </label>

            <div className='flex items-center'>
              <span>Range (</span>
              <input type="" name="" value="" />
              <span>to</span>
              <input type="" name="" value="" />
              <span>) </span>

            </div>

          </div>
        ))}
      </div>
      <Button className='bg-emerald-700 hover:bg-emerald-500 w-fit p-6' onClick={onStartGame}>Start Game</Button>
    </div>
  );
}
