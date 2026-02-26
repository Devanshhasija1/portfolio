'use client';

interface BarItem {
  label: string;
  before: number;
  after: number;
  unit?: string;
}

interface HorizontalBarProps {
  items: BarItem[];
  beforeLabel?: string;
  afterLabel?: string;
}

const COLORS = {
  before: '#2a2a40',
  beforeBorder: '#3a3a50',
  after: 'rgba(99,99,189,0.25)',
  afterBorder: '#6363bd',
  text: 'rgba(242,242,242,0.85)',
  dimText: 'rgba(242,242,242,0.4)',
  label: 'rgba(242,242,242,0.6)',
};

const PAD = 32;
const LABEL_W = 150;
const BAR_MAX_W = 340;
const BAR_H = 24;
const ROW_H = 80;
const LEGEND_H = 40;

export default function HorizontalBar({
  items,
  beforeLabel = 'Before',
  afterLabel = 'After',
}: HorizontalBarProps) {
  const totalH = PAD * 2 + LEGEND_H + items.length * ROW_H;
  const totalW = PAD * 2 + LABEL_W + BAR_MAX_W + 80;
  const maxVal = Math.max(...items.flatMap((d) => [d.before, d.after]));

  return (
    <div className="flowchart-container">
      <svg
        viewBox={`0 0 ${totalW} ${totalH}`}
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Before and after comparison chart"
      >
        <g transform={`translate(${PAD}, ${PAD})`}>
          <rect x={LABEL_W - 8} y={0} width={14} height={14} rx={3} fill={COLORS.before} stroke={COLORS.beforeBorder} strokeWidth={1} />
          <text x={LABEL_W + 12} y={12} fontSize={11} fill={COLORS.dimText} fontFamily="Neue Montreal, sans-serif">{beforeLabel}</text>

          <rect x={LABEL_W + 80} y={0} width={14} height={14} rx={3} fill={COLORS.after} stroke={COLORS.afterBorder} strokeWidth={1} />
          <text x={LABEL_W + 100} y={12} fontSize={11} fill={COLORS.dimText} fontFamily="Neue Montreal, sans-serif">{afterLabel}</text>
        </g>

        {items.map((item, i) => {
          const y = PAD + LEGEND_H + i * ROW_H;
          const beforeW = (item.before / maxVal) * BAR_MAX_W;
          const afterW = (item.after / maxVal) * BAR_MAX_W;
          const unit = item.unit || '';

          return (
            <g key={i}>
              <text
                x={PAD + LABEL_W - 12}
                y={y + 20}
                textAnchor="end"
                fontSize={13}
                fill={COLORS.label}
                fontFamily="Neue Montreal, sans-serif"
              >
                {item.label}
              </text>

              <rect
                x={PAD + LABEL_W}
                y={y + 4}
                width={beforeW}
                height={BAR_H}
                rx={5}
                fill={COLORS.before}
                stroke={COLORS.beforeBorder}
                strokeWidth={1}
              />
              <text
                x={PAD + LABEL_W + beforeW + 8}
                y={y + 22}
                fontSize={12}
                fill={COLORS.dimText}
                fontFamily="Neue Montreal, sans-serif"
                fontWeight={500}
              >
                {item.before}{unit}
              </text>

              <rect
                x={PAD + LABEL_W}
                y={y + 4 + BAR_H + 6}
                width={afterW}
                height={BAR_H}
                rx={5}
                fill={COLORS.after}
                stroke={COLORS.afterBorder}
                strokeWidth={1}
              />
              <text
                x={PAD + LABEL_W + afterW + 8}
                y={y + BAR_H + 28}
                fontSize={12}
                fill={COLORS.afterBorder}
                fontFamily="Neue Montreal, sans-serif"
                fontWeight={600}
              >
                {item.after}{unit}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
