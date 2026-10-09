import { DataDrivenSection } from '../EntityRenderers';
import { FLOOR_SETTINGS_SECTION } from '@/config/entity-ui-mapping';

export function FloorSettingsSection() {
  return <DataDrivenSection section={FLOOR_SETTINGS_SECTION} className="floor-settings-section" />;
}
