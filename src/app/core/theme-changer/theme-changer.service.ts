import { Injectable } from '@angular/core';
import tinycolor from 'tinycolor2';

export interface Color {
  name: string;
  hex: string;
  darkContrast: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ThemeChangerService {
  constructor() {}

  savePrimaryColor(hex: string) {
    const primaryColorPalette: Color[] = computeColors(hex);
    updateTheme(primaryColorPalette, 'primary');
  }

  saveAccentColor(hex: string) {
    const accentColorPalette = computeColors(hex);
    updateTheme(accentColorPalette, 'accent');
  }
}

function updateTheme(colors: Color[], theme: string) {
  colors.forEach((color) => {
    document.documentElement.style.setProperty(
      `--theme-${theme}-${color.name}`,
      color.hex
    );
    document.documentElement.style.setProperty(
      `--theme-${theme}-contrast-${color.name}`,
      color.darkContrast ? 'rgba(black, 0.87)' : 'white'
    );
  });
}

function computeColors(hex: string): Color[] {
  return [
    getColorObject(tinycolor(hex).lighten(52), '50'),
    getColorObject(tinycolor(hex).lighten(37), '100'),
    getColorObject(tinycolor(hex).lighten(26), '200'),
    getColorObject(tinycolor(hex).lighten(12), '300'),
    getColorObject(tinycolor(hex).lighten(6), '400'),
    getColorObject(tinycolor(hex), '500'),
    getColorObject(tinycolor(hex).darken(6), '600'),
    getColorObject(tinycolor(hex).darken(12), '700'),
    getColorObject(tinycolor(hex).darken(18), '800'),
    getColorObject(tinycolor(hex).darken(24), '900'),
    getColorObject(tinycolor(hex).lighten(50).saturate(30), 'A100'),
    getColorObject(tinycolor(hex).lighten(30).saturate(30), 'A200'),
    getColorObject(tinycolor(hex).lighten(10).saturate(15), 'A400'),
    getColorObject(tinycolor(hex).lighten(5).saturate(5), 'A700'),
  ];
}

function getColorObject(
  value:
    | string
    | tinycolor.ColorFormats.PRGB
    | tinycolor.ColorFormats.RGB
    | tinycolor.ColorFormats.HSL
    | tinycolor.ColorFormats.HSV
    | tinycolor.Instance
    | undefined,
  name: string
): Color {
  const c = tinycolor(value);
  return {
    name: name,
    hex: c.toHexString(),
    darkContrast: c.isLight(),
  };
}
