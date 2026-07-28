// ================== TILLAR ==================
// Ilovaning barcha matnlari shu fayl orqali o'tadi.
// KALIT = o'zbekcha lotin matnning O'ZI. Tarjima topilmasa o'zbekchasi ko'rinadi —
// shuning uchun ilova hech qachon bo'sh yoki buzuq matn ko'rsatmaydi.

export type Lang = "uz" | "uzk" | "en" | "ar";

export const TILLAR: { id: Lang; nom: string; izoh: string; belgi: string; rang: string; grad: string; holat: "tayyor" | "sinov" | "tez" }[] = [
  { id: "uz", nom: "O'zbek tili", izoh: "Lotin", belgi: "O'", rang: "#3B7BC4", grad: "linear-gradient(160deg,#4A8AD4,#1E4E86)", holat: "tayyor" },
  { id: "uzk", nom: "Ўзбек тили", izoh: "Кирилл", belgi: "ў", rang: "#C0453C", grad: "linear-gradient(160deg,#CF574C,#8E2C27)", holat: "tayyor" },
  { id: "en", nom: "English language", izoh: "Latin", belgi: "Aa", rang: "#D98A32", grad: "linear-gradient(160deg,#E2A03F,#B4611F)", holat: "tayyor" },
  { id: "ar", nom: "اللغة العربية", izoh: "Arab yozuvi", belgi: "ض", rang: "#3E9E6E", grad: "linear-gradient(160deg,#46AC79,#26714E)", holat: "tayyor" },
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
  // SO'Z TARTIBI: "Har kuni kamida <8 soat> uxlayman" jumlasi uch bo'lakka bo'lingan.
  // Ingliz tilida tartib boshqacha, shuning uchun bo'laklarning MA'NOSI almashtirildi:
  // "Har kuni kamida" -> "I sleep at least",  "uxlayman" -> "every day".
  // Natija: "I sleep at least <8 hours> every day". Ikkalasi ham faqat shu jumlada ishlatiladi.
  "Har kuni kamida": { en: "I sleep at least" },
  "uxlayman": { en: "every day" },
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
  // ILOVA NOMI. Logo tagida, splashda, sarlavhada va bildirishnomalarda ishlatiladi.
  // Ayni shu matn "oliy maqsad" turkumidagi vazifalar uchun ham qo'llanadi — ma'nosi bir xil.
  // Kirill AVTOMATIK chiqadi: toKiril("Oliy maqsad") -> "Олий мақсад" (lug'atga yozish shart emas).
  "Oliy maqsad": { en: "Ultimate goal", ar: "المقصد الأعلى" },
  "oliy maqsad": { en: "ultimate goal", ar: "المقصد الأعلى" },
  "Reja": { en: "Plan" },
  "Reja yo'q": { en: "No plan" },
  "Til": { en: "Language" },
  "Ilova tili": { en: "App language" },
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
  "O'rtacha": { en: "Average" },
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
  "Pastdagi": { en: "The one below" },
  "Tonggi": { en: "Light" },
  "Tungi": { en: "Dark" },

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

  // ===== 2-BOSQICH: son ichida bo'lgan jumlalar (tf) =====
  // "|" — chapda birlik, o'ngda ko'plik. Qarang: tf() izohi.

  // --- Sanoq birliklari ---
  "{n} soat": { en: "{n} hour|{n} hours" },
  "~{n} soat": { en: "~{n} hour|~{n} hours" },
  "reja {n} soat": { en: "plan {n} hour|plan {n} hours" },
  "Uyqu: {n} soat": { en: "Sleep: {n} hour|Sleep: {n} hours" },
  "{n} kun": { en: "{n} day|{n} days" },
  "{a}/{b} kun": { en: "{a}/{b} days" },
  "{n} kundan keyin": { en: "in {n} day|in {n} days" },
  "Reja: {n} kun": { en: "Plan: {n} day|Plan: {n} days" },
  "{y}-yil · {n} kun qoldi": { en: "Year {y} · {n} day left|Year {y} · {n} days left" },

  // --- Uyqu jumlasi (so'z tartibi yuqorida izohlangan) ---
  // "Har kuni <22:00 — 06:00> da uxlayman (~8 soat)" -> ingliz tilida fe'l tushiriladi,
  // chunki "Every day <vaqt> I sleep (~8 hours)" g'aliz eshitiladi.
  "da uxlayman (~{n} soat)": { en: "(~{n} hour)|(~{n} hours)" },
  "Rejaga muvofiq uyqu": { en: "Slept as planned" },
  "✓ belgilandi": { en: "✓ marked" },
  "✗ belgilandi": { en: "✗ marked" },

  // --- Vazifa holati ---
  "Jami:": { en: "Total:" },
  "Amalda:": { en: "Actual:" },
  "bugun: +{n}": { en: "today: +{n}" },
  "{sana} gacha": { en: "until {sana}" },
  "Muddat tugadi: {a}/{b}": { en: "Deadline passed: {a}/{b}" },
  "{n} bajarildi": { en: "{n} completed" },
  "{n} sababli": { en: "{n} excused" },
  "to'liq hisobotni ko'rish": { en: "view full report" },
  "vaqtsiz": { en: "no time set" },
  "rejada": { en: "on plan" },
  "{n} kam": { en: "{n} less" },
  "{n} ko'p": { en: "{n} more" },
  " — rejadan oldin (bonus)": { en: " — ahead of plan (bonus)" },
  " — rejadan kech": { en: " — later than planned" },
  "Oxirgi 7 kunda": { en: "In the last 7 days" },
  "Davomiyligi: {v}": { en: "Duration: {v}" },
  "Sababli: {n} marta (joriy 30 kunlik: {m}/3)": { en: "Excused: {n} time (last 30 days: {m}/3)|Excused: {n} times (last 30 days: {m}/3)" },

  // --- Xabar va tavsiya jumlalari ---
  "Xatm {sana} dan boshlanadi": { en: "Khatm starts on {sana}" },
  "Pomodoro orqali {v} hisoblangan.": { en: "{v} counted via Pomodoro." },
  "Barakalla, {nom}! Bugungi barcha ishlar bajarildi": { en: "Well done, {nom}! All of today's tasks are complete" },
  "Bu vaqt «{nom}» ({a}–{b}) bilan to'qnashadi.": { en: "This time conflicts with «{nom}» ({a}–{b})." },
  "{nom} vaqti keldi": { en: "Time for {nom}" },
  "«{nom}» vazifasini boshlaysiz.": { en: "you will start the task «{nom}»." },
  "{n} yillik maqsadlaringiz uchun rejangizni tuzishga tayyormisiz?": { en: "Ready to build your plan for your {n}-year goals?" },
  "«{nom}» necha kunga to'xtatilsin? To'xtatilgan kunlar statistikaga kirmaydi.": { en: "How many days should «{nom}» be paused? Paused days are excluded from statistics." },
  "Kunlik vaqti: {v}. Ortiqcha ajratilgan vaqt belgilashda “ziyoda”ga o'tadi.": { en: "Daily time: {v}. Any extra time you log counts as “extra”." },
  "«{nom}» - {k}-kun (reja: {r} kun). Shoshilmang, lekin rejani ham unutmang.": { en: "«{nom}» — day {k} (plan: {r} days). Take your time, but do not lose sight of the plan." },
  "«{nom}» so'nggi 30 kunda {n} marta sababli qoldirildi. Balki og'irlik qilayotgandir? Yengillashtirishingiz mumkin.": { en: "«{nom}» was excused {n} times in the last 30 days. Perhaps it is too demanding? You can lighten it." },

  // ===== 3-BOSQICH: qisqa iboralar =====

  // --- Ibodat ---
  "Hadisi sharif": { en: "Noble hadith" },
  "Oli Imron surasi · 200-oyat": { en: "Surah Al-Imran · verse 200" },
  "Nafl namozlar (bonus)": { en: "Nafl prayers (bonus)" },
  "Kunduzgi nafl": { en: "Daytime nafl" },
  "Qur'on xatmini rejalash": { en: "Plan a Qur'an khatm" },
  "xatm rejasini tahrirlash": { en: "edit khatm plan" },
  "Kuniga necha pora?": { en: "How many juz' per day?" },
  "to'liq o'qildi": { en: "fully recited" },
  "Bugungi ibodat reytingi": { en: "Today's worship rating" },
  "Bu hafta ibodat belgilanmagan.": { en: "No worship marked this week." },
  "Bismillah — boshlaymiz!": { en: "Bismillah — let us begin!" },

  // --- Vazifa turlari va ro'yxatlar ---
  "Bugungi vazifalar": { en: "Today's tasks" },
  "Barcha vazifalar": { en: "All tasks" },
  "Bajarilgan vazifalar": { en: "Completed tasks" },
  "Vazifalar tarixi": { en: "Task history" },
  "Kundalik vazifa": { en: "Daily task" },
  "Kundalik vazifalar": { en: "Daily tasks" },
  "Sanaladigan vazifalar": { en: "Countable tasks" },
  "Oliy maqsad vazifasi": { en: "Ultimate goal task" },
  "Oliy maqsad vazifalari": { en: "Ultimate goal tasks" },
  "Bu hafta — oliy vazifalar": { en: "This week — ultimate tasks" },
  "Tugatilgan oliy vazifalar:": { en: "Completed ultimate tasks:" },
  "Vaqti belgilanmagan vazifalar:": { en: "Tasks without a set time:" },
  "Keyingi vazifa": { en: "Next task" },
  "Bugunga vazifa yo'q": { en: "No tasks for today" },
  "Bu kunga vazifa yo'q edi.": { en: "There were no tasks for this day." },
  "Har kuni takrorlanadigan ish": { en: "A task repeated every day" },
  "Katta maqsadga eltuvchi ish": { en: "A task leading to a bigger goal" },
  "Boshqa — mustaqil ish": { en: "Other — standalone task" },
  "Qo'shimcha ish": { en: "Extra task" },
  "Qo'shimcha ishlar": { en: "Extra tasks" },
  "QO'SHIMCHA ISHLAR": { en: "EXTRA TASKS" },
  "Yangi {x} vazifa": { en: "New {x} task" },

  // --- Oliy maqsad bo'limi ---
  "Oliy maqsadim": { en: "My ultimate goal" },
  "Oliy maqsadlaringiz": { en: "Your ultimate goals" },
  "Oliy maqsad belgilash": { en: "Set an ultimate goal" },
  "Oliy maqsadni tahrirlash": { en: "Edit ultimate goal" },
  "Oliy maqsadingizni yozing...": { en: "Write your ultimate goal..." },
  "Hali oliy maqsad belgilanmagan": { en: "No ultimate goal set yet" },
  "Belgilangan maqsad": { en: "Goal set" },
  "Maqsadlar bajarildi": { en: "Goals completed" },
  "Maqsadga yetdingiz!": { en: "You reached the goal!" },
  "Maqsad nomini yozing.": { en: "Write the goal name." },
  "yillik maqsad": { en: "yearly goal" },
  "ta maqsad belgilangan": { en: "goals set" },
  "Shu tempda yil oxirida taxminan": { en: "At this pace, by year end there will be about" },
  "ta bo'ladi (maqsad —": { en: "(goal —" },

  // --- Vaqt va reja ---
  "Vaqt bilan (daqiqa)": { en: "With time (minutes)" },
  "Vaqt oralig'i": { en: "Time range" },
  "Aniq vaqt oralig'i bilan": { en: "With an exact time range" },
  "Qaysi vaqt oralig'ida qilasiz?": { en: "In which time range will you do it?" },
  "Kunlik soat bilan": { en: "By daily hours" },
  "Kuniga necha daqiqa?": { en: "How many minutes per day?" },
  "Qancha vaqtda?": { en: "In how much time?" },
  "Qachon boshlanadi?": { en: "When does it start?" },
  "Qachondan boshlanadi?": { en: "Starting from when?" },
  "Qachon tugaydi?": { en: "When does it end?" },
  "Qaysi kunlari?": { en: "On which days?" },
  "Qaysi kuni so'ralsin?": { en: "On which day should it ask?" },
  "Hafta qaysi kundan boshlansin?": { en: "Which day should the week start on?" },
  "HAFTA KUNLARI BO'YICHA": { en: "BY DAYS OF THE WEEK" },
  "Vaqtni tanlang": { en: "Select a time" },
  "Sanani tanlang": { en: "Select a date" },
  "Vaqtni olib tashlash": { en: "Remove the time" },
  "Boshlanish sanasini belgilang.": { en: "Set the start date." },
  "Tugash sanasi kerak.": { en: "An end date is required." },
  "Yillar sonini tanlang.": { en: "Choose the number of years." },
  "Yillik sonni kiriting.": { en: "Enter the yearly amount." },
  "Yiliga nechta? (masalan 10)": { en: "How many per year? (e.g. 10)" },
  "kun tartibida vaqti": { en: "time in the daily routine" },
  "Kun hali tugagani yo'q": { en: "The day is not over yet" },
  "Bugun — dam kuni": { en: "Today is a rest day" },
  "Dam kuni edi.": { en: "It was a rest day." },

  // --- Belgilash ---
  "Belgilanmagan": { en: "Not marked" },
  "Belgilaymizmi?": { en: "Shall we mark it?" },
  "Belgini olib tashlash": { en: "Remove the mark" },
  "Sababli qilmadim": { en: "Excused — did not do it" },
  "Umuman qilmadim": { en: "Did not do it at all" },
  "Bugungi natija": { en: "Today's result" },
  "Yaxshi ketyapsiz, oz qoldi": { en: "Going well, almost there" },
  "Rejaga aniq muvofiq": { en: "Exactly as planned" },
  "kun · Umumiy:": { en: "days · Overall:" },
  "Eng samarali kun:": { en: "Most productive day:" },
  "Jami ishlangan vaqt:": { en: "Total time worked:" },
  "Bu hafta o'rtacha:": { en: "This week's average:" },
  "to'liq bajarilgan.": { en: "fully completed." },

  // --- Statistika ---
  "Kunlik faollik": { en: "Daily activity" },
  "Kunlik faollik — 14 kun": { en: "Daily activity — 14 days" },
  "Haftalar taqqoslashi": { en: "Week comparison" },
  "Haftalik hisobot": { en: "Weekly report" },
  "OXIRGI 90 KUN": { en: "LAST 90 DAYS" },
  "Vaqt qayerga ketdi": { en: "Where the time went" },
  "haftalik o'rtacha natija": { en: "weekly average" },
  "oylik o'rtacha natija": { en: "monthly average" },
  "o'tgan hafta bilan bir xil": { en: "same as last week" },
  "Statistika hali bo'sh": { en: "Statistics are still empty" },
  "Ma'lumot hali yo'q.": { en: "No data yet." },
  "ma'lumot yo'q": { en: "no data" },
  "Hech narsa topilmadi.": { en: "Nothing found." },
  "Bu hafta vaqt yozilmagan.": { en: "No time logged this week." },

  // --- Uyqu ---
  "Uyqu kundaligi": { en: "Sleep journal" },
  "Uxlash va turish vaqti": { en: "Bedtime and wake-up time" },
  "Uyqu rejasi o'chirilsinmi?": { en: "Delete the sleep schedule?" },
  "Hali uyqu yozuvi yo'q.": { en: "No sleep entries yet." },
  "Bu hafta uyqu yozilmagan.": { en: "No sleep logged this week." },
  "Sifatli uyqu uchun maslahatlar": { en: "Tips for better sleep" },
  "yana uxladingizmi? soat": { en: "slept more? hours" },

  // --- Pomodoro ---
  "Pomodoro — rejim tanlang": { en: "Pomodoro — choose a mode" },
  "Fokus — ish vaqti": { en: "Focus — work time" },
  "Ish vaqti tugadi": { en: "Work time is over" },
  "Davom ettirish": { en: "Continue" },
  "Nima ish qildingiz?": { en: "What did you work on?" },
  "Nima ish qilganingizni yozing.": { en: "Write what you worked on." },
  "bu vaqtda nima qildingiz?": { en: "what did you do in this time?" },
  "Qaysi vazifaga tegishli?": { en: "Which task does it belong to?" },
  "Vazifa turi orqali": { en: "By task type" },
  "vazifa turi orqali": { en: "by task type" },

  // --- Vazn va o'lchov ---
  "Vazn kamayishi (kg)": { en: "Weight loss (kg)" },
  "Necha kg kamaytirmoqchisiz?": { en: "How many kg do you want to lose?" },
  "Vaznimni kuzatib boraman.": { en: "I will track my weight." },
  "O'zim sanayman": { en: "I will count myself" },
  "Umumiy sonni kiriting.": { en: "Enter the total amount." },
  "Kunlik ulushni kiriting.": { en: "Enter the daily share." },
  "Muhimlik darajasi (1-10)": { en: "Importance level (1-10)" },

  // --- Xulosa va iqtiboslar ---
  "Xulosa qo'shish": { en: "Add a note" },
  "Yangi xulosa...": { en: "New note..." },
  "Hali xulosa yo'q.": { en: "No notes yet." },
  "+ Ro'yxatga qo'shish": { en: "+ Add to the list" },
  "Oddiy ro'yxat": { en: "Simple list" },
  "yoki yangi tur yozing...": { en: "or write a new type..." },
  "Nima qo'shamiz?": { en: "What shall we add?" },

  // --- Sozlamalar va ma'lumot ---
  "Qo'shimcha sozlamalar": { en: "Additional settings" },
  "Majburiy bo'lim": { en: "Required section" },
  "Qo'shimcha eslatma": { en: "Additional reminder" },
  "Eslatma vaqti": { en: "Reminder time" },
  "Eslatma matni...": { en: "Reminder text..." },
  "Eslatmani o'qish": { en: "Read the reminder" },
  "(shu vaqtda eslatma keladi)": { en: "(the reminder arrives at this time)" },
  "(bo'sh — doimiy)": { en: "(empty — ongoing)" },
  "(shu tur bir papka)": { en: "(this type is one folder)" },
  "(shu tur bir papka bo'ladi)": { en: "(this type becomes one folder)" },
  "Papka o'chirilsinmi?": { en: "Delete this folder?" },
  "Rejani o'chirish": { en: "Delete the plan" },
  "Rejangiz tayyor.": { en: "Your plan is ready." },
  "Rejani tuzishni boshlaymiz.": { en: "Let us start building the plan." },
  "Vaqtincha to'xtatish": { en: "Pause temporarily" },
  "Tashlab qo'yish": { en: "Abandon" },
  "tashlab qo'yilgan": { en: "abandoned" },
  "Qayta tiklash": { en: "Restore" },
  "Ma'lumot almashtirilsinmi?": { en: "Replace the data?" },
  "Zaxira saqlandi": { en: "Backup saved" },
  "Oxirgi zaxira": { en: "Last backup" },
  "Oxirgi tasdiq": { en: "Last confirmation" },
  "hali olinmagan": { en: "not taken yet" },
  "Saqlab bo'lmadi": { en: "Could not save" },
  "PDF yuklab olish": { en: "Download PDF" },
  "PDF o'rnatish": { en: "Install from PDF" },
  "Ilova yangiliklari": { en: "What's new" },
  "Qanday ishlaydi?": { en: "How does it work?" },
  "E'tibor bering": { en: "Please note" },
  "Telegram ilovasi ochiladi.": { en: "The Telegram app will open." },

  // --- Onboarding va tasdiqlar ---
  "Ismingiz nima?": { en: "What is your name?" },
  "Iltimos, ismingizni kiriting.": { en: "Please enter your name." },
  "Masalan: Abdulloh": { en: "For example: Abdulloh" },
  "Masalan: Kitob o'qish": { en: "For example: Reading books" },
  "Masalan: Ingliz tili darsi": { en: "For example: English lesson" },
  "Masalan: Video darslar": { en: "For example: Video lessons" },
  "Masalan: 100 ta dars.": { en: "For example: 100 lessons." },
  "Masalan: mutolaa, sport...": { en: "For example: reading, sport..." },
  "Vazifa nomini yozing.": { en: "Write the task name." },
  "Ha, tayyorman": { en: "Yes, I am ready" },
  "Ha, o'chirilsin": { en: "Yes, delete it" },
  "Ha, o'rnatilsin": { en: "Yes, install it" },
  "Yo'q, hozir emas": { en: "No, not now" },
  "Yo'q, hozir kerak emas": { en: "No, not needed now" },
  "Keyinroq davom ettiraman.": { en: "I will continue later." },
  "Keyinroq sozlashim mumkin.": { en: "I can set this up later." },

  // ===== 4-BOSQICH: jumlalar va uzun matnlar =====

  // --- QUR'ON VA HADIS ---
  // DIQQAT: bu matnlar O'ZIMIZ tarjima QILMADIK. E'tirof etilgan ingliz
  // tarjimalaridan olindi. Manbani o'zgartirmang, tekshirmasdan tahrirlamang.
  //   · Oyat  — Sahih International (Qur'on 3:200)
  //   · Hadis — Muhsin Khan (Sahih al-Bukhari 6465)
  "Alloh taolo Qur'oni Karimda shunday marhamat qiladi:": { en: "Allah the Exalted says in the Noble Qur'an:" },
  "Ey mo'minlar! Sabr qilinglar va sabr-toqat qilishda ustun bo'linglar hamda doimo belingiz bog'liq bo'lib turingiz! Va Allohdan qo'rqingiz! Shoyad najot topgaysizlar!": { en: "O you who have believed, persevere and endure and remain stationed and fear Allah that you may be successful." },
  "Oisha roziyallohu anhodan rivoyat qilindi: «Nabiy sollallohu alayhi vasallamdan: “Amallarning qay biri Allohga eng suyukli?” deb so'rashdi. U zot:": { en: "Narrated Aisha: The Prophet ﷺ was asked, “Which deeds are most beloved to Allah?” He said:" },
  "“Oz bo'lsa ham, davomlirog'i”": { en: "“The most regular constant ones, even if few”" },
  ", dedilar. Yana: “Amallardan toqatingiz yetadiganini zimmangizga olinglar”, dedilar.»": { en: ". He added, “Take on only those deeds which are within your ability.”" },
  "Sahihul Buxoriy, 81-kitob, 6465-hadis.": { en: "Sahih al-Bukhari, Book 81, Hadith 6465." },
  "Assalomu alaykum va rohmatullohi va barokatuhu": { en: "As-salamu alaykum wa rahmatullahi wa barakatuh" },
  ", solih amallardan bardavom bo'l! Garchi u oz bo'lsa ham. Alloh taolo kuch-quvvat bersin!": { en: ", be constant in righteous deeds! Even if they are few. May Allah the Exalted grant you strength!" },
  "Alloh taolo maqsadingizga yetishga sizga kuch-quvvat va bardavomlik ato etsin.": { en: "May Allah the Exalted grant you strength and constancy to reach your goal." },
  "Men sizga Oliy maqsadingizga erishishingiz uchun ko'makdosh bo'laman, biiznillah.": { en: "I will be your companion in reaching your ultimate goal, bi idhnillah." },
  "Dam tugadi — yangi pomodoroni o'zingiz boshlaysiz. Bismillah!": { en: "Break is over — start the next pomodoro yourself. Bismillah!" },

  // --- Ibodat bo'limi ---
  "Ibodatlar bo'limi uchun bir savol": { en: "One question for the worship section" },
  "Namoz belgilash to'g'ri sozlanishi uchun jinsingizni tanlang (bir marta so'raladi, saqlanadi):": { en: "Choose your gender so prayer marking is set up correctly (asked once, then saved):" },
  "Erkaklarda har namozda “masjidda o'qidim” tugmasi bo'ladi — reytingda balandroq baholanadi.": { en: "For men, each prayer has an “I prayed at the mosque” button — it is rated higher." },
  "Kunlik vazifalar foiziga aralashmaydi — alohida hisoblanadi. Masjid va nafllar bonus beradi.": { en: "It does not affect the daily task percentage — it is counted separately. Mosque and nafl prayers give a bonus." },
  "Xatm rejasi o'chirilsinmi? (kunlik belgilar tarixda qoladi)": { en: "Delete the khatm plan? (daily marks stay in the history)" },

  // --- Uyqu ---
  "Hali uyqu rejasi yo'q — quyida sozlang. Reja qo'yilgach, Bugun sahifasida har kuni belgilab borasiz.": { en: "No sleep schedule yet — set one up below. Once set, you mark it each day on the Today page." },
  "Kuniga faqat bir marta belgilanadi. Kam uxlash — yuqori reyting.": { en: "Marked only once per day. Less sleep — higher rating." },
  "Eslatma: bu ilovada uyqu reytingi teskari — rejadan KAM uxlash yuqori baholanadi.": { en: "Note: in this app the sleep rating is inverted — sleeping LESS than planned is rated higher." },
  "Belgilagach qaytarib o'zgartirib bo'lmaydi. Keyin yana uxlasangiz + bilan qo'shasiz.": { en: "Once marked it cannot be changed. If you sleep again later, add it with +." },
  "Avval necha soat uxlaganingizni kiriting.": { en: "First enter how many hours you slept." },
  "soat. Rejadan kam uxlash yuqori baholanadi.": { en: "hours. Sleeping less than planned is rated higher." },
  "Rejadan {n} soat kam uxladingiz — reyting yuqori": { en: "You slept {n} hour less than planned — high rating|You slept {n} hours less than planned — high rating" },
  "Rejadan {n} soat ko'p uxladingiz — reyting pasayadi": { en: "You slept {n} hour more than planned — rating drops|You slept {n} hours more than planned — rating drops" },
  "Uxlashdan 1 soat oldin ekranlardan uzoqlashing va yengil kitob o'qing. Uxlashdan oldingi zikrlarni unutmang.": { en: "Step away from screens an hour before bed and read a light book. Do not forget the dhikr before sleep." },

  // --- Pomodoro ---
  "Ekran qorayadi, faqat taymer va bugungi hisob ko'rinadi, ekran o'chmaydi. Chuqur diqqat uchun telefonning «Bezovta qilinmasin» rejimini ham yoqib qo'ying.": { en: "The screen dims to show only the timer and today's count, and stays awake. For deep focus, also turn on your phone's «Do not disturb» mode." },
  "Ilovadan bemalol chiqishingiz mumkin — vaqt tugaganda telefon o'zi xabar beradi.": { en: "You can leave the app freely — your phone will notify you when the time is up." },
  "Sikl — kunlik pomodoro maqsadingiz. Yetganingizda hisob yashil rangda ko'rinadi.": { en: "Cycle — your daily pomodoro target. When you reach it, the count turns green." },
  "Fokusdan chiqish (taymer davom etadi)": { en: "Exit focus (the timer keeps running)" },
  "Taymer to'xtatilsinmi? (bu pomodoro hisobga kirmaydi)": { en: "Stop the timer? (this pomodoro will not be counted)" },
  "Yangi pomodoroni o'zingiz boshlaysiz.": { en: "You start the next pomodoro yourself." },
  "Ish vaqti tugadi! Bu vaqtda nima qilganingizni belgilang.": { en: "Work time is over! Mark what you did during this time." },
  "Bu vaqtda nima qilganingizni belgilang.": { en: "Mark what you did during this time." },
  "Bu vaqtda nima qildingiz? Tanlangan vazifaga": { en: "What did you do in this time? To the selected task" },
  "Qaysi vazifaga tegishli ekanini tanlang (yoki «Boshqa»).": { en: "Choose which task it belongs to (or «Other»)." },
  "Qancha vaqt sarflaganingizni kiriting.": { en: "Enter how much time you spent." },
  "Boshqa ish — vazifalarga yozilmasin": { en: "Other work — do not log it to any task" },
  "hisoblanadi — qismiy bajarilish beradi, ortiqchasi “ziyoda”ga o'tadi.": { en: "is counted — it gives partial completion, and the surplus goes to “extra”." },

  // --- Vazifa qo'shish va tahrirlash ---
  "Hali vazifa yo'q. Yuqoridagi tugma orqali qo'shing.": { en: "No tasks yet. Add one with the button above." },
  "Bugunga vazifa yo'q. Vazifalar ro'yxati orqali qo'shing.": { en: "No tasks for today. Add one from the task list." },
  "Hali oliy maqsad vazifasi yo'q.": { en: "No ultimate goal task yet." },
  "Vazifa nomi bo'yicha qidirish...": { en: "Search by task name..." },
  "Tugash vaqti boshlanishdan keyin bo'lsin": { en: "The end time must come after the start" },
  "Tugash vaqti boshlanishdan keyin bo'lishi kerak.": { en: "The end time must come after the start time." },
  "Tugash sanasi boshlanishdan keyin bo'lishi kerak.": { en: "The end date must come after the start date." },
  "Taxminan necha kunda tugataman?": { en: "In roughly how many days will I finish it?" },
  "Sanaladigan vazifada muddat majburiy — qachongacha yetkazasiz?": { en: "A deadline is required for a countable task — by when will you finish?" },
  "Vazifaning kunlik vaqti {v} — undan KAM vaqt ajratib bo'lmaydi.": { en: "The task's daily time is {v} — you cannot allocate LESS than that." },
  "Vazifa katakchasini bossangiz — belgilash oynasi ochiladi: qildim, sababli yoki qilmadim.": { en: "Tap a task's box and the marking window opens: done, excused, or not done." },
  "Bu vazifani tugatdingizmi? Tabriklaymiz!": { en: "Have you finished this task? Congratulations!" },
  "Vazifani tashlab qo'yasizmi? Bu statistikada salbiy iz qoldiradi.": { en: "Abandon this task? It will leave a negative mark in your statistics." },
  "Bu vazifa hali boshlanmagan. Butunlay o'chirilsinmi?": { en: "This task has not started yet. Delete it completely?" },
  "Arxivlansinmi? Tarixi saqlanadi, ro'yxatdan chiqadi.": { en: "Archive it? Its history is kept, and it leaves the list." },
  "Ko'pi bilan 7 kun. Undan ortig'i — vazifani tashlab qo'yish hisoblanadi.": { en: "7 days at most. Anything longer counts as abandoning the task." },
  "Papkani o'chirish uchun avval ichidagi vazifalarni boshqa joyga ko'chiring.": { en: "To delete a folder, first move the tasks inside it elsewhere." },
  "Tartibni o'zgartiring — birinchi vazifa «Keyingi vazifa» kartasida chiqadi.": { en: "Change the order — the first task appears on the «Next task» card." },
  "Vaqtlar faqat reja uchun - belgilashni kun davomida istalgan payt qilasiz.": { en: "Times are only a plan — you can mark them at any point during the day." },
  "Vazifaga tegishli bo'lsa — o'sha vazifaga «ziyoda» qo'shiladi va statistikaga kiradi.": { en: "If it belongs to a task, «extra» is added to that task and counted in the statistics." },
  "Rejadan ortiq ish qilsangiz — Bugun'dagi “Qo'shimcha ish” bo'limiga yozing. Vijdon — eng adolatli guvoh.": { en: "If you do more than planned, log it in the “Extra work” section on Today. Your conscience is the fairest witness." },
  "Masalan: qo'shimcha kitob o'qidim": { en: "For example: I read an extra book" },

  // --- Oliy maqsad va yillik maqsadlar ---
  "Oliy maqsadlaringizni belgilang": { en: "Set your ultimate goals" },
  "Maqsadingizni iloji boricha aniq va batafsil yozing.": { en: "Write your goal as precisely and fully as you can." },
  "Maqsadni qayta shakllantirasizmi?": { en: "Reshape the goal?" },
  "Maqsadingizga umumiy qancha vaqtda yetishni niyat qilgansiz?": { en: "In how much time do you intend to reach your goal?" },
  "Qachondan harakatga kirmoqchisiz?": { en: "When do you want to begin?" },
  "Masalan: 5 yil ichida kasbimda yetuk mutaxassis bo'lish va sog'lom turmush tarziga o'tish...": { en: "For example: becoming an expert in my field within 5 years and moving to a healthy lifestyle..." },
  "Yillik raqamli maqsad — masalan 10 kitob": { en: "A yearly numeric goal — for example 10 books" },
  "Yillik raqamli maqsadlar hali yo'q — bosib qo'shing": { en: "No yearly numeric goals yet — tap to add one" },
  "Yil davomida nimani nechta qilmoqchisiz? Masalan «10 kitob», «100 dars».": { en: "How many of what do you want to do this year? For example «10 books», «100 lessons»." },
  "Yil davomida nimani nechta qilishni belgilang — masalan «yiliga 10 kitob», «100 dars». Bu raqamlar Maqsad bo'limidagi progressni yuritadi.": { en: "Set how many of what you will do this year — for example «10 books a year», «100 lessons». These numbers drive the progress in the Goal section." },
  "«{nom}» turidagi oliy vazifa tugatilganda hisob o'zi +1 bo'ladi.": { en: "When an ultimate task of type «{nom}» is completed, the count increases by 1 automatically." },
  "Bu maqsad qo'lda sanaladi — Bugun sahifasidagi «+1» tugmasi bilan.": { en: "This goal is counted manually — with the «+1» button on the Today page." },
  "Bugun bo'limida «+1» tugmasi chiqadi — har safar o'zingiz bosasiz.": { en: "A «+1» button appears in the Today section — you tap it each time." },
  "Masalan: “100 ta dars” — kunlik normasiz, umumiy son bilan boriladigan ishlar. “+” bilan qo'shing.": { en: "For example: “100 lessons” — work tracked by a total count with no daily quota. Add it with “+”." },
  "Kunlik ulush qanday o'lchanadi?": { en: "How is the daily share measured?" },

  // --- Kun, hafta, dam ---
  "Bugun dam kuni — halovat oling": { en: "Today is a rest day — take your ease" },
  "Dam kuni foizga kirmaydi — halovat kuni.": { en: "The rest day is excluded from the percentage — it is a day of ease." },
  "Haftalik dam olish kuningizni belgilang!": { en: "Choose your weekly rest day!" },
  "Haftalik statistika shu kundan hisoblanadi.": { en: "Weekly statistics are counted from this day." },
  "Yaxshi hordiq oling. Hafta yakunini ko'rib chiqing.": { en: "Rest well. Review your week's summary." },
  "Ajoyib — bugungi reja to'liq bajarildi": { en: "Excellent — today's plan is fully complete" },
  "Yarmidan oshdingiz — davom eting": { en: "You are past halfway — keep going" },
  "Rejadan biroz ortdasiz — bugun bir oz ko'proq harakat qiling.": { en: "You are slightly behind plan — push a little harder today." },
  "Bugungi ishlaringizni tekshirib qo'ying.": { en: "Check over today's tasks." },
  "Bugun qanday o'tdi? (bir jumla — Taqvimda saqlanadi)": { en: "How did today go? (one sentence — saved in the Calendar)" },
  "O'tgan kunlar o'zgartirilmaydi.": { en: "Past days cannot be changed." },
  "Oylik yakun oyning oxirgi dam kunida ochiladi.": { en: "The monthly summary opens on the last rest day of the month." },
  "Sababingiz qanchalik o'rinli? (1 — bahona, 10 — chindan uzr)": { en: "How valid is your reason? (1 — an excuse, 10 — a genuine one)" },
  "(ixtiyoriy — erta tugatsangiz reyting oshadi)": { en: "(optional — finishing early raises your rating)" },

  // --- Vazn ---
  "Hozirgi vazningiz qancha? (haftalik o'lchov)": { en: "What is your current weight? (weekly measurement)" },
  "Vazningizni nazorat qilib borishni istaysizmi?": { en: "Do you want to keep track of your weight?" },

  // --- Sozlamalar, zaxira, ma'lumot ---
  "Ma'lumotlaringiz telefon xotirasiga saqlanadi": { en: "Your data is stored in your phone's memory" },
  "Zaxira nusxa olganingizga ancha bo'ldi - Sozlamalardan yuklab oling.": { en: "It has been a while since your last backup — download one from Settings." },
  "Fayldagi ma'lumot ilovaga yuklanadi": { en: "The data in the file will be loaded into the app" },
  "Hozirgi barcha ma'lumotlaringiz fayldagi bilan almashtiriladi. Bu amalni ortga qaytarib bo'lmaydi.": { en: "All your current data will be replaced with the file's. This action cannot be undone." },
  "«O'rnatish» amaldagi ma'lumotni almashtiradi — ogohlantiriladi.": { en: "«Install» replaces the current data — you will be warned first." },
  "Bu fayl Oliy Maqsad zaxirasi emas.": { en: "This file is not an Ultimate goal backup." },
  "Fayl buzilgan yoki boshqa ilovaniki bo'lishi mumkin.": { en: "The file may be corrupted or belong to another app." },
  "Bu amalni ortga qaytarib bo'lmaydi. Rostdan ham hammasini o'chirasizmi?": { en: "This action cannot be undone. Do you really want to delete everything?" },
  "Kirish sahifasi qaytadan ochiladi, lekin barcha tarix — belgilashlar, vazifalar, xulosalar — saqlanadi.": { en: "The welcome page opens again, but all history — marks, tasks and notes — is kept." },
  "Quyidagilar keyin o'zgartirilmaydi:": { en: "The following cannot be changed later:" },
  "Keyingi 7 kun davomida qayta o'zgartirib bo'lmaydi.": { en: "It cannot be changed again for the next 7 days." },
  "Majburiy bo'lim - to'ldirish shart": { en: "Required section — must be filled in" },
  "Ma'lumot hali yetarli emas": { en: "Not enough data yet" },

  // --- Yordam, yangiliklar, kanal ---
  "Ilovaning har bo'limi haqida qisqa izoh": { en: "A short note about each section of the app" },
  "Yangiliklar va yangilanishlar shu yerda": { en: "News and updates appear here" },
  "Ro'yxat, qidiruv, arxiv, uyqu rejasi": { en: "List, search, archive, sleep schedule" },
  "Quyidagi to'rt katakcha bosiladi — ibodat, uyqu, pomodoro va eslatmalar shu yerdan ochiladi.": { en: "The four boxes below are tappable — worship, sleep, pomodoro and reminders open from here." },
  "Pastdagi + tugmasi orqali kundalik vazifa, oliy maqsad vazifasi va yillik maqsadlaringizni qo'shasiz.": { en: "Use the + button at the bottom to add daily tasks, ultimate goal tasks and yearly goals." },
  "tugmasi orqali kundalik yoki oliy maqsad vazifasini qo'shing.": { en: "button to add a daily task or an ultimate goal task." },
  "Vazifa qo'shib, bir necha kun belgilab boring — natijalar, grafiklar va haftalik hisobot shu yerda ko'rinadi.": { en: "Add a task and mark it for a few days — results, charts and the weekly report will appear here." },
  "«Oliy maqsad» telegram kanali": { en: "The «Ultimate goal» Telegram channel" },
  "«Oliy maqsad» kanaliga o'tasizmi?": { en: "Go to the «Ultimate goal» channel?" },
  "Masalan: yaxshi, unumli kun bo'ldi...": { en: "For example: it was a good, productive day..." },
  "Ilova tilini tanlang. Til istalgan vaqtda o'zgartirilishi mumkin.": { en: "Choose the app language. You can change it at any time." },

  // ===== 5-BOSQICH: sana nomlari va til so'rovi =====
  // OYLAR/KUNLAR/HIJRI_OYLAR massivlari xom o'zbekcha — `tr()` ular
  // ISHLATILGAN JOYDA qo'llanadi, shuning uchun kalitlar shu yerda.

  // --- Milodiy oylar (o'zbekchada kichik harf: "5-yanvar 2026") ---
  "yanvar": { en: "January" }, "fevral": { en: "February" }, "mart": { en: "March" },
  "aprel": { en: "April" }, "may": { en: "May" }, "iyun": { en: "June" },
  "iyul": { en: "July" }, "avgust": { en: "August" }, "sentabr": { en: "September" },
  "oktabr": { en: "October" }, "noyabr": { en: "November" }, "dekabr": { en: "December" },

  // --- Hafta kunlari ---
  "Yakshanba": { en: "Sunday" }, "Dushanba": { en: "Monday" }, "Seshanba": { en: "Tuesday" },
  "Chorshanba": { en: "Wednesday" }, "Payshanba": { en: "Thursday" }, "Juma": { en: "Friday" },
  "Shanba": { en: "Saturday" },

  // --- Hijriy oylar (transliteratsiya, tarjima emas) ---
  "muharram": { en: "Muharram" }, "safar": { en: "Safar" },
  "rabiul-avval": { en: "Rabi' al-Awwal" }, "rabiul-oxir": { en: "Rabi' al-Thani" },
  "jumadul-avval": { en: "Jumada al-Awwal" }, "jumadul-oxir": { en: "Jumada al-Thani" },
  "rajab": { en: "Rajab" }, "sha'bon": { en: "Sha'ban" }, "ramazon": { en: "Ramadan" },
  "shavvol": { en: "Shawwal" }, "zulqa'da": { en: "Dhul-Qa'dah" }, "zulhijja": { en: "Dhul-Hijjah" },

  // --- Birinchi kirishdagi til so'rovi ---
  "Qaysi tilni tanlaysiz?": { en: "Which language do you prefer?" },
  "Til o'zgartirilganda ba'zi ma'lumotlar qayta yuklanishi mumkin.": { en: "Some data may reload when the language changes." },

  // ===== 6-BOSQICH: MODUL MASSIVLARI =====
  // !!! DIQQAT: bular massiv ichida turadi (ZIKRLAR / NAMOZLAR / HELP_ITEMS /
  // NEWS_ITEMS), `tr()` ularga ISHLATILGAN JOYDA qo'llanadi. Shu sababli
  // `grep 'tr("...")'` tekshiruvi ularni TOPMAYDI — massiv o'zgartirilsa
  // tarjimasi ham QO'LDA qo'shilsin, aks holda sezilmay o'zbekcha qolib ketadi.

  // --- Zikrlar ---
  "Tonggi zikrlar": { en: "Morning dhikr" },
  "Kechki zikrlar": { en: "Evening dhikr" },
  "Uxlashdan oldingi zikrlar": { en: "Dhikr before sleep" },

  // --- Namoz nomlari (arabcha asliga qaytariladi) ---
  "Bomdod": { en: "Fajr" }, "Peshin": { en: "Dhuhr" }, "Asr": { en: "Asr" },
  "Shom": { en: "Maghrib" }, "Xufton": { en: "Isha" }, "Vitr": { en: "Witr" },
  "2 sunnat": { en: "2 sunnah" }, "4 sunnat": { en: "4 sunnah" },
  "2 farz": { en: "2 fard" }, "3 farz": { en: "3 fard" }, "4 farz": { en: "4 fard" },
  "3 vitr": { en: "3 witr" },

  // --- Yordam bo'limi (sarlavhalar; "Bugun/Ibodatlar/Pomodoro/Taqvim/
  //     Statistika/Oliy maqsad/Qo'shimcha ish" yuqorida allaqachon bor) ---
  "Qo'shish (+)": { en: "Add (+)" },
  "Vazifa vaqti": { en: "Task time" },
  "Zaxira": { en: "Backup" },
  "Kunning yuragi. Yuqorida bugungi natija, keyin vazifalaringiz. Katakchani bossangiz belgilash oynasi ochiladi: qildim, sababli qilmadim yoki umuman qilmadim.": { en: "The heart of the day. Today's result at the top, then your tasks. Tap a box and the marking window opens: done, excused, or not done at all." },
  "Pastdagi yashil tugma. Undan kundalik vazifa, oliy maqsad vazifasi, yillik maqsad qo'shasiz va barcha vazifalar ro'yxatini ochasiz.": { en: "The green button at the bottom. Use it to add a daily task, an ultimate goal task or a yearly goal, and to open the full task list." },
  "Har vazifaga vaqt oralig'i belgilanadi — masalan 08:00–09:00. O'sha vaqt kelganda telefonga eslatma keladi, ilova yopiq bo'lsa ham. Kunlarni ham tanlashingiz mumkin.": { en: "Each task gets a time range — for example 08:00–09:00. A reminder arrives on your phone at that time, even if the app is closed. You can also choose the days." },
  "Rejadan ortiq ish qilsangiz shu yerga yozasiz. U tegishli vazifaga «ziyoda» bo'lib qo'shiladi va statistikada foizni 100% dan yuqoriga chiqaradi.": { en: "Log here anything you do beyond the plan. It is added to the related task as «extra» and pushes your percentage above 100% in the statistics." },
  "Alohida bo'lim, kunlik foizga aralashmaydi. Zikrlar, besh vaqt namoz, nafllar va Qur'on xatmi shu yerda belgilanadi.": { en: "A separate section that does not affect the daily percentage. Dhikr, the five daily prayers, nafl prayers and the Qur'an khatm are marked here." },
  "Ikki rejim bor. Fokusda ekran qorayadi va faqat taymer qoladi. Ochiq rejimda ilovadan chiqsangiz ham vaqt tugaganda xabar keladi.": { en: "There are two modes. In Focus the screen dims and only the timer remains. In Open mode you get a notification when the time is up, even if you leave the app." },
  "Har kun rangi natijaga qarab: to'liq bajarilgan kun yashil, yarmidan ko'pi sariq, past bo'lsa qizil. Dam kuni rangsiz — u hisobga kirmaydi.": { en: "Each day is coloured by its result: a fully completed day is green, more than half is amber, below that is red. The rest day has no colour — it is not counted." },
  "Kunlik, haftalik va oylik ko'rinish. Har raqam yonida o'tgan davrga nisbatan farqi turadi. Grafikdagi nuqtaga bossangiz qaysi kun ekani chiqadi.": { en: "Daily, weekly and monthly views. Next to each figure is the change from the previous period. Tap a point on the chart to see which day it is." },
  "Maqsad matningiz, natija halqasi va yillik maqsadlaringiz. Har maqsadni bosib jarayonini ko'rasiz — hafta, oy, 6 oy va yil bo'yicha.": { en: "Your goal text, the result ring and your yearly goals. Tap any goal to see its progress — by week, month, 6 months and year." },
  "Sozlamalar → Ma'lumotlar. PDF yuklab olsangiz hamma ma'lumot shu faylda saqlanadi. Yangi telefonda «PDF o'rnatish» orqali tiklaysiz.": { en: "Settings → Data. When you download the PDF, all your data is stored in that file. On a new phone you restore it with «Install from PDF»." },

  // --- Yangiliklar oynasi (v10) ---
  "10-yangilanish (v10)": { en: "Update 10 (v10)" },
  "Ilova endi to'rt tilda: o'zbekcha lotin, o'zbekcha kirill, ingliz va arab tillari. Sozlamalar → Ilova tili.": { en: "The app now speaks four languages: Uzbek Latin, Uzbek Cyrillic, English and Arabic. Settings → App language." },
  "Til birinchi kirishda so'raladi. Xohlasangiz tanlamasdan yopib ketasiz — keyin Sozlamalardan o'zgartirasiz.": { en: "The language is asked on first launch. You may close it without choosing — you can change it later in Settings." },
  "Arabcha tanlansa ilova butunlay o'ngdan chapga aylanadi, raqamlar ham arabcha ko'rinadi.": { en: "Choosing Arabic flips the whole app right-to-left, and the numerals become Arabic too." },
  "Oy, kun va hijriy oy nomlari ham tanlangan tilda chiqadi.": { en: "Month, weekday and Hijri month names also appear in the chosen language." },
  "Ilova nomi har tilda o'zgaradi — telefondagi belgi ostida ham.": { en: "The app name changes with the language — including under the icon on your phone." },
  "Bugun bo'limidagi oyat kartasi yangi ko'rinishda. Arabcha tanlansa faqat oyatning o'zi qoladi.": { en: "The verse card in the Today section has a new look. With Arabic selected, only the verse itself remains." },
  "Til tanlash ro'yxati ixchamlashdi — kamroq joy egallaydi.": { en: "The language list is more compact — it takes up less space." },
  "Shrift sozlamasidagi xato tuzatildi (ilova o'z shriftini yo'qotayotgan edi).": { en: "Fixed a font setting bug (the app was losing its own typeface)." },
  "Kirill rejimida ba'zi jumlalar lotin bo'lib qolayotgan edi — hammasi tuzatildi.": { en: "Some sentences stayed in Latin script in Cyrillic mode — all fixed." },

  // ===== 7-BOSQICH (v11): qisqa sana nomlari va onboarding xulosasi =====
  // KUN_QISQA va OY_QISQA ham modul massivlari — yuqoridagi DIQQAT izohi
  // ularga ham tegishli.

  // --- Qisqa hafta kunlari (taqvim sarlavhasi, statistika ustunlari) ---
  "Ya": { en: "Su" }, "Du": { en: "Mo" }, "Se": { en: "Tu" }, "Ch": { en: "We" },
  "Pa": { en: "Th" }, "Ju": { en: "Fr" }, "Sh": { en: "Sa" },

  // --- Qisqa oy nomlari ("may" yuqorida to'liq nom sifatida allaqachon bor) ---
  "yan": { en: "Jan" }, "fev": { en: "Feb" }, "mar": { en: "Mar" }, "apr": { en: "Apr" },
  "iyn": { en: "Jun" }, "iyl": { en: "Jul" }, "avg": { en: "Aug" },
  "sen": { en: "Sep" }, "okt": { en: "Oct" }, "noy": { en: "Nov" }, "dek": { en: "Dec" },

  // --- Onboarding xulosa qatori (avval xom o'zbekcha edi) ---
  "Muddat": { en: "Duration" },
  "Boshlanish": { en: "Start" },
  "Hafta boshi": { en: "Week starts" },
  "yo'q": { en: "none" },
  "{n} yil": { en: "{n} year|{n} years" },
  "Shoshilmang — tayyor bo'lganingizda \"Ha\"ni tanlang. Eng muhimi — niyat.": { en: "Take your time — choose \"Yes\" when you are ready. Intention matters most." },

  // --- v11: sozlamalar bo'limlarga ajratildi ---
  "Zaxira, qo'llanma, maqsadni qayta tuzish": { en: "Backup, guide, rebuilding the goal" },
  "Ilovani ishlatish bo'yicha qo'llanma": { en: "How to use the app" },
  "Maqsadni qayta shakllantirish": { en: "Reshape the goal" },
  "Maqsadni qaytadan tuzish": { en: "Rebuild the goal from scratch" },
  "Ushbu amal barcha ma'lumotlaringizni o'chiradi: vazifalar, belgilashlar, statistika. Ortga qaytarib bo'lmaydi.": { en: "This deletes all your data: tasks, marks and statistics. It cannot be undone." },
  "Ma'lumotlaringiz PDF shaklida yuklansinmi?": { en: "Download your data as a PDF?" },
  "O'chirishdan oldin zaxira saqlab qo'yish tavsiya etiladi.": { en: "Saving a backup before deleting is recommended." },
  "Ha, yuklansin": { en: "Yes, download it" },
  "Yangilanish sanasi": { en: "Updated" },

  // --- v11: hijriy oy boshidagi tuzatish taklifi ---
  "Yangi hijriy oy boshlandi. Sana to'g'ri ko'rsatilyaptimi? Kerak bo'lsa bir kunga suring.": { en: "A new Hijri month has begun. Is the date shown correctly? Shift it by a day if needed." },
  "To'g'ri, davom etamiz": { en: "Correct, let us continue" },

  // --- v11: ixcham yig'iladigan kartalar ---
  "Kun xulosasi": { en: "Day summary" },
  "Hali yozilmagan": { en: "Not written yet" },

  // --- v11: yozilgan narsalarni tahrirlash ---
  "Xulosani tahrirlang...": { en: "Edit the note..." },
  "Xulosa o'chirilsinmi?": { en: "Delete this note?" },
  "Qo'shimcha ish o'chirilsinmi?": { en: "Delete this extra work entry?" },

  // --- v11: birinchi yil izohi va qidiruv ---
  "Hozircha faqat birinchi yil vazifalarini belgilaysiz. Yil tugagach keyingi yilnikini qo'shasiz — o'tgan yil ma'lumotlari saqlanib qoladi ({n} yillik reja shunday boriladi).": { en: "For now you set only the first year's tasks. When the year ends you add the next year's — the past year's data is kept ({n}-year plans work this way)." },
  "Qidiruv natijalari ({n})": { en: "Search results ({n})" },
};

// ---------- ARABCHA ----------
// Alohida blokda: arab tilini biladigan odam bir joydan ko'rib chiqa olsin.
// Kalitlar LUGAT bilan bir xil. Pastda LUGAT ga qo'shib qo'yiladi.
//
// !!! TEKSHIRILMAGAN: bu tarjimalar arab tilini ONA TILI sifatida biladigan
// kishi tomonidan ko'rib chiqilishi SHART. Ayniqsa diniy atamalar.
// Play Market bosqichidan oldin albatta tasdiqlansin.
const LUGAT_AR: Record<string, string> = {
  // --- Ilova nomi va asosiy bo'limlar ---
  "Oliy maqsad": "المقصد الأعلى",
  "oliy maqsad": "المقصد الأعلى",
  "Bugun": "اليوم",
  "Taqvim": "التقويم",
  "Statistika": "الإحصائيات",
  "Sozlamalar": "الإعدادات",
  "Vazifalar": "المهام",
  "Til": "اللغة",
  "Ilova tili": "لغة التطبيق",

  // --- Ibodat ---
  "Ibodat": "العبادة",
  "Ibodatlar": "العبادات",
  "5 vaqt namoz": "الصلوات الخمس",
  "Tahajjud": "التهجد",
  "Nafl:": "النافلة:",
  "Kunduzgi nafl": "نوافل النهار",
  "Nafl namozlar (bonus)": "صلوات النوافل (إضافي)",
  "rakaat": "ركعة",
  "Zikrlar": "الأذكار",
  "Qur'on xatmi": "ختم القرآن",
  "yangi xatm": "ختمة جديدة",
  "Xatm tugadi:": "انتهت الختمة:",
  "Pora bilan": "بالجزء",
  "Kuniga necha pora?": "كم جزءًا في اليوم؟",
  "to'liq o'qildi": "قُرئ كاملًا",
  "Masjid:": "المسجد:",
  "Masjidda": "في المسجد",
  "Hijriy sana": "التاريخ الهجري",
  "Hadisi sharif": "الحديث الشريف",
  "Oli Imron surasi · 200-oyat": "سورة آل عمران · الآية ٢٠٠",
  "Alloh taolo Qur'oni Karimda shunday marhamat qiladi:": "قال الله تعالى في القرآن الكريم:",
  "Bugungi ibodat reytingi": "تقييم عبادة اليوم",
  "Assalomu alaykum va rohmatullohi va barokatuhu": "السلام عليكم ورحمة الله وبركاته",

  // --- Kun va vaqt ---
  "Ertaga": "غدًا",
  "Hozir": "الآن",
  "Hafta": "أسبوع",
  "Haftalik": "أسبوعي",
  "Oylik": "شهري",
  "Kunlik": "يومي",
  "Kundalik": "يومي",
  "Har kuni": "كل يوم",
  "Shu hafta": "هذا الأسبوع",
  "kun": "يوم",
  "hafta": "أسبوع",
  "Yil": "السنة",
  "soat": "ساعة",
  "daqiqa": "دقيقة",
  "daq": "د",
  "s": "س",
  "gacha": "حتى",
  "dan": "من",
  "keyingi": "التالي",
  "Sana tanlang": "اختر التاريخ",
  "Vaqt tanlang": "اختر الوقت",
  "Vaqtni tanlang": "اختر الوقت",
  "Sanani tanlang": "اختر التاريخ",
  "Muddatsiz": "بلا موعد نهائي",
  "Vaqt oralig'i": "الفترة الزمنية",
  "Qachon boshlanadi?": "متى يبدأ؟",
  "Qachon tugaydi?": "متى ينتهي؟",
  "Qaysi kunlari?": "في أي أيام؟",
  "Dam kuni": "يوم الراحة",
  "Dam olish": "راحة",
  "Bugun — dam kuni": "اليوم يوم راحة",

  // --- Belgilash va holat ---
  "Qildim": "فعلتُ",
  "✓ Qildim": "✓ فعلتُ",
  "✗ Qilmadim": "✗ لم أفعل",
  "Sababli": "بعذر",
  "Sababli:": "بعذر:",
  "Sababli qilmadim": "لم أفعل بعذر",
  "Umuman qilmadim": "لم أفعل مطلقًا",
  "Bajarildi": "أُنجز",
  "Bajarildi:": "أُنجز:",
  "Bajarilmadi": "لم يُنجز",
  "Bajarilmadi:": "لم يُنجز:",
  "Belgilandi": "تم التحديد",
  "Belgilanmagan": "غير محدد",
  "Tugatdim": "أنهيتُ",
  "Tayyor": "جاهز",
  "Saqlandi ✓": "تم الحفظ ✓",
  "Bugungi natija": "نتيجة اليوم",
  "Jarayon:": "التقدم:",
  "O'rtacha": "المتوسط",
  "O'rtacha:": "المتوسط:",
  "Jami": "المجموع",
  "Jami:": "المجموع:",
  "Jami vaqt": "الوقت الإجمالي",
  "Umumiy vaqt": "الوقت الكلي",
  "Tanlangan:": "المحدد:",

  // --- Tugmalar ---
  "OK": "حسنًا",
  "Ha": "نعم",
  "Bekor": "إلغاء",
  "Saqlash": "حفظ",
  "Qo'shish": "إضافة",
  "O'chirish": "حذف",
  "O'zgartirish": "تغيير",
  "tahrirlash": "تحرير",
  "Davom": "متابعة",
  "Davom etish": "متابعة",
  "Davom ettirish": "متابعة",
  "Boshlash": "ابدأ",
  "Boshlanish": "البداية",
  "Tugash": "النهاية",
  "To'xtatish": "إيقاف",
  "to'xtatish": "إيقاف",
  "Pauza": "إيقاف مؤقت",
  "Pauzada": "متوقف مؤقتًا",
  "Tushunarli": "فهمت",
  "Yaxshi!": "أحسنت!",
  "Arxivlash": "أرشفة",
  "Tartiblash": "ترتيب",
  "Sozlash": "ضبط",
  "Qayta tiklash": "استعادة",

  // --- Vazifa ---
  "Vazifa": "مهمة",
  "Vazifa nomi": "اسم المهمة",
  "Vazifa turi": "نوع المهمة",
  "Yangi vazifa": "مهمة جديدة",
  "Bugungi vazifalar": "مهام اليوم",
  "Barcha vazifalar": "كل المهام",
  "Bajarilgan vazifalar": "المهام المنجزة",
  "Kundalik vazifa": "مهمة يومية",
  "Kundalik vazifalar": "المهام اليومية",
  "Keyingi vazifa": "المهمة التالية",
  "Bugunga vazifa yo'q": "لا مهام لليوم",
  "Turkum": "الفئة",
  "Turkumsiz": "بلا فئة",
  "Papka nomi": "اسم المجلد",
  "Turi": "النوع",
  "Turi:": "النوع:",
  "Qo'shimcha ish": "عمل إضافي",
  "Qo'shimcha ishlar": "أعمال إضافية",
  "Ziyoda": "زيادة",

  // --- Maqsad ---
  "Maqsad": "الهدف",
  "Yangi maqsad": "هدف جديد",
  "Oliy maqsadim": "مقصدي الأعلى",
  "Oliy maqsadlaringiz": "مقاصدك العليا",
  "Belgilangan maqsad": "الهدف المحدد",
  "Maqsadga yetdingiz!": "بلغتَ الهدف!",
  "Reja": "الخطة",
  "Reja yo'q": "لا توجد خطة",

  // --- Uyqu va pomodoro ---
  "Uyqu": "النوم",
  "Uyqu rejasi": "خطة النوم",
  "Uyqu kundaligi": "يوميات النوم",
  "Uxlash vaqti": "وقت النوم",
  "Turish vaqti": "وقت الاستيقاظ",
  "Pomodoro": "بومودورو",
  "Fokus rejimi": "وضع التركيز",
  "Ish vaqti": "وقت العمل",
  "Ish:": "العمل:",
  "Kun tartibi": "النظام اليومي",

  // --- Boshqa ---
  "Erkak": "ذكر",
  "Ayol": "أنثى",
  "Ma'lumotlar": "البيانات",
  "Eslatma": "تذكير",
  "Eslatma vaqti": "وقت التذكير",
  "Xulosalarim": "ملاحظاتي",
  "Xulosa qo'shish": "إضافة ملاحظة",
  "Tonggi": "فاتح",
  "Tungi": "داكن",
  "(ixtiyoriy)": "(اختياري)",
  "tez orada": "قريبًا",
  "kg": "كجم",
  "marta": "مرة",
  "umumiy": "الكلي",
  "ma'lumot yo'q": "لا توجد بيانات",
  "Hech narsa topilmadi.": "لم يُعثر على شيء.",
  "Ilova yangiliklari": "جديد التطبيق",
  "Qanday ishlaydi?": "كيف يعمل؟",
  "PDF yuklab olish": "تنزيل PDF",
  "Zaxira saqlandi": "تم حفظ النسخة الاحتياطية",
  // Arabchada sanoq yuklamasi yo'q — o'zbekcha "ta" kabi
  "ta": "",

  // ===== 2-to'plam =====
  // KO'PLIK ESLATMASI: arab tilida son bilan kelishuv murakkab (1 / 2 / 3-10 / 11+).
  // `tf()` faqat IKKI shakl beradi, shuning uchun "{n} ساعة|{n} ساعات" taxminiy.
  // 11 dan katta sonlarda grammatik jihatdan aniq emas — tekshiruvchi e'tibor bersin.

  // --- Sanoq va o'lchov ---
  "{n} soat": "{n} ساعة|{n} ساعات",
  "~{n} soat": "~{n} ساعة|~{n} ساعات",
  "reja {n} soat": "المخطط {n} ساعة|المخطط {n} ساعات",
  "Uyqu: {n} soat": "النوم: {n} ساعة|النوم: {n} ساعات",
  "{n} kun": "{n} يوم|{n} أيام",
  "{a}/{b} kun": "{a}/{b} يوم",
  "{n} kundan keyin": "بعد {n} يوم|بعد {n} أيام",
  "Reja: {n} kun": "المخطط: {n} يوم|المخطط: {n} أيام",
  "{y}-yil · {n} kun qoldi": "السنة {y} · بقي {n} يوم|السنة {y} · بقي {n} أيام",
  "kun · Umumiy:": "يوم · الإجمالي:",
  "Necha soat?": "كم ساعة؟",
  "Kuniga necha daqiqa?": "كم دقيقة في اليوم؟",
  "Qancha vaqtda?": "في كم من الوقت؟",
  "Qachongacha?": "إلى متى؟",
  "Jami nechta?": "كم العدد الإجمالي؟",
  "Umumiy sonni kiriting.": "أدخل العدد الإجمالي.",
  "Kunlik ulushni kiriting.": "أدخل الحصة اليومية.",
  "Yillik sonni kiriting.": "أدخل العدد السنوي.",
  "Yillar sonini tanlang.": "اختر عدد السنوات.",
  "Muhimlik darajasi (1-10)": "درجة الأهمية (١-١٠)",
  "Vazn kamayishi (kg)": "إنقاص الوزن (كجم)",
  "O'lchov": "المقياس",
  "Sanaladigan": "قابل للعد",
  "SANALADIGAN": "قابل للعد",
  "Sanaladigan vazifalar": "المهام القابلة للعد",
  "qo'lda (+1)": "يدويًا (+١)",
  "O'zim sanayman": "أعدّ بنفسي",
  "Masalan: 10": "مثال: ١٠",
  "Masalan: 30": "مثال: ٣٠",
  "Masalan: 100 ta dars.": "مثال: ١٠٠ درس.",
  "Masalan: Abdulloh": "مثال: عبد الله",
  "Masalan: Kitob o'qish": "مثال: قراءة الكتب",
  "Masalan: Video darslar": "مثال: دروس مصوّرة",

  // --- Vaqt va sana ---
  "Vaqtli": "بوقت محدد",
  "vaqtsiz": "بلا وقت محدد",
  "vaqt yo'q": "لا وقت",
  "vaqt berish": "تحديد وقت",
  "Vaqtni olib tashlash": "إزالة الوقت",
  "Vaqt bilan (daqiqa)": "بالوقت (دقائق)",
  "Aniq vaqt oralig'i bilan": "بفترة زمنية محددة",
  "Kunlik soat bilan": "بالساعات اليومية",
  "kun tartibida vaqti": "وقته في النظام اليومي",
  "Bugundan": "من اليوم",
  "Ertadan": "من الغد",
  "Bir haftadan": "بعد أسبوع",
  "{sana} gacha": "حتى {sana}",
  "shu davrda": "في هذه الفترة",
  "bugun tugadi": "انتهى اليوم",
  "Qachondan boshlanadi?": "من متى يبدأ؟",
  "Qaysi kuni so'ralsin?": "في أي يوم يُسأل؟",
  "HAFTA KUNLARI BO'YICHA": "حسب أيام الأسبوع",
  "Tugash sanasi kerak.": "تاريخ الانتهاء مطلوب.",
  "Kun hali tugagani yo'q": "لم ينتهِ اليوم بعد",
  "Dam kuni edi.": "كان يوم راحة.",
  "Dam olishsiz": "بلا يوم راحة",
  "Dam tugadi": "انتهت الراحة",
  "Oxirgi 7 kunda": "في آخر ٧ أيام",
  "OXIRGI 90 KUN": "آخر ٩٠ يومًا",

  // --- Belgilash va natija ---
  "Belgilaymizmi?": "هل نحدّده؟",
  "Belgini olib tashlash": "إزالة التحديد",
  "ta sababli": "بعذر",
  "{n} sababli": "{n} بعذر",
  "{n} bajarildi": "{n} أُنجز",
  "ta ish qoldi": "مهام متبقية",
  "to'xtatilgan": "متوقف",
  "tashlab qo'yilgan": "متروك",
  "o'zgarishsiz": "دون تغيير",
  "uxlandi": "نام",
  "uxlandi.": "نام.",
  "rejada": "حسب الخطة",
  "{n} kam": "{n} أقل",
  "{n} ko'p": "{n} أكثر",
  "Rejaga aniq muvofiq": "مطابق تمامًا للخطة",
  "Rejaga muvofiq uyqu": "نوم حسب الخطة",
  "✓ belgilandi": "✓ تم التحديد",
  "✗ belgilandi": "✗ تم التحديد",
  "to'liq bajarilgan.": "أُنجز كاملًا.",
  " — rejadan oldin (bonus)": " — قبل الموعد (مكافأة)",
  " — rejadan kech": " — بعد الموعد",
  "Muddat tugadi: {a}/{b}": "انتهى الموعد: {a}/{b}",
  "Amalda:": "فعليًا:",
  "bugun: +{n}": "اليوم: +{n}",
  "Davomiyligi: {v}": "المدة: {v}",
  "Jami ishlangan vaqt:": "إجمالي وقت العمل:",
  "Eng samarali kun:": "أكثر الأيام إنتاجية:",
  "Bu hafta o'rtacha:": "متوسط هذا الأسبوع:",

  // --- Statistika ---
  "Kunlik faollik": "النشاط اليومي",
  "Kunlik faollik — 14 kun": "النشاط اليومي — ١٤ يومًا",
  "Haftalar taqqoslashi": "مقارنة الأسابيع",
  "Haftalik hisobot": "التقرير الأسبوعي",
  "Vaqt qayerga ketdi": "أين ذهب الوقت",
  "haftalik o'rtacha natija": "المتوسط الأسبوعي",
  "oylik o'rtacha natija": "المتوسط الشهري",
  "Oylik yakun": "ملخّص الشهر",
  "Statistika hali bo'sh": "الإحصائيات فارغة بعد",
  "Ma'lumot hali yo'q.": "لا توجد بيانات بعد.",
  "to'liq hisobotni ko'rish": "عرض التقرير الكامل",

  // --- Uyqu ---
  "Uxlash va turish vaqti": "وقت النوم والاستيقاظ",
  "Hali uyqu yozuvi yo'q.": "لا توجد سجلات نوم بعد.",
  "yana uxladingizmi? soat": "هل نمتَ مجددًا؟ ساعات",
  "Har kuni kamida": "أنام على الأقل",
  "uxlayman": "كل يوم",
  "da uxlayman (~{n} soat)": "(~{n} ساعة)|(~{n} ساعات)",

  // --- Pomodoro ---
  "Pomodoro — rejim tanlang": "بومودورو — اختر الوضع",
  "Fokus — ish vaqti": "التركيز — وقت العمل",
  "Focus vaqti": "وقت التركيز",
  "Ochiq rejim": "الوضع المفتوح",
  "Ish vaqti tugadi": "انتهى وقت العمل",
  "daq · Dam:": "د · الراحة:",
  "daq · Sikl:": "د · الدورة:",
  "Nima ish qildingiz?": "ماذا عملت؟",
  "Qaysi vazifaga tegishli?": "لأي مهمة ينتمي؟",
  "Vazifa turi orqali": "حسب نوع المهمة",
  "vazifa turi orqali": "حسب نوع المهمة",
  "Boshqa — mustaqil ish": "أخرى — عمل مستقل",

  // --- Vazifa va maqsad ---
  "Vazifalar tarixi": "سجل المهام",
  "Vazifa nomini yozing.": "اكتب اسم المهمة.",
  "Yangi {x} vazifa": "مهمة {x} جديدة",
  "Oliy maqsad vazifasi": "مهمة المقصد الأعلى",
  "Oliy maqsad vazifalari": "مهام المقصد الأعلى",
  "Oliy maqsad belgilash": "تحديد المقصد الأعلى",
  "Oliy maqsadni tahrirlash": "تعديل المقصد الأعلى",
  "Maqsad nomini yozing.": "اكتب اسم الهدف.",
  "Maqsadlar bajarildi": "الأهداف المنجزة",
  "ta maqsad belgilangan": "أهداف محددة",
  "yillik maqsad": "هدف سنوي",
  "ta bo'ladi (maqsad —": "(الهدف —",
  "QO'SHIMCHA ISHLAR": "أعمال إضافية",
  "Vaqtincha to'xtatish": "إيقاف مؤقت",
  "Tashlab qo'yish": "ترك المهمة",
  "Papka o'chirilsinmi?": "هل تُحذف هذه المجلد؟",
  "(shu tur bir papka)": "(هذا النوع مجلد واحد)",
  "Oddiy ro'yxat": "قائمة بسيطة",
  "+ Ro'yxatga qo'shish": "+ إضافة إلى القائمة",
  "Nima qo'shamiz?": "ماذا نضيف؟",

  // --- Ibodat (davomi) ---
  "Qur'on xatmini rejalash": "التخطيط لختم القرآن",
  "xatm rejasini tahrirlash": "تعديل خطة الختمة",
  "Bismillah — boshlaymiz!": "بسم الله — لنبدأ!",
  "HALOL BO'L!": "كن حلالًا!",

  // --- Xulosa, iqtibos, eslatma ---
  "Xulosalarim": "ملاحظاتي",
  "Yangi xulosa...": "ملاحظة جديدة...",
  "Hali xulosa yo'q.": "لا توجد ملاحظات بعد.",
  "Qo'shimcha eslatma": "تذكير إضافي",
  "Eslatma matni...": "نص التذكير...",
  "Eslatmani o'qish": "قراءة التذكير",
  "Fikringiz...": "رأيك...",
  "{nom} vaqti keldi": "حان وقت {nom}",

  // --- Sozlama va ma'lumot ---
  "Qo'shimcha sozlamalar": "إعدادات إضافية",
  "Majburiy bo'lim": "قسم إلزامي",
  "Rejani o'chirish": "حذف الخطة",
  "Rejangiz tayyor.": "خطتك جاهزة.",
  "Saqlab bo'lmadi": "تعذّر الحفظ",
  "Oxirgi zaxira": "آخر نسخة احتياطية",
  "Oxirgi tasdiq": "آخر تأكيد",
  "hali olinmagan": "لم تؤخذ بعد",
  "PDF o'rnatish": "التثبيت من PDF",
  "Pastdagi": "الذي في الأسفل",
  "E'tibor bering": "انتبه",
  "Kuchli tomon": "نقطة القوة",
  "kundalik": "يومي",
  "shu nom": "هذا الاسم",
  "do'stim": "يا صديقي",
  "Shu sabab ey": "فيا",

  // --- Tasdiq tugmalari ---
  "Ismingiz nima?": "ما اسمك؟",
  "Ha, tayyorman": "نعم، أنا مستعد",
  "Ha, istayman": "نعم، أريد ذلك",
  "Ha, o'taman": "نعم، سأفعل",
  "Ha, o'chirilsin": "نعم، احذفه",
  "Ha, o'rnatilsin": "نعم، ثبّته",
  "Yo'q, hozir emas": "لا، ليس الآن",
  "Yo'q, hozir kerak emas": "لا، غير مطلوب الآن",
  "(bo'sh — doimiy)": "(فارغ — مستمر)",

  // ===== 3-to'plam: jumlalar va uzun matnlar =====
  //
  // ═══════════════════════════════════════════════════════════════════════
  //  DIQQAT — QUR'ON VA HADIS MATNLARI
  //
  //  Arabchada bular TARJIMA emas, ASL matn. Ikkalasining manbasi boshqa:
  //
  //  · OYAT — App.tsx dagi `OyatCard` ichida allaqachon mavjud bo'lgan matnning
  //    AYNAN NUSXASI. Xotiradan yozilmagan. (Amalda arabchada ko'rinmaydi ham:
  //    OyatCard ma'no tarjimasini `getCur() !== "ar"` sharti bilan yashiradi.)
  //
  //  · HADIS — kodda arabcha asli YO'Q edi. Pastdagi matn mashhur rivoyat
  //    bo'lsa-da, ISHONCHLI MANBA BILAN SOLISHTIRILMAGAN.
  //
  //    !!! PLAY MARKET / OMMAGA CHIQARISHDAN OLDIN ALBATTA TEKSHIRILSIN:
  //    sunnah.com/bukhari:6465 yoki bosma Sahihul Buxoriy bilan solishtiring.
  //    Farq topilsa — manbadagi matn olinsin, bu yerdagi emas.
  // ═══════════════════════════════════════════════════════════════════════
  "Ey mo'minlar! Sabr qilinglar va sabr-toqat qilishda ustun bo'linglar hamda doimo belingiz bog'liq bo'lib turingiz! Va Allohdan qo'rqingiz! Shoyad najot topgaysizlar!": "يَا أَيُّهَا الَّذِينَ آمَنُوا اصْبِرُوا وَصَابِرُوا وَرَابِطُوا وَاتَّقُوا اللَّهَ لَعَلَّكُمْ تُفْلِحُونَ",
  "Oisha roziyallohu anhodan rivoyat qilindi: «Nabiy sollallohu alayhi vasallamdan: “Amallarning qay biri Allohga eng suyukli?” deb so'rashdi. U zot:": "عَنْ عَائِشَةَ رَضِيَ اللَّهُ عَنْهَا أَنَّ النَّبِيَّ ﷺ سُئِلَ: أَيُّ الأَعْمَالِ أَحَبُّ إِلَى اللَّهِ؟ قَالَ:",
  "“Oz bo'lsa ham, davomlirog'i”": "«أَدْوَمُهَا وَإِنْ قَلَّ»",
  ", dedilar. Yana: “Amallardan toqatingiz yetadiganini zimmangizga olinglar”, dedilar.»": "، وَقَالَ: «اكْلَفُوا مِنَ الأَعْمَالِ مَا تُطِيقُونَ».",

  // --- Ibodat va duo (ilovaning o'z matnlari, oyat/hadis emas) ---
  "Sahihul Buxoriy, 81-kitob, 6465-hadis.": "صحيح البخاري، كتاب ٨١، حديث ٦٤٦٥.",
  ", solih amallardan bardavom bo'l! Garchi u oz bo'lsa ham. Alloh taolo kuch-quvvat bersin!": "، داوم على الأعمال الصالحة! وإن قلّت. أعانك الله تعالى وقوّاك!",
  "Alloh taolo maqsadingizga yetishga sizga kuch-quvvat va bardavomlik ato etsin.": "أسأل الله تعالى أن يمنحك القوة والثبات لبلوغ مقصدك.",
  "Men sizga Oliy maqsadingizga erishishingiz uchun ko'makdosh bo'laman, biiznillah.": "سأكون عونًا لك في بلوغ مقصدك الأعلى، بإذن الله.",
  "Dam tugadi — yangi pomodoroni o'zingiz boshlaysiz. Bismillah!": "انتهت الراحة — ابدأ البومودورو التالي بنفسك. بسم الله!",
  "Ibodatlar bo'limi uchun bir savol": "سؤال واحد لقسم العبادات",
  "Bu hafta ibodat belgilanmagan.": "لم تُسجَّل عبادة هذا الأسبوع.",
  "Xatm {sana} dan boshlanadi": "تبدأ الختمة من {sana}",
  "Xatm rejasi o'chirilsinmi? (kunlik belgilar tarixda qoladi)": "هل تُحذف خطة الختمة؟ (تبقى التحديدات اليومية في السجل)",
  "Namoz belgilash to'g'ri sozlanishi uchun jinsingizni tanlang (bir marta so'raladi, saqlanadi):": "اختر جنسك ليُضبط تسجيل الصلاة بشكل صحيح (يُسأل مرة واحدة ثم يُحفظ):",
  "Erkaklarda har namozda “masjidda o'qidim” tugmasi bo'ladi — reytingda balandroq baholanadi.": "للرجال زر «صليتُ في المسجد» مع كل صلاة — ويُقيَّم أعلى.",
  "Kunlik vazifalar foiziga aralashmaydi — alohida hisoblanadi. Masjid va nafllar bonus beradi.": "لا يؤثر على نسبة المهام اليومية — يُحسب على حدة. المسجد والنوافل تمنح مكافأة.",

  // --- Uyqu ---
  "Hali uyqu rejasi yo'q — quyida sozlang. Reja qo'yilgach, Bugun sahifasida har kuni belgilab borasiz.": "لا توجد خطة نوم بعد — اضبطها أدناه. بعد وضع الخطة تسجّلها كل يوم في صفحة اليوم.",
  "Kuniga faqat bir marta belgilanadi. Kam uxlash — yuqori reyting.": "يُسجَّل مرة واحدة في اليوم فقط. النوم الأقل — تقييم أعلى.",
  "Eslatma: bu ilovada uyqu reytingi teskari — rejadan KAM uxlash yuqori baholanadi.": "ملاحظة: تقييم النوم في هذا التطبيق معكوس — النوم أقل من المخطط يُقيَّم أعلى.",
  "Belgilagach qaytarib o'zgartirib bo'lmaydi. Keyin yana uxlasangiz + bilan qo'shasiz.": "بعد التحديد لا يمكن تغييره. وإن نمتَ مجددًا فأضِفه بعلامة +.",
  "Avval necha soat uxlaganingizni kiriting.": "أدخل أولًا كم ساعة نمت.",
  "soat. Rejadan kam uxlash yuqori baholanadi.": "ساعات. النوم أقل من المخطط يُقيَّم أعلى.",
  "Rejadan {n} soat kam uxladingiz — reyting yuqori": "نمتَ {n} ساعة أقل من المخطط — التقييم مرتفع|نمتَ {n} ساعات أقل من المخطط — التقييم مرتفع",
  "Rejadan {n} soat ko'p uxladingiz — reyting pasayadi": "نمتَ {n} ساعة أكثر من المخطط — التقييم ينخفض|نمتَ {n} ساعات أكثر من المخطط — التقييم ينخفض",
  "Sifatli uyqu uchun maslahatlar": "نصائح لنوم أفضل",
  "Uxlashdan 1 soat oldin ekranlardan uzoqlashing va yengil kitob o'qing. Uxlashdan oldingi zikrlarni unutmang.": "ابتعد عن الشاشات قبل النوم بساعة واقرأ كتابًا خفيفًا. ولا تنسَ أذكار النوم.",
  "Uyqu rejasi o'chirilsinmi?": "هل تُحذف خطة النوم؟",
  "Bu hafta uyqu yozilmagan.": "لم يُسجَّل نوم هذا الأسبوع.",
  "Hozirgi vazningiz qancha? (haftalik o'lchov)": "كم وزنك الحالي؟ (قياس أسبوعي)",
  "Vazningizni nazorat qilib borishni istaysizmi?": "هل تريد متابعة وزنك؟",
  "Vaznimni kuzatib boraman.": "سأتابع وزني.",
  "Necha kg kamaytirmoqchisiz?": "كم كيلوجرامًا تريد أن تُنقص؟",

  // --- Pomodoro ---
  "Ekran qorayadi, faqat taymer va bugungi hisob ko'rinadi, ekran o'chmaydi. Chuqur diqqat uchun telefonning «Bezovta qilinmasin» rejimini ham yoqib qo'ying.": "تُعتَّم الشاشة فلا يظهر إلا المؤقّت وعدّاد اليوم، وتبقى مضاءة. وللتركيز العميق فعِّل أيضًا وضع «عدم الإزعاج» في هاتفك.",
  "Ilovadan bemalol chiqishingiz mumkin — vaqt tugaganda telefon o'zi xabar beradi.": "يمكنك الخروج من التطبيق بحرية — سينبّهك هاتفك عند انتهاء الوقت.",
  "Sikl — kunlik pomodoro maqsadingiz. Yetganingizda hisob yashil rangda ko'rinadi.": "الدورة — هدفك اليومي من البومودورو. وعند بلوغه يتحوّل العدّاد إلى الأخضر.",
  "Fokusdan chiqish (taymer davom etadi)": "الخروج من التركيز (المؤقّت يستمر)",
  "Taymer to'xtatilsinmi? (bu pomodoro hisobga kirmaydi)": "هل يُوقَف المؤقّت؟ (لن يُحتسب هذا البومودورو)",
  "Yangi pomodoroni o'zingiz boshlaysiz.": "ستبدأ البومودورو التالي بنفسك.",
  "Ish vaqti tugadi! Bu vaqtda nima qilganingizni belgilang.": "انتهى وقت العمل! حدّد ما فعلته في هذا الوقت.",
  "Bu vaqtda nima qilganingizni belgilang.": "حدّد ما فعلته في هذا الوقت.",
  "Bu vaqtda nima qildingiz? Tanlangan vazifaga": "ماذا فعلت في هذا الوقت؟ إلى المهمة المحددة",
  "bu vaqtda nima qildingiz?": "ماذا فعلت في هذا الوقت؟",
  "Qaysi vazifaga tegishli ekanini tanlang (yoki «Boshqa»).": "اختر المهمة التي ينتمي إليها (أو «أخرى»).",
  "Qancha vaqt sarflaganingizni kiriting.": "أدخل كم من الوقت أنفقت.",
  "Boshqa ish — vazifalarga yozilmasin": "عمل آخر — لا يُسجَّل لأي مهمة",
  "Nima ish qilganingizni yozing.": "اكتب ما الذي عملته.",
  "hisoblanadi — qismiy bajarilish beradi, ortiqchasi “ziyoda”ga o'tadi.": "يُحتسب — فيعطي إنجازًا جزئيًا، والفائض ينتقل إلى «الزيادة».",

  // --- Vazifa ---
  "Hali vazifa yo'q. Yuqoridagi tugma orqali qo'shing.": "لا توجد مهام بعد. أضِف واحدة بالزر أعلاه.",
  "Bugunga vazifa yo'q. Vazifalar ro'yxati orqali qo'shing.": "لا مهام لليوم. أضِفها من قائمة المهام.",
  "Bu kunga vazifa yo'q edi.": "لم تكن هناك مهام لهذا اليوم.",
  "Hali oliy maqsad vazifasi yo'q.": "لا توجد مهمة للمقصد الأعلى بعد.",
  "Vazifa nomi bo'yicha qidirish...": "البحث باسم المهمة...",
  "Bu hafta — oliy vazifalar": "هذا الأسبوع — المهام العليا",
  "Tugatilgan oliy vazifalar:": "المهام العليا المنجزة:",
  "Vaqti belgilanmagan vazifalar:": "المهام بلا وقت محدد:",
  "Har kuni takrorlanadigan ish": "عمل يتكرر كل يوم",
  "Katta maqsadga eltuvchi ish": "عمل يقود إلى هدف أكبر",
  "Tugash vaqti boshlanishdan keyin bo'lsin": "يجب أن يكون وقت الانتهاء بعد البداية",
  "Tugash vaqti boshlanishdan keyin bo'lishi kerak.": "يجب أن يكون وقت الانتهاء بعد وقت البداية.",
  "Tugash sanasi boshlanishdan keyin bo'lishi kerak.": "يجب أن يكون تاريخ الانتهاء بعد تاريخ البداية.",
  "Taxminan necha kunda tugataman?": "في كم يوم تقريبًا سأنهيه؟",
  "Sanaladigan vazifada muddat majburiy — qachongacha yetkazasiz?": "الموعد النهائي إلزامي في المهمة القابلة للعد — إلى متى ستنجزها؟",
  "Vazifaning kunlik vaqti {v} — undan KAM vaqt ajratib bo'lmaydi.": "الوقت اليومي للمهمة {v} — ولا يمكن تخصيص وقت أقل منه.",
  "Vazifa katakchasini bossangiz — belgilash oynasi ochiladi: qildim, sababli yoki qilmadim.": "اضغط مربّع المهمة فتُفتح نافذة التحديد: فعلتُ، بعذر، أو لم أفعل.",
  "Bu vazifani tugatdingizmi? Tabriklaymiz!": "هل أنهيت هذه المهمة؟ تهانينا!",
  "Vazifani tashlab qo'yasizmi? Bu statistikada salbiy iz qoldiradi.": "هل تترك هذه المهمة؟ سيترك ذلك أثرًا سلبيًا في الإحصائيات.",
  "Bu vazifa hali boshlanmagan. Butunlay o'chirilsinmi?": "لم تبدأ هذه المهمة بعد. هل تُحذف نهائيًا؟",
  "Arxivlansinmi? Tarixi saqlanadi, ro'yxatdan chiqadi.": "هل تُؤرشَف؟ يبقى سجلها وتخرج من القائمة.",
  "Ko'pi bilan 7 kun. Undan ortig'i — vazifani tashlab qo'yish hisoblanadi.": "٧ أيام على الأكثر. وما زاد على ذلك يُعدّ تركًا للمهمة.",
  "«{nom}» necha kunga to'xtatilsin? To'xtatilgan kunlar statistikaga kirmaydi.": "كم يومًا تُوقَف «{nom}»؟ الأيام الموقوفة لا تدخل في الإحصائيات.",
  "Papkani o'chirish uchun avval ichidagi vazifalarni boshqa joyga ko'chiring.": "لحذف المجلد انقل أولًا المهام التي بداخله إلى مكان آخر.",
  "Tartibni o'zgartiring — birinchi vazifa «Keyingi vazifa» kartasida chiqadi.": "غيّر الترتيب — تظهر المهمة الأولى في بطاقة «المهمة التالية».",
  "Vaqtlar faqat reja uchun - belgilashni kun davomida istalgan payt qilasiz.": "الأوقات للتخطيط فقط — ويمكنك التسجيل في أي وقت خلال اليوم.",
  "Vazifaga tegishli bo'lsa — o'sha vazifaga «ziyoda» qo'shiladi va statistikaga kiradi.": "إن كان يخص مهمة — تُضاف «زيادة» إلى تلك المهمة وتدخل في الإحصائيات.",
  "Rejadan ortiq ish qilsangiz — Bugun'dagi “Qo'shimcha ish” bo'limiga yozing. Vijdon — eng adolatli guvoh.": "إن عملت أكثر من المخطط فسجّله في قسم «عمل إضافي» في صفحة اليوم. والضمير أعدل شاهد.",
  "Masalan: qo'shimcha kitob o'qidim": "مثال: قرأتُ كتابًا إضافيًا",
  "«{nom}» - {k}-kun (reja: {r} kun). Shoshilmang, lekin rejani ham unutmang.": "«{nom}» — اليوم {k} (المخطط: {r} يومًا). لا تستعجل، ولا تغفل عن الخطة.",
  "«{nom}» vazifasini boshlaysiz.": "ستبدأ مهمة «{nom}».",
  "«{nom}» so'nggi 30 kunda {n} marta sababli qoldirildi. Balki og'irlik qilayotgandir? Yengillashtirishingiz mumkin.": "تُركت «{nom}» بعذر {n} مرة في آخر ٣٠ يومًا. ولعلها ثقيلة عليك؟ يمكنك تخفيفها.",
  "Sababli: {n} marta (joriy 30 kunlik: {m}/3)": "بعذر: {n} مرة (٣٠ يومًا الحالية: {m}/٣)",
  "Bu vaqt «{nom}» ({a}–{b}) bilan to'qnashadi.": "هذا الوقت يتعارض مع «{nom}» ({a}–{b}).",
  "Pomodoro orqali {v} hisoblangan.": "احتُسب {v} عبر البومودورو.",
  "Kunlik vaqti: {v}. Ortiqcha ajratilgan vaqt belgilashda “ziyoda”ga o'tadi.": "الوقت اليومي: {v}. والوقت الزائد المخصّص ينتقل إلى «الزيادة» عند التسجيل.",
  "(shu tur bir papka bo'ladi)": "(يصبح هذا النوع مجلدًا واحدًا)",
  "(shu vaqtda eslatma keladi)": "(يصل التذكير في هذا الوقت)",
  "yoki yangi tur yozing...": "أو اكتب نوعًا جديدًا...",

  // --- Maqsad ---
  "Oliy maqsadlaringizni belgilang": "حدّد مقاصدك العليا",
  "Oliy maqsadingizni yozing...": "اكتب مقصدك الأعلى...",
  "Hali oliy maqsad belgilanmagan": "لم يُحدَّد مقصد أعلى بعد",
  "Maqsadingizni iloji boricha aniq va batafsil yozing.": "اكتب هدفك بأدقّ وأوفى ما تستطيع.",
  "Maqsadni qayta shakllantirasizmi?": "هل تعيد صياغة الهدف؟",
  "Maqsadingizga umumiy qancha vaqtda yetishni niyat qilgansiz?": "في كم من الوقت تنوي بلوغ مقصدك؟",
  "Qachondan harakatga kirmoqchisiz?": "متى تريد أن تبدأ؟",
  "Masalan: 5 yil ichida kasbimda yetuk mutaxassis bo'lish va sog'lom turmush tarziga o'tish...": "مثال: أن أصير خبيرًا متمكّنًا في مهنتي خلال ٥ سنوات وأنتقل إلى نمط حياة صحي...",
  "Yillik raqamli maqsad — masalan 10 kitob": "هدف سنوي رقمي — مثلًا ١٠ كتب",
  "Yillik raqamli maqsadlar hali yo'q — bosib qo'shing": "لا أهداف سنوية رقمية بعد — اضغط لإضافتها",
  "Yil davomida nimani nechta qilmoqchisiz? Masalan «10 kitob», «100 dars».": "كم من ماذا تريد أن تنجز خلال السنة؟ مثلًا «١٠ كتب»، «١٠٠ درس».",
  "Yil davomida nimani nechta qilishni belgilang — masalan «yiliga 10 kitob», «100 dars». Bu raqamlar Maqsad bo'limidagi progressni yuritadi.": "حدّد كم من ماذا ستنجز خلال السنة — مثلًا «١٠ كتب في السنة»، «١٠٠ درس». هذه الأرقام تحرّك التقدّم في قسم الهدف.",
  "«{nom}» turidagi oliy vazifa tugatilganda hisob o'zi +1 bo'ladi.": "عند إنجاز مهمة عليا من نوع «{nom}» يزيد العدّاد ١ تلقائيًا.",
  "Bu maqsad qo'lda sanaladi — Bugun sahifasidagi «+1» tugmasi bilan.": "يُعدّ هذا الهدف يدويًا — بزر «+١» في صفحة اليوم.",
  "Bugun bo'limida «+1» tugmasi chiqadi — har safar o'zingiz bosasiz.": "يظهر زر «+١» في قسم اليوم — تضغطه بنفسك في كل مرة.",
  "Masalan: “100 ta dars” — kunlik normasiz, umumiy son bilan boriladigan ishlar. “+” bilan qo'shing.": "مثال: «١٠٠ درس» — أعمال تُتابَع بعدد إجمالي بلا حصة يومية. أضِفها بعلامة «+».",
  "Kunlik ulush qanday o'lchanadi?": "كيف تُقاس الحصة اليومية؟",
  "Yiliga nechta? (masalan 10)": "كم في السنة؟ (مثلًا ١٠)",
  "Shu tempda yil oxirida taxminan": "بهذه الوتيرة، بنهاية السنة سيكون نحو",
  "{n} yillik maqsadlaringiz uchun rejangizni tuzishga tayyormisiz?": "هل أنت مستعد لوضع خطتك لمقاصد {n} سنوات؟",

  // --- Kun, hafta, dam ---
  "Bugun dam kuni — halovat oling": "اليوم يوم راحة — خذ راحتك",
  "Dam kuni foizga kirmaydi — halovat kuni.": "يوم الراحة لا يدخل في النسبة — فهو يوم راحة.",
  "Haftalik dam olish kuningizni belgilang!": "حدّد يوم راحتك الأسبوعي!",
  "Hafta qaysi kundan boshlansin?": "من أي يوم يبدأ الأسبوع؟",
  "Haftalik statistika shu kundan hisoblanadi.": "تُحتسب الإحصائيات الأسبوعية من هذا اليوم.",
  "Yaxshi hordiq oling. Hafta yakunini ko'rib chiqing.": "استرِح جيدًا. وراجع ملخّص أسبوعك.",
  "Ajoyib — bugungi reja to'liq bajarildi": "ممتاز — أُنجزت خطة اليوم كاملة",
  "Barakalla, {nom}! Bugungi barcha ishlar bajarildi": "بارك الله فيك يا {nom}! أُنجزت كل أعمال اليوم",
  "Yarmidan oshdingiz — davom eting": "تجاوزت المنتصف — واصِل",
  "Yaxshi ketyapsiz, oz qoldi": "تسير بشكل جيد، بقي القليل",
  "Rejadan biroz ortdasiz — bugun bir oz ko'proq harakat qiling.": "أنت متأخر قليلًا عن الخطة — اجتهد اليوم أكثر قليلًا.",
  "Bugungi ishlaringizni tekshirib qo'ying.": "راجِع أعمال اليوم.",
  "Bugun qanday o'tdi? (bir jumla — Taqvimda saqlanadi)": "كيف مرّ يومك؟ (جملة واحدة — تُحفظ في التقويم)",
  "O'tgan kunlar o'zgartirilmaydi.": "لا يمكن تغيير الأيام الماضية.",
  "Oylik yakun oyning oxirgi dam kunida ochiladi.": "يُفتح ملخّص الشهر في آخر يوم راحة من الشهر.",
  "Sababingiz qanchalik o'rinli? (1 — bahona, 10 — chindan uzr)": "ما مدى وجاهة عذرك؟ (١ — حجة، ١٠ — عذر حقيقي)",
  "(ixtiyoriy — erta tugatsangiz reyting oshadi)": "(اختياري — الإنهاء المبكر يرفع التقييم)",
  "o'tgan hafta bilan bir xil": "مثل الأسبوع الماضي",
  "Bu hafta vaqt yozilmagan.": "لم يُسجَّل وقت هذا الأسبوع.",
  "Boshlanish sanasini belgilang.": "حدّد تاريخ البداية.",
  "Qaysi vaqt oralig'ida qilasiz?": "في أي فترة زمنية ستفعله؟",
  "Keyingi 7 kun davomida qayta o'zgartirib bo'lmaydi.": "لا يمكن تغييره مجددًا خلال الأيام الـ٧ القادمة.",
  "Quyidagilar keyin o'zgartirilmaydi:": "ما يلي لا يمكن تغييره لاحقًا:",

  // --- Ma'lumot va zaxira ---
  "Ma'lumotlaringiz telefon xotirasiga saqlanadi": "تُحفظ بياناتك في ذاكرة هاتفك",
  "Ma'lumot almashtirilsinmi?": "هل تُستبدل البيانات؟",
  "Ma'lumot hali yetarli emas": "البيانات غير كافية بعد",
  "Fayldagi ma'lumot ilovaga yuklanadi": "تُحمَّل بيانات الملف إلى التطبيق",
  "Hozirgi barcha ma'lumotlaringiz fayldagi bilan almashtiriladi. Bu amalni ortga qaytarib bo'lmaydi.": "ستُستبدل كل بياناتك الحالية ببيانات الملف. ولا يمكن التراجع عن هذا الإجراء.",
  "«O'rnatish» amaldagi ma'lumotni almashtiradi — ogohlantiriladi.": "«التثبيت» يستبدل البيانات الحالية — وسيُنبَّه قبل ذلك.",
  "Bu fayl Oliy Maqsad zaxirasi emas.": "هذا الملف ليس نسخة احتياطية للمقصد الأعلى.",
  "Fayl buzilgan yoki boshqa ilovaniki bo'lishi mumkin.": "قد يكون الملف تالفًا أو تابعًا لتطبيق آخر.",
  "Bu amalni ortga qaytarib bo'lmaydi. Rostdan ham hammasini o'chirasizmi?": "لا يمكن التراجع عن هذا الإجراء. هل تحذف كل شيء حقًا؟",
  "Kirish sahifasi qaytadan ochiladi, lekin barcha tarix — belgilashlar, vazifalar, xulosalar — saqlanadi.": "تُفتح صفحة البداية من جديد، لكن يبقى كل السجل — التحديدات والمهام والملاحظات.",
  "Zaxira nusxa olganingizga ancha bo'ldi - Sozlamalardan yuklab oling.": "مضى وقت طويل على آخر نسخة احتياطية — نزِّل واحدة من الإعدادات.",
  "Majburiy bo'lim - to'ldirish shart": "قسم إلزامي — يجب ملؤه",
  "Rejani tuzishni boshlaymiz.": "لنبدأ في وضع الخطة.",
  "Iltimos, ismingizni kiriting.": "من فضلك أدخل اسمك.",
  "Keyinroq davom ettiraman.": "سأكمل لاحقًا.",
  "Keyinroq sozlashim mumkin.": "يمكنني ضبطه لاحقًا.",

  // --- Yordam va kanal ---
  "Ilovaning har bo'limi haqida qisqa izoh": "شرح موجز لكل قسم من التطبيق",
  "Yangiliklar va yangilanishlar shu yerda": "الأخبار والتحديثات هنا",
  "Ro'yxat, qidiruv, arxiv, uyqu rejasi": "القائمة، البحث، الأرشيف، خطة النوم",
  "Quyidagi to'rt katakcha bosiladi — ibodat, uyqu, pomodoro va eslatmalar shu yerdan ochiladi.": "المربعات الأربعة أدناه قابلة للضغط — العبادة والنوم والبومودورو والتذكيرات تُفتح من هنا.",
  "Pastdagi + tugmasi orqali kundalik vazifa, oliy maqsad vazifasi va yillik maqsadlaringizni qo'shasiz.": "بزر + في الأسفل تضيف المهام اليومية ومهام المقصد الأعلى وأهدافك السنوية.",
  "tugmasi orqali kundalik yoki oliy maqsad vazifasini qo'shing.": "لإضافة مهمة يومية أو مهمة للمقصد الأعلى.",
  "Vazifa qo'shib, bir necha kun belgilab boring — natijalar, grafiklar va haftalik hisobot shu yerda ko'rinadi.": "أضِف مهمة وسجّلها بضعة أيام — ستظهر هنا النتائج والرسوم البيانية والتقرير الأسبوعي.",
  "«Oliy maqsad» telegram kanali": "قناة «المقصد الأعلى» على تيليجرام",
  "«Oliy maqsad» kanaliga o'tasizmi?": "هل تنتقل إلى قناة «المقصد الأعلى»؟",
  "Telegram ilovasi ochiladi.": "سيُفتح تطبيق تيليجرام.",
  "Masalan: yaxshi, unumli kun bo'ldi...": "مثال: كان يومًا طيبًا منتجًا...",
  "Masalan: Ingliz tili darsi": "مثال: درس اللغة الإنجليزية",
  "Masalan: mutolaa, sport...": "مثال: مطالعة، رياضة...",
  "Ilova tilini tanlang. Til istalgan vaqtda o'zgartirilishi mumkin.": "اختر لغة التطبيق. يمكنك تغييرها في أي وقت.",

  // --- Milodiy oylar ---
  "yanvar": "يناير", "fevral": "فبراير", "mart": "مارس", "aprel": "أبريل",
  "may": "مايو", "iyun": "يونيو", "iyul": "يوليو", "avgust": "أغسطس",
  "sentabr": "سبتمبر", "oktabr": "أكتوبر", "noyabr": "نوفمبر", "dekabr": "ديسمبر",

  // --- Hafta kunlari ---
  "Yakshanba": "الأحد", "Dushanba": "الاثنين", "Seshanba": "الثلاثاء",
  "Chorshanba": "الأربعاء", "Payshanba": "الخميس", "Juma": "الجمعة", "Shanba": "السبت",

  // --- Hijriy oylar (arabcha ASL nomlari) ---
  "muharram": "محرم", "safar": "صفر", "rabiul-avval": "ربيع الأول",
  "rabiul-oxir": "ربيع الآخر", "jumadul-avval": "جمادى الأولى", "jumadul-oxir": "جمادى الآخرة",
  "rajab": "رجب", "sha'bon": "شعبان", "ramazon": "رمضان",
  "shavvol": "شوال", "zulqa'da": "ذو القعدة", "zulhijja": "ذو الحجة",

  // --- Birinchi kirishdagi til so'rovi ---
  "Qaysi tilni tanlaysiz?": "بأي لغة تفضّل؟",
  "Til o'zgartirilganda ba'zi ma'lumotlar qayta yuklanishi mumkin.": "قد تُعاد بعض البيانات عند تغيير اللغة.",

  // --- Zikrlar ---
  "Tonggi zikrlar": "أذكار الصباح",
  "Kechki zikrlar": "أذكار المساء",
  "Uxlashdan oldingi zikrlar": "أذكار النوم",

  // --- Namoz nomlari (arabcha asli) ---
  "Bomdod": "الفجر", "Peshin": "الظهر", "Asr": "العصر",
  "Shom": "المغرب", "Xufton": "العشاء", "Vitr": "الوتر",
  "2 sunnat": "٢ سنة", "4 sunnat": "٤ سنة",
  "2 farz": "٢ فرض", "3 farz": "٣ فرض", "4 farz": "٤ فرض",
  "3 vitr": "٣ وتر",

  // --- Yordam bo'limi ---
  "Qo'shish (+)": "الإضافة (+)",
  "Vazifa vaqti": "وقت المهمة",
  "Zaxira": "النسخة الاحتياطية",
  "Kunning yuragi. Yuqorida bugungi natija, keyin vazifalaringiz. Katakchani bossangiz belgilash oynasi ochiladi: qildim, sababli qilmadim yoki umuman qilmadim.": "قلب اليوم. في الأعلى نتيجة اليوم، ثم مهامك. اضغط المربّع فتُفتح نافذة التحديد: فعلتُ، لم أفعل بعذر، أو لم أفعل مطلقًا.",
  "Pastdagi yashil tugma. Undan kundalik vazifa, oliy maqsad vazifasi, yillik maqsad qo'shasiz va barcha vazifalar ro'yxatini ochasiz.": "الزر الأخضر في الأسفل. منه تضيف مهمة يومية أو مهمة للمقصد الأعلى أو هدفًا سنويًا، وتفتح قائمة كل المهام.",
  "Har vazifaga vaqt oralig'i belgilanadi — masalan 08:00–09:00. O'sha vaqt kelganda telefonga eslatma keladi, ilova yopiq bo'lsa ham. Kunlarni ham tanlashingiz mumkin.": "لكل مهمة فترة زمنية — مثلًا ٠٨:٠٠–٠٩:٠٠. وعند حلول ذلك الوقت يصلك تذكير على الهاتف، ولو كان التطبيق مغلقًا. ويمكنك اختيار الأيام أيضًا.",
  "Rejadan ortiq ish qilsangiz shu yerga yozasiz. U tegishli vazifaga «ziyoda» bo'lib qo'shiladi va statistikada foizni 100% dan yuqoriga chiqaradi.": "سجّل هنا ما تعمله زيادة على الخطة. يُضاف إلى المهمة المعنية بوصفه «زيادة» ويرفع النسبة فوق ١٠٠٪ في الإحصائيات.",
  "Alohida bo'lim, kunlik foizga aralashmaydi. Zikrlar, besh vaqt namoz, nafllar va Qur'on xatmi shu yerda belgilanadi.": "قسم مستقل لا يؤثر على النسبة اليومية. هنا تُسجَّل الأذكار والصلوات الخمس والنوافل وختم القرآن.",
  "Ikki rejim bor. Fokusda ekran qorayadi va faqat taymer qoladi. Ochiq rejimda ilovadan chiqsangiz ham vaqt tugaganda xabar keladi.": "فيه وضعان. في وضع التركيز تُعتَّم الشاشة ولا يبقى إلا المؤقّت. وفي الوضع المفتوح يصلك إشعار عند انتهاء الوقت ولو خرجت من التطبيق.",
  "Har kun rangi natijaga qarab: to'liq bajarilgan kun yashil, yarmidan ko'pi sariq, past bo'lsa qizil. Dam kuni rangsiz — u hisobga kirmaydi.": "لون كل يوم بحسب نتيجته: اليوم المنجز كاملًا أخضر، وما فوق النصف أصفر، وما دون ذلك أحمر. ويوم الراحة بلا لون — فهو لا يدخل في الحساب.",
  "Kunlik, haftalik va oylik ko'rinish. Har raqam yonida o'tgan davrga nisbatan farqi turadi. Grafikdagi nuqtaga bossangiz qaysi kun ekani chiqadi.": "عرض يومي وأسبوعي وشهري. وبجانب كل رقم فرقه عن الفترة السابقة. واضغط نقطة في الرسم البياني ليظهر أي يوم هي.",
  "Maqsad matningiz, natija halqasi va yillik maqsadlaringiz. Har maqsadni bosib jarayonini ko'rasiz — hafta, oy, 6 oy va yil bo'yicha.": "نص هدفك، وحلقة النتيجة، وأهدافك السنوية. واضغط أي هدف لترى تقدّمه — بالأسبوع والشهر وستة أشهر والسنة.",
  "Sozlamalar → Ma'lumotlar. PDF yuklab olsangiz hamma ma'lumot shu faylda saqlanadi. Yangi telefonda «PDF o'rnatish» orqali tiklaysiz.": "الإعدادات ← البيانات. وعند تنزيل ملف PDF تُحفظ فيه كل بياناتك. وفي هاتف جديد تستعيدها بـ«التثبيت من PDF».",

  // --- Yangiliklar oynasi (v10) ---
  "10-yangilanish (v10)": "التحديث العاشر (v10)",
  "Ilova endi to'rt tilda: o'zbekcha lotin, o'zbekcha kirill, ingliz va arab tillari. Sozlamalar → Ilova tili.": "صار التطبيق بأربع لغات: الأوزبكية اللاتينية، والأوزبكية السيريلية، والإنجليزية، والعربية. الإعدادات ← لغة التطبيق.",
  "Til birinchi kirishda so'raladi. Xohlasangiz tanlamasdan yopib ketasiz — keyin Sozlamalardan o'zgartirasiz.": "تُسأل عن اللغة عند أول تشغيل. ويمكنك إغلاقها دون اختيار — ثم تغيّرها لاحقًا من الإعدادات.",
  "Arabcha tanlansa ilova butunlay o'ngdan chapga aylanadi, raqamlar ham arabcha ko'rinadi.": "عند اختيار العربية ينقلب التطبيق كله من اليمين إلى اليسار، وتظهر الأرقام عربية أيضًا.",
  "Oy, kun va hijriy oy nomlari ham tanlangan tilda chiqadi.": "وتظهر أسماء الأشهر والأيام والأشهر الهجرية باللغة المختارة أيضًا.",
  "Ilova nomi har tilda o'zgaradi — telefondagi belgi ostida ham.": "ويتغيّر اسم التطبيق مع اللغة — حتى تحت الأيقونة في هاتفك.",
  "Bugun bo'limidagi oyat kartasi yangi ko'rinishda. Arabcha tanlansa faqat oyatning o'zi qoladi.": "بطاقة الآية في قسم اليوم بحُلّة جديدة. وعند اختيار العربية لا يبقى إلا نص الآية.",
  "Til tanlash ro'yxati ixchamlashdi — kamroq joy egallaydi.": "صارت قائمة اللغات أكثر إيجازًا — وتشغل مساحة أقل.",
  "Shrift sozlamasidagi xato tuzatildi (ilova o'z shriftini yo'qotayotgan edi).": "أُصلح خلل في إعداد الخط (كان التطبيق يفقد خطه الخاص).",
  "Kirill rejimida ba'zi jumlalar lotin bo'lib qolayotgan edi — hammasi tuzatildi.": "كانت بعض الجمل تبقى بالحروف اللاتينية في الوضع السيريلي — أُصلحت كلها.",

  // --- v11: qisqa hafta kunlari ---
  "Ya": "أحد", "Du": "إثن", "Se": "ثلا", "Ch": "أرب", "Pa": "خمس", "Ju": "جمع", "Sh": "سبت",

  // --- v11: qisqa oy nomlari ---
  "yan": "ينا", "fev": "فبر", "mar": "مار", "apr": "أبر",
  "iyn": "يون", "iyl": "يول", "avg": "أغس",
  "sen": "سبت", "okt": "أكت", "noy": "نوف", "dek": "ديس",

  // --- v11: onboarding xulosa qatori ---
  "Muddat": "المدة",
  "Boshlanish": "البداية",
  "Hafta boshi": "بداية الأسبوع",
  "yo'q": "لا يوجد",
  "{n} yil": "{n} سنة|{n} سنوات",
  "Shoshilmang — tayyor bo'lganingizda \"Ha\"ni tanlang. Eng muhimi — niyat.": "لا تستعجل — اختر «نعم» حين تكون مستعدًا. والأهم هو النية.",

  // --- v11: sozlamalar bo'limlarga ajratildi ---
  "Zaxira, qo'llanma, maqsadni qayta tuzish": "النسخ الاحتياطي، الدليل، إعادة بناء الهدف",
  "Ilovani ishlatish bo'yicha qo'llanma": "دليل استخدام التطبيق",
  "Maqsadni qayta shakllantirish": "إعادة صياغة الهدف",
  "Maqsadni qaytadan tuzish": "إعادة بناء الهدف من جديد",
  "Ushbu amal barcha ma'lumotlaringizni o'chiradi: vazifalar, belgilashlar, statistika. Ortga qaytarib bo'lmaydi.": "سيحذف هذا كل بياناتك: المهام والتحديدات والإحصائيات. ولا يمكن التراجع عنه.",
  "Ma'lumotlaringiz PDF shaklida yuklansinmi?": "هل تُنزَّل بياناتك بصيغة PDF؟",
  "O'chirishdan oldin zaxira saqlab qo'yish tavsiya etiladi.": "يُنصح بحفظ نسخة احتياطية قبل الحذف.",
  "Ha, yuklansin": "نعم، نزّلها",
  "Yangilanish sanasi": "تاريخ التحديث",

  // --- v11: hijriy oy boshidagi tuzatish taklifi ---
  "Yangi hijriy oy boshlandi. Sana to'g'ri ko'rsatilyaptimi? Kerak bo'lsa bir kunga suring.": "بدأ شهر هجري جديد. هل التاريخ معروض بشكل صحيح؟ حرّكه يومًا إن لزم.",
  "To'g'ri, davom etamiz": "صحيح، لنكمل",

  // --- v11: ixcham yig'iladigan kartalar ---
  "Kun xulosasi": "ملخّص اليوم",
  "Hali yozilmagan": "لم يُكتب بعد",

  // --- v11: yozilgan narsalarni tahrirlash ---
  "Xulosani tahrirlang...": "عدّل الملاحظة...",
  "Xulosa o'chirilsinmi?": "هل تُحذف هذه الملاحظة؟",
  "Qo'shimcha ish o'chirilsinmi?": "هل يُحذف هذا العمل الإضافي؟",

  // --- v11: birinchi yil izohi va qidiruv ---
  "Hozircha faqat birinchi yil vazifalarini belgilaysiz. Yil tugagach keyingi yilnikini qo'shasiz — o'tgan yil ma'lumotlari saqlanib qoladi ({n} yillik reja shunday boriladi).": "في الوقت الحالي تحدّد مهام السنة الأولى فقط. وعند انتهاء السنة تضيف مهام السنة التالية — وتبقى بيانات السنة الماضية محفوظة (هكذا تسير الخطة ذات {n} سنوات).",
  "Qidiruv natijalari ({n})": "نتائج البحث ({n})",
};

// Arabchani LUGAT ga qo'shamiz (kalitlar bir xil, faqat `ar` maydoni to'ldiriladi)
for (const k in LUGAT_AR) {
  if (!LUGAT[k]) LUGAT[k] = {};
  LUGAT[k].ar = LUGAT_AR[k];
}

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
  const keep: string[] = [];
  // 1) tf() o'rin egallagichlari ({n}, {nom}, {sana}...) O'GIRILMASLIGI SHART.
  //    Aks holda "{n}" -> "{н}" bo'lib qoladi va tf() uni topa olmaydi —
  //    ekranda qiymat o'rniga "{н}" ko'rinadi.
  let r = s.replace(/\{[A-Za-z0-9_]+\}/g, m => { keep.push(m); return "@@" + (keep.length - 1) + "@@"; });
  // 2) Lotin qisqartmalar (PDF, OK, JSON...) ham o'girilmaydi — vaqtincha chetga olinadi
  r = r.replace(/(^|[^A-Za-z])([A-Z]{2,6})(?![a-z])/g, (_m, p, ab) => { keep.push(ab); return p + "@@" + (keep.length - 1) + "@@"; });
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

// ---------- ARAB RAQAMLARI ----------
// Arab tilida g'arb raqamlari (0-9) o'rniga arab-hind raqamlari (٠-٩) ishlatiladi.
// `tr()` va `tf()` chiqishiga qo'llanadi — shu bilan sana, soat, foiz va
// hisoblar ham arabcha ko'rinadi. Qayta qo'llash zararsiz (٠-٩ [0-9] ga kirmaydi).
const AR_RAQAM = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
export function raqam(s: string | number): string {
  const t = String(s);
  return CUR === "ar" ? t.replace(/[0-9]/g, d => AR_RAQAM[+d]) : t;
}

// ---------- TARJIMA ----------
export function tr(s: string): string {
  if (!s || CUR === "uz") return s;
  const v = LUGAT[s] && LUGAT[s][CUR];
  // ATAYLAB BO'SH tarjima ham hisobga olinadi: o'zbekcha "ta", "dona" kabi sanoq
  // yuklamalari inglizchada umuman yozilmaydi ("5 ta" -> "5"). Shuning uchun
  // tekshiruv `if (v)` emas, `!== undefined` — aks holda bo'sh qiymat e'tiborsiz qolardi.
  // `raqam()` faqat arabchada ta'sir qiladi, boshqa tillarda matnni o'zgartirmaydi
  if (v !== undefined) return raqam(v);
  if (CUR === "uzk") return KIRIL_ISTISNO[s] || toKiril(s);
  return raqam(s);
}

// Ichida son/nom bo'lgan matnlar uchun:  tf("{n} kun qoldi", { n: 5 })
//
// KO'PLIK: o'zbekchada son qanday bo'lsa ham so'z o'zgarmaydi ("1 soat", "8 soat"),
// ingliz tilida esa farq qiladi ("1 hour", "8 hours"). Shuning uchun tarjimada
// "|" belgisi ishlatiladi — chapda birlik, o'ngda ko'plik:
//     "{n} soat": { en: "{n} hour|{n} hours" }
// Tanlov `vals` dagi BIRINCHI son bo'yicha. O'zbekcha va kirillda "|" bo'lmagani
// uchun bu qoida ularga umuman ta'sir qilmaydi.
export function tf(s: string, vals: Record<string, string | number>): string {
  let r = tr(s);
  if (r.indexOf("|") >= 0) {
    let n: number | null = null;
    for (const k in vals) { const v = vals[k]; if (typeof v === "number") { n = v; break; } }
    const shakl = r.split("|");
    r = (n === 1 ? shakl[0] : shakl[1]) ?? r;
  }
  for (const k in vals) r = r.split("{" + k + "}").join(String(vals[k]));
  // Qiymatlar qo'yilgandan KEYIN — shunda sana, soat va hisoblar ham arabcha chiqadi
  return raqam(r);
}
