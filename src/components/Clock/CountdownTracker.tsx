import { useEffect, useState }  from 'react';
import '../Clock/Clock.scss';


interface CountdownTrackerProps {
  label: string;
  value: number;
}

const CountdownTracker: React.FC<CountdownTrackerProps> = ({ label, value }) => {
  const [flip, setFlip] = useState(false);

  useEffect(() => {
      setFlip(true);
      setTimeout(() => setFlip(false), 300);
  }, [value]);

  return (
      <div className="flip-clock__piece">
          <div className="flip-clock__slot">

              <div className={`card ${flip ? 'flip' : ''}`} data-value={value}>
                  <span className="card__top">{value}</span>
                  <span className="card__bottom" data-value={value}></span>
                  <div className="card__back">
                      <span className="card__top"></span>
                      <span className="card__bottom" data-value={value}></span>
                  </div>
              </div>
              <span className='label'>{label}</span>
          </div>
      </div>
  );
}

export default CountdownTracker;

