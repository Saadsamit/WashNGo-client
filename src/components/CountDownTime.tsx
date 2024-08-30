import moment from "moment";
import Countdown, { CountdownRenderProps } from "react-countdown";

type TCountDownTime = {
  startTime: string;
  date: string;
  className?: string;
  setComplete?: React.Dispatch<React.SetStateAction<boolean>>;
};

const CountDownTime = ({
  startTime,
  date,
  className = "",
  setComplete,
}: TCountDownTime) => {
  const targetDate = moment(date).add(moment.duration(startTime));
  const targetDateTime = moment(targetDate).toDate();
  const padTime = (time: any) => String(time).padStart(2, "0");
  return (
    <Countdown
      date={targetDateTime}
      renderer={({
        days,
        hours,
        minutes,
        seconds,
        completed,
      }: CountdownRenderProps) => {
        if (completed) {
          if (setComplete) {
            setComplete(true);
          }
          return;
        } else {
          return (
            <div className={`font-bold ${className}`}>
              {padTime(days)}:{padTime(hours)}:{padTime(minutes)}:{padTime(seconds)}
            </div>
          );
        }
      }}
    />
  );
};

export default CountDownTime;
