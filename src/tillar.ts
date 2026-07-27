// ================== TILLAR ==================
// Ilovaning barcha matnlari shu fayl orqali o'tadi.
// KALIT = o'zbekcha lotin matnning O'ZI. Tarjima topilmasa o'zbekchasi ko'rinadi —
// shuning uchun ilova hech qachon bo'sh yoki buzuq matn ko'rsatmaydi.

export type Lang = "uz" | "uzk" | "en" | "ar";

export const TILLAR: { id: Lang; nom: string; izoh: string; belgi: string; rang: string; grad: string; holat: "tayyor" | "sinov" | "tez" }[] = [
  { id: "uz", nom: "O'zbek tili", izoh: "Lotin", belgi: "O'", rang: "#3B7BC4", grad: "linear-gradient(160deg,#4A8AD4,#1E4E86)", holat: "tayyor" },
  { id: "uzk", nom: "Ўзбек тили", izoh: "Кирилл", belgi: "ў", rang: "#C0453C", grad: "linear-gradient(160deg,#CF574C,#8E2C27)", holat: "tayyor" },
  { id: "en", nom: "English language", izoh: "Sinov · qisman tarjima", belgi: "Aa", rang: "#D98A32", grad: "linear-gradient(160deg,#E2A03F,#B4611F)", holat: "sinov" },
  { id: "ar", nom: "اللغة العربية", izoh: "Sinov · o'ngdan chapga", belgi: "ض", rang: "#3E9E6E", grad: "linear-gradient(160deg,#46AC79,#26714E)", holat: "sinov" },
];

// ---------- LUG'AT ----------
// Kirill uchun yozuv KERAK EMAS — u avtomatik o'giriladi (pastdagi toKiril).
// English va arabcha shu yerga yoziladi:  "Bugun": { en: "Today", ar: "اليوم" },
export const LUGAT: Record<string, Partial<Record<Lang, string>>> = {
  // ===== 1-BOSQICH: interfeys so'zlari (2026-07-27) =====
  // Diniy atamalarda ingliz tilidagi qabul qilingan islomiy yozuv ishlatildi
  // (Tahajjud, Dhikr, Nafl, rak'ah, khatm, juz') — tarjima emas, transliteratsiya.

  // --- Kun va vaqt ---
  "Bugun": { en: "Today" },
  "Ertaga": { en: "Tomorrow" },
  "Bugundan": { en: "From today" },
  "Ertadan": { en: "From tomorrow" },
  "Bir haftadan": { en: "In a week" },
  "Hozir": { en: "Now" },
  "Shu hafta": { en: "This week" },
  "Hafta": { en: "Week" },
  "Haftalik": { en: "Weekly" },
  "Oylik": { en: "Monthly" },
  "Oylik yakun": { en: "Monthly summary" },
  "Kunlik": { en: "Daily" },
  "Kundalik": { en: "Daily" },
  "kundalik": { en: "daily" },
  "Har kuni": { en: "Every day" },
  "kun": { en: "day" },
  "hafta": { en: "week" },
  "yil": { en: "year" },
  "Yil": { en: "Year" },
  "soat": { en: "hour" },
  "daqiqa": { en: "minute" },
  "daq": { en: "min" },
  "s": { en: "h" },
  "gacha": { en: "until" },
  "dan": { en: "from" },
  "keyingi": { en: "next" },
  "bugun tugadi": { en: "finished today" },
  "shu davrda": { en: "in this period" },
  "kun surilgan": { en: "days postponed" },
  "Hijriy sana": { en: "Hijri date" },
  "Sana tanlang": { en: "Select a date" },
  "Vaqt tanlang": { en: "Select a time" },
  "Muddatsiz": { en: "No deadline" },
  "Vaqtli": { en: "Timed" },
  "vaqt berish": { en: "set time" },
  "vaqt yo'q": { en: "no time" },
  "Qachongacha?": { en: "Until when?" },
  "Necha soat?": { en: "How many hours?" },

  // --- Ibodat ---
  "Ibodat": { en: "Worship" },
  "Ibodatlar": { en: "Worship" },
  "5 vaqt namoz": { en: "5 daily prayers" },
  "Tahajjud": { en: "Tahajjud" },
  "Nafl:": { en: "Nafl:" },
  "rakaat": { en: "rak'ah" },
  "Zikrlar": { en: "Dhikr" },
  "Qur'on xatmi": { en: "Qur'an khatm" },
  "Xatm tugadi:": { en: "Khatm completed:" },
  "yangi xatm": { en: "new khatm" },
  "Pora bilan": { en: "By juz'" },
  "Masjid:": { en: "Mosque:" },
  "Masjidda": { en: "At the mosque" },

  // --- Belgilash va holat ---
  "Qildim": { en: "Done" },
  "✓ Qildim": { en: "✓ Done" },
  "✗ Qilmadim": { en: "✗ Not done" },
  "Sababli": { en: "Excused" },
  "Sababli:": { en: "Excused:" },
  "ta sababli": { en: "excused" },
  "Bajarildi": { en: "Completed" },
  "Bajarildi:": { en: "Completed:" },
  "Bajarilmadi": { en: "Not completed" },
  "Bajarilmadi:": { en: "Not completed:" },
  "Belgilandi": { en: "Marked" },
  "Tugatdim": { en: "Finished" },
  "Tayyor": { en: "Ready" },
  "Saqlandi ✓": { en: "Saved ✓" },
  "to'xtatilgan": { en: "stopped" },
  "o'zgarishsiz": { en: "unchanged" },
  "uxlandi": { en: "slept" },
  "uxlandi.": { en: "slept." },
  "uxlayman": { en: "I will sleep" },
  "ta ish qoldi": { en: "tasks left" },

  // --- Tugmalar ---
  "OK": { en: "OK" },
  "Ha": { en: "Yes" },
  "Ha, istayman": { en: "Yes, I want to" },
  "Ha, o'taman": { en: "Yes, I will" },
  "Bekor": { en: "Cancel" },
  "Saqlash": { en: "Save" },
  "Qo'shish": { en: "Add" },
  "O'chirish": { en: "Delete" },
  "O'zgartirish": { en: "Change" },
  "tahrirlash": { en: "edit" },
  "Davom": { en: "Continue" },
  "Davom etish": { en: "Continue" },
  "Boshlash": { en: "Start" },
  "Boshlanish": { en: "Start" },
  "Tugash": { en: "End" },
  "To'xtatish": { en: "Stop" },
  "to'xtatish": { en: "stop" },
  "Pauza": { en: "Pause" },
  "Pauzada": { en: "Paused" },
  "Tushunarli": { en: "Got it" },
  "Yaxshi!": { en: "Great!" },
  "Arxivlash": { en: "Archive" },
  "Tartiblash": { en: "Sort" },
  "Sozlash": { en: "Configure" },

  // --- Sahifalar va bo'limlar ---
  "Taqvim": { en: "Calendar" },
  "Statistika": { en: "Statistics" },
  "Sozlamalar": { en: "Settings" },
  "Vazifalar": { en: "Tasks" },
  "Vazifa": { en: "Task" },
  "Vazifa nomi": { en: "Task name" },
  "Vazifa turi": { en: "Task type" },
  "Yangi vazifa": { en: "New task" },
  "Yangi maqsad": { en: "New goal" },
  "Maqsad": { en: "Goal" },
  "Oliy maqsad": { en: "Supreme Goal" },
  "oliy maqsad": { en: "supreme goal" },
  "Reja": { en: "Plan" },
  "Reja yo'q": { en: "No plan" },
  "Yordam": { en: "Help" },
  "Til": { en: "Language" },
  "Ilova tili": { en: "App language" },
  "Ko'rinish": { en: "Appearance" },
  "Ma'lumotlar": { en: "Data" },
  "Xulosalarim": { en: "My notes" },
  "Eslatma": { en: "Reminder" },
  "Uyqu": { en: "Sleep" },
  "Uyqu rejasi": { en: "Sleep schedule" },
  "Uxlash vaqti": { en: "Bedtime" },
  "Turish vaqti": { en: "Wake-up time" },
  "Kun tartibi": { en: "Daily routine" },
  "Pomodoro": { en: "Pomodoro" },
  "Fokus rejimi": { en: "Focus mode" },
  "Focus vaqti": { en: "Focus time" },
  "Ochiq rejim": { en: "Open mode" },
  "Ish vaqti": { en: "Work time" },
  "Ish:": { en: "Work:" },
  "Dam olish": { en: "Rest" },
  "Dam kuni": { en: "Rest day" },
  "Dam olishsiz": { en: "No rest day" },
  "Dam tugadi": { en: "Rest over" },
  "daq · Dam:": { en: "min · Rest:" },
  "daq · Sikl:": { en: "min · Cycle:" },

  // --- O'lchov va sanoq ---
  "O'lchov": { en: "Metric" },
  "Turkum": { en: "Category" },
  // Vazifa kartasida `truncate` qutisida turadi — uzun matn uch nuqta bilan kesiladi
  "Turkumsiz": { en: "No category" },
  "Papka nomi": { en: "Folder name" },
  "Turi": { en: "Type" },
  "Turi:": { en: "Type:" },
  "Jami": { en: "Total" },
  "Jami vaqt": { en: "Total time" },
  "Umumiy vaqt": { en: "Overall time" },
  "umumiy": { en: "overall" },
  "Jami nechta?": { en: "How many in total?" },
  "Jarayon:": { en: "Progress:" },
  "O'rtacha:": { en: "Average:" },
  "Tanlangan:": { en: "Selected:" },
  "Sanaladigan": { en: "Countable" },
  "SANALADIGAN": { en: "COUNTABLE" },
  "qo'lda (+1)": { en: "manual (+1)" },
  "marta": { en: "times" },
  "Ziyoda": { en: "Extra" },
  "kg": { en: "kg" },
  // O'zbekcha sanoq yuklamasi — inglizchada yozilmaydi ("5 ta" -> "5")
  "ta": { en: "" },

  // --- Ko'rinish va joylashuv ---
  "Tepada": { en: "Top" },
  "O'rtada": { en: "Middle" },
  "Pastda": { en: "Bottom" },
  "Pastdagi": { en: "The one below" },
  "Tonggi": { en: "Light" },
  "Tungi": { en: "Dark" },
  "Ochiq fon": { en: "Light background" },
  "To'q fon": { en: "Dark background" },

  // --- Qolganlari ---
  "Erkak": { en: "Male" },
  "Ayol": { en: "Female" },
  "Kuchli tomon": { en: "Strength" },
  "(ixtiyoriy)": { en: "(optional)" },
  "Fikringiz...": { en: "Your thoughts..." },
  "Masalan: 10": { en: "For example: 10" },
  "Masalan: 30": { en: "For example: 30" },
  "tez orada": { en: "coming soon" },
  "HALOL BO'L!": { en: "BE HALAL!" },
  "Shu sabab ey": { en: "So, O" },
  "do'stim": { en: "my friend" },
  "shu nom": { en: "this name" },
};

// Avtomatik kirill o'girish xato chiqqan matnlar (istisno):  "Ma'no": "Маъно"
export const KIRIL_ISTISNO: Record<string, string> = {};

// ---------- LOTIN → KIRILL ----------
const KIR_HARF: Record<string, string> = { a: "а", b: "б", c: "ц", d: "д", e: "е", f: "ф", g: "г", h: "ҳ", i: "и", j: "ж", k: "к", l: "л", m: "м", n: "н", o: "о", p: "п", q: "қ", r: "р", s: "с", t: "т", u: "у", v: "в", x: "х", y: "й", z: "з" };

// QOIDA TARTIBI MUHIM: so'z boshidagi E → so'ng o'/g' → so'ng tutuq → so'ng qo'sh harflar.
// Shu tartib "yo'q → йўқ", "ma'no → маъно", "sherik → шерик" ni to'g'ri chiqaradi.
const KIR_QOIDA: [RegExp, string][] = [
  [/\bE/g, "Э"], [/\be/g, "э"],
  [/O['’ʻ`]/g, "Ў"], [/o['’ʻ`]/g, "ў"],
  [/G['’ʻ`]/g, "Ғ"], [/g['’ʻ`]/g, "ғ"],
  [/([a-zA-Z])['’ʻ]([a-zA-Z])/g, "$1ъ$2"],
  [/SH/g, "Ш"], [/Sh/g, "Ш"], [/sh/g, "ш"],
  [/CH/g, "Ч"], [/Ch/g, "Ч"], [/ch/g, "ч"],
  [/YO/g, "Ё"], [/Yo/g, "Ё"], [/yo/g, "ё"],
  [/YU/g, "Ю"], [/Yu/g, "Ю"], [/yu/g, "ю"],
  [/YA/g, "Я"], [/Ya/g, "Я"], [/ya/g, "я"],
  [/YE/g, "Е"], [/Ye/g, "Е"], [/ye/g, "е"],
];

const kirKesh = new Map<string, string>();

export function toKiril(s: string): string {
  const bor = kirKesh.get(s);
  if (bor !== undefined) return bor;
  // Lotin qisqartmalar (PDF, OK, JSON...) o'girilmaydi — vaqtincha chetga olinadi
  const keep: string[] = [];
  let r = s.replace(/(^|[^A-Za-z])([A-Z]{2,6})(?![a-z])/g, (_m, p, ab) => { keep.push(ab); return p + "@@" + (keep.length - 1) + "@@"; });
  for (const [re, to] of KIR_QOIDA) r = r.replace(re, to);
  r = r.replace(/[A-Za-z]/g, ch => {
    const low = ch.toLowerCase();
    const k = KIR_HARF[low];
    if (!k) return ch;
    return ch === low ? k : k.toUpperCase();
  });
  r = r.replace(/@@([0-9]+)@@/g, (_m, i) => keep[Number(i)]);
  kirKesh.set(s, r);
  return r;
}

// ---------- JORIY TIL ----------
let CUR: Lang = "uz";
try { const _l = localStorage.getItem("om3_lang"); if (_l) CUR = JSON.parse(_l) as Lang; } catch { /* e'tiborsiz */ }

// App har chizilganda chaqiradi — shu bilan butun ekran to'g'ri tilda ko'rinadi
export function setCur(l: Lang) { CUR = l; }
export function getCur(): Lang { return CUR; }

// ---------- TARJIMA ----------
export function tr(s: string): string {
  if (!s || CUR === "uz") return s;
  const v = LUGAT[s] && LUGAT[s][CUR];
  // ATAYLAB BO'SH tarjima ham hisobga olinadi: o'zbekcha "ta", "dona" kabi sanoq
  // yuklamalari inglizchada umuman yozilmaydi ("5 ta" -> "5"). Shuning uchun
  // tekshiruv `if (v)` emas, `!== undefined` — aks holda bo'sh qiymat e'tiborsiz qolardi.
  if (v !== undefined) return v;
  if (CUR === "uzk") return KIRIL_ISTISNO[s] || toKiril(s);
  return s;
}

// Ichida son/nom bo'lgan matnlar uchun:  tf("{n} kun qoldi", { n: 5 })
export function tf(s: string, vals: Record<string, string | number>): string {
  let r = tr(s);
  for (const k in vals) r = r.split("{" + k + "}").join(String(vals[k]));
  return r;
}
