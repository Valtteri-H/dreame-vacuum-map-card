import { DREAME_SENSORS } from '@/constants';

export interface ConsumableItem {
  key: string;
  labelKey: string;
  percentKey: string;
  hoursKey: string;
  consumableKey: string;
}

const CONSUMABLES: ConsumableItem[] = [
  {
    key: 'main_brush',
    labelKey: 'settings.consumables.main_brush',
    percentKey: DREAME_SENSORS.MAIN_BRUSH_LEFT.key,
    hoursKey: DREAME_SENSORS.MAIN_BRUSH_TIME_LEFT.key,
    consumableKey: 'main_brush',
  },
  {
    key: 'side_brush',
    labelKey: 'settings.consumables.side_brush',
    percentKey: DREAME_SENSORS.SIDE_BRUSH_LEFT.key,
    hoursKey: DREAME_SENSORS.SIDE_BRUSH_TIME_LEFT.key,
    consumableKey: 'side_brush',
  },
  {
    key: 'filter',
    labelKey: 'settings.consumables.filter',
    percentKey: DREAME_SENSORS.FILTER_LEFT.key,
    hoursKey: DREAME_SENSORS.FILTER_TIME_LEFT.key,
    consumableKey: 'filter',
  },
  {
    key: 'sensor',
    labelKey: 'settings.consumables.sensor',
    percentKey: DREAME_SENSORS.SENSOR_DIRTY_LEFT.key,
    hoursKey: DREAME_SENSORS.SENSOR_DIRTY_TIME_LEFT.key,
    consumableKey: 'sensor',
  },
  {
    key: 'mop_pad',
    labelKey: 'settings.consumables.mop_pad',
    percentKey: DREAME_SENSORS.MOP_PAD_LEFT.key,
    hoursKey: DREAME_SENSORS.MOP_PAD_TIME_LEFT.key,
    consumableKey: 'mop_pad',
  },
  {
    key: 'silver_ion',
    labelKey: 'settings.consumables.silver_ion',
    percentKey: DREAME_SENSORS.SILVER_ION_LEFT.key,
    hoursKey: DREAME_SENSORS.SILVER_ION_TIME_LEFT.key,
    consumableKey: 'silver_ion',
  },
  {
    key: 'detergent',
    labelKey: 'settings.consumables.detergent',
    percentKey: DREAME_SENSORS.DETERGENT_LEFT.key,
    hoursKey: DREAME_SENSORS.DETERGENT_TIME_LEFT.key,
    consumableKey: 'detergent',
  },
  {
    key: 'squeegee',
    labelKey: 'settings.consumables.squeegee',
    percentKey: DREAME_SENSORS.SQUEEGEE_LEFT.key,
    hoursKey: DREAME_SENSORS.SQUEEGEE_TIME_LEFT.key,
    consumableKey: 'squeegee',
  },
  {
    key: 'tank_filter',
    labelKey: 'settings.consumables.tank_filter',
    percentKey: DREAME_SENSORS.TANK_FILTER_LEFT.key,
    hoursKey: DREAME_SENSORS.TANK_FILTER_TIME_LEFT.key,
    consumableKey: 'tank_filter',
  },
  {
    key: 'onboard_dirty_water_tank',
    labelKey: 'settings.consumables.onboard_dirty_water_tank',
    percentKey: DREAME_SENSORS.ONBOARD_DIRTY_WATER_TANK_LEFT.key,
    hoursKey: DREAME_SENSORS.ONBOARD_DIRTY_WATER_TANK_TIME_LEFT.key,
    consumableKey: 'onboard_dirty_water_tank',
  },
  {
    key: 'dirty_water_channel',
    labelKey: 'settings.consumables.dirty_water_channel',
    percentKey: DREAME_SENSORS.DIRTY_WATER_CHANNEL_DIRTY_LEFT.key,
    hoursKey: DREAME_SENSORS.DIRTY_WATER_CHANNEL_DIRTY_TIME_LEFT.key,
    consumableKey: 'dirty_water_channel',
  },
  {
    key: 'deodorizer',
    labelKey: 'settings.consumables.deodorizer',
    percentKey: DREAME_SENSORS.DEODORIZER_LEFT.key,
    hoursKey: DREAME_SENSORS.DEODORIZER_TIME_LEFT.key,
    consumableKey: 'deodorizer',
  },
  {
    key: 'wheel',
    labelKey: 'settings.consumables.wheel',
    percentKey: DREAME_SENSORS.WHEEL_DIRTY_LEFT.key,
    hoursKey: DREAME_SENSORS.WHEEL_DIRTY_TIME_LEFT.key,
    consumableKey: 'wheel',
  },
  {
    key: 'scale_inhibitor',
    labelKey: 'settings.consumables.scale_inhibitor',
    percentKey: DREAME_SENSORS.SCALE_INHIBITOR_LEFT.key,
    hoursKey: DREAME_SENSORS.SCALE_INHIBITOR_TIME_LEFT.key,
    consumableKey: 'scale_inhibitor',
  },
  {
    key: 'fluffing_roller',
    labelKey: 'settings.consumables.fluffing_roller',
    percentKey: DREAME_SENSORS.FLUFFING_ROLLER_DIRTY_LEFT.key,
    hoursKey: DREAME_SENSORS.FLUFFING_ROLLER_DIRTY_TIME_LEFT.key,
    consumableKey: 'fluffing_roller',
  },
  {
    key: 'roller_mop_filter',
    labelKey: 'settings.consumables.roller_mop_filter',
    percentKey: DREAME_SENSORS.ROLLER_MOP_FILTER_DIRTY_LEFT.key,
    hoursKey: DREAME_SENSORS.ROLLER_MOP_FILTER_DIRTY_TIME_LEFT.key,
    consumableKey: 'roller_mop_filter',
  },
  {
    key: 'water_outlet_filter',
    labelKey: 'settings.consumables.water_outlet_filter',
    percentKey: DREAME_SENSORS.WATER_OUTLET_FILTER_DIRTY_LEFT.key,
    hoursKey: DREAME_SENSORS.WATER_OUTLET_FILTER_DIRTY_TIME_LEFT.key,
    consumableKey: 'water_outlet_filter',
  },
];

export function availableConsumables(attributes: Record<string, unknown>): ConsumableItem[] {
  return CONSUMABLES.filter((consumable) => {
    const percent = attributes[consumable.percentKey];
    return percent !== undefined && percent !== null;
  });
}
