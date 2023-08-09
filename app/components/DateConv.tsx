"use client";

import React, { useEffect, useState } from "react";

type Props = {
  createdAt: Date;
};

const DateConv: React.FC<Props> = ({ createdAt }) => {
  const [startDate, setStartDate] = useState<Date>(new Date(createdAt));
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const formateDateDifference = (start: Date, end: Date) => {
    const timeDifference = end.getTime() - start.getTime();
    if (timeDifference < 60000) {
      const seconds = Math.floor(timeDifference / 1000);
      return `${seconds} second${seconds === 1 ? "" : "s"}`;
    } else if (timeDifference < 3600000) {
      const minutes = Math.floor(timeDifference / 60000);
      return `${minutes} minute${minutes === 1 ? "" : "s"}`;
    } else if (timeDifference < 86400000) {
      const hours = Math.floor(timeDifference / 3600000);
      return `${hours} hour${hours === 1 ? "" : "s"}`;
    } else if (timeDifference < 604800000) {
      const days = Math.floor(timeDifference / 86400000);
      return `${days} day${days === 1 ? "" : "s"}`;
    } else if (timeDifference < 2419200000) {
      const weeks = Math.floor(timeDifference / 604800000);
      return `${weeks} week${weeks === 1 ? "" : "s"}`;
    } else if (timeDifference < 29030400000) {
      const months = Math.floor(timeDifference / 2419200000);
      return `${months} month${months === 1 ? "" : "s"}`;
    } else {
      const years = Math.floor(timeDifference / 29030400000);
      return `${years} year${years === 1 ? "" : "s"}`;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <div>{formateDateDifference(startDate, currentDate)}</div>;
};

export default DateConv;
