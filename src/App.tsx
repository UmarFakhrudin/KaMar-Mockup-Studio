import React, { useState, useEffect } from 'react';
import { ControlPanel } from './components/ControlPanel';
import { CanvasPreview } from './components/CanvasPreview';
import { PhoneModel, LayoutPreset, CanvasRatio, BgType, BgPreset } from './types';
import html2canvas from 'html2canvas';
import { Laptop, Sparkles, Smartphone, Share2 } from 'lucide-react';

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
  const [uploadedImage, setUploadedImage] = useState<string | null>(
    'https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?w=600&auto=format&fit=crop&q=80'
  );
  const [imageZoom, setImageZoom] = useState<number>(100);
  const [imageYOffset, setImageYOffset] = useState<number>(0);

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
  const handleDownload = async () => {
    setIsDownloading(true);
    const canvasRef = document.getElementById('promotional-canvas-work');
    if (!canvasRef) {
      setIsDownloading(false);
      return;
    }

    try {
      // Temporarily remove CSS scale style on reference canvas before capture
      const originalTransform = canvasRef.style.transform;
      canvasRef.style.transform = 'none';

      // Capture on 2x multiplier for crisp, premium printing
      const canvas = await html2canvas(canvasRef, {
        scale: 2.5,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
      });

      // Quick restore scaling transform
      canvasRef.style.transform = originalTransform;

      // Extract URI and prompt download
      const dataUri = canvas.toDataURL('image/png');
      const trigger = document.createElement('a');
      trigger.download = `MockupPromosi_${layout}_${ratio === '1:1' ? 'Feed' : 'Story'}.png`;
      trigger.href = dataUri;
      document.body.appendChild(trigger);
      trigger.click();
      document.body.removeChild(trigger);

    } catch (e) {
      console.error('Error generating photo mockup download:', e);
    } finally {
      setIsDownloading(false);
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
    </div>
  );
}
