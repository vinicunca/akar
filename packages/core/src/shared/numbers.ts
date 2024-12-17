/**
 * The function `roundToStepPrecision` rounds a number to a specified precision step.
 * @param params
 * @param params.value - The `value` parameter is the number that you want to round to a specific
 * precision based on the `step` parameter.
 * @param params.step - The `step` parameter in the `roundToStepPrecision` function represents the
 * interval at which you want to round the `value`. For example, if `step` is 0.5, the `value` will be
 * rounded to the nearest half.
 * @returns the `roundedValue` after rounding it to the precision specified by the `step`.
 */
export function roundToStepPrecision(
  { value, step }:
  {
    step: number;
    value: number;
  },
) {
  let roundedValue = value;
  const stepString = step.toString();
  const pointIndex = stepString.indexOf('.');
  const precision = pointIndex >= 0 ? stepString.length - pointIndex : 0;
  if (precision > 0) {
    const pow = 10 ** precision;
    roundedValue = Math.round(roundedValue * pow) / pow;
  }
  return roundedValue;
}

/**
 * The function `snapValueToStep` snaps a given value to the nearest step within a specified range.
 * @param params
 * @param params.value - The `value` parameter represents the number that you want to snap to the
 * nearest step value.
 * @param params.min - The `min` parameter represents the minimum value that the `value`
 * should be snapped to. If `value` is less than `min`, it will be snapped to `min`. If `min` is not
 * provided (undefined), then the snapping will not consider a minimum value.
 * @param params.max - The `max` parameter represents the maximum value that the `value`
 * should be snapped to. It ensures that the snapped value does not exceed this maximum value.
 * @param params.step - The `step` parameter in the `snapValueToStep` function represents the
 * interval at which the `value` should be snapped to. It determines the granularity of the snapping
 * operation. For example, if `step` is 5, the `value` will be snapped to the nearest multiple of
 * @returns a number that has been snapped to the nearest step value within the specified range of minimum and maximum values.
 */
export function snapValueToStep(
  { value, min, max, step }:
  {
    max?: number;
    min?: number;
    step: number;
    value: number;
  },
): number {
  min = Number(min);
  max = Number(max);
  const remainder = ((value - (Number.isNaN(min) ? 0 : min)) % step);

  let snappedValue = roundToStepPrecision({
    value: Math.abs(remainder) * 2 >= step
      ? value + Math.sign(remainder) * (step - Math.abs(remainder))
      : value - remainder,
    step,
  });

  if (!Number.isNaN(min)) {
    if (snappedValue < min) {
      snappedValue = min;
    } else if (!Number.isNaN(max) && snappedValue > max) {
      snappedValue = min + Math.floor(roundToStepPrecision({
        value: (max - min) / step,
        step,
      })) * step;
    }
  } else if (!Number.isNaN(max) && snappedValue > max) {
    snappedValue = Math.floor(roundToStepPrecision({ value: max / step, step })) * step;
  }

  // correct floating point behavior by rounding to step precision
  snappedValue = roundToStepPrecision({ value: snappedValue, step });

  return snappedValue;
}
