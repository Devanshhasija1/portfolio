'use client';

interface Feature {
  name: string;
  values: ('yes' | 'no' | 'partial' | string)[];
}

interface ComparisonMatrixProps {
  columns: string[];
  features: Feature[];
  highlightCol?: number;
}

const COLORS = {
  headerBg: 'rgba(99,99,189,0.08)',
  headerText: 'rgba(242,242,242,0.5)',
  rowBg: 'rgba(255,255,255,0.02)',
  rowBgAlt: 'rgba(255,255,255,0.04)',
  border: 'rgba(242,242,242,0.06)',
  featureName: 'rgba(242,242,242,0.7)',
  yes: '#6363bd',
  no: 'rgba(242,242,242,0.12)',
  partial: 'rgba(242,242,242,0.3)',
  highlightBg: 'rgba(99,99,189,0.06)',
  highlightBorder: 'rgba(99,99,189,0.2)',
};

function Indicator({ value }: { value: string }) {
  if (value === 'yes') {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="9" fill={COLORS.yes} opacity={0.15} />
        <path d="M6 10.5l2.5 2.5 5.5-5.5" stroke={COLORS.yes} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (value === 'no') {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="9" fill={COLORS.no} />
        <path d="M7 7l6 6M13 7l-6 6" stroke="rgba(242,242,242,0.2)" strokeWidth={1.5} strokeLinecap="round" />
      </svg>
    );
  }
  if (value === 'partial') {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="9" fill={COLORS.partial} opacity={0.15} />
        <path d="M6 10h8" stroke={COLORS.partial} strokeWidth={2} strokeLinecap="round" />
      </svg>
    );
  }
  return <span className="comparison-text-value">{value}</span>;
}

export default function ComparisonMatrix({ columns, features, highlightCol = -1 }: ComparisonMatrixProps) {
  return (
    <div className="comparison-matrix-wrap">
      <div className="comparison-matrix">
        <div className="comparison-row comparison-header">
          <div className="comparison-cell comparison-feature-cell" />
          {columns.map((col, i) => (
            <div
              key={i}
              className={`comparison-cell comparison-col-header ${i === highlightCol ? 'comparison-highlight' : ''}`}
            >
              {col}
            </div>
          ))}
        </div>
        {features.map((feature, fi) => (
          <div key={fi} className={`comparison-row ${fi % 2 === 0 ? 'comparison-row-even' : ''}`}>
            <div className="comparison-cell comparison-feature-cell">{feature.name}</div>
            {feature.values.map((val, vi) => (
              <div
                key={vi}
                className={`comparison-cell ${vi === highlightCol ? 'comparison-highlight' : ''}`}
              >
                <Indicator value={val} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
