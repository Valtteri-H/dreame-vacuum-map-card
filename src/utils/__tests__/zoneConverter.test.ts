import { describe, expect, it } from 'vitest';
import { containedRect } from '../zoneConverter';

describe('containedRect', () => {
  it('centers a square picture between side bars in a wide box', () => {
    expect(containedRect(1000, 800, 500, 500)).toEqual({ left: 100, top: 0, width: 800, height: 800 });
  });

  it('centers a wide picture between top and bottom bars in a tall box', () => {
    expect(containedRect(400, 1000, 800, 400)).toEqual({ left: 0, top: 400, width: 400, height: 200 });
  });

  it('fills a box with the same aspect ratio', () => {
    expect(containedRect(600, 300, 1200, 600)).toEqual({ left: 0, top: 0, width: 600, height: 300 });
  });

  it.each([
    [0, 800, 500, 500],
    [1000, 0, 500, 500],
    [1000, 800, 0, 500],
    [1000, 800, 500, -1],
    [1000, 800, 500, Number.NaN],
    [Number.POSITIVE_INFINITY, 800, 500, 500],
  ])('has no picture area for a %s x %s box and a %s x %s picture', (boxWidth, boxHeight, width, height) => {
    expect(containedRect(boxWidth, boxHeight, width, height)).toBeNull();
  });
});
