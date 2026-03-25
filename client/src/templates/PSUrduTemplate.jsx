import { formatText } from '../utils/letterFormat';

export default function PSUrduTemplate({ text, addressee, footnote, date }) {
  return (
    <div className="letter-container">
      <div className="page_head">
        <div className="letterhead-Bismillah htc">
          بِسْمِ اللہِ الرَّحْمٰنِ الرَّحِیْمِ ––– نَحْمَدُہ وَنُصَلِّی عَلیٰ رَسُوْلِەِ الْکَرِیْم
        </div>
        <div className="letterhead-Bismillah htc">
          وَعَلیٰ عَبْدِہِ الْمَسِیْح الْمَوْعُوْد
        </div>
        <div className="letterhead-heading htc">پرائیویٹ سیکرٹری</div>
        <div className="letterhead-heading htc">حضرت خلیفۃ المسیح الخامس</div>
        <div className="letterhead-heading-small htc">
          ایدہ اللہ تعالیٰ بنصرہ العزیز
        </div>
        <div className="letterhead-heading-islamabad htc">
          اسلام آباد۔یوکے –– HM – {date}
        </div>
      </div>
      <div className="top_page">
        <div className="title_fullname text">
          <div className="full_name text">{addressee}</div>
        </div>
        <div className="salam">السلام علیکم ورحمۃ اللہ وبرکاتہ</div>
        <div
          className="main_text text"
          dangerouslySetInnerHTML={{ __html: formatText(text) }}
        />
        <div className="wassalam">والسلام</div>
        <div className="greeting_end">خاکسار</div>
        <div className="signature_title">پرائیویٹ سیکرٹری</div>
      </div>

      <div className="footnote-container">{footnote}</div>
    </div>
  );
}
