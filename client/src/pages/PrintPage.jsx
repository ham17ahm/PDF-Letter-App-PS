import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import printPSCss from "../css/printPS.css?raw";
import printHZCss from "../css/printHZ.css?raw";
import printPSUrduCss from "../css/printPSUrdu.css?raw";
import printHZUrduCss from "../css/printHZUrdu.css?raw";

const cssMap = {
  "ps-english": printPSCss,
  "hz-english": printHZCss,
  "ps-urdu": printPSUrduCss,
  "hz-urdu": printHZUrduCss,
};

function formatDate() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}

/* ── PS English Template ──
   Matches: printPS.css + Print PS EJS exactly */
function PSEnglishTemplate({ text, addressee, footnote, date }) {
  return (
    <div className="letter-container">
      <div className="letter-content">
        <div className="page-head">
          <div className="letterhead-Bismillah">بسم اللّٰہ الرحمٰن الرحیم</div>
          <div className="letterhead-Bismillah">نحمدہٗ ونصلّی علیٰ رسولہ الکریم وعلیٰ عبدہٖ المیسح الموعود</div>
          <div className="letterhead-Bismillah">ھو الناصر</div>
          <div className="letterhead-english">In the Name of <b className="one">Allah</b>, most Gracious, ever Merciful</div>
          <div className="line-1"></div>
          <div className="line-2"></div>
          <div className="letterhead-english">Private Secretary to <b className="one">Hazrat Khalifatul-Masih V</b></div>
          <div className="letterhead-arabic-salutation">ایدہ اللہ تعالیٰ بنصرہ العزیز</div>
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
          <div className="main_text text" style={{ lineHeight: 1.2 }} dangerouslySetInnerHTML={{ __html: text }} />
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

/* ── HZ English Template ──
   Matches: printHZ.css + Print HZ EJS exactly */
function HZEnglishTemplate({ text, addressee, footnote, date }) {
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
        <div className="salam">اَلسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُه</div>
        <div className="main_text text" style={{ lineHeight: 1.2 }} dangerouslySetInnerHTML={{ __html: text }} />
        <div className="wassalam">Wassalam</div>
        <div className="greeting_end">Yours sincerely,</div>
        <div className="signature">MIRZA MASROOR AHMAD</div>
        <div className="signature_title">Khalifatul-Masih V</div>
      </div>

      <div className="footnote-container">{footnote}</div>
    </div>
  );
}

/* ── PS Urdu Template ──
   Matches: printUrdPS.css + Print PS Urdu EJS exactly */
function PSUrduTemplate({ text, addressee, footnote, date }) {
  return (
    <div className="letter-container">
      <div className="page_head">
        <div className="letterhead-Bismillah htc">بِسْمِ اللہِ الرَّحْمٰنِ الرَّحِیْمِ ––– نَحْمَدُہ وَنُصَلِّی عَلیٰ رَسُوْلِەِ الْکَرِیْم</div>
        <div className="letterhead-Bismillah htc">وَعَلیٰ عَبْدِہِ الْمَسِیْح الْمَوْعُوْد</div>
        <div className="letterhead-heading htc">پرائیویٹ سیکرٹری</div>
        <div className="letterhead-heading htc">حضرت خلیفۃ المسیح الخامس</div>
        <div className="letterhead-heading-small htc">ایدہ اللہ تعالیٰ بنصرہ العزیز</div>
        <div className="letterhead-heading-islamabad htc">اسلام آباد۔یوکے –– HM – {date}</div>
      </div>
      <div className="top_page">
        <div className="title_fullname text">
          <div className="full_name text">{addressee}</div>
        </div>
        <div className="salam">السلام علیکم ورحمۃ اللہ وبرکاتہ</div>
        <div className="main_text text" dangerouslySetInnerHTML={{ __html: text }} />
        <div className="wassalam">والسلام</div>
        <div className="greeting_end">خاکسار</div>
        <div className="signature_title">پرائیویٹ سیکرٹری</div>
      </div>

      <div className="footnote-container">{footnote}</div>
    </div>
  );
}

/* ── HZ Urdu Template ──
   Matches: printUrd.css + Print HZ Urdu EJS exactly */
function HZUrduTemplate({ text, addressee, footnote, date }) {
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
        <div className="main_text text" dangerouslySetInnerHTML={{ __html: text }} />
        <div className="wassalam">والسلام</div>
        <div className="greeting_end">خاکسار</div>
        <div className="signature_title">خلیفۃ المسیح الخامس</div>
      </div>

      <div className="footnote-container">{footnote}</div>
    </div>
  );
}

/* ── Main PrintPage Component ── */
export default function PrintPage() {
  const { type } = useParams();
  const [data, setData] = useState({ text: "", addressee: "", footnote: "" });

  useEffect(() => {
    const stored = localStorage.getItem("printData");
    if (stored) {
      setData(JSON.parse(stored));
    }
  }, []);

  const css = cssMap[type] || "";
  const date = formatDate();
  const props = { text: data.text, addressee: data.addressee, footnote: data.footnote, date };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <button className="no-print" onClick={() => window.print()} style={{
        position: "fixed", top: 10, right: 10, zIndex: 999,
        padding: "8px 20px", fontSize: "14px", cursor: "pointer",
        background: "#4361ee", color: "#fff", border: "none", borderRadius: "4px",
      }}>
        Print
      </button>

      {type === "ps-english" && <PSEnglishTemplate {...props} />}
      {type === "hz-english" && <HZEnglishTemplate {...props} />}
      {type === "ps-urdu" && <PSUrduTemplate {...props} />}
      {type === "hz-urdu" && <HZUrduTemplate {...props} />}
    </>
  );
}
