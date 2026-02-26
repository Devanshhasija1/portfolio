'use client';

interface StateNode {
  id: string;
  label: string;
  x: number;
  y: number;
  type: 'initial' | 'active' | 'terminal' | 'default';
}

interface StateEdge {
  from: string;
  to: string;
  label?: string;
}

interface WidgetStateMapProps {
  states: StateNode[];
  transitions: StateEdge[];
  width?: number;
  height?: number;
}

const NODE_W = 140;
const NODE_H = 40;
const NODE_R = 20;

const COLORS: Record<string, { fill: string; stroke: string }> = {
  initial: { fill: 'rgba(99,99,189,0.15)', stroke: '#6363bd' },
  active: { fill: 'rgba(78,205,196,0.1)', stroke: '#4ecdc4' },
  terminal: { fill: 'rgba(255,107,107,0.1)', stroke: '#ff6b6b' },
  default: { fill: '#1a1a2e', stroke: '#2a2a40' },
};

const TEXT_COLOR = 'rgba(242,242,242,0.85)';
const EDGE_COLOR = 'rgba(242,242,242,0.12)';
const LABEL_COLOR = 'rgba(242,242,242,0.35)';

function getCenter(node: StateNode): [number, number] {
  return [node.x + NODE_W / 2, node.y + NODE_H / 2];
}

function getEdgePath(from: StateNode, to: StateNode) {
  const [fx, fy] = getCenter(from);
  const [tx, ty] = getCenter(to);
  const dx = tx - fx;
  const dy = ty - fy;

  let sx: number, sy: number, ex: number, ey: number;
  if (Math.abs(dx) > Math.abs(dy)) {
    sx = dx > 0 ? from.x + NODE_W : from.x;
    sy = fy;
    ex = dx > 0 ? to.x : to.x + NODE_W;
    ey = ty;
  } else {
    sx = fx;
    sy = dy > 0 ? from.y + NODE_H : from.y;
    ex = tx;
    ey = dy > 0 ? to.y : to.y + NODE_H;
  }

  const mx = (sx + ex) / 2;
  const my = (sy + ey) / 2;

  if (Math.abs(dx) > 20 && Math.abs(dy) > 20) {
    const cx = Math.abs(dx) > Math.abs(dy) ? mx : sx;
    const cy = Math.abs(dx) > Math.abs(dy) ? sy : my;
    return { path: `M ${sx} ${sy} Q ${cx} ${cy} ${ex} ${ey}`, mx: (sx + ex + cx) / 3, my: (sy + ey + cy) / 3 };
  }
  return { path: `M ${sx} ${sy} L ${ex} ${ey}`, mx, my };
}

export default function WidgetStateMap({ states, transitions, width = 860, height = 500 }: WidgetStateMapProps) {
  const stateMap = new Map(states.map((s) => [s.id, s]));

  return (
    <div className="flowchart-container">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Widget state map"
      >
        <defs>
          <marker id="state-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <path d="M 0 0 L 8 3 L 0 6 Z" fill="rgba(242,242,242,0.2)" />
          </marker>
        </defs>

        {/* Legend */}
        {[
          { label: 'Initial', color: COLORS.initial },
          { label: 'Active', color: COLORS.active },
          { label: 'Terminal', color: COLORS.terminal },
        ].map((item, i) => (
          <g key={i} transform={`translate(${width - 280 + i * 90}, 12)`}>
            <rect width={10} height={10} rx={5} fill={item.color.fill} stroke={item.color.stroke} strokeWidth={1} />
            <text x={16} y={9} fontSize={10} fill={LABEL_COLOR} fontFamily="Neue Montreal, sans-serif">{item.label}</text>
          </g>
        ))}

        {transitions.map((edge, i) => {
          const from = stateMap.get(edge.from);
          const to = stateMap.get(edge.to);
          if (!from || !to) return null;
          const { path, mx, my } = getEdgePath(from, to);
          return (
            <g key={`e-${i}`}>
              <path d={path} fill="none" stroke={EDGE_COLOR} strokeWidth={1.2} markerEnd="url(#state-arrow)" />
              {edge.label && (
                <text x={mx} y={my - 6} textAnchor="middle" fontSize={9} fill={LABEL_COLOR} fontFamily="Neue Montreal, sans-serif">
                  {edge.label}
                </text>
              )}
            </g>
          );
        })}

        {states.map((node) => {
          const c = COLORS[node.type] || COLORS.default;
          return (
            <g key={node.id}>
              <rect
                x={node.x}
                y={node.y}
                width={NODE_W}
                height={NODE_H}
                rx={NODE_R}
                fill={c.fill}
                stroke={c.stroke}
                strokeWidth={1.2}
              />
              <text
                x={node.x + NODE_W / 2}
                y={node.y + NODE_H / 2 + 4}
                textAnchor="middle"
                fontSize={11}
                fill={TEXT_COLOR}
                fontFamily="Neue Montreal, sans-serif"
                fontWeight={node.type === 'initial' ? 500 : 400}
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
