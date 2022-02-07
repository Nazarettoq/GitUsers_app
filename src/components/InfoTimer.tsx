import React, { Dispatch, useEffect, useState } from 'react';
import { SearchUserType } from '../App';
import style from '../styles/Timer.module.css';

const accessTime = 60;
type PropsType = {
  timerCount: boolean;
  setTimerCountDafault: (isTimerOn: boolean) => void;
  setCurrentUser: Dispatch<SearchUserType | null>;
};
export const InfoTimer: React.FC<PropsType> = ({
  timerCount,
  setTimerCountDafault,
  setCurrentUser,
}) => {
  const [time, setTime] = useState(accessTime);

  useEffect(() => {
    if (time == 0) {
      setTimerCountDafault(false);
      setCurrentUser(null);
    }
  }, [time]);

  useEffect(() => {
    if (timerCount != false) {
      console.log('timer is on');
      const IntervalId = setInterval(() => {
        setTime((prevtime) => prevtime - 1);
      }, 1000);

      return () => {
        clearInterval(IntervalId);
      };
    }
  }, [timerCount]);
  return (
    <>
      <div style={{ position: 'fixed' }}>
        <Progress time={time} />
      </div>
    </>
  );
};
type PropsTypee = {
  time: number;
};

const Progress: React.FC<PropsTypee> = ({ time }) => {
  const [barWidth, setBarWidth] = useState(100);

  useEffect(() => {
    setBarWidth((time / accessTime) * 100);
  }, [time]);
  const fillerStyles = {
    width: `${barWidth}%`,
    backgroundColor: 'rgb(247,248,250)',
    borderRadius: 'inherit',
    textAlign: 'center',
  } as React.CSSProperties;

  return (
    <div>
      <div className={style.containerStyles}>
        <div style={fillerStyles}>
          <span
            className={style.labelStyles}
            role="progressbar"
            aria-valuenow={time}
            aria-valuemin={0}
            aria-valuemax={accessTime}>
            {`${time}`}
          </span>
        </div>
      </div>
    </div>
  );
};
