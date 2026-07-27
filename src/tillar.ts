// ================== TILLAR ==================
// Ilovaning barcha matnlari shu fayl orqali o'tadi.
// KALIT = o'zbekcha lotin matnning O'ZI. Tarjima topilmasa o'zbekchasi ko'rinadi —
// shuning uchun ilova hech qachon bo'sh yoki buzuq matn ko'rsatmaydi.

export type Lang = "uz" | "uzk" | "en" | "ar";

export const TILLAR: { id: Lang; nom: string; izoh: string; belgi: string; rang: string; grad: string; holat: "tayyor" | "sinov" | "tez" }[] = [
  { id: "uz", nom: "O'zbek tili", izoh: "Lotin", belgi: "O'", rang: "#3B7BC4", grad: "linear-gradient(160deg,#4A8AD4,#1E4E86)", holat: "tayyor" },
  { id: "uzk", nom: "Ўзбек тили", izoh: "Кирилл", belgi: "ў", rang: "#C0453C", grad: "linear-gradient(160deg,#CF574C,#8E2C27)", holat: "tayyor" },
  { id: "en", nom: "English language", izoh: "tez orada", belgi: "Aa", rang: "#D98A32", grad: "linear-gradient(160deg,#E2A03F,#B4611F)", holat: "tez" },
  { id: "ar", nom: "اللغة العربية", izoh: "Sinov · o'ngdan chapga", belgi: "ض", rang: "#3E9E6E", grad: "linear-gradient(160deg,#46AC79,#26714E)", holat: "sinov" },
];

// ---------- LUG'AT ----------
// Kirill uchun yozuv KERAK EMAS — u avtomatik o'giriladi (pastdagi toKiril).
// English va arabcha shu yerga yoziladi:  "Bugun": { en: "Today", ar: "اليوم" },
export const LUGAT: Record<string, Partial<Record<Lang, string>>> = {};

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
  if (v) return v;
  if (CUR === "uzk") return KIRIL_ISTISNO[s] || toKiril(s);
  return s;
}

// Ichida son/nom bo'lgan matnlar uchun:  tf("{n} kun qoldi", { n: 5 })
export function tf(s: string, vals: Record<string, string | number>): string {
  let r = tr(s);
  for (const k in vals) r = r.split("{" + k + "}").join(String(vals[k]));
  return r;
}
