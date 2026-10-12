import { useState } from 'react';
import type { AreaSelectionMode, CleaningSelectionMode, StopAction } from '@/types/homeassistant';
import { useTranslation, useButtonConfig } from '@/hooks';
import { useMachineState, useHass, useEntity, useDeviceEntities } from '@/contexts';
import { DockPopup } from '@/components/DockPopup';
import { shouldOpenDockPopup } from '@/utils/dockPopup';
import { CleanButton, PauseButton, ResumeButton, StopButton, DockButton, TrashButton } from './components';

interface ActionButtonsProps {
  selectedMode: CleaningSelectionMode;
  areaSelectionMode: AreaSelectionMode;
  selectedRoomsCount: number;
  selectedSpotsCount: number;
  onClean: () => void;
  onPause: () => void;
  onResume: () => void;
  onStop: (action: StopAction) => void;
  onDock: () => void;
  onTrash?: () => void;
}

export function ActionButtons({
  selectedMode,
  areaSelectionMode,
  selectedRoomsCount,
  selectedSpotsCount,
  onClean,
  onPause,
  onResume,
  onStop,
  onDock,
  onTrash,
}: ActionButtonsProps) {
  const { t, getRoomCountTranslation } = useTranslation();
  const { getStopAction } = useButtonConfig();
  const { phase, controls } = useMachineState();
  const hass = useHass();
  const entity = useEntity();
  const { get } = useDeviceEntities();
  const [dockPopupOpened, setDockPopupOpened] = useState(false);

  const stopAction = getStopAction();
  const opensDockPopup = shouldOpenDockPopup(phase);

  const getCleanButtonText = (): string => {
    switch (selectedMode) {
      case 'room':
        return getRoomCountTranslation(selectedRoomsCount);
      case 'all':
        return t('actions.clean_all');
      case 'zone':
        return t(areaSelectionMode === 'spot' ? 'actions.spot_clean' : 'actions.zone_clean');
      default:
        return t('actions.clean');
    }
  };

  const handleStop = () => onStop(stopAction);
  const hasRequiredSelection = selectedMode !== 'zone' || areaSelectionMode !== 'spot' || selectedSpotsCount > 0;
  const handleDockClick = (): void => {
    if (opensDockPopup) {
      setDockPopupOpened(true);
      return;
    }
    onDock();
  };

  const handleTrashClick = async (): Promise<void> => {
    if (onTrash) {
      onTrash();
      return;
    }
    const entityId = entity.entity_id;
    const trashButtonEntityId =
      get('button', 'go_to_trash_bin') ?? `button.${entityId.replace(/^vacuum\./, '')}_go_to_trash_bin`;

    if (hass.states[trashButtonEntityId]) {
      try {
        await hass.callService('button', 'press', { entity_id: trashButtonEntityId });
        return;
      } catch {
        // Fallback to dreame_vacuum service
      }
    }

    try {
      await hass.callService('dreame_vacuum', 'vacuum_go_to_trash_bin', { entity_id: entityId });
    } catch {
      await hass.callService('button', 'press', { entity_id: trashButtonEntityId });
    }
  };

  if (phase === 'cleaning') {
    return (
      <div className="action-buttons">
        <PauseButton onClick={onPause} disabled={!controls.canPause} />
        <StopButton onClick={handleStop} action={stopAction} disabled={!controls.canStop} />
      </div>
    );
  }

  if (phase === 'paused') {
    return (
      <div className="action-buttons">
        <ResumeButton onClick={onResume} disabled={!controls.canResume} />
        <StopButton onClick={handleStop} action={stopAction} disabled={!controls.canStop} />
      </div>
    );
  }

  const showTrash =
    phase === 'idle' || (phase as string) === 'docked' || entity.state === 'docked' || entity.state === 'idle';

  return (
    <>
      <div className="action-buttons">
        <CleanButton
          onClick={onClean}
          text={getCleanButtonText()}
          disabled={!controls.canStartCleaning || !hasRequiredSelection}
        />
        <DockButton onClick={handleDockClick} disabled={!controls.canDock && !opensDockPopup} />
        {showTrash && <TrashButton onClick={handleTrashClick} />}
      </div>
      <DockPopup opened={dockPopupOpened} onClose={() => setDockPopupOpened(false)} />
    </>
  );
}
