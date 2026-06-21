export type PhoneModel = 'iphone15' | 'samsung24' | 'pixel';
export type LayoutPreset = 'single' | 'dual' | 'trio';
export type CanvasRatio = '1:1' | '9:16';
export type ContentType = 'url' | 'upload';
export type BgType = 'preset' | 'custom_color' | 'custom_image';

export interface BgPreset {
  id: string;
  name: string;
  type: 'solid' | 'gradient';
  colors: string[]; // tailwind color names or hex values
  cssClass: string; // Tailwind class
}

export interface DeviceConfig {
  model: PhoneModel;
  xOffset: number; // visual placement offset in preview
  yOffset: number;
  scale: number;
  rotate: number;
  zIndex: number;
}
