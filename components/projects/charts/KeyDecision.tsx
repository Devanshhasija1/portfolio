'use client';

interface KeyDecisionProps {
  number: number;
  title: string;
  context: string;
  decision: string;
  outcome: string;
}

export default function KeyDecision({ number, title, context, decision, outcome }: KeyDecisionProps) {
  return (
    <div className="key-decision">
      <div className="key-decision-number">{String(number).padStart(2, '0')}</div>
      <div className="key-decision-content">
        <h4 className="key-decision-title">{title}</h4>
        <div className="key-decision-row">
          <div className="key-decision-label">Context</div>
          <div className="key-decision-text">{context}</div>
        </div>
        <div className="key-decision-row">
          <div className="key-decision-label">Decision</div>
          <div className="key-decision-text">{decision}</div>
        </div>
        <div className="key-decision-row">
          <div className="key-decision-label">Outcome</div>
          <div className="key-decision-text key-decision-outcome">{outcome}</div>
        </div>
      </div>
    </div>
  );
}
