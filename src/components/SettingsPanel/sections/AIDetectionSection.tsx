import { DataDrivenSection } from '../EntityRenderers';
import { AI_DETECTION_SECTION } from '@/config/entity-ui-mapping';

export function AIDetectionSection() {
  return <DataDrivenSection section={AI_DETECTION_SECTION} className="ai-detection-section" />;
}
