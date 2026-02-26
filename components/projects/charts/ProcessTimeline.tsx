'use client';

interface ProcessStep {
  label: string;
  sub: string;
  icon: string; // single emoji/symbol
}

interface ProcessTimelineProps {
  steps: ProcessStep[];
}

const COLORS = {
  accent: '#6363bd',
  accentDim: 'rgba(99,99,189,0.15)',
  accentBg: 'rgba(99,99,189,0.08)',
  text: 'rgba(242,242,242,0.85)',
  dimText: 'rgba(242,242,242,0.4)',
  line: 'rgba(99,99,189,0.2)',
};

const STEP_W = 120;
const CIRCLE_R = 22;
const GAP = 24;
const PAD = 40;

export default function ProcessTimeline({ steps }: ProcessTimelineProps) {
  const totalW = PAD * 2 + steps.length * STEP_W + (steps.length - 1) * GAP;
  const centerY = 60;

  return (
    <div className="flowchart-container">
      <svg
        viewBox={`0 0 ${totalW} 160`}
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Design process timeline"
      >
        {steps.map((step, i) => {
          const cx = PAD + i * (STEP_W + GAP) + STEP_W / 2;

          return (
            <g key={i}>
              {i < steps.length - 1 && (
                <line
                  x1={cx + CIRCLE_R + 4}
                  y1={centerY}
                  x2={cx + STEP_W + GAP - CIRCLE_R - 4}
                  y2={centerY}
                  stroke={COLORS.line}
                  strokeWidth={1.5}
                  strokeDasharray="6 4"
                />
              )}

              <circle
                cx={cx}
                cy={centerY}
                r={CIRCLE_R}
                fill={COLORS.accentBg}
                stroke={COLORS.accentDim}
                strokeWidth={1.5}
              />

              <text
                x={cx}
                y={centerY + 5}
                textAnchor="middle"
                fontSize={18}
                fontFamily="Neue Montreal, sans-serif"
              >
                {step.icon}
              </text>

              <text
                x={cx}
                y={centerY + CIRCLE_R + 24}
                textAnchor="middle"
                fontSize={13}
                fill={COLORS.text}
                fontFamily="Neue Montreal, sans-serif"
                fontWeight={500}
              >
                {step.label}
              </text>

              <text
                x={cx}
                y={centerY + CIRCLE_R + 42}
                textAnchor="middle"
                fontSize={11}
                fill={COLORS.dimText}
                fontFamily="Neue Montreal, sans-serif"
              >
                {step.sub}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
