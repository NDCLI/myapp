import type { LucideIcon } from 'lucide-react';
import {
  Box,
  Calculator,
  Image as ImageIcon,
  Layers,
  LayoutDashboard,
  Pipette,
  ScanSearch,
  User,
} from 'lucide-react';
import annotationsIllustration from '../assets/illustrations/annotations-counter-real-polished.webp';
import automarkerReidIllustration from '../assets/illustrations/automarker-reid-real-polished.webp';
import boxIllustration from '../assets/illustrations/cvat-box-tool-real-polished.webp';
import chamCongIllustration from '../assets/illustrations/cham-cong-real-polished.webp';
import colorPickerIllustration from '../assets/illustrations/color-picker-real-polished.webp';
import imageViewerIllustration from '../assets/illustrations/images-viewer-real-polished.webp';

export type Category = 'all' | 'cvat' | 'personal';
export type AppCategory = Exclude<Category, 'all'>;

export interface AppItem {
  id: string;
  title: string;
  description: string;
  url: string;
  Icon: LucideIcon;
  tags: readonly string[];
  platform: string;
  accent: string;
  accentBackground: string;
  category: AppCategory;
  screenshot: string;
  imageFit?: 'cover' | 'contain';
  imagePosition?: string;
  highlights: readonly string[];
  guide: readonly string[];
}

export interface CategoryItem {
  key: Category;
  label: string;
  shortLabel: string;
  Icon: LucideIcon;
}

export const apps: readonly AppItem[] = [
  {
    id: 'cvatbox',
    title: 'CVAT Box Tool',
    category: 'cvat',
    Icon: Box,
    description:
      'Phát hiện, kiểm tra trực quan và loại bỏ bounding box trùng lặp trong dữ liệu CVAT XML hoặc ZIP.',
    url: 'https://boxct.vercel.app/',
    tags: ['Kiểm định', 'CVAT', 'XML'],
    platform: 'Ứng dụng web',
    screenshot: boxIllustration,
    imagePosition: 'center',
    accent: 'hover:border-amber-400/40',
    accentBackground: 'group-hover:bg-amber-400/15 group-hover:text-amber-200',
    highlights: [
      'Quét XML/ZIP để tìm nhanh các box có khả năng trùng lặp.',
      'Đối chiếu frame, label, ID và tọa độ trong cùng một màn hình.',
      'Giảm thời gian dọn annotation trước khi bàn giao dữ liệu.',
    ],
    guide: [
      'Tải file XML hoặc ZIP annotations được xuất từ CVAT.',
      'Để công cụ quét và liệt kê các bounding box có khả năng trùng lặp.',
      'Kiểm tra ID đối tượng, tọa độ và frame tương ứng trên màn hình đối chiếu.',
      'Tải xuống file XML sạch sau khi đã xác nhận kết quả.',
    ],
  },
  {
    id: 'annotations',
    title: 'Annotations Counter',
    category: 'cvat',
    Icon: ImageIcon,
    description:
      'Đếm box trong CVAT XML/ZIP theo khoảng frame, trừ label cần bỏ qua và cảnh báo các box trùng tọa độ.',
    url: 'https://exclude-ct.vercel.app/',
    tags: ['CVAT', 'XML/ZIP', 'Box Count'],
    platform: 'Ứng dụng web',
    screenshot: annotationsIllustration,
    imagePosition: 'center',
    accent: 'hover:border-fuchsia-400/40',
    accentBackground: 'group-hover:bg-fuchsia-400/15 group-hover:text-fuchsia-200',
    highlights: [
      'Đọc trực tiếp file CVAT .xml hoặc .zip và tự chọn annotations.xml trong gói nén.',
      'Tính Final Count từ tổng box sau khi trừ _excl_area, label loại trừ và frame skip/pass.',
      'Hiển thị frame có box, frame bị skip/pass, khoảng Box ID và danh sách box trùng tọa độ.',
    ],
    guide: [
      'Kéo thả hoặc chọn file .xml/.zip chứa annotations xuất từ CVAT.',
      'Chỉnh Start/End để tính riêng khoảng frame cần kiểm tra.',
      'Mở Exclude Config để thêm hoặc bỏ các label không tính vào Final Count.',
      'Xem Statistic Overview để lấy tổng box, số box bị loại, Final Count và khoảng Box ID.',
      'Nếu có cảnh báo Duplicate Boxes, mở modal để xem frame, ID box, label và vị trí trùng tọa độ.',
    ],
  },
  {
    id: 'imageview',
    title: 'Images Viewer',
    category: 'cvat',
    Icon: LayoutDashboard,
    description:
      'Duyệt bộ ảnh lớn, hiển thị bounding box và chuyển nhanh giữa các frame trong một giao diện tập trung.',
    url: 'https://imageview.vercel.app/',
    tags: ['Trình xem', 'Dữ liệu ảnh', 'QA'],
    platform: 'Ứng dụng web',
    screenshot: imageViewerIllustration,
    imagePosition: 'center',
    accent: 'hover:border-emerald-400/40',
    accentBackground: 'group-hover:bg-emerald-400/15 group-hover:text-emerald-200',
    highlights: [
      'Duyệt nhanh bộ ảnh lớn mà vẫn giữ ngữ cảnh frame hiện tại.',
      'Bật/tắt annotation overlay để kiểm tra box trực quan.',
      'Hữu ích cho QA ảnh, rà lỗi frame và so sánh nhãn theo chuỗi.',
    ],
    guide: [
      'Chọn thư mục hoặc tải file ZIP chứa bộ ảnh cần kiểm tra.',
      'Dùng phím mũi tên hoặc F/D để chuyển nhanh giữa các ảnh.',
      'Nhấn Ctrl + F để tìm theo frame ID hoặc tên file.',
      'Bật Show Boxes để hiển thị annotation từ file XML đi kèm.',
    ],
  },
  {
    id: 'colorpicker',
    title: 'Color Picker',
    category: 'cvat',
    Icon: Pipette,
    description:
      'Lấy màu chính xác tới từng pixel và phân tích nhóm màu trên Windows với bộ máy nhận diện hỗ trợ AI.',
    url: 'https://color-analyze.vercel.app/',
    tags: ['Windows', 'AI', 'Màu sắc'],
    platform: 'Ứng dụng Windows',
    screenshot: colorPickerIllustration,
    imagePosition: 'center',
    accent: 'hover:border-pink-400/40',
    accentBackground: 'group-hover:bg-pink-400/15 group-hover:text-pink-200',
    highlights: [
      'Bắt màu từ màn hình, clipboard hoặc vùng chọn thủ công.',
      'Phân tích nhóm màu để hỗ trợ chuẩn hóa nhãn và kiểm tra dữ liệu.',
      'Phù hợp khi cần quyết định màu nhanh mà không mở phần mềm nặng.',
    ],
    guide: [
      'Nhấn Alt + S để mở kính lúp và chọn màu trực tiếp trên màn hình.',
      'Nhấn Alt + A để chọn vùng Lasso hoặc Ctrl + V để phân tích từ clipboard.',
      'Xem kết quả tổng hợp từ nhiều thuật toán để xác định tên và nhóm màu.',
    ],
  },
  {
    id: 'automarker-reid',
    title: 'AutoMarker Re-ID',
    category: 'cvat',
    Icon: ScanSearch,
    description:
      'Ứng dụng Windows dùng AI Re-ID cục bộ để nhận diện mục tiêu từ ảnh chụp màn hình và hỗ trợ vẽ khung nhanh.',
    url: 'https://github.com/NDCLI/ReID_Auto',
    tags: ['Windows', 'Python', 'Re-ID'],
    platform: 'Ứng dụng Windows · mã nguồn mở',
    screenshot: automarkerReidIllustration,
    imagePosition: 'center',
    accent: 'hover:border-cyan-400/40',
    accentBackground: 'group-hover:bg-cyan-400/15 group-hover:text-cyan-200',
    highlights: [
      'Nhận diện lại cùng một đối tượng bằng mô hình Re-ID chạy cục bộ.',
      'Hỗ trợ workflow vẽ khung từ ảnh chụp màn hình khi làm dữ liệu CVAT.',
      'Repo mới đã được trỏ đúng sang NDCLI/ReID_Auto.',
    ],
    guide: [
      'Cài ứng dụng trên Windows và chuẩn bị ảnh mẫu trong thư mục queries.',
      'Chọn nhân vật hoặc đối tượng cần tìm bằng ảnh mẫu đã chuẩn bị.',
      'Chụp giao diện bằng Snipping Tool hoặc ShareX để AI nhận diện.',
      'Dùng Batch Review để hiệu chỉnh khung và lưu kết quả cuối.',
    ],
  },
  {
    id: 'chamcong',
    title: 'Chấm Công',
    category: 'personal',
    Icon: Calculator,
    description:
      'Theo dõi ngày công, tăng ca, các khoản khấu trừ và thu nhập cá nhân theo từng tháng.',
    url: 'https://ccong.vercel.app/',
    tags: ['Cá nhân', 'Tài chính', 'Theo dõi'],
    platform: 'Ứng dụng web',
    screenshot: chamCongIllustration,
    imagePosition: 'center',
    accent: 'hover:border-blue-400/40',
    accentBackground: 'group-hover:bg-blue-400/15 group-hover:text-blue-200',
    highlights: [
      'Tính nhanh lương tháng dựa trên ngày công, tăng ca và khấu trừ.',
      'Theo dõi biến động thu nhập cá nhân theo từng kỳ.',
      'Có thể đồng bộ dữ liệu giữa nhiều thiết bị khi cần.',
    ],
    guide: [
      'Nhập lương cơ bản và số người phụ thuộc cho năm đang theo dõi.',
      'Điền giờ tăng ca theo mức 150%, 200% hoặc 300%.',
      'Dùng mã bí mật để đồng bộ dữ liệu trên nhiều thiết bị khi cần.',
      'Tùy chỉnh bảo hiểm, trợ cấp và các khoản khấu trừ trong phần cài đặt.',
    ],
  },
];

export const categories: readonly CategoryItem[] = [
  { key: 'all', label: 'Tất cả ứng dụng', shortLabel: 'Tất cả', Icon: Layers },
  { key: 'cvat', label: 'Công cụ CVAT', shortLabel: 'CVAT', Icon: Box },
  { key: 'personal', label: 'Tiện ích cá nhân', shortLabel: 'Cá nhân', Icon: User },
];
