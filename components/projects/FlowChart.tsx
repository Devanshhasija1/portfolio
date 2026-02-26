'use client';

interface FlowNode {
  id: string;
  label: string;
  x: number;
  y: number;
  accent?: boolean;
}

interface FlowEdge {
  from: string;
  to: string;
  label?: string;
}

interface FlowChartProps {
  nodes: FlowNode[];
  edges: FlowEdge[];
  width?: number;
  height?: number;
}

const NODE_W = 160;
const NODE_H = 48;
const NODE_R = 12;
const FONT_SIZE = 13;

const COLORS = {
  nodeFill: '#1a1a2e',
  nodeBorder: '#2a2a40',
  accentBorder: '#6363bd',
  accentFill: 'rgba(99,99,189,0.12)',
  text: 'rgba(242,242,242,0.85)',
  edge: 'rgba(242,242,242,0.15)',
  edgeLabel: 'rgba(242,242,242,0.45)',
  arrowHead: 'rgba(242,242,242,0.3)',
};

function getNodeCenter(node: FlowNode): [number, number] {
  return [node.x + NODE_W / 2, node.y + NODE_H / 2];
}

function getEdgePath(
  from: FlowNode,
  to: FlowNode,
): { path: string; midX: number; midY: number } {
  const [fx, fy] = getNodeCenter(from);
  const [tx, ty] = getNodeCenter(to);

  const dx = tx - fx;
  const dy = ty - fy;

  let startX: number, startY: number, endX: number, endY: number;

  if (Math.abs(dx) > Math.abs(dy)) {
    startX = dx > 0 ? from.x + NODE_W : from.x;
    startY = fy;
    endX = dx > 0 ? to.x : to.x + NODE_W;
    endY = ty;
  } else {
    startX = fx;
    startY = dy > 0 ? from.y + NODE_H : from.y;
    endX = tx;
    endY = dy > 0 ? to.y : to.y + NODE_H;
  }

  const cx = (startX + endX) / 2;
  const cy = (startY + endY) / 2;

  if (Math.abs(dx) > 20 && Math.abs(dy) > 20) {
    const cxCtrl = Math.abs(dx) > Math.abs(dy) ? cx : startX;
    const cyCtrl = Math.abs(dx) > Math.abs(dy) ? startY : cy;
    return {
      path: `M ${startX} ${startY} Q ${cxCtrl} ${cyCtrl} ${endX} ${endY}`,
      midX: (startX + endX + cxCtrl) / 3,
      midY: (startY + endY + cyCtrl) / 3,
    };
  }

  return {
    path: `M ${startX} ${startY} L ${endX} ${endY}`,
    midX: cx,
    midY: cy,
  };
}

export default function FlowChart({ nodes, edges, width = 800, height = 400 }: FlowChartProps) {
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  return (
    <div className="flowchart-container">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Flow chart diagram"
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="8"
            markerHeight="6"
            refX="7"
            refY="3"
            orient="auto"
          >
            <path d="M 0 0 L 8 3 L 0 6 Z" fill={COLORS.arrowHead} />
          </marker>
        </defs>

        {edges.map((edge, i) => {
          const from = nodeMap.get(edge.from);
          const to = nodeMap.get(edge.to);
          if (!from || !to) return null;
          const { path, midX, midY } = getEdgePath(from, to);
          return (
            <g key={`edge-${i}`}>
              <path
                d={path}
                fill="none"
                stroke={COLORS.edge}
                strokeWidth={1.5}
                markerEnd="url(#arrowhead)"
              />
              {edge.label && (
                <text
                  x={midX}
                  y={midY - 6}
                  textAnchor="middle"
                  fontSize={10}
                  fill={COLORS.edgeLabel}
                  fontFamily="Neue Montreal, sans-serif"
                >
                  {edge.label}
                </text>
              )}
            </g>
          );
        })}

        {nodes.map((node) => (
          <g key={node.id}>
            <rect
              x={node.x}
              y={node.y}
              width={NODE_W}
              height={NODE_H}
              rx={NODE_R}
              fill={node.accent ? COLORS.accentFill : COLORS.nodeFill}
              stroke={node.accent ? COLORS.accentBorder : COLORS.nodeBorder}
              strokeWidth={node.accent ? 1.5 : 1}
            />
            <text
              x={node.x + NODE_W / 2}
              y={node.y + NODE_H / 2 + FONT_SIZE / 3}
              textAnchor="middle"
              fontSize={FONT_SIZE}
              fill={COLORS.text}
              fontFamily="Neue Montreal, sans-serif"
              fontWeight={node.accent ? 500 : 400}
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
