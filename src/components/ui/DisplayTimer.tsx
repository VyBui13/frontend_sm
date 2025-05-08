import { useState, useEffect } from 'react';

interface DisplayTimerProps {
    initialSeconds: number;
}

const DisplayTimer: React.FC<DisplayTimerProps> = ({ initialSeconds }) => {
    const [seconds, setSeconds] = useState(initialSeconds);

    useEffect(() => {
        if (seconds <= 0) return;

        const timer = setInterval(() => {
            setSeconds((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [seconds]);

    const formatTime = (totalSeconds: number): string => {
        const minutes = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <span className="text-base font-bold">
            {seconds <= 0 ? '00:00' : formatTime(seconds)}
        </span>
    );
};

export default DisplayTimer;