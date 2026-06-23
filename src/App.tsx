import React, { useState, useEffect } from 'react';
import { ControlPanel } from './components/ControlPanel';
import { CanvasPreview } from './components/CanvasPreview';
import { PhoneModel, LayoutPreset, CanvasRatio, BgType, BgPreset } from './types';
import html2canvas from 'html2canvas';
import { Laptop, Sparkles, Smartphone, Share2, X, Download, Layers, ExternalLink, Check, Copy, Eye } from 'lucide-react';

const DEFAULT_MOCKUP_IMAGE = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='900' viewBox='0 0 600 900'><rect width='100%' height='100%' fill='%23fffdf9'/><rect x='20' y='20' width='560' height='860' rx='15' fill='none' stroke='%23e5989b' stroke-width='2' stroke-dasharray='6 4'/><g transform='translate(300, 420)' text-anchor='middle'><circle cx='0' cy='-120' r='60' fill='%23faf0eb' stroke='%23e5989b' stroke-width='1'/><path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' fill='%23e5989b' transform='translate(-12, -132) scale(1.5)'/><text y='-20' font-family='serif' font-size='28' font-weight='bold' fill='%236d597a'>The Wedding of</text><text y='35' font-family='serif' font-size='40' font-weight='bold' fill='%23b5838d'>Raka %26 Amelia</text><text y='95' font-family='sans-serif' font-size='11' fill='%23888888' letter-spacing='3'>SAVE THE DATE</text><line x1='-100' y1='120' x2='100' y2='120' stroke='%23e5989b' stroke-width='1'/><text y='150' font-family='sans-serif' font-size='13' font-weight='bold' fill='%23555555'>SABTU, 12 DESEMBER 2026</text><text y='175' font-family='sans-serif' font-size='11' fill='%23999999'>Bandung, Jawa Barat</text></g></svg>";

const BG_PRESETS: BgPreset[] = [
  { id: 'terracotta', name: 'Terracotta Boho', type: 'gradient', colors: ['#FAF0EB', '#E6D0C3'], cssClass: '' },
  { id: 'gold', name: 'Gold Luxury', type: 'gradient', colors: ['#181512', '#2E2419'], cssClass: '' },
  { id: 'orchard', name: 'Deep Amethyst', type: 'gradient', colors: ['#1F142D', '#341F45'], cssClass: '' },
  { id: 'emerald', name: 'Emerald Gold', type: 'gradient', colors: ['#02261C', '#0B4232'], cssClass: '' },
  { id: 'lavender', name: 'Classic Lavender', type: 'gradient', colors: ['#E8E5F0', '#D2C9E3'], cssClass: '' },
  { id: 'sunset', name: 'Sunset Warmth', type: 'gradient', colors: ['#FFF7ED', '#FED7AA'], cssClass: '' },
  { id: 'minimal', name: 'Minimal White', type: 'gradient', colors: ['#FAF9F6', '#E3E1DC'], cssClass: '' },
  { id: 'story', name: 'Midnight Matte', type: 'gradient', colors: ['#0C0D10', '#181C26'], cssClass: '' },
];

export default function App() {
  // Device layout states
  const [ratio, setRatio] = useState<CanvasRatio>('1:1');
  const [layout, setLayout] = useState<LayoutPreset>('trio');
  const [primaryModel, setPrimaryModel] = useState<PhoneModel>('iphone15');
  const [mixDevices, setMixDevices] = useState<boolean>(true);

  // Content state (Option A: URL, Option B: Upload)
  const [contentType, setContentType] = useState<'url' | 'upload'>('url');
  const [iframeUrl, setIframeUrl] = useState<string>('https://antigravity-example-invitation.neocities.org/');
  
  // Screenshot Upload state with a default beautiful floral mockup initial screen!
  const [uploadedImage, setUploadedImage] = useState<string | null>(DEFAULT_MOCKUP_IMAGE);
  const [imageZoom, setImageZoom] = useState<number>(100);
  const [imageYOffset, setImageYOffset] = useState<number>(0);

  // Download Dialog & Gallery status states
  const [downloadedImageSrc, setDownloadedImageSrc] = useState<string | null>(null);
  const [showDownloadModal, setShowDownloadModal] = useState<boolean>(false);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [downloadType, setDownloadType] = useState<'normal' | 'transparent'>('normal');

  // Background control states
  const [bgType, setBgType] = useState<BgType>('preset');
  const [selectedPreset, setSelectedPreset] = useState<BgPreset>(BG_PRESETS[0]);
  const [customColor1, setCustomColor1] = useState<string>('#4f46e5');
  const [customColor2, setCustomColor2] = useState<string>('#ec4899');
  const [customAngle, setCustomAngle] = useState<number>(135);
  const [customImage, setCustomImage] = useState<string | null>(null);

  // Other details states
  const [showAuraGlow, setShowAuraGlow] = useState<boolean>(true);
  const [statusBarTheme, setStatusBarTheme] = useState<'light' | 'dark'>('dark');
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [isTransparentDownloading, setIsTransparentDownloading] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>('09:41');

  // Sync real-time clock for status bars
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      setCurrentTime(`${hrs}:${mins}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Prevent right-click, inspect element, and developer shortcuts
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent F12
      if (e.key === 'F12') {
        e.preventDefault();
        return;
      }
      
      // Prevent Ctrl+Shift+I (Inspect), Ctrl+Shift+C (Inspect Element), Ctrl+Shift+J (Console)
      if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'C' || e.key === 'c' || e.key === 'J' || e.key === 'j')) {
        e.preventDefault();
        return;
      }
      
      // Prevent Ctrl+U (View Source)
      if (e.ctrlKey && (e.key === 'U' || e.key === 'u')) {
        e.preventDefault();
        return;
      }

      // Prevent Command+Option+I etc. on Mac
      if (e.metaKey && e.altKey && (e.key === 'I' || e.key === 'i' || e.key === 'C' || e.key === 'c' || e.key === 'J' || e.key === 'j')) {
        e.preventDefault();
        return;
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Handle uploaded screenshot file
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result as string);
        setImageZoom(100);
        setImageYOffset(0);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle custom background image file
  const handleCustomBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCustomImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger high-definition screenshot download via html2canvas
  const handleDownload = async (transparent = false) => {
    if (transparent) {
      setIsTransparentDownloading(true);
    } else {
      setIsDownloading(true);
    }
    const canvasRef = document.getElementById('promotional-canvas-work');
    if (!canvasRef) {
      setIsDownloading(false);
      setIsTransparentDownloading(false);
      return;
    }

    // Capture states of elements we want to temporarily modify
    const originalTransform = canvasRef.style.transform;
    const originalBackground = canvasRef.style.background;
    const originalBgImage = canvasRef.style.backgroundImage;
    const originalBoxShadow = canvasRef.style.boxShadow;
    const originalBorderRadius = canvasRef.style.borderRadius;

    // Find all background/glow elements to temporarily hide them
    const decorElements = canvasRef.querySelectorAll('.canvas-decor-bg');
    const originalDecorDisplays: string[] = [];

    // Find and temporarily HIDE all cross-origin iframes so html2canvas doesn't crash or trigger security limitations!
    const iframeElements = canvasRef.querySelectorAll('iframe');
    const originalIframeDisplays: string[] = [];
    iframeElements.forEach((iframe) => {
      const htmlEl = iframe as HTMLElement;
      originalIframeDisplays.push(htmlEl.style.display);
      htmlEl.style.display = 'none';
    });

    try {
      // Temporarily remove CSS scale style on reference canvas before capture
      canvasRef.style.transform = 'none';

      if (transparent) {
        // Enforce transparency on parent canvas
        canvasRef.style.background = 'transparent';
        canvasRef.style.backgroundImage = 'none';
        canvasRef.style.boxShadow = 'none';
        canvasRef.style.borderRadius = '0px';

        decorElements.forEach((el) => {
          const htmlEl = el as HTMLElement;
          originalDecorDisplays.push(htmlEl.style.display);
          htmlEl.style.display = 'none';
        });
      }

      // Capture on 2.5x multiplier for crisp, premium printing
      const canvas = await html2canvas(canvasRef, {
        scale: 2.5,
        useCORS: true,
        allowTaint: false, // critical: allowTaint = false ensures toDataURL doesn't fail with SecurityError!
        backgroundColor: null, // supports transparency
        logging: false,
      });

      // Quick restore scaling transform and styles
      canvasRef.style.transform = originalTransform;
      
      // Restore iframes
      iframeElements.forEach((iframe, index) => {
        const htmlEl = iframe as HTMLElement;
        htmlEl.style.display = originalIframeDisplays[index] || '';
      });

      if (transparent) {
        canvasRef.style.background = originalBackground;
        canvasRef.style.backgroundImage = originalBgImage;
        canvasRef.style.boxShadow = originalBoxShadow;
        canvasRef.style.borderRadius = originalBorderRadius;

        decorElements.forEach((el, index) => {
          const htmlEl = el as HTMLElement;
          htmlEl.style.display = originalDecorDisplays[index] || '';
        });
      }

      // Extract URI 
      const dataUri = canvas.toDataURL('image/png');
      
      // Store to open beautiful popup modal for maximum assurance (highly important in iframe sandboxes!)
      setDownloadedImageSrc(dataUri);
      setDownloadType(transparent ? 'transparent' : 'normal');
      setShowDownloadModal(true);

      // Programmatic direct download trigger attempt
      const trigger = document.createElement('a');
      const filenamePrefix = transparent ? 'MockupTransparan' : 'MockupPromosi';
      trigger.download = `${filenamePrefix}_${layout}_${ratio === '1:1' ? 'Feed' : 'Story'}.png`;
      trigger.href = dataUri;
      document.body.appendChild(trigger);
      trigger.click();
      document.body.removeChild(trigger);

    } catch (e) {
      console.error('Error generating photo mockup download:', e);
      // Fallback restore styles
      if (canvasRef) {
        canvasRef.style.transform = originalTransform;
        
        // Restore iframes
        iframeElements.forEach((iframe, index) => {
          const htmlEl = iframe as HTMLElement;
          htmlEl.style.display = originalIframeDisplays[index] || '';
        });

        if (transparent) {
          canvasRef.style.background = originalBackground;
          canvasRef.style.backgroundImage = originalBgImage;
          canvasRef.style.boxShadow = originalBoxShadow;
          canvasRef.style.borderRadius = originalBorderRadius;
          decorElements.forEach((el, index) => {
            const htmlEl = el as HTMLElement;
            htmlEl.style.display = originalDecorDisplays[index] || '';
          });
        }
      }
    } finally {
      setIsDownloading(false);
      setIsTransparentDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] font-sans flex flex-col antialiased text-slate-200">
      
      {/* SaaS Premium Header Bar */}
      <header className="bg-[#0f172a] border-b border-slate-800 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 z-40 select-none">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Share2 size={20} className="text-white animate-pulse" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              KaMar Mockup Studio
              <span className="bg-indigo-950/80 text-indigo-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-indigo-900/50">
                PRO TOOL
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              Tempatkan website undangan Anda ke dalam bingkai smartphone premium untuk media sosial.
            </p>
          </div>
        </div>

        {/* Informative Stats */}
        <div className="flex items-center gap-4 text-xs text-slate-450">
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 py-1.5 px-3 rounded-lg">
            <Laptop size={13} className="text-indigo-400" />
            <span className="text-slate-350">Resolusi Tinggi</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 py-1.5 px-3 rounded-lg">
            <Smartphone size={13} className="text-emerald-400" />
            <span className="text-slate-350">Mendukung Iframe & PNG</span>
          </div>
        </div>
      </header>

      {/* Main Framework Dashboard Area */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-3 max-w-[1920px] w-full mx-auto overflow-hidden">
        
        {/* Left Side: Controls Panel */}
        <section className="lg:col-span-1 bg-[#0f172a] z-30 border-r border-slate-800">
          <ControlPanel
            ratio={ratio}
            setRatio={setRatio}
            layout={layout}
            setLayout={setLayout}
            primaryModel={primaryModel}
            setPrimaryModel={setPrimaryModel}
            mixDevices={mixDevices}
            setMixDevices={setMixDevices}
            contentType={contentType}
            setContentType={setContentType}
            iframeUrl={iframeUrl}
            setIframeUrl={setIframeUrl}
            uploadedImage={uploadedImage}
            handleImageUpload={handleImageUpload}
            imageZoom={imageZoom}
            setImageZoom={setImageZoom}
            imageYOffset={imageYOffset}
            setImageYOffset={setImageYOffset}
            bgType={bgType}
            setBgType={setBgType}
            bgPresets={BG_PRESETS}
            selectedPreset={selectedPreset}
            setSelectedPreset={setSelectedPreset}
            customColor1={customColor1}
            setCustomColor1={setCustomColor1}
            customColor2={customColor2}
            setCustomColor2={setCustomColor2}
            customAngle={customAngle}
            setCustomAngle={setCustomAngle}
            customImage={customImage}
            handleCustomBgUpload={handleCustomBgUpload}
            showAuraGlow={showAuraGlow}
            setShowAuraGlow={setShowAuraGlow}
            statusBarTheme={statusBarTheme}
            setStatusBarTheme={setStatusBarTheme}
            onDownload={handleDownload}
            isDownloading={isDownloading}
            isTransparentDownloading={isTransparentDownloading}
          />
        </section>

        {/* Right Side: Showcase Live Preview Workspace */}
        <section className="lg:col-span-2 bg-[#020617] flex flex-col items-center justify-center p-6 relative overflow-hidden min-h-[500px]">
          
          {/* Ambient Glowing background grids for SaaS elegance */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
          <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[80%] h-[60%] rounded-full bg-indigo-900/10 blur-[140px] pointer-events-none" />

          {/* Sticky Canvas Header Status indicator */}
          <div className="absolute top-4 left-6 right-6 flex items-center justify-between text-xs z-30 pointer-events-none">
            <span className="text-slate-500 font-semibold uppercase tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping mr-1" />
              Live Preview Workspace ({ratio === '1:1' ? 'Instagram Feed' : 'Portrait Story'})
            </span>
            <span className="text-slate-500 font-medium">Auto-scaling diaktifkan</span>
          </div>

          {/* Actual Scaled Workspace Canvas */}
          <div className="w-full h-full flex items-center justify-center select-none py-10">
            <CanvasPreview
              ratio={ratio}
              layout={layout}
              primaryModel={primaryModel}
              contentType={contentType}
              iframeUrl={iframeUrl}
              uploadedImage={uploadedImage}
              imageZoom={imageZoom}
              imageYOffset={imageYOffset}
              statusBarTheme={statusBarTheme}
              currentTime={currentTime}
              bgType={bgType}
              selectedPreset={selectedPreset}
              customColor1={customColor1}
              customColor2={customColor2}
              customAngle={customAngle}
              customImage={customImage}
              showAuraGlow={showAuraGlow}
              mixDevices={mixDevices}
            />
          </div>
        </section>

      </main>

      {/* SaaS Premium Footer Bar */}
      <footer className="bg-[#0f172a] border-t border-slate-800 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs select-none text-slate-450">
        <div>
          <span className="text-slate-400 font-sans">&copy; {new Date().getFullYear()} <strong className="text-slate-350">Mockup Studio</strong>. Hak Cipta Dilindungi.</span>
        </div>
        <div className="flex items-center gap-1 text-slate-400 font-sans">
          <span>Developed with ❤️ by</span>
          <a 
            href="https://www.syukur-ega.kamarprinting.my.id" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="font-bold text-indigo-400 hover:text-indigo-300 transition duration-200"
          >
            KaMar Management App
          </a>
        </div>
      </footer>

      {/* MOCKUP DOWNLOAD GALLERY MODAL */}
      {showDownloadModal && downloadedImageSrc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-[#0f172a] border border-slate-800 rounded-3xl p-5 md:p-6 max-w-xl w-full shadow-2xl relative flex flex-col space-y-4 max-h-[90vh] overflow-y-auto">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-indigo-400 animate-pulse" />
                <div>
                  <h3 className="text-sm md:text-base font-bold text-white leading-tight">
                    Mockup Berhasil Dibuat!
                  </h3>
                  <p className="text-[10px] md:text-xs text-slate-400">
                    {downloadType === 'transparent' ? 'Ekspor PNG Bingkai Transparan (High Definition)' : 'Ekspor Full Mockup Komplet (High Definition)'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowDownloadModal(false)}
                className="p-1 px-2 rounded-lg bg-slate-850 hover:bg-slate-800 hover:text-white text-slate-400 transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Generated Image Preview */}
            <div className="relative group bg-[#020617] rounded-xl p-3 border border-slate-800 overflow-hidden flex items-center justify-center">
              <img
                src={downloadedImageSrc}
                alt="Generated Mockup Preview"
                className="max-h-[300px] object-contain rounded shadow-lg transition duration-200 hover:scale-[1.02] border border-slate-800"
              />
              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-200 pointer-events-none">
                <div className="bg-slate-900/95 py-1.5 px-3 rounded-lg text-[10px] sm:text-xs font-semibold text-slate-200 border border-slate-850 flex items-center gap-1.5 shadow-xl">
                  <Eye size={12} className="text-indigo-400" />
                  <span>Render 2.5x Ultra Sharp</span>
                </div>
              </div>
            </div>

            {/* Multi-safety Helpful Tips - INDONESIAN */}
            <div className="bg-slate-900/60 border border-slate-850/80 rounded-2xl p-4 space-y-2 text-[11px] sm:text-xs text-slate-350">
              <h4 className="font-bold text-slate-200 flex items-center gap-1.5 uppercase tracking-wider text-[10px] sm:text-xs">
                💡 Cara Menyimpan Mockup:
              </h4>
              <ul className="list-disc pl-4 space-y-1 text-slate-400 text-[10px] sm:text-[11px] leading-relaxed">
                <li>
                  <strong className="text-indigo-400 font-semibold">Pengguna HP (Android/iOS):</strong> Tekan lama pada gambar di atas, lalu pilih menu <strong className="text-white">"Simpan Gambar"</strong> atau <strong className="text-white">"Tambah ke Foto"</strong>.
                </li>
                <li>
                  <strong className="text-indigo-300 font-semibold">Pengguna Komputer / Laptop:</strong> Klik kanan pada gambar di atas, lalu pilih <strong className="text-white">"Simpan Gambar Sebagai..." (Save Image As...)</strong>.
                </li>
                <li>
                  Gunakan tombol <strong className="text-white">"Salin"</strong> di bawah untuk langsung menempelkannya (paste) di Canva, Photoshop, WA, atau Telegram.
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <button
                onClick={async () => {
                  try {
                    const response = await fetch(downloadedImageSrc);
                    const blob = await response.blob();
                    await navigator.clipboard.write([
                      new ClipboardItem({ [blob.type]: blob })
                    ]);
                    setCopySuccess(true);
                    setTimeout(() => setCopySuccess(false), 2000);
                  } catch (err) {
                    console.error('Gagal menyalin:', err);
                  }
                }}
                className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition duration-200 border cursor-pointer select-none ${
                  copySuccess 
                    ? 'bg-emerald-950/70 text-emerald-400 border-emerald-800' 
                    : 'bg-slate-900 text-slate-200 border-slate-800 hover:bg-slate-850 hover:text-white'
                }`}
              >
                {copySuccess ? (
                  <>
                    <Check size={14} className="text-emerald-400" />
                    <span>Berhasil Disalin!</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} className="text-indigo-400" />
                    <span>Salin Gambar (Copy)</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  const trigger = document.createElement('a');
                  const filenamePrefix = downloadType === 'transparent' ? 'MockupTransparan' : 'MockupPromosi';
                  trigger.download = `${filenamePrefix}_${layout}_${ratio === '1:1' ? 'Feed' : 'Story'}.png`;
                  trigger.href = downloadedImageSrc;
                  document.body.appendChild(trigger);
                  trigger.click();
                  document.body.removeChild(trigger);
                }}
                className="py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 flex items-center justify-center gap-1.5 transition duration-200 cursor-pointer select-none shadow-lg shadow-indigo-950/40"
              >
                <Download size={13} />
                <span>Simpan File Otomatis</span>
              </button>
            </div>

            {/* Hint to open raw image in a new window */}
            <div className="text-center pt-1.5">
              <button
                onClick={() => {
                  const newWindow = window.open();
                  if (newWindow) {
                    newWindow.document.write(`<body style="margin:0; background: #0c0d10; display:flex; justify-content:center; align-items:center; min-height:100vh;"><img src="${downloadedImageSrc}" style="max-width:100%; max-height:100vh; object-contain: fit;" /></body>`);
                  }
                }}
                className="text-[10px] text-slate-500 hover:text-indigo-400 transition inline-flex items-center gap-1 cursor-pointer"
              >
                <ExternalLink size={10} />
                <span>Buka Gambar Ukuran Penuh di Tab Baru ↗</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
