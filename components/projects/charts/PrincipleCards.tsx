'use client';

interface Principle {
  icon: string;
  title: string;
  description: string;
}

interface PrincipleCardsProps {
  principles: Principle[];
}

export default function PrincipleCards({ principles }: PrincipleCardsProps) {
  return (
    <div className="principle-cards-grid">
      {principles.map((p, i) => (
        <div key={i} className="principle-card">
          <div className="principle-card-icon">{p.icon}</div>
          <div className="principle-card-title">{p.title}</div>
          <div className="principle-card-desc">{p.description}</div>
          <div className="principle-card-number">0{i + 1}</div>
        </div>
      ))}
    </div>
  );
}
