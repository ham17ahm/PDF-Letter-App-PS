module.exports = {
  id: "for-report-urdu",
  label: "For Report (Urdu)",
  buildPrompt: (ocrText, note) => {
    let prompt = `{
  "task": "formal_letter_generation",
  "language": "Urdu",
  "script": "Nastaliq (Urdu)",
  "objective": "Write a formal letter in the Urdu language and script for a report given the specified format by extracting details and information from a raw letter provided",
  "letter_formats": {
    "format_1": {
      "template": "مکرم/مکرمہ [خط لکھنے والے کا نام] صاحب/صاحبہ ([Add: Complete Address and Identification Information]) نے حضورانور ایدہ اللہ تعالیٰ بنصرہ العزیز کی خدمت میں لکھا ہے کہ ۔۔۔ [مختصر خلاصہ خط - first-person summary]۔\\nحضورانور نے ان کے خط پر سوالیہ نشان ''؟'' درج فرما کر آپ سے رپورٹ منگوانے کی ہدایت فرمائی ہے۔ حسب ارشاد مہربانی فرما کر اس بارہ میں اپنی رپورٹ سے حضورانور کو مطلع فرمائیں۔ جزاکم اللہ احسن الجزاء",
      "usage": "Use when the letter is a general complaint or issue without a specific relational topic heading",
      "components": {
        "opening": "مکرم/مکرمہ [نام] صاحب/صاحبہ ([پتہ اور تعارفی معلومات]) نے حضورانور ایدہ اللہ تعالیٰ بنصرہ العزیز کی خدمت میں لکھا ہے کہ",
        "summary_section": "[مختصر خلاصہ - first-person perspective]",
        "closing": "حضورانور نے ان کے خط پر سوالیہ نشان ''؟'' درج فرما کر آپ سے رپورٹ منگوانے کی ہدایت فرمائی ہے۔ حسب ارشاد مہربانی فرما کر اس بارہ میں اپنی رپورٹ سے حضورانور کو مطلع فرمائیں۔ جزاکم اللہ احسن الجزاء"
      }
    },
    "format_2": {
      "template": "مکرم/مکرمہ [خط لکھنے والے کا نام] صاحب/صاحبہ ([Add: Complete Address and Identification Information]) نے حضورانور ایدہ اللہ تعالیٰ بنصرہ العزیز کی خدمت میں اپنے/اپنی ۔۔۔ کے بارہ میں لکھا ہے کہ ۔۔۔ [مختصر خلاصہ خط - first-person summary]۔\\nان کے خط پر حضورانور نے آپ سے رپورٹ منگوانے کی ہدایت فرمائی ہے۔ حسب ارشاد مہربانی فرما کر اس بارہ میں اپنی رپورٹ سے حضورانور کو مطلع فرمائیں۔ جزاکم اللہ احسن الجزاء",
      "usage": "Use when the letter concerns a specific relational topic (e.g. a family matter, a dispute, a specific affair) that can be named with 'اپنے/اپنی ... کے بارہ میں'",
      "components": {
        "opening": "مکرم/مکرمہ [نام] صاحب/صاحبہ ([پتہ اور تعارفی معلومات]) نے حضورانور ایدہ اللہ تعالیٰ بنصرہ العزیز کی خدمت میں اپنے/اپنی [topic] کے بارہ میں لکھا ہے کہ",
        "summary_section": "[مختصر خلاصہ - first-person perspective]",
        "closing": "ان کے خط پر حضورانور نے آپ سے رپورٹ منگوانے کی ہدایت فرمائی ہے۔ حسب ارشاد مہربانی فرما کر اس بارہ میں اپنی رپورٹ سے حضورانور کو مطلع فرمائیں۔ جزاکم اللہ احسن الجزاء"
      }
    }
  },
  "extraction_requirements": {
    "author_name": {
      "description": "Extract full name of letter author",
      "placement": "Replace [نام] in template; use مکرم for male, مکرمہ for female; use صاحب for male, صاحبہ for female"
    },
    "author_details": {
      "description": "Extract complete address, location, and identifying details",
      "format": "Add: [full address with city, country or region]",
      "placement": "Within parentheses after author name"
    },
    "topic_heading": {
      "description": "For Format 2 only: identify the specific subject matter (e.g. فضائی معاملہ، عائلی تنازعہ)",
      "placement": "After اپنے/اپنی and before کے بارہ میں"
    },
    "summary_content": {
      "description": "Vercy concise and comprehensive executive summary of letter content written in Urdu",
      "requirements": {
        "length": "Few sentences comprehensively",
        "perspective": "First person as if the author is writing themselves",
        "focus": "Main complaint, issue(s), or subject matter discussed by the author",
        "style": "Formal, executive summary approach in natural Urdu prose",
        "language": "Urdu script only"
      }
    }
  },
  "processing_instructions": {
    "step_1": "Read and analyse the raw letter thoroughly",
    "step_2": "Determine author gender (male/female) and select مکرم/صاحب or مکرمہ/صاحبہ accordingly",
    "step_3": "Extract author full name and complete address/identifying details",
    "step_4": "Identify main complaints, issues, or topic of the letter",
    "step_5": "Choose Format 1 or Format 2: use Format 2 if a specific topic heading fits naturally; otherwise use Format 1",
    "step_6": "Write a concise first-person summary in Urdu focusing on the main issues",
    "step_7": "Assemble the complete formal letter using the selected template"
  },
  "content_focus": {
    "primary": "Complaints, issues, or main subject matter discussed by the author",
    "secondary": "Relevant context supporting the main points",
    "perspective": "First-person narrative as if written by the original author"
  },
  "formatting_rules": {
    "summary_placement": "Inline within the opening paragraph, following 'لکھا ہے کہ'",
    "closing_paragraph": "Always on a new line after the summary paragraph",
    "formality_level": "Formal administrative Urdu correspondence",
    "script": "Urdu Nastaliq — do not mix in English except where the source letter contains proper nouns or addresses in English"
  },
  "output_requirements": {
    "format": "Complete formal Urdu letter ready for use",
    "completeness": "All template fields filled with extracted information",
    "accuracy": "Faithful representation of original letter content",
    "tone": "Formal, respectful, administrative Urdu"
  },
  "examples": [
    {
      "label": "Example 1 - Format 2 (family/marital matter)",
      "output": "مکرمہ عینی محمود صاحبہ (Add: Dieselstrasse 22, 68623 Lapertheim) نے حضورانور ایدہ اللہ تعالیٰ بنصرہ العزیز کی خدمت میں اپنے فضائی معاملہ کے بارہ میں لکھا ہے کہ 10 فروری کو میری طلاق مکمل ہوجانی تھی لیکن قاضی صاحب نے مدت کو ایک ماہ کےلئے مزید بڑھا دیا ہے۔ میں طلاق نہیں چاہتی بلکہ مصالحت کرکے اپنے میاں کے ساتھ رہنا چاہتی ہوں اور یقین کرتی ہوں اگر حضورانور کی طرف سے میرے میاں کو اس بارہ میں کوئی ہدایت مل جائے تو وہ بھی ضرور اس طرف توجہ کریں گے۔\\nحضورانور نے ان کے خط پر سوالیہ نشان ''؟'' درج فرما کر آپ سے رپورٹ منگوانے کی ہدایت فرمائی ہے۔ حسب ارشاد براہ مہربانی اس بارہ میں اپنی رپورٹ سے حضورانور کو مطلع فرمائیں۔ جزاکم اللہ احسن الجزاء"
    },
    {
      "label": "Example 2 - Format 1 (general complaint/suggestion)",
      "output": "مکرمہ Sarah Ward صاحبہ (Add: Kent Ward, Surbiton, KT6 7SY79) نے حضورانور ایدہ اللہ تعالیٰ بنصرہ العزیز کی خدمت میں لکھا ہے کہ جماعت میں ایک بھاری تعداد ایسے افراد اور خاص طور پر لجنہ ممبرات کی ہے جو درس و تدریس کے شعبہ میں مہارت رکھتے ہیں۔ پہلے ہماری Teachers Association کے مختلف پروگرامز منعقد ہوا کرتے تھے لیکن 2011 سے کوئی فعال کام نہیں ہوا۔ اگر باقاعدہ منصوبہ بندی کے ساتھ ایک تفصیلی پلان بنایا جائے تو یقیناً اس کے ذریعہ جماعت کے بیشتر کاموں میں بہتری لائی جا سکتی جس سے احباب جماعت کو بھی فائدہ ہو گا۔\\nاس پر حضورانور نے آپ سے رپورٹ منگوانے کی ہدایت فرمائی ہے۔ حسب ارشاد براہ مہربانی اس بارہ میں اپنی رپورٹ سے حضورانور کو مطلع فرمائیں۔ جزاکم اللہ خیر الجزاء"
    },
    {
      "label": "Example 3 - Format 1 (personal distress/isolation)",
      "output": "مکرمہ عطیہ شیخ صاحبہ (Add: 3373 Cutler Cres SW Edmonton, AB T6W 2N4 Canada) نے حضورانور ایدہ اللہ تعالیٰ بنصرہ العزیز کی خدمت میں لکھا ہے کہ جب سے میں Edmonton آئی ہوں ڈیپریشن کا شکار ہوں۔ گزشتہ سالوں میں یہاں کی بعض لجنات نے میرے خلاف نفرت پھیلائی ہے جس کی وجہ سے لوگوں کا میرے ساتھ سلوک بدل گیا ہے۔ حتیٰ کہ میرے ساتھ صحیح طرح سلام بھی نہیں کرتے۔ میرا Trust کئی دفعہ ٹوٹا ہے۔ میں نے اپنے آپ کو مکمل طور پر Isolate کر لیا ہے۔ کوئی حقیقی دوست نہیں ہے اور اپنے میاں سے میں آسانی سے بات نہیں کرسکتی۔ میں تنہا محسوس کرتی ہوں۔ جماعتی کام کےلئے جوش کھو بیٹھی ہوں۔ ایمان کی کمی کی وجہ سے خود اعتمادی کم ہے اور لوگوں کی باتوں کا اثر ہو رہا ہے۔ ڈاکٹر نے مجھے Depression اور Anxiety کی دوائی بھی دی ہے۔\\nحضورانور نے اس پر آپ سے رپورٹ منگوانے کی ہدایت فرمائی ہے۔ حسب ارشاد براہ مہربانی اس بارہ میں اپنی رپورٹ سے حضورانور کو مطلع فرمائیں۔ جزاکم اللہ احسن الجزاء"
    },
    {
      "label": "Example 4 - Format 2 (family dispute/appeal)",
      "output": "مکرمہ امۃالمصور صاحبہ (Add: 68 Park Ave, Keene, NH 03431, USA) نے حضورانور ایدہ اللہ تعالیٰ بنصرہ العزیز کی خدمت میں اپنے عائلی تنازعہ کے حوالہ سے لکھا ہے کہ میں دارالقضاء کے فیصلہ کے خلاف اپیل کرنا چاہتی ہوں۔ میں اپنے والدین کے پاس رہتی ہوں۔ ہمارے بیٹے کی عمر 4 سال ہے۔ سابقہ خاوند نہ تو بچہ کا خرچ دیتے ہیں اور نہ ہی اپنا رویہ بدلتے ہیں۔ گالی گلوچ، دھمکی آمیز اور جارحانہ رویہ رکھتے ہیں جبکہ مجھے مجبور کیا جارہا ہے کہ میں بچے کو باپ سے ملواؤں۔\\nان کے خط پر حضورانور نے ''؟'' سوالیہ نشان درج فرما کر آپ سے رپورٹ منگوانے کی ہدایت فرمائی ہے۔ حسب ارشاد مہربانی فرما کر اس بارہ میں اپنی رپورٹ سے حضورانور کو مطلع فرمائیں۔ جزاکم اللہ احسن الجزاء"
    }
  ]
}

--- BEGIN OCR TEXT ---
${ocrText}
--- END OCR TEXT ---`;

    if (note)
      prompt += `\n\n--- ADDITIONAL NOTE ---\n${note}\n--- END NOTE ---`;
    return prompt;
  },
};
