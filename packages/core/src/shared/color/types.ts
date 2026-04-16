export type ColorSpace = 'rgb' | 'hsl' | 'hsb';

export interface RgbColor {
  space: 'rgb';
  r: number;
  g: number;
  b: number;
  alpha: number;
}

export interface HslColor {
  space: 'hsl';
  h: number;
  s: number;
  l: number;
  alpha: number;
}

export interface HsbColor {
  space: 'hsb';
  h: number;
  s: number;
  b: number;
  alpha: number;
}

export type Color = RgbColor | HslColor | HsbColor;

export type RgbChannel = 'red' | 'green' | 'blue' | 'alpha';
export type HslChannel = 'hue' | 'saturation' | 'lightness' | 'alpha';
export type HsbChannel = 'hue' | 'saturation' | 'brightness' | 'alpha';
export type ColorChannel = RgbChannel | HslChannel | HsbChannel;

export interface ChannelRange {
  min: number;
  max: number;
  step: number;
}

export type ColorFormat = 'hex' | 'rgb' | 'hsl' | 'hsb';
