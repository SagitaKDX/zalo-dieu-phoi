# Điều phối gọn

Trang trình bày ý tưởng bot điều phối nhân viên qua Zalo cho doanh nghiệp nhỏ. Đây là bản demo giao diện; chưa kết nối Zalo OA, KiotViet hay dữ liệu thật.

## Chạy thử

```sh
npm install
npm run dev
```

## Đưa lên GitHub Pages

1. Tạo repository GitHub tên `zalo-dieu-phoi` và đẩy toàn bộ thư mục này lên nhánh `main`.
2. Trong **Settings → Pages**, chọn nguồn triển khai bằng **GitHub Actions**.
3. Workflow sẽ tự build và xuất bản tại `https://TEN_TAI_KHOAN.github.io/zalo-dieu-phoi/`.

Nếu dùng repository dạng `TEN_TAI_KHOAN.github.io`, đổi `base` trong `vite.config.js` thành `/`.

## Hosting thật cho bot

GitHub Pages chỉ phục vụ trang tĩnh. Bot cần một máy chủ chạy liên tục và nơi lưu trạng thái công việc. Chi phí trong trang chỉ là giả định để minh họa; phí Zalo OA/API, máy chủ, tên miền, tích hợp KiotViet và phát triển cần xác nhận theo tài khoản, lưu lượng và phạm vi thực tế.
