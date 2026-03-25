import { formatText } from '../utils/letterFormat';

export default function HZEnglishTemplate({ text, addressee, footnote, date }) {
  return (
    <div className="letter-container">
      <div className="letter-content">
        <div className="date_location_combined">
          <div className="date_location">Islamabad, UK</div>
          <div className="date">HM – {date}</div>
        </div>
        <div className="title_fullname text">
          <div className="full_name text">{addressee}</div>
        </div>
        <div className="salam">
          اَلسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُه
        </div>
        <div
          className="main_text text"
          style={{ lineHeight: 1.2 }}
          dangerouslySetInnerHTML={{ __html: formatText(text) }}
        />
        <div className="wassalam">Wassalam</div>
        <div className="greeting_end">Yours sincerely,</div>
        <div className="signature">MIRZA MASROOR AHMAD</div>
        <div className="signature_title">Khalifatul-Masih V</div>
      </div>

      <div className="footnote-container">{footnote}</div>
    </div>
  );
}
