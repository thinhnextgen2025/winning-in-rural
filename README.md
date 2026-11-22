# Winning in Rural · S27

Web báo cáo (chỉ xem, có đăng nhập). Dữ liệu mã hoá AES-256-GCM.

## Sửa qua GitHub
- **Code** sửa tự do rồi push là chạy: `app.js`, `app.css`, `app-body.html`.
- **Dữ liệu** (`data.enc`, `f/*.bin`) đã mã hoá — đổi số liệu phải build lại bằng mật khẩu (chủ repo / Claude).
- `index.html` là màn hình đăng nhập; sau khi đăng nhập nó giải mã `data.enc` rồi nạp `app.css` + `app-body.html` + `app.js`.
