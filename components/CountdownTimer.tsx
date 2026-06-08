"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDate: Date;
  label?: string;
  large?: boolean;
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function getTimeLeft(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds };
}

function TimeBlock({
  value,
  labelText,
  large,
}: {
  value: number;
  labelText: string;
  large?: boolean;
}) {
  const prev = useRef(value);
  const changed = prev.current !== value;
  prev.current = value;

  return (
    <div className="flex flex-col items-center gap-1">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={changed ? { scale: 1.2, opacity: 0.7 } : false}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.15, type: "spring", stiffness: 400 }}
          className={`font-mono font-bold text-acid tabular-nums ${large ? "text-5xl" : "text-4xl"}`}
        >
          {pad(value)}
        </motion.span>
      </AnimatePresence>
      <span className="text-[9px] font-mono tracking-widest text-zinc-600 uppercase">
        {labelText}
      </span>
    </div>
  );
}

export function CountdownTimer({ targetDate, label, large }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft(targetDate));
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const initial = getTimeLeft(targetDate);
    if (
      initial.days === 0 &&
      initial.hours === 0 &&
      initial.minutes === 0 &&
      initial.seconds === 0
    ) {
      setExpired(true);
      return;
    }

    setTimeLeft(initial);

    const interval = setInterval(() => {
      const tl = getTimeLeft(targetDate);
      setTimeLeft(tl);
      if (tl.days === 0 && tl.hours === 0 && tl.minutes === 0 && tl.seconds === 0) {
        setExpired(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (expired) {
    return (
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-acid animate-pulse" />
        <span className="font-mono text-sm font-bold text-acid tracking-wider">
          DROP EM CURSO
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <p className="text-[10px] font-mono tracking-widest text-zinc-600 uppercase">
          {label}
        </p>
      )}
      <div className="flex items-end gap-3">
        <TimeBlock value={timeLeft.days} labelText="DIAS" large={large} />
        <span className="font-mono text-2xl text-zinc-700 mb-4">:</span>
        <TimeBlock value={timeLeft.hours} labelText="HORAS" large={large} />
        <span className="font-mono text-2xl text-zinc-700 mb-4">:</span>
        <TimeBlock value={timeLeft.minutes} labelText="MINS" large={large} />
        <span className="font-mono text-2xl text-zinc-700 mb-4">:</span>
        <TimeBlock value={timeLeft.seconds} labelText="SEGS" large={large} />
      </div>
    </div>
  );
}
