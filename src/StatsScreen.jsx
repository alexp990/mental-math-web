import { Button } from './components/ui/button';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export function StatsScreen({ onGoHome, historicalSessions }) {
  // const historicalRatios = historicalSessions.map(session => session.scoretimeratio);
  // const historicalPercentages = historicalSessions.map(session => session.percentage);

  // // Gets Oldest Date
  // const sessionDates = historicalSessions.filter(session => session.date); // Throws away any games that dont have dates
  // let maxDaysLimit = 1; // For someone who hasnt played at all
  //
  // if (sessionDates.length > 0) {
  //   const oldestTimestamp = Math.min(...sessionDates.map(s => new Date(s.date).getTime())); // getTime converts into milliseconds
  //   const todayTimestamp = new Date().getTime();
  //
  //   const timeDiffInMs = Math.abs(todayTimestamp - oldestTimestamp);
  //   maxDaysLimit = Math.ceil(timeDiffInMs / (1000 * 60 * 60 * 24));
  //
  // };

  // Inputs gotten from slider for average calculation
  // const [userStartDate, setUserStartDate] = useState(maxDaysLimit); // 10 Days ago
  // const [userEndDate, setUserEndDate] = useState(0); // Today


  // const getDataInLastDays = (lastDays) => {
  //   let lastDaysAgo = new Date();
  //   lastDaysAgo.setDate(lastDaysAgo.getDate() - lastDays);
  //
  //   const recentSessions = historicalSessions.filter(session => {
  //     const sessionDate = new Date(session.date);
  //     return sessionDate >= lastDaysAgo;
  //   });
  //
  //   console.log("recent sessions", recentSessions)
  //   return recentSessions;
  // };
  //

  const getGraphData = () => {
    return historicalSessions.map((session, i) => ({
      ...session,
      index: i,
      timestamp: new Date(session.date).getTime(),
      displayDate: new Date(session.date).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    }))
      .sort((a, b) => a.timestamp - b.timestamp)
      .map((session, idx) => ({ ...session, index: idx }));
  };

  const chartData = getGraphData();

  return (
    <div className="flex flex-col w-screen min-h-screen justify-center items-center bg-game-bg">
      <div className='relative w-full h-[80vh] px-6'>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} layout="horizontal">
            <XAxis
              dataKey="index"
              stroke="#94a3b8"
              fontSize={12}
              tickLine={false}
              tickFormatter={(indexValue) => {
                const session = chartData[indexValue];
                return session ? session.displayDate : '';
              }}

            />
            <YAxis
              stroke="#94a3b8"
              fontSize={12}
              tickLine={false}
              domain={['auto', 'auto']}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #475569',
                borderRadius: '0.5rem'
              }}
              labelStyle={{ color: '#f8fafc' }}
              labelFormatter={(indexValue) => {
                const session = chartData[indexValue];
                return session ? session.displayDate : '';
              }}
            />
            <Line
              type="monotone"
              dataKey="scoretimeratio"
              name="Ratio"
              stroke="#38bdf8"
              strokeWidth={3}
              dot={{ fill: '#38bdf8', r: 4 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <Button type="button" onClick={onGoHome} className="bg-game-primary w-30 h-20 p-6">
        Home
      </Button>
    </div>
  );
}
