import { useState, useCallback } from 'react';
import type { AreaSelectionMode, CleaningSelectionMode, Spot, Zone } from '@/types/homeassistant';
import { DEFAULTS, STORAGE_KEY, vacuumStorageKey } from '@/constants';
import { logger } from '@/utils/logger';

export type RepeatCount = 1 | 2 | 3;

export function parseAreaSelectionMode(value: string | null): AreaSelectionMode {
  return value === 'spot' ? 'spot' : 'zone';
}

function loadAreaSelectionMode(storageKey: string): AreaSelectionMode {
  try {
    return parseAreaSelectionMode(localStorage.getItem(storageKey));
  } catch {
    return 'zone';
  }
}

function saveAreaSelectionMode(storageKey: string, mode: AreaSelectionMode): void {
  try {
    localStorage.setItem(storageKey, mode);
  } catch {
    // localStorage not available
  }
}

function loadRepeatCount(storageKey: string): RepeatCount {
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      const value = parseInt(stored, 10);
      if (value >= 1 && value <= 3) {
        return value as RepeatCount;
      }
    }
  } catch {
    // localStorage not available
  }
  return 1;
}

function saveRepeatCount(storageKey: string, count: RepeatCount): void {
  try {
    localStorage.setItem(storageKey, String(count));
  } catch {
    // localStorage not available
  }
}

function clearRepeatCount(storageKey: string): void {
  try {
    localStorage.removeItem(storageKey);
  } catch {
    // localStorage not available
  }
}

interface UseCardUIStateOptions {
  vacuumEntityId: string;
  defaultMode?: CleaningSelectionMode;
}

export function useCardUIState({ vacuumEntityId, defaultMode = DEFAULTS.MODE }: UseCardUIStateOptions) {
  const areaSelectionModeKey = vacuumStorageKey(STORAGE_KEY.AREA_SELECTION_MODE, vacuumEntityId);
  const repeatCountKey = vacuumStorageKey(STORAGE_KEY.REPEAT_COUNT, vacuumEntityId);
  const [selectedMode, setSelectedMode] = useState<CleaningSelectionMode>(defaultMode);
  const [areaSelectionMode, setAreaSelectionMode] = useState<AreaSelectionMode>(() =>
    loadAreaSelectionMode(areaSelectionModeKey)
  );
  const [selectedRooms, setSelectedRooms] = useState<Map<number, string>>(new Map());
  const [selectedZones, setSelectedZones] = useState<Zone[]>([]);
  const [selectedSpots, setSelectedSpots] = useState<Spot[]>([]);
  const [modalOpened, setModalOpened] = useState(false);
  const [shortcutsModalOpened, setShortcutsModalOpened] = useState(false);
  const [settingsPanelOpened, setSettingsPanelOpened] = useState(false);
  const [repeatCount, setRepeatCount] = useState<RepeatCount>(() => loadRepeatCount(repeatCountKey));

  const handleModeChange = useCallback((mode: CleaningSelectionMode) => {
    logger.debug('UI', 'Mode changed:', mode);
    setSelectedMode(mode);
    setSelectedRooms(new Map());
    setSelectedZones([]);
    setSelectedSpots([]);
  }, []);

  const handleAreaSelectionModeChange = useCallback(
    (mode: AreaSelectionMode) => {
      logger.debug('UI', 'Area selection mode changed:', mode);
      setAreaSelectionMode(mode);
      saveAreaSelectionMode(areaSelectionModeKey, mode);
      setSelectedZones([]);
      setSelectedSpots([]);
    },
    [areaSelectionModeKey]
  );

  const handleRoomToggle = useCallback((roomId: number, roomName: string): void => {
    setSelectedRooms((prevSelected) => {
      const newSelected = new Map(prevSelected);
      if (prevSelected.has(roomId)) {
        logger.debug('UI', 'Room deselected:', { roomId, roomName });
        newSelected.delete(roomId);
      } else {
        logger.debug('UI', 'Room selected:', { roomId, roomName });
        newSelected.set(roomId, roomName);
      }
      return newSelected;
    });
  }, []);

  const handleModalOpen = useCallback((opened: boolean) => {
    logger.debug('UI', 'Cleaning mode modal:', opened ? 'opened' : 'closed');
    setModalOpened(opened);
  }, []);

  const handleShortcutsModalOpen = useCallback((opened: boolean) => {
    logger.debug('UI', 'Shortcuts modal:', opened ? 'opened' : 'closed');
    setShortcutsModalOpened(opened);
  }, []);

  const handleSettingsPanelOpen = useCallback((opened: boolean) => {
    logger.debug('UI', 'Settings panel:', opened ? 'opened' : 'closed');
    setSettingsPanelOpened(opened);
  }, []);

  const handleZoneChange = useCallback((zones: Zone[]) => {
    logger.debug('UI', 'Zones changed:', zones);
    setSelectedZones(zones);
  }, []);

  const handleSpotChange = useCallback((spots: Spot[]) => {
    logger.debug('UI', 'Spots changed:', spots);
    setSelectedSpots(spots);
  }, []);

  const cycleRepeatCount = useCallback(() => {
    setRepeatCount((prev) => {
      const next = ((prev % 3) + 1) as RepeatCount;
      saveRepeatCount(repeatCountKey, next);
      logger.debug('UI', 'Repeat count cycled to', next);
      return next;
    });
  }, [repeatCountKey]);

  const resetRepeatCount = useCallback(() => {
    setRepeatCount(1);
    clearRepeatCount(repeatCountKey);
    logger.debug('UI', 'Repeat count reset to 1');
  }, [repeatCountKey]);

  return {
    selectedMode,
    areaSelectionMode,
    selectedRooms,
    selectedZones,
    selectedSpots,
    modalOpened,
    shortcutsModalOpened,
    settingsPanelOpened,
    repeatCount,
    setSelectedMode,
    setSelectedRooms,
    setSelectedZones: handleZoneChange,
    setSelectedSpots: handleSpotChange,
    setModalOpened: handleModalOpen,
    setShortcutsModalOpened: handleShortcutsModalOpen,
    setSettingsPanelOpened: handleSettingsPanelOpen,
    handleModeChange,
    handleAreaSelectionModeChange,
    handleRoomToggle,
    cycleRepeatCount,
    resetRepeatCount,
  };
}
