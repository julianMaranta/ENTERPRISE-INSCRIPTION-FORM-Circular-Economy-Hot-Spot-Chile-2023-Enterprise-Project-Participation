import React, { useState, useEffect, FC } from "react";
import {  getTime, getTimeRemaining } from '../../utils/getTime';
import CountdownTracker from "./CountdownTracker";
import CountdownFinished from "./CountdowFinished";

interface ClockProps {
  countdown: string;
  callback?: () => void;
}

const Clock: FC<ClockProps> = ({ countdown, callback }) => {
  
  const [trackers, setTrackers] = useState<React.ReactNode[]>([]);
  const [hasFinished, setHasFinished] = useState(false);
  const updateFn = countdown ? getTimeRemaining : getTime;
  useEffect(() => {
    const updateCounters = () => {
      let t;
      if (countdown) {
        t = getTimeRemaining(countdown);
        const newTrackers: React.ReactNode[] = [];
        if (t.Total <= 0) {
          setHasFinished(true);  // Actualizar el estado cuando la cuenta regresiva termine
          if (callback) callback();
      } else { 
  
          if (t.Months > 0) {
              newTrackers.push(<CountdownTracker key="Months" label="Meses" value={t.Months} />);
              newTrackers.push(<CountdownTracker key="Days" label="Días" value={t.Days} />);
              newTrackers.push(<CountdownTracker key="Hours" label="Horas" value={t.Hours} />);
          } else if (t.Days > 0) {
              newTrackers.push(<CountdownTracker key="Days" label="Días" value={t.Days} />);
              newTrackers.push(<CountdownTracker key="Hours" label="Horas" value={t.Hours} />);
              newTrackers.push(<CountdownTracker key="Minutes" label="Minutos" value={t.Minutes} />);
          } else if (t.Hours > 0) {
              newTrackers.push(<CountdownTracker key="Hours" label="Horas" value={t.Hours} />);
              newTrackers.push(<CountdownTracker key="Minutes" label="Minutos" value={t.Minutes} />);
              newTrackers.push(<CountdownTracker key="Seconds" label="Segundos" value={t.Seconds} />);
          } else if (t.Minutes > 0) {
              newTrackers.push(<CountdownTracker key="Hours" label="Horas" value={0} />);
              newTrackers.push(<CountdownTracker key="Minutes" label="Minutos" value={t.Minutes} />);
              newTrackers.push(<CountdownTracker key="Seconds" label="Segundos" value={t.Seconds} />);
          } else { // Solo segundos restantes
              newTrackers.push(<CountdownTracker key="Hours" label="Horas" value={0} />);
              newTrackers.push(<CountdownTracker key="Minutes" label="Minutos" value={0} />);
              newTrackers.push(<CountdownTracker key="Seconds" label="Segundos" value={t.Seconds} />);
          }
      }

        setTrackers(newTrackers);
      }
    }
    updateCounters();

    const intervalId = setInterval(updateCounters, 500);
    
    return () => clearInterval(intervalId);
  }, [countdown, callback, updateFn]);

  if (hasFinished) {
    return <CountdownFinished />;
  }


  return <div className="flip-clock clock">{trackers}</div>;
};

export default Clock;
