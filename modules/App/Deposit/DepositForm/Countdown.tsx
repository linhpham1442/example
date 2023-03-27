import { useCountdown } from "@/common/hooks/useCountdown";

const formatCountdown = (minutes: any, seconds: any) => {
  const minutesStr = `0${minutes}`.slice(-2);
  const secondsStr = `0${seconds}`.slice(-2);
  return `${minutesStr}:${secondsStr}`;
};

const Countdown = (props: any) => {
  const [days, hours, minutes, seconds] = useCountdown(props.targetTime);
  return (
    <>
      <div>{`Left ${formatCountdown(minutes, seconds)}`}</div>
    </>
  );
};

export default Countdown;
