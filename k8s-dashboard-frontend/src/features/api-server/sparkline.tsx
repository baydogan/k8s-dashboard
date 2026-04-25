interface SparklineProps {
  data: number[];
  strokeClass?: string;
  fillClass?: string;
  height?: number;
}

export function Sparkline({
  data,
  strokeClass = "stroke-accent",
  fillClass = "fill-accent/10",
  height = 40,
}: SparklineProps) {
  if (data.length < 2) return null;

  const W = 100;
  const H = height;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * W;
    const y = H - ((v - min) / range) * (H - 4) - 2;
    return [x, y] as [number, number];
  });

  const linePath = pts
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`)
    .join(" ");

  const areaPath =
    `${linePath} L${W},${H} L0,${H} Z`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      className="w-full"
      style={{ height }}
    >
      <path d={areaPath} className={fillClass} strokeWidth="0" />
      <path d={linePath} className={strokeClass} fill="none" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}
