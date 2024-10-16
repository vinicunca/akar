export interface Rectangle {
  height: number;
  width: number;
  x: number;
  y: number;
}

interface RectStrictParams {
  rectOne: Rectangle;
  rectTwo: Rectangle;
  strict: boolean;
}

export function intersects(
  { rectOne, rectTwo, strict }: RectStrictParams,
): boolean {
  if (strict) {
    return (
      rectOne.x < rectTwo.x + rectTwo.width
      && rectOne.x + rectOne.width > rectTwo.x
      && rectOne.y < rectTwo.y + rectTwo.height
      && rectOne.y + rectOne.height > rectTwo.y
    );
  } else {
    return (
      rectOne.x <= rectTwo.x + rectTwo.width
      && rectOne.x + rectOne.width >= rectTwo.x
      && rectOne.y <= rectTwo.y + rectTwo.height
      && rectOne.y + rectOne.height >= rectTwo.y
    );
  }
}

export function getIntersectingRectangle(
  { rectOne, rectTwo, strict }: RectStrictParams,
): Rectangle {
  if (!intersects({ rectOne, rectTwo, strict })) {
    return {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    };
  }

  return {
    x: Math.max(rectOne.x, rectTwo.x),
    y: Math.max(rectOne.y, rectTwo.y),
    width:
      Math.min(rectOne.x + rectOne.width, rectTwo.x + rectTwo.width)
      - Math.max(rectOne.x, rectTwo.x),
    height:
      Math.min(rectOne.y + rectOne.height, rectTwo.y + rectTwo.height)
      - Math.max(rectOne.y, rectTwo.y),
  };
}
