import React, { useEffect, useRef, useState } from 'react';
import { PhoneFrame } from './PhoneFrame';
import { PhoneModel, LayoutPreset, CanvasRatio, BgType, BgPreset } from '../types';

interface CanvasPreviewProps {
  ratio: CanvasRatio;
  layout: LayoutPreset;
  primaryModel: PhoneModel;
  contentType: 'url' | 'upload';
  iframeUrl: string;
  uploadedImage: string | null;
  imageZoom: number;
  imageYOffset: number;
  statusBarTheme: 'light' | 'dark';
  currentTime: string;
  bgType: BgType;
  selectedPreset: BgPreset;
  customColor1: string;
  customColor2: string;
  customAngle: number;
  customImage: string | null;
  showAuraGlow: boolean;
  mixDevices: boolean;
}

export const CanvasPreview: React.FC<CanvasPreviewProps> = ({
  ratio,
  layout,
  primaryModel,
  contentType,
  iframeUrl,
  uploadedImage,
  imageZoom,
  imageYOffset,
  statusBarTheme,
  currentTime,
  bgType,
  selectedPreset,
  customColor1,
  customColor2,
  customAngle,
  customImage,
  showAuraGlow,
  mixDevices,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(1);

  // High-res master canvas dimensions
  const canvasWidth = ratio === '1:1' ? 800 : 576;
  const canvasHeight = ratio === '1:1' ? 800 : 1024;

  // Auto-resize / scale logic to fit the viewport space nicely
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const parent = containerRef.current.parentElement;
      if (!parent) return;

      const maxW = parent.clientWidth - 40; // padding leeway
      const maxH = parent.clientHeight - 40;

      const scaleW = maxW / canvasWidth;
      const scaleH = maxH / canvasHeight;

      // Keep it inside constraints
      const targetScale = Math.min(scaleW, scaleH, 1.0); // max scale 100%
      setScale(targetScale);
    };

    // Run initial and listen
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Quick polling to make sure layouts with sidebar transition adapt fast
    const timer = setTimeout(handleResize, 150);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, [ratio, canvasWidth, canvasHeight]);

  // Determine model for each slot based on primaryModel & mixDevices toggle
  const getDeviceModel = (slot: 'left' | 'center' | 'right'): PhoneModel => {
    if (!mixDevices) {
      return primaryModel;
    }
    // Mixing up to show cross-platform support
    if (slot === 'center') {
      return primaryModel;
    }

    if (slot === 'left') {
      if (primaryModel === 'iphone15') return 'samsung24';
      return 'iphone15';
    }

    // slot === 'right'
    if (primaryModel === 'pixel') return 'iphone15';
    return 'pixel';
  };

  // Compose background inline style
  const getBgStyle = (): React.CSSProperties => {
    if (bgType === 'custom_image' && customImage) {
      return {
        backgroundImage: `url(${customImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
    }
    if (bgType === 'custom_color') {
      return {
        background: `linear-gradient(${customAngle}deg, ${customColor1}, ${customColor2})`,
      };
    }
    // Preset configurations
    if (selectedPreset.cssClass) {
      // We will parse or provide explicit styling
      // Below presets will trigger correct tailwind or fallback backgrounds
    }
    return {};
  };

  // Custom Preset color mapper for explicit styles just in case
  const getPresetGradient = (preset: BgPreset): string => {
    if (preset.type === 'solid') {
      return preset.colors[0];
    }
    return `linear-gradient(135deg, ${preset.colors[0]}, ${preset.colors[1]})`;
  };

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center w-full h-full min-h-[400px] md:min-h-[500px]"
    >
      {/* Visual Canvas containing high-fidelity frames */}
      <div
        id="promotional-canvas-work"
        className="relative shadow-2xl transition-all duration-300 overflow-hidden flex-shrink-0"
        style={{
          width: `${canvasWidth}px`,
          height: `${canvasHeight}px`,
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          boxSizing: 'border-box',
          borderRadius: '16px',
          background: bgType === 'preset' ? getPresetGradient(selectedPreset) : undefined,
          ...getBgStyle(),
        }}
      >
        {/* Subtle Aura Glow elements */}
        {showAuraGlow && (
          <>
            <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] rounded-full bg-white/25 blur-[120px] pointer-events-none z-10" />
            <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full bg-black/15 blur-[100px] pointer-events-none z-10" />
            
            {/* Added floating beautiful shapes */}
            {bgType === 'preset' && selectedPreset.id === 'gold' && (
              <div className="absolute top-[20%] right-[10%] w-[120px] h-[120px] rounded-full bg-amber-400/10 blur-[40px] pointer-events-none z-10" />
            )}
            {bgType === 'preset' && selectedPreset.id === 'emerald' && (
              <div className="absolute top-[30%] right-[15%] w-[150px] h-[150px] rounded-full bg-emerald-300/10 blur-[80px] pointer-events-none z-10" />
            )}
          </>
        )}

        {/* Device Container Frame Placements */}
        <div className="absolute inset-0 z-20 flex items-center justify-center p-8">
          {/* Preset A: Single Focus */}
          {layout === 'single' && (
            <div className="flex items-center justify-center transition-all duration-500 hover:scale-[1.03] duration-300">
              <PhoneFrame
                model={getDeviceModel('center')}
                contentType={contentType}
                iframeUrl={iframeUrl}
                uploadedImage={uploadedImage}
                imageZoom={imageZoom}
                imageYOffset={imageYOffset}
                statusBarTheme={statusBarTheme}
                currentTime={currentTime}
              />
            </div>
          )}

          {/* Preset B: Dual Device overlapping */}
          {layout === 'dual' && (
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Back device - shifted to left and rotated */}
              <div
                className="absolute transition-all duration-500"
                style={{
                  left: ratio === '1:1' ? '20%' : '14%',
                  top: '52%',
                  transform: 'translate(-10%, -50%) rotate(-6deg) scale(0.9)',
                  zIndex: 10,
                }}
              >
                <PhoneFrame
                  model={getDeviceModel('left')}
                  contentType={contentType}
                  iframeUrl={iframeUrl}
                  uploadedImage={uploadedImage}
                  imageZoom={imageZoom}
                  imageYOffset={imageYOffset}
                  statusBarTheme={statusBarTheme}
                  currentTime={currentTime}
                />
              </div>

              {/* Front device - shifted to right and rotated */}
              <div
                className="absolute transition-all duration-500"
                style={{
                  right: ratio === '1:1' ? '20%' : '14%',
                  top: '48%',
                  transform: 'translate(10%, -50%) rotate(4deg) scale(0.98)',
                  zIndex: 20,
                  filter: 'drop-shadow(rgba(0, 0, 0, 0.4) -10px 15px 30px)',
                }}
              >
                <PhoneFrame
                  model={getDeviceModel('center')}
                  contentType={contentType}
                  iframeUrl={iframeUrl}
                  uploadedImage={uploadedImage}
                  imageZoom={imageZoom}
                  imageYOffset={imageYOffset}
                  statusBarTheme={statusBarTheme}
                  currentTime={currentTime}
                />
              </div>
            </div>
          )}

          {/* Preset C: Trio Showcase */}
          {layout === 'trio' && (
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Left Phone: tilted left */}
              <div
                className="absolute transition-all duration-500"
                style={{
                  left: ratio === '1:1' ? '8%' : '2%',
                  top: '52%',
                  transform: 'translate(0px, -50%) rotate(-8deg) scale(0.76)',
                  zIndex: 10,
                  opacity: 0.9,
                }}
              >
                <PhoneFrame
                  model={getDeviceModel('left')}
                  contentType={contentType}
                  iframeUrl={iframeUrl}
                  uploadedImage={uploadedImage}
                  imageZoom={imageZoom}
                  imageYOffset={imageYOffset}
                  statusBarTheme={statusBarTheme}
                  currentTime={currentTime}
                />
              </div>

              {/* Middle Phone: straight in center front */}
              <div
                className="absolute transition-all duration-500"
                style={{
                  left: '50%',
                  top: '48%',
                  transform: 'translate(-50%, -50%) scale(0.92)',
                  zIndex: 30,
                  filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.45))',
                }}
              >
                <PhoneFrame
                  model={getDeviceModel('center')}
                  contentType={contentType}
                  iframeUrl={iframeUrl}
                  uploadedImage={uploadedImage}
                  imageZoom={imageZoom}
                  imageYOffset={imageYOffset}
                  statusBarTheme={statusBarTheme}
                  currentTime={currentTime}
                />
              </div>

              {/* Right Phone: tilted right */}
              <div
                className="absolute transition-all duration-500"
                style={{
                  right: ratio === '1:1' ? '8%' : '2%',
                  top: '52%',
                  transform: 'translate(0px, -50%) rotate(8deg) scale(0.76)',
                  zIndex: 20,
                  opacity: 0.9,
                }}
              >
                <PhoneFrame
                  model={getDeviceModel('right')}
                  contentType={contentType}
                  iframeUrl={iframeUrl}
                  uploadedImage={uploadedImage}
                  imageZoom={imageZoom}
                  imageYOffset={imageYOffset}
                  statusBarTheme={statusBarTheme}
                  currentTime={currentTime}
                />
              </div>
            </div>
          )}
        </div>

        {/* Minimal watermark/branding overlay at the very bottom corner of canvas */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-sans opacity-35 text-white/80 z-30 pointer-events-none tracking-wide">
          <span>Web Invitation Showcase</span>
          <span>Created with Mockup Gen</span>
        </div>
      </div>
    </div>
  );
};
