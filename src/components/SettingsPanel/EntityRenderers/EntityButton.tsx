import { useCallback } from 'react';
import { useTranslation, getEntityState, useConfirmTap } from '@/hooks';
import { useEntityLabel } from '@/hooks/useEntityLabel';
import { useDeviceEntities, useHass } from '@/contexts';
import type { EntityDefinition } from '@/config/entity-ui-mapping';

interface EntityButtonProps {
  definition: EntityDefinition;
  isChild?: boolean;
  buttonLabel?: string;
  label?: string;
}

export function EntityButton({ definition, isChild = false, buttonLabel, label }: EntityButtonProps) {
  const { t } = useTranslation();
  const entityLabel = useEntityLabel(definition, label);
  const hass = useHass();
  const { get } = useDeviceEntities();
  const { armedKey, tap } = useConfirmTap();
  const entityId = get(definition.platform, definition.key);
  const buttonState = getEntityState(hass, entityId);

  const handlePress = useCallback(() => {
    if (!entityId) return;
    hass.callService('button', 'press', {
      entity_id: entityId,
    });
  }, [entityId, hass]);

  if (!entityId || buttonState.disabled) return null;

  const armed = armedKey === entityId;
  const handleClick = definition.confirm ? () => tap(entityId, handlePress) : handlePress;

  return (
    <div className={`entity-item ${isChild ? 'entity-item--child' : ''}`}>
      <div className="entity-item__info">
        <span className="entity-item__label">{entityLabel}</span>
        {definition.descriptionKey && <span className="entity-item__description">{t(definition.descriptionKey)}</span>}
      </div>
      <button
        className={`entity-item__button ${armed ? 'entity-item__button--armed' : ''}`}
        disabled={buttonState.unavailable}
        onClick={handleClick}
      >
        {armed ? t('common.confirm_tap') : (buttonLabel ?? t('common.run'))}
      </button>
    </div>
  );
}
