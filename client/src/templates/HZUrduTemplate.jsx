import { formatText } from '../utils/letterFormat';

export default function HZUrduTemplate({ text, addressee, footnote, date }) {
  return (
    <div className="letter-container">
      <div className="top_page">
        <div className="date_location_combined">
          <div className="date_location">اسلام آباد۔یوکے</div>
          <div className="date">HM – {date}</div>
        </div>
        <div className="title_fullname text">
          <div className="full_name text">{addressee}</div>
        </div>
        <div className="salam text">السلام علیکم ورحمۃ اللہ وبرکاتہ</div>
        <div
          className="main_text text"
          dangerouslySetInnerHTML={{ __html: formatText(text) }}
        />
        <div className="wassalam">والسلام</div>
        <div className="greeting_end">خاکسار</div>
        <div className="signature_title">خلیفۃ المسیح الخامس</div>
      </div>

      <div className="footnote-container">{footnote}</div>
    </div>
  );
}
