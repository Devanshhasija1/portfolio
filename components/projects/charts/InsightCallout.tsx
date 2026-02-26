'use client';

interface InsightCalloutProps {
  quote: string;
  source?: string;
  type?: 'research' | 'metric' | 'insight';
}

export default function InsightCallout({ quote, source, type = 'insight' }: InsightCalloutProps) {
  const icons: Record<string, string> = {
    research: '💬',
    metric: '📈',
    insight: '💡',
  };

  return (
    <div className={`insight-callout insight-callout-${type}`}>
      <div className="insight-callout-icon">{icons[type]}</div>
      <blockquote className="insight-callout-quote">{quote}</blockquote>
      {source && <cite className="insight-callout-source">&mdash; {source}</cite>}
    </div>
  );
}
