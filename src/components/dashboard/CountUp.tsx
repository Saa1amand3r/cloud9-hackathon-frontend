import { useEffect, useState, useRef } from 'react';
import Typography from '@mui/material/Typography';
import type { TypographyProps } from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';

interface CountUpProps {
  value: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  variant?: TypographyProps['variant'];
  sx?: SxProps<Theme>;
}

function easeOutExpo(x: number): number {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

export function CountUp({
  value,
  duration = 1000,
  decimals = 0,
  suffix = '',
  prefix = '',
  variant = 'h5',
  sx,
}: CountUpProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const frameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    startTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);

      setDisplayValue(easedProgress * value);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [value, duration]);

  return (
    <Typography
      variant={variant}
      sx={{
        fontWeight: 700,
        fontVariantNumeric: 'tabular-nums',
        ...sx,
      }}
    >
      {prefix}
      {displayValue.toFixed(decimals)}
      {suffix}
    </Typography>
  );
}
