import React, { useEffect, useRef, useState } from "react";
import { Lang, TILLAR, tr, tf, setCur } from "./tillar";

// ================== TURLAR ==================
interface Folder { id: string; name: string; importance: number; scope: "daily" | "oliy"; }
interface Pause { from: string; to: string; }
interface TaskNote { date: string; text: string; }
interface Task {
  id: string; name: string; type: string; scope: "daily" | "oliy"; folderId: string | null;
  minutes: number; startDate: string; endDate: string | null; days: number[];
  remTime: string | null; remText: string;
  pauses: Pause[]; abandonedAt: string | null; archivedAt: string | null;
  countsHours: boolean; isSleep?: boolean; hadAbandon?: boolean;
  plannedDays: number | null; notes: TaskNote[]; completedAt: string | null;
  createdAt?: string; // vazifa yaratilgan sana — o'tmish shu sanadan oldin hisoblanmaydi (statistika muzlatiladi)
  order?: number; // Bugun ro'yxatidagi tartib (kichik — yuqorida; "Keyingi vazifa" birinchisi)
  bookId?: string;
  kind: "time" | "count"; countTarget?: number;
  schedFrom?: string | null; schedTo?: string | null;
}
// v5 belgilash modeli: binary o'rniga holatli
interface MarkV5 { st?: "full" | "extra" | "excused" | "missed"; extraMin?: number; excuseScore?: number; creditedMin?: number; }
type Logs = Record<string, Record<string, MarkV5>>;
interface Extra { id: string; date: string; name: string; minutes: number; groupId: string; counts: boolean; type?: string; taskId?: string | null; }
interface Weight { date: string; kg: number; }
interface Metric { id: string; name: string; target: number; kind: "type" | "manual"; typeName: string | null; }
interface SleepCfg { kind: "hours" | "range"; hours: number; from: string; to: string; }
interface Plan {
  name: string; goal: string; start: string; years: number;
  restDay: number | null; weekStart: number;
  weightOn: boolean; weightTarget: number; weightDay: number;
  metrics: Metric[];
}
interface Settings { hijriOffset: number; remindersOn: boolean; reminderTimes: string[]; dark: boolean; lastBackup: string | null; }
interface PomoCfg { work: number; rest: number; cycles?: number; }
interface PomoState { phase: "work" | "rest"; endsAt: number; pausedLeft: number | null; mode?: "focus" | "open"; }
interface Quote { id: string; text: string; pos: "top" | "mid" | "bottom"; }
interface KhatmCfg { start: string; end: string; mode: "vaqt" | "pora"; daily: number; }
interface IbadatDay { zikr: boolean[]; pr: Record<string, boolean[]>; masjid: Record<string, boolean>; tahajjud: number; nafl: number; khatm: boolean; }
type IbadatLog = Record<string, IbadatDay>;
interface DayMode { mode: "list" | "sched"; lockedUntil: string; }
type CountLog = Record<string, Record<string, number>>;
type Gender = "m" | "f";

// ================== DOIMIYLAR ==================
const OYLAR = ["yanvar","fevral","mart","aprel","may","iyun","iyul","avgust","sentabr","oktabr","noyabr","dekabr"];
const OY_QISQA = ["yan","fev","mar","apr","may","iyn","iyl","avg","sen","okt","noy","dek"];
const KUNLAR = ["Yakshanba","Dushanba","Seshanba","Chorshanba","Payshanba","Juma","Shanba"];
const KUN_QISQA = ["Ya","Du","Se","Ch","Pa","Ju","Sh"];
const HIJRI_OYLAR = ["muharram","safar","rabiul-avval","rabiul-oxir","jumadul-avval","jumadul-oxir","rajab","sha'bon","ramazon","shavvol","zulqa'da","zulhijja"];
const HADIS_AR = "«الْمُؤْمِنُ الْقَوِيُّ خَيْرٌ وَأَحَبُّ إِلَى اللَّهِ مِنَ الْمُؤْمِنِ الضَّعِيفِ، وَفِي كُلٍّ خَيْرٌ. احْرِصْ عَلَى مَا يَنْفَعُكَ، وَاسْتَعِنْ بِاللَّهِ، وَلَا تَعْجِزْ. وَإِنْ أَصَابَكَ شَيْءٌ، فَلَا تَقُلْ: لَوْ أَنِّي فَعَلْتُ كَانَ كَذَا وَكَذَا، وَلَكِنْ قُلْ: قَدَرُ اللَّهِ وَمَا شَاءَ فَعَلَ، فَإِنَّ لَوْ تَفْتَحُ عَمَلَ الشَّيْطَانِ»";
const HADIS_UZ = "“Kuchli mo'min Alloh uchun kuchsiz mo'mindan yaxshiroq va suyukliroqdir, lekin ikkisida ham yaxshilik bor. Senga foyda beradigan narsaga haris bo'lgin! Allohdan yordam so'ra! Ojizlik qilma! Senga biror musibat yetsa, «Bunday qilganimda shunday-shunday bo'lar edi», demagin, balki: «Allohning taqdiri, U Zot xohlaganini qiladi», degin, chunki «agar...» deyish shaytonning amaliga yo'l ochadi”.";
const HADIS_ROVIY = "Abu Hurayra roziyallohu anhudan rivoyat. Imom Muslim — 6627";

const ZIKRLAR = ["Tonggi zikrlar", "Kechki zikrlar", "Uxlashdan oldingi zikrlar"];
const NAMOZLAR: { id: string; n: string; g: string[] }[] = [
  { id: "bomdod", n: "Bomdod", g: ["2 sunnat", "2 farz"] },
  { id: "peshin", n: "Peshin", g: ["4 sunnat", "4 farz", "2 sunnat"] },
  { id: "asr", n: "Asr", g: ["4 farz"] },
  { id: "shom", n: "Shom", g: ["3 farz", "2 sunnat"] },
  { id: "xufton", n: "Xufton", g: ["4 farz", "2 sunnat"] },
  { id: "vitr", n: "Vitr", g: ["3 vitr"] },
];
const PR_GROUPS = NAMOZLAR.reduce((a, p) => a + p.g.length, 0);

// ================== YORDAMCHILAR ==================
const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);
const toISO = (d: Date) => d.toLocaleDateString("en-CA");
const todayStr = () => toISO(new Date());
const parseISO = (s: string) => new Date(s + "T00:00:00");
const addDays = (d: Date, n: number) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
const addDaysISO = (s: string, n: number) => toISO(addDays(parseISO(s), n));
const diffDays = (a: string, b: string) => Math.round((parseISO(b).getTime() - parseISO(a).getTime()) / 86400000);
const fmtUz = (s: string) => { const d = parseISO(s); return `${d.getDate()}-${tr(OY_QISQA[d.getMonth()])}`; };
const fmtUzFull = (s: string) => { const d = parseISO(s); return `${d.getDate()}-${tr(OYLAR[d.getMonth()])} ${d.getFullYear()}`; };
const fmtMin = (m: number) => m >= 60 ? `${Math.floor(m / 60)} ${tr("s")} ${m % 60 ? (m % 60) + " " + tr("daq") : ""}`.trim() : `${m} ${tr("daq")}`;
const hmToMin = (s: string) => { const [h, m] = s.split(":").map(Number); return (h || 0) * 60 + (m || 0); };
const minToHm = (n: number) => { const v = Math.max(Math.min(n, 1439), 0); return `${String(Math.floor(v / 60)).padStart(2, "0")}:${String(v % 60).padStart(2, "0")}`; };
const emptyIb = (): IbadatDay => ({ zikr: [false, false, false], pr: {}, masjid: {}, tahajjud: 0, nafl: 0, khatm: false });
const b64enc = (s: string) => btoa(unescape(encodeURIComponent(s)));
const b64dec = (s: string) => decodeURIComponent(escape(atob(s)));

function hijri(dISO: string, off: number) {
  try {
    const d = addDays(parseISO(dISO), off);
    const p = new Intl.DateTimeFormat("en-u-ca-islamic-umalqura", { day: "numeric", month: "numeric", year: "numeric" }).formatToParts(d);
    const g = (t: string) => Number((p.find(x => x.type === t) || { value: "0" }).value);
    return `${g("day")}-${tr(HIJRI_OYLAR[g("month") - 1]) || ""} ${g("year")}`;
  } catch { return ""; }
}

function notify(body: string) {
  try { if ("Notification" in window && Notification.permission === "granted") new Notification("Oliy Maqsad", { body }); } catch { }
}

// Capacitor plaginlariga xavfsiz kirish (importsiz — AI Studio saytida ham ishlaydi)
const capPlug = (name: string) => {
  try { return (window as any).Capacitor?.Plugins?.[name] || null; } catch { return null; }
};
const LN = () => capPlug("LocalNotifications");
// belgilashda yengil titrash — faqat telefonda seziladi
const buzz = () => {
  try { const h = capPlug("Haptics"); if (h) h.impact({ style: "LIGHT" }).catch(() => { }); } catch { }
};

// faylni saqlash. Telefonda Filesystem+Share, brauzerda <a download>.
// MUHIM: Android WebView blob: havolani yuklab OLMAYDI — shuning uchun plagin orqali yoziladi.
async function saveFile(blob: Blob, filename: string): Promise<void> {
  const FS = capPlug("Filesystem");
  if (FS) {
    const b64 = await new Promise<string>((res, rej) => {
      const r = new FileReader();
      r.onload = () => res(String(r.result).split(",")[1] || "");
      r.onerror = () => rej(new Error("o'qib bo'lmadi"));
      r.readAsDataURL(blob);
    });
    try {
      const w = await FS.writeFile({ path: filename, data: b64, directory: "DOCUMENTS", recursive: true });
      const Sh = capPlug("Share");
      if (Sh) {
        try {
          await Sh.share({ title: "Oliy Maqsad — zaxira", text: "Zaxira nusxani saqlab qo'ying", url: w.uri });
          return;
        } catch { /* foydalanuvchi bekor qildi — fayl baribir saqlangan */ }
      }
      omAlert(tr("Zaxira saqlandi"), `Fayl telefon xotirasidagi Hujjatlar (Documents) papkasiga yozildi:\n${filename}`);
      return;
    } catch {
      omAlert(tr("Saqlab bo'lmadi"), "Telefon xotirasiga yozishga ruxsat berilmagan bo'lishi mumkin. Sozlamalar → Ilovalar → Oliy Maqsad → Ruxsatlar bo'limini tekshiring.");
      return;
    }
  }
  // brauzer: havola DOM'ga qo'shilishi SHART, aks holda click() ishlamaydi
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { try { document.body.removeChild(a); URL.revokeObjectURL(url); } catch { } }, 1500);
}

function useStored<T>(key: string, initial: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [v, setV] = useState<T>(() => {
    try { const r = localStorage.getItem(key); return r !== null ? (JSON.parse(r) as T) : initial; } catch { return initial; }
  });
  useEffect(() => { localStorage.setItem(key, JSON.stringify(v)); }, [key, v]);
  return [v, setV];
}

// ================== ESKI MA'LUMOTLARNI KO'CHIRISH ==================
function migrateV2() {
  const planRaw = localStorage.getItem("om3_plan");
  if (!planRaw || planRaw === "null") return;
  const plan = JSON.parse(planRaw);
  const groups = JSON.parse(localStorage.getItem("om3_groups") || "[]");
  const cats = JSON.parse(localStorage.getItem("om3_cats") || "[]");
  const books = JSON.parse(localStorage.getItem("om3_books") || "[]");
  let tasks = JSON.parse(localStorage.getItem("om3_tasks") || "[]");
  const folders = [
    ...groups.map((g: any) => ({ id: g.id, name: g.name, importance: 5, scope: "daily" })),
    ...cats.map((c: any) => ({ id: c.id, name: c.name, importance: 8, scope: "oliy" })),
  ];
  const catName = (id: string) => { const c = cats.find((x: any) => x.id === id); return c ? c.name : "Kitob o'qish"; };
  tasks = tasks.map((t: any) => {
    const b = t.bookId ? books.find((x: any) => x.id === t.bookId) : null;
    if (b) return { ...t, scope: "oliy", folderId: b.catId || null, type: catName(b.catId), name: b.name, plannedDays: b.plannedDays || null, notes: b.notes || [], completedAt: b.finishedAt || null };
    return { ...t, scope: "daily", folderId: t.groupId || null, type: t.type || "", plannedDays: null, notes: t.notes || [], completedAt: null };
  });
  books.filter((b: any) => b.status === "planned" && !tasks.some((t: any) => t.bookId === b.id)).forEach((b: any) => {
    tasks.push({ id: b.id + "_t", bookId: b.id, name: b.name, type: catName(b.catId), scope: "oliy", folderId: b.catId || null, minutes: b.dailyMinutes || 0, startDate: b.plannedStart, endDate: null, days: [], remTime: null, remText: "", pauses: [], abandonedAt: null, archivedAt: null, countsHours: true, plannedDays: b.plannedDays || null, notes: b.notes || [], completedAt: null });
  });
  const metrics = (plan.metrics || []).map((m: any) => m.kind === "book"
    ? { id: m.id, name: m.name, target: m.target, kind: "type", typeName: m.catId ? catName(m.catId) : m.name }
    : { id: m.id, name: m.name, target: m.target, kind: m.kind === "manual" ? "manual" : "type", typeName: m.typeName || null });
  localStorage.setItem("om3_folders", JSON.stringify(folders));
  localStorage.setItem("om3_tasks", JSON.stringify(tasks));
  localStorage.setItem("om3_plan", JSON.stringify({ ...plan, name: plan.name || "", metrics }));
}

(function migrate() {
  try {
    const ver = localStorage.getItem("om3_ver");
    if (ver !== "3" && ver !== "4") {
      if (ver !== "2") migrateV2();
      // v2 -> v3: belgilash modeli {status,...} ga o'tadi, vazifalarga kind qo'shiladi
      const logsRaw = localStorage.getItem("om3_logs");
      if (logsRaw) {
        const old = JSON.parse(logsRaw);
        const nu: Logs = {};
        Object.keys(old).forEach(d => {
          nu[d] = {};
          Object.keys(old[d] || {}).forEach(tid => {
            const m = old[d][tid];
            if (m === "done") nu[d][tid] = { st: "full" };
            else if (m === "excused") nu[d][tid] = { st: "excused", excuseScore: 5 };
            else if (m && typeof m === "object") nu[d][tid] = m;
          });
        });
        localStorage.setItem("om3_logs", JSON.stringify(nu));
      }
      const tasksRaw = localStorage.getItem("om3_tasks");
      if (tasksRaw) {
        const ts = JSON.parse(tasksRaw).map((t: any) => ({ ...t, kind: t.kind || "time" }));
        localStorage.setItem("om3_tasks", JSON.stringify(ts));
      }
      localStorage.setItem("om3_ver", "3");
    }
    // v3 -> v4: har vazifaga createdAt qo'shiladi (o'tmishni muzlatish — statistika buzilishini tuzatadi)
    if (localStorage.getItem("om3_ver") !== "4") {
      const logs = JSON.parse(localStorage.getItem("om3_logs") || "{}");
      const firstLog: Record<string, string> = {};
      Object.keys(logs).sort().forEach(d => Object.keys(logs[d] || {}).forEach(tid => { if (!firstLog[tid]) firstLog[tid] = d; }));
      const tasksRaw = localStorage.getItem("om3_tasks");
      if (tasksRaw) {
        const ts = JSON.parse(tasksRaw).map((t: any) => ({ ...t, createdAt: t.createdAt || firstLog[t.id] || t.startDate }));
        localStorage.setItem("om3_tasks", JSON.stringify(ts));
      }
      localStorage.setItem("om3_ver", "4");
    }
  } catch { }
})();

// ================== ASOSIY HISOBLAR ==================
const isRest = (d: string, restDay: number | null) => restDay !== null && parseISO(d).getDay() === restDay;
const weekStartOf = (d: string, ws: number) => addDaysISO(d, -((parseISO(d).getDay() - ws + 7) % 7));

function taskActiveOn(t: Task, d: string): boolean {
  if (d < t.startDate) return false;
  if (t.createdAt && d < t.createdAt) return false; // yaratilishdan oldingi kunlarga ta'sir qilmaydi

  if (t.endDate && d > t.endDate) return false;
  if (t.days.length > 0 && !t.days.includes(parseISO(d).getDay())) return false;
  if (t.archivedAt && d >= t.archivedAt) return false;
  if (t.abandonedAt && d >= t.abandonedAt) return false;
  if (t.pauses.some(p => d >= p.from && d <= p.to)) return false;
  return true;
}

// belgi qanchalik bajarilganini bildiradi. Ziyoda 1 dan OSHADI — ortiqcha mehnat foizga qo'shiladi (max 2)
function markFrac(t: Task, m: MarkV5 | undefined): number {
  if (!m) return 0;
  if (m.st === "extra") {
    const base = t.minutes > 0 ? 1 + (m.extraMin || 0) / t.minutes : 1.25;
    return Math.min(base, 2);
  }
  if (m.st === "full") return 1;
  if (m.st === "excused" || m.st === "missed") return 0;
  if (t.minutes > 0 && m.creditedMin) return Math.min(m.creditedMin / t.minutes, 1);
  return 0;
}

// belgi bo'yicha ishlangan daqiqa (ziyoda bilan)
function markMinutes(t: Task, m: MarkV5 | undefined): number {
  if (!m) return 0;
  if (m.st === "full" || m.st === "extra") return t.minutes + (m.extraMin || 0);
  return m.creditedMin || 0;
}

function dayStats(d: string, tasks: Task[], logs: Logs, restDay: number | null) {
  if (isRest(d, restDay)) return { rest: true, counted: 0, done: 0, excused: 0, pct: null as number | null };
  const act = tasks.filter(t => t.kind !== "count" && taskActiveOn(t, d));
  const lg = logs[d] || {};
  let done = 0, excused = 0, frac = 0;
  act.forEach(t => {
    const m = lg[t.id];
    if (m && m.st === "excused") { excused++; return; }
    const f = markFrac(t, m);
    frac += f;
    if (f >= 1) done++;
  });
  const denom = act.length - excused;
  // ziyoda 100% dan yuqoriga chiqaradi, lekin 150% da to'xtaydi
  const pct = act.length === 0 ? null : denom <= 0 ? 100 : Math.min(Math.round((frac / denom) * 100), 150);
  return { rest: false, counted: act.length, done, excused, pct };
}

function excused30(taskId: string, logs: Logs, today: string): number {
  const dates = Object.keys(logs).filter(d => logs[d] && logs[d][taskId] && logs[d][taskId].st === "excused").sort();
  if (!dates.length) return 0;
  let start = dates[0], count = 0;
  for (const d of dates) {
    if (diffDays(start, d) >= 30) { start = d; count = 1; } else count++;
  }
  return diffDays(start, today) >= 30 ? 0 : count;
}

function periodAvg(from: string, to: string, tasks: Task[], logs: Logs, restDay: number | null): number | null {
  let sum = 0, n = 0;
  for (let d = from; d <= to; d = addDaysISO(d, 1)) {
    const s = dayStats(d, tasks, logs, restDay);
    if (!s.rest && s.pct !== null) { sum += s.pct; n++; }
  }
  return n ? Math.round(sum / n) : null;
}

function uzluksizlik(startISO: string, today: string, tasks: Task[], logs: Logs, restDay: number | null) {
  let run = 0, best = 0;
  for (let d = startISO; d <= today; d = addDaysISO(d, 1)) {
    const s = dayStats(d, tasks, logs, restDay);
    if (s.rest || s.pct === null) continue;
    if (s.pct === 100 && s.excused === 0) { run++; if (run > best) best = run; }
    else if (d !== today) run = 0;
  }
  return { current: run, best };
}

// bir kunda ishlangan jami daqiqa (soatlar hisobiga kiruvchilar)
function dayMinutes(d: string, tasks: Task[], logs: Logs, extras: Extra[]): number {
  const lg = logs[d] || {};
  let min = 0;
  tasks.forEach(t => { if (t.countsHours && t.kind !== "count") min += markMinutes(t, lg[t.id]); });
  extras.forEach(e => { if (e.date === d && e.counts) min += e.minutes; });
  return min;
}

// ibodat reytingi: asosiy foiz (namoz guruhlari + zikrlar + xatm) + bonus (masjid, nafllar)
function ibScore(day: IbadatDay | undefined, khatmActive: boolean) {
  const d = day || emptyIb();
  const base = PR_GROUPS + 3 + (khatmActive ? 1 : 0);
  let done = 0;
  NAMOZLAR.forEach(p => { const arr = d.pr[p.id] || []; p.g.forEach((_, i) => { if (arr[i]) done++; }); });
  (d.zikr || []).forEach(z => { if (z) done++; });
  if (khatmActive && d.khatm) done++;
  const pct = Math.round((done / base) * 100);
  const masjid = Object.keys(d.masjid || {}).filter(k => d.masjid[k]).length;
  const bonus = masjid * 3 + Math.min(d.tahajjud || 0, 12) + Math.min(d.nafl || 0, 12);
  return { done, base, pct, bonus, rating: pct + bonus, masjid };
}
const khatmActiveOn = (k: KhatmCfg | null, d: string) => !!k && d >= k.start && d <= k.end;

// ================== PDF ZAXIRA ==================
const toAscii = (s: string) => s
  .replace(/[‘’ʻʼ`]/g, "'").replace(/[“”«»]/g, '"')
  .replace(/[—–]/g, "-").replace(/[·•]/g, "-").replace(/[^\x20-\x7E]/g, "");
const pdfEsc = (s: string) => s.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
function wrapText(s: string, n: number): string[] {
  const out: string[] = [];
  let cur = "";
  s.split(/\s+/).forEach(w => {
    if ((cur + " " + w).trim().length > n) { if (cur) out.push(cur); cur = w; }
    else cur = (cur + " " + w).trim();
  });
  if (cur) out.push(cur);
  return out.length ? out : [""];
}

// oddiy, o'qiladigan PDF yasaydi; oxiriga %%OMDATA: bilan zaxira ma'lumot yashiriladi
function makePdf(lines: string[], dataB64: string): Blob {
  const pages: string[][] = [];
  for (let i = 0; i < lines.length; i += 44) pages.push(lines.slice(i, i + 44));
  if (!pages.length) pages.push([]);
  const objs: string[] = [];
  const kids = pages.map((_, i) => `${4 + 2 * i} 0 R`).join(" ");
  objs.push("<</Type/Catalog/Pages 2 0 R>>");
  objs.push(`<</Type/Pages/Kids[${kids}]/Count ${pages.length}>>`);
  objs.push("<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>");
  pages.forEach((pg, i) => {
    let txt = "BT /F1 10 Tf 50 800 Td 16 TL\n";
    pg.forEach(l => { txt += `(${pdfEsc(toAscii(l))}) Tj T*\n`; });
    txt += "ET";
    objs.push(`<</Type/Page/Parent 2 0 R/MediaBox[0 0 595 842]/Resources<</Font<</F1 3 0 R>>>>/Contents ${5 + 2 * i} 0 R>>`);
    objs.push(`<</Length ${txt.length}>>\nstream\n${txt}\nendstream`);
  });
  let out = "%PDF-1.4\n";
  const offs: number[] = [];
  objs.forEach((o, i) => { offs.push(out.length); out += `${i + 1} 0 obj\n${o}\nendobj\n`; });
  const xref = out.length;
  out += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n`;
  offs.forEach(o => { out += String(o).padStart(10, "0") + " 00000 n \n"; });
  out += `trailer\n<</Size ${objs.length + 1}/Root 1 0 R>>\nstartxref\n${xref}\n%%EOF\n`;
  out += "%%OMDATA:" + dataB64 + "\n";
  return new Blob([out], { type: "application/pdf" });
}

// ================== ORQAGA ISHORASI (history API + Capacitor) ==================
// Bitta umumiy stek: telefonning orqaga ishorasi eng ustki ochiq oynani yopadi.
// Bitta "qo'riqchi" history yozuvi ishlatiladi; dasturiy history.back() chaqirilmaydi.
const backStack: (() => void)[] = [];
let backArmed = false;
if (typeof window !== "undefined") {
  window.addEventListener("popstate", () => {
    const top = backStack.pop();
    backArmed = false;
    if (top) {
      top();
      if (backStack.length > 0) {
        try { window.history.pushState({ omb: 1 }, ""); backArmed = true; } catch { }
      }
    }
  });
  // Android (Capacitor APK): orqaga tugmasi/ishorasi to'liq nazoratga olinadi.
  // Plagin natively ro'yxatdan o'tgan bo'lsa window.Capacitor.Plugins.App orqali topiladi;
  // saytda (brauzerda) bu yo'q — u yerda yuqoridagi popstate ishlayveradi.
  try {
    const cap = (window as any).Capacitor;
    const capApp = cap && cap.Plugins && cap.Plugins.App;
    if (capApp && capApp.addListener) {
      capApp.addListener("backButton", () => {
        const top = backStack.pop();
        if (top) top();
        else if (capApp.minimizeApp) capApp.minimizeApp();
        else if (capApp.exitApp) capApp.exitApp();
      });
    }
  } catch { }
}
function useBack(onClose: () => void) {
  const ref = useRef(onClose);
  ref.current = onClose;
  useEffect(() => {
    const entry = () => ref.current();
    backStack.push(entry);
    if (!backArmed) {
      try { window.history.pushState({ omb: 1 }, ""); backArmed = true; } catch { }
    }
    return () => {
      const i = backStack.indexOf(entry);
      if (i >= 0) backStack.splice(i, 1);
    };
  }, []);
}
// sahifalar uchun ham xuddi shu mexanizm
function BackCloser({ onClose }: { onClose: () => void }) {
  useBack(onClose);
  return null;
}

// ================== KICHIK UI ==================
const inpS: React.CSSProperties = { background: "var(--bg)", borderColor: "var(--line)", color: "var(--ink)" };
const cardS: React.CSSProperties = { background: "var(--card)", borderColor: "var(--line)" };
const inpC = "w-full rounded-lg border px-3 py-2 text-sm";
const lblC = "text-xs";
const lblS: React.CSSProperties = { color: "var(--muted)" };

// ================== IKONKALAR (ichki SVG — oflayn ishlaydi) ==================
const ICONS: Record<string, string> = {
  home: '<path d="M3 9.7 12 3l9 6.7V20a1 1 0 0 1-1 1h-4.5v-6h-7v6H4a1 1 0 0 1-1-1z"/>',
  calendar: '<rect x="3" y="4.5" width="18" height="16.5" rx="3.5"/><path d="M3 9.2h18M8 2.5v4M16 2.5v4"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  stats: '<path d="M3 21h18"/><path d="M6 21V11M11 21V5M16 21v-7"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/>',
  mosque: '<path d="M3.5 21h17"/><path d="M5.5 21v-7M18.5 21v-7"/><path d="M4 13.2a8 8 0 0 1 16 0"/><path d="M12 5.4V3M9.6 21v-3.6a2.4 2.4 0 0 1 4.8 0V21"/>',
  timer: '<path d="M10 2.6h4"/><circle cx="12" cy="14" r="8"/><path d="M12 14V9.6"/>',
  list: '<path d="M9 6h12M9 12h12M9 18h12"/><path d="m3 6 1.1 1.1L6.4 5M3 17l1.1 1.1L6.4 16M3.6 12h.01"/>',
  settings: '<circle cx="12" cy="12" r="3.2"/><path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.2 5.2l1.6 1.6M17.2 17.2l1.6 1.6M18.8 5.2l-1.6 1.6M6.8 17.2l-1.6 1.6"/>',
  book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v13.5H6.5A2.5 2.5 0 0 0 4 19z"/><path d="M20 16.5v4.5H6.5A2.5 2.5 0 0 1 4 18.5"/>',
  bookOpen: '<path d="M12 6.4C10.5 5 8.4 4.5 4 4.5V18c4.4 0 6.5.5 8 2 1.5-1.5 3.6-2 8-2V4.5c-4.4 0-6.5.5-8 1.9Z"/><path d="M12 6.4V20"/>',
  dumbbell: '<path d="M6.5 7v10M4 9.5v5M17.5 7v10M20 9.5v5M6.5 12h11"/>',
  mic: '<rect x="9" y="2.6" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0"/><path d="M12 17.5V21M8.5 21h7"/>',
  droplet: '<path d="M12 3s6 5.4 6 10a6 6 0 0 1-12 0c0-4.6 6-10 6-10Z"/>',
  run: '<circle cx="14" cy="4.6" r="1.8"/><path d="m6 21 3-5-2.5-3 1-4"/><path d="m7.5 9 3.5-1 2.6 2.6 3 .5"/><path d="m11 15 1.6 6"/>',
  check: '<path d="m20 6.5-11 11-5-5"/>',
  checkCircle: '<circle cx="12" cy="12" r="9"/><path d="m8.4 12.3 2.4 2.4 4.7-4.9"/>',
  circle: '<circle cx="12" cy="12" r="8.6"/>',
  x: '<path d="M6 6 18 18M18 6 6 18"/>',
  chevronRight: '<path d="m9 5 7 7-7 7"/>',
  chevronLeft: '<path d="m15 5-7 7 7 7"/>',
  chevronDown: '<path d="m5 9 7 7 7-7"/>',
  chevronUp: '<path d="m5 15 7-7 7 7"/>',
  arrowLeft: '<path d="M20 12H4M10 18l-6-6 6-6"/>',
  play: '<path d="M6.5 4.5v15l13-7.5z" fill="currentColor" stroke="none"/>',
  pause: '<rect x="6" y="4.5" width="4" height="15" rx="1.6" fill="currentColor" stroke="none"/><rect x="14" y="4.5" width="4" height="15" rx="1.6" fill="currentColor" stroke="none"/>',
  stop: '<rect x="5.5" y="5.5" width="13" height="13" rx="3.5" fill="currentColor" stroke="none"/>',
  pencil: '<path d="M4 20h4L19.2 8.8a2.1 2.1 0 0 0-3-3L5 17z"/><path d="m14.5 7.5 3 3"/>',
  trash: '<path d="M4 7h16M9.5 7V5.6A1.6 1.6 0 0 1 11.1 4h1.8a1.6 1.6 0 0 1 1.6 1.6V7M6.8 7l.8 12a2 2 0 0 0 2 1.9h4.8a2 2 0 0 0 2-1.9L17.2 7"/>',
  minus: '<path d="M5 12h14"/>',
  moon: '<path d="M20.5 13.6A8.5 8.5 0 1 1 10.4 3.5a6.6 6.6 0 0 0 10.1 10.1Z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2.6v2M12 19.4v2M2.6 12h2M19.4 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M18.8 5.2l-1.4 1.4M6.6 17.4l-1.4 1.4"/>',
  star: '<path d="m12 3 2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.8 6.6 19.7l1.2-6-4.5-4.2 6.1-.7z" fill="currentColor" stroke="none"/>',
  starLine: '<path d="m12 3.2 2.5 5.4 5.9.7-4.4 4 1.2 5.8L12 16.4 6.8 19.1 8 13.3 3.6 9.3l5.9-.7z"/>',
  flame: '<path d="M12 2.6c1.3 3.2 4 4.3 4 8a4 4 0 0 1-8 0c0-1.4.5-2.4 1.2-3.3C8 8.6 9 5.6 12 2.6Z"/>',
  trophy: '<path d="M7 4h10v4.5a5 5 0 0 1-10 0z"/><path d="M7 6H4.6a2 2 0 0 0 0 4H7.4M17 6h2.4a2 2 0 0 1 0 4H16.6M9.6 13.6c.2 2 .4 3-1.6 4.4M14.4 13.6c-.2 2-.4 3 1.6 4.4M7.5 21h9"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7.5V12l3 2"/>',
  hash: '<path d="M5 9h14M4.4 15h14M10 4 8.6 20M15.4 4 14 20"/>',
  scale: '<path d="M12 4v16M6 8l6-2 6 2M6 8l-3 6.5a3.3 3.3 0 0 0 6 0zM18 8l3 6.5a3.3 3.3 0 0 1-6 0zM8 21h8"/>',
  bell: '<path d="M6 9a6 6 0 0 1 12 0c0 4.8 2 6.4 2 6.4H4S6 13.8 6 9Z"/><path d="M10 19.2a2 2 0 0 0 4 0"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18"/>',
  palette: '<path d="M12 21a9 9 0 1 1 0-18c4.6 0 8 3 8 7 0 2.3-2 3.6-4 3.6h-1.6a1.8 1.8 0 0 0-1.4 3A1.5 1.5 0 0 1 12 21Z"/><circle cx="7.6" cy="11" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="8" r="1" fill="currentColor" stroke="none"/><circle cx="16" cy="11" r="1" fill="currentColor" stroke="none"/>',
  database: '<ellipse cx="12" cy="5.5" rx="7.5" ry="3"/><path d="M4.5 5.5v6c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3v-6M4.5 11.5v6c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3v-6"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5.2"/><circle cx="12" cy="7.8" r="0.7" fill="currentColor" stroke="none"/>',
  alert: '<path d="M12 4 2.8 20.2h18.4z"/><path d="M12 10v4.6"/><circle cx="12" cy="17.6" r="0.7" fill="currentColor" stroke="none"/>',
  sparkles: '<path d="m12 3 1.7 4.8 4.8 1.7-4.8 1.8L12 16l-1.7-4.7-4.8-1.8 4.8-1.7z"/><path d="m18.5 14.5.8 2.2 2.2.8-2.2.9-.8 2.1-.8-2.1-2.2-.9 2.2-.8z" fill="currentColor" stroke="none"/>',
  more: '<circle cx="12" cy="5" r="1.5" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="12" cy="19" r="1.5" fill="currentColor" stroke="none"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/>',
  refresh: '<path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5"/>',
  folder: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4.5 20.2a7.5 7.5 0 0 1 15 0"/>',
  flag: '<path d="M6 21V4M6 4.5h11l-2.2 4L17 12.5H6"/>',
  send: '<path d="M21 3 3 10.5l6 2.5m12-10-9 18-2.5-7.5m11.5-10.5L9 13"/>',
  gear: '<path d="M12.3 2.5h-.6a1.9 1.9 0 0 0-1.9 1.9v.2a1.9 1.9 0 0 1-.95 1.64l-.5.29a1.9 1.9 0 0 1-1.9 0l-.17-.1a1.9 1.9 0 0 0-2.6.7l-.3.52a1.9 1.9 0 0 0 .7 2.6l.17.1a1.9 1.9 0 0 1 .95 1.64v.58a1.9 1.9 0 0 1-.95 1.65l-.17.1a1.9 1.9 0 0 0-.7 2.6l.3.51a1.9 1.9 0 0 0 2.6.7l.17-.1a1.9 1.9 0 0 1 1.9 0l.5.3a1.9 1.9 0 0 1 .95 1.63v.2a1.9 1.9 0 0 0 1.9 1.9h.6a1.9 1.9 0 0 0 1.9-1.9v-.2a1.9 1.9 0 0 1 .95-1.64l.5-.29a1.9 1.9 0 0 1 1.9 0l.17.1a1.9 1.9 0 0 0 2.6-.7l.3-.52a1.9 1.9 0 0 0-.7-2.6l-.17-.1a1.9 1.9 0 0 1-.95-1.64v-.57a1.9 1.9 0 0 1 .95-1.65l.17-.1a1.9 1.9 0 0 0 .7-2.6l-.3-.51a1.9 1.9 0 0 0-2.6-.7l-.17.1a1.9 1.9 0 0 1-1.9 0l-.5-.3a1.9 1.9 0 0 1-.95-1.63v-.2a1.9 1.9 0 0 0-1.9-1.9Z"/><circle cx="12" cy="12" r="2.9"/>',
  download: '<path d="M12 3v12m0 0 4.5-4.5M12 15l-4.5-4.5M4 20h16"/>',
  upload: '<path d="M12 21V9m0 0 4.5 4.5M12 9l-4.5 4.5M4 4h16"/>',
  quote: '<path d="M6 11.2h4V17H4v-4.4c0-2.9 1.5-4.8 4.2-5.6l.6 1.5c-1.7.6-2.6 1.5-2.8 2.7Zm10 0h4V17h-6v-4.4c0-2.9 1.5-4.8 4.2-5.6l.6 1.5c-1.7.6-2.6 1.5-2.8 2.7Z" fill="currentColor" stroke="none"/>',
};
// Yo'nalishga ishora qiluvchi ikonkalar — RTL da ko'zguga aylanadi (.om-yon)
const YONALISHLI = new Set(["arrowLeft", "arrowRight", "chevronLeft", "chevronRight"]);
function Icon({ n, size = 22, fill = "none", style, className }: { n: string; size?: number; fill?: string; style?: React.CSSProperties; className?: string }) {
  const cls = (className || "") + (YONALISHLI.has(n) ? " om-yon" : "");
  return <svg className={cls || undefined} width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={fill === "none" ? "currentColor" : "none"}
    strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", display: "inline-block", verticalAlign: "middle", ...style }}
    dangerouslySetInnerHTML={{ __html: ICONS[n] || "" }} />;
}

// ilova logosi — tog' cho'qqisi + bayroq (SVG, oflayn, rangga moslashadi)
function Logo({ size = 40, color = "var(--green)", style }: { size?: number; color?: string; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 1920 1920" fill={color} style={{ flex: "none", display: "inline-block", verticalAlign: "middle", ...style }}>
      <polygon points="358.71 1449.84 647.07 1051.98 932.46 1452.48 859.87 1227.85 921.47 1283 853.82 1132.49 1036.27 874.45 1308.46 1234.58 1196.79 956.49 1548.83 1452.28 1829.93 1452.28 1877.93 1452.48 1174.69 460.95 858.3 908.12 647.05 612.28 53.1 1452.28 358.71 1449.84" />
      <path d="M1165.51,301.87s-1.1-11.91,9.53-11.91c0,0,9.53-.63,9.53,10.98v174.51h-19.07v-173.57h0Z" />
      <path d="M1202.71,306.26v87.57s24.26-13.79,38.04,11.74,58.72,32.17,98.55-18.13c0,0-51.83-3.32-66.64-24.77-16.09-18.25-15.74-56.92-69.96-56.43v.02Z" />
    </svg>
  );
}

function Card({ children, style, className, onClick }: { children: React.ReactNode; style?: React.CSSProperties; className?: string; onClick?: () => void }) {
  return <div onClick={onClick} className={"om-card p-5 " + (onClick ? "om-press " : "") + (className || "")} style={style}>{children}</div>;
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  useBack(onClose);
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div onClick={e => e.stopPropagation()} className="w-full max-w-md max-h-[85vh] overflow-y-auto rounded-2xl border p-5" style={cardS}>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-bold" style={{ color: "var(--ink)" }}>{title}</h3>
          <button onClick={onClose} className="px-2 text-lg" style={{ color: "var(--muted)" }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

// pastdan chiqadigan oyna — telefonda barmoq bilan qulay
function Sheet({ title, onClose, children }: { title: React.ReactNode; onClose: () => void; children: React.ReactNode }) {
  useBack(onClose);
  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/50" onClick={onClose}>
      <div onClick={e => e.stopPropagation()} className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-t-3xl border-t p-5 pb-8" style={cardS}>
        <div className="mx-auto mb-3 h-1 w-10 rounded-full" style={{ background: "var(--line)" }} />
        <h3 className="mb-3 font-bold" style={{ color: "var(--ink)" }}>{title}</h3>
        {children}
      </div>
    </div>
  );
}

// ================== PREMIUM TANLAGICHLAR (tizim oynalari o'rniga) ==================
const DAYS_ORDER = [1, 2, 3, 4, 5, 6, 0]; // Du Se Ch Pa Ju Sh Ya

// aylanadigan ustun (soat/daqiqa)
function Wheel({ items, value, onPick, pad }: { items: number[]; value: number; onPick: (v: number) => void; pad?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const i = items.indexOf(value);
    if (i >= 0) el.scrollTop = i * 44;
  }, []);
  return (
    <div ref={ref} style={{ height: 176, overflowY: "auto", scrollSnapType: "y mandatory", flex: 1 }}>
      <div style={{ height: 66 }} />
      {items.map(n => (
        <button key={n} onClick={() => { buzz(); onPick(n); }} className="flex h-11 w-full items-center justify-center text-[22px] font-bold tabular-nums"
          style={{ scrollSnapAlign: "center", color: n === value ? "var(--green)" : "var(--ink)", opacity: n === value ? 1 : 0.38 }}>
          {pad ? String(n).padStart(2, "0") : n}
        </button>
      ))}
      <div style={{ height: 66 }} />
    </div>
  );
}

// vaqt oralig'i: "dan — gacha" bitta oynada, davomiyligi bilan
function TimeRangeSheet({ from, to, single, title, wrap, onSave, onClose }: { from: string; to?: string; single?: boolean; title?: string; wrap?: boolean; onSave: (f: string, t: string) => void; onClose: () => void }) {
  const [f, setF] = useState(from || "08:00");
  const [t, setT] = useState(to || "09:00");
  const [edit, setEdit] = useState<"f" | "t">("f");
  const cur = edit === "f" ? f : t;
  const setCur = (v: string) => edit === "f" ? setF(v) : setT(v);
  const [ch, cm] = cur.split(":").map(Number);
  // wrap — yarim tundan o'tadigan oraliq (masalan uyqu 23:00 — 06:00)
  const dur = wrap ? (hmToMin(t) - hmToMin(f) + 1440) % 1440 : hmToMin(t) - hmToMin(f);
  const setDur = (mins: number) => setT(minToHm((hmToMin(f) + mins) % 1440));
  const Tab = ({ k, label, val }: { k: "f" | "t"; label: string; val: string }) => (
    <button onClick={() => setEdit(k)} className="om-press flex-1 rounded-2xl border py-2.5"
      style={edit === k ? { borderColor: "var(--green)", background: "var(--soft)", borderWidth: 2 } : { ...cardS, borderWidth: 2 }}>
      <span className="block text-[10px] font-semibold" style={lblS}>{label}</span>
      <span className="block text-[18px] font-bold tabular-nums" style={{ color: edit === k ? "var(--green)" : "var(--ink)" }}>{val}</span>
    </button>
  );
  return (
    <Sheet onClose={onClose} title={<span className="flex items-center gap-2"><Icon n="clock" size={17} style={{ color: "var(--green)" }} /> {title || (single ? tr("Vaqtni tanlang") : tr("Vaqt oralig'i"))}</span>}>
      <div className="space-y-3">
        {!single && (
          <div className="flex gap-2">
            <Tab k="f" label={tr("Boshlanish")} val={f} />
            <Tab k="t" label={tr("Tugash")} val={t} />
          </div>
        )}
        <div className="flex items-center rounded-2xl border" style={{ ...cardS, position: "relative" }}>
          <div style={{ position: "absolute", left: 8, right: 8, top: 66, height: 44, borderRadius: 14, background: "var(--soft)", pointerEvents: "none" }} />
          <Wheel items={Array.from({ length: 24 }, (_, i) => i)} value={ch} onPick={h => setCur(`${String(h).padStart(2, "0")}:${String(cm).padStart(2, "0")}`)} pad />
          <span className="px-1 text-[20px] font-bold" style={{ color: "var(--muted)" }}>:</span>
          <Wheel items={Array.from({ length: 12 }, (_, i) => i * 5)} value={Math.round(cm / 5) * 5} onPick={m => setCur(`${String(ch).padStart(2, "0")}:${String(m).padStart(2, "0")}`)} pad />
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button onClick={() => { const d = new Date(); setCur(`${String(d.getHours()).padStart(2, "0")}:${String(Math.floor(d.getMinutes() / 5) * 5).padStart(2, "0")}`); }}
            className="om-press rounded-full border px-3 py-1.5 text-[12px] font-medium" style={{ ...cardS, color: "var(--ink)" }}>{tr("Hozir")}</button>
          {!single && [30, 60, 90, 120].map(m => (
            <button key={m} onClick={() => setDur(m)} className="om-press rounded-full border px-3 py-1.5 text-[12px] font-medium"
              style={dur === m ? { background: "var(--green)", color: "#fff", borderColor: "var(--green)" } : { ...cardS, color: "var(--ink)" }}>{fmtMin(m)}</button>
          ))}
        </div>
        {!single && (
          <p className="text-center text-[12px] font-semibold" style={{ color: dur > 0 ? "var(--green)" : "var(--red)" }}>
            {dur > 0 ? `Davomiyligi: ${fmtMin(dur)}` : tr("Tugash vaqti boshlanishdan keyin bo'lsin")}
          </p>
        )}
        <button onClick={() => { if (single || dur > 0) { buzz(); onSave(f, t); } }} className="om-press w-full rounded-2xl py-3.5 text-sm font-bold text-white"
          style={{ background: single || dur > 0 ? "var(--green)" : "var(--muted)", opacity: single || dur > 0 ? 1 : 0.5 }}>{tr("Saqlash")}</button>
      </div>
    </Sheet>
  );
}

// sana tanlash — bosdi/tanlandi/yopildi (OK tugmasi yo'q)
function DateSheet({ value, min, hijriOffset, title, onPick, onClose }: { value: string; min?: string; hijriOffset?: number; title?: string; onPick: (d: string) => void; onClose: () => void }) {
  const [m, setM] = useState(() => { const d = parseISO(value || todayStr()); return new Date(d.getFullYear(), d.getMonth(), 1); });
  const today = todayStr();
  const y = m.getFullYear(), mo = m.getMonth();
  const offset = (new Date(y, mo, 1).getDay() - 1 + 7) % 7;
  const dim = new Date(y, mo + 1, 0).getDate();
  const cells: (string | null)[] = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= dim; d++) cells.push(toISO(new Date(y, mo, d)));
  const pick = (d: string) => { buzz(); onPick(d); };
  return (
    <Sheet onClose={onClose} title={<span className="flex items-center gap-2"><Icon n="calendar" size={17} style={{ color: "var(--green)" }} /> {title || tr("Sanani tanlang")}</span>}>
      <div className="space-y-3">
        <div className="flex gap-1.5">
          <button onClick={() => pick(today)} className="om-press flex-1 rounded-xl border py-2 text-[12px] font-semibold" style={{ ...cardS, color: "var(--ink)" }}>{tr("Bugun")}</button>
          <button onClick={() => pick(addDaysISO(today, 1))} className="om-press flex-1 rounded-xl border py-2 text-[12px] font-semibold" style={{ ...cardS, color: "var(--ink)" }}>{tr("Ertaga")}</button>
          <button onClick={() => pick(addDaysISO(today, 7))} className="om-press flex-1 rounded-xl border py-2 text-[12px] font-semibold" style={{ ...cardS, color: "var(--ink)" }}>{tr("Bir haftadan")}</button>
        </div>
        <div className="rounded-2xl border p-3" style={cardS}>
          <div className="mb-2 flex items-center justify-between">
            <button onClick={() => setM(new Date(y, mo - 1, 1))} className="om-press grid h-8 w-8 place-items-center rounded-lg" style={{ background: "var(--soft)", color: "var(--ink)" }}><Icon n="chevronLeft" size={16} /></button>
            <span className="text-sm font-bold" style={{ color: "var(--ink)" }}>{tr(OYLAR[mo])} {y}</span>
            <button onClick={() => setM(new Date(y, mo + 1, 1))} className="om-press grid h-8 w-8 place-items-center rounded-lg" style={{ background: "var(--soft)", color: "var(--ink)" }}><Icon n="chevronRight" size={16} /></button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {["Du", "Se", "Ch", "Pa", "Ju", "Sh", "Ya"].map(d => <span key={d} className="py-1 text-[10px] font-semibold" style={lblS}>{d}</span>)}
            {cells.map((iso, i) => {
              if (iso === null) return <span key={i} />;
              const dis = !!(min && iso < min);
              const sel = iso === value;
              return (
                <button key={i} disabled={dis} onClick={() => pick(iso)} className="om-press grid h-9 place-items-center rounded-lg text-[13px]"
                  style={sel ? { background: "var(--green)", color: "#fff", fontWeight: 700 } : { color: "var(--ink)", opacity: dis ? 0.25 : iso === today ? 1 : 0.85, fontWeight: iso === today ? 700 : 400 }}>
                  {parseISO(iso).getDate()}
                </button>
              );
            })}
          </div>
        </div>
        {value && <p className="text-center text-[11px]" style={lblS}>{fmtUzFull(value)} · {hijri(value, hijriOffset || 0)}</p>}
      </div>
    </Sheet>
  );
}

// hafta kunlari — bir qatorda 7 doira, bitta rangda
function DayCircles({ days, setDays, single, accent }: { days: number[]; setDays: (d: number[]) => void; single?: boolean; accent?: string }) {
  const acc = accent || "var(--green)";
  return (
    <div className="flex gap-1.5">
      {DAYS_ORDER.map(d => {
        const on = days.includes(d);
        return (
          <button key={d} onClick={() => { buzz(); setDays(single ? [d] : on ? days.filter(x => x !== d) : [...days, d]); }}
            className="om-press flex h-11 flex-1 items-center justify-center rounded-full border text-[12px] font-bold"
            style={on ? { background: acc, color: "#fff", borderColor: acc } : { ...cardS, color: "var(--muted)" }}>
            {tr(KUN_QISQA[d])}
          </button>
        );
      })}
    </div>
  );
}

// nozik ishora — bir marta ko'rinadi, ish bajarilsa yoki ✕ bosilsa butunlay yo'qoladi
function Hint({ id, text, hints, done }: { id: string; text: string; hints: Record<string, boolean>; done: (k: string) => void }) {
  if (hints[id]) return null;
  return (
    <div className="om-fade flex items-start gap-2 rounded-2xl border px-3 py-2.5" style={{ ...cardS, borderColor: "var(--gold)", borderStyle: "dashed" }}>
      <Icon n="info" size={14} style={{ color: "var(--gold)", flex: "none", marginTop: 2 }} />
      <span className="min-w-0 flex-1 text-[11.5px] leading-relaxed" style={{ color: "var(--ink)" }}>{text}</span>
      <button onClick={() => done(id)} className="om-press flex-none" style={{ color: "var(--muted)" }}><Icon n="x" size={14} /></button>
    </div>
  );
}

// vazifani vaqtincha to'xtatish — necha kunga? (window.prompt o'rniga)
function PauseSheet({ name, onPick, onClose }: { name: string; onPick: (days: number) => void; onClose: () => void }) {
  return (
    <Sheet onClose={onClose} title={<span className="flex items-center gap-2"><Icon n="pause" size={15} style={{ color: "var(--gold)" }} /> {tr("Vaqtincha to'xtatish")}</span>}>
      <p className="mb-3 text-[12.5px] leading-relaxed" style={lblS}>«{name}» necha kunga to'xtatilsin? To'xtatilgan kunlar statistikaga kirmaydi.</p>
      <div className="grid grid-cols-4 gap-2">
        {[1, 2, 3, 4, 5, 6, 7].map(n => (
          <button key={n} onClick={() => { buzz(); onPick(n); }} className="om-press rounded-xl border py-3 text-sm font-bold" style={{ ...cardS, color: "var(--ink)" }}>{n} kun</button>
        ))}
      </div>
      <p className="mt-3 text-[11px] leading-relaxed" style={lblS}>{tr("Ko'pi bilan 7 kun. Undan ortig'i — vazifani tashlab qo'yish hisoblanadi.")}</p>
    </Sheet>
  );
}

// ================== TASDIQ OYNASI (window.confirm/alert o'rniga) ==================
interface DlgState { title: string; text?: string; okText?: string; danger?: boolean; alert?: boolean; resolve: (v: boolean) => void; }
let dlgSet: ((d: DlgState | null) => void) | null = null;
function omConfirm(title: string, text?: string, opts?: { okText?: string; danger?: boolean }): Promise<boolean> {
  return new Promise(res => {
    if (dlgSet) dlgSet({ title, text, okText: opts && opts.okText, danger: opts && opts.danger, resolve: res });
    else res(window.confirm(title));
  });
}
function omAlert(title: string, text?: string): Promise<boolean> {
  return new Promise(res => {
    if (dlgSet) dlgSet({ title, text, alert: true, resolve: res });
    else { omAlert(title); res(true); }
  });
}
function DialogHost() {
  const [d, setD] = useState<DlgState | null>(null);
  useEffect(() => { dlgSet = setD; return () => { dlgSet = null; }; }, []);
  if (!d) return null;
  const close = (v: boolean) => { d.resolve(v); setD(null); };
  const acc = d.danger ? "var(--red)" : "var(--green)";
  return (
    <div className="om-overlay fixed inset-0 z-[60] flex items-center justify-center bg-black/55 p-5" onClick={() => close(false)}>
      <div onClick={e => e.stopPropagation()} className="om-pop w-full max-w-sm rounded-3xl p-5"
        style={{ background: "var(--card)", border: "1px solid var(--line)", boxShadow: "var(--shadow-lg)" }}>
        <div className="mb-2 flex items-start gap-2.5">
          <span className="grid h-9 w-9 flex-none place-items-center rounded-2xl" style={{ background: "var(--soft)", color: acc }}>
            <Icon n={d.danger ? "alert" : d.alert ? "info" : "checkCircle"} size={18} />
          </span>
          <p className="pt-1.5 text-[15px] font-bold leading-snug" style={{ color: "var(--ink)" }}>{d.title}</p>
        </div>
        {d.text && <p className="mb-1 text-[12.5px] leading-relaxed" style={lblS}>{d.text}</p>}
        <div className="mt-4 flex gap-2">
          {!d.alert && (
            <button onClick={() => close(false)} className="om-press flex-1 rounded-2xl border py-3 text-sm font-semibold" style={{ ...cardS, color: "var(--muted)" }}>{tr("Bekor")}</button>
          )}
          <button onClick={() => close(true)} className="om-press flex-1 rounded-2xl py-3 text-sm font-bold text-white" style={{ background: acc }}>
            {d.okText || (d.alert ? tr("Tushunarli") : tr("Ha"))}
          </button>
        </div>
      </div>
    </div>
  );
}

// yig'iladigan bo'lim — sarlavha bosilsa ochilib-yopiladi, holati saqlanadi
function Sec({ id, title, icon, accent, right, ui, setUi, children }: {
  id: string; title: string; icon?: string; accent?: string; right?: React.ReactNode;
  ui: Record<string, boolean>; setUi: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  children: React.ReactNode;
}) {
  const open = ui[id] !== false;
  return (
    <div className="om-card overflow-hidden">
      <div onClick={() => setUi(u => ({ ...u, [id]: !open }))} className="om-press flex w-full cursor-pointer select-none items-center justify-between px-5 py-4">
        <span className="flex min-w-0 items-center gap-2.5 text-[15px] font-semibold" style={{ color: "var(--ink)" }}>
          {icon && <span className="grid h-8 w-8 flex-none place-items-center rounded-xl" style={{ background: "var(--soft)", color: accent || "var(--green)" }}><Icon n={icon} size={18} /></span>}
          <span className="truncate">{title}</span>
        </span>
        <span className="flex flex-none items-center gap-2 text-xs font-medium" style={{ color: "var(--muted)" }}>{right}<Icon n={open ? "chevronUp" : "chevronDown"} size={16} /></span>
      </div>
      {open && <div className="px-5 pb-5">{children}</div>}
    </div>
  );
}

function Ring({ done, total, pct }: { done: number; total: number; pct?: number | null }) {
  const p = pct !== undefined && pct !== null ? pct / 100 : (total ? done / total : 0);
  const C = 2 * Math.PI * 34;
  return (
    <div className="relative h-24 w-24 flex-none">
      <svg viewBox="0 0 80 80" className="h-24 w-24 -rotate-90">
        <circle cx="40" cy="40" r="34" fill="none" stroke="var(--line)" strokeWidth="8" />
        <circle cx="40" cy="40" r="34" fill="none" stroke={p >= 1 ? "var(--green)" : "var(--gold)"} strokeWidth="8" strokeLinecap="round" strokeDasharray={`${C * Math.min(p, 1)} ${C}`} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-lg font-bold" style={{ color: "var(--ink)" }}>{done}/{total}</span>
        <span className="text-[10px]" style={{ color: "var(--muted)" }}>{Math.round(p * 100)}%</span>
      </div>
    </div>
  );
}

function Bars({ data }: { data: { label: string; pct: number | null }[] }) {
  return (
    <div className="flex items-end gap-1">
      {data.map((d, i) => (
        <div key={i} className="flex flex-1 flex-col items-center gap-1" title={`${d.label}: ${d.pct === null ? "—" : d.pct + "%"}`}>
          <div className="flex h-24 w-full items-end">
            <div className="w-full rounded-t" style={{ height: `${Math.max(d.pct || 0, 3)}%`, background: d.pct === null ? "var(--line)" : "var(--green)" }} />
          </div>
          <span className="text-[9px]" style={{ color: "var(--muted)" }}>{d.label}</span>
        </div>
      ))}
    </div>
  );
}

// qiymatli ustunlar (daqiqa, reyting...) — eng kattasiga nisbatan masshtablanadi
function ValBars({ data, color, fmt }: { data: { label: string; v: number | null }[]; color?: string; fmt?: (v: number) => string }) {
  const mx = Math.max(...data.map(d => d.v || 0), 1);
  return (
    <div className="flex items-end gap-1">
      {data.map((d, i) => (
        <div key={i} className="flex flex-1 flex-col items-center gap-1" title={`${d.label}: ${d.v === null ? "—" : (fmt ? fmt(d.v) : d.v)}`}>
          <div className="flex h-24 w-full items-end">
            <div className="w-full rounded-t" style={{ height: `${Math.max(((d.v || 0) / mx) * 100, 3)}%`, background: d.v === null ? "var(--line)" : (color || "var(--green)") }} />
          </div>
          <span className="text-[9px]" style={{ color: "var(--muted)" }}>{d.label}</span>
        </div>
      ))}
    </div>
  );
}

function DurationField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [unit, setUnit] = useState<"daq" | "soat">("daq");
  const disp = value === "" ? "" : unit === "soat" ? String(Math.round((parseFloat(value) / 60) * 100) / 100) : value;
  return (
    <div className="flex gap-2">
      <input type="number" step={unit === "soat" ? "0.25" : "5"} value={disp}
        onChange={e => { const v = parseFloat(e.target.value); onChange(isNaN(v) ? "" : String(Math.round(unit === "soat" ? v * 60 : v))); }}
        className={inpC + " flex-1"} style={inpS} />
      <select value={unit} onChange={e => setUnit(e.target.value as "daq" | "soat")} className="rounded-lg border px-2 py-2 text-sm" style={inpS}>
        <option value="daq">{tr("daqiqa")}</option>
        <option value="soat">{tr("soat")}</option>
      </select>
    </div>
  );
}

function DayChips({ days, setDays }: { days: number[]; setDays: (d: number[]) => void }) {
  const ORDER = [1, 2, 3, 4, 5, 6, 0];
  return (
    <div className="flex flex-wrap gap-1">
      {ORDER.map(i => {
        const on = days.includes(i);
        return (
          <button key={i} type="button" onClick={() => setDays(on ? days.filter(x => x !== i) : [...days, i])}
            className="rounded-lg border px-2 py-1 text-xs"
            style={on ? { background: "var(--green)", color: "#fff", borderColor: "var(--green)" } : { ...cardS, color: "var(--muted)" }}>
            {tr(KUN_QISQA[i])}
          </button>
        );
      })}
    </div>
  );
}

// Bugun eng pastida — Oli Imron 200-oyati (hadis va motivatsion matn o'rniga)
function OyatCard() {
  return (
    <Card className="text-center" style={{ borderColor: "var(--line)" }}>
      <p className="text-[11px] leading-relaxed" style={{ color: "var(--muted)" }}>{tr("Alloh taolo Oli Imron surasi 200-oyatda aytadi:")}</p>
      <p dir="rtl" lang="ar" className="mx-auto mb-3 mt-3 max-w-[19rem] text-[16px]" style={{
        color: "var(--ink)",
        fontFamily: "'Noto Naskh Arabic','Droid Arabic Naskh','Geeza Pro','Arabic Typesetting',serif",
        lineHeight: 2.15, wordSpacing: "0.06em",
      }}>
        يَا أَيُّهَا الَّذِينَ آمَنُوا اصْبِرُوا وَصَابِرُوا وَرَابِطُوا وَاتَّقُوا اللَّهَ لَعَلَّكُمْ تُفْلِحُونَ
      </p>
      <p className="mx-auto max-w-[21rem] text-[12px] leading-relaxed" style={{ color: "var(--muted)" }}>
        {tr("Ey mo'minlar! Sabr qilinglar va sabr-toqat qilishda ustun bo'linglar hamda doimo belingiz bog'liq bo'lib turingiz! Va Allohdan qo'rqingiz! Shoyad najot topgaysizlar!")}
      </p>
      <p className="mt-2.5 text-[10px] font-semibold uppercase tracking-wider" style={{ color: "var(--gold)" }}>{tr("Oli Imron surasi · 200-oyat")}</p>
    </Card>
  );
}

// ================== ILOVA YANGILIKLARI (bir martalik oyna) ==================
const NEWS_VER = "v9";
const NEWS_LABEL = "9-yangilanish (v9)";
const NEWS_DATE = "2026-07-26";
const NEWS_ITEMS = [
  "Statistika butunlay yangilandi: Kunlik, Haftalik va Oylik ko'rinish. Har raqam yonida o'tgan davrga nisbatan farqi turadi.",
  "Ortiqcha qilingan ish endi foizga qo'shiladi — natija 100% dan yuqoriga chiqadi.",
  "Oliy maqsad bo'limi soddalashdi: maqsad matni, natija halqasi va maqsadlar ro'yxati. Har maqsadni bosib jarayonini ko'rasiz.",
  "Vaqt, sana va kun tanlash butunlay yangi ko'rinishda. Telefonning oddiy oynalari qolmadi.",
  "Vazifaga qaysi kunlari qilishni belgilaysiz — eslatma faqat o'sha kunlari keladi.",
  "Bildirishnomalarda ilova belgisi ko'rinadi.",
  "Taqvimda kun rangi aniq qoida bilan: to'liq bajarilgan yashil, yarmidan ko'pi sariq, past bo'lsa qizil.",
  "Uyqu kundaligi qo'shildi — qaysi kuni necha soat uxlaganingiz ro'yxatda.",
  "Sozlamalarda «Qanday ishlaydi?» bo'limi paydo bo'ldi.",
];

function NewsModal({ hijriOffset, logoColor, onClose }: { hijriOffset: number; logoColor: string; onClose: () => void }) {
  useBack(onClose);
  return (
    <div className="om-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4">
      <div className="om-pop max-h-[85vh] w-full max-w-md overflow-y-auto rounded-3xl p-5"
        style={{ background: "var(--card)", border: "1px solid var(--line)", boxShadow: "var(--shadow-lg)" }}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Logo size={26} color={logoColor} />
            <div>
              <div className="text-[15px] font-bold leading-none" style={{ color: "var(--ink)" }}>{tr("Ilova yangiliklari")}</div>
              <div className="mt-1.5 text-[10px] font-semibold" style={{ color: "var(--gold)" }}>
                {tr(NEWS_LABEL)} · {fmtUzFull(NEWS_DATE)} · {hijri(NEWS_DATE, hijriOffset)}
              </div>
            </div>
          </div>
          <button onClick={onClose} className="om-press grid h-8 w-8 flex-none place-items-center rounded-xl" style={{ color: "var(--muted)" }}><Icon n="x" size={17} /></button>
        </div>
        <div className="mt-4">
          {NEWS_ITEMS.map((t, i) => (
            <div key={i} className="flex gap-2.5 py-2.5" style={i === 0 ? undefined : { borderTop: "1px solid var(--line)" }}>
              <span className="flex-none text-[12px] font-bold tabular-nums" style={{ color: "var(--green)" }}>{i + 1}.</span>
              <span className="text-[13px] leading-relaxed" style={{ color: "var(--ink)" }}>{tr(t)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HadisCard() {
  const [open, setOpen] = useState(false);
  return (
    <Card>
      <button onClick={() => setOpen(o => !o)} className="flex w-full items-center justify-between text-left">
        <span className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider" style={{ color: "var(--gold)" }}>
          <Icon n="bookOpen" size={16} /> {tr("Hadisi sharif")}
        </span>
        <Icon n={open ? "chevronUp" : "chevronDown"} size={17} style={{ color: "var(--muted)" }} />
      </button>
      {open ? (
        <div className="mt-3 space-y-2.5">
          <p dir="rtl" className="text-right text-base leading-loose" style={{ color: "var(--ink)" }}>{HADIS_AR}</p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--ink)" }}>{HADIS_UZ}</p>
          <p className="text-[11px]" style={{ color: "var(--muted)" }}>{HADIS_ROVIY}</p>
        </div>
      ) : (
        <p className="mt-2 text-sm italic leading-relaxed" style={{ color: "var(--muted)" }}>{HADIS_UZ.slice(0, 88)}...</p>
      )}
    </Card>
  );
}


function HalolCard() {
  return (
    <Card style={{ borderColor: "var(--green)", borderWidth: 2 }}>
      <p className="text-sm leading-relaxed" style={{ color: "var(--ink)" }}>
        Bu ilova — sening shaxsiy rivojlanishing va maqsadlaringga oson erishishing uchun ko'makdosh xolos.
        Baribir asosiy ishni o'zing qilasan. Hozir o'zingni aldashing mumkin.
        Ammo ertaga Allohni alday olmaysan! <b style={{ color: "var(--green)" }}>{tr("HALOL BO'L!")}</b>
      </p>
    </Card>
  );
}

// ================== KIRISH SAHIFASI ==================
function Onboarding({ onFinish }: { onFinish: (plan: Plan) => void }) {
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState<"l" | "r">("l"); // l = oldinga (o'ngdan chapga), r = orqaga
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [years, setYears] = useState(5);
  const [ready, setReady] = useState<boolean | null>(true);
  const [start, setStart] = useState(todayStr());
  const [calM, setCalM] = useState(() => { const d = parseISO(todayStr()); return new Date(d.getFullYear(), d.getMonth(), 1); });
  const [restDay, setRestDay] = useState<string>("5");
  const [weekStart, setWeekStart] = useState<string>("1");
  const [weightOn, setWeightOn] = useState<boolean | null>(null);
  const [weightTarget, setWeightTarget] = useState("");
  const [weightDay, setWeightDay] = useState("4");
  const TOTAL = 11;
  const GOAL_MAX = 300;

  const submit = () => {
    const rd = restDay === "" ? null : parseInt(restDay);
    onFinish({
      name: name.trim(), goal: goal.trim(), start, years, restDay: rd, weekStart: parseInt(weekStart),
      weightOn: !!weightOn, weightTarget: parseFloat(weightTarget) || 0, weightDay: parseInt(weightDay), metrics: [],
    });
  };

  const DAYS_ORD = [1, 2, 3, 4, 5, 6, 0]; // Dushanba..Yakshanba
  const canNext =
    step === 2 ? name.trim().length > 0 :
    step === 3 ? goal.trim().length > 0 :
    step === 5 ? ready === true :
    step === 9 ? weightOn !== null :
    true;
  const back = () => { setDir("r"); setStep(s => Math.max(s - 1, 1)); };
  const next = () => { setDir("l"); setStep(s => Math.min(s + 1, TOTAL)); };

  const IconCircle = ({ n, logo }: { n?: string; logo?: boolean }) => (
    <div className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-full" style={{ background: "var(--soft)" }}>
      {logo ? <Logo size={42} color="var(--green)" /> : <Icon n={n || "target"} size={32} style={{ color: "var(--green)" }} />}
    </div>
  );
  const Title = ({ children }: { children: React.ReactNode }) => <h2 className="text-center text-xl font-bold leading-snug" style={{ color: "var(--ink)" }}>{children}</h2>;
  const Sub = ({ children }: { children: React.ReactNode }) => <p className="mx-auto mt-2 max-w-xs text-center text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{children}</p>;
  const RadioRow = ({ on, label, sub, onClick }: { on: boolean; label: string; sub?: string; onClick: () => void }) => (
    <button onClick={onClick} className="om-press flex w-full items-center justify-between rounded-2xl border p-3.5 text-left"
      style={on ? { borderColor: "var(--green)", background: "var(--soft)", borderWidth: 2 } : { ...cardS, borderWidth: 2 }}>
      <span className="min-w-0">
        <span className="block text-sm font-semibold" style={{ color: "var(--ink)" }}>{label}</span>
        {sub ? <span className="block text-[11px]" style={lblS}>{sub}</span> : null}
      </span>
      <Icon n={on ? "checkCircle" : "circle"} size={20} style={{ color: on ? "var(--green)" : "var(--muted)", opacity: on ? 1 : 0.4, flex: "none" }} />
    </button>
  );
  const calGrid = () => {
    const y = calM.getFullYear(), mo = calM.getMonth();
    const offset = (new Date(y, mo, 1).getDay() - 1 + 7) % 7;
    const dim = new Date(y, mo + 1, 0).getDate();
    const cells: (string | null)[] = [];
    for (let i = 0; i < offset; i++) cells.push(null);
    for (let d = 1; d <= dim; d++) cells.push(toISO(new Date(y, mo, d)));
    return cells;
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col px-5 pb-6 pt-5">
      {step > 1 && <BackCloser key={"ob" + step} onClose={back} />}
      <div className="mb-4 flex items-center gap-3">
        {step > 1
          ? <button onClick={back} className="om-press grid h-9 w-9 flex-none place-items-center rounded-xl" style={cardS}><Icon n="chevronLeft" size={18} style={{ color: "var(--ink)" }} /></button>
          : <span className="h-9 w-9 flex-none" />}
        <span className="flex items-center gap-1.5"><Logo size={22} /><span className="text-sm font-bold" style={{ color: "var(--ink)" }}>{tr("Oliy maqsad")}</span></span>
        <span className="ms-auto text-xs font-semibold tabular-nums" style={lblS}>{step}/{TOTAL}</span>
      </div>
      <div className="mb-8 h-1.5 overflow-hidden rounded-full" style={{ background: "var(--soft)" }}>
        <div className="h-full rounded-full" style={{ width: `${(step / TOTAL) * 100}%`, background: "var(--green)", transition: "width .3s" }} />
      </div>

      <div key={step} className={(dir === "l" ? "om-slide-l" : "om-slide-r") + " flex-1"}>
        {step === 1 && (<><IconCircle logo /><Title>{tr("Assalomu alaykum va rohmatullohi va barokatuhu")}</Title><Sub>{tr("Men sizga Oliy maqsadingizga erishishingiz uchun ko'makdosh bo'laman, biiznillah.")}</Sub></>)}

        {step === 2 && (<>
          <IconCircle n="user" /><Title>{tr("Ismingiz nima?")}</Title><Sub>{tr("Iltimos, ismingizni kiriting.")}</Sub>
          <input value={name} onChange={e => setName(e.target.value)} placeholder={tr("Masalan: Abdulloh")} className="mt-6 w-full rounded-2xl border px-4 py-3.5 text-center text-base" style={inpS} />
        </>)}

        {step === 3 && (<>
          <IconCircle n="target" /><Title>{tr("Oliy maqsadingizni yozing...")}</Title><Sub>{tr("Maqsadingizni iloji boricha aniq va batafsil yozing.")}</Sub>
          <textarea value={goal} maxLength={GOAL_MAX} onChange={e => setGoal(e.target.value)} rows={4} placeholder={tr("Masalan: 5 yil ichida kasbimda yetuk mutaxassis bo'lish va sog'lom turmush tarziga o'tish...")} className="mt-6 w-full rounded-2xl border px-4 py-3.5 text-sm leading-relaxed" style={inpS} />
          <p className="mt-1 text-right text-[11px]" style={lblS}>{goal.length}/{GOAL_MAX}</p>
        </>)}

        {step === 4 && (<>
          <IconCircle n="calendar" /><Title>{tr("Maqsadingizga umumiy qancha vaqtda yetishni niyat qilgansiz?")}</Title><Sub>{tr("Yillar sonini tanlang.")}</Sub>
          <div className="mt-6 grid grid-cols-5 gap-2">
            {Array.from({ length: 15 }, (_, i) => i + 1).map(y => (
              <button key={y} onClick={() => setYears(y)} className="om-press rounded-xl border py-3 text-sm font-bold" style={years === y ? { background: "var(--green)", color: "#fff", borderColor: "var(--green)" } : { ...cardS, color: "var(--ink)" }}>{y}</button>
            ))}
          </div>
        </>)}

        {step === 5 && (<>
          <IconCircle n="flag" /><Title>{tr("Yaxshi!")}</Title><Sub>{years} yillik maqsadlaringiz uchun rejangizni tuzishga tayyormisiz?</Sub>
          <div className="mt-6 space-y-2">
            <RadioRow on={ready === true} label={tr("Ha, tayyorman")} sub={tr("Rejani tuzishni boshlaymiz.")} onClick={() => setReady(true)} />
            <RadioRow on={ready === false} label={tr("Yo'q, hozir emas")} sub={tr("Keyinroq davom ettiraman.")} onClick={() => setReady(false)} />
          </div>
          {ready === false && <p className="mt-3 text-center text-[12px]" style={{ color: "var(--gold)" }}>{tr("Shoshilmang — tayyor bo'lganingizda \"Ha\"ni tanlang. Eng muhimi — niyat.")}</p>}
        </>)}

        {step === 6 && (<>
          <IconCircle n="calendar" /><Title>{tr("Qachondan harakatga kirmoqchisiz?")}</Title><Sub>{tr("Boshlanish sanasini belgilang.")}</Sub>
          <div className="mt-6 rounded-2xl border p-3" style={cardS}>
            <div className="mb-2 flex items-center justify-between">
              <button onClick={() => setCalM(new Date(calM.getFullYear(), calM.getMonth() - 1, 1))} className="om-press grid h-8 w-8 place-items-center rounded-lg" style={{ background: "var(--soft)" }}><Icon n="chevronLeft" size={16} style={{ color: "var(--ink)" }} /></button>
              <span className="text-sm font-bold" style={{ color: "var(--ink)" }}>{tr(OYLAR[calM.getMonth()])} {calM.getFullYear()}</span>
              <button onClick={() => setCalM(new Date(calM.getFullYear(), calM.getMonth() + 1, 1))} className="om-press grid h-8 w-8 place-items-center rounded-lg" style={{ background: "var(--soft)" }}><Icon n="chevronRight" size={16} style={{ color: "var(--ink)" }} /></button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
              {["Du", "Se", "Ch", "Pa", "Ju", "Sh", "Ya"].map(dn => <span key={dn} className="py-1 text-[10px] font-semibold" style={lblS}>{dn}</span>)}
              {calGrid().map((iso, i) => iso === null ? <span key={i} /> : (
                <button key={i} onClick={() => setStart(iso)} className="om-press grid h-9 place-items-center rounded-lg text-[13px]" style={start === iso ? { background: "var(--green)", color: "#fff", fontWeight: 700 } : { color: "var(--ink)" }}>{parseISO(iso).getDate()}</button>
              ))}
            </div>
          </div>
          <p className="mt-2 text-center text-[12px]" style={lblS}>{tr("Tanlangan:")} <b style={{ color: "var(--green)" }}>{fmtUzFull(start)}</b></p>
        </>)}

        {step === 7 && (<>
          <IconCircle n="sun" /><Title>{tr("Haftalik dam olish kuningizni belgilang!")}</Title><Sub>{tr("Dam kuni foizga kirmaydi — halovat kuni.")}</Sub>
          <div className="mt-5 space-y-1.5">
            <RadioRow on={restDay === ""} label={tr("Dam olishsiz")} onClick={() => setRestDay("")} />
            {DAYS_ORD.map(d => <RadioRow key={d} on={restDay === String(d)} label={tr(KUNLAR[d])} onClick={() => setRestDay(String(d))} />)}
          </div>
        </>)}

        {step === 8 && (<>
          <IconCircle n="calendar" /><Title>{tr("Hafta qaysi kundan boshlansin?")}</Title><Sub>{tr("Haftalik statistika shu kundan hisoblanadi.")}</Sub>
          <div className="mt-5 space-y-1.5">
            {DAYS_ORD.map(d => <RadioRow key={d} on={weekStart === String(d)} label={tr(KUNLAR[d])} onClick={() => setWeekStart(String(d))} />)}
          </div>
        </>)}

        {step === 9 && (<>
          <IconCircle n="scale" /><Title>{tr("Qo'shimcha sozlamalar")}</Title><Sub>{tr("Vazningizni nazorat qilib borishni istaysizmi?")}</Sub>
          <div className="mt-6 space-y-2">
            <RadioRow on={weightOn === true} label={tr("Ha, istayman")} sub={tr("Vaznimni kuzatib boraman.")} onClick={() => setWeightOn(true)} />
            <RadioRow on={weightOn === false} label={tr("Yo'q, hozir kerak emas")} sub={tr("Keyinroq sozlashim mumkin.")} onClick={() => setWeightOn(false)} />
          </div>
          {weightOn === true && (
            <div className="mt-3 space-y-3 rounded-2xl border p-3.5" style={cardS}>
              <div>
                <p className="mb-1.5 text-[11px] font-semibold" style={lblS}>{tr("Necha kg kamaytirmoqchisiz?")}</p>
                <input type="number" value={weightTarget} onChange={e => setWeightTarget(e.target.value)} placeholder={tr("Masalan: 10")} className="w-full rounded-xl border px-3.5 py-2.5 text-sm" style={inpS} />
              </div>
              <div>
                <p className="mb-1.5 text-[11px] font-semibold" style={lblS}>{tr("Qaysi kuni so'ralsin?")}</p>
                <DayCircles days={[parseInt(weightDay)]} setDays={d => setWeightDay(String(d[0]))} single />
              </div>
            </div>
          )}
        </>)}

        {step === 10 && (<>
          <IconCircle n="sparkles" /><Title>{tr("Rejangiz tayyor.")}</Title><Sub>{tr("Alloh taolo maqsadingizga yetishga sizga kuch-quvvat va bardavomlik ato etsin.")}</Sub>
          <div className="mt-6 space-y-2 rounded-2xl border p-4" style={cardS}>
            <p className="text-[11px] font-bold uppercase tracking-wider" style={lblS}>{tr("Quyidagilar keyin o'zgartirilmaydi:")}</p>
            {([["Muddat", `${years} ${tr("yil")}`], ["Boshlanish", fmtUzFull(start)], [tr("Dam kuni"), restDay === "" ? "yo'q" : tr(KUNLAR[parseInt(restDay)])], ["Hafta boshi", tr(KUNLAR[parseInt(weekStart)])]] as [string, string][]).map(([k, v]) => (
              <div key={k} className="flex justify-between text-sm"><span style={lblS}>{k}</span><span className="font-semibold" style={{ color: "var(--ink)" }}>{v}</span></div>
            ))}
          </div>
        </>)}

        {step === 11 && (<>
          <div className="mb-4 flex items-center gap-2"><Logo size={26} /><span className="text-base font-bold" style={{ color: "var(--ink)" }}>{tr("Eslatma")}</span></div>
          <div className="rounded-2xl border p-4" style={cardS}>
            <p className="text-sm leading-relaxed" style={{ color: "var(--ink)" }}>
              {tr("Oisha roziyallohu anhodan rivoyat qilindi: «Nabiy sollallohu alayhi vasallamdan: “Amallarning qay biri Allohga eng suyukli?” deb so'rashdi. U zot:")} <b style={{ color: "var(--green)" }}>{tr("“Oz bo'lsa ham, davomlirog'i”")}</b>{tr(", dedilar. Yana: “Amallardan toqatingiz yetadiganini zimmangizga olinglar”, dedilar.»")}
            </p>
            <p className="mt-2 text-[11px]" style={lblS}>{tr("Sahihul Buxoriy, 81-kitob, 6465-hadis.")}</p>
          </div>
          <div className="mt-3 rounded-2xl border p-4" style={{ ...cardS, borderColor: "var(--green)" }}>
            <p className="text-sm leading-relaxed" style={{ color: "var(--ink)" }}>{tr("Shu sabab ey")} <b>{name.trim() || tr("do'stim")}</b>{tr(", solih amallardan bardavom bo'l! Garchi u oz bo'lsa ham. Alloh taolo kuch-quvvat bersin!")}</p>
          </div>
        </>)}
      </div>

      <div className="mt-6">
        {step < TOTAL ? (
          <button onClick={next} disabled={!canNext} className="om-press flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-base font-bold text-white"
            style={{ background: canNext ? "var(--green)" : "var(--muted)", opacity: canNext ? 1 : 0.5, boxShadow: canNext ? "0 10px 24px rgba(46,125,87,0.32)" : "none" }}>
            {step === 10 ? tr("Eslatmani o'qish") : tr("Davom etish")} <Icon n="chevronRight" size={16} />
          </button>
        ) : (
          <button onClick={submit} className="om-press flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-base font-bold text-white" style={{ background: "var(--green)", boxShadow: "0 10px 24px rgba(46,125,87,0.42)" }}>
            <Logo size={20} color="#fff" /> {tr("Bismillah — boshlaymiz!")}
          </button>
        )}
      </div>
    </div>
  );
}

// ================== JINS SO'ROVI (bir marta) ==================
function GenderModal({ onPick }: { onPick: (g: Gender) => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-sm rounded-2xl border p-5" style={cardS}>
        <h3 className="mb-1 flex items-center gap-2 font-bold" style={{ color: "var(--ink)" }}><Icon n="mosque" size={18} style={{ color: "var(--green)" }} /> {tr("Ibodatlar bo'limi uchun bir savol")}</h3>
        <p className="mb-4 text-sm" style={lblS}>{tr("Namoz belgilash to'g'ri sozlanishi uchun jinsingizni tanlang (bir marta so'raladi, saqlanadi):")}</p>
        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => onPick("m")} className="rounded-xl py-3 text-sm font-bold text-white" style={{ background: "var(--green)" }}>{tr("Erkak")}</button>
          <button onClick={() => onPick("f")} className="rounded-xl py-3 text-sm font-bold text-white" style={{ background: "var(--gold)" }}>{tr("Ayol")}</button>
        </div>
        <p className="mt-3 text-[11px]" style={lblS}>{tr("Erkaklarda har namozda “masjidda o'qidim” tugmasi bo'ladi — reytingda balandroq baholanadi.")}</p>
      </div>
    </div>
  );
}

// ================== QUR'ON XATMI ==================
function KhatmModal({ khatm, today, onSave, onClose }: { khatm: KhatmCfg | null; today: string; onSave: (k: KhatmCfg | null) => void; onClose: () => void }) {
  const [start, setStart] = useState(khatm ? khatm.start : today);
  const [end, setEnd] = useState(khatm ? khatm.end : addDaysISO(today, 29));
  const [mode, setMode] = useState<"vaqt" | "pora">(khatm ? khatm.mode : "vaqt");
  const [daily, setDaily] = useState(khatm ? String(khatm.daily) : "30");
  return (
    <Modal title={tr("Qur'on xatmini rejalash")} onClose={onClose}>
      <label className={lblC} style={lblS}>{tr("Qachon boshlanadi?")}</label>
      <input type="date" value={start} onChange={e => setStart(e.target.value)} className={inpC + " mb-2"} style={inpS} />
      <label className={lblC} style={lblS}>{tr("Qachon tugaydi?")}</label>
      <input type="date" value={end} onChange={e => setEnd(e.target.value)} className={inpC + " mb-2"} style={inpS} />
      <label className={lblC} style={lblS}>{tr("Kunlik ulush qanday o'lchanadi?")}</label>
      <select value={mode} onChange={e => setMode(e.target.value as "vaqt" | "pora")} className={inpC + " mb-2"} style={inpS}>
        <option value="vaqt">{tr("Vaqt bilan (daqiqa)")}</option>
        <option value="pora">{tr("Pora bilan")}</option>
      </select>
      <label className={lblC} style={lblS}>{mode === "vaqt" ? tr("Kuniga necha daqiqa?") : tr("Kuniga necha pora?")}</label>
      <input type="number" value={daily} onChange={e => setDaily(e.target.value)} className={inpC + " mb-3"} style={inpS} />
      <button onClick={() => {
        const d = parseFloat(daily) || 0;
        if (!start || !end || end <= start) { omAlert(tr("Tugash sanasi boshlanishdan keyin bo'lishi kerak.")); return; }
        if (d <= 0) { omAlert(tr("Kunlik ulushni kiriting.")); return; }
        onSave({ start, end, mode, daily: d }); onClose();
      }} className="w-full rounded-lg py-2 text-sm font-bold text-white" style={{ background: "var(--green)" }}>{tr("Saqlash")}</button>
      {khatm && (
        <button onClick={async () => { if (await omConfirm(tr("Xatm rejasi o'chirilsinmi? (kunlik belgilar tarixda qoladi)"))) { onSave(null); onClose(); } }}
          className="mt-2 w-full rounded-lg border py-2 text-sm" style={{ ...cardS, color: "var(--red)" }}>{tr("Rejani o'chirish")}</button>
      )}
    </Modal>
  );
}

// ================== IBODATLAR SAHIFASI (majburiy bo'lim) ==================
function IbadatPage(p: {
  today: string; ib: IbadatLog; setIb: React.Dispatch<React.SetStateAction<IbadatLog>>;
  gender: Gender; khatm: KhatmCfg | null; setKhatm: React.Dispatch<React.SetStateAction<KhatmCfg | null>>;
}) {
  const { today, khatm, gender } = p;
  const d = p.ib[today] || emptyIb();
  const [openPr, setOpenPr] = useState<Record<string, boolean>>({});
  const [showKhatm, setShowKhatm] = useState(false);
  const kActive = khatmActiveOn(khatm, today);
  const sc = ibScore(d, kActive);

  const upd = (fn: (x: IbadatDay) => IbadatDay) => { buzz(); p.setIb(l => ({ ...l, [today]: fn(l[today] || emptyIb()) })); };
  const togglePr = (pid: string, gi: number) => upd(x => {
    const arr = [...(x.pr[pid] || [])];
    arr[gi] = !arr[gi];
    return { ...x, pr: { ...x.pr, [pid]: arr } };
  });

  // xatm jarayoni: boshlanishdan bugungacha nechta kun belgilangan
  let kDone = 0, kTotal = 0;
  if (khatm) {
    kTotal = diffDays(khatm.start, khatm.end) + 1;
    for (let dd = khatm.start; dd <= (today < khatm.end ? today : khatm.end); dd = addDaysISO(dd, 1)) {
      const e = p.ib[dd];
      if (e && e.khatm) kDone++;
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="mb-1 flex items-center gap-2.5 text-2xl font-bold" style={{ color: "var(--ink)" }}><span className="grid h-9 w-9 place-items-center rounded-2xl" style={{ background: "var(--soft)", color: "var(--green)" }}><Icon n="mosque" size={20} /></span>{tr("Ibodatlar")}</h2>
      <Card style={{ borderColor: "var(--green)" }}>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium" style={{ color: "var(--ink)" }}>{tr("Bugungi ibodat reytingi")}</span>
          <span className="text-lg font-bold" style={{ color: "var(--green)" }}>{sc.pct}%{sc.bonus > 0 ? ` +${sc.bonus}` : ""}</span>
        </div>
        <p className="mt-1 text-[11px]" style={lblS}>{tr("Kunlik vazifalar foiziga aralashmaydi — alohida hisoblanadi. Masjid va nafllar bonus beradi.")}</p>
      </Card>
      <div className="space-y-5">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wider" style={lblS}>{tr("Zikrlar")}</p>
          <div className="space-y-1.5">
            {ZIKRLAR.map((z, i) => {
              const on = d.zikr[i];
              return (
                <button key={i} onClick={() => upd(x => { const zk = [...x.zikr]; zk[i] = !zk[i]; return { ...x, zikr: zk }; })}
                  className="om-press flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm"
                  style={on ? { background: "var(--green)", color: "#fff", borderColor: "var(--green)" } : { ...cardS, color: "var(--ink)" }}>
                  <Icon n={i === 0 ? "sun" : "moon"} size={18} style={{ opacity: on ? 1 : 0.7 }} />
                  <span className="flex-1 font-medium">{tr(z)}</span>
                  <Icon n={on ? "checkCircle" : "circle"} size={20} style={{ opacity: on ? 1 : 0.4 }} />
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wider" style={lblS}>{tr("5 vaqt namoz")}</p>
          <div className="space-y-1.5">
            {NAMOZLAR.map(pr => {
              const arr = d.pr[pr.id] || [];
              const all = pr.g.every((_, i) => arr[i]);
              const masjid = !!d.masjid[pr.id];
              if (all && !openPr[pr.id]) {
                return (
                  <button key={pr.id} onClick={() => setOpenPr(o => ({ ...o, [pr.id]: true }))}
                    className="om-press flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-sm"
                    style={{ borderColor: "var(--green)", background: "var(--soft)", color: "var(--green)" }}>
                    <span className="flex items-center gap-2 font-bold"><Icon n="checkCircle" size={18} />{tr(pr.n)}{masjid ? <Icon n="mosque" size={15} style={{ marginInlineStart: 2 }} /> : null}</span>
                    <span className="text-[11px]" style={lblS}>{tr("to'liq o'qildi")}</span>
                  </button>
                );
              }
              return (
                <div key={pr.id} className="rounded-2xl border px-4 py-3" style={cardS}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-bold" style={{ color: "var(--ink)" }}>{tr(pr.n)}</span>
                    {gender === "m" && (
                      <button onClick={() => upd(x => ({ ...x, masjid: { ...x.masjid, [pr.id]: !x.masjid[pr.id] } }))}
                        className="om-press flex items-center gap-1 rounded-lg border px-2 py-1 text-[11px]"
                        style={masjid ? { background: "var(--gold)", color: "#fff", borderColor: "var(--gold)" } : { ...cardS, color: "var(--muted)" }}>
                        <Icon n="mosque" size={13} /> {tr("Masjidda")}{masjid ? " " : ""}
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {pr.g.map((g, gi) => {
                      const on = arr[gi];
                      return (
                        <button key={gi} onClick={() => togglePr(pr.id, gi)}
                          className="om-press rounded-xl border px-3 py-1.5 text-xs font-medium"
                          style={on ? { background: "var(--green)", color: "#fff", borderColor: "var(--green)" } : { ...cardS, color: "var(--ink)" }}>
                          {tr(g)}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wider" style={lblS}>{tr("Nafl namozlar (bonus)")}</p>
          <div className="space-y-1.5">
            {([[tr("Tahajjud"), "tahajjud", "moon"], [tr("Kunduzgi nafl"), "nafl", "sun"]] as const).map(([nm, key, ic]) => {
              const v = (d as any)[key] as number;
              return (
                <div key={key} className="flex items-center justify-between rounded-2xl border px-4 py-3" style={cardS}>
                  <span className="flex items-center gap-2 text-sm font-medium" style={{ color: "var(--ink)" }}><Icon n={ic} size={17} style={{ color: "var(--gold)" }} />{nm}</span>
                  <div className="flex items-center gap-2">
                    {v > 0 && <button onClick={() => upd(x => ({ ...x, [key]: Math.max(v - 2, 0) }))} className="om-press grid h-8 w-8 place-items-center rounded-lg border" style={{ ...cardS, color: "var(--muted)" }}><Icon n="minus" size={16} /></button>}
                    <span className="min-w-16 text-center text-sm font-bold" style={{ color: "var(--ink)" }}>{v} {tr("rakaat")}</span>
                    <button onClick={() => upd(x => ({ ...x, [key]: v + 2 }))} className="om-press grid h-8 w-8 place-items-center rounded-lg text-white" style={{ background: "var(--green)" }}><Icon n="plus" size={16} /></button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wider" style={lblS}>{tr("Qur'on xatmi")}</p>
          {!khatm ? (
            <button onClick={() => setShowKhatm(true)} className="om-press flex w-full items-center justify-center gap-2 rounded-2xl border py-3 text-sm font-medium" style={{ ...cardS, color: "var(--green)" }}>
              <Icon n="bookOpen" size={17} /> {tr("Qur'on xatmini rejalash")}
            </button>
          ) : today < khatm.start ? (
            <div className="flex items-center gap-2 rounded-2xl border px-4 py-3 text-sm" style={cardS}>
              <Icon n="bookOpen" size={17} style={{ color: "var(--green)" }} /><span style={{ color: "var(--ink)" }}>Xatm {fmtUz(khatm.start)} dan boshlanadi</span>
              <button onClick={() => setShowKhatm(true)} className="ms-auto text-xs" style={lblS}>{tr("tahrirlash")}</button>
            </div>
          ) : kActive ? (
            <button onClick={() => upd(x => ({ ...x, khatm: !x.khatm }))}
              className="om-press flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-sm"
              style={d.khatm ? { borderColor: "var(--green)", background: "var(--soft)" } : cardS}>
              <Icon n="bookOpen" size={18} style={{ color: "var(--green)" }} />
              <span className="flex-1 text-left" style={{ color: d.khatm ? "var(--green)" : "var(--ink)", fontWeight: d.khatm ? 700 : 500 }}>
                Bugungi ulush: {khatm.daily} {khatm.mode === "vaqt" ? "daqiqa" : "pora"}
              </span>
              <span className="text-[11px]" style={lblS}>{kDone}/{kTotal} kun</span>
              <Icon n={d.khatm ? "checkCircle" : "circle"} size={19} style={{ color: d.khatm ? "var(--green)" : "var(--muted)", opacity: d.khatm ? 1 : 0.4 }} />
            </button>
          ) : (
            <div className="flex items-center gap-2 rounded-2xl border px-4 py-3 text-sm" style={cardS}>
              <Icon n="bookOpen" size={17} style={{ color: "var(--muted)" }} /><span style={{ color: "var(--ink)" }}>{tr("Xatm tugadi:")} <b>{kDone}/{kTotal}</b> {tr("kun")}</span>
              <button onClick={() => setShowKhatm(true)} className="ms-auto text-xs" style={{ color: "var(--green)" }}>{tr("yangi xatm")}</button>
            </div>
          )}
          {kActive && <button onClick={() => setShowKhatm(true)} className="mt-1.5 text-[11px]" style={lblS}>{tr("xatm rejasini tahrirlash")}</button>}
        </div>
      </div>
      {showKhatm && <KhatmModal khatm={khatm} today={today} onSave={k => p.setKhatm(k)} onClose={() => setShowKhatm(false)} />}
    </div>
  );
}

// ================== BELGILASH OYNASI (pastdan chiqadi) ==================
function MarkSheet({ t, m, slotMin, onSave, onClose }: {
  t: Task; m: MarkV5 | undefined; slotMin: number | null;
  onSave: (mark: MarkV5 | null) => void; onClose: () => void;
}) {
  const [mode, setMode] = useState<"main" | "excuse">("main");
  const [score, setScore] = useState(5);
  const keep = { creditedMin: m && m.creditedMin ? m.creditedMin : undefined };
  const btnC = "om-press flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold";
  const save = (mk: MarkV5 | null) => { buzz(); onSave(mk); };

  return (
    <Sheet onClose={onClose} title={<span>{t.name}{t.minutes > 0 ? <span className="ml-2 text-xs font-normal" style={lblS}>{fmtMin(t.minutes)}</span> : null}</span>}>
      {m && m.creditedMin ? <p className="mb-2 flex items-center gap-1.5 text-xs" style={{ color: "var(--green)" }}><Icon n="timer" size={13} /> Pomodoro orqali {fmtMin(m.creditedMin)} hisoblangan.</p> : null}
      {mode === "main" && (
        <div className="space-y-2">
          <button onClick={() => {
            if (slotMin !== null && t.minutes > 0 && slotMin > t.minutes) save({ ...keep, st: "extra", extraMin: slotMin - t.minutes });
            else save({ ...keep, st: "full" });
          }} className={btnC} style={{ background: "var(--green)", color: "#fff" }}><Icon n="checkCircle" size={17} /> {tr("Qildim")}</button>
          <button onClick={() => setMode("excuse")} className={btnC} style={{ background: "var(--soft)", color: "var(--gold)" }}><Icon n="alert" size={16} /> {tr("Sababli qilmadim")}</button>
          <button onClick={() => save({ ...keep, st: "missed" })} className={btnC} style={{ background: "var(--soft)", color: "var(--red)" }}><Icon n="x" size={16} /> {tr("Umuman qilmadim")}</button>
          {m && m.st && <button onClick={() => save(keep.creditedMin ? { creditedMin: keep.creditedMin } : null)} className={btnC} style={{ ...cardS, borderWidth: 1, color: "var(--muted)" }}>{tr("Belgini olib tashlash")}</button>}
          <p className="text-[11px] leading-relaxed" style={lblS}>{tr("Rejadan ortiq ish qilsangiz — Bugun'dagi “Qo'shimcha ish” bo'limiga yozing. Vijdon — eng adolatli guvoh.")}</p>
        </div>
      )}
      {mode === "excuse" && (
        <div className="space-y-2">
          <label className={lblC} style={lblS}>{tr("Sababingiz qanchalik o'rinli? (1 — bahona, 10 — chindan uzr)")}</label>
          <div className="grid grid-cols-5 gap-1.5">
            {[1,2,3,4,5,6,7,8,9,10].map(n => (
              <button key={n} onClick={() => setScore(n)} className="rounded-lg border py-2 text-sm font-bold"
                style={score === n ? { background: "var(--gold)", color: "#fff", borderColor: "var(--gold)" } : { ...cardS, color: "var(--ink)" }}>{n}</button>
            ))}
          </div>
          <button onClick={() => save({ ...keep, st: "excused", excuseScore: score })}
            className={btnC} style={{ background: "var(--gold)", color: "#fff" }}>{tr("Saqlash")}</button>
        </div>
      )}
    </Sheet>
  );
}

// ================== KUN TARTIBI: VAQT BERISH ==================
function SchedSheet({ t, others, onSave, onClose }: {
  t: Task; others: Task[]; onSave: (from: string, to: string) => void; onClose: () => void;
}) {
  const [from, setFrom] = useState(t.schedFrom || "08:00");
  const [to, setTo] = useState(t.schedTo || "09:00");
  const save = () => {
    const f = hmToMin(from), tt = hmToMin(to);
    if (tt <= f) { omAlert(tr("Tugash vaqti boshlanishdan keyin bo'lishi kerak.")); return; }
    if (t.minutes > 0 && tt - f < t.minutes) { omAlert(tf("Vazifaning kunlik vaqti {v} — undan KAM vaqt ajratib bo'lmaydi.", { v: fmtMin(t.minutes) })); return; }
    const clash = others.find(o => o.id !== t.id && o.schedFrom && o.schedTo && f < hmToMin(o.schedTo) && hmToMin(o.schedFrom) < tt);
    if (clash) { omAlert(`Bu vaqt «${clash.name}» (${clash.schedFrom}–${clash.schedTo}) bilan to'qnashadi.`); return; }
    onSave(from, to);
  };
  return (
    <Sheet onClose={onClose} title={`«${t.name}» — ${tr("kun tartibida vaqti")}`}>
      <div className="mb-2 flex items-center gap-2">
        <input type="time" value={from} onChange={e => setFrom(e.target.value)} className={inpC} style={inpS} />
        <span style={lblS}>{tr("dan")}</span>
        <input type="time" value={to} onChange={e => setTo(e.target.value)} className={inpC} style={inpS} />
        <span style={lblS}>{tr("gacha")}</span>
      </div>
      {t.minutes > 0 && <p className="mb-2 text-[11px]" style={lblS}>Kunlik vaqti: {fmtMin(t.minutes)}. Ortiqcha ajratilgan vaqt belgilashda “ziyoda”ga o'tadi.</p>}
      <button onClick={save} className="w-full rounded-lg py-2 text-sm font-bold text-white" style={{ background: "var(--green)" }}>{tr("Saqlash")}</button>
      {t.schedFrom && (
        <button onClick={() => { onSave("", ""); }} className="mt-2 w-full rounded-lg border py-2 text-sm" style={{ ...cardS, color: "var(--red)" }}>{tr("Vaqtni olib tashlash")}</button>
      )}
    </Sheet>
  );
}

// ================== BUGUN ==================
function BugunView(p: {
  today: string; plan: Plan; tasks: Task[]; folders: Folder[]; logs: Logs; extras: Extra[];
  counts: Record<string, Record<string, number>>; countLog: CountLog; weights: Weight[]; notes: Record<string, string>; settings: Settings;
  sleepCfg: SleepCfg | null; sleepLog: Record<string, number>;
  ib: IbadatLog; khatm: KhatmCfg | null; dayMode: DayMode;
  ui: Record<string, boolean>;
  pomoLog: Record<string, { c: number; m: number }>;
  quotes: Quote[];
  setLogs: React.Dispatch<React.SetStateAction<Logs>>;
  setExtras: React.Dispatch<React.SetStateAction<Extra[]>>; setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  setCounts: React.Dispatch<React.SetStateAction<Record<string, Record<string, number>>>>;
  setCountLog: React.Dispatch<React.SetStateAction<CountLog>>;
  setWeights: React.Dispatch<React.SetStateAction<Weight[]>>; setNotes: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  setSleepLog: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  setDayMode: React.Dispatch<React.SetStateAction<DayMode>>;
  setUi: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  openCountForm: () => void;
  openIbadat: () => void;
  openUyqu: () => void;
  openSozlama: () => void;
  openPomo: () => void;
  openVazifalar: () => void;
  openStat: () => void;
  startPomo: () => void;
  hints: Record<string, boolean>;
  doneHint: (k: string) => void;
}) {
  const { today, plan, tasks, logs, settings, ui, setUi } = p;
  const [noteTask, setNoteTask] = useState<Task | null>(null);
  const [noteTxt, setNoteTxt] = useState("");
  const [showExtra, setShowExtra] = useState(false);
  const [dayNote, setDayNote] = useState(p.notes[today] || "");
  const [sleepH, setSleepH] = useState("");
  const [sheetTask, setSheetTask] = useState<Task | null>(null);
  const [pauseTask, setPauseTask] = useState<Task | null>(null);
  const [reorder, setReorder] = useState(false);
  const [schedTask, setSchedTask] = useState<Task | null>(null);
  const scrolled = useRef(false);

  const sleepTask = tasks.find(t => t.isSleep && taskActiveOn(t, today)) || null;
  const st = dayStats(today, tasks, logs, plan.restDay);
  // tartib bo'yicha saralanadi (order yo'q bo'lsa oxiriga)
  const act = tasks.filter(t => taskActiveOn(t, today) && !t.isSleep && t.kind !== "count")
    .sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999));
  const lg = logs[today] || {};
  const pending = act.filter(t => !lg[t.id] || !lg[t.id].st);
  const marked = act.filter(t => lg[t.id] && lg[t.id].st);
  const sched = p.dayMode.mode === "sched";
  // tartiblash: ro'yxatdagi joyini yuqori/pastga surish
  const moveTask = (id: string, delta: number) => {
    const ids = act.map(x => x.id);
    const i = ids.indexOf(id);
    const j = i + delta;
    if (i < 0 || j < 0 || j >= ids.length) return;
    [ids[i], ids[j]] = [ids[j], ids[i]];
    buzz();
    p.setTasks(ts => ts.map(x => { const k = ids.indexOf(x.id); return k >= 0 ? { ...x, order: k } : x; }));
  };

  const setMark = (id: string, mark: MarkV5 | null) => {
    p.doneHint("mark");
    p.setLogs(ls => {
      const day = { ...(ls[today] || {}) };
      if (mark === null) delete day[id]; else day[id] = mark;
      return { ...ls, [today]: day };
    });
  };

  // reja soatlari vs qilingan
  const plannedMin = act.reduce((a, t) => a + ((lg[t.id] && lg[t.id].st === "excused") ? 0 : t.minutes), 0);
  const doneMin = act.reduce((a, t) => a + markMinutes(t, lg[t.id]), 0);
  const hoursPct = plannedMin > 0 ? Math.round((doneMin / plannedMin) * 100) : null;

  // birinchi bajarilmagan vazifaga avto-scroll
  useEffect(() => {
    if (scrolled.current) return;
    scrolled.current = true;
    if (marked.length > 0 && pending.length > 0) {
      setTimeout(() => {
        const el = document.getElementById("om-first-pend");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 300);
    }
  }, []);

  const soon = tasks.filter(t => t.scope === "oliy" && !t.completedAt && !t.archivedAt && diffDays(today, t.startDate) > 0 && diffDays(today, t.startDate) <= 3);
  const overdue = tasks.filter(t => t.scope === "oliy" && t.kind !== "count" && !t.completedAt && t.plannedDays && taskActiveOn(t, today) && diffDays(t.startDate, today) + 1 > t.plannedDays);
  const alerts = act.filter(t => excused30(t.id, logs, today) > 3);
  const backupOld = settings.lastBackup ? diffDays(settings.lastBackup, today) > 30 : Object.keys(logs).length > 5;
  const todayExtras = p.extras.filter(e => e.date === today);
  const manualMetrics = plan.metrics.filter(m => m.kind === "manual");
  const wd = parseISO(today).getDay();
  const weightToday = plan.weightOn && wd === plan.weightDay && today >= plan.start && !p.weights.some(w => w.date === today);

  // sanaladigan vazifalar
  const countTasks = tasks.filter(t => t.kind === "count" && !t.abandonedAt && !t.archivedAt && t.startDate <= today);
  const countTotal = (t: Task) => Object.values(p.countLog[t.id] || {}).reduce((a, b) => a + b, 0);
  const addCount = (t: Task, delta: number) => {
    buzz();
    p.setCountLog(cl => {
      const cur = { ...(cl[t.id] || {}) };
      cur[today] = Math.max((cur[today] || 0) + delta, 0);
      return { ...cl, [t.id]: cur };
    });
    if (delta > 0 && t.countTarget && countTotal(t) + delta >= t.countTarget && !t.completedAt) {
      setTimeout(async () => {
        const ok = await omConfirm(tr("Maqsadga yetdingiz!"), `«${t.name}» — ${t.countTarget} ta. Tugatilgan deb belgilansinmi?`);
        if (ok) p.setTasks(ts => ts.map(x => x.id === t.id ? { ...x, completedAt: today, archivedAt: addDaysISO(today, 1) } : x));
      }, 100);
    }
  };

  const statusIcon = (t: Task) => {
    const m = lg[t.id];
    if (!m || !m.st) return m && m.creditedMin && t.minutes > 0 ? Math.round(markFrac(t, m) * 100) + "%" : "";
    return m.st === "full" ? "✓" : m.st === "extra" ? "✚" : m.st === "excused" ? "⚠" : "✗";
  };
  const statusColor = (t: Task) => {
    const m = lg[t.id];
    if (!m || !m.st) return "var(--green)";
    return m.st === "excused" ? "var(--gold)" : m.st === "missed" ? "var(--red)" : "var(--green)";
  };

  // 3 ustunlik katakcha — faqat nom + vaqt, tugmalarsiz; bosilganda pastdan oyna
  const typeIcon = (t: Task) => {
    const q = ((t.type || "") + " " + t.name).toLowerCase();
    if (/tilovat|qur|xatm/.test(q)) return "bookOpen";
    if (/kitob|book|o'qish|mutola/.test(q)) return "book";
    if (/dars|ilm|fiqh|tafsir|hadis/.test(q)) return "bookOpen";
    if (/sport|yugur|mashq|gym|fitnes/.test(q)) return "dumbbell";
    if (/podcast|audio|tingla|ma'ruza/.test(q)) return "mic";
    if (/suv|water|ichish/.test(q)) return "droplet";
    if (/it |dastur|code|komp|texnolog/.test(q)) return "sparkles";
    return "target";
  };
  const Cell = ({ t, first }: { t: Task; first?: boolean }) => {
    const m = lg[t.id];
    const done = m && (m.st === "full" || m.st === "extra");
    const acc = t.scope === "oliy" ? "var(--gold)" : "var(--green)";
    return (
      <button id={first ? "om-first-pend" : undefined} onClick={() => setSheetTask(t)}
        className="om-press flex flex-col gap-1.5 rounded-2xl p-3 text-left" style={{ background: "var(--card)", border: "1px solid var(--line)", boxShadow: "var(--shadow)", opacity: m && m.st ? 0.62 : 1 }}>
        <div className="flex items-center justify-between">
          <span className="grid h-8 w-8 place-items-center rounded-xl" style={{ background: "var(--soft)", color: acc }}><Icon n={typeIcon(t)} size={17} /></span>
          {m && m.st
            ? <Icon n={m.st === "excused" ? "alert" : m.st === "missed" ? "x" : "checkCircle"} size={19} style={{ color: statusColor(t) }} />
            : <Icon n="circle" size={19} style={{ color: "var(--muted)", opacity: 0.4 }} />}
        </div>
        <span className="text-[12px] font-semibold leading-tight" style={{ color: "var(--ink)", textDecoration: done ? "line-through" : "none", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as any, overflow: "hidden", minHeight: "2.2em" }}>{t.name}</span>
        <span className="truncate text-[10px]" style={lblS}>{(t.type || "").trim() || tr("Turkumsiz")}</span>
        <span className="text-[10px] font-semibold" style={{ color: acc }}>{t.minutes > 0 ? fmtMin(t.minutes) : "—"}</span>
      </button>
    );
  };

  // kun tartibi rejimidagi qator
  const SchedRow = ({ t }: { t: Task }) => {
    const m = lg[t.id];
    const done = m && (m.st === "full" || m.st === "extra");
    return (
      <button onClick={() => setSheetTask(t)} className="flex w-full items-center gap-2 rounded-xl border px-3 py-2 text-left"
        style={{ ...cardS, borderInlineStartWidth: 3, borderInlineStartColor: t.scope === "oliy" ? "var(--gold)" : "var(--green)", opacity: m && m.st ? 0.6 : 1 }}>
        <span className="w-24 flex-none text-[11px] font-bold tabular-nums" style={{ color: "var(--green)" }}>{t.schedFrom}–{t.schedTo}</span>
        <span className="min-w-0 flex-1 truncate text-sm" style={{ color: "var(--ink)", textDecoration: done ? "line-through" : "none" }}>{t.name}</span>
        <span className="text-sm font-bold" style={{ color: statusColor(t) }}>{statusIcon(t)}</span>
      </button>
    );
  };

  const pausePrompt = (t: Task) => setPauseTask(t);

  const switchMode = async () => {
    if (p.dayMode.lockedUntil && today < p.dayMode.lockedUntil) {
      omAlert(`Rejim ${fmtUzFull(p.dayMode.lockedUntil)} gacha qulflangan — sobitlik ham intizomning bir qismi.`);
      return;
    }
    const nu = sched ? "list" : "sched";
    const ok = await omConfirm(`Rejim «${nu === "list" ? tr("Oddiy ro'yxat") : tr("Kun tartibi")}»ga o'tsinmi?`, tr("Keyingi 7 kun davomida qayta o'zgartirib bo'lmaydi."));
    if (ok) p.setDayMode({ mode: nu as "list" | "sched", lockedUntil: addDaysISO(today, 7) });
  };

  // Uyqu: teskari reyting — rejadan KAM uxlash yaxshi. Kuniga bir marta belgilanadi,
  // keyin faqat + bilan soat qo'shiladi (qo'shilgach reja oshsa reyting tushadi).
  const SleepCard = sleepTask && p.sleepCfg ? (() => {
    const m = lg[sleepTask.id];
    const locked = !!(m && m.st);
    const slept = p.sleepLog[today];
    const planH = p.sleepCfg.hours;
    const diff = slept !== undefined ? Math.round((planH - slept) * 10) / 10 : null;
    const saveSleep = async (mark: "full" | "missed") => {
      const v = parseFloat(sleepH);
      let total = slept;
      if (!isNaN(v) && v > 0 && v < 24) { total = v; p.setSleepLog(sl => ({ ...sl, [today]: v })); }
      if (mark === "full" && total === undefined) { omAlert(tr("Avval necha soat uxlaganingizni kiriting.")); return; }
      const ok = await omConfirm(tr("Belgilaymizmi?"), tr("Belgilagach qaytarib o'zgartirib bo'lmaydi. Keyin yana uxlasangiz + bilan qo'shasiz."));
      if (!ok) return;
      setMark(sleepTask.id, { st: mark });
      setSleepH("");
    };
    const addSleep = () => {
      const v = parseFloat(sleepH);
      if (isNaN(v) || v <= 0 || v >= 24) return;
      p.setSleepLog(sl => ({ ...sl, [today]: Math.round(((sl[today] || 0) + v) * 10) / 10 }));
      setSleepH("");
    };
    return (
      <Card style={{ borderInlineStartWidth: 3, borderInlineStartColor: "var(--blue)" }}>
        <div className="text-sm font-medium" style={{ color: "var(--ink)" }}>
          <Icon n="moon" size={15} style={{ marginInlineEnd: 5, verticalAlign: "-2px" }} />Rejaga muvofiq uyqu{locked ? (m!.st === "full" ? " · ✓ belgilandi" : " · ✗ belgilandi") : ""}
        </div>
        <div className="text-[11px]" style={{ color: "var(--muted)" }}>
          Reja: {p.sleepCfg.kind === "range" ? `${p.sleepCfg.from} — ${p.sleepCfg.to} (~${planH} ${tr("soat")})` : `${planH} ${tr("soat")}`}
          {slept !== undefined ? ` · ${tr("uxlandi")}: ${slept} ${tr("soat")}` : ""}
        </div>
        {diff !== null && (
          <p className="mt-1 text-[11px] font-bold" style={{ color: diff >= 0 ? "var(--green)" : "var(--gold)" }}>
            {diff > 0 ? tf("Rejadan {n} soat kam uxladingiz — reyting yuqori", { n: diff })
              : diff === 0 ? tr("Rejaga aniq muvofiq")
              : tf("Rejadan {n} soat ko'p uxladingiz — reyting pasayadi", { n: -diff })}
          </p>
        )}
        {!locked ? (
          <>
            <div className="mt-2 flex items-center gap-1.5">
              <input type="number" step="0.5" value={sleepH} onChange={e => setSleepH(e.target.value)} placeholder={tr("soat")}
                className="w-20 rounded-lg border px-2 py-1.5 text-sm" style={inpS} />
              <button onClick={() => saveSleep("full")} className="flex-1 rounded-lg py-1.5 text-sm font-bold" style={{ background: "var(--soft)", color: "var(--green)" }}>{tr("✓ Qildim")}</button>
              <button onClick={() => saveSleep("missed")} className="flex-1 rounded-lg py-1.5 text-sm font-bold" style={{ background: "var(--soft)", color: "var(--red)" }}>{tr("✗ Qilmadim")}</button>
            </div>
            <p className="mt-1 text-[10px]" style={lblS}>{tr("Kuniga faqat bir marta belgilanadi. Kam uxlash — yuqori reyting.")}</p>
          </>
        ) : (
          <div className="mt-2 flex items-center gap-1.5">
            <input type="number" step="0.5" value={sleepH} onChange={e => setSleepH(e.target.value)} placeholder={tr("yana uxladingizmi? soat")}
              className="flex-1 rounded-lg border px-2 py-1.5 text-sm" style={inpS} />
            <button onClick={addSleep} className="rounded-lg px-4 py-1.5 text-sm font-bold text-white" style={{ background: "var(--blue)" }}>+</button>
          </div>
        )}
      </Card>
    );
  })() : null;

  const NoteCard = (
    <Card>
      <label className={lblC} style={lblS}>{tr("Bugun qanday o'tdi? (bir jumla — Taqvimda saqlanadi)")}</label>
      <div className="mt-1 flex gap-2">
        <input value={dayNote} onChange={e => setDayNote(e.target.value)} placeholder={tr("Masalan: yaxshi, unumli kun bo'ldi...")} className={inpC + " flex-1"} style={inpS} />
        <button onClick={() => p.setNotes(ns => ({ ...ns, [today]: dayNote.trim() }))} className="rounded-lg px-3 py-2 text-sm font-bold text-white" style={{ background: "var(--green)" }}>{tr("OK")}</button>
      </div>
      {p.notes[today] && <p className="mt-1 text-[11px]" style={{ color: "var(--green)" }}>{tr("Saqlandi ✓")}</p>}
    </Card>
  );

  const Salom = null;

  const ibSc = ibScore(p.ib[today], khatmActiveOn(p.khatm, today));
  const IbadatBlock = (
    <button onClick={p.openIbadat} className="om-press om-card flex w-full items-center gap-3 p-4 text-left">
      <span className="grid h-11 w-11 flex-none place-items-center rounded-2xl" style={{ background: "var(--soft)", color: "var(--green)" }}><Icon n="mosque" size={22} /></span>
      <div className="min-w-0 flex-1">
        <div className="text-[15px] font-bold" style={{ color: "var(--ink)" }}>{tr("Ibodatlar")}</div>
        <div className="text-[11px] font-medium" style={{ color: "var(--gold)" }}>{tr("Majburiy bo'lim - to'ldirish shart")}</div>
      </div>
      <span className="flex flex-none items-center gap-1 text-sm font-bold" style={{ color: "var(--green)" }}>{ibSc.pct}%{ibSc.bonus > 0 ? ` +${ibSc.bonus}` : ""}<Icon n="chevronRight" size={16} /></span>
    </button>
  );

  // tr("Keyingi vazifa") — birinchi bajarilmagan ish (kun tartibida vaqti bo'yicha eng yaqini)
  const nextTask = (() => {
    if (pending.length === 0) return null;
    if (sched) {
      const sp = pending.filter(t => t.schedFrom && t.schedTo).sort((a, b) => hmToMin(a.schedFrom!) - hmToMin(b.schedFrom!));
      return sp[0] || pending[0];
    }
    return pending[0];
  })();
  const NextCard = nextTask ? (
    <div onClick={() => setSheetTask(nextTask)} className="om-press flex cursor-pointer items-center gap-3 rounded-2xl p-4"
      style={{ background: "var(--green)", boxShadow: "0 10px 24px rgba(46,125,87,0.32)" }}>
      <span className="grid h-11 w-11 flex-none place-items-center rounded-2xl" style={{ background: "rgba(255,255,255,0.16)", color: "#fff" }}><Icon n={typeIcon(nextTask)} size={22} /></span>
      <div className="min-w-0 flex-1">
        <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.72)" }}>{tr("Keyingi vazifa")}</div>
        <div className="truncate text-[15px] font-bold text-white">{nextTask.name}</div>
        <div className="text-[11px] font-medium" style={{ color: "rgba(255,255,255,0.72)" }}>
          {sched && nextTask.schedFrom ? `${nextTask.schedFrom}–${nextTask.schedTo}` : nextTask.minutes > 0 ? fmtMin(nextTask.minutes) : "vaqtsiz"}
        </div>
      </div>
      <button onClick={e => { e.stopPropagation(); p.startPomo(); }}
        className="om-press flex flex-none items-center gap-1.5 rounded-2xl px-4 py-2.5 text-sm font-bold" style={{ background: "#fff", color: "var(--green)" }}>
        <Icon n="play" size={13} /> {tr("Boshlash")}
      </button>
    </div>
  ) : null;

  // 4 ta mini-kartochka: Ibodatlar / Uyqu / Pomodoro / Eslatmalar
  const tPomo = p.pomoLog[today] || { c: 0, m: 0 };
  // bugungi eslatmalar: vazifa vaqt oralig'i boshi + qo'shimcha eslatma vaqtlari
  const remList = act.reduce<string[]>((a, t) => { if (t.schedFrom) a.push(t.schedFrom); if (t.remTime) a.push(t.remTime); return a; }, []).sort();
  const nextRem = remList.find(x => x >= `${String(new Date().getHours()).padStart(2, "0")}:${String(new Date().getMinutes()).padStart(2, "0")}`);
  const sleepMarked = !!(sleepTask && lg[sleepTask.id] && lg[sleepTask.id].st);
  const Tile = ({ label, value, sub, icon, tint, onClick }: { label: string; value: string; sub: string; icon: string; tint: string; onClick: () => void }) => (
    <button onClick={onClick} className="om-press om-card flex min-w-0 flex-col items-start gap-1 p-2.5 text-left">
      <span className="flex w-full min-w-0 items-center gap-1 text-[10px] font-semibold" style={{ color: "var(--muted)" }}>
        <Icon n={icon} size={12} style={{ color: tint }} /><span className="truncate">{label}</span>
      </span>
      <span className="w-full truncate text-[14px] font-bold leading-tight" style={{ color: "var(--ink)" }}>{value}</span>
      <span className="w-full truncate text-[9px]" style={{ color: "var(--muted)" }}>{sub}</span>
    </button>
  );
  const openTile = (fn: () => void) => () => { p.doneHint("tiles"); fn(); };
  const MiniTiles = (
    <div className="grid grid-cols-4 gap-1.5">
      <Tile label={tr("Ibodatlar")} icon="mosque" tint="var(--green)" value={`${ibSc.pct}%`} sub={tr("Majburiy bo'lim")} onClick={openTile(p.openIbadat)} />
      <Tile label={tr("Uyqu")} icon="moon" tint="var(--blue)" value={p.sleepCfg ? `${p.sleepCfg.hours} ${tr("soat")}` : "—"} sub={p.sleepCfg ? (sleepMarked ? tr("Belgilandi") : tr("Belgilanmagan")) : tr("Reja yo'q")} onClick={p.openUyqu} />
      <Tile label={tr("Pomodoro")} icon="timer" tint="var(--red)" value={`${tPomo.c} ${tr("ta")}`} sub={tPomo.m > 0 ? fmtMin(tPomo.m) : tr("Boshlash")} onClick={p.openPomo} />
      <Tile label={tr("Eslatma")} icon="bell" tint="var(--gold)" value={remList.length > 0 ? `${remList.length} ${tr("ta")}` : "—"} sub={nextRem ? `${tr("keyingi")} ${nextRem}` : remList.length > 0 ? tr("bugun tugadi") : tr("vaqt yo'q")} onClick={p.openVazifalar} />
    </div>
  );

  // shaxsiy iqtiboslar — tanlangan joyda ko'rinadi (Sozlamalarda boshqariladi)
  const quotesAt = (pos: Quote["pos"]) => p.quotes.filter(q => q.pos === pos).map(q => (
    <Card key={q.id} style={{ borderInlineStartWidth: 3, borderInlineStartColor: "var(--gold)" }}>
      <p className="text-sm italic leading-relaxed" style={{ color: "var(--ink)" }}>
        <Icon n="quote" size={14} style={{ color: "var(--gold)", marginInlineEnd: 6, verticalAlign: "-2px" }} />{q.text}
      </p>
    </Card>
  ));

  const CountBlock = countTasks.length > 0 || true ? (
    <Sec id="sanaladigan" title={tr("Sanaladigan vazifalar")} icon="hash" accent="var(--blue)" ui={ui} setUi={setUi}
      right={<button onClick={e => { e.stopPropagation(); p.openCountForm(); }} className="rounded-lg px-2 py-0.5 font-bold text-white" style={{ background: "var(--blue)" }}>+</button>}>
      {countTasks.length === 0 && <p className="text-xs" style={lblS}>{tr("Masalan: “100 ta dars” — kunlik normasiz, umumiy son bilan boriladigan ishlar. “+” bilan qo'shing.")}</p>}
      <div className="space-y-1.5">
        {countTasks.map(t => {
          const total = countTotal(t);
          const tn = (p.countLog[t.id] || {})[today] || 0;
          const target = t.countTarget || 0;
          const ended = !!(t.endDate && today > t.endDate);
          let behind = false;
          if (t.endDate && target > 0 && !t.completedAt && !ended) {
            const totalDays = diffDays(t.startDate, t.endDate) + 1;
            const passed = diffDays(t.startDate, today) + 1;
            behind = total < Math.floor((target * passed) / totalDays);
          }
          return (
            <div key={t.id} className="rounded-xl border px-3 py-2" style={{ ...cardS, borderInlineStartWidth: 3, borderInlineStartColor: t.scope === "oliy" ? "var(--gold)" : "var(--blue)", opacity: t.completedAt ? 0.6 : 1 }}>
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium" style={{ color: "var(--ink)" }}>{t.scope === "oliy" ? "⭐ " : ""}{t.completedAt ? "✅ " : ""}{t.name}</div>
                  <div className="text-[11px]" style={lblS}>
                    Jami: <b style={{ color: "var(--ink)" }}>{total}/{target}</b>{tn > 0 ? ` · bugun: +${tn}` : ""}{t.endDate ? ` · ${fmtUz(t.endDate)} gacha` : ""}
                  </div>
                </div>
                {!t.completedAt && !ended && (
                  <div className="flex flex-none items-center gap-1.5">
                    {tn > 0 && <button onClick={() => addCount(t, -1)} className="rounded-lg border px-2.5 py-1.5 text-sm" style={{ ...cardS, color: "var(--muted)" }}>−1</button>}
                    <button onClick={() => addCount(t, 1)} className="rounded-lg px-3 py-1.5 text-sm font-bold text-white" style={{ background: "var(--blue)" }}>+1</button>
                  </div>
                )}
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full" style={{ background: "var(--line)" }}>
                <div className="h-full rounded-full" style={{ width: `${target ? Math.min((total / target) * 100, 100) : 0}%`, background: t.scope === "oliy" ? "var(--gold)" : "var(--blue)" }} />
              </div>
              {behind && <p className="mt-1 text-[11px]" style={{ color: "var(--gold)" }}>{tr("Rejadan biroz ortdasiz — bugun bir oz ko'proq harakat qiling.")}</p>}
              {ended && !t.completedAt && <p className="mt-1 text-[11px]" style={{ color: "var(--red)" }}>Muddat tugadi: {total}/{target}</p>}
            </div>
          );
        })}
      </div>
    </Sec>
  ) : null;

  // ==== DAM KUNI ====
  if (isRest(today, plan.restDay)) {
    const from = weekStartOf(today, plan.weekStart);
    const days: { label: string; pct: number | null }[] = [];
    let sum = 0, n = 0, doneT = 0, exc = 0;
    for (let d = from; d < today; d = addDaysISO(d, 1)) {
      const s = dayStats(d, tasks, logs, plan.restDay);
      if (s.rest) continue;
      days.push({ label: tr(KUN_QISQA[parseISO(d).getDay()]), pct: s.pct });
      if (s.pct !== null) { sum += s.pct; n++; }
      doneT += s.done; exc += s.excused;
    }
    const avg = n ? Math.round(sum / n) : null;
    return (
      <div className="space-y-4">
        {Salom}
        {quotesAt("top")}{quotesAt("mid")}{quotesAt("bottom")}
        {IbadatBlock}
        <Card className="text-center">
          <div className="mx-auto mb-2 grid h-14 w-14 place-items-center rounded-2xl" style={{ background: "var(--soft)", color: "var(--green)" }}><Icon n="moon" size={28} /></div>
          <div className="text-lg font-bold" style={{ color: "var(--green)" }}>{tr("Bugun — dam kuni")}</div>
          <div className="mt-1 text-sm" style={{ color: "var(--muted)" }}>{tr("Yaxshi hordiq oling. Hafta yakunini ko'rib chiqing.")}</div>
        </Card>
        <button onClick={p.openStat} className="om-press om-card flex w-full items-center gap-3 p-4 text-left">
          <span className="grid h-11 w-11 flex-none place-items-center rounded-2xl" style={{ background: "var(--soft)", color: "var(--green)" }}><Icon n="stats" size={21} /></span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-bold" style={{ color: "var(--ink)" }}>
              {n === 0 ? tr("Haftalik hisobot") : `Haftangiz ${avg}%`}
            </span>
            <span className="block text-[11px]" style={lblS}>
              {n === 0 ? tr("Ma'lumot hali yetarli emas") : `${doneT} bajarildi${exc ? ` · ${exc} sababli` : ""} — to'liq hisobotni ko'rish`}
            </span>
          </span>
          <Icon n="chevronRight" size={16} style={{ color: "var(--muted)" }} />
        </button>
        {weightToday && <WeightCard onSave={v => p.setWeights(ws => [...ws, { date: today, kg: v }])} />}
        {SleepCard}
        {NoteCard}
        <OyatCard />
        {sheetTask && <MarkSheet t={sheetTask} m={lg[sheetTask.id]} slotMin={null} onClose={() => setSheetTask(null)}
          onSave={mk => { setMark(sheetTask.id, mk); setSheetTask(null); }} />}
      </div>
    );
  }

  // ==== ODDIY KUN ====
  const schedT = act.filter(t => t.schedFrom && t.schedTo).sort((a, b) => hmToMin(a.schedFrom!) - hmToMin(b.schedFrom!));
  const unsched = act.filter(t => !t.schedFrom || !t.schedTo);

  return (
    <div className="space-y-4">
      <Card className="flex items-center gap-4">
        <Ring done={st.done} total={Math.max(st.counted - st.excused, 0)} pct={st.pct} />
        <div className="min-w-0 flex-1">
          {st.counted === 0 ? (
            <p className="text-sm" style={{ color: "var(--muted)" }}>{tr("Bugunga vazifa yo'q. Vazifalar ro'yxati orqali qo'shing.")}</p>
          ) : st.done >= st.counted - st.excused ? (
            <p className="font-bold" style={{ color: "var(--green)" }}>Barakalla, {plan.name}! Bugungi barcha ishlar bajarildi</p>
          ) : (
            <p className="text-sm" style={{ color: "var(--ink)" }}><b>{pending.length + (sleepTask && !(lg[sleepTask.id] && lg[sleepTask.id].st) ? 1 : 0)}</b> {tr("ta ish qoldi")}{st.excused ? `, ${st.excused} ${tr("ta sababli")}` : ""}.</p>
          )}
          {plannedMin > 0 && (
            <div className="mt-2">
              <div className="flex justify-between text-[11px]" style={lblS}>
                <span className="flex items-center gap-1"><Icon n="clock" size={13} /> {tr("Reja")}: {fmtMin(plannedMin)}</span>
                <span style={{ color: hoursPct !== null && hoursPct >= 100 ? "var(--green)" : "var(--muted)", fontWeight: 700 }}>{fmtMin(doneMin)} - {hoursPct}%</span>
              </div>
              <div className="mt-0.5 h-1.5 overflow-hidden rounded-full" style={{ background: "var(--line)" }}>
                <div className="h-full rounded-full" style={{ width: `${Math.min(hoursPct || 0, 100)}%`, background: hoursPct !== null && hoursPct >= 100 ? "var(--green)" : "var(--gold)" }} />
              </div>
            </div>
          )}
        </div>
      </Card>

      {NextCard}

      <Hint id="tiles" hints={p.hints} done={p.doneHint}
        text={tr("Quyidagi to'rt katakcha bosiladi — ibodat, uyqu, pomodoro va eslatmalar shu yerdan ochiladi.")} />

      {MiniTiles}

      {quotesAt("top")}

      {backupOld && <Card style={{ borderColor: "var(--gold)" }}><p className="text-sm" style={{ color: "var(--ink)" }}>{tr("Zaxira nusxa olganingizga ancha bo'ldi - Sozlamalardan yuklab oling.")}</p></Card>}

      {soon.map(t => (
        <Card key={t.id} style={{ borderColor: "var(--gold)" }}>
          <p className="text-sm" style={{ color: "var(--ink)" }}><b>{diffDays(today, t.startDate)} kundan keyin</b> «{t.name}» vazifasini boshlaysiz.</p>
        </Card>
      ))}

      {overdue.map(t => (
        <Card key={t.id}>
          <p className="text-sm" style={{ color: "var(--ink)" }}>«{t.name}» - {diffDays(t.startDate, today) + 1}-kun (reja: {t.plannedDays} kun). Shoshilmang, lekin rejani ham unutmang.</p>
        </Card>
      ))}

      {alerts.map(t => (
        <Card key={t.id} style={{ borderColor: "var(--gold)" }}>
          <p className="text-sm" style={{ color: "var(--ink)" }}>«{t.name}» so'nggi 30 kunda {excused30(t.id, logs, today)} marta sababli qoldirildi. Balki og'irlik qilayotgandir? Yengillashtirishingiz mumkin.</p>
        </Card>
      ))}

      {weightToday && <WeightCard onSave={v => p.setWeights(ws => [...ws, { date: today, kg: v }])} />}

      {quotesAt("mid")}

      <Sec id="vazifalar" title={tr("Bugungi vazifalar")} icon="list" accent="var(--green)" ui={ui} setUi={setUi}
        right={<span>{st.done}/{Math.max(st.counted - st.excused, 0)}</span>}>
        <div className="mb-2.5 flex gap-1.5">
          <button onClick={switchMode} className="om-press flex flex-1 items-center justify-center gap-1.5 rounded-xl border py-2 text-[11px] font-semibold"
            style={sched ? { background: "var(--soft)", color: "var(--green)", borderColor: "var(--green)" } : { ...cardS, color: "var(--muted)" }}>
            <Icon n="clock" size={13} /> {tr("Kun tartibi")}
          </button>
          <button onClick={() => setReorder(r => !r)} className="om-press flex flex-1 items-center justify-center gap-1.5 rounded-xl border py-2 text-[11px] font-semibold"
            style={reorder ? { background: "var(--soft)", color: "var(--gold)", borderColor: "var(--gold)" } : { ...cardS, color: "var(--muted)" }}>
            <Icon n="list" size={13} /> {reorder ? tr("Tayyor") : tr("Tartiblash")}
          </button>
        </div>

        {act.length === 0 && (
          <div className="py-2 text-center">
            <p className="text-[13px] font-semibold" style={{ color: "var(--ink)" }}>{tr("Bugunga vazifa yo'q")}</p>
            <p className="mx-auto mt-1 max-w-[16rem] text-[11.5px] leading-relaxed" style={lblS}>{tr("Pastdagi")} <b style={{ color: "var(--green)" }}>+</b> {tr("tugmasi orqali kundalik yoki oliy maqsad vazifasini qo'shing.")}</p>
          </div>
        )}
        {act.length > 0 && !reorder && (
          <div className="mb-2"><Hint id="mark" hints={p.hints} done={p.doneHint}
            text={tr("Vazifa katakchasini bossangiz — belgilash oynasi ochiladi: qildim, sababli yoki qilmadim.")} /></div>
        )}

        {reorder ? (
          <div className="space-y-1.5">
            <p className="text-[11px]" style={lblS}>{tr("Tartibni o'zgartiring — birinchi vazifa «Keyingi vazifa» kartasida chiqadi.")}</p>
            {act.map((t, i) => (
              <div key={t.id} className="flex items-center gap-2 rounded-xl border px-3 py-2" style={cardS}>
                <span className="w-5 flex-none text-center text-[11px] font-bold tabular-nums" style={lblS}>{i + 1}</span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium" style={{ color: "var(--ink)" }}>{t.name}</span>
                  <span className="block truncate text-[10px]" style={lblS}>{(t.type || "").trim() || tr("Turkumsiz")}</span>
                </span>
                <button onClick={() => moveTask(t.id, -1)} disabled={i === 0} className="om-press grid h-8 w-8 flex-none place-items-center rounded-lg" style={{ background: "var(--soft)", color: i === 0 ? "var(--muted)" : "var(--ink)", opacity: i === 0 ? 0.35 : 1 }}><Icon n="chevronUp" size={15} /></button>
                <button onClick={() => moveTask(t.id, 1)} disabled={i === act.length - 1} className="om-press grid h-8 w-8 flex-none place-items-center rounded-lg" style={{ background: "var(--soft)", color: i === act.length - 1 ? "var(--muted)" : "var(--ink)", opacity: i === act.length - 1 ? 0.35 : 1 }}><Icon n="chevronDown" size={15} /></button>
              </div>
            ))}
          </div>
        ) : !sched ? (
          <div className="grid grid-cols-3 gap-1.5">
            {pending.map((t, i) => <Cell key={t.id} t={t} first={i === 0} />)}
            {marked.map(t => <Cell key={t.id} t={t} />)}
          </div>
        ) : (
          <div className="space-y-1.5">
            {schedT.map(t => <SchedRow key={t.id} t={t} />)}
            {unsched.length > 0 && (
              <div className="mt-2 rounded-xl border p-2" style={{ ...cardS, borderColor: "var(--gold)" }}>
                <p className="mb-1.5 text-[11px] font-bold" style={{ color: "var(--gold)" }}>{tr("Vaqti belgilanmagan vazifalar:")}</p>
                {unsched.map(t => (
                  <div key={t.id} className="mb-1 flex items-center gap-1.5">
                    <span className="min-w-0 flex-1 truncate text-sm" style={{ color: "var(--ink)" }}>{t.name}</span>
                    <button onClick={() => setSchedTask(t)} className="rounded-lg border px-2 py-1 text-[11px]" style={{ ...cardS, color: "var(--green)" }}>{tr("vaqt berish")}</button>
                    <button onClick={() => pausePrompt(t)} className="rounded-lg border px-2 py-1 text-[11px]" style={{ ...cardS, color: "var(--gold)" }}>{tr("to'xtatish")}</button>
                  </div>
                ))}
              </div>
            )}
            <p className="text-[10px]" style={lblS}>{tr("Vaqtlar faqat reja uchun - belgilashni kun davomida istalgan payt qilasiz.")}</p>
          </div>
        )}
      </Sec>

      {CountBlock}

      {manualMetrics.map(m => {
        const cToday = (p.counts[m.id] || {})[today] || 0;
        const cTotal = Object.values(p.counts[m.id] || {}).reduce((a, b) => a + b, 0);
        return (
          <Card key={m.id} className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium" style={{ color: "var(--ink)" }}>{m.name}</div>
              <div className="text-[11px]" style={{ color: "var(--muted)" }}>{tr("Bugun")}: {cToday} - {tr("Jami")}: {cTotal}/{m.target}</div>
            </div>
            <div className="flex gap-2">
              {cToday > 0 && <button onClick={() => p.setCounts(cs => ({ ...cs, [m.id]: { ...(cs[m.id] || {}), [today]: Math.max(cToday - 1, 0) } }))} className="rounded-lg border px-3 py-1.5 text-sm" style={{ ...cardS, color: "var(--muted)" }}>-1</button>}
              <button onClick={() => p.setCounts(cs => ({ ...cs, [m.id]: { ...(cs[m.id] || {}), [today]: cToday + 1 } }))} className="rounded-lg px-3 py-1.5 text-sm font-bold text-white" style={{ background: "var(--green)" }}>+1</button>
            </div>
          </Card>
        );
      })}

      {SleepCard}

      <Sec id="extra" title={tr("Qo'shimcha ishlar")} icon="plus" accent="var(--gold)" ui={ui} setUi={setUi}
        right={todayExtras.length ? <span>{todayExtras.length} {tr("ta")}</span> : undefined}>
        <button onClick={() => setShowExtra(true)} className="w-full rounded-lg py-2 text-sm font-bold text-white" style={{ background: "var(--gold)" }}>{tr("Qo'shish")}</button>
        {todayExtras.map(e => (
          <div key={e.id} className="mt-2 flex justify-between rounded-lg border px-3 py-2 text-sm" style={cardS}>
            <span style={{ color: "var(--ink)" }}>{e.name}</span>
            <span style={{ color: "var(--muted)" }}>{fmtMin(e.minutes)}</span>
          </div>
        ))}
      </Sec>

      {quotesAt("bottom")}

      {NoteCard}
      <OyatCard />

      {showExtra && <ExtraForm tasks={act} onClose={() => setShowExtra(false)} today={today}
        onSave={({ name, minutes, taskId, type }) => {
          if (taskId) {
            // tanlangan vazifaga ziyoda hisoblanadi (pomodoro krediti kabi)
            p.setLogs(ls => {
              const day = { ...(ls[today] || {}) };
              const cur: MarkV5 = { ...(day[taskId] || {}) };
              const tk = act.find(x => x.id === taskId);
              const tmin = tk ? tk.minutes : 0;
              if (cur.st === "full" || cur.st === "extra") { cur.st = "extra"; cur.extraMin = (cur.extraMin || 0) + minutes; }
              else {
                cur.creditedMin = (cur.creditedMin || 0) + minutes;
                if (tmin > 0 && cur.creditedMin >= tmin) { cur.extraMin = Math.max(cur.creditedMin - tmin, 0) || undefined; cur.st = cur.extraMin ? "extra" : "full"; cur.creditedMin = tmin; }
              }
              day[taskId] = cur;
              return { ...ls, [today]: day };
            });
            // tarix uchun yozuv (counts:false — vazifa krediti orqali allaqachon hisobda)
            p.setExtras(xs => [...xs, { id: uid(), date: today, name, minutes, groupId: "", counts: false, type, taskId }]);
          } else {
            // mustaqil ish — soatlar hisobiga kiradi
            p.setExtras(xs => [...xs, { id: uid(), date: today, name, minutes, groupId: "", counts: true, type }]);
          }
          buzz();
          setShowExtra(false);
        }} />}

      {sheetTask && (() => {
        const slot = sched && sheetTask.schedFrom && sheetTask.schedTo ? hmToMin(sheetTask.schedTo) - hmToMin(sheetTask.schedFrom) : null;
        return <MarkSheet t={sheetTask} m={lg[sheetTask.id]} slotMin={slot} onClose={() => setSheetTask(null)}
          onSave={mk => { setMark(sheetTask.id, mk); setSheetTask(null); }} />;
      })()}

      {pauseTask && <PauseSheet name={pauseTask.name} onClose={() => setPauseTask(null)}
        onPick={n => { p.setTasks(ts => ts.map(x => x.id === pauseTask.id ? { ...x, pauses: [...x.pauses, { from: today, to: addDaysISO(today, n - 1) }] } : x)); setPauseTask(null); }} />}

      {schedTask && <SchedSheet t={schedTask} others={act} onClose={() => setSchedTask(null)}
        onSave={(f, t2) => { p.setTasks(ts => ts.map(x => x.id === schedTask.id ? { ...x, schedFrom: f || null, schedTo: t2 || null } : x)); setSchedTask(null); }} />}

      {noteTask && (
        <Modal title={`«${noteTask.name}» - xulosa`} onClose={() => setNoteTask(null)}>
          <textarea value={noteTxt} onChange={e => setNoteTxt(e.target.value)} rows={5} placeholder={tr("Fikringiz...")} className={inpC} style={inpS} />
          <button onClick={() => { if (noteTxt.trim()) { p.setTasks(ts => ts.map(x => x.id === noteTask.id ? { ...x, notes: [...x.notes, { date: today, text: noteTxt.trim() }] } : x)); setNoteTask(null); } }}
            className="mt-2 w-full rounded-lg py-2 text-sm font-bold text-white" style={{ background: "var(--green)" }}>{tr("Saqlash")}</button>
        </Modal>
      )}
    </div>
  );
}

function WeightCard({ onSave }: { onSave: (v: number) => void }) {
  const [kg, setKg] = useState("");
  return (
    <Card style={{ borderColor: "var(--green)" }}>
      <p className="mb-2 text-sm font-medium" style={{ color: "var(--ink)" }}>{tr("Hozirgi vazningiz qancha? (haftalik o'lchov)")}</p>
      <div className="flex gap-2">
        <input type="number" step="0.1" value={kg} onChange={e => setKg(e.target.value)} placeholder={tr("kg")} className={inpC + " flex-1"} style={inpS} />
        <button onClick={() => { const v = parseFloat(kg); if (v > 20 && v < 300) onSave(v); }} className="rounded-lg px-4 py-2 text-sm font-bold text-white" style={{ background: "var(--green)" }}>{tr("Saqlash")}</button>
      </div>
    </Card>
  );
}

function ExtraForm({ tasks, today, onClose, onSave }: { tasks: Task[]; today: string; onClose: () => void; onSave: (opts: { name: string; minutes: number; taskId: string | null; type: string }) => void }) {
  const [name, setName] = useState("");
  const [min, setMin] = useState("");
  const [taskId, setTaskId] = useState<string | null | "other">(null); // null=tanlanmagan, "other"=boshqa
  const [otherType, setOtherType] = useState("");
  const picked = taskId && taskId !== "other" ? tasks.find(t => t.id === taskId) : null;
  return (
    <Sheet onClose={onClose} title={tr("Qo'shimcha ish")}>
      <div className="space-y-3.5">
        <div>
          <p className="mb-1.5 text-[11px] font-semibold" style={lblS}>{tr("Nima ish qildingiz?")}</p>
          <input value={name} onChange={e => setName(e.target.value)} placeholder={tr("Masalan: qo'shimcha kitob o'qidim")} className="w-full rounded-xl border px-3.5 py-2.5 text-sm" style={inpS} />
        </div>
        <div>
          <p className="mb-1.5 text-[11px] font-semibold" style={lblS}>{tr("Qancha vaqtda?")}</p>
          <DurationField value={min} onChange={setMin} />
        </div>
        <div>
          <p className="mb-1.5 text-[11px] font-semibold" style={lblS}>{tr("Qaysi vazifaga tegishli?")}</p>
          <div className="space-y-1.5">
            {tasks.map(t => {
              const on = taskId === t.id;
              const acc = t.scope === "oliy" ? "var(--gold)" : "var(--green)";
              return (
                <button key={t.id} onClick={() => setTaskId(t.id)} className="om-press flex w-full items-center justify-between rounded-xl border px-3 py-2.5 text-left" style={on ? { borderColor: acc, background: "var(--soft)", borderWidth: 2 } : { ...cardS, borderWidth: 2 }}>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium" style={{ color: "var(--ink)" }}>{t.name}</span>
                    <span className="block text-[10px]" style={lblS}>{t.type || tr("Turkumsiz")}</span>
                  </span>
                  <Icon n={on ? "checkCircle" : "circle"} size={18} style={{ color: on ? acc : "var(--muted)", opacity: on ? 1 : 0.4, flex: "none" }} />
                </button>
              );
            })}
            <button onClick={() => setTaskId("other")} className="om-press flex w-full items-center justify-between rounded-xl border px-3 py-2.5 text-left" style={taskId === "other" ? { borderColor: "var(--blue)", background: "var(--soft)", borderWidth: 2 } : { ...cardS, borderWidth: 2 }}>
              <span className="text-sm font-medium" style={{ color: "var(--ink)" }}>{tr("Boshqa — mustaqil ish")}</span>
              <Icon n={taskId === "other" ? "checkCircle" : "circle"} size={18} style={{ color: taskId === "other" ? "var(--blue)" : "var(--muted)", opacity: taskId === "other" ? 1 : 0.4, flex: "none" }} />
            </button>
          </div>
        </div>
        {taskId === "other" && (
          <div>
            <p className="mb-1.5 text-[11px] font-semibold" style={lblS}>{tr("Turi")} <span style={{ color: "var(--muted)", fontWeight: 400 }}>{tr("(ixtiyoriy)")}</span></p>
            <input value={otherType} onChange={e => setOtherType(e.target.value)} placeholder={tr("Masalan: mutolaa, sport...")} className="w-full rounded-xl border px-3.5 py-2.5 text-sm" style={inpS} />
          </div>
        )}
        <button onClick={() => {
          const m = parseInt(min) || 0;
          if (!name.trim()) { omAlert(tr("Nima ish qilganingizni yozing.")); return; }
          if (m <= 0) { omAlert(tr("Qancha vaqt sarflaganingizni kiriting.")); return; }
          if (taskId === null) { omAlert(tr("Qaysi vazifaga tegishli ekanini tanlang (yoki «Boshqa»).")); return; }
          onSave({ name: name.trim(), minutes: m, taskId: taskId === "other" ? null : taskId, type: picked ? picked.type : otherType.trim() });
        }} className="om-press w-full rounded-2xl py-3.5 text-sm font-bold text-white" style={{ background: "var(--green)", boxShadow: "0 8px 20px rgba(46,125,87,0.28)" }}>{tr("Saqlash")}</button>
        <p className="text-[11px] leading-relaxed" style={lblS}>{tr("Vazifaga tegishli bo'lsa — o'sha vazifaga «ziyoda» qo'shiladi va statistikaga kiradi.")}</p>
      </div>
    </Sheet>
  );
}

// ================== TAQVIM ==================
function TaqvimView(p: { today: string; plan: Plan; tasks: Task[]; logs: Logs; extras: Extra[]; counts: Record<string, Record<string, number>>; countLog: CountLog; weights: Weight[]; notes: Record<string, string>; sleepLog: Record<string, number>; settings: Settings; ib: IbadatLog; khatm: KhatmCfg | null }) {
  const { plan } = p;
  const [ym, setYm] = useState(() => { const d = parseISO(p.today); return { y: d.getFullYear(), m: d.getMonth() }; });
  const [sel, setSel] = useState<string | null>(null);
  const first = new Date(ym.y, ym.m, 1);
  const daysIn = new Date(ym.y, ym.m + 1, 0).getDate();
  const lead = (first.getDay() - plan.weekStart + 7) % 7;
  const cells: (string | null)[] = [...Array(lead).fill(null), ...Array.from({ length: daysIn }, (_, i) => toISO(new Date(ym.y, ym.m, i + 1)))];
  const cols = Array.from({ length: 7 }, (_, i) => tr(KUN_QISQA[(plan.weekStart + i) % 7]));
  let g = 0, yl = 0, r = 0, sum = 0, n = 0;
  cells.forEach(c => {
    if (!c || c > p.today || c < plan.start || isRest(c, plan.restDay)) return;
    const s = dayStats(c, p.tasks, p.logs, plan.restDay);
    if (s.pct === null) return;
    if (s.pct >= 100) g++; else if (s.pct >= 40) yl++; else r++;
    sum += s.pct; n++;
  });
  // kun ranglari: 100%+ yashil · 40–99% sariq · 40% dan kam qizil · dam kuni rangsiz
  const color = (c: string) => {
    if (c > p.today || c < plan.start) return "transparent";
    const s = dayStats(c, p.tasks, p.logs, plan.restDay);
    if (s.pct === null || s.rest) return "transparent";
    if (s.pct >= 100) return "var(--green)";
    if (s.pct >= 40) return "var(--gold)";
    return "var(--red)";
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button onClick={() => setYm(v => v.m === 0 ? { y: v.y - 1, m: 11 } : { y: v.y, m: v.m - 1 })} className="om-press grid h-10 w-10 place-items-center rounded-xl border" style={{ ...cardS, color: "var(--ink)" }}><Icon n="chevronLeft" size={20} /></button>
        <div className="text-lg font-bold" style={{ color: "var(--ink)" }}>{tr(OYLAR[ym.m])} {ym.y}</div>
        <button onClick={() => setYm(v => v.m === 11 ? { y: v.y + 1, m: 0 } : { y: v.y, m: v.m + 1 })} className="om-press grid h-10 w-10 place-items-center rounded-xl border" style={{ ...cardS, color: "var(--ink)" }}><Icon n="chevronRight" size={20} /></button>
      </div>
      <Card>
        <div className="mb-2 grid grid-cols-7 gap-1 text-center text-[10px] font-semibold" style={{ color: "var(--muted)" }}>
          {cols.map((h, i) => <div key={i}>{h}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1.5">
          {cells.map((c, i) => c === null ? <div key={i} /> : (
            <button key={i} onClick={() => c <= p.today && c >= plan.start && setSel(c)}
              className="flex aspect-square flex-col items-center justify-center rounded-xl text-xs"
              style={{ border: "1px solid " + (c === p.today ? "var(--green)" : "var(--line)"), background: c === p.today ? "var(--soft)" : "transparent", color: "var(--ink)" }}>
              <span>{parseISO(c).getDate()}</span>
              {isRest(c, plan.restDay) && c >= plan.start && c <= p.today ? <Icon n="moon" size={10} style={{ color: "var(--muted)" }} /> :
                <span className="mt-0.5 h-1.5 w-1.5 rounded-full" style={{ background: color(c) }} />}
            </button>
          ))}
        </div>
        <p className="mt-3 flex flex-wrap gap-3 text-xs" style={{ color: "var(--muted)" }}>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full" style={{ background: "var(--green)" }} /> {g}</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full" style={{ background: "var(--gold)" }} /> {yl}</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full" style={{ background: "var(--red)" }} /> {r}</span>
          {n ? <span>{tr("umumiy")} {Math.round(sum / n)}%</span> : null}
        </p>
      </Card>
      {sel && <DayDetail date={sel} onClose={() => setSel(null)} {...p} />}
    </div>
  );
}

function DayDetail(p: { date: string; onClose: () => void; plan: Plan; tasks: Task[]; logs: Logs; extras: Extra[]; counts: Record<string, Record<string, number>>; countLog: CountLog; weights: Weight[]; notes: Record<string, string>; sleepLog: Record<string, number>; settings: Settings; ib: IbadatLog; khatm: KhatmCfg | null }) {
  const d = parseISO(p.date);
  const act = p.tasks.filter(t => t.kind !== "count" && taskActiveOn(t, p.date));
  const lg = p.logs[p.date] || {};
  const ex = p.extras.filter(e => e.date === p.date);
  const w = p.weights.find(x => x.date === p.date);
  const manual = p.plan.metrics.filter(m => m.kind === "manual" && ((p.counts[m.id] || {})[p.date] || 0) > 0);
  const countRows = p.tasks.filter(t => t.kind === "count" && ((p.countLog[t.id] || {})[p.date] || 0) > 0);
  const ibDay = p.ib[p.date];
  const sc = ibDay ? ibScore(ibDay, khatmActiveOn(p.khatm, p.date)) : null;
  const markTxt = (t: Task) => {
    const m = lg[t.id];
    if (!m || !m.st) {
      if (m && m.creditedMin && t.minutes > 0) return { txt: `◐ ${fmtMin(m.creditedMin)}`, c: "var(--gold)" };
      return { txt: "✗ Qilinmadi", c: "var(--red)" };
    }
    if (m.st === "full") return { txt: "✓ 100%", c: "var(--green)" };
    if (m.st === "extra") return { txt: `✚ 100% +${fmtMin(m.extraMin || 0)}`, c: "var(--green)" };
    if (m.st === "excused") return { txt: `Sababli (${m.excuseScore || "-"}/10)`, c: "var(--gold)" };
    return { txt: "✗ Qilinmadi", c: "var(--red)" };
  };
  return (
    <Modal title={`${d.getDate()}-${tr(OYLAR[d.getMonth()])} · ${hijri(p.date, p.settings.hijriOffset)} · ${tr(KUNLAR[d.getDay()])}`} onClose={p.onClose}>
      {sc && (
        <p className="mb-2 rounded-lg border p-2 text-sm" style={{ ...cardS, color: "var(--ink)" }}>
          Ibodat reytingi: <b style={{ color: "var(--green)" }}>{sc.pct}%{sc.bonus ? ` +${sc.bonus}` : ""}</b>
          {sc.masjid ? ` · masjidda ${sc.masjid} namoz` : ""}{ibDay && ibDay.khatm ? " · xatm bajarildi" : ""}
        </p>
      )}
      {isRest(p.date, p.plan.restDay) ? <p className="text-sm" style={{ color: "var(--muted)" }}>{tr("Dam kuni edi.")}</p> : act.length === 0 ? (
        <p className="text-sm" style={{ color: "var(--muted)" }}>{tr("Bu kunga vazifa yo'q edi.")}</p>
      ) : (
        <div className="space-y-1.5">
          {act.map(t => {
            const mt = markTxt(t);
            return (
              <div key={t.id} className="flex justify-between gap-2 rounded-lg border px-3 py-2 text-sm" style={cardS}>
                <span className="min-w-0 truncate" style={{ color: "var(--ink)" }}>{t.scope === "oliy" ? "⭐ " : ""}{t.name}</span>
                <span className="flex-none" style={{ color: mt.c }}>{mt.txt}</span>
              </div>
            );
          })}
        </div>
      )}
      {countRows.length > 0 && (
        <div className="mt-3">
          <p className="mb-1 text-xs font-bold" style={lblS}>{tr("SANALADIGAN")}</p>
          {countRows.map(t => <div key={t.id} className="text-sm" style={{ color: "var(--ink)" }}>{t.name}: +{(p.countLog[t.id] || {})[p.date]}</div>)}
        </div>
      )}
      {ex.length > 0 && (
        <div className="mt-3">
          <p className="mb-1 text-xs font-bold" style={lblS}>{tr("QO'SHIMCHA ISHLAR")}</p>
          {ex.map(e => <div key={e.id} className="text-sm" style={{ color: "var(--ink)" }}>➕ {e.name} — {fmtMin(e.minutes)}</div>)}
        </div>
      )}
      {manual.map(m => <p key={m.id} className="mt-2 text-sm" style={{ color: "var(--ink)" }}>{m.name}: {(p.counts[m.id] || {})[p.date]} {tr("ta")}</p>)}
      {w && <p className="mt-2 text-sm" style={{ color: "var(--ink)" }}>⚖️ Vazn: {w.kg} kg</p>}
      {p.sleepLog[p.date] !== undefined && <p className="mt-2 text-sm" style={{ color: "var(--ink)" }}>Uyqu: {p.sleepLog[p.date]} soat</p>}
      {p.notes[p.date] && <p className="mt-2 rounded-lg border p-2 text-sm italic" style={{ ...cardS, color: "var(--ink)" }}>✍️ {p.notes[p.date]}</p>}
      <p className="mt-3 text-[11px]" style={lblS}>{tr("O'tgan kunlar o'zgartirilmaydi.")}</p>
    </Modal>
  );
}

// ================== STATISTIKA ==================
// chiziqli grafik — har nuqta bir kun; nuqtaga bosilsa qaysi kun va qancha ekani chiqadi
function LineChart({ data, fmt }: { data: { d: string; v: number }[]; fmt: (n: number) => string }) {
  const [sel, setSel] = useState<number | null>(null);
  const W = 320, H = 118, PL = 6, PB = 6, PT = 10;
  const max = Math.max(...data.map(x => x.v), 1);
  const n = Math.max(data.length - 1, 1);
  const px = (i: number) => PL + (i / n) * (W - PL * 2);
  const py = (v: number) => PT + (1 - v / max) * (H - PT - PB);
  const line = data.map((x, i) => `${i ? "L" : "M"}${px(i).toFixed(1)},${py(x.v).toFixed(1)}`).join("");
  const area = data.length ? `${line}L${px(n).toFixed(1)},${H - PB}L${px(0).toFixed(1)},${H - PB}Z` : "";
  const s = sel === null ? data.length - 1 : sel;
  if (!data.length) return <p className="py-6 text-center text-[12px]" style={lblS}>{tr("Ma'lumot hali yo'q.")}</p>;
  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
        <path d={area} fill="var(--green)" opacity="0.12" />
        <path d={line} fill="none" stroke="var(--green)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        {data.map((x, i) => (
          <circle key={i} cx={px(i)} cy={py(x.v)} r={i === s ? 4.6 : 2.4} fill={i === s ? "var(--green)" : "var(--card)"} stroke="var(--green)" strokeWidth="1.7" />
        ))}
        {data.map((x, i) => (
          <rect key={"h" + i} x={px(i) - (W / n) / 2} y="0" width={W / n} height={H} fill="transparent" onClick={() => setSel(i)} />
        ))}
      </svg>
      <div className="mt-1.5 flex items-center justify-center gap-2 text-[11px]">
        <span style={lblS}>{fmtUz(data[s].d)}</span>
        <span className="font-bold" style={{ color: "var(--green)" }}>{fmt(data[s].v)}</span>
      </div>
    </div>
  );
}

// o'tgan davrga nisbatan farq
function Delta2({ now, prev, fmt }: { now: number; prev: number; fmt?: (n: number) => string }) {
  const d = now - prev;
  if (prev === 0 && now === 0) return <span className="text-[10px]" style={lblS}>{tr("ma'lumot yo'q")}</span>;
  if (d === 0) return <span className="text-[10px]" style={lblS}>{tr("o'zgarishsiz")}</span>;
  const f = fmt || ((x: number) => String(x));
  return (
    <span className="flex items-center justify-center gap-0.5 text-[10px] font-semibold" style={{ color: d > 0 ? "var(--green)" : "var(--muted)" }}>
      <Icon n={d > 0 ? "chevronUp" : "chevronDown"} size={11} />{f(Math.abs(d))}
    </span>
  );
}

function StatCard({ icon, tint, label, value, children }: { icon: string; tint: string; label: string; value: string; children?: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-3.5" style={{ background: "var(--soft)" }}>
      <div className="flex items-center gap-1.5">
        <Icon n={icon} size={13} style={{ color: tint }} />
        <span className="text-[10px] font-semibold" style={lblS}>{label}</span>
      </div>
      <div className="mt-1.5 text-[20px] font-bold leading-none" style={{ color: "var(--ink)" }}>{value}</div>
      {children && <div className="mt-1.5">{children}</div>}
    </div>
  );
}

function StatView(p: { today: string; plan: Plan; tasks: Task[]; logs: Logs; extras: Extra[]; folders: Folder[]; sleepCfg: SleepCfg | null; sleepLog: Record<string, number>; pomoLog: Record<string, { c: number; m: number }>; settings: Settings; ib: IbadatLog; khatm: KhatmCfg | null; countLog: CountLog }) {
  const { today, tasks, logs, plan } = p;
  const [tab, setTab] = useState<"kun" | "hafta" | "oy">("kun");
  const [sleepList, setSleepList] = useState(false);
  const [selTask, setSelTask] = useState<Task | null>(null);

  const dm = (d: string) => dayMinutes(d, tasks, logs, p.extras);
  const clampDay = (d: string) => d > today ? today : d;

  // davr bo'yicha bitta vazifaning bajarilish foizi
  const taskPct = (t: Task, from: string, to: string) => {
    let a = 0, done = 0;
    for (let x = from; x <= clampDay(to); x = addDaysISO(x, 1)) {
      if (isRest(x, plan.restDay) || !taskActiveOn(t, x)) continue;
      a++;
      const m = (logs[x] || {})[t.id];
      if (m && (m.st === "full" || m.st === "extra")) done++;
    }
    return a >= 2 ? { pct: Math.round((done / a) * 100), a } : null;
  };
  const bestWorst = (from: string, to: string) => {
    const rows = tasks.filter(t => t.kind !== "count" && !t.isSleep && !t.archivedAt)
      .map(t => ({ t, r: taskPct(t, from, to) })).filter(x => x.r !== null) as { t: Task; r: { pct: number; a: number } }[];
    if (!rows.length) return { best: null, worst: null };
    const sorted = [...rows].sort((a, b) => b.r.pct - a.r.pct);
    return { best: sorted[0], worst: sorted.length > 1 ? sorted[sorted.length - 1] : null };
  };
  // davr bo'yicha jami: vaqt, bajarilgan, ziyoda
  const agg = (from: string, to: string) => {
    let min = 0, done = 0, extra = 0;
    for (let d = from; d <= clampDay(to); d = addDaysISO(d, 1)) {
      min += dm(d);
      const lg = logs[d] || {};
      tasks.forEach(t => {
        if (t.kind === "count" || !taskActiveOn(t, d)) return;
        const m = lg[t.id];
        if (!m) return;
        if (m.st === "full" || m.st === "extra") done++;
        if (m.st === "extra") extra += m.extraMin || 0;
      });
      p.extras.forEach(e => { if (e.date === d && e.taskId) extra += e.minutes; });
    }
    return { min, done, extra };
  };

  const Tabs = (
    <div className="flex gap-1.5 rounded-2xl p-1" style={{ background: "var(--soft)" }}>
      {([["kun", tr("Kunlik")], ["hafta", tr("Haftalik")], ["oy", tr("Oylik")]] as const).map(([k, n]) => (
        <button key={k} onClick={() => setTab(k)} className="om-press flex-1 rounded-xl py-2 text-[13px] font-semibold"
          style={tab === k ? { background: "var(--green)", color: "#fff" } : { color: "var(--muted)" }}>{n}</button>
      ))}
    </div>
  );

  // ==================== KUNLIK ====================
  const KunSec = () => {
    const st = dayStats(today, tasks, logs, plan.restDay);
    const yd = addDaysISO(today, -1);
    const yst = dayStats(yd, tasks, logs, plan.restDay);
    const pct = st.pct === null ? 0 : st.pct;
    const total = Math.max(st.counted - st.excused, 0);
    const tMin = dm(today), yMin = dm(yd);
    const chart = Array.from({ length: 14 }, (_, i) => { const d = addDaysISO(today, -(13 - i)); return { d, v: dm(d) }; });
    let full7 = 0;
    for (let i = 0; i < 7; i++) { const d = addDaysISO(today, -i); const s = dayStats(d, tasks, logs, plan.restDay); if (s.pct !== null && s.pct >= 100) full7++; }
    const msg = st.pct === null ? { t: tr("Bugun dam kuni — halovat oling"), i: "moon" }
      : pct >= 100 ? { t: tr("Ajoyib — bugungi reja to'liq bajarildi"), i: "checkCircle" }
      : pct >= 70 ? { t: tr("Yaxshi ketyapsiz, oz qoldi"), i: "sparkles" }
      : pct >= 40 ? { t: tr("Yarmidan oshdingiz — davom eting"), i: "target" }
      : { t: tr("Kun hali tugagani yo'q"), i: "clock" };
    const R = 74, C = 2 * Math.PI * R;
    return (
      <>
        <Card className="flex flex-col items-center py-6">
          <div className="relative" style={{ width: 168, height: 168 }}>
            <svg viewBox="0 0 168 168" className="h-full w-full" style={{ transform: "rotate(-90deg)" }}>
              <circle cx="84" cy="84" r={R} fill="none" stroke="var(--soft)" strokeWidth="12" />
              <circle cx="84" cy="84" r={R} fill="none" stroke="var(--green)" strokeWidth="12" strokeLinecap="round"
                strokeDasharray={`${C * Math.min(pct / 100, 1)} ${C}`} style={{ transition: "stroke-dasharray .6s ease" }} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[42px] font-bold leading-none" style={{ color: "var(--ink)" }}>{pct}<span className="text-[20px]">%</span></span>
              <span className="mt-1.5 text-[11px] font-medium" style={lblS}>{tr("Bugungi natija")}</span>
            </div>
          </div>
          <p className="mt-4 flex items-center gap-1.5 text-[13px] font-semibold" style={{ color: "var(--green)" }}>
            <Icon n={msg.i} size={15} /> {msg.t}
          </p>
        </Card>

        <Card>
          <h3 className="mb-2 text-[11px] font-bold uppercase tracking-wider" style={lblS}>{tr("Kunlik faollik — 14 kun")}</h3>
          <LineChart data={chart} fmt={fmtMin} />
        </Card>

        <div className="grid grid-cols-2 gap-2.5">
          <StatCard icon="checkCircle" tint="var(--green)" label={tr("Bajarilgan vazifalar")} value={`${st.done}/${total}`}>
            <Delta2 now={st.done} prev={yst.done} />
          </StatCard>
          <StatCard icon="clock" tint="var(--gold)" label={tr("Umumiy vaqt")} value={fmtMin(tMin)}>
            <Delta2 now={tMin} prev={yMin} fmt={fmtMin} />
          </StatCard>
        </div>

        <p className="px-1 text-center text-[11px]" style={lblS}>
          Oxirgi 7 kunda <b style={{ color: "var(--ink)" }}>{full7} kun</b> {tr("to'liq bajarilgan.")}
        </p>
      </>
    );
  };

  // ==================== HAFTALIK ====================
  const HaftaSec = () => {
    const ws = weekStartOf(today, plan.weekStart);
    const we = addDaysISO(ws, 6);
    const pws = addDaysISO(ws, -7), pwe = addDaysISO(ws, -1);
    const avg = periodAvg(ws, clampDay(we), tasks, logs, plan.restDay);
    const pavg = periodAvg(pws, pwe, tasks, logs, plan.restDay);
    const a = agg(ws, we), pa = agg(pws, pwe);
    const bw = bestWorst(ws, we);
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = addDaysISO(ws, i);
      const s = dayStats(d, tasks, logs, plan.restDay);
      return { d, lbl: tr(KUN_QISQA[parseISO(d).getDay()]), pct: s.pct, rest: s.rest, future: d > today };
    });
    // uyqu
    const slp: { d: string; h: number }[] = [];
    for (let i = 0; i < 7; i++) { const d = addDaysISO(ws, i); if (d <= today && p.sleepLog[d] !== undefined) slp.push({ d, h: p.sleepLog[d] }); }
    const sAvg = slp.length ? Math.round((slp.reduce((x, y) => x + y.h, 0) / slp.length) * 10) / 10 : null;
    // ibodat
    let ibSum = 0, ibN = 0, masjid = 0, nafl = 0;
    for (let i = 0; i < 7; i++) {
      const d = addDaysISO(ws, i); if (d > today) break;
      const e = p.ib[d]; if (!e) continue;
      const s = ibScore(e, khatmActiveOn(p.khatm, d));
      ibSum += s.pct; ibN++; masjid += s.masjid; nafl += (e.tahajjud || 0) + (e.nafl || 0);
    }
    // turlar
    const byType: Record<string, number> = {};
    for (let d = ws; d <= clampDay(we); d = addDaysISO(d, 1)) {
      const lg = logs[d] || {};
      tasks.forEach(t => { if (!t.countsHours || t.kind === "count") return; const m = markMinutes(t, lg[t.id]); if (m > 0) { const k = (t.type || "").trim() || "Turkumsiz"; byType[k] = (byType[k] || 0) + m; } });
    }
    const types = Object.keys(byType).map(k => ({ k, v: byType[k] })).sort((x, y) => y.v - x.v);
    const typeTotal = types.reduce((x, y) => x + y.v, 0);
    return (
      <>
        <Card>
          <p className="text-[11px] font-semibold" style={lblS}>{fmtUz(ws)} — {fmtUz(we)}</p>
          <div className="mt-1 flex items-end gap-2">
            <span className="text-[36px] font-bold leading-none" style={{ color: "var(--ink)" }}>{avg === null ? "—" : `${avg}%`}</span>
            {avg !== null && pavg !== null && <span className="mb-1"><Delta2 now={avg} prev={pavg} fmt={n => `${n}%`} /></span>}
          </div>
          <p className="mt-1 text-[11px]" style={lblS}>{tr("haftalik o'rtacha natija")}</p>
          <div className="mt-4 flex items-end justify-between gap-1.5" style={{ height: 92 }}>
            {days.map(x => {
              const h = x.pct === null ? 4 : Math.max(Math.round((Math.min(x.pct, 100) / 100) * 78), 5);
              const col = x.rest || x.future || x.pct === null ? "var(--soft)" : x.pct >= 100 ? "var(--green)" : x.pct >= 40 ? "var(--gold)" : "var(--red)";
              return (
                <div key={x.d} className="flex flex-1 flex-col items-center gap-1.5">
                  <div className="w-full rounded-lg" style={{ height: h, background: col }} />
                  <span className="text-[9px] font-semibold" style={{ color: x.d === today ? "var(--green)" : "var(--muted)" }}>{x.lbl}</span>
                </div>
              );
            })}
          </div>
        </Card>

        <div className="grid grid-cols-3 gap-2">
          <StatCard icon="clock" tint="var(--gold)" label={tr("Jami vaqt")} value={fmtMin(a.min)}><Delta2 now={a.min} prev={pa.min} fmt={fmtMin} /></StatCard>
          <StatCard icon="checkCircle" tint="var(--green)" label={tr("Bajarildi")} value={String(a.done)}><Delta2 now={a.done} prev={pa.done} /></StatCard>
          <StatCard icon="sparkles" tint="var(--blue)" label={tr("Ziyoda")} value={fmtMin(a.extra)}><Delta2 now={a.extra} prev={pa.extra} fmt={fmtMin} /></StatCard>
        </div>

        {(bw.best || bw.worst) && (
          <div className="grid grid-cols-2 gap-2.5">
            {bw.best && (
              <div className="rounded-2xl border p-3" style={{ ...cardS, borderInlineStartWidth: 3, borderInlineStartColor: "var(--green)" }}>
                <p className="text-[10px] font-semibold" style={lblS}>{tr("Kuchli tomon")}</p>
                <p className="mt-1 truncate text-[13px] font-bold" style={{ color: "var(--ink)" }}>{bw.best.t.name}</p>
                <p className="text-[12px] font-bold" style={{ color: "var(--green)" }}>{bw.best.r.pct}%</p>
              </div>
            )}
            {bw.worst && (
              <div className="rounded-2xl border p-3" style={{ ...cardS, borderInlineStartWidth: 3, borderInlineStartColor: "var(--gold)" }}>
                <p className="text-[10px] font-semibold" style={lblS}>{tr("E'tibor bering")}</p>
                <p className="mt-1 truncate text-[13px] font-bold" style={{ color: "var(--ink)" }}>{bw.worst.t.name}</p>
                <p className="text-[12px] font-bold" style={{ color: "var(--gold)" }}>{bw.worst.r.pct}%</p>
              </div>
            )}
          </div>
        )}

        <Card>
          <div className="mb-2 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-[13px] font-bold" style={{ color: "var(--ink)" }}><Icon n="moon" size={15} style={{ color: "var(--blue)" }} /> {tr("Uyqu")}</h3>
            <button onClick={() => setSleepList(true)} className="om-press text-[11px] font-semibold" style={{ color: "var(--blue)" }}>{tr("Uyqu kundaligi")}</button>
          </div>
          {sAvg === null ? <p className="text-[12px]" style={lblS}>{tr("Bu hafta uyqu yozilmagan.")}</p> : (
            <p className="text-[13px]" style={{ color: "var(--ink)" }}>
              O'rtacha <b>{sAvg} soat</b>
              {p.sleepCfg ? <span style={lblS}> · reja {p.sleepCfg.hours} soat</span> : null}
            </p>
          )}
        </Card>

        <Card>
          <h3 className="mb-2 flex items-center gap-2 text-[13px] font-bold" style={{ color: "var(--ink)" }}><Icon n="mosque" size={15} style={{ color: "var(--green)" }} /> {tr("Ibodat")}</h3>
          {ibN === 0 ? <p className="text-[12px]" style={lblS}>{tr("Bu hafta ibodat belgilanmagan.")}</p> : (
            <div className="flex gap-4 text-[12px]" style={{ color: "var(--ink)" }}>
              <span>{tr("O'rtacha:")} <b style={{ color: "var(--green)" }}>{Math.round(ibSum / ibN)}%</b></span>
              <span style={lblS}>{tr("Masjid:")} <b style={{ color: "var(--ink)" }}>{masjid}</b></span>
              <span style={lblS}>{tr("Nafl:")} <b style={{ color: "var(--ink)" }}>{nafl}</b></span>
            </div>
          )}
        </Card>

        <Card>
          <h3 className="mb-2.5 flex items-center gap-2 text-[13px] font-bold" style={{ color: "var(--ink)" }}><Icon n="folder" size={15} style={{ color: "var(--gold)" }} /> {tr("Vaqt qayerga ketdi")}</h3>
          {types.length === 0 ? <p className="text-[12px]" style={lblS}>{tr("Bu hafta vaqt yozilmagan.")}</p> : types.slice(0, 6).map(x => (
            <div key={x.k} className="mb-2">
              <div className="mb-1 flex justify-between text-[12px]">
                <span style={{ color: "var(--ink)" }}>{x.k}</span>
                <span className="font-semibold" style={lblS}>{fmtMin(x.v)} · {Math.round((x.v / typeTotal) * 100)}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full" style={{ background: "var(--soft)" }}>
                <div className="h-full rounded-full" style={{ width: `${(x.v / typeTotal) * 100}%`, background: "var(--gold)" }} />
              </div>
            </div>
          ))}
        </Card>
      </>
    );
  };

  // ==================== OYLIK ====================
  const OySec = () => {
    const dt = parseISO(today), y = dt.getFullYear(), mo = dt.getMonth();
    const ms = toISO(new Date(y, mo, 1)), me = toISO(new Date(y, mo + 1, 0));
    const pms = toISO(new Date(y, mo - 1, 1)), pme = toISO(new Date(y, mo, 0));
    const avg = periodAvg(ms, clampDay(me), tasks, logs, plan.restDay);
    const pavg = periodAvg(pms, pme, tasks, logs, plan.restDay);
    const a = agg(ms, me), pa = agg(pms, pme);
    const bw = bestWorst(ms, me);
    const chart: { d: string; v: number }[] = [];
    for (let d = ms; d <= clampDay(me); d = addDaysISO(d, 1)) chart.push({ d, v: dm(d) });
    // haftalar taqqoslashi
    const weeks: { n: string; v: number | null }[] = [];
    for (let i = 0; i < 5; i++) {
      const from = addDaysISO(ms, i * 7);
      if (from > me) break;
      const to = addDaysISO(from, 6) > me ? me : addDaysISO(from, 6);
      weeks.push({ n: `${i + 1}-${tr("hafta")}`, v: periodAvg(from, clampDay(to), tasks, logs, plan.restDay) });
    }
    // rekordlar faqat oyning oxirgi dam kunida
    const dim = new Date(y, mo + 1, 0).getDate();
    let lastRest = "";
    for (let d = 1; d <= dim; d++) { const iso = toISO(new Date(y, mo, d)); if (plan.restDay === null ? d === dim : isRest(iso, plan.restDay)) lastRest = iso; }
    const showRec = today === lastRest;
    let bestDay = { d: "", v: 0 }, totalMin = 0, doneAll = 0;
    for (let d = ms; d <= clampDay(me); d = addDaysISO(d, 1)) { const v = dm(d); totalMin += v; if (v > bestDay.v) bestDay = { d, v }; }
    tasks.forEach(t => { if (t.scope === "oliy" && t.completedAt && t.completedAt >= ms && t.completedAt <= me) doneAll++; });
    return (
      <>
        <Card>
          <p className="text-[11px] font-semibold" style={lblS}>{tr(OYLAR[mo])} {y}</p>
          <div className="mt-1 flex items-end gap-2">
            <span className="text-[36px] font-bold leading-none" style={{ color: "var(--ink)" }}>{avg === null ? "—" : `${avg}%`}</span>
            {avg !== null && pavg !== null && <span className="mb-1"><Delta2 now={avg} prev={pavg} fmt={n => `${n}%`} /></span>}
          </div>
          <p className="mt-1 text-[11px]" style={lblS}>{tr("oylik o'rtacha natija")}</p>
        </Card>

        <Card>
          <h3 className="mb-2 text-[11px] font-bold uppercase tracking-wider" style={lblS}>{tr("Kunlik faollik")}</h3>
          <LineChart data={chart} fmt={fmtMin} />
        </Card>

        <Card>
          <h3 className="mb-3 text-[11px] font-bold uppercase tracking-wider" style={lblS}>{tr("Haftalar taqqoslashi")}</h3>
          <div className="flex items-end justify-between gap-2" style={{ height: 96 }}>
            {weeks.map(w => {
              const h = w.v === null ? 4 : Math.max(Math.round((Math.min(w.v, 100) / 100) * 78), 5);
              const col = w.v === null ? "var(--soft)" : w.v >= 100 ? "var(--green)" : w.v >= 40 ? "var(--gold)" : "var(--red)";
              return (
                <div key={w.n} className="flex flex-1 flex-col items-center gap-1.5">
                  <span className="text-[9px] font-bold" style={lblS}>{w.v === null ? "" : `${w.v}%`}</span>
                  <div className="w-full rounded-lg" style={{ height: h, background: col }} />
                  <span className="text-[9px]" style={lblS}>{w.n}</span>
                </div>
              );
            })}
          </div>
        </Card>

        <div className="grid grid-cols-3 gap-2">
          <StatCard icon="clock" tint="var(--gold)" label={tr("Jami vaqt")} value={fmtMin(a.min)}><Delta2 now={a.min} prev={pa.min} fmt={fmtMin} /></StatCard>
          <StatCard icon="checkCircle" tint="var(--green)" label={tr("Bajarildi")} value={String(a.done)}><Delta2 now={a.done} prev={pa.done} /></StatCard>
          <StatCard icon="sparkles" tint="var(--blue)" label={tr("Ziyoda")} value={fmtMin(a.extra)}><Delta2 now={a.extra} prev={pa.extra} fmt={fmtMin} /></StatCard>
        </div>

        {(bw.best || bw.worst) && (
          <div className="grid grid-cols-2 gap-2.5">
            {bw.best && (
              <div className="rounded-2xl border p-3" style={{ ...cardS, borderInlineStartWidth: 3, borderInlineStartColor: "var(--green)" }}>
                <p className="text-[10px] font-semibold" style={lblS}>{tr("Kuchli tomon")}</p>
                <p className="mt-1 truncate text-[13px] font-bold" style={{ color: "var(--ink)" }}>{bw.best.t.name}</p>
                <p className="text-[12px] font-bold" style={{ color: "var(--green)" }}>{bw.best.r.pct}%</p>
              </div>
            )}
            {bw.worst && (
              <div className="rounded-2xl border p-3" style={{ ...cardS, borderInlineStartWidth: 3, borderInlineStartColor: "var(--gold)" }}>
                <p className="text-[10px] font-semibold" style={lblS}>{tr("E'tibor bering")}</p>
                <p className="mt-1 truncate text-[13px] font-bold" style={{ color: "var(--ink)" }}>{bw.worst.t.name}</p>
                <p className="text-[12px] font-bold" style={{ color: "var(--gold)" }}>{bw.worst.r.pct}%</p>
              </div>
            )}
          </div>
        )}

        {showRec ? (
          <Card style={{ borderColor: "var(--gold)" }}>
            <h3 className="mb-2.5 flex items-center gap-2 text-[13px] font-bold" style={{ color: "var(--ink)" }}><Icon n="trophy" size={16} style={{ color: "var(--gold)" }} /> {tr("Oylik yakun")}</h3>
            <div className="space-y-1.5 text-[12.5px]" style={{ color: "var(--ink)" }}>
              <p>{tr("Jami ishlangan vaqt:")} <b>{fmtMin(totalMin)}</b></p>
              <p>{tr("Eng samarali kun:")} <b>{bestDay.d ? `${fmtUz(bestDay.d)} — ${fmtMin(bestDay.v)}` : "—"}</b></p>
              <p>{tr("Tugatilgan oliy vazifalar:")} <b>{doneAll}</b></p>
            </div>
          </Card>
        ) : (
          <p className="px-1 text-center text-[11px]" style={lblS}>{tr("Oylik yakun oyning oxirgi dam kunida ochiladi.")}</p>
        )}
      </>
    );
  };

  // hali ma'lumot yo'q — bo'sh ekran o'zini tushuntiradi
  if (Object.keys(logs).length === 0 && tasks.filter(t => !t.isSleep).length === 0) {
    return (
      <Card className="text-center">
        <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl" style={{ background: "var(--soft)", color: "var(--green)" }}><Icon n="stats" size={22} /></div>
        <p className="text-sm font-bold" style={{ color: "var(--ink)" }}>{tr("Statistika hali bo'sh")}</p>
        <p className="mx-auto mt-1 max-w-[18rem] text-[12px] leading-relaxed" style={lblS}>
          {tr("Vazifa qo'shib, bir necha kun belgilab boring — natijalar, grafiklar va haftalik hisobot shu yerda ko'rinadi.")}
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {Tabs}
      {tab === "kun" && <KunSec />}
      {tab === "hafta" && <HaftaSec />}
      {tab === "oy" && <OySec />}
      {selTask && <TaskDetailStat t={selTask} onClose={() => setSelTask(null)} today={today} logs={logs} plan={plan} />}
      {sleepList && <UyquKundaligi today={today} plan={plan} sleepLog={p.sleepLog} sleepCfg={p.sleepCfg} onClose={() => setSleepList(false)} />}
    </div>
  );
}

// uyqu kundaligi — qaysi kuni necha soat uxlagani
function UyquKundaligi({ today, plan, sleepLog, sleepCfg, onClose }: { today: string; plan: Plan; sleepLog: Record<string, number>; sleepCfg: SleepCfg | null; onClose: () => void }) {
  const rows = Object.keys(sleepLog).filter(d => d <= today).sort().reverse().slice(0, 40);
  return (
    <Sheet title={<span className="flex items-center gap-2"><Icon n="moon" size={16} style={{ color: "var(--blue)" }} /> {tr("Uyqu kundaligi")}</span>} onClose={onClose}>
      {rows.length === 0 ? <p className="text-[12px]" style={lblS}>{tr("Hali uyqu yozuvi yo'q.")}</p> : (
        <div className="space-y-1.5">
          {sleepCfg && <p className="mb-2 text-[11px]" style={lblS}>{tr("Reja")}: {sleepCfg.hours} {tr("soat. Rejadan kam uxlash yuqori baholanadi.")}</p>}
          {rows.map(d => {
            const h = sleepLog[d];
            const diff = sleepCfg ? Math.round((sleepCfg.hours - h) * 10) / 10 : null;
            const col = diff === null ? "var(--muted)" : diff > 0 ? "var(--green)" : diff === 0 ? "var(--ink)" : "var(--gold)";
            return (
              <div key={d} className="flex items-center gap-3 rounded-xl border px-3 py-2.5" style={cardS}>
                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] font-medium" style={{ color: "var(--ink)" }}>{fmtUz(d)}</span>
                  <span className="block text-[10px]" style={lblS}>{tr(KUNLAR[parseISO(d).getDay()])}</span>
                </span>
                <span className="flex-none text-[14px] font-bold tabular-nums" style={{ color: col }}>{h} soat</span>
                {diff !== null && <span className="w-16 flex-none text-right text-[10px]" style={lblS}>{diff > 0 ? `${diff} kam` : diff === 0 ? "rejada" : `${-diff} ko'p`}</span>}
              </div>
            );
          })}
        </div>
      )}
    </Sheet>
  );
}

function TaskDetailStat({ t, onClose, today, logs, plan }: { t: Task; onClose: () => void; today: string; logs: Logs; plan: Plan }) {
  let actD = 0, done = 0, exc = 0, run = 0, best = 0;
  const wd: { a: number; d: number }[] = Array.from({ length: 7 }, () => ({ a: 0, d: 0 }));
  for (let d = t.startDate; d <= today; d = addDaysISO(d, 1)) {
    if (isRest(d, plan.restDay) || !taskActiveOn(t, d)) continue;
    actD++;
    const w = parseISO(d).getDay();
    wd[w].a++;
    const m = (logs[d] || {})[t.id];
    if (m && (m.st === "full" || m.st === "extra")) { done++; run++; if (run > best) best = run; wd[w].d++; }
    else if (m && m.st === "excused") exc++;
    else if (d !== today) run = 0;
  }
  const pct = actD - exc > 0 ? Math.round((done / (actD - exc)) * 100) : null;
  const cells: { d: string; bg: string }[] = [];
  for (let i = 89; i >= 0; i--) {
    const d = addDaysISO(today, -i);
    let bg = "var(--line)";
    if (d >= t.startDate && !isRest(d, plan.restDay) && taskActiveOn(t, d)) {
      const m = (logs[d] || {})[t.id];
      if (m && (m.st === "full" || m.st === "extra")) bg = "var(--green)";
      else if (m && m.st === "excused") bg = "var(--gold)";
      else if (m && m.creditedMin && t.minutes > 0) bg = `linear-gradient(to top, var(--green) ${Math.round(markFrac(t, m) * 100)}%, var(--line) 0)`;
      else bg = "var(--red)";
    }
    cells.push({ d, bg });
  }
  const wdOrder = Array.from({ length: 7 }, (_, i) => (plan.weekStart + i) % 7).filter(i => i !== plan.restDay);
  return (
    <Sheet title={t.name} onClose={onClose}>
      <div className="space-y-1 text-sm" style={{ color: "var(--ink)" }}>
        {t.type && <p>{tr("Turi:")} <b>{t.type}</b></p>}
        <p>{tr("Bajarildi:")} <b>{done}/{actD}</b> {tr("kun · Umumiy:")} <b>{pct === null ? "—" : pct + "%"}</b></p>
        <p>Sababli: {exc} marta (joriy 30 kunlik: {excused30(t.id, logs, today)}/3)</p>
      </div>
      <p className="mb-1 mt-3 text-xs font-bold" style={lblS}>{tr("OXIRGI 90 KUN")}</p>
      <div className="grid gap-[3px]" style={{ gridTemplateColumns: "repeat(18, 1fr)" }}>
        {cells.map((c, i) => <div key={i} title={fmtUz(c.d)} className="aspect-square rounded-sm" style={{ background: c.bg }} />)}
      </div>
      <div className="mt-3">
        <p className="mb-1 text-xs font-bold" style={lblS}>{tr("HAFTA KUNLARI BO'YICHA")}</p>
        {wdOrder.map(i => wd[i].a > 0 && (
          <div key={i} className="mb-1 flex items-center gap-2 text-xs" style={{ color: "var(--ink)" }}>
            <span className="w-20">{tr(KUNLAR[i])}</span>
            <div className="h-2 flex-1 overflow-hidden rounded-full" style={{ background: "var(--line)" }}>
              <div className="h-full rounded-full" style={{ width: `${Math.round((wd[i].d / wd[i].a) * 100)}%`, background: "var(--green)" }} />
            </div>
            <span className="w-9 text-right">{Math.round((wd[i].d / wd[i].a) * 100)}%</span>
          </div>
        ))}
      </div>
    </Sheet>
  );
}

// ================== OLIY MAQSAD ==================
function MaqsadView(p: {
  today: string; plan: Plan; tasks: Task[]; logs: Logs; extras: Extra[];
  counts: Record<string, Record<string, number>>; countLog: CountLog; weights: Weight[];
  setPlan: React.Dispatch<React.SetStateAction<Plan | null>>;
}) {
  const { today, plan, weights } = p;
  const [editGoal, setEditGoal] = useState(false);
  const [goalTxt, setGoalTxt] = useState(plan.goal);
  const [editM, setEditM] = useState(false);
  const [detailM, setDetailM] = useState<Metric | null>(null);
  const [showHist, setShowHist] = useState(false);
  const totalDay = diffDays(plan.start, today) + 1;
  const yearNum = Math.min(Math.floor((totalDay - 1) / 365) + 1, plan.years);
  const ys = addDaysISO(plan.start, 365 * (yearNum - 1));
  const ye = addDaysISO(ys, 364);
  const dayN = diffDays(ys, today) + 1;
  const elapsed = Math.min(Math.round((dayN / 365) * 100), 100);

  const metricVal = (m: Metric, from: string, to: string) => {
    if (m.kind === "type") return p.tasks.filter(t => t.scope === "oliy" && t.completedAt && t.type === m.typeName && t.completedAt >= from && t.completedAt <= to).length;
    return Object.keys(p.counts[m.id] || {}).filter(d => d >= from && d <= to).reduce((a, d) => a + (p.counts[m.id] || {})[d], 0);
  };

  // ko'rsatkichga tegishli oliy vazifalar (tugallanganlar + jarayondagilar)
  const metricTasks = (m: Metric) => m.kind === "type"
    ? p.tasks.filter(t => t.scope === "oliy" && t.type === m.typeName && !t.abandonedAt)
    : [];
  // bitta jarayondagi vazifaning qay darajada bajarilgani (0..0.95) — kunlik mehnat ham foizga hissa qo'shadi
  const taskFrac = (t: Task) => {
    if (t.completedAt) return 1;
    if (t.kind === "count") {
      const tot = Object.values(p.countLog[t.id] || {}).reduce((a, b) => a + b, 0);
      return t.countTarget ? Math.min(tot / t.countTarget, 0.95) : 0;
    }
    let worked = 0;
    Object.keys(p.logs).forEach(d => {
      const mk = p.logs[d][t.id];
      if (mk && (mk.st === "full" || mk.st === "extra")) worked++;
    });
    const planDays = t.plannedDays || (t.endDate ? diffDays(t.startDate, t.endDate) + 1 : 0);
    return planDays > 0 ? Math.min(worked / planDays, 0.95) : 0;
  };
  // jarayondagi vazifalarning qisman hissasi
  const metricPartial = (m: Metric) => metricTasks(m).filter(t => !t.completedAt).reduce((a, t) => a + taskFrac(t), 0);

  const bars = plan.metrics.map(m => ({ n: m.name, v: metricVal(m, ys, ye), pv: Math.round(metricPartial(m) * 10) / 10, t: m.target, m: m as Metric | null }));
  const startW = weights.length ? weights[0].kg : null;
  const lastW = weights.length ? weights[weights.length - 1].kg : null;
  const lost = startW !== null && lastW !== null ? Math.round((startW - lastW) * 10) / 10 : 0;
  const allBars = plan.weightOn ? [...bars, { n: tr("Vazn kamayishi (kg)"), v: Math.max(lost, 0), pv: 0, t: plan.weightTarget, m: null as Metric | null }] : bars;
  const planPct = allBars.length ? Math.round(allBars.reduce((a, b) => a + Math.min((b.v + b.pv) / (b.t || 1), 1), 0) / allBars.length * 100) : 0;

  // soatlar: kundalik / oliy (ziyoda va qismiy bilan)
  let dailyMin = 0, oliyMin = 0;
  Object.keys(p.logs).forEach(d => {
    if (d < ys || d > ye) return;
    const lg = p.logs[d];
    Object.keys(lg).forEach(tid => {
      const t = p.tasks.find(x => x.id === tid);
      if (t && t.countsHours) {
        const mm = markMinutes(t, lg[tid]);
        if (t.scope === "oliy") oliyMin += mm; else dailyMin += mm;
      }
    });
  });
  p.extras.forEach(e => { if (e.counts && e.date >= ys && e.date <= ye) dailyMin += e.minutes; });

  const wPts = weights.slice(-20);
  let wPath = "";
  if (wPts.length > 1) {
    const mn = Math.min(...wPts.map(w => w.kg)), mx = Math.max(...wPts.map(w => w.kg));
    wPath = wPts.map((w, i) => `${i === 0 ? "M" : "L"} ${(i / (wPts.length - 1)) * 280 + 10} ${mx === mn ? 40 : 10 + ((w.kg - mn) / (mx - mn)) * 60}`).join(" ");
  }

  // haftalik hisob (barcha oliy vazifalar bo'yicha umumiy)
  const weekAgg = (from: string, to: string) => {
    let done = 0, missed = 0, exc = 0;
    for (let d = from; d <= to && d <= today; d = addDaysISO(d, 1)) {
      const lg = p.logs[d] || {};
      p.tasks.forEach(t => {
        if (t.scope !== "oliy" || t.kind === "count" || !taskActiveOn(t, d)) return;
        const mk = lg[t.id];
        if (!mk || !mk.st) return;
        if (mk.st === "full" || mk.st === "extra") done++;
        else if (mk.st === "excused") exc++;
        else missed++;
      });
    }
    return { done, missed, exc };
  };
  const wsISO = weekStartOf(today, plan.weekStart);
  const tw = weekAgg(wsISO, addDaysISO(wsISO, 6));
  const lw = weekAgg(addDaysISO(wsISO, -7), addDaysISO(wsISO, -1));
  const daysLeftAll = Math.max(plan.years * 365 - totalDay, 0);

  const Delta = ({ now, prev }: { now: number; prev: number }) => {
    const d = now - prev;
    if (d === 0) return <span className="text-[10px]" style={lblS}>{tr("o'tgan hafta bilan bir xil")}</span>;
    return <span className="text-[10px] font-semibold" style={{ color: d > 0 ? "var(--green)" : "var(--muted)" }}>{d > 0 ? "+" : ""}{d} o'tgan haftaga nisbatan</span>;
  };

  const R = 76, CIRC = 2 * Math.PI * R;

  return (
    <div className="space-y-4">
      {/* 1. Maqsad matni — tepada */}
      <Card style={{ background: "var(--green)", borderColor: "var(--green)", boxShadow: "var(--shadow-lg)" }}>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-white/80"><Icon n="target" size={15} /> {tr("Oliy maqsadim")}</span>
          <button onClick={() => { setGoalTxt(plan.goal); setEditGoal(true); }} className="om-press text-white/70"><Icon n="pencil" size={15} /></button>
        </div>
        <p className="mt-3 text-[16px] font-semibold leading-relaxed text-white">{plan.goal}</p>
      </Card>

      {/* 2. Natija halqasi — faqat ma'lumot */}
      <Card className="flex flex-col items-center py-6">
        <div className="relative" style={{ width: 172, height: 172 }}>
          <svg viewBox="0 0 172 172" className="h-full w-full" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="86" cy="86" r={R} fill="none" stroke="var(--soft)" strokeWidth="11" />
            <circle cx="86" cy="86" r={R} fill="none" stroke="var(--green)" strokeWidth="11" strokeLinecap="round"
              strokeDasharray={`${CIRC * (planPct / 100)} ${CIRC}`} style={{ transition: "stroke-dasharray .6s ease" }} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[40px] font-bold leading-none" style={{ color: "var(--ink)" }}>{planPct}<span className="text-[20px]">%</span></span>
            <span className="mt-1.5 text-[11px] font-medium" style={lblS}>{tr("Maqsadlar bajarildi")}</span>
          </div>
        </div>
        <p className="mt-4 text-[12px] font-medium" style={{ color: "var(--gold)" }}>{yearNum}-yil · {daysLeftAll} kun qoldi</p>
      </Card>

      {/* 3. Maqsadlar ro'yxati */}
      {plan.metrics.length === 0 ? (
        <Card className="text-center">
          <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl" style={{ background: "var(--soft)", color: "var(--gold)" }}><Icon n="flag" size={22} /></div>
          <p className="text-sm font-bold" style={{ color: "var(--ink)" }}>{tr("Hali oliy maqsad belgilanmagan")}</p>
          <p className="mx-auto mt-1 max-w-[17rem] text-[12px] leading-relaxed" style={lblS}>{tr("Yil davomida nimani nechta qilmoqchisiz? Masalan «10 kitob», «100 dars».")}</p>
          <button onClick={() => setEditM(true)} className="om-press mt-4 w-full rounded-2xl py-3 text-sm font-bold text-white" style={{ background: "var(--gold)" }}>{tr("Oliy maqsad belgilash")}</button>
        </Card>
      ) : (
        <Card>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-[15px] font-bold" style={{ color: "var(--ink)" }}>
              <span className="grid h-7 w-7 place-items-center rounded-lg" style={{ background: "var(--soft)", color: "var(--gold)" }}><Icon n="flag" size={15} /></span>
              {yearNum}-yil maqsadlari
            </h3>
            <button onClick={() => setEditM(true)} className="om-press" style={{ color: "var(--muted)" }}><Icon n="pencil" size={15} /></button>
          </div>
          {allBars.map(b => {
            const val = b.pv > 0 ? +(b.v + b.pv).toFixed(1) : b.v;
            const pct = Math.min((val / (b.t || 1)) * 100, 100);
            return (
              <button key={b.n} disabled={!b.m} onClick={() => { if (b.m) setDetailM(b.m); }}
                className={"mb-2.5 block w-full text-left" + (b.m ? " om-press" : "")}>
                <div className="mb-1 flex items-center justify-between text-[13px]">
                  <span className="flex items-center gap-1 font-medium" style={{ color: "var(--ink)" }}>{b.n}{b.m ? <Icon n="chevronRight" size={13} style={{ color: "var(--muted)" }} /> : null}</span>
                  <span className="font-bold tabular-nums" style={{ color: "var(--ink)" }}>{val}<span style={lblS}>/{b.t}</span></span>
                </div>
                <div className="h-2 overflow-hidden rounded-full" style={{ background: "var(--soft)" }}>
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, background: pct >= 100 ? "var(--green)" : "var(--gold)" }} />
                </div>
              </button>
            );
          })}
          <button onClick={() => setShowHist(true)} className="om-press mt-1 flex w-full items-center justify-center gap-2 pt-2 text-[11px] font-semibold" style={{ color: "var(--muted)", borderTop: "1px solid var(--line)" }}>
            <Icon n="stats" size={13} /> {tr("Vazifalar tarixi")}
          </button>
        </Card>
      )}

      {/* 4. Bu hafta — umumiy */}
      <Card>
        <h3 className="mb-3 text-[11px] font-bold uppercase tracking-wider" style={lblS}>{tr("Bu hafta — oliy vazifalar")}</h3>
        <div className="grid grid-cols-3 gap-2">
          {([
            { n: tr("Bajarildi"), v: tw.done, pv: lw.done, c: "var(--green)" },
            { n: tr("Bajarilmadi"), v: tw.missed, pv: lw.missed, c: "var(--muted)" },
            { n: tr("Sababli"), v: tw.exc, pv: lw.exc, c: "var(--gold)" },
          ] as const).map(x => (
            <div key={x.n} className="rounded-xl p-3 text-center" style={{ background: "var(--soft)" }}>
              <div className="text-[22px] font-bold leading-none" style={{ color: x.c }}>{x.v}</div>
              <div className="mt-1 text-[10px] font-medium" style={lblS}>{x.n}</div>
              <div className="mt-1"><Delta now={x.v} prev={x.pv} /></div>
            </div>
          ))}
        </div>
      </Card>

      {editGoal && (
        <Sheet title={tr("Oliy maqsadni tahrirlash")} onClose={() => setEditGoal(false)}>
          <textarea value={goalTxt} onChange={e => setGoalTxt(e.target.value)} rows={6} className="w-full rounded-2xl border px-3.5 py-3 text-sm leading-relaxed" style={inpS} />
          <button onClick={() => { p.setPlan(pl => pl ? { ...pl, goal: goalTxt.trim() || pl.goal } : pl); setEditGoal(false); }} className="om-press mt-3 w-full rounded-2xl py-3.5 text-sm font-bold text-white" style={{ background: "var(--green)" }}>{tr("Saqlash")}</button>
        </Sheet>
      )}

      {editM && <MetricsEdit plan={plan} setPlan={p.setPlan} onClose={() => setEditM(false)} />}

      {detailM && <JarayonSheet m={detailM} today={today} plan={plan} tasks={p.tasks} logs={p.logs} counts={p.counts} countLog={p.countLog} onClose={() => setDetailM(null)} />}

      {showHist && <VazifaTarixi today={today} plan={plan} tasks={p.tasks} logs={p.logs} countLog={p.countLog} onClose={() => setShowHist(false)} />}
    </div>
  );
}

// davr tanlash — maqsad jarayoni va vazifalar tarixi uchun
const MPER = [{ k: "hafta", n: tr("Hafta"), d: 7 }, { k: "oy", n: "Oy", d: 30 }, { k: "yarim", n: "6 oy", d: 182 }, { k: "yil", n: tr("Yil"), d: 365 }] as const;
type MPerK = typeof MPER[number]["k"];

function PerTabs({ per, setPer }: { per: MPerK; setPer: (k: MPerK) => void }) {
  return (
    <div className="flex gap-1.5">
      {MPER.map(x => (
        <button key={x.k} onClick={() => setPer(x.k)} className="om-press flex-1 rounded-xl border py-2 text-[12px] font-semibold"
          style={per === x.k ? { background: "var(--gold)", color: "#fff", borderColor: "var(--gold)" } : { ...cardS, color: "var(--ink)" }}>{x.n}</button>
      ))}
    </div>
  );
}

// bitta oliy maqsadning jarayoni — davrlar bo'yicha
function JarayonSheet({ m, today, plan, tasks, logs, counts, countLog, onClose }: {
  m: Metric; today: string; plan: Plan; tasks: Task[]; logs: Logs;
  counts: Record<string, Record<string, number>>; countLog: CountLog; onClose: () => void;
}) {
  const [per, setPer] = useState<MPerK>("oy");
  const days = (MPER.find(x => x.k === per) || MPER[1]).d;
  const from = addDaysISO(today, -(days - 1));
  const inPeriod = m.kind === "type"
    ? tasks.filter(t => t.scope === "oliy" && t.type === m.typeName && t.completedAt && t.completedAt >= from && t.completedAt <= today).length
    : Object.keys(counts[m.id] || {}).filter(d => d >= from && d <= today).reduce((a, d) => a + (counts[m.id] || {})[d], 0);
  const mts = m.kind === "type" ? tasks.filter(t => t.scope === "oliy" && t.type === m.typeName && !t.abandonedAt) : [];
  const yearAll = m.kind === "type"
    ? tasks.filter(t => t.scope === "oliy" && t.type === m.typeName && t.completedAt).length
    : Object.values(counts[m.id] || {}).reduce((a, b) => a + b, 0);
  // shu tempda yil oxirida qancha bo'ladi
  const perDay = days > 0 ? inPeriod / days : 0;
  const forecast = Math.round(yearAll + perDay * Math.max(365 - (diffDays(plan.start, today) % 365), 0));
  return (
    <Sheet title={<span className="flex items-center gap-2"><Icon n="flag" size={16} style={{ color: "var(--gold)" }} /> {m.name}</span>} onClose={onClose}>
      <div className="space-y-3.5">
        <PerTabs per={per} setPer={setPer} />

        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-2xl p-3.5 text-center" style={{ background: "var(--soft)" }}>
            <div className="text-[26px] font-bold leading-none" style={{ color: "var(--gold)" }}>{inPeriod}</div>
            <div className="mt-1.5 text-[10px] font-medium" style={lblS}>{tr("shu davrda")}</div>
          </div>
          <div className="rounded-2xl p-3.5 text-center" style={{ background: "var(--soft)" }}>
            <div className="text-[26px] font-bold leading-none" style={{ color: "var(--ink)" }}>{yearAll}<span className="text-[14px]" style={lblS}>/{m.target}</span></div>
            <div className="mt-1.5 text-[10px] font-medium" style={lblS}>{tr("yillik maqsad")}</div>
          </div>
        </div>

        <div className="h-2 overflow-hidden rounded-full" style={{ background: "var(--soft)" }}>
          <div className="h-full rounded-full" style={{ width: `${Math.min((yearAll / (m.target || 1)) * 100, 100)}%`, background: "var(--gold)" }} />
        </div>

        {inPeriod > 0 && (
          <p className="text-[12px] leading-relaxed" style={lblS}>
            {tr("Shu tempda yil oxirida taxminan")} <b style={{ color: forecast >= m.target ? "var(--green)" : "var(--ink)" }}>{forecast}</b> {tr("ta bo'ladi (maqsad —")} {m.target}).
          </p>
        )}

        {m.kind === "manual" ? (
          <p className="text-[12px] leading-relaxed" style={lblS}>{tr("Bu maqsad qo'lda sanaladi — Bugun sahifasidagi «+1» tugmasi bilan.")}</p>
        ) : mts.length === 0 ? (
          <p className="text-[12px] leading-relaxed" style={lblS}>Bu maqsadga hali vazifa biriktirilmagan. Turi «{m.typeName}» bo'lgan oliy vazifa qo'shsangiz, shu yerda ko'rinadi.</p>
        ) : (
          <div className="space-y-1.5">
            <p className="text-[11px] font-bold uppercase tracking-wider" style={lblS}>{tr("Vazifalar")}</p>
            {mts.map(t => {
              const cTot = t.kind === "count" ? Object.values(countLog[t.id] || {}).reduce((a, b) => a + b, 0) : 0;
              return (
                <div key={t.id} className="flex items-center gap-2.5 rounded-xl border px-3 py-2.5" style={cardS}>
                  <Icon n={t.completedAt ? "checkCircle" : "circle"} size={17} style={{ color: t.completedAt ? "var(--green)" : "var(--muted)", opacity: t.completedAt ? 1 : 0.4, flex: "none" }} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-medium" style={{ color: "var(--ink)" }}>{t.name}</span>
                    <span className="block text-[10px]" style={lblS}>
                      {t.completedAt ? `${fmtUz(t.startDate)} — ${fmtUz(t.completedAt)}` : t.kind === "count" ? `${cTot}/${t.countTarget || 0}` : `${fmtUz(t.startDate)} dan`}
                    </span>
                  </span>
                  {t.completedAt && <span className="flex-none text-[10px] font-semibold" style={{ color: "var(--green)" }}>{diffDays(t.startDate, t.completedAt) + 1} kun</span>}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Sheet>
  );
}

// har bir oliy vazifa shu vaqtgacha qanday bajarilgan
function VazifaTarixi({ today, plan, tasks, logs, countLog, onClose }: {
  today: string; plan: Plan; tasks: Task[]; logs: Logs; countLog: CountLog; onClose: () => void;
}) {
  const [per, setPer] = useState<MPerK>("oy");
  const days = (MPER.find(x => x.k === per) || MPER[1]).d;
  const from = addDaysISO(today, -(days - 1));
  const list = tasks.filter(t => t.scope === "oliy" && !t.isSleep && t.kind !== "count");
  const stat = (t: Task) => {
    let done = 0, missed = 0, exc = 0, active = 0;
    for (let d = from; d <= today; d = addDaysISO(d, 1)) {
      if (!taskActiveOn(t, d)) continue;
      active++;
      const mk = (logs[d] || {})[t.id];
      if (!mk || !mk.st) continue;
      if (mk.st === "full" || mk.st === "extra") done++;
      else if (mk.st === "excused") exc++;
      else missed++;
    }
    return { done, missed, exc, active, pct: active > 0 ? Math.round((done / active) * 100) : null };
  };
  return (
    <Sheet title={<span className="flex items-center gap-2"><Icon n="stats" size={16} style={{ color: "var(--green)" }} /> {tr("Vazifalar tarixi")}</span>} onClose={onClose}>
      <div className="space-y-3.5">
        <PerTabs per={per} setPer={setPer} />
        {list.length === 0 ? (
          <p className="text-[12px]" style={lblS}>{tr("Hali oliy maqsad vazifasi yo'q.")}</p>
        ) : list.map(t => {
          const s = stat(t);
          const col = s.pct === null ? "var(--muted)" : s.pct >= 80 ? "var(--green)" : s.pct >= 40 ? "var(--gold)" : "var(--red)";
          return (
            <div key={t.id} className="rounded-2xl border p-3" style={cardS}>
              <div className="mb-1.5 flex items-center justify-between gap-2">
                <span className="min-w-0 flex-1 truncate text-[13px] font-semibold" style={{ color: "var(--ink)" }}>{t.name}</span>
                <span className="flex-none text-[13px] font-bold tabular-nums" style={{ color: col }}>{s.pct === null ? "—" : `${s.pct}%`}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full" style={{ background: "var(--soft)" }}>
                <div className="h-full rounded-full" style={{ width: `${s.pct || 0}%`, background: col }} />
              </div>
              <div className="mt-1.5 flex gap-3 text-[10px]" style={lblS}>
                <span>{tr("Bajarildi:")} <b style={{ color: "var(--ink)" }}>{s.done}</b></span>
                <span>{tr("Bajarilmadi:")} <b style={{ color: "var(--ink)" }}>{s.missed}</b></span>
                <span>{tr("Sababli:")} <b style={{ color: "var(--ink)" }}>{s.exc}</b></span>
              </div>
            </div>
          );
        })}
      </div>
    </Sheet>
  );
}

function MetricsEdit({ plan, setPlan, onClose }: { plan: Plan; setPlan: React.Dispatch<React.SetStateAction<Plan | null>>; onClose: () => void }) {
  const [ms, setMs] = useState<Metric[]>(plan.metrics);
  const [nName, setNName] = useState("");
  const [nTarget, setNTarget] = useState("");
  const [nKind, setNKind] = useState<"type" | "manual">("type");
  return (
    <Sheet onClose={onClose} title={tr("Oliy maqsadlaringiz")}>
      <div className="space-y-3.5">
        <p className="text-[11px] leading-relaxed" style={lblS}>{tr("Yil davomida nimani nechta qilishni belgilang — masalan «yiliga 10 kitob», «100 dars». Bu raqamlar Maqsad bo'limidagi progressni yuritadi.")}</p>

        {ms.length > 0 && (
          <div className="space-y-1.5">
            {ms.map((m, i) => (
              <div key={m.id} className="flex items-center gap-2 rounded-xl border px-3 py-2.5" style={cardS}>
                <span className="grid h-8 w-8 flex-none place-items-center rounded-lg" style={{ background: "var(--soft)", color: m.kind === "type" ? "var(--gold)" : "var(--blue)" }}>
                  <Icon n={m.kind === "type" ? "target" : "hash"} size={15} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold" style={{ color: "var(--ink)" }}>{m.name}</span>
                  <span className="block text-[10px]" style={lblS}>{m.kind === "type" ? tr("vazifa turi orqali") : tr("qo'lda (+1)")}</span>
                </span>
                <input type="number" value={m.target} onChange={e => setMs(xs => xs.map((x, j) => j === i ? { ...x, target: parseInt(e.target.value) || 0 } : x))} className="w-16 flex-none rounded-lg border px-2 py-1.5 text-center text-sm" style={inpS} />
                <button onClick={() => setMs(xs => xs.filter((_, j) => j !== i))} className="flex-none" style={{ color: "var(--red)" }}><Icon n="trash" size={15} /></button>
              </div>
            ))}
          </div>
        )}

        <div className="space-y-2.5 rounded-2xl border p-3" style={cardS}>
          <p className="text-[11px] font-bold uppercase tracking-wider" style={lblS}>{tr("Yangi maqsad")}</p>
          <input value={nName} onChange={e => setNName(e.target.value)} placeholder={tr("Masalan: Kitob o'qish")} className="w-full rounded-xl border px-3.5 py-2.5 text-sm" style={inpS} />
          <input type="number" value={nTarget} onChange={e => setNTarget(e.target.value)} placeholder={tr("Yiliga nechta? (masalan 10)")} className="w-full rounded-xl border px-3.5 py-2.5 text-sm" style={inpS} />
          <div className="flex gap-2">
            <button onClick={() => setNKind("type")} className="om-press flex-1 rounded-xl border py-2.5 text-[13px] font-semibold" style={nKind === "type" ? { background: "var(--gold)", color: "#fff", borderColor: "var(--gold)" } : { ...cardS, color: "var(--ink)" }}>{tr("Vazifa turi orqali")}</button>
            <button onClick={() => setNKind("manual")} className="om-press flex-1 rounded-xl border py-2.5 text-[13px] font-semibold" style={nKind === "manual" ? { background: "var(--blue)", color: "#fff", borderColor: "var(--blue)" } : { ...cardS, color: "var(--ink)" }}>{tr("O'zim sanayman")}</button>
          </div>
          <p className="text-[10px] leading-relaxed" style={lblS}>
            {nKind === "type"
              ? tf("«{nom}» turidagi oliy vazifa tugatilganda hisob o'zi +1 bo'ladi.", { nom: nName.trim() || tr("shu nom") })
              : tr("Bugun bo'limida «+1» tugmasi chiqadi — har safar o'zingiz bosasiz.")}
          </p>
          <button onClick={() => {
            const t = parseInt(nTarget) || 0;
            if (!nName.trim()) { omAlert(tr("Maqsad nomini yozing.")); return; }
            if (t <= 0) { omAlert(tr("Yillik sonni kiriting.")); return; }
            setMs(xs => [...xs, { id: uid(), name: nName.trim(), target: t, kind: nKind, typeName: nKind === "type" ? nName.trim() : null }]);
            setNName(""); setNTarget(""); buzz();
          }} className="om-press w-full rounded-xl border py-2.5 text-sm font-bold" style={{ ...cardS, color: "var(--green)" }}>{tr("+ Ro'yxatga qo'shish")}</button>
        </div>

        <button onClick={() => { setPlan(pl => pl ? { ...pl, metrics: ms } : pl); onClose(); }} className="om-press w-full rounded-2xl py-3.5 text-sm font-bold text-white" style={{ background: "var(--green)" }}>{tr("Saqlash")}</button>
      </div>
    </Sheet>
  );
}

// ================== VAZIFALAR RO'YXATI ==================
function SleepPlanCard({ sleepCfg, setSleepCfg }: { sleepCfg: SleepCfg | null; setSleepCfg: React.Dispatch<React.SetStateAction<SleepCfg | null>> }) {
  const [edit, setEdit] = useState(false);
  const [kind, setKind] = useState<"hours" | "range">("hours");
  const [hours, setHours] = useState("8");
  const [from, setFrom] = useState("23:00");
  const [to, setTo] = useState("06:00");
  const [showT, setShowT] = useState(false);
  const rangeHours = (f: string, t: string) => {
    const [fh, fm] = f.split(":").map(Number);
    const [th, tm] = t.split(":").map(Number);
    return Math.round(((th * 60 + tm - fh * 60 - fm + 1440) % 1440) / 60 * 10) / 10;
  };
  const save = () => {
    if (kind === "hours") {
      const h = parseFloat(hours) || 0;
      if (h <= 0 || h >= 24) return;
      setSleepCfg({ kind, hours: h, from, to });
    } else setSleepCfg({ kind, hours: rangeHours(from, to), from, to });
    setEdit(false);
  };
  return (
    <Card>
      <h3 className="mb-2 font-bold" style={{ color: "var(--ink)" }}>{tr("Uyqu rejasi")}</h3>
      {sleepCfg && !edit ? (
        <>
          <p className="text-sm" style={{ color: "var(--ink)" }}>
            {sleepCfg.kind === "range"
              ? <>{tr("Har kuni")} <b>{sleepCfg.from} — {sleepCfg.to}</b> da uxlayman (~{sleepCfg.hours} soat)</>
              : <>{tr("Har kuni kamida")} <b>{sleepCfg.hours} soat</b> {tr("uxlayman")}</>}
          </p>
          <div className="mt-2 flex gap-2">
            <button onClick={() => { setKind(sleepCfg.kind); setHours(String(sleepCfg.hours)); setFrom(sleepCfg.from); setTo(sleepCfg.to); setEdit(true); }}
              className="rounded-lg border px-3 py-1.5 text-sm" style={{ ...cardS, color: "var(--ink)" }}>{tr("O'zgartirish")}</button>
            <button onClick={async () => { if (await omConfirm(tr("Uyqu rejasi o'chirilsinmi?"))) setSleepCfg(null); }}
              className="rounded-lg border px-3 py-1.5 text-sm" style={{ ...cardS, color: "var(--red)" }}>{tr("O'chirish")}</button>
          </div>
        </>
      ) : (
        <div className="space-y-2">
          <button type="button" onClick={() => setKind("hours")} className="w-full rounded-lg border p-2 text-left"
            style={kind === "hours" ? { borderColor: "var(--green)", background: "var(--soft)", borderWidth: 2 } : cardS}>
            <span className="text-sm font-medium" style={{ color: "var(--ink)" }}>{tr("Kunlik soat bilan")} {kind === "hours" ? "✓" : ""}</span>
          </button>
          {kind === "hours" && <input type="number" step="0.5" value={hours} onChange={e => setHours(e.target.value)} placeholder={tr("Necha soat?")} className={inpC} style={inpS} />}
          <button type="button" onClick={() => setKind("range")} className="w-full rounded-lg border p-2 text-left"
            style={kind === "range" ? { borderColor: "var(--green)", background: "var(--soft)", borderWidth: 2 } : cardS}>
            <span className="text-sm font-medium" style={{ color: "var(--ink)" }}>{tr("Aniq vaqt oralig'i bilan")} {kind === "range" ? "✓" : ""}</span>
          </button>
          {kind === "range" && (
            <>
              <button onClick={() => setShowT(true)} className="om-press flex w-full items-center gap-3 rounded-xl border px-3.5 py-3 text-left" style={cardS}>
                <Icon n="moon" size={17} style={{ color: "var(--blue)", flex: "none" }} />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold tabular-nums" style={{ color: "var(--ink)" }}>{from} — {to}</span>
                  <span className="block text-[11px]" style={{ color: "var(--blue)" }}>~{rangeHours(from, to)} soat</span>
                </span>
                <Icon n="chevronRight" size={15} style={{ color: "var(--muted)", flex: "none" }} />
              </button>
              {showT && <TimeRangeSheet wrap from={from} to={to} title={tr("Uxlash va turish vaqti")} onClose={() => setShowT(false)} onSave={(f, t2) => { setFrom(f); setTo(t2); setShowT(false); }} />}
            </>
          )}
          <button onClick={save} className="w-full rounded-lg py-2 text-sm font-bold text-white" style={{ background: "var(--green)" }}>{tr("Saqlash")}</button>
        </div>
      )}
    </Card>
  );
}

// ================== UYQU SAHIFASI ==================
function UyquPage(p: {
  today: string; plan: Plan; tasks: Task[]; logs: Logs;
  sleepCfg: SleepCfg | null; setSleepCfg: React.Dispatch<React.SetStateAction<SleepCfg | null>>;
  sleepLog: Record<string, number>;
}) {
  const { today, plan } = p;
  const sleepTask = p.tasks.find(t => t.isSleep && !t.archivedAt) || null;
  const ws = weekStartOf(today, plan.weekStart);
  const days: { label: string; state: "full" | "missed" | "none" | "future" }[] = [];
  let sum = 0, n = 0;
  for (let i = 0; i < 7; i++) {
    const d = addDaysISO(ws, i);
    const m = sleepTask ? (p.logs[d] || {})[sleepTask.id] : undefined;
    days.push({
      label: tr(KUN_QISQA[parseISO(d).getDay()]),
      state: d > today ? "future" : m && m.st ? (m.st === "missed" ? "missed" : "full") : "none",
    });
    if (d <= today && p.sleepLog[d] !== undefined) { sum += p.sleepLog[d]; n++; }
  }
  const weekAvg = n > 0 ? Math.round((sum / n) * 10) / 10 : null;
  return (
    <div className="space-y-4">
      <h2 className="mb-1 flex items-center gap-2.5 text-2xl font-bold" style={{ color: "var(--ink)" }}><span className="grid h-9 w-9 place-items-center rounded-2xl" style={{ background: "var(--soft)", color: "var(--blue)" }}><Icon n="moon" size={20} /></span>{tr("Uyqu rejasi")}</h2>

      {p.sleepCfg ? (
        <div className="rounded-2xl p-5" style={{ background: "linear-gradient(135deg,#232B4A 0%,#141A33 100%)", boxShadow: "var(--shadow-lg)" }}>
          <div className="flex items-start justify-between">
            <div>
              <div className="text-2xl font-bold text-white">{p.sleepCfg.hours} soat</div>
              <div className="mt-1 flex items-center gap-1.5 text-[11px] font-medium" style={{ color: "rgba(255,255,255,0.62)" }}><Icon n="target" size={12} /> {tr("Belgilangan maqsad")}</div>
            </div>
            <Icon n="moon" size={40} style={{ color: "#D7A94B" }} />
          </div>
          {p.sleepCfg.kind === "range" && (
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.08)" }}>
                <div className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.55)" }}>{tr("Uxlash vaqti")}</div>
                <div className="mt-0.5 text-lg font-bold tabular-nums text-white">{p.sleepCfg.from}</div>
              </div>
              <div className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.08)" }}>
                <div className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.55)" }}>{tr("Turish vaqti")}</div>
                <div className="mt-0.5 text-lg font-bold tabular-nums text-white">{p.sleepCfg.to}</div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Card><p className="text-sm" style={lblS}>{tr("Hali uyqu rejasi yo'q — quyida sozlang. Reja qo'yilgach, Bugun sahifasida har kuni belgilab borasiz.")}</p></Card>
      )}

      {sleepTask && p.sleepCfg && (
        <Card>
          <h3 className="mb-3 text-sm font-bold" style={{ color: "var(--ink)" }}>{tr("Shu hafta")}</h3>
          <div className="flex justify-between px-1">
            {days.map((d, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <span className="text-[10px] font-semibold" style={lblS}>{d.label}</span>
                {d.state === "full" ? <Icon n="checkCircle" size={22} style={{ color: "var(--green)" }} />
                  : d.state === "missed" ? <Icon n="x" size={22} style={{ color: "var(--red)" }} />
                  : <Icon n="circle" size={22} style={{ color: "var(--muted)", opacity: d.state === "future" ? 0.22 : 0.45 }} />}
              </div>
            ))}
          </div>
          {weekAvg !== null && <p className="mt-3 text-[11px]" style={lblS}>{tr("Bu hafta o'rtacha:")} <b style={{ color: "var(--ink)" }}>{weekAvg} soat</b> {tr("uxlandi.")}</p>}
        </Card>
      )}

      <Card style={{ borderInlineStartWidth: 3, borderInlineStartColor: "var(--gold)" }}>
        <h3 className="mb-1 flex items-center gap-2 text-sm font-bold" style={{ color: "var(--ink)" }}><Icon n="sparkles" size={15} style={{ color: "var(--gold)" }} /> {tr("Sifatli uyqu uchun maslahatlar")}</h3>
        <p className="text-[12px] leading-relaxed" style={lblS}>{tr("Uxlashdan 1 soat oldin ekranlardan uzoqlashing va yengil kitob o'qing. Uxlashdan oldingi zikrlarni unutmang.")}</p>
        <p className="mt-2 text-[11px] font-medium" style={{ color: "var(--gold)" }}>{tr("Eslatma: bu ilovada uyqu reytingi teskari — rejadan KAM uxlash yuqori baholanadi.")}</p>
      </Card>

      <SleepPlanCard sleepCfg={p.sleepCfg} setSleepCfg={p.setSleepCfg} />
    </div>
  );
}

function TaskForm({ scope: scope0, folderId, folders, types, today, initialKind, scopePick, onClose, onSave }: {
  scope: "daily" | "oliy"; folderId: string | null; folders: Folder[]; types: string[]; today: string;
  initialKind?: "time" | "count"; scopePick?: boolean;
  onClose: () => void; onSave: (t: Task) => void;
}) {
  const [scope, setScope] = useState<"daily" | "oliy">(scope0);
  const [kind, setKind] = useState<"time" | "count">(initialKind || "time");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [newType, setNewType] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [target, setTarget] = useState("");
  const [start, setStart] = useState(today);
  const [end, setEnd] = useState("");
  const [planned, setPlanned] = useState("");
  const [remTime, setRemTime] = useState("");
  const [remText, setRemText] = useState("");
  const [days, setDays] = useState<number[]>([]);
  const [showTime, setShowTime] = useState(false);
  const [showRem, setShowRem] = useState(false);
  const [showDate, setShowDate] = useState<null | "start" | "end">(null);
  const acc = scope === "oliy" ? "var(--gold)" : "var(--green)";
  const effType = (newType.trim() || type).trim();
  const startKind = start === today ? "today" : start === addDaysISO(today, 1) ? "tom" : "other";

  const save = async () => {
    if (!name.trim()) { omAlert(tr("Vazifa nomini yozing.")); return; }
    if (kind === "count") {
      const tg = parseInt(target) || 0;
      if (tg <= 0) { omAlert(tr("Umumiy sonni kiriting."), tr("Masalan: 100 ta dars.")); return; }
      if (!end) { omAlert(tr("Tugash sanasi kerak."), tr("Sanaladigan vazifada muddat majburiy — qachongacha yetkazasiz?")); return; }
      onSave({ id: uid(), name: name.trim(), type: effType, scope, folderId: null, minutes: 0, startDate: start, endDate: end, days: [], remTime: remTime || null, remText: remText.trim(), pauses: [], abandonedAt: null, archivedAt: null, countsHours: false, plannedDays: null, notes: [], completedAt: null, kind: "count", countTarget: tg, createdAt: today });
      return;
    }
    const mins = from && to ? Math.max(hmToMin(to) - hmToMin(from), 0) : 0;
    onSave({ id: uid(), name: name.trim(), type: effType, scope, folderId: null, minutes: mins, startDate: start, endDate: end || null, days, schedFrom: from || null, schedTo: to || null, remTime: remTime || null, remText: remText.trim(), pauses: [], abandonedAt: null, archivedAt: null, countsHours: true, plannedDays: scope === "oliy" ? (parseInt(planned) || null) : null, notes: [], completedAt: null, kind: "time", createdAt: today });
  };

  const Seg = ({ on, label, tint, onClick }: { on: boolean; label: string; tint: string; onClick: () => void }) => (
    <button onClick={onClick} className="om-press flex-1 rounded-xl border py-2.5 text-[13px] font-semibold" style={on ? { background: tint, color: "#fff", borderColor: tint } : { ...cardS, color: "var(--ink)" }}>{label}</button>
  );

  return (
    <Sheet onClose={onClose} title={tr("Yangi vazifa")}>
      <div className="space-y-3.5">
        {scopePick && (
          <div>
            <p className="mb-1.5 text-[11px] font-semibold" style={lblS}>{tr("Turkum")}</p>
            <div className="flex gap-2">
              <Seg on={scope === "daily"} label={tr("Kundalik")} tint="var(--green)" onClick={() => { setScope("daily"); setType(""); }} />
              <Seg on={scope === "oliy"} label={tr("Oliy maqsad")} tint="var(--gold)" onClick={() => { setScope("oliy"); setType(""); }} />
            </div>
          </div>
        )}

        <div>
          <p className="mb-1.5 text-[11px] font-semibold" style={lblS}>{tr("O'lchov")}</p>
          <div className="flex gap-2">
            <Seg on={kind === "time"} label={tr("Vaqtli")} tint={acc} onClick={() => setKind("time")} />
            <Seg on={kind === "count"} label={tr("Sanaladigan")} tint={acc} onClick={() => setKind("count")} />
          </div>
        </div>

        <div>
          <p className="mb-1.5 text-[11px] font-semibold" style={lblS}>{tr("Vazifa nomi")}</p>
          <input value={name} onChange={e => setName(e.target.value)} placeholder={kind === "count" ? tr("Masalan: Video darslar") : tr("Masalan: Ingliz tili darsi")} className="w-full rounded-xl border px-3.5 py-2.5 text-sm" style={inpS} />
        </div>

        <div>
          <p className="mb-1.5 text-[11px] font-semibold" style={lblS}>{tr("Vazifa turi")} <span style={{ color: "var(--muted)", fontWeight: 400 }}>{tr("(shu tur bir papka bo'ladi)")}</span></p>
          {types.length > 0 && (
            <div className="mb-1.5 flex flex-wrap gap-1.5">
              {types.map(t => {
                const sel = effType === t;
                return <button key={t} onClick={() => { setType(t); setNewType(""); }} className="om-press rounded-full border px-3 py-1.5 text-[12px] font-medium" style={sel ? { background: acc, color: "#fff", borderColor: acc } : { ...cardS, color: "var(--ink)" }}>{t}</button>;
              })}
            </div>
          )}
          <input value={newType} onChange={e => { setNewType(e.target.value); setType(""); }} placeholder={tr("yoki yangi tur yozing...")} className="w-full rounded-xl border px-3.5 py-2.5 text-sm" style={inpS} />
        </div>

        {kind === "count" ? (
          <div className="flex gap-2">
            <div className="flex-1">
              <p className="mb-1.5 text-[11px] font-semibold" style={lblS}>{tr("Jami nechta?")}</p>
              <input type="number" value={target} onChange={e => setTarget(e.target.value)} placeholder="100" className="w-full rounded-xl border px-3.5 py-2.5 text-sm" style={inpS} />
            </div>
            <div className="flex-1">
              <p className="mb-1.5 text-[11px] font-semibold" style={lblS}>{tr("Qachongacha?")}</p>
              <button onClick={() => setShowDate("end")} className="om-press w-full rounded-xl border px-3 py-2.5 text-left text-sm" style={{ ...cardS, color: end ? "var(--ink)" : "var(--muted)" }}>{end ? fmtUz(end) : tr("Sana tanlang")}</button>
            </div>
          </div>
        ) : (
          <>
            <div>
              <p className="mb-1.5 text-[11px] font-semibold" style={lblS}>{tr("Qaysi vaqt oralig'ida qilasiz?")} <span style={{ color: "var(--muted)", fontWeight: 400 }}>{tr("(shu vaqtda eslatma keladi)")}</span></p>
              <button onClick={() => setShowTime(true)} className="om-press flex w-full items-center gap-3 rounded-xl border px-3.5 py-3 text-left" style={cardS}>
                <Icon n="clock" size={17} style={{ color: acc, flex: "none" }} />
                {from && to ? (
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-bold tabular-nums" style={{ color: "var(--ink)" }}>{from} — {to}</span>
                    <span className="block text-[11px]" style={{ color: acc }}>{fmtMin(Math.max(hmToMin(to) - hmToMin(from), 0))}</span>
                  </span>
                ) : <span className="flex-1 text-sm" style={lblS}>{tr("Vaqt tanlang")}</span>}
                <Icon n="chevronRight" size={15} style={{ color: "var(--muted)", flex: "none" }} />
              </button>
            </div>

            <div>
              <p className="mb-1.5 text-[11px] font-semibold" style={lblS}>{tr("Qaysi kunlari?")}</p>
              <button onClick={() => setDays([])} className="om-press mb-1.5 w-full rounded-xl border py-2 text-[12px] font-semibold"
                style={days.length === 0 ? { background: acc, color: "#fff", borderColor: acc } : { ...cardS, color: "var(--ink)" }}>{tr("Har kuni")}</button>
              <DayCircles days={days} setDays={setDays} accent={acc} />
            </div>
          </>
        )}

        <div>
          <p className="mb-1.5 text-[11px] font-semibold" style={lblS}>{tr("Qachondan boshlanadi?")}</p>
          <div className="flex gap-2">
            <Seg on={startKind === "today"} label={tr("Bugundan")} tint={acc} onClick={() => setStart(today)} />
            <Seg on={startKind === "tom"} label={tr("Ertadan")} tint={acc} onClick={() => setStart(addDaysISO(today, 1))} />
            <button onClick={() => setShowDate("start")} className="om-press flex-1 rounded-xl border py-2.5 text-[13px] font-semibold" style={startKind === "other" ? { background: acc, color: "#fff", borderColor: acc } : { ...cardS, color: "var(--ink)" }}>{startKind === "other" ? fmtUz(start) : "Sana..."}</button>
          </div>
        </div>

        {kind === "time" && scope === "oliy" && (
          <div>
            <p className="mb-1.5 text-[11px] font-semibold" style={lblS}>{tr("Taxminan necha kunda tugataman?")} <span style={{ color: "var(--muted)", fontWeight: 400 }}>{tr("(ixtiyoriy — erta tugatsangiz reyting oshadi)")}</span></p>
            <input type="number" value={planned} onChange={e => setPlanned(e.target.value)} placeholder={tr("Masalan: 30")} className="w-full rounded-xl border px-3.5 py-2.5 text-sm" style={inpS} />
          </div>
        )}

        <div>
          <p className="mb-1.5 text-[11px] font-semibold" style={lblS}>{tr("Qo'shimcha eslatma")} <span style={{ color: "var(--muted)", fontWeight: 400 }}>{tr("(ixtiyoriy)")}</span></p>
          <button onClick={() => setShowRem(true)} className="om-press flex w-full items-center gap-3 rounded-xl border px-3.5 py-3 text-left" style={cardS}>
            <Icon n="bell" size={16} style={{ color: remTime ? "var(--gold)" : "var(--muted)", flex: "none" }} />
            <span className="flex-1 text-sm font-semibold tabular-nums" style={{ color: remTime ? "var(--ink)" : "var(--muted)" }}>{remTime || tr("Vaqt tanlang")}</span>
            {remTime && <button onClick={e => { e.stopPropagation(); setRemTime(""); setRemText(""); }} style={{ color: "var(--muted)" }}><Icon n="x" size={15} /></button>}
          </button>
          {remTime && <input value={remText} onChange={e => setRemText(e.target.value)} placeholder={tr("Eslatma matni...")} className="mt-2 w-full rounded-xl border px-3.5 py-2.5 text-sm" style={inpS} />}
        </div>

        <button onClick={save} className="om-press mt-1 w-full rounded-2xl py-3.5 text-sm font-bold text-white" style={{ background: acc, boxShadow: "0 8px 20px rgba(46,125,87,0.28)" }}>{tr("Qo'shish")}</button>
      </div>

      {showTime && <TimeRangeSheet from={from} to={to} onClose={() => setShowTime(false)} onSave={(f, t) => { setFrom(f); setTo(t); setShowTime(false); }} />}
      {showRem && <TimeRangeSheet single title={tr("Eslatma vaqti")} from={remTime || "21:00"} onClose={() => setShowRem(false)} onSave={f => { setRemTime(f); setShowRem(false); }} />}
      {showDate && <DateSheet value={showDate === "start" ? start : end} min={showDate === "end" ? start : undefined}
        title={showDate === "start" ? tr("Qachondan boshlanadi?") : tr("Qachongacha?")}
        onClose={() => setShowDate(null)} onPick={d => { if (showDate === "start") setStart(d); else setEnd(d); setShowDate(null); }} />}
    </Sheet>
  );
}

function TaskEdit({ t, folders, types, today, countLog, onClose, setTasks }: { t: Task; folders: Folder[]; types: string[]; today: string; countLog: CountLog; onClose: () => void; setTasks: React.Dispatch<React.SetStateAction<Task[]>> }) {
  const [name, setName] = useState(t.name);
  const [type, setType] = useState(t.type);
  const [from, setFrom] = useState(t.schedFrom || "");
  const [to, setTo] = useState(t.schedTo || "");
  const [target, setTarget] = useState(String(t.countTarget || 0));
  const [end, setEnd] = useState(t.endDate || "");
  const [remTime, setRemTime] = useState(t.remTime || "");
  const [remText, setRemText] = useState(t.remText);
  const [note, setNote] = useState("");
  const [days, setDays] = useState<number[]>(t.days || []);
  const [showTime, setShowTime] = useState(false);
  const [showRem, setShowRem] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [showPause, setShowPause] = useState(false);
  const paused = t.pauses.some(x => today >= x.from && today <= x.to);
  const upd = (fn: (x: Task) => Task) => setTasks(ts => ts.map(x => x.id === t.id ? fn(x) : x));
  const done = !!t.completedAt;
  const isCount = t.kind === "count";
  const acc = t.scope === "oliy" ? "var(--gold)" : "var(--green)";
  const cTotal = Object.values(countLog[t.id] || {}).reduce((a, b) => a + b, 0);
  return (
    <Sheet onClose={onClose} title={t.name}>
      <div className="space-y-3.5">
      {done && (
        <div className="flex items-start gap-2 rounded-xl border p-3 text-sm" style={{ ...cardS, color: "var(--ink)" }}>
          <Icon n="checkCircle" size={16} style={{ color: "var(--green)", flex: "none", marginTop: 2 }} />
          <span>Tugatilgan: {fmtUzFull(t.completedAt!)}
            {t.plannedDays ? <> · Reja: {t.plannedDays} kun · Amalda: <b>{diffDays(t.startDate, t.completedAt!) + 1} kun</b>{diffDays(t.startDate, t.completedAt!) + 1 <= t.plannedDays ? tr(" — rejadan oldin (bonus)") : tr(" — rejadan kech")}</> : null}
          </span>
        </div>
      )}
      {isCount && <div className="rounded-xl border p-3 text-sm" style={{ ...cardS, color: "var(--ink)" }}>{tr("Jarayon:")} <b style={{ color: acc }}>{cTotal}/{t.countTarget || 0}</b></div>}

      <div>
        <p className="mb-1.5 text-[11px] font-semibold" style={lblS}>{tr("Vazifa nomi")}</p>
        <input value={name} onChange={e => setName(e.target.value)} className="w-full rounded-xl border px-3.5 py-2.5 text-sm" style={inpS} />
      </div>

      <div>
        <p className="mb-1.5 text-[11px] font-semibold" style={lblS}>{tr("Vazifa turi")} <span style={{ color: "var(--muted)", fontWeight: 400 }}>{tr("(shu tur bir papka)")}</span></p>
        {types.length > 0 && (
          <div className="mb-1.5 flex flex-wrap gap-1.5">
            {types.map(x => (
              <button key={x} onClick={() => setType(x)} className="om-press rounded-full border px-3 py-1.5 text-[12px] font-medium" style={type === x ? { background: acc, color: "#fff", borderColor: acc } : { ...cardS, color: "var(--ink)" }}>{x}</button>
            ))}
          </div>
        )}
        <input value={type} onChange={e => setType(e.target.value)} placeholder={tr("yoki yangi tur yozing...")} className="w-full rounded-xl border px-3.5 py-2.5 text-sm" style={inpS} />
      </div>

      {!done && (
        <>
          {isCount ? (
            <div className="flex gap-2">
              <div className="flex-1">
                <p className="mb-1.5 text-[11px] font-semibold" style={lblS}>{tr("Jami nechta?")}</p>
                <input type="number" value={target} onChange={e => setTarget(e.target.value)} className="w-full rounded-xl border px-3.5 py-2.5 text-sm" style={inpS} />
              </div>
              <div className="flex-1">
                <p className="mb-1.5 text-[11px] font-semibold" style={lblS}>{tr("Qachongacha?")}</p>
                <button onClick={() => setShowDate(true)} className="om-press w-full rounded-xl border px-3 py-2.5 text-left text-sm" style={{ ...cardS, color: end ? "var(--ink)" : "var(--muted)" }}>{end ? fmtUz(end) : tr("Sana tanlang")}</button>
              </div>
            </div>
          ) : (
            <>
              <div>
                <p className="mb-1.5 text-[11px] font-semibold" style={lblS}>{tr("Qaysi vaqt oralig'ida qilasiz?")} <span style={{ color: "var(--muted)", fontWeight: 400 }}>{tr("(shu vaqtda eslatma keladi)")}</span></p>
                <button onClick={() => setShowTime(true)} className="om-press flex w-full items-center gap-3 rounded-xl border px-3.5 py-3 text-left" style={cardS}>
                  <Icon n="clock" size={17} style={{ color: acc, flex: "none" }} />
                  {from && to ? (
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-bold tabular-nums" style={{ color: "var(--ink)" }}>{from} — {to}</span>
                      <span className="block text-[11px]" style={{ color: acc }}>{fmtMin(Math.max(hmToMin(to) - hmToMin(from), 0))}</span>
                    </span>
                  ) : <span className="flex-1 text-sm" style={lblS}>{tr("Vaqt tanlang")}</span>}
                  <Icon n="chevronRight" size={15} style={{ color: "var(--muted)", flex: "none" }} />
                </button>
              </div>
              <div>
                <p className="mb-1.5 text-[11px] font-semibold" style={lblS}>{tr("Qaysi kunlari?")}</p>
                <button onClick={() => setDays([])} className="om-press mb-1.5 w-full rounded-xl border py-2 text-[12px] font-semibold"
                  style={days.length === 0 ? { background: acc, color: "#fff", borderColor: acc } : { ...cardS, color: "var(--ink)" }}>{tr("Har kuni")}</button>
                <DayCircles days={days} setDays={setDays} accent={acc} />
              </div>
              <div>
                <p className="mb-1.5 text-[11px] font-semibold" style={lblS}>{tr("Qachongacha?")} <span style={{ color: "var(--muted)", fontWeight: 400 }}>{tr("(bo'sh — doimiy)")}</span></p>
                <button onClick={() => setShowDate(true)} className="om-press w-full rounded-xl border px-3.5 py-2.5 text-left text-sm" style={{ ...cardS, color: end ? "var(--ink)" : "var(--muted)" }}>{end ? fmtUz(end) : tr("Muddatsiz")}</button>
              </div>
            </>
          )}
          <div>
            <p className="mb-1.5 text-[11px] font-semibold" style={lblS}>{tr("Qo'shimcha eslatma")}</p>
            <button onClick={() => setShowRem(true)} className="om-press flex w-full items-center gap-3 rounded-xl border px-3.5 py-3 text-left" style={cardS}>
              <Icon n="bell" size={16} style={{ color: remTime ? "var(--gold)" : "var(--muted)", flex: "none" }} />
              <span className="flex-1 text-sm font-semibold tabular-nums" style={{ color: remTime ? "var(--ink)" : "var(--muted)" }}>{remTime || tr("Vaqt tanlang")}</span>
              {remTime && <button onClick={e => { e.stopPropagation(); setRemTime(""); setRemText(""); }} style={{ color: "var(--muted)" }}><Icon n="x" size={15} /></button>}
            </button>
            {remTime && <input value={remText} onChange={e => setRemText(e.target.value)} placeholder={tr("Eslatma matni...")} className="mt-2 w-full rounded-xl border px-3.5 py-2.5 text-sm" style={inpS} />}
          </div>
        </>
      )}
      <button onClick={() => {
        const mins = from && to && hmToMin(to) > hmToMin(from) ? hmToMin(to) - hmToMin(from) : t.minutes;
        upd(x => ({ ...x, name: name.trim() || x.name, type: type.trim(), minutes: isCount ? 0 : mins, schedFrom: from || null, schedTo: to || null, days, countTarget: isCount ? (parseInt(target) || x.countTarget) : x.countTarget, endDate: isCount ? (end || x.endDate) : (end || null), remTime: remTime || null, remText: remText.trim() }));
        onClose();
      }} className="om-press w-full rounded-2xl py-3.5 text-sm font-bold text-white" style={{ background: acc }}>{tr("Saqlash")}</button>

      {showTime && <TimeRangeSheet from={from} to={to} onClose={() => setShowTime(false)} onSave={(f, t2) => { setFrom(f); setTo(t2); setShowTime(false); }} />}
      {showRem && <TimeRangeSheet single title={tr("Eslatma vaqti")} from={remTime || "21:00"} onClose={() => setShowRem(false)} onSave={f => { setRemTime(f); setShowRem(false); }} />}
      {showDate && <DateSheet value={end} min={t.startDate} title={tr("Qachongacha?")} onClose={() => setShowDate(false)} onPick={d => { setEnd(d); setShowDate(false); }} />}
      {showPause && <PauseSheet name={t.name} onClose={() => setShowPause(false)}
        onPick={n => { upd(x => ({ ...x, pauses: [...x.pauses, { from: today, to: addDaysISO(today, n - 1) }] })); setShowPause(false); onClose(); }} />}

      {!done && (
        <div className="grid grid-cols-2 gap-2">
          {t.scope === "oliy" && t.startDate <= today && (
            <button onClick={async () => { if (await omConfirm(tr("Bu vazifani tugatdingizmi? Tabriklaymiz!"))) { upd(x => ({ ...x, completedAt: today, archivedAt: addDaysISO(today, 1) })); onClose(); } }}
              className="om-press col-span-2 flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold text-white" style={{ background: "var(--green)" }}><Icon n="checkCircle" size={16} /> {tr("Tugatdim")}</button>
          )}
          {t.startDate > today && (
            <button onClick={async () => { if (await omConfirm(tr("Bu vazifa hali boshlanmagan. Butunlay o'chirilsinmi?"))) { setTasks(ts => ts.filter(x => x.id !== t.id)); onClose(); } }}
              className="om-press col-span-2 flex items-center justify-center gap-2 rounded-xl border py-2.5 text-sm" style={{ ...cardS, color: "var(--red)" }}><Icon n="trash" size={15} /> {tr("O'chirish")}</button>
          )}
          {!t.abandonedAt && !paused && t.startDate <= today && (
            <button onClick={() => setShowPause(true)} className="om-press flex items-center justify-center gap-1.5 rounded-xl border py-2.5 text-sm" style={{ ...cardS, color: "var(--gold)" }}><Icon n="pause" size={14} /> {tr("To'xtatish")}</button>
          )}
          {paused && <button onClick={() => { upd(x => ({ ...x, pauses: x.pauses.map(pp => (today >= pp.from && today <= pp.to) ? { from: pp.from, to: addDaysISO(today, -1) } : pp).filter(pp => pp.to >= pp.from) })); onClose(); }} className="om-press flex items-center justify-center gap-1.5 rounded-xl border py-2.5 text-sm" style={{ ...cardS, color: "var(--green)" }}><Icon n="play" size={13} /> {tr("Davom ettirish")}</button>}
          {!t.abandonedAt && t.startDate <= today ? (
            <button onClick={async () => { if (await omConfirm(tr("Vazifani tashlab qo'yasizmi? Bu statistikada salbiy iz qoldiradi."))) { upd(x => ({ ...x, abandonedAt: today, hadAbandon: true })); onClose(); } }}
              className="rounded-lg border py-2 text-sm" style={{ ...cardS, color: "var(--red)" }}>{tr("Tashlab qo'yish")}</button>
          ) : t.abandonedAt ? (
            <button onClick={() => { upd(x => ({ ...x, pauses: [...x.pauses, { from: x.abandonedAt!, to: addDaysISO(today, -1) }].filter(pp => pp.to >= pp.from), abandonedAt: null })); onClose(); }}
              className="om-press flex items-center justify-center gap-1.5 rounded-xl border py-2.5 text-sm" style={{ ...cardS, color: "var(--green)" }}><Icon n="refresh" size={14} /> {tr("Qayta tiklash")}</button>
          ) : null}
          {t.startDate <= today && (
            <button onClick={async () => { if (await omConfirm(tr("Arxivlansinmi? Tarixi saqlanadi, ro'yxatdan chiqadi."))) { upd(x => ({ ...x, archivedAt: today })); onClose(); } }}
              className="om-press col-span-2 rounded-xl border py-2.5 text-sm" style={{ ...cardS, color: "var(--muted)" }}>{tr("Arxivlash")}</button>
          )}
        </div>
      )}

      {t.scope === "oliy" && (
        <div>
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider" style={lblS}>{tr("Xulosalarim")}</p>
          {t.notes.length === 0 && <p className="text-xs" style={lblS}>{tr("Hali xulosa yo'q.")}</p>}
          {t.notes.map((n, i) => (
            <div key={i} className="mb-1.5 rounded-lg border p-2 text-sm" style={cardS}>
              <div className="text-[10px]" style={lblS}>{fmtUzFull(n.date)}</div>
              <div style={{ color: "var(--ink)" }}>{n.text}</div>
            </div>
          ))}
          <textarea value={note} onChange={e => setNote(e.target.value)} rows={2} placeholder={tr("Yangi xulosa...")} className={inpC + " mt-1"} style={inpS} />
          <button onClick={() => { if (note.trim()) { upd(x => ({ ...x, notes: [...x.notes, { date: today, text: note.trim() }] })); setNote(""); } }} className="om-press mt-1 w-full rounded-xl border py-2.5 text-sm" style={{ ...cardS, color: "var(--green)" }}>{tr("Xulosa qo'shish")}</button>
        </div>
      )}
      </div>
    </Sheet>
  );
}

function VazifalarPage(p: {
  today: string; plan: Plan; folders: Folder[]; tasks: Task[]; sleepCfg: SleepCfg | null; countLog: CountLog;
  setFolders: React.Dispatch<React.SetStateAction<Folder[]>>; setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  setSleepCfg: React.Dispatch<React.SetStateAction<SleepCfg | null>>;
  setPlan: React.Dispatch<React.SetStateAction<Plan | null>>;
}) {
  const [sub, setSub] = useState<"daily" | "oliy">("daily");
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showMetrics, setShowMetrics] = useState(false);
  const { today } = p;

  const types = Array.from(new Set([...p.tasks.map(t => t.type), ...p.plan.metrics.map(m => m.typeName || m.name)].filter(Boolean)));
  const visible = (t: Task) => t.scope === sub && !t.isSleep && (!t.archivedAt || t.completedAt);
  // tur bo'yicha guruhlash (tur = papka)
  const grouped = (() => {
    const g: Record<string, Task[]> = {};
    p.tasks.filter(visible).forEach(t => { const k = (t.type || "").trim() || tr("Turkumsiz"); (g[k] = g[k] || []).push(t); });
    return Object.keys(g).sort((a, b) => a.localeCompare(b)).map(k => ({ name: k, items: g[k] }));
  })();
  const qq = q.trim().toLowerCase();
  const results = qq ? p.tasks.filter(t => !t.isSleep && (t.name + " " + t.type).toLowerCase().includes(qq)) : [];

  const TaskBtn = ({ t }: { t: Task }) => {
    const paused = t.pauses.some(x => today >= x.from && today <= x.to);
    const cTotal = t.kind === "count" ? Object.values(p.countLog[t.id] || {}).reduce((a, b) => a + b, 0) : 0;
    const acc = t.scope === "oliy" ? "var(--gold)" : "var(--green)";
    return (
      <button onClick={() => setEditTask(t)} className="om-press mb-1.5 flex w-full items-center gap-3 rounded-2xl border px-3 py-2.5 text-left" style={{ ...cardS, opacity: t.completedAt ? 0.6 : 1 }}>
        <span className="grid h-9 w-9 flex-none place-items-center rounded-xl" style={{ background: "var(--soft)", color: acc }}>
          <Icon n={t.completedAt ? "checkCircle" : t.kind === "count" ? "hash" : "book"} size={17} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-1 truncate text-sm font-semibold" style={{ color: "var(--ink)" }}>{t.name}{t.remTime ? <Icon n="bell" size={12} style={{ color: "var(--muted)" }} /> : null}</span>
          <span className="block truncate text-[11px]" style={lblS}>
            {t.type || tr("Vazifa")}
            {t.abandonedAt ? " - " + tr("tashlab qo'yilgan") : ""}{paused ? " - " + tr("to'xtatilgan") : ""}
            {!t.completedAt && t.startDate > today ? ` - ${fmtUz(t.startDate)} dan` : ""}
            {t.days.length > 0 ? ` - ${t.days.map(d => tr(KUN_QISQA[d])).join(",")}` : ""}
          </span>
        </span>
        <span className="flex-none text-[11px] font-bold" style={{ color: acc }}>{t.kind === "count" ? `${cTotal}/${t.countTarget || 0}` : t.completedAt ? `${diffDays(t.startDate, t.completedAt) + 1} ${tr("kun")}` : t.minutes > 0 ? fmtMin(t.minutes) : ""}</span>
      </button>
    );
  };

  return (
    <div className="space-y-4">
      <div className="mb-1 flex items-center justify-between">
        <h2 className="flex items-center gap-2.5 text-2xl font-bold" style={{ color: "var(--ink)" }}><span className="grid h-9 w-9 place-items-center rounded-2xl" style={{ background: "var(--soft)", color: "var(--green)" }}><Icon n="list" size={20} /></span>{tr("Vazifalar")}</h2>
        <button onClick={() => { setSearchOpen(o => !o); setQ(""); }} className="om-press grid h-9 w-9 place-items-center rounded-2xl"
          style={{ background: searchOpen ? "var(--green)" : "var(--soft)", color: searchOpen ? "#fff" : "var(--muted)" }}><Icon n="search" size={18} /></button>
      </div>
      {searchOpen && (
        <input autoFocus value={q} onChange={e => setQ(e.target.value)} placeholder={tr("Vazifa nomi bo'yicha qidirish...")} className={inpC} style={inpS} />
      )}
      <div className="flex gap-2">
        <button onClick={() => setSub("daily")} className="flex-1 rounded-xl border py-2 text-sm font-medium" style={sub === "daily" ? { background: "var(--green)", color: "#fff", borderColor: "var(--green)" } : { ...cardS, color: "var(--ink)" }}>{tr("Kundalik vazifalar")}</button>
        <button onClick={() => setSub("oliy")} className="flex-1 rounded-xl border py-2 text-sm font-medium" style={sub === "oliy" ? { background: "var(--gold)", color: "#fff", borderColor: "var(--gold)" } : { ...cardS, color: "var(--ink)" }}>{tr("Oliy maqsad vazifalari")}</button>
      </div>

      {qq !== "" && (
        <Card>
          <h3 className="mb-2 font-bold" style={{ color: "var(--ink)" }}>Qidiruv natijalari ({results.length})</h3>
          {results.length === 0 && <p className="text-xs" style={lblS}>{tr("Hech narsa topilmadi.")}</p>}
          {results.map(t => <TaskBtn key={t.id} t={t} />)}
        </Card>
      )}

      {qq === "" && <>
      {sub === "daily" && <SleepPlanCard sleepCfg={p.sleepCfg} setSleepCfg={p.setSleepCfg} />}
      {sub === "oliy" && (
        <button onClick={() => setShowMetrics(true)} className="om-press om-card flex w-full items-center gap-3 p-4 text-left">
          <span className="grid h-11 w-11 flex-none place-items-center rounded-2xl" style={{ background: "var(--soft)", color: "var(--gold)" }}><Icon n="target" size={21} /></span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-bold" style={{ color: "var(--ink)" }}>{tr("Oliy maqsadlaringizni belgilang")}</span>
            <span className="block text-[11px]" style={lblS}>
              {p.plan.metrics.length > 0 ? `${p.plan.metrics.length} ${tr("ta maqsad belgilangan")} — ${p.plan.metrics.slice(0, 2).map(m => m.name).join(", ")}${p.plan.metrics.length > 2 ? "..." : ""}` : tr("Yillik raqamli maqsadlar hali yo'q — bosib qo'shing")}
            </span>
          </span>
          <Icon n="chevronRight" size={16} style={{ color: "var(--muted)" }} />
        </button>
      )}

      <button onClick={() => setShowForm(true)} className="om-press flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-sm font-bold text-white" style={{ background: sub === "oliy" ? "var(--gold)" : "var(--green)" }}>
        <Icon n="plus" size={16} /> {tf("Yangi {x} vazifa", { x: sub === "oliy" ? tr("oliy maqsad") : tr("kundalik") })}
      </button>

      {grouped.length === 0 && <Card><p className="text-sm" style={lblS}>{tr("Hali vazifa yo'q. Yuqoridagi tugma orqali qo'shing.")}</p></Card>}
      {grouped.map(g => (
        <Card key={g.name} style={sub === "oliy" ? { borderColor: "var(--gold)" } : {}}>
          <h3 className="mb-2 flex items-center gap-2 font-bold" style={{ color: "var(--ink)" }}>
            <span className="grid h-7 w-7 place-items-center rounded-lg" style={{ background: "var(--soft)", color: sub === "oliy" ? "var(--gold)" : "var(--green)" }}><Icon n="folder" size={15} /></span>
            {g.name} <span className="text-xs font-normal" style={lblS}>· {g.items.length} {tr("ta")}</span>
          </h3>
          {g.items.map(t => <TaskBtn key={t.id} t={t} />)}
        </Card>
      ))}
      </>}

      {showForm && <TaskForm scope={sub} folderId={null} folders={p.folders} types={types} today={today} scopePick onClose={() => setShowForm(false)}
        onSave={t => { p.setTasks(ts => [...ts, t]); setShowForm(false); }} />}
      {editTask && <TaskEdit t={p.tasks.find(x => x.id === editTask.id) || editTask} folders={p.folders} types={types} today={today} countLog={p.countLog} onClose={() => setEditTask(null)} setTasks={p.setTasks} />}
      {showMetrics && <MetricsEdit plan={p.plan} setPlan={p.setPlan} onClose={() => setShowMetrics(false)} />}
    </div>
  );
}

function FolderEdit({ f, onClose, setFolders, empty }: { f: Folder; onClose: () => void; setFolders: React.Dispatch<React.SetStateAction<Folder[]>>; empty: boolean }) {
  const [name, setName] = useState(f.name);
  const [imp, setImp] = useState(String(f.importance));
  return (
    <Modal title={`${f.name}`} onClose={onClose}>
      <label className={lblC} style={lblS}>{tr("Papka nomi")}</label>
      <input value={name} onChange={e => setName(e.target.value)} className={inpC + " mb-2"} style={inpS} />
      <label className={lblC} style={lblS}>{tr("Muhimlik darajasi (1-10)")}</label>
      <input type="number" min={1} max={10} value={imp} onChange={e => setImp(e.target.value)} className={inpC + " mb-3"} style={inpS} />
      <button onClick={() => { const im = Math.min(Math.max(parseInt(imp) || 5, 1), 10); setFolders(fs => fs.map(x => x.id === f.id ? { ...x, name: name.trim() || x.name, importance: im } : x)); onClose(); }}
        className="mb-2 w-full rounded-lg py-2 text-sm font-bold text-white" style={{ background: "var(--green)" }}>{tr("Saqlash")}</button>
      {empty ? (
        <button onClick={async () => { if (await omConfirm(tr("Papka o'chirilsinmi?"))) { setFolders(fs => fs.filter(x => x.id !== f.id)); onClose(); } }}
          className="w-full rounded-lg border py-2 text-sm" style={{ ...cardS, color: "var(--red)" }}>{tr("O'chirish")}</button>
      ) : (
        <p className="text-[11px]" style={lblS}>{tr("Papkani o'chirish uchun avval ichidagi vazifalarni boshqa joyga ko'chiring.")}</p>
      )}
    </Modal>
  );
}

// ================== POMODORO ==================
function PomoPage({ cfg, setCfg, pomo, setPomo, pomoLog, today, onStart }: {
  cfg: PomoCfg; setCfg: React.Dispatch<React.SetStateAction<PomoCfg>>;
  pomo: PomoState | null;
  setPomo: React.Dispatch<React.SetStateAction<PomoState | null>>;
  pomoLog: Record<string, { c: number; m: number }>; today: string;
  onStart: () => void;
}) {
  const [, setTick] = useState(0);
  const [w, setW] = useState(String(cfg.work));
  const [r, setR] = useState(String(cfg.rest));
  const [c, setC] = useState(String(cfg.cycles || 3));
  useEffect(() => {
    const iv = setInterval(() => setTick(t => t + 1), 500);
    return () => clearInterval(iv);
  }, []);
  const leftMs = pomo ? (pomo.pausedLeft !== null ? pomo.pausedLeft : Math.max(pomo.endsAt - Date.now(), 0)) : 0;
  const left = Math.max(Math.ceil(leftMs / 1000), 0);
  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");
  const tLog = pomoLog[today] || { c: 0, m: 0 };
  return (
    <div className="space-y-4">
      <h2 className="mb-1 flex items-center gap-2.5 text-2xl font-bold" style={{ color: "var(--ink)" }}><span className="grid h-9 w-9 place-items-center rounded-2xl" style={{ background: "var(--soft)", color: "var(--green)" }}><Icon n="timer" size={20} /></span>{tr("Pomodoro")}</h2>

      <Card className="flex flex-col items-center py-8">
        {(() => {
          const total = (pomo ? (pomo.phase === "work" ? cfg.work : cfg.rest) : cfg.work) * 60000;
          const frac = pomo ? Math.min(Math.max(1 - leftMs / total, 0), 1) : 0;
          const R = 128, CIRC = 2 * Math.PI * R;
          const col = pomo && pomo.phase === "rest" ? "var(--gold)" : "var(--green)";
          return (
            <div className="relative" style={{ width: 284, height: 284 }}>
              <svg viewBox="0 0 284 284" className="h-full w-full" style={{ transform: "rotate(-90deg)" }}>
                <circle cx="142" cy="142" r={R} fill="none" stroke="var(--soft)" strokeWidth="14" />
                <circle cx="142" cy="142" r={R} fill="none" stroke={col} strokeWidth="14" strokeLinecap="round" strokeDasharray={`${CIRC * frac} ${CIRC}`} style={{ transition: "stroke-dasharray .6s linear" }} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Icon n="timer" size={26} style={{ color: "var(--muted)" }} />
                <span className="mt-1 text-6xl font-bold tabular-nums" style={{ color: pomo && pomo.pausedLeft !== null ? "var(--muted)" : "var(--ink)" }}>{pomo ? `${mm}:${ss}` : `${String(cfg.work).padStart(2, "0")}:00`}</span>
                <span className="mt-1 text-sm font-medium" style={{ color: pomo ? (pomo.pausedLeft !== null ? "var(--muted)" : col) : "var(--muted)" }}>
                  {pomo ? (pomo.phase === "work" ? (pomo.pausedLeft !== null ? tr("Pauzada") : tr("Ish vaqti")) : tr("Dam olish")) : tr("Focus vaqti")}
                </span>
              </div>
            </div>
          );
        })()}
        <div className="mt-7 flex justify-center gap-2.5">
          {!pomo ? (
            <button onClick={onStart} className="om-press rounded-2xl px-12 py-4 text-base font-bold text-white" style={{ background: "var(--green)", boxShadow: "0 10px 24px rgba(46,125,87,0.42)" }}>{tr("Boshlash")}</button>
          ) : (
            <>
              {pomo.phase === "work" && pomo.pausedLeft === null && (
                <button onClick={() => setPomo(pp => pp ? { ...pp, pausedLeft: Math.max(pp.endsAt - Date.now(), 0) } : pp)}
                  className="om-press flex items-center gap-1.5 rounded-2xl border px-6 py-3.5 text-sm font-bold" style={{ ...cardS, color: "var(--gold)" }}><Icon n="pause" size={18} /> {tr("Pauza")}</button>
              )}
              {pomo.phase === "work" && pomo.pausedLeft !== null && (
                <button onClick={() => setPomo(pp => pp ? { ...pp, endsAt: Date.now() + (pp.pausedLeft || 0), pausedLeft: null } : pp)}
                  className="om-press flex items-center gap-1.5 rounded-2xl px-7 py-3.5 text-sm font-bold text-white" style={{ background: "var(--green)" }}><Icon n="play" size={18} /> {tr("Davom")}</button>
              )}
              <button onClick={async () => { if (await omConfirm(tr("Taymer to'xtatilsinmi? (bu pomodoro hisobga kirmaydi)"))) setPomo(null); }}
                className="om-press flex items-center gap-1.5 rounded-2xl border px-6 py-3.5 text-sm font-bold" style={{ ...cardS, color: "var(--red)" }}><Icon n="stop" size={15} /> {tr("To'xtatish")}</button>
            </>
          )}
        </div>
        <p className="mt-6 text-sm" style={{ color: "var(--ink)" }}>
          Bugun: <b style={{ color: tLog.c >= (cfg.cycles || 3) ? "var(--green)" : "var(--ink)" }}>{tLog.c}/{cfg.cycles || 3} pomodoro</b> · {fmtMin(tLog.m)} sof ish
        </p>
        <p className="mt-1 text-center text-[11px]" style={lblS}>{tr("Ish vaqti tugagach \"bu vaqtda nima qildingiz?\" deb so'raydi va tanlangan vazifaga daqiqa yozadi.")}</p>
      </Card>

      <Card>
        <h3 className="mb-3 flex items-center gap-2 text-base font-bold" style={{ color: "var(--ink)" }}><Icon n="settings" size={17} style={{ color: "var(--muted)" }} /> {tr("Sozlash")}</h3>
        <div className="flex flex-wrap items-center gap-2 text-sm" style={{ color: "var(--ink)" }}>
          <span>{tr("Ish:")}</span>
          <input type="number" value={w} onChange={e => setW(e.target.value)} className="w-14 rounded-lg border px-2 py-1.5 text-sm" style={inpS} />
          <span>{tr("daq · Dam:")}</span>
          <input type="number" value={r} onChange={e => setR(e.target.value)} className="w-14 rounded-lg border px-2 py-1.5 text-sm" style={inpS} />
          <span>{tr("daq · Sikl:")}</span>
          <input type="number" value={c} onChange={e => setC(e.target.value)} className="w-14 rounded-lg border px-2 py-1.5 text-sm" style={inpS} />
          <span>{tr("marta")}</span>
          <button onClick={() => { const wv = parseInt(w) || 25, rv = parseInt(r) || 5, cv = parseInt(c) || 3; if (wv > 0 && rv > 0 && cv > 0) setCfg({ work: wv, rest: rv, cycles: cv }); }}
            className="ms-auto rounded-lg px-3 py-1.5 text-sm font-bold text-white" style={{ background: "var(--green)" }}>{tr("Saqlash")}</button>
        </div>
        <p className="mt-2 text-[11px]" style={lblS}>{tr("Sikl — kunlik pomodoro maqsadingiz. Yetganingizda hisob yashil rangda ko'rinadi.")}</p>
      </Card>
    </div>
  );
}

// ish tugagach: tr("bu vaqtda nima qildingiz?") — tanlangan vazifaga daqiqa yoziladi
function PomoAsk({ min, tasks, logs, today, onPick }: { min: number; tasks: Task[]; logs: Logs; today: string; onPick: (taskId: string | null) => void }) {
  const lg = logs[today] || {};
  const opts = tasks.filter(t => t.kind !== "count" && !t.isSleep && taskActiveOn(t, today));
  return (
    <Modal title={`${fmtMin(min)} ish tugadi`} onClose={() => onPick(null)}>
      <p className="mb-3 text-sm" style={{ color: "var(--ink)" }}>{tr("Bu vaqtda nima qildingiz? Tanlangan vazifaga")} <b>{fmtMin(min)}</b> {tr("hisoblanadi — qismiy bajarilish beradi, ortiqchasi “ziyoda”ga o'tadi.")}</p>
      <div className="space-y-1.5">
        {opts.map(t => {
          const m = lg[t.id];
          return (
            <button key={t.id} onClick={() => onPick(t.id)} className="flex w-full items-center justify-between rounded-xl border px-3 py-2.5 text-left text-sm" style={{ ...cardS, borderInlineStartWidth: 3, borderInlineStartColor: t.scope === "oliy" ? "var(--gold)" : "var(--green)" }}>
              <span className="min-w-0 truncate" style={{ color: "var(--ink)" }}>{t.scope === "oliy" ? "⭐ " : ""}{t.name}</span>
              <span className="flex-none text-[11px]" style={lblS}>{t.minutes > 0 ? fmtMin(t.minutes) : "vaqtsiz"}{m && m.creditedMin ? ` · ${fmtMin(m.creditedMin)} ✓` : m && (m.st === "full" || m.st === "extra") ? " · ✓" : ""}</span>
            </button>
          );
        })}
        <button onClick={() => onPick(null)} className="w-full rounded-xl border py-2.5 text-sm" style={{ ...cardS, color: "var(--muted)" }}>{tr("Boshqa ish — vazifalarga yozilmasin")}</button>
      </div>
    </Modal>
  );
}

// FOKUS REJIMI — qop-qora ekran, faqat taymer. Ekran o'chmaydi (wake lock).
function FocusOverlay({ pomo, setPomo, pomoLog, today }: {
  pomo: PomoState; setPomo: React.Dispatch<React.SetStateAction<PomoState | null>>;
  pomoLog: Record<string, { c: number; m: number }>; today: string;
}) {
  const [, setTick] = useState(0);
  useEffect(() => { const iv = setInterval(() => setTick(t => t + 1), 500); return () => clearInterval(iv); }, []);
  useEffect(() => {
    let wl: { release: () => void } | null = null;
    const req = () => { try { (navigator as any).wakeLock?.request("screen").then((l: any) => { wl = l; }).catch(() => { }); } catch { } };
    req();
    const vis = () => { if (document.visibilityState === "visible") req(); };
    document.addEventListener("visibilitychange", vis);
    return () => { document.removeEventListener("visibilitychange", vis); try { if (wl) wl.release(); } catch { } };
  }, []);
  const leftMs = pomo.pausedLeft !== null ? pomo.pausedLeft : Math.max(pomo.endsAt - Date.now(), 0);
  const left = Math.max(Math.ceil(leftMs / 1000), 0);
  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");
  const tLog = pomoLog[today] || { c: 0, m: 0 };
  const paused = pomo.pausedLeft !== null;
  const dimBtn: React.CSSProperties = { border: "1px solid #333", background: "transparent" };
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center" style={{ background: "#000" }}>
      <Icon n="timer" size={30} style={{ color: "#59B483" }} />
      <div className="mt-4 text-[80px] font-bold leading-none tabular-nums" style={{ color: paused ? "#555" : "#F5F5F5" }}>{mm}:{ss}</div>
      <div className="mt-4 text-sm font-medium" style={{ color: paused ? "#777" : pomo.phase === "work" ? "#59B483" : "#D7A94B" }}>
        {paused ? "Pauzada" : pomo.phase === "work" ? tr("Fokus — ish vaqti") : tr("Dam olish")}
      </div>
      <div className="mt-2 text-xs" style={{ color: "#666" }}>Bugun: {tLog.c} pomodoro · {fmtMin(tLog.m)} sof ish</div>
      <div className="mt-12 flex items-center gap-3">
        {pomo.phase === "work" && !paused && (
          <button onClick={() => setPomo(pp => pp ? { ...pp, pausedLeft: Math.max(pp.endsAt - Date.now(), 0) } : pp)}
            className="om-press rounded-2xl px-6 py-3 text-sm font-bold" style={{ ...dimBtn, color: "#D7A94B" }}>{tr("Pauza")}</button>
        )}
        {pomo.phase === "work" && paused && (
          <button onClick={() => setPomo(pp => pp ? { ...pp, endsAt: Date.now() + (pp.pausedLeft || 0), pausedLeft: null } : pp)}
            className="om-press rounded-2xl px-7 py-3 text-sm font-bold text-white" style={{ background: "#59B483" }}>{tr("Davom")}</button>
        )}
        <button onClick={async () => { if (await omConfirm(tr("Taymer to'xtatilsinmi? (bu pomodoro hisobga kirmaydi)"))) setPomo(null); }}
          className="om-press rounded-2xl px-6 py-3 text-sm font-bold" style={{ ...dimBtn, color: "#E5674F" }}>{tr("To'xtatish")}</button>
      </div>
      <button onClick={() => setPomo(pp => pp ? { ...pp, mode: "open" } : pp)} className="mt-8 text-xs" style={{ color: "#666" }}>
        {tr("Fokusdan chiqish (taymer davom etadi)")}
      </button>
    </div>
  );
}

// ================== TIL SAHIFASI ==================
function TilPage(p: { lang: Lang; setLang: React.Dispatch<React.SetStateAction<Lang>>; onBack: () => void }) {
  return (
    <div className="space-y-4">
      <div className="om-card flex items-center px-3 py-3">
        <button onClick={p.onBack} className="om-press grid h-9 w-9 place-items-center rounded-xl" style={{ color: "var(--green)" }}><Icon n="arrowLeft" size={22} /></button>
        <span className="flex-1 text-center text-lg font-bold" style={{ color: "var(--ink)" }}>{tr("Til")}</span>
        <span className="h-9 w-9" />
      </div>

      <p className="px-1 text-[13px] leading-relaxed" style={lblS}>{tr("Ilova tilini tanlang. Til istalgan vaqtda o'zgartirilishi mumkin.")}</p>

      <div className="om-card overflow-hidden p-0">
        {TILLAR.map((tl, i) => {
          const active = p.lang === tl.id;
          const off = tl.holat === "tez";
          return (
            <button key={tl.id} disabled={off} onClick={() => { if (!off) { p.setLang(tl.id); buzz(); } }}
              className={"om-press flex w-full items-center gap-3.5 px-4 py-3.5 text-left" + (i ? " border-t" : "")}
              style={{ borderColor: "var(--line)", opacity: off ? 0.45 : 1 }}>
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-2xl font-bold text-white" style={{ background: tl.grad }}>{tl.belgi}</span>
              <span className="flex-1">
                <span className="block text-[15px] font-bold" style={{ color: "var(--ink)" }}>{tl.nom}</span>
                <span className="block text-[11px]" style={lblS}>{off ? tr("tez orada") : tl.izoh}</span>
              </span>
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border-2" style={{ borderColor: active ? tl.rang : "var(--line)" }}>
                {active && <span className="h-3 w-3 rounded-full" style={{ background: tl.rang }} />}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex items-start gap-2 px-1">
        <span className="mt-px shrink-0" style={{ color: "var(--green)" }}><Icon n="info" size={15} /></span>
        <p className="text-[12px] leading-relaxed" style={lblS}>{tr("Tarjimasi hali tayyor bo'lmagan matnlar o'zbekcha ko'rinadi.")}</p>
      </div>
    </div>
  );
}

// ================== SOZLAMALAR ==================
function SozlamaPage(p: { settings: Settings; setSettings: React.Dispatch<React.SetStateAction<Settings>>; setPlan: React.Dispatch<React.SetStateAction<Plan | null>>; today: string; allData: () => Record<string, unknown>; quotes: Quote[]; setQuotes: React.Dispatch<React.SetStateAction<Quote[]>>; lang: Lang; openTil: () => void }) {
  const { settings, setSettings, lang } = p;
  const [qText, setQText] = useState("");
  const [qPos, setQPos] = useState<Quote["pos"]>("top");
  const [qEdit, setQEdit] = useState<Quote | null>(null);
  const POS_N: Record<Quote["pos"], string> = { top: tr("Tepada"), mid: tr("O'rtada"), bottom: tr("Pastda") };
  const fileRef = useRef<HTMLInputElement>(null);
  const [showHelp, setShowHelp] = useState(false);
  const openTelegram = async () => {
    const ok = await omConfirm(tr("«Oliy maqsad» kanaliga o'tasizmi?"), tr("Telegram ilovasi ochiladi."), { okText: tr("Ha, o'taman") });
    if (ok) { try { window.open("https://telegram.me/Oliymaqsad_apk", "_blank"); } catch { location.href = "https://telegram.me/Oliymaqsad_apk"; } }
  };
  const SecLabel = ({ icon, children }: { icon: string; children: React.ReactNode }) => (
    <p className="flex items-center gap-2 px-1 pt-2 text-[11px] font-bold uppercase tracking-wider" style={lblS}><Icon n={icon} size={13} /> {children}</p>
  );

  const pdfBackup = async () => {
    const data = p.allData() as Record<string, any>;
    const plan = (data.om3_plan || {}) as Plan;
    const tasks = (data.om3_tasks || []) as Task[];
    const weights = (data.om3_weights || []) as Weight[];
    const logs = (data.om3_logs || {}) as Logs;
    const lines: string[] = [];
    lines.push("OLIY MAQSAD — HISOBOT VA ZAXIRA");
    lines.push("Sana: " + p.today);
    lines.push("---------------------------------------------------------");
    lines.push("");
    lines.push("MAQSAD:");
    wrapText(plan.goal || "", 88).forEach(l => lines.push("  " + l));
    lines.push("");
    const doneT = tasks.filter(t => t.scope === "oliy" && t.completedAt);
    lines.push("TUGATILGAN OLIY VAZIFALAR (" + doneT.length + " ta):");
    doneT.forEach(t => lines.push("  - " + t.name + " (" + (t.type || "-") + "): " + t.startDate + " -> " + t.completedAt));
    if (!doneT.length) lines.push("  - hali yo'q");
    lines.push("");
    const inProg = tasks.filter(t => t.scope === "oliy" && !t.completedAt && !t.archivedAt);
    lines.push("JARAYONDAGI OLIY VAZIFALAR (" + inProg.length + " ta):");
    inProg.forEach(t => lines.push("  - " + t.name + " — " + t.startDate + " dan"));
    if (!inProg.length) lines.push("  - yo'q");
    lines.push("");
    if (weights.length) {
      lines.push("VAZN (oxirgi o'lchovlar):");
      weights.slice(-12).forEach(w2 => lines.push("  - " + w2.date + ": " + w2.kg + " kg"));
      lines.push("");
    }
    lines.push("Belgilangan kunlar soni: " + Object.keys(logs).length);
    lines.push("");
    lines.push("!!! MUHIM: bu PDF ichida ilovaning TO'LIQ zaxira ma'lumoti yashiringan.");
    lines.push("Tiklash: ilovada Sozlamalar -> Zaxira -> 'Fayldan tiklash' -> shu faylni tanlang.");
    lines.push("Bu faylni o'chirmang — Telegram Saqlanganlar yoki Google Drive'da saqlang.");
    const blob = makePdf(lines, b64enc(JSON.stringify(data)));
    await saveFile(blob, `oliy-maqsad-zaxira-${p.today}.pdf`);
    setSettings(s => ({ ...s, lastBackup: p.today }));
  };

  const importFile = (f: File) => {
    const r = new FileReader();
    r.onload = async () => {
      const txt = String(r.result);
      let data: Record<string, any> | null = null;
      try { data = JSON.parse(txt); } catch {
        const i = txt.lastIndexOf("%%OMDATA:");
        if (i >= 0) { try { data = JSON.parse(b64dec(txt.slice(i + 9).trim())); } catch { } }
      }
      if (!data || !data.om3_plan) { omAlert(tr("Bu fayl Oliy Maqsad zaxirasi emas."), tr("Fayl buzilgan yoki boshqa ilovaniki bo'lishi mumkin.")); return; }
      const ok = await omConfirm(tr("Ma'lumot almashtirilsinmi?"), tr("Hozirgi barcha ma'lumotlaringiz fayldagi bilan almashtiriladi. Bu amalni ortga qaytarib bo'lmaydi."), { danger: true, okText: tr("Ha, o'rnatilsin") });
      if (!ok) return;
      Object.keys(data).forEach(k => { if (k.startsWith("om3_")) localStorage.setItem(k, JSON.stringify(data![k])); });
      window.location.reload();
    };
    r.readAsText(f);
  };

  const replan = async () => {
    const ok = await omConfirm(tr("Maqsadni qayta shakllantirasizmi?"), tr("Kirish sahifasi qaytadan ochiladi, lekin barcha tarix — belgilashlar, vazifalar, xulosalar — saqlanadi."));
    if (ok) p.setPlan(null);
  };

  const fullReset = async () => {
    await pdfBackup();
    const ok1 = await omConfirm(tr("Hammasini o'chirasizmi?"), tr("Zaxira nusxa hozirgina yuklab berildi. Barcha vazifalar, belgilashlar va statistika butunlay o'chadi."), { danger: true, okText: tr("Davom etish") });
    if (!ok1) return;
    const ok2 = await omConfirm(tr("Oxirgi tasdiq"), tr("Bu amalni ortga qaytarib bo'lmaydi. Rostdan ham hammasini o'chirasizmi?"), { danger: true, okText: tr("Ha, o'chirilsin") });
    if (!ok2) return;
    Object.keys(localStorage).filter(k => k.startsWith("om3_")).forEach(k => localStorage.removeItem(k));
    window.location.reload();
  };

  return (
    <div className="space-y-4">
      <h2 className="mb-1 flex items-center gap-2.5 text-2xl font-bold" style={{ color: "var(--ink)" }}><span className="grid h-9 w-9 place-items-center rounded-2xl" style={{ background: "var(--soft)", color: "var(--green)" }}><Icon n="settings" size={20} /></span>{tr("Sozlamalar")}</h2>

      <input ref={fileRef} type="file" accept=".pdf,.json" onChange={e => e.target.files && e.target.files[0] && importFile(e.target.files[0])} style={{ display: "none" }} />
      <SecLabel icon="database">{tr("Ma'lumotlar")}</SecLabel>
      <div className="grid grid-cols-2 gap-2.5">
        <button onClick={pdfBackup} className="om-press om-card flex flex-col items-center gap-2 p-4 text-center">
          <span className="grid h-11 w-11 place-items-center rounded-2xl" style={{ background: "var(--soft)", color: "var(--green)" }}><Icon n="download" size={22} /></span>
          <span className="text-sm font-bold" style={{ color: "var(--ink)" }}>{tr("PDF yuklab olish")}</span>
          <span className="text-[10px] leading-tight" style={lblS}>{tr("Ma'lumotlaringiz telefon xotirasiga saqlanadi")}</span>
        </button>
        <button onClick={() => fileRef.current?.click()} className="om-press om-card flex flex-col items-center gap-2 p-4 text-center">
          <span className="grid h-11 w-11 place-items-center rounded-2xl" style={{ background: "var(--soft)", color: "var(--gold)" }}><Icon n="upload" size={22} /></span>
          <span className="text-sm font-bold" style={{ color: "var(--ink)" }}>{tr("PDF o'rnatish")}</span>
          <span className="text-[10px] leading-tight" style={lblS}>{tr("Fayldagi ma'lumot ilovaga yuklanadi")}</span>
        </button>
      </div>
      <p className="px-1 text-[11px]" style={lblS}>{tr("Oxirgi zaxira")}: {settings.lastBackup ? fmtUzFull(settings.lastBackup) : tr("hali olinmagan")}. {tr("«O'rnatish» amaldagi ma'lumotni almashtiradi — ogohlantiriladi.")}</p>

      <SecLabel icon="globe">{tr("Til")}</SecLabel>
      <Card onClick={p.openTil} className="flex items-center gap-3.5">
        {(() => { const cur = TILLAR.find(x => x.id === lang) || TILLAR[0]; return (<>
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-lg font-bold text-white" style={{ background: cur.grad }}>{cur.belgi}</span>
          <span className="flex-1">
            <span className="block text-sm font-bold" style={{ color: "var(--ink)" }}>{tr("Ilova tili")}</span>
            <span className="block text-[11px]" style={lblS}>{cur.nom}</span>
          </span>
          <Icon n="chevronRight" size={18} style={{ color: "var(--muted)" }} />
        </>); })()}
      </Card>

      <SecLabel icon="palette">{tr("Ko'rinish")}</SecLabel>
      <div className="grid grid-cols-2 gap-2.5">
        <button onClick={() => setSettings(s => ({ ...s, dark: false }))} className="om-press flex flex-col items-center gap-2 rounded-2xl border p-4" style={!settings.dark ? { borderColor: "var(--green)", background: "var(--soft)", borderWidth: 2 } : { ...cardS, borderWidth: 2 }}>
          <Icon n="sun" size={24} style={{ color: !settings.dark ? "var(--green)" : "var(--muted)" }} />
          <span className="text-sm font-bold" style={{ color: "var(--ink)" }}>{tr("Tonggi")}</span>
          <span className="text-[10px]" style={lblS}>{tr("Ochiq fon")}</span>
        </button>
        <button onClick={() => setSettings(s => ({ ...s, dark: true }))} className="om-press flex flex-col items-center gap-2 rounded-2xl border p-4" style={settings.dark ? { borderColor: "var(--green)", background: "var(--soft)", borderWidth: 2 } : { ...cardS, borderWidth: 2 }}>
          <Icon n="moon" size={24} style={{ color: settings.dark ? "var(--green)" : "var(--muted)" }} />
          <span className="text-sm font-bold" style={{ color: "var(--ink)" }}>{tr("Tungi")}</span>
          <span className="text-[10px]" style={lblS}>{tr("To'q fon")}</span>
        </button>
      </div>

      <SecLabel icon="calendar">{tr("Hijriy sana tuzatgichi")}</SecLabel>
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold" style={{ color: "var(--ink)" }}>{tr("Hijriy sana")}</div>
            <div className="text-[11px]" style={lblS}>{settings.hijriOffset > 0 ? "+" : ""}{settings.hijriOffset} {tr("kun surilgan")}</div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setSettings(s => ({ ...s, hijriOffset: s.hijriOffset - 1 }))} className="om-press grid h-9 w-9 place-items-center rounded-xl" style={{ background: "var(--soft)", color: "var(--ink)" }}><Icon n="minus" size={16} /></button>
            <span className="w-8 text-center text-sm font-bold tabular-nums" style={{ color: "var(--ink)" }}>{settings.hijriOffset > 0 ? "+" : ""}{settings.hijriOffset}</span>
            <button onClick={() => setSettings(s => ({ ...s, hijriOffset: s.hijriOffset + 1 }))} className="om-press grid h-9 w-9 place-items-center rounded-xl" style={{ background: "var(--soft)", color: "var(--ink)" }}><Icon n="plus" size={16} /></button>
          </div>
        </div>
      </Card>

      <SecLabel icon="info">{tr("Yordam")}</SecLabel>
      <button onClick={() => setShowHelp(true)} className="om-press om-card flex w-full items-center gap-3 p-4 text-left">
        <span className="grid h-11 w-11 flex-none place-items-center rounded-2xl" style={{ background: "var(--soft)", color: "var(--green)" }}><Icon n="info" size={21} /></span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-bold" style={{ color: "var(--ink)" }}>{tr("Qanday ishlaydi?")}</span>
          <span className="block text-[11px]" style={lblS}>{tr("Ilovaning har bo'limi haqida qisqa izoh")}</span>
        </span>
        <Icon n="chevronRight" size={16} style={{ color: "var(--muted)" }} />
      </button>

      <SecLabel icon="send">{tr("Ilova yangiliklari")}</SecLabel>
      <button onClick={openTelegram} className="om-press om-card flex w-full items-center gap-3 p-4 text-left">
        <span className="grid h-11 w-11 flex-none place-items-center rounded-2xl" style={{ background: "#229ED9" }}><Icon n="send" size={22} style={{ color: "#fff" }} /></span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-bold" style={{ color: "var(--ink)" }}>{tr("«Oliy maqsad» telegram kanali")}</span>
          <span className="block text-[11px]" style={lblS}>{tr("Yangiliklar va yangilanishlar shu yerda")}</span>
        </span>
        <Icon n="chevronRight" size={16} style={{ color: "var(--muted)" }} />
      </button>

      <SecLabel icon="quote">{tr("Shaxsiy iqtiboslar")}</SecLabel>
      <Card>
        <p className="mb-2 text-[11px]" style={lblS}>{tr("O'zingiz uchun iqtibos yoki eslatma yozing — Bugun sahifasining tanlangan joyida ko'rinib turadi.")}</p>
        {p.quotes.map(q => (
          <div key={q.id} className="mb-1.5 flex items-start gap-2 rounded-xl border px-3 py-2" style={cardS}>
            <span className="min-w-0 flex-1 text-sm italic" style={{ color: "var(--ink)" }}>{q.text}</span>
            <span className="flex-none text-[10px]" style={lblS}>{POS_N[q.pos]}</span>
            <button onClick={() => { setQEdit(q); setQText(q.text); setQPos(q.pos); }} className="flex-none" style={{ color: "var(--green)" }}><Icon n="pencil" size={15} /></button>
            <button onClick={async () => { if (await omConfirm(tr("Iqtibos o'chirilsinmi?"))) p.setQuotes(qs => qs.filter(x => x.id !== q.id)); }} className="flex-none" style={{ color: "var(--red)" }}><Icon n="trash" size={15} /></button>
          </div>
        ))}
        <textarea value={qText} onChange={e => setQText(e.target.value)} rows={2} placeholder={tr("O'zingizga eslatma yoki iqtibos...")} className={inpC + " mb-2"} style={inpS} />
        <div className="mb-2 flex gap-1.5">
          {(["top", "mid", "bottom"] as const).map(ps => (
            <button key={ps} onClick={() => setQPos(ps)} className="flex-1 rounded-lg border py-1.5 text-xs font-medium"
              style={qPos === ps ? { background: "var(--gold)", color: "#fff", borderColor: "var(--gold)" } : { ...cardS, color: "var(--ink)" }}>{POS_N[ps]}</button>
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={() => {
            if (!qText.trim()) return;
            if (qEdit) p.setQuotes(qs => qs.map(x => x.id === qEdit.id ? { ...x, text: qText.trim(), pos: qPos } : x));
            else p.setQuotes(qs => [...qs, { id: uid(), text: qText.trim(), pos: qPos }]);
            setQText(""); setQEdit(null);
          }} className="flex-1 rounded-lg py-2 text-sm font-bold text-white" style={{ background: "var(--green)" }}>{qEdit ? tr("Saqlash") : "+ " + tr("Qo'shish")}</button>
          {qEdit && <button onClick={() => { setQEdit(null); setQText(""); }} className="rounded-lg border px-4 py-2 text-sm" style={{ ...cardS, color: "var(--muted)" }}>{tr("Bekor")}</button>}
        </div>
        <p className="mt-2 text-[10px]" style={lblS}>{tr("Joylashuv: Tepada — progress ostida · O'rtada — vazifalardan oldin · Pastda — kun xulosasidan oldin.")}</p>
      </Card>

      <SecLabel icon="target">{tr("Maqsad")}</SecLabel>
      <Card style={{ borderColor: "var(--gold)" }}>
        <button onClick={replan} className="mb-2 w-full rounded-lg border py-2 text-sm" style={{ ...cardS, color: "var(--ink)" }}>
          {tr("Maqsadni qayta shakllantirish (tarix saqlanadi)")}
        </button>
        <button onClick={fullReset} className="w-full rounded-lg border py-2 text-sm" style={{ ...cardS, color: "var(--red)" }}>
          {tr("Butunlay noldan boshlash (hammasi o'chadi)")}
        </button>
      </Card>

      {showHelp && <HelpSheet onClose={() => setShowHelp(false)} />}
    </div>
  );
}

// tr("Qanday ishlaydi?") — har bo'lim haqida qisqa izoh
const HELP_ITEMS: { icon: string; t: string; s: string }[] = [
  { icon: "home", t: "Bugun", s: "Kunning yuragi. Yuqorida bugungi natija, keyin vazifalaringiz. Katakchani bossangiz belgilash oynasi ochiladi: qildim, sababli qilmadim yoki umuman qilmadim." },
  { icon: "plus", t: "Qo'shish (+)", s: "Pastdagi yashil tugma. Undan kundalik vazifa, oliy maqsad vazifasi, yillik maqsad qo'shasiz va barcha vazifalar ro'yxatini ochasiz." },
  { icon: "clock", t: "Vazifa vaqti", s: "Har vazifaga vaqt oralig'i belgilanadi — masalan 08:00–09:00. O'sha vaqt kelganda telefonga eslatma keladi, ilova yopiq bo'lsa ham. Kunlarni ham tanlashingiz mumkin." },
  { icon: "sparkles", t: "Qo'shimcha ish", s: "Rejadan ortiq ish qilsangiz shu yerga yozasiz. U tegishli vazifaga «ziyoda» bo'lib qo'shiladi va statistikada foizni 100% dan yuqoriga chiqaradi." },
  { icon: "mosque", t: "Ibodatlar", s: "Alohida bo'lim, kunlik foizga aralashmaydi. Zikrlar, besh vaqt namoz, nafllar va Qur'on xatmi shu yerda belgilanadi." },
  { icon: "timer", t: "Pomodoro", s: "Ikki rejim bor. Fokusda ekran qorayadi va faqat taymer qoladi. Ochiq rejimda ilovadan chiqsangiz ham vaqt tugaganda xabar keladi." },
  { icon: "calendar", t: "Taqvim", s: "Har kun rangi natijaga qarab: to'liq bajarilgan kun yashil, yarmidan ko'pi sariq, past bo'lsa qizil. Dam kuni rangsiz — u hisobga kirmaydi." },
  { icon: "stats", t: "Statistika", s: "Kunlik, haftalik va oylik ko'rinish. Har raqam yonida o'tgan davrga nisbatan farqi turadi. Grafikdagi nuqtaga bossangiz qaysi kun ekani chiqadi." },
  { icon: "target", t: "Oliy maqsad", s: "Maqsad matningiz, natija halqasi va yillik maqsadlaringiz. Har maqsadni bosib jarayonini ko'rasiz — hafta, oy, 6 oy va yil bo'yicha." },
  { icon: "database", t: "Zaxira", s: "Sozlamalar → Ma'lumotlar. PDF yuklab olsangiz hamma ma'lumot shu faylda saqlanadi. Yangi telefonda «PDF o'rnatish» orqali tiklaysiz." },
];

function HelpSheet({ onClose }: { onClose: () => void }) {
  return (
    <Sheet title={<span className="flex items-center gap-2"><Icon n="info" size={16} style={{ color: "var(--green)" }} /> {tr("Qanday ishlaydi?")}</span>} onClose={onClose}>
      <div className="space-y-2.5">
        {HELP_ITEMS.map(x => (
          <div key={x.t} className="flex gap-3">
            <span className="grid h-9 w-9 flex-none place-items-center rounded-xl" style={{ background: "var(--soft)", color: "var(--green)" }}><Icon n={x.icon} size={17} /></span>
            <span className="min-w-0 flex-1">
              <span className="block text-[13px] font-bold" style={{ color: "var(--ink)" }}>{tr(x.t)}</span>
              <span className="block text-[11.5px] leading-relaxed" style={lblS}>{tr(x.s)}</span>
            </span>
          </div>
        ))}
      </div>
    </Sheet>
  );
}

// ================== ILOVA ==================
export default function App() {
  const [plan, setPlan] = useStored<Plan | null>("om3_plan", null);
  const [folders, setFolders] = useStored<Folder[]>("om3_folders", []);
  const [tasks, setTasks] = useStored<Task[]>("om3_tasks", []);
  const [logs, setLogs] = useStored<Logs>("om3_logs", {});
  const [extras, setExtras] = useStored<Extra[]>("om3_extras", []);
  const [counts, setCounts] = useStored<Record<string, Record<string, number>>>("om3_counts", {});
  const [countLog, setCountLog] = useStored<CountLog>("om3_countlog", {});
  const [weights, setWeights] = useStored<Weight[]>("om3_weights", []);
  const [notes, setNotes] = useStored<Record<string, string>>("om3_notes", {});
  const [sleepCfg, setSleepCfg] = useStored<SleepCfg | null>("om3_sleepcfg", null);
  const [sleepLog, setSleepLog] = useStored<Record<string, number>>("om3_sleeplog", {});
  const [pomoCfg, setPomoCfg] = useStored<PomoCfg>("om3_pomocfg", { work: 25, rest: 5 });
  const [pomoLog, setPomoLog] = useStored<Record<string, { c: number; m: number }>>("om3_pomolog", {});
  const [settings, setSettings] = useStored<Settings>("om3_settings", { hijriOffset: 0, remindersOn: false, reminderTimes: ["21:00"], dark: false, lastBackup: null });
  const [ib, setIb] = useStored<IbadatLog>("om3_ibadat", {});
  const [khatm, setKhatm] = useStored<KhatmCfg | null>("om3_khatm", null);
  const [gender, setGender] = useStored<Gender | null>("om3_gender", null);
  const [dayMode, setDayMode] = useStored<DayMode>("om3_daymode", { mode: "list", lockedUntil: "" });
  const [ui, setUi] = useStored<Record<string, boolean>>("om3_ui", {});
  const [lang, setLang] = useStored<Lang>("om3_lang", "uz");
  setCur(lang); // til almashsa butun ekran shu qiymat bilan qayta chiziladi
  const [pomo, setPomo] = useState<PomoState | null>(null);
  const [pomoAsk, setPomoAsk] = useState<{ min: number } | null>(null);
  const [pomoModeAsk, setPomoModeAsk] = useState(false);
  const [quotes, setQuotes] = useStored<Quote[]>("om3_quotes", []);
  const [news, setNews] = useStored<string>("om3_news", "");
  const [hints, setHints] = useStored<Record<string, boolean>>("om3_hints", {});
  const doneHint = (k: string) => setHints(h => h[k] ? h : { ...h, [k]: true });
  const pomoRef = useRef<PomoState | null>(null);
  pomoRef.current = pomo;
  const lastPomoMode = useRef<"focus" | "open">("open");
  const [tab, setTab] = useState<"bugun" | "taqvim" | "stat" | "maqsad">("bugun");
  const [page, setPage] = useState<null | "ibodat" | "vazifalar" | "sozlama" | "pomo" | "uyqu" | "til">(null);
  const [countForm, setCountForm] = useState(false);
  const [addMenu, setAddMenu] = useState(false);
  const [showAdd, setShowAdd] = useState<null | "daily" | "oliy">(null);
  const [showMetrics, setShowMetrics] = useState(false);
  const [today, setToday] = useState(todayStr());
  const [splash, setSplash] = useState(true);

  useEffect(() => { const t = setTimeout(() => setSplash(false), 1250); return () => clearTimeout(t); }, []);

  // Til almashganda hujjat yo'nalishi: arabcha — o'ngdan chapga (RTL), qolgani chapdan o'ngga.
  // <html> ga qo'yiladi, shunda modal/sheet kabi barcha qatlamlar ham to'g'ri joylashadi.
  useEffect(() => {
    const el = document.documentElement;
    el.dir = lang === "ar" ? "rtl" : "ltr";
    el.lang = lang === "uzk" ? "uz" : lang;
  }, [lang]);

  useEffect(() => {
    const t = setInterval(() => { const n = todayStr(); if (n !== today) setToday(n); }, 30000);
    return () => clearInterval(t);
  }, [today]);


  // uyqu vazifasi
  useEffect(() => {
    const st = tasks.find(t => t.isSleep && !t.archivedAt);
    if (sleepCfg && !st) {
      // ikki marta qo'shilib qolmasligi uchun ichkarida ham tekshiriladi (StrictMode/poyga himoyasi)
      setTasks(ts => ts.some(t => t.isSleep && !t.archivedAt) ? ts : [...ts, { id: uid(), name: "Rejaga muvofiq uyqu", type: "uyqu", scope: "daily", folderId: null, minutes: 0, startDate: today, endDate: null, days: [], remTime: null, remText: "", pauses: [], abandonedAt: null, archivedAt: null, countsHours: false, isSleep: true, plannedDays: null, notes: [], completedAt: null, kind: "time", createdAt: today }]);
    } else if (!sleepCfg && st) {
      setTasks(ts => ts.map(t => t.isSleep && !t.archivedAt ? { ...t, archivedAt: today } : t));
    }
  }, [sleepCfg, tasks, today]);

  // pomodoro: ish tugagach avtomatik davom etmaydi — "nima qildingiz?" so'raladi
  useEffect(() => {
    if (!pomo || pomo.pausedLeft !== null) return;
    const iv = setInterval(() => {
      if (Date.now() < pomo.endsAt) return;
      if (pomo.phase === "work") {
        notify(tr("Ish vaqti tugadi! Bu vaqtda nima qilganingizni belgilang."));
        setPomoLog(pl => { const t = pl[today] || { c: 0, m: 0 }; return { ...pl, [today]: { c: t.c + 1, m: t.m + pomoCfg.work } }; });
        setPomoAsk({ min: pomoCfg.work });
        setPomo(null);
      } else {
        notify(tr("Dam tugadi — yangi pomodoroni o'zingiz boshlaysiz. Bismillah!"));
        setPomo(null);
      }
    }, 1000);
    return () => clearInterval(iv);
  }, [pomo, pomoCfg, today]);

  // pomodoro daqiqasini vazifaga yozish (qismiy bajarilish, ortiqchasi ziyoda)
  const creditMinutes = (taskId: string | null, min: number) => {
    if (taskId) {
      setLogs(ls => {
        const day = { ...(ls[today] || {}) };
        const m: MarkV5 = { ...(day[taskId] || {}) };
        const t = tasks.find(x => x.id === taskId);
        const tm = t ? t.minutes : 0;
        if (m.st === "full" || m.st === "extra") { m.st = "extra"; m.extraMin = (m.extraMin || 0) + min; }
        else {
          m.creditedMin = (m.creditedMin || 0) + min;
          if (tm > 0 && m.creditedMin >= tm) {
            m.extraMin = Math.max(m.creditedMin - tm, 0) || undefined;
            m.st = m.extraMin ? "extra" : "full";
            m.creditedMin = tm;
          }
        }
        day[taskId] = m;
        return { ...ls, [today]: day };
      });
    }
    setPomoAsk(null);
    setPomo({ phase: "rest", endsAt: Date.now() + pomoCfg.rest * 60000, pausedLeft: null, mode: lastPomoMode.current });
  };

  // pomodoro tugashi — telefon bildirishnomasi (ilova yopiq/fon bo'lsa ham keladi)
  useEffect(() => {
    const ln = LN(); if (!ln) return;
    try { ln.cancel({ notifications: [{ id: 3001 }] }).catch(() => { }); } catch { }
    if (!pomo || pomo.pausedLeft !== null) return;
    try {
      ln.schedule({
        notifications: [{
          id: 3001,
          title: pomo.phase === "work" ? tr("Ish vaqti tugadi") : tr("Dam tugadi"),
          body: pomo.phase === "work" ? tr("Bu vaqtda nima qilganingizni belgilang.") : tr("Yangi pomodoroni o'zingiz boshlaysiz."),
          smallIcon: "ic_stat_om",
          schedule: { at: new Date(pomo.endsAt), allowWhileIdle: true },
        }],
      }).catch(() => { });
    } catch { }
  }, [pomo]);

  // kunlik eslatmalarni telefon darajasida rejalash (ilova yopiq bo'lsa ham chalinadi)
  useEffect(() => {
    const ln = LN(); if (!ln || !plan) return;
    const tm = setTimeout(async () => {
      try {
        await ln.requestPermissions();
        const pend = await ln.getPending();
        const olds = ((pend && pend.notifications) || []).filter((n: { id: number }) => n.id < 3000).map((n: { id: number }) => ({ id: n.id }));
        if (olds.length) await ln.cancel({ notifications: olds });
        const list: Record<string, unknown>[] = [];
        let id = 1;
        // dam kunida bildirishnoma kelmasin — har kunni alohida hafta-kuni sifatida rejalaymiz, dam kunini o'tkazib
        // Capacitor weekday: 1=Yakshanba..7=Shanba; JS getDay: 0=Yakshanba → weekday = jsDay+1
        const restWd = plan.restDay; // 0-6 yoki null
        // days bo'sh bo'lsa — har kuni; aks holda faqat tanlangan kunlarda. Dam kuni har doim chiqarib tashlanadi.
        const pushDaily = (body: string, h: number, mi: number, days?: number[]) => {
          const wanted = days && days.length ? days : [0, 1, 2, 3, 4, 5, 6];
          const eff = wanted.filter(wd => wd !== restWd);
          if (eff.length === 7) {
            list.push({ id: id++, title: "Oliy Maqsad", body, smallIcon: "ic_stat_om", schedule: { on: { hour: h, minute: mi }, allowWhileIdle: true } });
          } else {
            eff.forEach(wd => list.push({ id: id++, title: "Oliy Maqsad", body, smallIcon: "ic_stat_om", schedule: { on: { weekday: wd + 1, hour: h, minute: mi }, allowWhileIdle: true } }));
          }
        };
        if (settings.remindersOn) settings.reminderTimes.forEach(t => {
          const [h, mi] = t.split(":").map(Number);
          if (!isNaN(h)) pushDaily(tr("Bugungi ishlaringizni tekshirib qo'ying."), h, mi || 0);
        });
        tasks.forEach(t => {
          if (t.archivedAt || t.abandonedAt || t.completedAt || t.isSleep) return;
          // vazifa vaqt oralig'i boshi — faqat vazifa kunlarida
          if (t.schedFrom) {
            const [sh, sm] = t.schedFrom.split(":").map(Number);
            if (!isNaN(sh)) pushDaily(`${t.name} vaqti keldi${t.schedTo ? ` (${t.schedFrom}–${t.schedTo})` : ""}`, sh, sm || 0, t.days);
          }
          // qo'shimcha eslatma
          if (t.remTime) {
            const [h, mi] = t.remTime.split(":").map(Number);
            if (!isNaN(h)) pushDaily(t.remText || `Vazifa vaqti: ${t.name}`, h, mi || 0, t.days);
          }
        });
        if (list.length) await ln.schedule({ notifications: list });
      } catch { }
    }, 2000);
    return () => clearTimeout(tm);
  }, [plan === null, plan && plan.restDay, settings.remindersOn, settings.reminderTimes.join(","), tasks.map(t => t.id + "|" + (t.schedFrom || "") + (t.remTime || "") + (t.days || []).join("") + (t.archivedAt || "") + (t.completedAt || "")).join(",")]);

  // eslatmalar
  useEffect(() => {
    if (!plan) return;
    const iv = setInterval(() => {
      if (!("Notification" in window) || Notification.permission !== "granted") return;
      if (pomoRef.current && pomoRef.current.mode === "focus") return; // Fokus rejimida ichki eslatmalar jim turadi
      const now = new Date();
      const hm = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
      const rest = isRest(today, plan.restDay);
      tasks.forEach(t => {
        if (!t.remTime || t.remTime !== hm || rest || !taskActiveOn(t, today)) return;
        const m = (logs[today] || {})[t.id];
        if (m && m.st) return;
        const flag = `om3_ntf_${t.id}_${today}`;
        if (localStorage.getItem(flag)) return;
        notify(t.remText || `Vazifa vaqti: ${t.name}`);
        localStorage.setItem(flag, "1");
      });
      if (settings.remindersOn && !rest && settings.reminderTimes.includes(hm)) {
        const flag = `om3_ntf_gen_${today}_${hm}`;
        if (!localStorage.getItem(flag)) {
          const act = tasks.filter(t => t.kind !== "count" && taskActiveOn(t, today));
          const lg = logs[today] || {};
          const left = act.filter(t => !lg[t.id] || !lg[t.id].st);
          if (left.length > 0) {
            notify(`${tr("Bugun")} ${left.length} ${tr("ta ish qoldi")}: ${left.slice(0, 3).map(t => t.name).join(", ")}${left.length > 3 ? "..." : ""}`);
            localStorage.setItem(flag, "1");
          }
        }
      }
    }, 30000);
    return () => clearInterval(iv);
  }, [plan, settings.remindersOn, settings.reminderTimes, tasks, logs, today]);

  const allData = () => {
    const out: Record<string, unknown> = {};
    Object.keys(localStorage).filter(k => k.startsWith("om3_")).forEach(k => {
      try { out[k] = JSON.parse(localStorage.getItem(k) || "null"); } catch { }
    });
    return out;
  };


  const styleBlock = (
    <style>{`
      :root {
        --bg:#F4EFE6; --card:#FFFFFF; --soft:#EFE8DB; --ink:#26221B; --muted:#8A8578;
        --line:rgba(0,0,0,0.06); --green:#2E7D57; --gold:#B8862F; --red:#C0492F; --blue:#6F7D68;
        --shadow:0 4px 18px rgba(40,32,18,0.06); --shadow-lg:0 12px 34px rgba(40,32,18,0.12);
        --r-card:20px; --r-btn:18px; --r-input:16px;
      }
      .om-dark {
        --bg:#16130F; --card:#201B15; --soft:#2A241C; --ink:#F5F5F5; --muted:#A5A5A5;
        --line:rgba(255,255,255,0.06); --green:#59B483; --gold:#D7A94B; --red:#E5674F; --blue:#8C9A86;
        --shadow:0 4px 18px rgba(0,0,0,0.30); --shadow-lg:0 14px 36px rgba(0,0,0,0.44);
      }
      html, body { background: var(--bg); color: var(--ink);
        font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
        -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; }
      body { overflow-x: hidden; letter-spacing: -0.01em; }
      * { -webkit-tap-highlight-color: transparent; }
      ::-webkit-scrollbar { width: 0; height: 0; }
      button { font-family: inherit; letter-spacing: inherit; }
      input, select, textarea { font-family: inherit; }
      @keyframes omFade { from { opacity:0; transform: translateY(10px); } to { opacity:1; transform:none; } }
      @keyframes omPop { from { opacity:0; transform: scale(.95); } to { opacity:1; transform: scale(1); } }
      @keyframes omSheet { from { transform: translateY(100%); } to { transform:none; } }
      @keyframes omFadeIn { from { opacity:0; } to { opacity:1; } }
      @keyframes omSlideL { from { opacity:0; transform: translateX(30px); } to { opacity:1; transform:none; } }
      @keyframes omSlideR { from { opacity:0; transform: translateX(-30px); } to { opacity:1; transform:none; } }
      .om-slide-l { animation: omSlideL .34s cubic-bezier(.22,.61,.36,1); }
      .om-slide-r { animation: omSlideR .34s cubic-bezier(.22,.61,.36,1); }
      .om-fade { animation: omFade .3s cubic-bezier(.22,.61,.36,1); }
      .om-pop { animation: omPop .22s cubic-bezier(.22,.61,.36,1); }
      .om-sheet-in { animation: omSheet .32s cubic-bezier(.22,.61,.36,1); }
      .om-overlay { animation: omFadeIn .2s ease; }
      .om-press { transition: transform .13s cubic-bezier(.22,.61,.36,1), opacity .13s ease, box-shadow .2s ease; }
      .om-press:active { transform: scale(.96); }
      .om-card { background: var(--card); border: 1px solid var(--line); border-radius: var(--r-card); box-shadow: var(--shadow); }

      /* ===== RTL (arabcha) — butun ilova o'ngdan chapga ===== */
      /* Tailwind text-left/right ko'zguga aylanadi. O'z dir'i bor elementlar (arabcha
         hadis/oyat) tegilmaydi — ular allaqachon to'g'ri yo'nalishda. */
      [dir="rtl"] .text-left:not([dir]) { text-align: right; }
      [dir="rtl"] .text-right:not([dir]) { text-align: left; }
      /* Yo'nalishga ishora qiluvchi ikonkalar (strelka, chevron) teskari aylanadi */
      [dir="rtl"] .om-yon { transform: scaleX(-1); }
      /* Sahifa almashinuvi animatsiyasi ham teskari yo'nalishda */
      [dir="rtl"] .om-slide-l { animation-name: omSlideR; }
      [dir="rtl"] .om-slide-r { animation-name: omSlideL; }
    `}</style>
  );

  // ochilish ekrani — logo markazda, so'ng silliq o'chadi
  if (splash) {
    return (
      <div className={settings.dark ? "om-dark" : ""} style={{ minHeight: "100vh", background: "var(--bg)", display: "grid", placeItems: "center" }}>
        {styleBlock}
        <div className="om-pop flex flex-col items-center gap-3">
          <Logo size={78} color={settings.dark ? "#EADFC6" : "var(--green)"} />
          <div className="text-[19px] font-bold tracking-tight" style={{ color: settings.dark ? "#EADFC6" : "var(--green)" }}>{tr("Oliy maqsad")}</div>
        </div>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className={settings.dark ? "om-dark" : ""} style={{ minHeight: "100vh", background: "var(--bg)" }}>
        {styleBlock}
        <Onboarding onFinish={pl => { setPlan(pl); setNews(NEWS_VER); }} />
      </div>
    );
  }

  const planEnd = addDaysISO(plan.start, plan.years * 365 - 1);
  const daysLeft = Math.max(diffDays(today, planEnd), 0);
  // B-variant logo: tonggi (ochiq) = yashil, tungi (to'q) = qaymoqrang
  const logoColor = settings.dark ? "#EADFC6" : "var(--green)";
  const togglePage = (pg: "ibodat" | "vazifalar" | "sozlama" | "pomo" | "uyqu") => setPage(cur => cur === pg ? null : pg);
  // tr("Boshlash") — pomodoro sahifasini ochib, rejim tanlovini ko'rsatadi
  const startPomo = () => {
    setPage("pomo");
    if (!pomo) setPomoModeAsk(true);
  };
  // tanlangan rejimda taymerni ishga tushirish
  const startWithMode = (mode: "focus" | "open") => {
    if ("Notification" in window && Notification.permission === "default") Notification.requestPermission();
    try { const ln = LN(); if (ln) ln.requestPermissions().catch(() => { }); } catch { }
    lastPomoMode.current = mode;
    buzz();
    setPomoModeAsk(false);
    setPomo({ phase: "work", endsAt: Date.now() + pomoCfg.work * 60000, pausedLeft: null, mode });
  };
  const types = Array.from(new Set([...tasks.map(t => t.type), ...plan.metrics.map(m => m.typeName || m.name)].filter(Boolean)));

  const HdrBtn = ({ pg, icon, tint }: { pg: "ibodat" | "pomo" | "vazifalar" | "sozlama"; icon: string; tint: string }) => {
    const active = page === pg || (pg === "pomo" && !!pomo);
    return (
      <button onClick={() => togglePage(pg)} title={pg} className="om-press grid h-11 w-11 place-items-center rounded-2xl"
        style={{ background: active ? tint : "var(--card)", border: "1px solid " + (active ? tint : "var(--line)"), color: active ? "#fff" : "var(--ink)", boxShadow: "var(--shadow)" }}>
        <Icon n={icon} size={20} />
      </button>
    );
  };
  const NavBtn = ({ k, icon, label }: { k: "bugun" | "taqvim" | "stat" | "maqsad"; icon: string; label: string }) => {
    const on = tab === k;
    return (
      <button onClick={() => setTab(k)} className="om-press flex flex-1 flex-col items-center gap-1 py-1">
        <span className="grid h-8 w-14 place-items-center rounded-full" style={{ background: on ? "var(--soft)" : "transparent", color: on ? "var(--green)" : "var(--muted)" }}><Icon n={icon} size={22} /></span>
        <span className="text-[10px] font-semibold" style={{ color: on ? "var(--green)" : "var(--muted)" }}>{label}</span>
      </button>
    );
  };

  return (
    <div className={settings.dark ? "om-dark" : ""} style={{ minHeight: "100vh", background: "var(--bg)" }}>
      {styleBlock}
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-4">
        <header className="mb-6 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Logo size={34} color={logoColor} />
            <div className="mt-1.5 text-[17px] font-bold leading-none tracking-tight" style={{ color: logoColor }}>{tr("Oliy maqsad")}</div>
            <div className="mt-2 text-[10.5px] font-medium uppercase tracking-wide" style={{ color: "var(--muted)" }}>
              {parseISO(today).getDate()}-{tr(OYLAR[parseISO(today).getMonth()])} · {parseISO(today).getFullYear()} · {hijri(today, settings.hijriOffset)} · {tr(KUNLAR[parseISO(today).getDay()])}
            </div>
          </div>
          <button onClick={() => togglePage("sozlama")} className="om-press flex flex-none flex-col items-center gap-1">
            <span className="grid h-11 w-11 place-items-center rounded-2xl"
              style={{ background: page === "sozlama" ? "var(--green)" : "var(--card)", border: "1px solid " + (page === "sozlama" ? "var(--green)" : "var(--line)"), color: page === "sozlama" ? "#fff" : "var(--ink)", boxShadow: "var(--shadow)" }}>
              <Icon n="gear" size={20} />
            </span>
            <span className="text-[9px] font-semibold" style={{ color: "var(--muted)" }}>{tr("Sozlamalar")}</span>
          </button>
        </header>

        {gender === null && <GenderModal onPick={g => setGender(g)} />}
        {page !== null && <BackCloser key={page} onClose={() => setPage(page === "til" ? "sozlama" : null)} />}

        {page === "ibodat" ? (
          <IbadatPage today={today} ib={ib} setIb={setIb} gender={gender || "m"} khatm={khatm} setKhatm={setKhatm} />
        ) : page === "vazifalar" ? (
          <VazifalarPage today={today} plan={plan} folders={folders} tasks={tasks} sleepCfg={sleepCfg} countLog={countLog}
            setFolders={setFolders} setTasks={setTasks} setSleepCfg={setSleepCfg} setPlan={setPlan} />
        ) : page === "sozlama" ? (
          <SozlamaPage settings={settings} setSettings={setSettings} setPlan={setPlan} today={today} allData={allData} quotes={quotes} setQuotes={setQuotes} lang={lang} openTil={() => setPage("til")} />
        ) : page === "til" ? (
          <TilPage lang={lang} setLang={setLang} onBack={() => setPage("sozlama")} />
        ) : page === "pomo" ? (
          <PomoPage cfg={pomoCfg} setCfg={setPomoCfg} pomo={pomo} setPomo={setPomo} pomoLog={pomoLog} today={today} onStart={() => setPomoModeAsk(true)} />
        ) : page === "uyqu" ? (
          <UyquPage today={today} plan={plan} tasks={tasks} logs={logs} sleepCfg={sleepCfg} setSleepCfg={setSleepCfg} sleepLog={sleepLog} />
        ) : (
          <>
            {tab === "bugun" && gender !== null && <BugunView today={today} plan={plan} tasks={tasks} folders={folders} logs={logs} extras={extras}
              counts={counts} countLog={countLog} weights={weights} notes={notes} settings={settings} sleepCfg={sleepCfg} sleepLog={sleepLog}
              ib={ib} khatm={khatm} dayMode={dayMode} ui={ui}
              setLogs={setLogs} setExtras={setExtras} setTasks={setTasks} setCounts={setCounts} setCountLog={setCountLog}
              setWeights={setWeights} setNotes={setNotes} setSleepLog={setSleepLog}
              setDayMode={setDayMode} setUi={setUi} pomoLog={pomoLog} quotes={quotes}
              openCountForm={() => setCountForm(true)} openIbadat={() => setPage("ibodat")}
              openUyqu={() => setPage("uyqu")} openSozlama={() => setPage("sozlama")}
              openPomo={() => setPage("pomo")} openVazifalar={() => setPage("vazifalar")} openStat={() => setTab("stat")} startPomo={startPomo}
              hints={hints} doneHint={doneHint} />}
            {tab === "taqvim" && <TaqvimView today={today} plan={plan} tasks={tasks} logs={logs} extras={extras} counts={counts} countLog={countLog} weights={weights} notes={notes} sleepLog={sleepLog} settings={settings} ib={ib} khatm={khatm} />}
            {tab === "stat" && <StatView today={today} plan={plan} tasks={tasks} logs={logs} extras={extras} folders={folders} sleepCfg={sleepCfg} sleepLog={sleepLog} pomoLog={pomoLog} settings={settings} ib={ib} khatm={khatm} countLog={countLog} />}
            {tab === "maqsad" && <MaqsadView today={today} plan={plan} tasks={tasks} logs={logs} extras={extras} counts={counts} countLog={countLog} weights={weights} setPlan={setPlan} />}
          </>
        )}
      </div>

      {pomoAsk && <PomoAsk min={pomoAsk.min} tasks={tasks} logs={logs} today={today} onPick={tid => creditMinutes(tid, pomoAsk.min)} />}

      {pomoModeAsk && (
        <Sheet title={<span>{tr("Pomodoro — rejim tanlang")}</span>} onClose={() => setPomoModeAsk(false)}>
          <div className="space-y-2">
            <button onClick={() => startWithMode("focus")} className="om-press flex w-full items-start gap-3 rounded-2xl border p-3.5 text-left" style={cardS}>
              <span className="grid h-10 w-10 flex-none place-items-center rounded-xl" style={{ background: "#16130F", color: "#F5F5F5" }}><Icon n="moon" size={19} /></span>
              <span className="min-w-0">
                <span className="block text-sm font-bold" style={{ color: "var(--ink)" }}>{tr("Fokus rejimi")}</span>
                <span className="block text-[11px] leading-relaxed" style={lblS}>{tr("Ekran qorayadi, faqat taymer va bugungi hisob ko'rinadi, ekran o'chmaydi. Chuqur diqqat uchun telefonning «Bezovta qilinmasin» rejimini ham yoqib qo'ying.")}</span>
              </span>
            </button>
            <button onClick={() => startWithMode("open")} className="om-press flex w-full items-start gap-3 rounded-2xl border p-3.5 text-left" style={cardS}>
              <span className="grid h-10 w-10 flex-none place-items-center rounded-xl" style={{ background: "var(--soft)", color: "var(--green)" }}><Icon n="sun" size={19} /></span>
              <span className="min-w-0">
                <span className="block text-sm font-bold" style={{ color: "var(--ink)" }}>{tr("Ochiq rejim")}</span>
                <span className="block text-[11px] leading-relaxed" style={lblS}>{tr("Ilovadan bemalol chiqishingiz mumkin — vaqt tugaganda telefon o'zi xabar beradi.")}</span>
              </span>
            </button>
          </div>
        </Sheet>
      )}

      {pomo && pomo.mode === "focus" && <FocusOverlay pomo={pomo} setPomo={setPomo} pomoLog={pomoLog} today={today} />}

      {news !== NEWS_VER && gender !== null && <NewsModal hijriOffset={settings.hijriOffset} logoColor={logoColor} onClose={() => setNews(NEWS_VER)} />}

      <DialogHost />

      {countForm && <TaskForm scope="daily" scopePick initialKind="count" folderId={null} folders={folders} types={types} today={today}
        onClose={() => setCountForm(false)} onSave={t => { setTasks(ts => [...ts, t]); setCountForm(false); }} />}

      {addMenu && (
        <Sheet title={tr("Nima qo'shamiz?")} onClose={() => setAddMenu(false)}>
          <div className="space-y-2">
            {([
              { k: "daily", icon: "list", tint: "var(--green)", t: tr("Kundalik vazifa"), s: tr("Har kuni takrorlanadigan ish") },
              { k: "oliy", icon: "target", tint: "var(--gold)", t: tr("Oliy maqsad vazifasi"), s: tr("Katta maqsadga eltuvchi ish") },
              { k: "metric", icon: "flag", tint: "var(--gold)", t: tr("Oliy maqsad belgilash"), s: tr("Yillik raqamli maqsad — masalan 10 kitob") },
            ] as const).map(o => (
              <button key={o.k} onClick={() => { setAddMenu(false); if (o.k === "metric") setShowMetrics(true); else setShowAdd(o.k); }}
                className="om-press om-card flex w-full items-center gap-3 p-3.5 text-left">
                <span className="grid h-11 w-11 flex-none place-items-center rounded-2xl" style={{ background: "var(--soft)", color: o.tint }}><Icon n={o.icon} size={20} /></span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold" style={{ color: "var(--ink)" }}>{o.t}</span>
                  <span className="block text-[11px]" style={lblS}>{o.s}</span>
                </span>
                <Icon n="chevronRight" size={15} style={{ color: "var(--muted)" }} />
              </button>
            ))}
            <button onClick={() => { setAddMenu(false); setPage("vazifalar"); }} className="om-press flex w-full items-center gap-3 rounded-2xl border p-3.5 text-left" style={cardS}>
              <span className="grid h-11 w-11 flex-none place-items-center rounded-2xl" style={{ background: "var(--soft)", color: "var(--muted)" }}><Icon n="folder" size={20} /></span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold" style={{ color: "var(--ink)" }}>{tr("Barcha vazifalar")}</span>
                <span className="block text-[11px]" style={lblS}>{tr("Ro'yxat, qidiruv, arxiv, uyqu rejasi")}</span>
              </span>
              <Icon n="chevronRight" size={15} style={{ color: "var(--muted)" }} />
            </button>
          </div>
        </Sheet>
      )}

      {showAdd && <TaskForm scope={showAdd} scopePick folderId={null} folders={folders} types={types} today={today}
        onClose={() => setShowAdd(null)} onSave={t => { setTasks(ts => [...ts, t]); setShowAdd(null); }} />}

      {showMetrics && plan && <MetricsEdit plan={plan} setPlan={setPlan} onClose={() => setShowMetrics(false)} />}

      {page === null && !hints["add"] && plan && (
        <div className="fixed inset-x-0 z-20 px-4" style={{ bottom: "calc(96px + env(safe-area-inset-bottom))" }}>
          <div className="mx-auto max-w-2xl">
            <Hint id="add" hints={hints} done={doneHint}
              text={tr("Pastdagi + tugmasi orqali kundalik vazifa, oliy maqsad vazifasi va yillik maqsadlaringizni qo'shasiz.")} />
          </div>
        </div>
      )}

      {page === null && (
        <nav className="fixed inset-x-0 bottom-0 z-30">
          <div className="mx-auto flex max-w-2xl items-end justify-around px-3 pt-2" style={{ background: "var(--card)", borderTop: "1px solid var(--line)", boxShadow: "0 -8px 28px rgba(0,0,0,0.14)", paddingBottom: "calc(8px + env(safe-area-inset-bottom))" }}>
            <NavBtn k="bugun" icon="home" label={tr("Bugun")} />
            <NavBtn k="taqvim" icon="calendar" label={tr("Taqvim")} />
            <button onClick={() => { doneHint("add"); setAddMenu(true); }} className="om-press -mt-8 grid h-16 w-16 flex-none place-items-center rounded-full text-white" style={{ background: "var(--green)", boxShadow: "0 10px 24px rgba(46,125,87,0.5)" }}><Icon n="plus" size={30} /></button>
            <NavBtn k="stat" icon="stats" label={tr("Statistika")} />
            <NavBtn k="maqsad" icon="target" label={tr("Maqsad")} />
          </div>
        </nav>
      )}
    </div>
  );
}
