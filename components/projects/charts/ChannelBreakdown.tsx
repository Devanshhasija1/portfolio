'use client';

interface Channel {
  name: string;
  pct: number;
  color: string;
}

interface ChannelBreakdownProps {
  channels: Channel[];
  title?: string;
}

const COLORS = {
  text: 'rgba(242,242,242,0.85)',
  dimText: 'rgba(242,242,242,0.4)',
  bg: '#111118',
  ring: 'rgba(242,242,242,0.04)',
};

const SIZE = 200;
const CX = SIZE / 2;
const CY = SIZE / 2;
const R = 76;
const STROKE = 20;

export default function ChannelBreakdown({ channels, title }: ChannelBreakdownProps) {
  let cumulative = 0;
  const circumference = 2 * Math.PI * R;

  const arcs = channels.map((ch) => {
    const offset = cumulative;
    cumulative += ch.pct;
    return { ...ch, offset };
  });

  return (
    <div className="channel-breakdown-wrapper">
      <div className="channel-breakdown-ring">
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} width="100%" aria-label={title || 'Channel breakdown'}>
          <circle cx={CX} cy={CY} r={R} fill="none" stroke={COLORS.ring} strokeWidth={STROKE} />

          {arcs.map((arc, i) => (
            <circle
              key={i}
              cx={CX}
              cy={CY}
              r={R}
              fill="none"
              stroke={arc.color}
              strokeWidth={STROKE}
              strokeDasharray={`${(arc.pct / 100) * circumference} ${circumference}`}
              strokeDashoffset={-(arc.offset / 100) * circumference}
              strokeLinecap="round"
              transform={`rotate(-90 ${CX} ${CY})`}
              opacity={0.85}
            />
          ))}

          <text
            x={CX}
            y={CY - 4}
            textAnchor="middle"
            fontSize={11}
            fill={COLORS.dimText}
            fontFamily="Neue Montreal, sans-serif"
          >
            TOTAL
          </text>
          <text
            x={CX}
            y={CY + 16}
            textAnchor="middle"
            fontSize={20}
            fill={COLORS.text}
            fontFamily="Neue Montreal, sans-serif"
            fontWeight={700}
          >
            100%
          </text>
        </svg>
      </div>

      <div className="channel-breakdown-legend">
        {title && <div className="channel-breakdown-title">{title}</div>}
        {channels.map((ch, i) => (
          <div key={i} className="channel-breakdown-item">
            <span className="channel-breakdown-dot" style={{ background: ch.color }} />
            <span className="channel-breakdown-name">{ch.name}</span>
            <span className="channel-breakdown-pct">{ch.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
