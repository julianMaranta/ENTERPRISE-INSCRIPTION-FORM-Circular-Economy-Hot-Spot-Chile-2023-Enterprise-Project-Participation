// export function getTimeRemaining(endtime: Date | string): Record<string, number> {
//     const t = Date.parse(endtime.toString()) - Date.parse(new Date().toString());
    
//     return {
//       'Total': t,
//       'Days': Math.floor(t / (1000 * 60 * 60 * 24)),
//       'Hours': Math.floor((t / (1000 * 60 * 60)) % 24),
//       'Minutes': Math.floor((t / 1000 / 60) % 60),
//       'Seconds': Math.floor((t / 1000) % 60)
//     };
//   }
  
  function getDaysInMonth(month: number, year: number) {
    return new Date(year, month, 0).getDate();
  }


  export function getTime(): GetTimeProps {
    const t = new Date();
    return {
      'Total': t,
      'Hours': t.getHours() % 12,
      'Minutes': t.getMinutes(),
      'Seconds': t.getSeconds()
    };
  }
  
  export function getTimeRemaining( endtime: string ): TimeRemaining {
    const now = new Date();
    const end = new Date(endtime.toString());
    
    const t = end.getTime() - now.getTime();
  
    const secondsTotal = t / 1000;
    const minutesTotal = secondsTotal / 60;
    const hoursTotal = minutesTotal / 60;
    const daysTotal = hoursTotal / 24;
  
    const daysInCurrentMonth = getDaysInMonth(now.getMonth() + 1, now.getFullYear());
  
    return {
      'Total': Math.floor(t),
      'Months': Math.floor(daysTotal / daysInCurrentMonth),
      'Days': Math.floor(daysTotal) % daysInCurrentMonth,
      'Hours': Math.floor(hoursTotal) % 24,
      'Minutes': Math.floor(minutesTotal) % 60,
      'Seconds': Math.floor(secondsTotal) % 60
    };
  }
  export interface TimeRemaining {
    Total: number;
    Months: number;
    Days: number;
    Hours: number;
    Minutes: number;
    Seconds: number;
  }

  export type EndTimeType = {endtime: string}

  export type GetTimeProps = { Total: Date, Hours: number, Minutes: number, Seconds: number }
