import { useEffect, useState } from 'react';
import { Github, ExternalLink, LayoutDashboard, Image as ImageIcon, Calculator, SquareCheck, Sparkles, Monitor, Cpu, Box, Pipette } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
import chamcongSS from './assets/chamcong-ss.png';
import annotationsSS from './assets/annotations-ss.png';
import imageviewSS from './assets/imageview-ss.png';
import colorpickerSS from './assets/colorpicker-ss.png';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface AppItem {
  title: string;
  description: string;
  url: string;
  icon: React.ReactNode;
  tags: string[];
  color: string;
}

const apps: AppItem[] = [
  {
    title: "Chấm Công",
    description: "Công cụ theo dõi ngày công và quản lý thu nhập cá nhân. Giao diện đơn giản, tính toán chính xác.",
    url: "https://ccong.vercel.app/",
    icon: <Calculator className="w-6 h-6" />,
    tags: ["Personal", "Finance", "Tool"],
    color: "from-blue-500/20 to-indigo-500/20"
  },
  {
    title: "Annotations Counter",
    description: "Thống kê và phân tích dữ liệu gán nhãn từ CVAT. Hỗ trợ kiểm tra lỗi duplicate và lọc label chuyên sâu.",
    url: "https://exclude-ct.vercel.app/",
    icon: <ImageIcon className="w-6 h-6" />,
    tags: ["Data", "CVAT", "Stats"],
    color: "from-purple-500/20 to-pink-500/20"
  },
  {
    title: "Images Viewer",
    description: "Trình duyệt ảnh hiệu năng cao cho bộ dữ liệu lớn. Hỗ trợ hiển thị bounding box và điều hướng thông minh.",
    url: "https://imageview.vercel.app/",
    icon: <LayoutDashboard className="w-6 h-6" />,
    tags: ["Viewer", "Utility", "Quality"],
    color: "from-emerald-500/20 to-teal-500/20"
  },
  {
    title: "Attributes Check",
    description: "Kiểm tra tính toàn vẹn của thuộc tính dữ liệu. Đảm bảo chất lượng dataset cho các mô hình AI.",
    url: "https://atrb.vercel.app/",
    icon: <SquareCheck className="w-6 h-6" />,
    tags: ["QA", "Dataset", "Tools"],
    color: "from-amber-500/20 to-orange-500/20"
  },
  {
    title: "Color Picker",
    description: "Bộ công cụ AI mạnh mẽ để lấy màu chính xác từng pixel và phân tích nhóm màu thông minh.",
    url: "https://color-analyze.vercel.app/",
    icon: <Pipette className="w-6 h-6" />,
    tags: ["Windows", "AI", "Design"],
    color: "from-pink-500/20 to-red-500/20"
  }
];

function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 selection:bg-blue-500/30 selection:text-blue-200 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px] animate-blob" />
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/10 blur-[120px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-10%] left-[20%] w-[45%] h-[45%] rounded-full bg-cyan-600/10 blur-[120px] animate-blob animation-delay-4000" />
        <div className="absolute inset-0 bg-mesh opacity-50" />
      </div>

      <div className="relative z-10">
        {/* Navigation / Top Bar */}
        <nav className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Box className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black text-white tracking-tighter italic uppercase">App Hub</span>
            </div>

          <div className="flex gap-4">
            <a
              href="https://github.com/NDCLI"
              target="_blank"
              className="p-2.5 rounded-full glass-card hover:bg-white/10 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </nav>

        {/* Hero Section */}
        <header className="max-w-7xl mx-auto px-6 pt-12 pb-24 text-center md:text-left grid md:grid-cols-2 items-center gap-12">
          <div className={cn("transition-all duration-1000 transform", mounted ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0")}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">Personal Projects 2026</span>
            </div>
            <h1 className="text-6xl lg:text-8xl font-black tracking-tight text-white leading-none mb-8">
              Creative <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">Workspace.</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-lg mb-10 leading-relaxed font-medium">
              Tổng hợp các công cụ xây dựng để tối ưu hóa công việc và theo dõi dữ liệu hàng ngày.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <div className="flex items-center gap-2 px-5 py-2.5 rounded-2xl glass-card text-sm font-semibold border-blue-500/20">
                <Monitor className="w-4 h-4 text-blue-400" /> Web Optimized
              </div>
              <div className="flex items-center gap-2 px-5 py-2.5 rounded-2xl glass-card text-sm font-semibold border-purple-500/20">
                <Cpu className="w-4 h-4 text-purple-400" /> AI Powered
              </div>
            </div>
          </div>

          <div className={cn("hidden md:block transition-all duration-1000 delay-300 transform", mounted ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0")}>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="hidden lg:block relative">
                <div className="glass-card p-2 rounded-[2.5rem] aspect-[16/10] relative overflow-hidden group border-white/10 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  {/* Browser Window UI */}
                  <div className="relative z-10 w-full h-full rounded-[2rem] overflow-hidden bg-[#020617] border border-white/5 flex flex-col">
                    <div className="h-8 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                      </div>
                      <div className="mx-auto w-48 h-4 bg-white/5 rounded-full" />
                    </div>
                    <div className="flex-1 overflow-hidden relative p-1 bg-[#020617]">
                      <div className="grid grid-cols-2 gap-1 h-full">
                        <div className="relative overflow-hidden rounded-lg group/img">
                          <img src={chamcongSS} alt="Chấm Công" className="w-full h-full object-cover transform transition-transform duration-700 group-hover/img:scale-110" />
                          <div className="absolute inset-0 bg-blue-500/10 flex items-end p-2">
                            <span className="text-[8px] font-bold text-white bg-blue-600 px-1.5 py-0.5 rounded shadow-lg">Chấm Công</span>
                          </div>
                        </div>
                        <div className="relative overflow-hidden rounded-lg group/img">
                          <img src={annotationsSS} alt="Annotations" className="w-full h-full object-cover transform transition-transform duration-700 group-hover/img:scale-110" />
                          <div className="absolute inset-0 bg-purple-500/10 flex items-end p-2">
                            <span className="text-[8px] font-bold text-white bg-purple-600 px-1.5 py-0.5 rounded shadow-lg">Counter</span>
                          </div>
                        </div>
                        <div className="relative overflow-hidden rounded-lg group/img">
                          <img src={imageviewSS} alt="Image Viewer" className="w-full h-full object-cover transform transition-transform duration-700 group-hover/img:scale-110" />
                          <div className="absolute inset-0 bg-emerald-500/10 flex items-end p-2">
                            <span className="text-[8px] font-bold text-white bg-emerald-600 px-1.5 py-0.5 rounded shadow-lg">Viewer</span>
                          </div>
                        </div>
                        <div className="relative overflow-hidden rounded-lg group/img">
                          <img src={colorpickerSS} alt="Color Picker" className="w-full h-full object-cover transform transition-transform duration-700 group-hover/img:scale-110" />
                          <div className="absolute inset-0 bg-pink-500/10 flex items-end p-2">
                            <span className="text-[8px] font-bold text-white bg-pink-600 px-1.5 py-0.5 rounded shadow-lg">Color AI</span>
                          </div>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/40 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>
                  
                  {/* Decoration */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Apps Section */}
        <section id="apps-grid" className="max-w-7xl mx-auto px-6 pb-24">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Applications</h2>
              <div className="h-1 w-12 bg-blue-500 rounded-full" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apps.map((app, index) => (
              <div
                key={index}
                onClick={() => window.open(app.url, '_blank')}
                className={cn(
                  "glass-card p-6 rounded-[2rem] flex flex-col glass-card-hover group relative overflow-hidden transition-all duration-700 cursor-pointer",
                  mounted ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                )}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500", app.color)} />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500">
                      {app.icon}
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={`#guide-${index}`}
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 rounded-full bg-white/5 border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-blue-500/20 hover:border-blue-500/40"
                        title="Xem hướng dẫn"
                      >
                        <Sparkles className="w-4 h-4 text-blue-400" />
                      </a>
                      <div
                        className="p-2 rounded-full bg-white/5 border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-white/10"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {app.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-8 leading-relaxed line-clamp-3">
                    {app.description}
                  </p>

                  <div className="mt-auto flex flex-wrap gap-2">
                    {app.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Guide Section */}
        <section className="max-w-7xl mx-auto px-6 pb-32">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-2">Usage Guide</h2>
            <div className="h-1 w-12 bg-purple-500 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {apps.map((app, index) => (
              <div
                key={index}
                id={`guide-${index}`}
                className="glass-card p-8 rounded-[2.5rem] border-white/5 hover:border-purple-500/30 transition-colors"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-purple-400">
                    {app.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{app.title}</h3>
                </div>

                <ul className="space-y-4">
                  {[
                    app.title === "Chấm Công" && "Nhập Lương cơ bản (LCB) và số người phụ thuộc (NPT) ở thanh công cụ phía trên.",
                    app.title === "Chấm Công" && "Điền số giờ tăng ca vào các cột tương ứng: 150%, 200%, 300% tùy theo ngày làm việc.",
                    app.title === "Chấm Công" && "Sử dụng tính năng Đồng bộ Cloud với mã bí mật để lưu trữ và xem dữ liệu trên nhiều thiết bị.",
                    app.title === "Chấm Công" && "Tùy chỉnh các mức đóng bảo hiểm và trợ cấp trong phần Cài đặt (⚙️).",

                    app.title === "Annotations Counter" && "Tải lên file .xml hoặc .zip chứa annotations được xuất bản trực tiếp từ CVAT.",
                    app.title === "Annotations Counter" && "Nhập khoảng Frame (Start/End) nếu chỉ muốn thống kê một đoạn video hoặc chuỗi ảnh cụ thể.",
                    app.title === "Annotations Counter" && "Thêm nhãn vào danh sách Exclude Labels để loại bỏ các nhãn rác khỏi thống kê chính.",
                    app.title === "Annotations Counter" && "Kiểm tra các lỗi Duplicate (đối tượng trùng khít 100%) để đảm bảo chất lượng dữ liệu.",

                    app.title === "Images Viewer" && "Tải dữ liệu bằng cách chọn thư mục (Folder) hoặc tải lên file ZIP chứa ảnh.",
                    app.title === "Images Viewer" && "Sử dụng phím Mũi tên Phải/F để tới ảnh tiếp theo, Mũi tên Trái/D để quay lại.",
                    app.title === "Images Viewer" && "Nhấn Ctrl + F để tìm kiếm nhanh ảnh theo ID frame hoặc tên file cực kỳ tiện lợi.",
                    app.title === "Images Viewer" && "Bật/tắt Show Boxes để hiển thị khung bao từ file XML annotations đi kèm.",

                    app.title === "Attributes Check" && "Tải lên file XML/ZIP để kiểm tra tính đầy đủ của thuộc tính (attributes) trong dữ liệu.",
                    app.title === "Attributes Check" && "Hệ thống tự động phát hiện lỗi Missing (quên chọn) hoặc Extra (chọn thừa) thuộc tính.",
                    app.title === "Attributes Check" && "Xem báo cáo chi tiết theo từng nhãn với ID đối tượng và số Frame cụ thể để sửa lỗi.",

                    app.title === "Color Picker" && "Sử dụng phím Alt + S để mở kính lúp và chọn mã màu chính xác từ màn hình.",
                    app.title === "Color Picker" && "Nhấn Alt + A để vẽ vùng chọn Lasso hoặc Ctrl + V để phân tích màu từ Clipboard.",
                    app.title === "Color Picker" && "Công nghệ AI Ensemble Voting giúp định danh tên màu chính xác với 6 thuật toán lõi.",

                    "Truy cập ứng dụng ngay để trải nghiệm đầy đủ các tính năng chuyên sâu."
                  ].filter(Boolean).map((step, i) => (
                    <li key={i} className="flex gap-3 text-slate-400 text-sm leading-relaxed">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center text-[10px] font-bold border border-purple-500/20">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/5 py-24 px-6 relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-white mb-4">Let's Build Something Great.</h3>
                <p className="text-slate-500 max-w-sm mx-auto md:mx-0">
                  Cảm ơn bạn đã ghé thăm hub ứng dụng.
                </p>
              </div>
              <div className="flex justify-center md:justify-end">
                <a
                  href="https://github.com/NDCLI"
                  target="_blank"
                  className="flex items-center gap-4 px-8 py-4 rounded-[2rem] glass-card glass-card-hover group"
                >
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                    <Github className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-1">Developer Profile</div>
                    <div className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">@NDCLI</div>
                  </div>
                </a>
              </div>
            </div>
            <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-600 text-xs font-bold tracking-widest uppercase">
              <span>&copy; 2026 EXCL HUB STUDIO</span>
              <span>Built with React & Tailwind 4</span>
            </div>
          </div>
        </footer>
      </div>
      <Analytics />
    </div>
  );
}

export default App;
