import { useMemo, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  Boxes,
  Check,
  CheckCheck,
  ChevronRight,
  CircleHelp,
  Database,
  MessageCircle,
  PackageCheck,
  Send,
  Server,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from 'lucide-react';

const steps = [
  {
    label: 'Sếp giao việc',
    title: 'Nhắn như đang nhắn cho nhân viên',
    text: 'Ghi tên khách, món hàng, số lượng và hạn giao trong một tin nhắn.',
    manager: 'Chị Lan lấy 4 hộp “mầm xanh”, giao trước 3 giờ. Nhờ Nam soạn giúp anh.',
    bot: 'Em thấy “mầm xanh” có thể là SP-042. Anh xác nhận giúp em nhé?',
    status: 'Chờ sếp xác nhận tên hàng',
  },
  {
    label: 'Bot chia việc',
    title: 'Đúng người nhận, rõ việc cần làm',
    text: 'Bot gửi riêng cho nhân viên phụ trách và ghi lại người nhận việc.',
    manager: 'Đã xác nhận: SP-042, số lượng 4 hộp.',
    bot: 'Đã giao Nam soạn 4 hộp SP-042 cho khách Lan. Hạn: 15:00.',
    status: 'Đã gửi việc cho Nam',
  },
  {
    label: 'Nhân viên cập nhật',
    title: 'Nhân viên báo tiến độ ngay trong Zalo',
    text: 'Một nút bấm để nhận việc, báo đang làm hoặc báo đã xong.',
    manager: 'Nam đã nhận việc lúc 14:10. Đang soạn hàng.',
    bot: 'Khi hoàn tất, Nam bấm “Xong”. Sếp sẽ thấy cập nhật ngay.',
    status: 'Nam đang soạn hàng',
  },
  {
    label: 'Sếp xem kết quả',
    title: 'Không cần hỏi từng người một',
    text: 'Sếp xem việc nào xong, việc nào trễ và ai đang phụ trách.',
    manager: 'Nam đã hoàn tất. Đơn của chị Lan sẵn sàng giao.',
    bot: 'Đã cập nhật trạng thái và lưu lại lịch sử xử lý.',
    status: 'Đã hoàn tất',
  },
];

function formatVnd(value) {
  return new Intl.NumberFormat('vi-VN').format(Math.max(0, Math.round(value))) + 'đ';
}

function ChatBubble({ children, side = 'left', tone = '' }) {
  return <div className={`chat-bubble ${side} ${tone}`}>{children}</div>;
}

function App() {
  const [step, setStep] = useState(0);
  const [employees, setEmployees] = useState(8);
  const [minutes, setMinutes] = useState(15);
  const [hourlyValue, setHourlyValue] = useState(30000);
  const [days, setDays] = useState(22);
  const [serverCost, setServerCost] = useState(200000);
  const [oaCost, setOaCost] = useState(0);

  const timeValue = useMemo(
    () => employees * (minutes / 60) * hourlyValue * days,
    [employees, minutes, hourlyValue, days],
  );
  const monthlyCost = Number(serverCost) + Number(oaCost);
  const estimatedDifference = timeValue - monthlyCost;
  const progress = [25, 48, 73, 100][step];

  const nextStep = () => setStep((current) => (current + 1) % steps.length);

  return (
    <>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Về đầu trang">
          <span className="brand-mark"><MessageCircle size={18} strokeWidth={2.7} /></span>
          <span>Điều phối <b>gọn</b></span>
        </a>
        <nav aria-label="Điều hướng chính">
          <a href="#how">Cách chạy</a>
          <a href="#hosting">Chi phí</a>
          <a className="nav-cta" href="#start">Xem đề xuất <ArrowRight size={15} /></a>
        </nav>
      </header>

      <main id="top">
        <section className="hero section-wrap">
          <div className="hero-copy">
            <div className="eyebrow"><span className="live-dot" /> Ý tưởng cho doanh nghiệp nhỏ</div>
            <h1>Sếp nhắn một câu.<br /><span>Cả đội biết việc.</span></h1>
            <p className="hero-lead">Giữ KiotViet để quản lý đơn hàng và tồn kho. Thêm bot Zalo để giao việc, nhận báo cáo và theo dõi tiến độ.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#how">Xem thử cách chạy <ArrowDown size={16} /></a>
              <span className="small-proof"><ShieldCheck size={16} /> Nhân viên dùng Zalo quen thuộc</span>
            </div>
            <div className="hero-facts">
              <div><strong>01</strong><span>tin nhắn giao việc</span></div>
              <div><strong>03</strong><span>bước cập nhật</span></div>
              <div><strong>0</strong><span>app mới phải cài</span></div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-note"><span className="note-icon"><Zap size={15} /></span> Mô phỏng trên điện thoại</div>
            <div className="phone-shell">
              <div className="phone-top"><span>9:41</span><span className="phone-status"><i /><i /><i /></span></div>
              <div className="chat-head">
                <span className="back-mark">‹</span>
                <span className="avatar avatar-owner">A</span>
                <span className="chat-person"><b>Bot Điều phối</b><small>đang hoạt động</small></span>
                <span className="head-dots">•••</span>
              </div>
              <div className="chat-date">HÔM NAY 14:05</div>
              <div className="chat-thread">
                <ChatBubble side="right">Chị Lan lấy 4 hộp “mầm xanh”, giao trước 3 giờ. Nhờ Nam soạn giúp anh.</ChatBubble>
                <div className="bot-row">
                  <span className="avatar avatar-bot">D</span>
                  <div className="bot-stack">
                    <ChatBubble>Em thấy “mầm xanh” có thể là SP-042. Anh xác nhận giúp em nhé?</ChatBubble>
                    <div className="suggestion"><PackageCheck size={15} /><span><b>SP-042</b><small>4 hộp · khách Lan</small></span><button type="button" onClick={() => setStep(1)} aria-label="Xác nhận sản phẩm"><Check size={17} /></button></div>
                  </div>
                </div>
                <ChatBubble side="right" tone="muted">Đúng rồi, giao cho Nam.</ChatBubble>
                <div className="system-reply"><CheckCheck size={14} /> Bot đã giao việc cho Nam</div>
              </div>
              <div className="phone-compose"><span>Nhắn tin</span><span className="compose-send"><Send size={15} /></span></div>
            </div>
            <div className="float-pill"><span className="tiny-check"><Check size={13} /></span> Tên hàng lạ? Bot hỏi lại trước khi tạo đơn</div>
          </div>
        </section>

        <section className="section-band" id="how">
          <div className="section-wrap flow-section">
            <div className="section-heading">
              <div className="eyebrow">TỪ TIN NHẮN ĐẾN KẾT QUẢ</div>
              <h2>Quy trình rõ ràng,<br className="desktop-break" /> sếp không phải đuổi theo.</h2>
              <p>Chạm từng bước để xem ai làm gì. Mọi cập nhật đều nằm trong một luồng dễ theo dõi.</p>
            </div>
            <div className="flow-grid">
              <div className="step-list" role="tablist" aria-label="Các bước điều phối">
                {steps.map((item, index) => (
                  <button className={`step-button ${step === index ? 'selected' : ''}`} key={item.label} id={`flow-step-${index}`} onClick={() => setStep(index)} role="tab" aria-controls="flow-demo" aria-selected={step === index} type="button">
                    <span className="step-number">{index < step ? <Check size={15} /> : `0${index + 1}`}</span>
                    <span className="step-label"><b>{item.label}</b><small>{item.title}</small></span>
                    <ChevronRight size={17} className="step-chevron" />
                  </button>
                ))}
              </div>
              <div className="flow-demo" id="flow-demo" role="tabpanel" aria-labelledby={`flow-step-${step}`} aria-live="polite">
                <div className="demo-topline"><span><span className="live-dot" /> Đang mô phỏng</span><span>{`0${step + 1} / 04`}</span></div>
                <div className="demo-progress"><span style={{ width: `${progress}%` }} /></div>
                <h3>{steps[step].title}</h3>
                <p>{steps[step].text}</p>
                <div className="demo-chat">
                  <div className="demo-message manager-message"><span className="mini-avatar manager-avatar">S</span><div><small>SẾP</small><p>{steps[step].manager}</p></div></div>
                  <div className="demo-message bot-message"><span className="mini-avatar bot-avatar">D</span><div><small>BOT ĐIỀU PHỐI</small><p>{steps[step].bot}</p></div></div>
                </div>
                <div className="demo-bottom"><span className="status-chip"><span className="status-dot" />{steps[step].status}</span><button className="next-button" type="button" onClick={nextStep}>Bước tiếp theo <ArrowRight size={15} /></button></div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-wrap overview-section">
          <div className="overview-intro">
            <div className="eyebrow">SẾP NHÌN MỘT LẦN LÀ BIẾT</div>
            <h2>Việc hôm nay<br />đang tới đâu?</h2>
            <p>Bot gom trạng thái của nhân viên thành một bảng gọn. Không cần gọi từng người để hỏi “xong chưa?”.</p>
            <a href="#hosting" className="text-link">Xem phần chạy ở đâu <ArrowRight size={16} /></a>
          </div>
          <div className="dashboard-mock">
            <div className="dashboard-head"><div><span className="dash-overline">TỔNG QUAN CÔNG VIỆC</span><h3>Hôm nay, 25 tháng 11</h3></div><button type="button" className="date-button">Ca chiều <ChevronRight size={14} /></button></div>
            <div className="dashboard-stats">
              <div className="dash-stat"><small>Tổng việc</small><strong>12</strong><span>Đã giao hôm nay</span></div>
              <div className="dash-stat done-stat"><small>Hoàn tất</small><strong>{step === 3 ? '9' : '7'}</strong><span>Đã báo qua bot</span></div>
              <div className="dash-stat doing-stat"><small>Đang làm</small><strong>{step > 1 ? '2' : '3'}</strong><span>Nhân viên đã nhận</span></div>
            </div>
            <div className="chart-area">
              <div className="chart-title"><b>Tiến độ trong ngày</b><span>{step === 3 ? '75%' : '58%'} hoàn tất</span></div>
              <div className="stacked-track"><span className="bar-done" style={{ width: step === 3 ? '75%' : '58%' }} /><span className="bar-doing" style={{ width: step === 3 ? '17%' : '25%' }} /></div>
              <div className="chart-legend"><span><i className="legend-dot done-color" /> Hoàn tất</span><span><i className="legend-dot doing-color" /> Đang làm</span><span><i className="legend-dot waiting-color" /> Chưa nhận</span></div>
            </div>
            <div className="team-list">
              <div className="team-row"><span className="staff-avatar staff-blue">N</span><span className="staff-name"><b>Nam Nguyễn</b><small>Soạn hàng · 4 việc</small></span><span className="staff-status status-done">3 xong</span></div>
              <div className="team-row"><span className="staff-avatar staff-green">H</span><span className="staff-name"><b>Hà Trần</b><small>Gọi khách · 3 việc</small></span><span className="staff-status status-working">Đang làm</span></div>
              <div className="team-row"><span className="staff-avatar staff-orange">M</span><span className="staff-name"><b>Minh Lê</b><small>Giao hàng · 5 việc</small></span><span className="staff-status status-waiting">Chưa nhận</span></div>
            </div>
            <div className="dashboard-foot"><CheckCheck size={15} /> Cập nhật tự động khi nhân viên báo trong Zalo</div>
          </div>
        </section>

        <section className="section-band host-band" id="hosting">
          <div className="section-wrap hosting-section">
            <div className="hosting-copy">
              <div className="eyebrow">CÂU SẾP HAY HỎI</div>
              <h2>“Nó chạy ở máy anh hay sao?”</h2>
              <p className="hosting-answer">Bot chạy trên một máy chủ luôn bật trên internet. Máy cá nhân tắt vẫn hoạt động; sếp và nhân viên chỉ cần dùng Zalo.</p>
              <div className="hosting-visual" aria-label="Luồng dữ liệu từ Zalo tới máy chủ rồi KiotViet hoặc bảng theo dõi">
                <div className="host-node"><span className="host-icon zalo-icon"><MessageCircle size={19} /></span><b>Zalo</b><small>Sếp & nhân viên</small></div>
                <ArrowRight className="host-arrow" size={18} />
                <div className="host-node server-node"><span className="host-icon"><Server size={19} /></span><b>Máy chủ</b><small>Bot luôn trực</small></div>
                <ArrowRight className="host-arrow" size={18} />
                <div className="host-node"><span className="host-icon data-icon"><Database size={19} /></span><b>Đơn & việc</b><small>KiotViet / Sheet*</small></div>
              </div>
              <p className="tiny-note">* Cách nối với KiotViet cần kiểm tra API hoặc quy trình xuất/nhập dữ liệu đang dùng.</p>
              <div className="hosting-costs" aria-label="Các khoản hosting tham khảo">
                <div><span>Trang trình bày trên GitHub Pages</span><b>0đ / tháng</b></div>
                <div><span>Máy chủ nhỏ để bot chạy liên tục</span><b>khoảng 100-300k / tháng</b></div>
                <div><span>Tên miền riêng nếu cần</span><b>khoảng 250-500k / năm</b></div>
                <div><span>Zalo OA / API</span><b>tùy gói và chính sách hiện hành</b></div>
              </div>
              <p className="tiny-note">GitHub Pages chỉ chứa trang giới thiệu; bot thật cần máy chủ và nơi lưu việc riêng.</p>
            </div>
            <div className="cost-panel">
              <div className="cost-panel-head"><span className="eyebrow">ƯỚC TÍNH ĐỂ DỄ HÌNH DUNG</span><span className="estimate-label"><CircleHelp size={13} /> Không phải báo giá</span></div>
              <h3>Bot có đáng tiền không?</h3>
              <p>Ước tính giá trị thời gian tiết kiệm mỗi tháng rồi trừ chi phí chạy bot.</p>
              <div className="estimator-fields">
                <label><span>Số nhân viên dùng bot</span><span className="field-wrap"><input type="number" min="1" max="100" value={employees} onChange={(e) => setEmployees(Number(e.target.value))} /><small>người</small></span></label>
                <label><span>Phút tiết kiệm mỗi ngày / người</span><span className="field-wrap"><input type="number" min="0" max="240" value={minutes} onChange={(e) => setMinutes(Number(e.target.value))} /><small>phút</small></span></label>
                <label><span>Giá trị 1 giờ công</span><span className="field-wrap"><input type="number" min="0" step="5000" value={hourlyValue} onChange={(e) => setHourlyValue(Number(e.target.value))} /><small>đ / giờ</small></span></label>
                <label><span>Ngày làm việc trong tháng</span><span className="field-wrap"><input type="number" min="1" max="31" value={days} onChange={(e) => setDays(Number(e.target.value))} /><small>ngày</small></span></label>
              </div>
              <div className="estimate-equation"><span>Thời gian có thể thu hồi</span><b>{formatVnd(timeValue)} / tháng</b></div>
              <div className="cost-fields">
                <label>Máy chủ bot / tháng <span><input type="number" min="0" step="50000" value={serverCost} onChange={(e) => setServerCost(Number(e.target.value))} /> đ</span></label>
                <label>Phí Zalo OA / tháng <span><input type="number" min="0" step="50000" value={oaCost} onChange={(e) => setOaCost(Number(e.target.value))} /> đ</span></label>
              </div>
              <div className={`estimate-result ${estimatedDifference < 0 ? 'negative' : ''}`} aria-live="polite"><div><small>Giá trị thời gian trừ chi phí chạy</small><b>{estimatedDifference < 0 ? 'Chưa bù chi phí' : formatVnd(estimatedDifference)}</b></div><span>/ tháng</span></div>
              <p className="cost-disclaimer">Ví dụ tham khảo, chưa tính phí phát triển, tích hợp KiotViet, tên miền và thay đổi chính sách OA. Đây là giá trị thời gian, không phải khoản tiền chắc chắn tiết kiệm được.</p>
            </div>
          </div>
        </section>

        <section className="section-wrap decision-section">
          <div className="section-heading centered-heading">
            <div className="eyebrow">CÓ THAY KIOTVIET KHÔNG?</div>
            <h2>Thêm đúng phần đang thiếu.</h2>
            <p>Đơn và tồn kho vẫn ở KiotViet. Bot lo phần giao việc và cập nhật tiến độ.</p>
          </div>
          <div className="compare-table" role="table" aria-label="So sánh KiotViet hiện tại và phương án thêm bot">
            <div className="compare-head" role="row"><span role="columnheader">Phương án</span><span role="columnheader">Dùng khi nào</span><span role="columnheader">Chi phí mới</span></div>
            <div className="compare-row" role="row"><span className="option-name" role="cell"><span className="option-icon gray-icon"><Boxes size={17} /></span><b>KiotViet hiện tại</b></span><span role="cell">Quản lý đơn hàng, tồn kho và bán hàng như đang dùng.</span><span className="option-cost" role="cell">Giữ gói hiện tại</span></div>
            <div className="compare-row recommended" role="row"><span className="option-name" role="cell"><span className="option-icon blue-icon"><MessageCircle size={17} /></span><b>KiotViet + bot Zalo</b><em>Phù hợp để thử</em></span><span role="cell">Giao việc, nhân viên xác nhận và sếp xem tiến độ.</span><span className="option-cost" role="cell">Thêm máy chủ + OA</span></div>
            <div className="compare-row" role="row"><span className="option-name" role="cell"><span className="option-icon purple-icon"><Sparkles size={17} /></span><b>Thay hẳn KiotViet</b></span><span role="cell">Chỉ tính sau khi kiểm tra đủ tính năng và dữ liệu.</span><span className="option-cost" role="cell">Chưa nên ước tính</span></div>
          </div>
          <div className="decision-note"><ShieldCheck size={18} /><p><b>Kết luận dễ hiểu:</b> Có thể giảm thời gian nhắc việc. Chưa thể nói rẻ hơn KiotViet nếu vẫn cần KiotViet và chưa biết phí OA, chi phí làm bot, mức tiết kiệm thực tế.</p></div>
        </section>

        <section className="section-wrap launch-section" id="start">
          <div className="launch-copy">
            <div className="eyebrow">BẮT ĐẦU NHỎ, ĐO HIỆU QUẢ</div>
            <h2>Thử với một nhóm<br />và một loại công việc.</h2>
            <p>Chọn luồng soạn hàng hoặc giao hàng. Chạy thử, xem nhân viên có cập nhật đều và bot có hiểu tên hàng đúng không.</p>
            <div className="launch-steps"><span><i>1</i> Chốt mẫu tin nhắn</span><span><i>2</i> Nối dữ liệu cần dùng</span><span><i>3</i> Chạy thử 1 tuần</span></div>
          </div>
          <div className="launch-photo"><img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=85" alt="Khu vực kho và các kiện hàng được chuẩn bị để giao" loading="lazy" /><div className="photo-caption"><span className="caption-icon"><Users size={16} /></span><span><b>Không bắt nhân viên học phần mềm mới</b><small>Việc và trạng thái đến ngay trong Zalo</small></span></div></div>
        </section>

        <footer className="footer section-wrap">
          <div className="footer-brand"><span className="brand-mark"><MessageCircle size={17} /></span><b>Điều phối gọn</b></div>
          <span>Bản trình bày ý tưởng · Chưa kết nối Zalo hoặc KiotViet thật</span>
          <a href="#top">Lên đầu trang ↑</a>
        </footer>
      </main>
    </>
  );
}

export default App;
