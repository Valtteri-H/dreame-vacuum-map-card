import { DataDrivenSection } from '../EntityRenderers';
import { EDGE_CORNER_SECTION } from '@/config/entity-ui-mapping';

export function EdgeCornerSection() {
  return <DataDrivenSection section={EDGE_CORNER_SECTION} className="edge-corner-section" />;
}
