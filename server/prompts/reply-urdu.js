module.exports = {
  id: "reply-urdu",
  label: "PS Acknowledgement Report (Urd)",
  buildPrompt: (ocrText, note) => {
    let prompt = `<urdu_correspondence_reply_system>

<objective>
Generate formal acknowledgement replies in Urdu for official correspondence addressed to Hazrat Khalifatul Masih V (ایدہ اللہ تعالیٰ بنصرہ العزیز). All replies must strictly adhere to the established linguistic conventions, format, and vocabulary demonstrated in the reference examples.
</objective>

<reference_examples>
<example id="1">
لاہور کے تمام مراکز میں خیر و عافیت سے نماز جمعۃ کی ادائیگی کے بارہ میں آپ کی رپورٹ بحوالہ PK159 حضورانور ایدہ اللہ تعالیٰ بنصرہ العزیز کی خدمت میں موصول ہوئی۔ حضورانور نے رپورٹ ملاحظہ فرما لی ہے۔ اطالاعاً تحریر ہے۔ جزاکم اللہ احسن الجزاء
</example>

<example id="2">
مکرم بلال رسول صاحب آف جرمنی کے متعلق آپ کی رپورٹ بتاریخ 25 اگست 2023ء حضورانور ایدہ اللہ تعالیٰ بنصرہ العزیز کی خدمت میں موصول ہوئی۔ اطلاعاً تحریر ہے کہ حضورانور نے رپورٹ ملاحظہ فرمالی ہے۔ حسب ارشاد آپ کو رسیدگی سے مطلع کیا جا رہا ہے۔ جزاکم اللہ احسن الجزاء
</example>

<example id="3">
آپ کی طرف سے لجنہ اماءاللہ کینیڈا کی ماہانہ کارگزاری رپورٹ برائے ستمبر 2024ء حضورانور ایدہ اللہ تعالیٰ بنصرہ العزیز کی خدمت میں موصول ہوئی۔ حضورانور نے رپورٹ ملاحظہ فرمالی ہے۔ حسب ارشاد آپ کو رسیدگی سے مطلع کیا جا رہا ہے۔ جزاکم اللہ احسن الجزاء
</example>

<example id="4">
آپ کی طرف سے مکرم صفی اللہ صاحب کے تعارف پر مشتمل رپورٹ بتاریخ 25 جون 2023ء حضورانور ایدہ اللہ تعالیٰ بنصرہ العزیز کی خدمت میں موصول ہوئی۔ حضورانور نے اسے ملاحظہ فرمالیا ہے۔ حسب ارشاد آپ کو رسیدگی سے مطلع کیا جا رہا ہے۔ جزاکم اللہ احسن الجزاء
</example>

<example id="5">
آپ کی طرف سے شعبہ امورعامہ دفتر صدر عمومی ربوہ کی ماہانہ کارگزاری رپورٹ برائے ستمبر 2022ء حضورانور ایدہ اللہ تعالیٰ بنصرہ العزیز کی خدمت میں موصول ہوئی۔ حضورانور نے رپورٹ ملاحظہ فرمالی ہے۔ اطالاعاً تحریر ہے۔ جزاکم اللہ احسن الجزاء
</example>
</reference_examples>

<linguistic_conventions>
<subject_reference_variations>
- "کے متعلق" (regarding/about)
- "کے بارہ میں" (concerning)
- "کے حوالہ سے" (with reference to)
- "پر مشتمل" (containing/comprising)
- "کی طرف سے" (from/on behalf of)
</subject_reference_variations>

<document_terminology>
- رپورٹ (report)
- کارگزاری رپورٹ (progress/performance report)
- خط (letter)
- درخواست (request/application)
</document_terminology>

<receipt_phrases>
- "موصول ہوئی" (has been received - feminine)
- "موصول ہوا" (has been received - masculine)
</receipt_phrases>

<review_acknowledgements>
- "حضورانور نے رپورٹ ملاحظہ فرمالی ہے" (Huzoor Anwar has reviewed the report)
- "حضورانور نے اسے ملاحظہ فرمالیا ہے" (Huzoor Anwar has reviewed it)
- "حضورانور نے ملاحظہ فرمایا" (Huzoor Anwar has reviewed)
</review_acknowledgements>

<notification_phrases>
- "اطلاعاً تحریر ہے" (This is written for information)
- "حسب ارشاد آپ کو رسیدگی سے مطلع کیا جا رہا ہے" (As directed, you are being informed of the receipt)
</notification_phrases>

<closing>
- Always end with: "جزاکم اللہ احسن الجزاء"
</closing>
</linguistic_conventions>

<extraction_requirements>
From each correspondence, extract:
1. Subject matter (main topic/person/department)
2. Reference number (if any)
3. Date of correspondence (if mentioned)
4. Type of document (report/letter/request)
5. Sender's designation/department
6. Any specific locations mentioned
</extraction_requirements>

<reply_structure>
<sentence_1>
[Subject matter] [appropriate connector from subject_reference_variations] آپ کی [document type] [reference/date if available] حضورانور ایدہ اللہ تعالیٰ بنصرہ العزیز کی خدمت میں [appropriate receipt phrase based on gender]۔
</sentence_1>

<sentence_2>
[Choose appropriate review acknowledgement]۔
</sentence_2>

<sentence_3>
[Choose appropriate notification phrase]۔
</sentence_3>

<closing_phrase>
جزاکم اللہ احسن الجزاء
</closing_phrase>
</reply_structure>

<processing_instructions>
1. Read each page in the OCR text thoroughly
2. Identify all key elements listed in extraction_requirements
3. Determine the gender of the document noun for correct grammar
4. Select appropriate vocabulary variations to ensure replies don't sound repetitive
5. Maintain formal register throughout
6. Follow the exact sentence structure from the examples
</processing_instructions>

<output_format>
Present replies in plain text, without any formatting.

Ensure:
- No crucial information is skipped or missed
- Replies vary in their connector words and phrases while maintaining consistency with examples
- Gender agreement is correct (موصول ہوا/ہوئی/ہوئے)
</output_format>

<quality_checks>
Before finalizing each reply, verify:
□ Subject matter is accurately reflected
□ Gender agreement is correct throughout
□ Reference numbers/dates are included where available
□ Vocabulary variation is used across multiple replies
□ Formal register matches the examples exactly
□ The standard closing is included
□ No colloquial/informal Urdu expressions are used
</quality_checks>

<special_considerations>
- Use "مکرم" for male names and "محترمہ" for female names
- Include country/location after names where mentioned (e.g., "آف جرمنی")
- For departmental reports, include full department name
- Month names should be in Urdu script (e.g., ستمبر، اگست، جون)
- Years should include "ء" suffix
</special_considerations>

</urdu_correspondence_reply_system>

--- BEGIN OCR TEXT ---
${ocrText}
--- END OCR TEXT ---`;

    if (note)
      prompt += `\n\n--- ADDITIONAL NOTE ---\n${note}\n--- END NOTE ---`;
    return prompt;
  },
};
