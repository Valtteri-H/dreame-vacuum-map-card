import React from 'react';
import ReactDOM from 'react-dom/client';
import { DreameVacuumCard } from './components/DreameVacuumCard';
import { ErrorBoundary } from './components/common';
import type { Hass, HassConfig } from './types/homeassistant';
import { validateConfig } from './utils/typeGuards';
import { attachLoggerToWindow, logger } from './utils/logger';
import styles from './styles.scss?inline';

// Attach logger controls to window for dev tools access
attachLoggerToWindow();

const CARD_TAG = 'dreame-vacuum-map-card';

interface ConfigFormField {
  name: keyof HassConfig;
  required?: boolean;
  selector: Record<string, unknown>;
}

const CONFIG_FORM_SCHEMA: ConfigFormField[] = [
  { name: 'entity', required: true, selector: { entity: { domain: 'vacuum' } } },
  { name: 'map_entity', selector: { entity: { domain: 'camera' } } },
  { name: 'title', selector: { text: {} } },
  {
    name: 'default_mode',
    selector: {
      select: {
        mode: 'dropdown',
        options: [
          { value: 'all', label: 'All' },
          { value: 'room', label: 'Rooms' },
          { value: 'zone', label: 'Zone' },
        ],
      },
    },
  },
  {
    name: 'default_room_view',
    selector: {
      select: {
        mode: 'dropdown',
        options: [
          { value: 'map', label: 'Map' },
          { value: 'list', label: 'List' },
        ],
      },
    },
  },
  {
    name: 'map_overlays',
    selector: {
      select: {
        multiple: true,
        options: [
          { value: 'vacuum', label: 'Vacuum position' },
          { value: 'charger', label: 'Charger' },
          { value: 'room_labels', label: 'Room labels' },
        ],
      },
    },
  },
  { name: 'room_label_scale', selector: { number: { min: 0.1, max: 3, step: 0.1, mode: 'box' } } },
  { name: 'map_height', selector: { text: {} } },
  { name: 'language', selector: { text: {} } },
];

const CONFIG_FORM_LABELS: Partial<Record<keyof HassConfig, string>> = {
  entity: 'Vacuum',
  map_entity: 'Map camera (found automatically when empty)',
  title: 'Title',
  default_mode: 'Default cleaning mode',
  default_room_view: 'Default room view',
  map_overlays: 'Map overlays',
  room_label_scale: 'Room label scale',
  map_height: 'Map height (CSS length or pixels)',
  language: 'Language (auto follows Home Assistant)',
};

class DreameVacuumMapCard extends HTMLElement {
  private _root: ReactDOM.Root | null = null;
  private _unmountTimer: number | undefined;
  private _hass?: Hass;
  private _config?: HassConfig;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    const styleEl = document.createElement('style');
    styleEl.textContent = styles;
    this.shadowRoot!.appendChild(styleEl);
  }

  setConfig(config: HassConfig) {
    // Validate configuration
    const validation = validateConfig(config);

    if (!validation.valid) {
      throw new Error(`Invalid configuration: ${validation.errors.join('; ')}`);
    }

    // Log warnings in development
    if (validation.warnings.length > 0) {
      logger.warn('Configuration warnings:', validation.warnings);
    }

    this._config = config;
    this.render();
  }

  set hass(hass: Hass) {
    this._hass = hass;
    this.render();
  }

  connectedCallback() {
    window.clearTimeout(this._unmountTimer);
    this.render();
  }

  disconnectedCallback() {
    // Masonry views move a card by disconnecting and reconnecting it in the same task; that must not reset it.
    this._unmountTimer = window.setTimeout(() => {
      this._root?.unmount();
      this._root = null;
    });
  }

  private render() {
    if (!this._hass || !this._config || !this.shadowRoot || !this.isConnected) return;

    let container = this.shadowRoot.querySelector('#react-root') as HTMLElement;
    if (!container) {
      container = document.createElement('div');
      container.id = 'react-root';
      this.shadowRoot.appendChild(container);
    }

    if (!this._root) {
      this._root = ReactDOM.createRoot(container);
    }

    this._root.render(
      <React.StrictMode>
        <ErrorBoundary>
          <DreameVacuumCard key={this._config.entity} hass={this._hass} config={this._config} />
        </ErrorBoundary>
      </React.StrictMode>
    );
  }

  getCardSize() {
    return 4;
  }

  static getStubConfig(hass?: Hass) {
    const vacuum = Object.keys(hass?.states ?? {}).find((entityId) => entityId.startsWith('vacuum.'));
    return {
      type: `custom:${CARD_TAG}`,
      entity: vacuum ?? 'vacuum.dreame_vacuum',
      title: 'Dreame Vacuum',
    };
  }

  static getConfigForm() {
    return {
      schema: CONFIG_FORM_SCHEMA,
      computeLabel: (field: ConfigFormField) => CONFIG_FORM_LABELS[field.name],
    };
  }
}

if (!customElements.get(CARD_TAG)) {
  customElements.define(CARD_TAG, DreameVacuumMapCard);
}

declare global {
  interface Window {
    customCards?: Array<{
      type: string;
      name: string;
      description: string;
    }>;
  }
}

// Register card with Home Assistant custom cards list
window.customCards = window.customCards || [];
if (!window.customCards.some((card) => card.type === CARD_TAG)) {
  window.customCards.push({
    type: CARD_TAG,
    name: 'Dreame Vacuum Map Card',
    description: 'Custom vacuum map card for Dreame vacuum cleaners',
  });
}

logger.info('Dreame Vacuum Map Card (React) loaded');

export default DreameVacuumMapCard;
