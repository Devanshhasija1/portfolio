'use client';

interface FunnelStep {
  label: string;
  value: string;
  pct: number; // 0–100, controls width of the bar
}

interface FunnelChartProps {
  steps: FunnelStep[];
  title?: string;
}

const COLORS = {
  barStart: '#6363bd',
  barEnd: '#4a4a8c',
  text: 'rgba(242,242,242,0.85)',
  dimText: 'rgba(242,242,242,0.45)',
  bg: 'rgba(99,99,189,0.06)',
  border: 'rgba(99,99,189,0.12)',
  dropLine: 'rgba(242,242,242,0.06)',
};

const BAR_H = 36;
const GAP = 16;
const LABEL_W = 160;
const VALUE_W = 70;
const MAX_BAR_W = 480;
const PAD = 32;

export default function FunnelChart({ steps, title }: FunnelChartProps) {
  const totalH = PAD * 2 + steps.length * BAR_H + (steps.length - 1) * GAP + (title ? 36 : 0);
  const titleOffset = title ? 36 : 0;

  return (
    <div className="flowchart-container">
      <svg
        viewBox={`0 0 ${LABEL_W + MAX_BAR_W + VALUE_W + PAD * 2 + 20} ${totalH}`}
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={title || 'Funnel chart'}
      >
        {title && (
          <text
            x={PAD}
            y={PAD + 14}
            fontSize={13}
            fill={COLORS.dimText}
            fontFamily="Neue Montreal, sans-serif"
            fontWeight={500}
            letterSpacing="1"
          >
            {title.toUpperCase()}
          </text>
        )}

        {steps.map((step, i) => {
          const y = PAD + titleOffset + i * (BAR_H + GAP);
          const barW = (step.pct / 100) * MAX_BAR_W;

          return (
            <g key={i}>
              <text
                x={PAD + LABEL_W - 12}
                y={y + BAR_H / 2 + 5}
                textAnchor="end"
                fontSize={13}
                fill={COLORS.text}
                fontFamily="Neue Montreal, sans-serif"
                fontWeight={400}
              >
                {step.label}
              </text>

              <rect
                x={PAD + LABEL_W}
                y={y + 2}
                width={barW}
                height={BAR_H - 4}
                rx={6}
                fill={`url(#funnel-grad-${i})`}
                opacity={0.15 + (step.pct / 100) * 0.85}
              />

              <rect
                x={PAD + LABEL_W}
                y={y + 2}
                width={barW}
                height={BAR_H - 4}
                rx={6}
                fill="none"
                stroke={COLORS.border}
                strokeWidth={1}
              />

              <text
                x={PAD + LABEL_W + barW + 12}
                y={y + BAR_H / 2 + 5}
                fontSize={14}
                fill={COLORS.barStart}
                fontFamily="Neue Montreal, sans-serif"
                fontWeight={600}
              >
                {step.value}
              </text>

              {i < steps.length - 1 && (
                <line
                  x1={PAD + LABEL_W}
                  y1={y + BAR_H}
                  x2={PAD + LABEL_W + MAX_BAR_W}
                  y2={y + BAR_H}
                  stroke={COLORS.dropLine}
                  strokeWidth={1}
                />
              )}
            </g>
          );
        })}

        <defs>
          {steps.map((_, i) => (
            <linearGradient key={i} id={`funnel-grad-${i}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={COLORS.barStart} />
              <stop offset="100%" stopColor={COLORS.barEnd} />
            </linearGradient>
          ))}
        </defs>
      </svg>
    </div>
  );
}
