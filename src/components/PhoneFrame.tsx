import React from 'react';
import { Wifi, Signal, Battery, Sparkles, Heart } from 'lucide-react';
import { PhoneModel } from '../types';

interface PhoneFrameProps {
  model: PhoneModel;
  contentType: 'url' | 'upload';
  iframeUrl: string;
  uploadedImage: string | null;
  imageZoom: number;
  imageYOffset: number;
  statusBarTheme: 'light' | 'dark';
  currentTime: string;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  model,
  contentType,
  iframeUrl,
  uploadedImage,
  imageZoom,
  imageYOffset,
  statusBarTheme,
  currentTime,
}) => {
  // Configs matching each model
  const isIphone = model === 'iphone15';
  const isSamsung = model === 'samsung24';
  const isPixel = model === 'pixel';

  // Framing styling classes
  let frameWeightClass = '';
  let containerRadius = '';
  let screenRadius = '';
  let ringColor = '';
  let bezelColor = '';

  if (isIphone) {
    frameWeightClass = 'border-[9px]';
    containerRadius = 'rounded-[46px]';
    screenRadius = 'rounded-[38px]';
    ringColor = 'ring-3 ring-neutral-400';
    bezelColor = 'border-neutral-900';
  } else if (isSamsung) {
    frameWeightClass = 'border-[8px]';
    containerRadius = 'rounded-[12px]';
    screenRadius = 'rounded-[6px]';
    ringColor = 'ring-3 ring-zinc-500';
    bezelColor = 'border-stone-950';
  } else {
    // Pixel
    frameWeightClass = 'border-[10px]';
    containerRadius = 'rounded-[38px]';
    screenRadius = 'rounded-[29px]';
    ringColor = 'ring-3 ring-stone-400';
    bezelColor = 'border-zinc-900';
  }

  const textColor = statusBarTheme === 'light' ? 'text-white' : 'text-zinc-800';
  const iconColor = statusBarTheme === 'light' ? '#ffffff' : '#27272a';

  return (
    <div
      className={`relative w-[280px] h-[580px] bg-black ${containerRadius} ${ringColor} ${bezelColor} ${frameWeightClass} shadow-2xl flex flex-col overflow-hidden select-none`}
      style={{ boxSizing: 'border-box' }}
    >
      {/* 1. Status Bar Panel */}
      <div className="absolute top-0 inset-x-0 h-10 px-5 flex items-center justify-between z-40 bg-transparent font-sans pointer-events-none">
        {/* Left Side: Time */}
        <div className={`text-[12px] font-semibold tracking-tight ${textColor}`}>
          {currentTime}
        </div>

        {/* Center: Camera Notch Elements */}
        {isIphone && (
          <div className="absolute left-1/2 -translate-x-1/2 top-2 w-[76px] h-[20px] bg-black rounded-full flex items-center justify-end px-2.5 z-50">
            {/* Small camera reflect green/blue dot inside black bar */}
            <div className="w-1.5 h-1.5 rounded-full bg-slate-900/60 mr-1 ring-[0.5px] ring-emerald-500/30"></div>
          </div>
        )}

        {isSamsung && (
          <div className="absolute left-1/2 -translate-x-1/2 top-2.5 w-3.5 h-3.5 bg-black rounded-full z-50 ring-[0.5px] ring-neutral-800 flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-indigo-900/40"></div>
          </div>
        )}

        {isPixel && (
          <div className="absolute left-1/2 -translate-x-1/2 top-3 w-4 h-4 bg-black rounded-full z-50 ring-[0.5px] ring-neutral-800 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-950/50"></div>
          </div>
        )}

        {/* Right Side: Status Icons */}
        <div className="flex items-center space-x-1.5 pointer-events-none">
          <Signal size={12} color={iconColor} strokeWidth={2.5} />
          <Wifi size={12} color={iconColor} strokeWidth={2.5} />
          <Battery size={13} color={iconColor} strokeWidth={2.5} />
        </div>
      </div>

      {/* 2. Device Side Buttons (Slightly visible in background to look gorgeous) */}
      {/* Left side button slots inside frame */}
      {isIphone && (
        <>
          <div className="absolute top-24 -left-[9px] w-[2px] h-6 bg-zinc-700/60 rounded-r-sm z-10" />
          <div className="absolute top-36 -left-[9px] w-[2px] h-10 bg-zinc-700/60 rounded-r-sm z-10" />
          <div className="absolute top-52 -left-[9px] w-[2px] h-10 bg-zinc-700/60 rounded-r-sm z-10" />
          <div className="absolute top-40 -right-[9px] w-[2px] h-14 bg-zinc-700/60 rounded-l-sm z-10" />
        </>
      )}
      {isSamsung && (
        <>
          <div className="absolute top-32 -right-[8px] w-[2px] h-12 bg-neutral-600/60 rounded-l-sm z-10" />
          <div className="absolute top-48 -right-[8px] w-[2px] h-16 bg-neutral-600/60 rounded-l-sm z-10" />
        </>
      )}
      {isPixel && (
        <>
          <div className="absolute top-28 -right-[10px] w-[2px] h-10 bg-zinc-650/60 rounded-l-sm z-10" />
          <div className="absolute top-42 -right-[10px] w-[2px] h-14 bg-zinc-650/60 rounded-l-sm z-10" />
        </>
      )}

      {/* 3. Screen Body Viewport */}
      <div className={`w-full h-full bg-neutral-100 ${screenRadius} overflow-hidden relative flex flex-col z-20`}>
        {contentType === 'url' ? (
          iframeUrl ? (
            <div className="w-full h-full relative">
              {/* Premium romantic fallback card printed when iframe is ignored during html2canvas capture */}
              <div className="absolute inset-0 bg-[#fffdf9] flex flex-col items-center justify-between p-6 text-center z-0 border-4 border-[#eae0d5]/45 m-2 rounded-[32px] overflow-hidden font-sans">
                {/* Vintage ornaments */}
                <div className="flex items-center gap-1 text-[#b5838d] opacity-80 mt-2">
                  <Sparkles size={10} />
                  <span className="text-[9px] uppercase font-bold tracking-[0.2em]">The Wedding Invitation</span>
                  <Sparkles size={10} />
                </div>
                
                <div className="my-auto space-y-3 flex flex-col items-center">
                  <Heart size={18} className="text-[#e5989b] fill-[#e5989b]/15 animate-pulse" />
                  <div className="text-xl font-serif text-[#6d597a] tracking-normal font-bold leading-tight">
                    {iframeUrl.includes('syukur-ega') ? 'Syukur & Ega' : 'Eka & Dwi'}
                  </div>
                  <div className="w-8 h-[1px] bg-[#e5989b]/60"></div>
                  <p className="text-[10px] text-zinc-500 max-w-[170px] leading-relaxed font-sans font-medium">
                    Kami mengundang Anda untuk merayakan momen bahagia pernikahan kami.
                  </p>
                  
                  {/* Decorative badge */}
                  <div className="mt-1 py-1 px-2.5 bg-[#f8f1eb] border border-[#e5989b]/35 rounded-full text-[8px] text-[#b5838d] uppercase font-bold tracking-widest flex items-center gap-1">
                    <span>SAVE THE DATE</span>
                  </div>
                </div>

                <div className="text-[8px] text-zinc-400 font-medium px-2 py-1 bg-zinc-50 border border-zinc-100 rounded-lg max-w-[180px] leading-tight">
                  Ubah ke tab <strong>"Unggah Gambar"</strong> untuk tampilan 100% presisi.
                </div>
              </div>

              <iframe
                id="preview-iframe"
                title="Website Mockup View"
                src={iframeUrl}
                data-html2canvas-ignore="true"
                className="w-full h-full border-0 select-none bg-white z-10 relative"
                style={{
                  pointerEvents: 'none',
                }}
              />
              {/* Invisible touch overlay to prevent interaction messing with canvas */}
              <div className="absolute inset-0 bg-transparent z-20 cursor-default" />
              
              {/* Tiny helpful text reminding frame usage */}
              <div className="absolute bottom-5 inset-x-4 bg-zinc-950/80 backdrop-blur-md text-white py-1.5 px-3 rounded-lg text-[9px] leading-snug text-center opacity-0 group-hover:opacity-100 transition duration-300 z-30">
                Layar Kosong? Coba Opsi B jika link diblokir
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-white">
              <p className="text-zinc-400 font-sans text-xs font-medium">Input URL undangan Anda di panel kiri</p>
            </div>
          )
        ) : (
          uploadedImage ? (
            <div className="w-full h-full bg-zinc-900 overflow-hidden relative">
              <img
                src={uploadedImage}
                alt="Uploaded Screenshot"
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
                className="w-full origin-top-left absolute"
                style={{
                  transform: `scale(${imageZoom / 100})`,
                  top: `${imageYOffset}px`,
                  left: '0px',
                  maxWidth: 'none',
                  width: '100%',
                  pointerEvents: 'none',
                }}
              />
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-zinc-50 border-2 border-dashed border-zinc-200 m-2 rounded-2xl">
              <p className="text-zinc-400 font-sans text-xs">Unggah screenshot undangan Anda di panel kiri</p>
            </div>
          )
        )}
      </div>

      {/* 4. Bottom Home Indicator Bar (Realistic UI detail) */}
      <div className="absolute bottom-2.5 inset-x-0 flex justify-center z-40 pointer-events-none">
        <div className={`w-28 h-1 ${statusBarTheme === 'light' ? 'bg-white' : 'bg-zinc-800'} rounded-full opacity-60`} />
      </div>
    </div>
  );
};
