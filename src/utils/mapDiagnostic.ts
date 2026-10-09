export type MapDiagnostic = 'no_camera' | 'image_failed' | 'no_rooms' | 'bad_calibration';

export function mapDiagnostic({
  hasCamera,
  imageFailed,
  floorReady,
  imageReady,
  roomCount,
  hasTransform,
}: {
  hasCamera: boolean;
  imageFailed: boolean;
  floorReady: boolean;
  imageReady: boolean;
  roomCount: number;
  hasTransform: boolean;
}): MapDiagnostic | null {
  if (!hasCamera) return 'no_camera';
  if (imageFailed) return 'image_failed';
  if (!floorReady || !imageReady) return null;
  if (roomCount === 0) return 'no_rooms';
  if (!hasTransform) return 'bad_calibration';
  return null;
}
