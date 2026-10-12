import { useTranslation } from '@/hooks';
import { TRASH_BIN_ICON_SVG } from '@/constants/icons';

interface TrashButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export function TrashButton({ onClick, disabled = false }: TrashButtonProps) {
  const { t } = useTranslation();

  return (
    <button
      type="button"
      onClick={onClick}
      className={`action-buttons__dock action-buttons__trash ${disabled ? 'action-buttons__dock--disabled' : ''}`}
      disabled={disabled}
      title={t('actions.go_to_trash_bin')}
    >
      <span className="action-buttons__icon">{TRASH_BIN_ICON_SVG}</span>
      <span>{t('actions.go_to_trash_bin')}</span>
    </button>
  );
}
