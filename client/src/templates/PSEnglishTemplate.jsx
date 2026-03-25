import { formatText } from '../utils/letterFormat';

export default function PSEnglishTemplate({ text, addressee, footnote, date }) {
  return (
    <div className="letter-container">
      <div className="letter-content">
        <div className="page-head">
          <div className="letterhead-Bismillah">بسم اللّٰہ الرحمٰن الرحیم</div>
          <div className="letterhead-Bismillah">
            نحمدہٗ ونصلّی علیٰ رسولہ الکریم وعلیٰ عبدہٖ المیسح الموعود
          </div>
          <div className="letterhead-Bismillah">ھو الناصر</div>
          <div className="letterhead-english">
            In the Name of <b className="one">Allah</b>, most Gracious, ever Merciful
          </div>
          <div className="line-1"></div>
          <div className="line-2"></div>
          <div className="letterhead-english">
            Private Secretary to <b className="one">Hazrat Khalifatul-Masih V</b>
          </div>
          <div className="letterhead-arabic-salutation">
            ایدہ اللہ تعالیٰ بنصرہ العزیز
          </div>
        </div>

        <div className="letter-body">
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
          <div className="greeting_end">Yours faithfully,</div>
          <div className="signature">Munir Ahmad Javed</div>
          <div className="signature_title">Private Secretary</div>
        </div>
      </div>

      <div className="footnote-container">{footnote}</div>
    </div>
  );
}
