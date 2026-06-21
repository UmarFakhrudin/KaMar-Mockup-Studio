import React, { useRef } from 'react';
import {
  Globe,
  Upload,
  Layers,
  Smartphone,
  Palette,
  Download,
  Info,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  RefreshCw,
  Sliders,
} from 'lucide-react';
import { PhoneModel, LayoutPreset, CanvasRatio, BgType, BgPreset } from '../types';

interface ControlPanelProps {
  // Ratio
  ratio: CanvasRatio;
  setRatio: (ratio: CanvasRatio) => void;
  // Layout
  layout: LayoutPreset;
  setLayout: (layout: LayoutPreset) => void;
  // Model
  primaryModel: PhoneModel;
  setPrimaryModel: (model: PhoneModel) => void;
  mixDevices: boolean;
  setMixDevices: (mix: boolean) => void;
  // Content Type
  contentType: 'url' | 'upload';
  setContentType: (type: 'url' | 'upload') => void;
  // URL Input
  iframeUrl: string;
  setIframeUrl: (url: string) => void;
  // Image Upload
  uploadedImage: string | null;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imageZoom: number;
  setImageZoom: (zoom: number) => void;
  imageYOffset: number;
  setImageYOffset: (offset: number) => void;
  // Background
  bgType: BgType;
  setBgType: (type: BgType) => void;
  bgPresets: BgPreset[];
  selectedPreset: BgPreset;
  setSelectedPreset: (preset: BgPreset) => void;
  customColor1: string;
  setCustomColor1: (color: string) => void;
  customColor2: string;
  setCustomColor2: (color: string) => void;
  customAngle: number;
  setCustomAngle: (angle: number) => void;
  customImage: string | null;
  handleCustomBgUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // Options
  showAuraGlow: boolean;
  setShowAuraGlow: (show: boolean) => void;
  statusBarTheme: 'light' | 'dark';
  setStatusBarTheme: (theme: 'light' | 'dark') => void;
  // Download trigger
  onDownload: () => void;
  isDownloading: boolean;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  ratio,
  setRatio,
  layout,
  setLayout,
  primaryModel,
  setPrimaryModel,
  mixDevices,
  setMixDevices,
  contentType,
  setContentType,
  iframeUrl,
  setIframeUrl,
  uploadedImage,
  handleImageUpload,
  imageZoom,
  setImageZoom,
  imageYOffset,
  setImageYOffset,
  bgType,
  setBgType,
  bgPresets,
  selectedPreset,
  setSelectedPreset,
  customColor1,
  setCustomColor1,
  customColor2,
  setCustomColor2,
  customAngle,
  setCustomAngle,
  customImage,
  handleCustomBgUpload,
  showAuraGlow,
  setShowAuraGlow,
  statusBarTheme,
  setStatusBarTheme,
  onDownload,
  isDownloading,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const bgInputRef = useRef<HTMLInputElement>(null);

  // Set preset URL demos
  const setDemoUrl = (demo: string) => {
    if (demo === 'wedding') {
      // Free HTTPS sample website that allows iframe or friendly testing
      setIframeUrl('https://example.com');
    } else if (demo === 'birthday') {
      setIframeUrl('https://play.google.com');
    }
  };

  return (
    <div className="w-full bg-[#0f172a] text-slate-200 p-6 flex flex-col space-y-6 overflow-y-auto h-full max-h-[85vh] lg:max-h-[calc(100vh-80px)] border-r border-slate-800 scrollbar-thin scrollbar-thumb-slate-800">
      
      {/* SECTION 1: KONTEN SUMBER (URL / SCREENSHOT) */}
      <div className="flex flex-col space-y-3">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-2">
          <Globe size={14} className="text-indigo-400" />
          1. Sumber Konten Layar
        </label>
        
        {/* Toggle option buttons */}
        <div className="grid grid-cols-2 gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setContentType('url')}
            className={`py-2 px-3 rounded-lg text-xs font-medium transition duration-200 flex items-center justify-center gap-1.5 ${
              contentType === 'url'
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/10'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Globe size={13} />
            Input URL
          </button>
          <button
            onClick={() => setContentType('upload')}
            className={`py-2 px-3 rounded-lg text-xs font-medium transition duration-200 flex items-center justify-center gap-1.5 ${
              contentType === 'upload'
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/10'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Upload size={13} />
            Unggah Gambar
          </button>
        </div>

        {/* Option A View: URL */}
        {contentType === 'url' && (
          <div className="space-y-4 mt-1">
            <input
              type="url"
              value={iframeUrl}
              onChange={(e) => setIframeUrl(e.target.value)}
              placeholder="https://contoh-undangan.com"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
            />
            
            {/* Quick Helper presets */}
            <div className="flex flex-col gap-2 bg-slate-900/50 p-3 rounded-xl border border-slate-800/60">
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">Gunakan Contoh Demo Undangan:</span>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setIframeUrl('https://antigravity-example-invitation.neocities.org/')}
                  className="w-full bg-slate-900 hover:bg-slate-850 hover:text-white border border-slate-800 text-slate-350 py-1.5 px-3 rounded-lg text-left text-xs transition flex items-center justify-between"
                >
                  <span>💍 Undangan Pernikahan (Demo)</span>
                  <Sparkles size={11} className="text-amber-500 opacity-60" />
                </button>
                <button
                  onClick={() => setIframeUrl('https://antigravity-example-birthday.neocities.org/')}
                  className="w-full bg-slate-900 hover:bg-slate-850 hover:text-white border border-slate-800 text-slate-350 py-1.5 px-3 rounded-lg text-left text-xs transition flex items-center justify-between"
                >
                  <span>🎂 Undangan Ulang Tahun (Demo)</span>
                  <Sparkles size={11} className="text-indigo-400 opacity-60" />
                </button>
              </div>
            </div>

            <div className="bg-amber-950/20 border border-amber-900/30 rounded-xl p-4 flex flex-col gap-3 text-xs leading-relaxed">
              <div className="flex gap-2.5 items-start text-amber-200">
                <Info size={14} className="text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block mb-0.5 font-medium text-amber-300">Mengapa Layar Kosong?</strong>
                  Situs pernikahan Anda ({iframeUrl.includes('syukur-ega') ? 'syukur-ega' : 'yang dimasukkan'}) memblokir iframe karena aturan keamanan <code className="bg-slate-950 px-1 py-0.5 rounded text-[10px] text-amber-400">X-Frame-Options</code>. Jangan khawatir, hal ini normal terjadi pada hosting web modern!
                </div>
              </div>

              <div className="border-t border-amber-900/30 pt-3 mt-1 space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">💡 Solusi Screenshot Berkualitas Tinggi:</span>
                <ul className="list-disc list-inside text-slate-350 space-y-1.5 pl-1 text-[11px]">
                  <li>
                    Gunakan ekstensi browser gratis seperti <a href="https://gofullpage.com" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 underline inline-flex items-center gap-0.5">GoFullPage <Sparkles size={10} className="inline text-amber-400" /></a> untuk menangkap desain website undangan secara utuh dalam satu file gambar.
                  </li>
                  <li>
                    Atau, ambil screenshot layar penuh langsung dari HP Anda, kemudian pindahkan/kirim filenya ke komputer.
                  </li>
                  <li>
                    Setelah mendapatkan file gambarnya, pilih tab <strong>Unggah Gambar</strong> di atas untuk menempelkannya ke mockup dengan presisi!
                  </li>
                </ul>
                <button
                  type="button"
                  onClick={() => setContentType('upload')}
                  className="w-full mt-2.5 py-2 px-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-lg font-bold text-xs transition duration-200 flex items-center justify-center gap-1.5 shadow-md shadow-indigo-900/20 cursor-pointer"
                >
                  <Upload size={12} />
                  Beralih ke Opsi Unggah Gambar Sekarang
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Option B View: Screenshot Upload & Adjusters */}
        {contentType === 'upload' && (
          <div className="space-y-3 mt-1">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-800 hover:border-indigo-510/50 rounded-xl p-5 text-center cursor-pointer bg-slate-900/40 hover:bg-slate-900/80 transition flex flex-col items-center justify-center space-y-2 group"
            >
              <Upload className="text-slate-500 group-hover:text-indigo-400 transition" size={24} />
              <div className="text-xs text-slate-300 font-medium font-sans">
                {uploadedImage ? 'Screenshot Terunggah' : 'Klik atau seret screenshot Anda ke sini'}
              </div>
              <p className="text-[10px] text-slate-500">Mendukung JPEG, PNG, WEBP (Rasio vertikal disarankan)</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            {uploadedImage && (
              <div className="bg-slate-905 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 uppercase tracking-wide">
                  <Sliders size={13} className="text-indigo-400" />
                  Presisi Posisi Screenshot
                </div>

                {/* ZOOM Sliders */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Perbesar/Skala</span>
                    <span className="font-mono text-indigo-400">{imageZoom}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="300"
                    value={imageZoom}
                    onChange={(e) => setImageZoom(Number(e.target.value))}
                    className="w-full accent-indigo-550 bg-slate-800"
                  />
                </div>

                {/* Y Offset sliders */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Geser Vertikal</span>
                    <span className="font-mono text-indigo-400">{imageYOffset}px</span>
                  </div>
                  <input
                    type="range"
                    min="-250"
                    max="800"
                    value={imageYOffset}
                    onChange={(e) => setImageYOffset(Number(e.target.value))}
                    className="w-full accent-indigo-550 bg-slate-800"
                  />
                  <span className="text-[10px] text-slate-500 leading-none mt-1 block">
                    *Gunakan slider untuk menggulir undangan ke bagian yang menarik (header/kartu).
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <hr className="border-slate-800" />

      {/* SECTION 2: BINGKAI HP & DEVICE CONFIG */}
      <div className="flex flex-col space-y-3">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-2">
          <Smartphone size={14} className="text-indigo-400" />
          2. Bingkai SmartPhone
        </label>

        {/* Primary Phone model options */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setPrimaryModel('iphone15')}
            className={`py-2.5 px-2 rounded-xl text-xs font-medium border transition duration-200 flex flex-col items-center justify-center space-y-1 ${
              primaryModel === 'iphone15'
                ? 'bg-slate-900 border-indigo-500 text-white shadow-lg shadow-indigo-500/10'
                : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone size={16} />
            <span>iPhone 15 Pro</span>
          </button>
          <button
            onClick={() => setPrimaryModel('samsung24')}
            className={`py-2.5 px-2 rounded-xl text-xs font-medium border transition duration-200 flex flex-col items-center justify-center space-y-1 ${
              primaryModel === 'samsung24'
                ? 'bg-slate-900 border-indigo-500 text-white shadow-lg shadow-indigo-500/10'
                : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone size={16} />
            <span>S24 Ultra</span>
          </button>
          <button
            onClick={() => setPrimaryModel('pixel')}
            className={`py-2.5 px-2 rounded-xl text-xs font-medium border transition duration-200 flex flex-col items-center justify-center space-y-1 ${
              primaryModel === 'pixel'
                ? 'bg-slate-900 border-indigo-500 text-white shadow-lg shadow-indigo-500/10'
                : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone size={16} />
            <span>Pixel 8 Pro</span>
          </button>
        </div>

        {/* Multi Device Layout options */}
        <div className="space-y-3 mt-1 bg-slate-900/40 p-3.5 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300 font-medium">Model Status Bar</span>
            <div className="flex bg-slate-950 p-0.5 rounded-lg border border-slate-800">
              <button
                onClick={() => setStatusBarTheme('light')}
                className={`px-2.5 py-1 rounded text-[10px] uppercase font-bold transition ${
                  statusBarTheme === 'light' ? 'bg-slate-800 text-white' : 'text-slate-500'
                }`}
              >
                Putih
              </button>
              <button
                onClick={() => setStatusBarTheme('dark')}
                className={`px-2.5 py-1 rounded text-[10px] uppercase font-bold transition ${
                  statusBarTheme === 'dark' ? 'bg-slate-800 text-white' : 'text-slate-500'
                }`}
              >
                Hitam
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <div className="flex flex-col">
              <span className="text-slate-300 font-medium font-sans">Kombinasikan Device</span>
              <span className="text-[10px] text-slate-500">Campur Android & iPhone</span>
            </div>
            <button
              onClick={() => setMixDevices(!mixDevices)}
              className="text-indigo-400 hover:text-indigo-300 transition focus:outline-none"
            >
              {mixDevices ? <ToggleRight size={28} /> : <ToggleLeft size={28} className="text-slate-600" />}
            </button>
          </div>
        </div>
      </div>

      <hr className="border-slate-800" />

      {/* SECTION 3: LAYOUT PRESET */}
      <div className="flex flex-col space-y-3">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-2">
          <Layers size={14} className="text-indigo-400" />
          3. Layout Promosi
        </label>

        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setLayout('single')}
            className={`py-3 px-1.5 rounded-xl border text-xs font-medium transition duration-200 text-center flex flex-col items-center justify-center space-y-1.5 ${
              layout === 'single'
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 border-indigo-500 text-white shadow-lg'
                : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <div className="w-6 h-5 border border-white/30 rounded flex items-center justify-center">
              <div className="w-2.5 h-4 bg-white/70 rounded-xs" />
            </div>
            <span>Single Focus</span>
          </button>
          
          <button
            onClick={() => setLayout('dual')}
            className={`py-3 px-1.5 rounded-xl border text-xs font-medium transition duration-200 text-center flex flex-col items-center justify-center space-y-1.5 ${
              layout === 'dual'
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 border-indigo-500 text-white shadow-lg'
                : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <div className="w-7 h-5 border border-white/30 rounded flex items-center justify-center gap-0.5 relative overflow-hidden">
              <div className="w-2 h-3.5 bg-white/40 rounded-xs transform -rotate-3 translate-x-0.5" />
              <div className="w-2.5 h-4 bg-white/85 rounded-xs transform rotate-3" />
            </div>
            <span>Dual Device</span>
          </button>

          <button
            onClick={() => setLayout('trio')}
            className={`py-3 px-1.5 rounded-xl border text-xs font-medium transition duration-200 text-center flex flex-col items-center justify-center space-y-1.5 ${
              layout === 'trio'
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 border-indigo-500 text-white shadow-lg'
                : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <div className="w-8 h-5 border border-white/30 rounded flex items-center justify-center gap-0.5 relative overflow-hidden">
              <div className="w-1.5 h-3 bg-white/40 rounded-xs transform -rotate-6" />
              <div className="w-2.5 h-3.5 bg-white/85 rounded-xs relative z-10" />
              <div className="w-1.5 h-3 bg-white/40 rounded-xs transform rotate-6" />
            </div>
            <span>Trio Showcase</span>
          </button>
        </div>

        {/* Aspect Ratio choice toggler */}
        <div className="flex bg-slate-900 p-1.5 rounded-xl items-center mt-1 border border-slate-800">
          <span className="text-[11px] text-slate-400 ml-2.5 font-medium font-sans">Resolusi Kanvas:</span>
          <div className="ml-auto flex gap-1">
            <button
              onClick={() => setRatio('1:1')}
              className={`py-1.5 px-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                ratio === '1:1' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              Feed 1:1
            </button>
            <button
              onClick={() => setRatio('9:16')}
              className={`py-1.5 px-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                ratio === '9:16' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              Story 9:16
            </button>
          </div>
        </div>
      </div>

      <hr className="border-slate-800" />

      {/* SECTION 4: KUSTOMISASI LATAR BELAKANG */}
      <div className="flex flex-col space-y-3">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-2">
          <Palette size={14} className="text-indigo-400" />
          4. Latar Belakang Kanvas
        </label>

        {/* Selection of Background Type */}
        <div className="grid grid-cols-3 gap-1 bg-slate-900 p-1 rounded-lg text-[10px] border border-slate-805">
          <button
            onClick={() => setBgType('preset')}
            className={`py-1.5 rounded-md text-center font-medium transition duration-150 ${
              bgType === 'preset' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            Preset Estetis
          </button>
          <button
            onClick={() => setBgType('custom_color')}
            className={`py-1.5 rounded-md text-center font-medium transition duration-150 ${
              bgType === 'custom_color' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            Custom Gradasi
          </button>
          <button
            onClick={() => setBgType('custom_image')}
            className={`py-1.5 rounded-md text-center font-medium transition duration-150 ${
              bgType === 'custom_image' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            Uploader Bg
          </button>
        </div>

        {/* Choice A: Present Gradients */}
        {bgType === 'preset' && (
          <div className="grid grid-cols-4 gap-2 mt-1">
            {bgPresets.map((preset) => {
              const gradientBg =
                preset.type === 'solid'
                  ? preset.colors[0]
                  : `linear-gradient(135deg, ${preset.colors[0]}, ${preset.colors[1]})`;
              
              const isSelected = selectedPreset.id === preset.id;

              return (
                <button
                  key={preset.id}
                  onClick={() => setSelectedPreset(preset)}
                  title={preset.name}
                  className={`w-full aspect-square rounded-lg relative overflow-hidden group focus:outline-none transition-all duration-200 ${
                    isSelected ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-[#0f172a] scale-102' : 'hover:scale-105'
                  }`}
                  style={{ background: gradientBg }}
                >
                  {/* Subtle hover name */}
                  <span className="absolute bottom-0 text-[8px] bg-black/60 text-white py-0.5 inset-x-0 text-center opacity-0 group-hover:opacity-100 transition truncate px-0.5">
                    {preset.name}
                  </span>
                  {isSelected && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/15">
                      <div className="w-1.5 h-1.5 rounded-full bg-white ring-3 ring-indigo-500" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Choice B: Custom Gradient */}
        {bgType === 'custom_color' && (
          <div className="space-y-3 mt-1 bg-slate-900/40 p-3.5 rounded-xl border border-slate-800">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500">Warna Mulai</span>
                <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-850 rounded-lg p-1.5">
                  <input
                    type="color"
                    value={customColor1}
                    onChange={(e) => setCustomColor1(e.target.value)}
                    className="w-6 h-6 border-0 p-0 bg-transparent cursor-pointer rounded overflow-hidden"
                  />
                  <span className="font-mono text-xs uppercase hidden sm:inline text-slate-300">{customColor1}</span>
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500">Warna Selesai</span>
                <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-850 rounded-lg p-1.5">
                  <input
                    type="color"
                    value={customColor2}
                    onChange={(e) => setCustomColor2(e.target.value)}
                    className="w-6 h-6 border-0 p-0 bg-transparent cursor-pointer rounded overflow-hidden"
                  />
                  <span className="font-mono text-xs uppercase hidden sm:inline text-slate-300">{customColor2}</span>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-405">
                <span>Sudut Kemiringan</span>
                <span>{customAngle}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                value={customAngle}
                onChange={(e) => setCustomAngle(Number(e.target.value))}
                className="w-full accent-indigo-550 bg-slate-800"
              />
            </div>
          </div>
        )}

        {/* Choice C: Custom Upload Image */}
        {bgType === 'custom_image' && (
          <div className="space-y-2 mt-1">
            <div
              onClick={() => bgInputRef.current?.click()}
              className="border border-dashed border-slate-800 hover:border-indigo-500/50 rounded-xl p-3.5 text-center cursor-pointer bg-slate-900/40 hover:bg-slate-900/80 transition flex items-center justify-center gap-2"
            >
              <Upload size={14} className="text-slate-400" />
              <span className="text-xs text-slate-300">
                {customImage ? 'Latar Belakang Terpasang' : 'Pilih Gambar Latar Belakang'}
              </span>
              <input
                ref={bgInputRef}
                type="file"
                accept="image/*"
                onChange={handleCustomBgUpload}
                className="hidden"
              />
            </div>
            {customImage && (
              <p className="text-[10px] text-slate-500 text-center">
                *Gambar kustom digunakan sebagai latar belakang utama pada kanvas promosi.
              </p>
            )}
          </div>
        )}

        {/* Additional Toggle Options (Aura Glow) */}
        <div className="flex items-center justify-between text-xs pt-1.5">
          <div className="flex flex-col">
            <span className="text-slate-300 font-medium flex items-center gap-1">
              <Sparkles size={11} className="text-amber-400 animate-pulse" />
              Efek Glow (Lampu Aura)
            </span>
            <span className="text-[10px] text-slate-500">Pendaran cahaya murni di latar</span>
          </div>
          <button
            onClick={() => setShowAuraGlow(!showAuraGlow)}
            className="text-indigo-400 hover:text-indigo-300 transition focus:outline-none"
          >
            {showAuraGlow ? <ToggleRight size={28} /> : <ToggleLeft size={28} className="text-slate-600" />}
          </button>
        </div>
      </div>

      {/* FOOTER & DOWNLOAD PROMOTIONAL BUTTON */}
      <div className="pt-4 mt-auto">
        <button
          onClick={onDownload}
          disabled={isDownloading}
          className={`w-full py-4 px-4 rounded-xl font-bold text-sm tracking-wide text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 transition-all duration-350 flex items-center justify-center gap-2 text-center cursor-pointer select-none shadow-xl shadow-indigo-900/40 relative overflow-hidden ${
            isDownloading ? 'opacity-70 cursor-not-allowed' : 'active:scale-98'
          }`}
        >
          {isDownloading ? (
            <>
              <RefreshCw className="animate-spin" size={16} />
              <span>Membuat Gambar...</span>
            </>
          ) : (
            <>
              <Download size={15} />
              <span>Download Mockup Image</span>
            </>
          )}
        </button>
        <p className="text-[9px] text-slate-500 text-center mt-2.5 uppercase tracking-wide">
          Ekspor beresolusi tinggi (Feed 800px / Story 1024px)
        </p>
      </div>

    </div>
  );
};
