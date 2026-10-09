import { DataDrivenSection } from '../EntityRenderers';
import { DOCK_SETTINGS_SECTION } from '@/config/entity-ui-mapping';

export function DockSettingsSection() {
  return <DataDrivenSection section={DOCK_SETTINGS_SECTION} className="dock-settings-section" />;
}
