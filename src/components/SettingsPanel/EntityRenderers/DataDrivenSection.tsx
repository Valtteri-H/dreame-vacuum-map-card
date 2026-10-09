import { EntityRenderer } from './EntityRenderer';
import type { SectionDefinition } from '@/config/entity-ui-mapping';

interface DataDrivenSectionProps {
  section: SectionDefinition;
  className?: string;
}

export function DataDrivenSection({ section, className }: DataDrivenSectionProps) {
  return (
    <div className={`data-driven-section ${className ?? ''}`}>
      {section.entities.map((entityDef) => (
        <EntityRenderer key={entityDef.key} definition={entityDef} />
      ))}
    </div>
  );
}
