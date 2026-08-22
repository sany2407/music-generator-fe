interface EqualizerBarsProps {
  bars?: number;
  className?: string;
  barClassName?: string;
}

const HEIGHTS = [0.5, 0.9, 0.65, 1, 0.4, 0.8, 0.55, 0.95, 0.35, 0.7, 0.85, 0.45];

export default function EqualizerBars({
  bars = 12,
  className = "",
  barClassName = "bg-gradient-to-t from-neon-violet via-neon-pink to-neon-cyan",
}: EqualizerBarsProps) {
  return (
    <div className={`flex items-end gap-[3px] ${className}`}>
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className={`animate-eq w-[4px] origin-bottom rounded-full ${barClassName}`}
          style={{
            height: `${HEIGHTS[i % HEIGHTS.length] * 100}%`,
            animationDelay: `${(i % 7) * 0.13}s`,
            animationDuration: `${0.9 + (i % 5) * 0.17}s`,
          }}
        />
      ))}
    </div>
  );
}
