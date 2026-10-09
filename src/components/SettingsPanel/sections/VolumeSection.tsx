import { DataDrivenSection } from '../EntityRenderers';
import { VOLUME_SECTION } from '@/config/entity-ui-mapping';

export function VolumeSection() {
  return <DataDrivenSection section={VOLUME_SECTION} className="volume-section" />;
}
