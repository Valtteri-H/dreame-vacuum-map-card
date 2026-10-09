import { useCallback } from 'react';
import { useConfirmTap, useTranslation } from '@/hooks';
import { useEntity, useHass } from '@/contexts';
import { getAttr } from '@/utils';
import { DREAME_SERVICES } from '@/constants';
import { availableConsumables } from './consumables';

export function ConsumablesSection() {
  const { t } = useTranslation();
  const entity = useEntity();
  const hass = useHass();
  const { armedKey, tap } = useConfirmTap();
  const attributes = entity.attributes;

  const handleReset = useCallback(
    (consumableKey: string) => {
      hass.callService(DREAME_SERVICES.VACUUM_RESET_CONSUMABLE.domain, DREAME_SERVICES.VACUUM_RESET_CONSUMABLE.key, {
        entity_id: entity.entity_id,
        consumable: consumableKey,
      });
    },
    [hass, entity.entity_id]
  );

  const getProgressColor = (percent: number): string => {
    if (percent >= 50) return 'var(--consumable-good, #34c759)';
    if (percent >= 20) return 'var(--consumable-warning, #ff9500)';
    return 'var(--consumable-critical, #ff3b30)';
  };

  return (
    <div className="consumables-section">
      {availableConsumables(attributes).map((consumable) => {
        const percent = getAttr(attributes[consumable.percentKey], 0);
        const hours = getAttr(attributes[consumable.hoursKey], 0);
        const progressColor = getProgressColor(percent);
        const armed = armedKey === consumable.key;

        return (
          <div key={consumable.key} className="consumables-section__item">
            <div className="consumables-section__info">
              <span className="consumables-section__label">{t(consumable.labelKey)}</span>
              <span className="consumables-section__stats">
                {percent}% · {hours}h {t('settings.consumables.remaining')}
              </span>
            </div>
            <div className="consumables-section__progress">
              <div
                className="consumables-section__progress-bar"
                style={{
                  width: `${percent}%`,
                  backgroundColor: progressColor,
                }}
              />
            </div>
            <button
              className={`consumables-section__reset ${armed ? 'consumables-section__reset--armed' : ''}`}
              onClick={() => tap(consumable.key, () => handleReset(consumable.consumableKey))}
              type="button"
            >
              {armed ? t('common.confirm_tap') : t('settings.consumables.reset')}
            </button>
          </div>
        );
      })}
    </div>
  );
}
