// ================== TILLAR ==================
// Ilovaning barcha matnlari shu fayl orqali o'tadi.
// KALIT = o'zbekcha lotin matnning O'ZI. Tarjima topilmasa o'zbekchasi ko'rinadi —
// shuning uchun ilova hech qachon bo'sh yoki buzuq matn ko'rsatmaydi.

export type Lang = "uz" | "uzk" | "en" | "ar" | "ru";

// `nom` va `izoh` TARJIMA QILINMAYDI — ular ro'yxatda har doim O'Z TILIDA
// turishi kerak, aks holda odam o'z tilini tanimay qoladi.
export const TILLAR: { id: Lang; nom: string; izoh: string; belgi: string; rang: string; grad: string; holat: "tayyor" | "sinov" | "tez" }[] = [
  { id: "uz", nom: "O'zbek tili", izoh: "Lotin", belgi: "O'", rang: "#3B7BC4", grad: "linear-gradient(160deg,#4A8AD4,#1E4E86)", holat: "tayyor" },
  { id: "uzk", nom: "Ўзбек тили", izoh: "Кирилл", belgi: "ў", rang: "#C0453C", grad: "linear-gradient(160deg,#CF574C,#8E2C27)", holat: "tayyor" },
  { id: "en", nom: "English language", izoh: "Latin", belgi: "Aa", rang: "#D98A32", grad: "linear-gradient(160deg,#E2A03F,#B4611F)", holat: "tayyor" },
  { id: "ar", nom: "اللغة العربية", izoh: "الحروف العربية", belgi: "ض", rang: "#3E9E6E", grad: "linear-gradient(160deg,#46AC79,#26714E)", holat: "tayyor" },
  { id: "ru", nom: "Русский язык", izoh: "Кириллица", belgi: "Ру", rang: "#4E7F8E", grad: "linear-gradient(160deg,#5A8F9E,#2F5A66)", holat: "sinov" },
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
  "Bugun:": { en: "Today:" },
  "Qolgan vazifalar": { en: "Other tasks" },
  "pora": { en: "juz'" },
  "{n} pomodoro": { en: "{n} pomodoro|{n} pomodoros" },
  "{v} sof ish": { en: "{v} of focused work" },
  "Bugungi miqdor: {n} {b}": { en: "Today's amount: {n} {b}" },
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
  "Tugatish": { en: "Stop" },
  "to'xtatish": { en: "stop" },
  "To'xtatish": { en: "Pause" },
  "To'xtatilgan": { en: "Paused" },
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
  "Diqqatni jamlash": { en: "Focus mode" },
  "Boshlashga tayyor": { en: "Ready to start" },
  "Ochiq rejim": { en: "Open mode" },
  "Ish vaqti": { en: "Work time" },
  "Ish:": { en: "Work:" },
  "Dam olish": { en: "Rest" },
  "Dam kuni": { en: "Rest day" },
  "Dam olishsiz": { en: "No rest day" },
  "Dam tugadi": { en: "Rest over" },
  "daq · Dam:": { en: "min · Rest:" },

  // --- O'lchov va sanoq ---
  "O'lchov": { en: "Metric" },
  // Vazifa kartasida `truncate` qutisida turadi — uzun matn uch nuqta bilan kesiladi
  "Turi yo'q": { en: "No type" },
  "Vazifa turi:": { en: "Type:" },
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
  "Qo'shimcha": { en: "Extra" },
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
  "Rejaga ko'ra uyqu": { en: "Slept as planned" },
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
  "Kunlik vaqti: {v}. Ortiqcha ajratilgan vaqt belgilashda «qo'shimcha»ga o'tadi.": { en: "Daily time: {v}. Any extra time you log counts as “extra”." },
  "«{nom}» — {k}-kun (reja: {r} kun). Shoshilmang, lekin rejani ham unutmang.": { en: "«{nom}» — day {k} (plan: {r} days). Take your time, but do not lose sight of the plan." },
  "«{nom}» so'nggi 30 kunda {n} marta sababli qoldirildi. Balki og'irlik qilayotgandir? Yengillashtirishingiz mumkin.": { en: "«{nom}» was excused {n} times in the last 30 days. Perhaps it is too demanding? You can lighten it." },

  // ===== 3-BOSQICH: qisqa iboralar =====

  // --- Ibodat ---
  "Oli Imron surasi · 200-oyat": { en: "Surah Al-Imran · verse 200" },
  "Nafl namozlar (bonus)": { en: "Nafl prayers (bonus)" },
  "Kunduzgi nafl": { en: "Daytime nafl" },
  "Qur'on xatmini rejalash": { en: "Plan a Qur'an khatm" },
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
  "Kundalik reja": { en: "Daily plan" },
  "Kundalik vazifalar": { en: "Daily tasks" },
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
  "Rejadan tashqari amal": { en: "Unplanned task" },
  "Rejadan tashqari amallar": { en: "Unplanned tasks" },
  "REJADAN TASHQARI AMALLAR": { en: "EXTRA TASKS" },
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
  "Shunday davom etsangiz, yil oxirida taxminan": { en: "At this pace, by year end there will be about" },
  "ta bo'ladi (maqsad —": { en: "(goal —" },

  // --- Vaqt va reja ---
  "Vaqt bilan (daqiqa)": { en: "With time (minutes)" },
  "Vaqt oralig'i": { en: "Time range" },
  "Aniq vaqt oralig'i bilan": { en: "With an exact time range" },
  "Qaysi vaqt oralig'ida qilasiz?": { en: "In which time range will you do it?" },
  "Kunlik soat bilan": { en: "By daily hours" },
  "Kuniga necha daqiqa?": { en: "How many minutes per day?" },
  "Qancha vaqtda?": { en: "In how much time?" },
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
  "Rejaga muvofiq": { en: "As planned" },
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
  "Uxlash va turish vaqti": { en: "Bedtime and wake-up time" },
  "Uyqu rejasi o'chirilsinmi?": { en: "Delete the sleep schedule?" },
  "Hali uyqu yozuvi yo'q.": { en: "No sleep entries yet." },
  "Bu hafta uyqu yozilmagan.": { en: "No sleep logged this week." },
  "Sifatli uyqu uchun maslahatlar": { en: "Tips for better sleep" },
  "yana uxladingizmi? soat": { en: "slept more? hours" },

  // --- Pomodoro ---
  "Pomodoro — rejim tanlang": { en: "Pomodoro — choose a mode" },
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
  "Kunlik miqdorni kiriting!": { en: "Enter the daily amount!" },

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
  "Masalan: Qur'on o'qish, sport...": { en: "For example: reading, sport..." },
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
  "Erkaklarda har namozda «masjidda o'qidim» tugmasi bo'ladi — reytingda balandroq baholanadi.": { en: "For men, each prayer has an “I prayed at the mosque” button — it is rated higher." },
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
  "Taymer to'xtatilsinmi? (bu pomodoro hisobga kirmaydi)": { en: "Stop the timer? (this pomodoro will not be counted)" },
  "Yangi pomodoroni o'zingiz boshlaysiz.": { en: "You start the next pomodoro yourself." },
  "Ish vaqti tugadi! Bu vaqtda nima qilganingizni belgilang.": { en: "Work time is over! Mark what you did during this time." },
  "Bu vaqtda nima qilganingizni belgilang.": { en: "Mark what you did during this time." },
  "Bu vaqtda nima qildingiz? Tanlangan vazifaga": { en: "What did you do in this time? To the selected task" },
  "Qaysi vazifaga tegishli ekanini tanlang (yoki «Boshqa»).": { en: "Choose which task it belongs to (or «Other»)." },
  "Qancha vaqt sarflaganingizni kiriting.": { en: "Enter how much time you spent." },
  "Boshqa ish — vazifalarga yozilmasin": { en: "Other work — do not log it to any task" },
  "hisoblanadi — qismiy bajarilish beradi, ortiqchasi «qo'shimcha»ga o'tadi.": { en: "is counted — it gives partial completion, and the surplus goes to “extra”." },

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
  "Bu vazifani tugatdingizmi? Tabriklaymiz!": { en: "Have you finished this task? Congratulations!" },
  "Vazifani tashlab qo'yasizmi? Bu statistikada salbiy iz qoldiradi.": { en: "Abandon this task? It will leave a negative mark in your statistics." },
  "Bu vazifa hali boshlanmagan. Butunlay o'chirilsinmi?": { en: "This task has not started yet. Delete it completely?" },
  "Arxivlansinmi? Tarixi saqlanadi, ro'yxatdan chiqadi.": { en: "Archive it? Its history is kept, and it leaves the list." },
  "Ko'pi bilan 7 kun. Undan ortig'i — vazifani tashlab qo'yish hisoblanadi.": { en: "7 days at most. Anything longer counts as abandoning the task." },
  "Tartibni o'zgartiring — birinchi vazifa «Keyingi vazifa» kartasida chiqadi.": { en: "Change the order — the first task appears on the «Next task» card." },
  "Vaqtlar faqat reja uchun — belgilashni kun davomida istalgan payt qilasiz.": { en: "Times are only a plan — you can mark them at any point during the day." },
  "Vazifaga tegishli bo'lsa — o'sha vazifaga «qo'shimcha» qo'shiladi va statistikaga kiradi.": { en: "If it belongs to a task, «extra» is added to that task and counted in the statistics." },
  "Rejadan ortiq ish qilsangiz — Bugun bo'limidagi «Rejadan tashqari amallar» bo'limiga yozing. Vijdon — eng adolatli guvoh.": { en: "If you do more than planned, log it in the “Extra work” section on Today. Your conscience is the fairest witness." },
  "Masalan: qo'shimcha kitob o'qidim": { en: "For example: I read an extra book" },

  // --- Oliy maqsad va yillik maqsadlar ---
  "Oliy maqsadlaringizni belgilang": { en: "Set your ultimate goals" },
  "Maqsadingizni iloji boricha aniq va batafsil yozing.": { en: "Write your goal as precisely and fully as you can." },
  "Rejani qaytadan tuzasizmi?": { en: "Rebuild the plan?" },
  "Maqsadingizga umumiy qancha vaqtda yetishni niyat qilgansiz?": { en: "In how much time do you intend to reach your goal?" },
  "Qachondan boshlaysiz?": { en: "When do you want to begin?" },
  "Masalan: 5 yil ichida kasbimda yetuk mutaxassis bo'lish va sog'lom turmush tarziga o'tish...": { en: "For example: becoming an expert in my field within 5 years and moving to a healthy lifestyle..." },
  "Yillik raqamli maqsad — masalan 10 kitob": { en: "A yearly numeric goal — for example 10 books" },
  "Yillik raqamli maqsadlar hali yo'q — bosib qo'shing": { en: "No yearly numeric goals yet — tap to add one" },
  "Yil davomida nimani nechta qilmoqchisiz? Masalan «10 kitob», «100 dars».": { en: "How many of what do you want to do this year? For example «10 books», «100 lessons»." },
  "Yil davomida nimani nechta qilishni belgilang — masalan «yiliga 10 kitob», «100 dars». Bu raqamlar Maqsad bo'limidagi natijani yuritadi.": { en: "Set how many of what you will do this year — for example «10 books a year», «100 lessons». These numbers drive the progress in the Goal section." },
  "«{nom}» turidagi oliy vazifa tugatilganda hisob o'zi +1 bo'ladi.": { en: "When an ultimate task of type «{nom}» is completed, the count increases by 1 automatically." },
  "Bu maqsad qo'lda sanaladi — Bugun sahifasidagi «+1» tugmasi bilan.": { en: "This goal is counted manually — with the «+1» button on the Today page." },
  "Bugun bo'limida «+1» tugmasi chiqadi — har safar o'zingiz bosasiz.": { en: "A «+1» button appears in the Today section — you tap it each time." },
  "Kunlik miqdor qanday o'lchanadi?": { en: "How is the daily amount measured?" },

  // --- Kun, hafta, dam ---
  "Bugun dam oling! Yaxshi dam — mehnatga hamdam": { en: "Today is a rest day — take your ease" },
  "Dam kuni foizga kirmaydi — bemalol dam oling.": { en: "The rest day is excluded from the percentage — it is a day of ease." },
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
  "Zaxira nusxa olganingizga ancha bo'ldi — Sozlamalardan yuklab oling.": { en: "It has been a while since your last backup — download one from Settings." },
  "Fayldagi ma'lumot ilovaga yuklanadi": { en: "The data in the file will be loaded into the app" },
  "Hozirgi barcha ma'lumotlaringiz fayldagi bilan almashtiriladi. Bu amalni ortga qaytarib bo'lmaydi.": { en: "All your current data will be replaced with the file's. This action cannot be undone." },
  "«O'rnatish» amaldagi ma'lumotni almashtiradi — ogohlantiriladi.": { en: "«Install» replaces the current data — you will be warned first." },
  "Bu fayl Oliy Maqsad zaxirasi emas.": { en: "This file is not an Ultimate goal backup." },
  "Fayl buzilgan yoki boshqa ilovaniki bo'lishi mumkin.": { en: "The file may be corrupted or belong to another app." },
  "Bu amalni ortga qaytarib bo'lmaydi. Rostdan ham hammasini o'chirasizmi?": { en: "This action cannot be undone. Do you really want to delete everything?" },
  "Kirish sahifasi qaytadan ochiladi, lekin barcha tarix — belgilashlar, vazifalar, xulosalar — saqlanadi.": { en: "The welcome page opens again, but all history — marks, tasks and notes — is kept." },
  "Quyidagilar keyin o'zgartirilmaydi:": { en: "The following cannot be changed later:" },
  "Keyingi 7 kun davomida qayta o'zgartirib bo'lmaydi.": { en: "It cannot be changed again for the next 7 days." },
  "Majburiy bo'lim — to'ldirish shart!": { en: "Required section — must be filled in" },
  "Ma'lumot hali yetarli emas": { en: "Not enough data yet" },

  // --- Yordam, yangiliklar, kanal ---
  "tugmasi orqali kundalik yoki oliy maqsad vazifasini qo'shing.": { en: "button to add a daily task or an ultimate goal task." },
  "Vazifa qo'shib, bir necha kun belgilab boring — natijalar, grafiklar va haftalik hisobot shu yerda ko'rinadi.": { en: "Add a task and mark it for a few days — results, charts and the weekly report will appear here." },
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

  // --- Yangiliklar oynasi (v10) ---

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
  "Hafta boshi": { en: "Week starts" },
  "yo'q": { en: "none" },
  "{n} yil": { en: "{n} year|{n} years" },
  "Shoshilmang — tayyor bo'lganingizda \"Ha\"ni tanlang. Eng muhimi — niyat.": { en: "Take your time — choose \"Yes\" when you are ready. Intention matters most." },

  // --- v11: sozlamalar bo'limlarga ajratildi ---
  "Zaxira, qo'llanma, maqsadni qayta tuzish": { en: "Backup, guide, rebuilding the goal" },
  "Ilovani ishlatish bo'yicha qo'llanma": { en: "How to use the app" },
  "Rejani qaytadan tuzish": { en: "Rebuild the plan" },
  "Hammasini o'chirib, boshidan boshlash": { en: "Delete everything and start over" },
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

  // --- v11: yozilgan narsalarni tahrirlash ---
  "Xulosani tahrirlang...": { en: "Edit the note..." },
  "Xulosa o'chirilsinmi?": { en: "Delete this note?" },
  "Rejadan tashqari amal o'chirilsinmi?": { en: "Delete this extra work entry?" },

  // --- v11: birinchi yil izohi va qidiruv ---
  "Hozircha faqat birinchi yil vazifalarini belgilaysiz. Yil tugagach keyingi yilnikini qo'shasiz — o'tgan yil ma'lumotlari saqlanib qoladi ({n} yillik reja shunday boriladi).": { en: "For now you set only the first year's tasks. When the year ends you add the next year's — the past year's data is kept ({n}-year plans work this way)." },
  "Qidiruv natijalari ({n})": { en: "Search results ({n})" },

  // ===== v11: TANISHTIRUV TURI =====
  // Qadam matnlari TUR_QISQA/TUR_TOLIQ massivlarida — `tr()` ular
  // ISHLATILGAN JOYDA qo'llanadi, shu sababli kalitlar shu yerda.
  "Ilova bilan tanishib chiqasizmi?": { en: "Would you like a quick tour?" },
  "Asosiy bo'limlarni qisqacha ko'rsataman — bir daqiqa vaqt oladi. Keyinroq Sozlamalar → Ma'lumotlar dan qayta ochishingiz mumkin.": { en: "I will show you the main sections briefly — it takes about a minute. You can reopen it later from Settings → Data." },
  "Ha, ko'rsating": { en: "Yes, show me" },
  "O'tkazib yuborish": { en: "Skip" },
  "Keyingisi": { en: "Next" },

  // --- Qadam sarlavhalari ---
  "Maqsad bo'limi": { en: "The Goal section" },
  "Qo'shish tugmasi": { en: "The add button" },
  "Bugun sahifasi": { en: "The Today page" },

  // --- Qisqa to'plam ---
  "Bu ilova bir narsaga xizmat qiladi: katta maqsadingizni har kungi kichik ishlarga bo'lib berish va ularni halol hisobda yuritish. Keling, asosiy joylarni ko'rsataman.": { en: "This app serves one purpose: breaking your big goal into small daily actions and keeping an honest account of them. Let me show you the main places." },
  "Avval shu yerda oliy maqsadingizni yozasiz — nimaga erishmoqchisiz va necha yilda. Yillik raqamli maqsadlar ham shu yerda turadi.": { en: "First you write your ultimate goal here — what you want to reach and in how many years. Your yearly numeric goals live here too." },
  "Maqsadga eltuvchi vazifalarni shu tugma orqali qo'shasiz. Kundalik vazifa ham, oliy maqsad vazifasi ham shu yerdan.": { en: "You add the tasks that lead to your goal with this button — both daily tasks and ultimate goal tasks." },
  "Zikr, besh vaqt namoz, nafllar va Qur'on xatmi shu yerda belgilanadi. Alohida hisoblanadi — kundalik foizga aralashmaydi.": { en: "Dhikr, the five daily prayers, nafl prayers and the Qur'an khatm are marked here. Counted separately — it does not affect the daily percentage." },
  "Diqqatni bir joyga jamlab ishlash uchun taymer. Ishlagan vaqtingiz tegishli vazifaga o'zi yozib boriladi.": { en: "A timer for focused work. The time you put in is logged to the related task automatically." },
  "Kunning yuragi shu yerda. Har kuni vazifalarni belgilab borasiz — qildim, sababli qilmadim yoki umuman qilmadim.": { en: "The heart of the day is here. Each day you mark your tasks — done, excused, or not done at all." },

  // --- To'liq to'plam (Sozlamalardan ochilganda) ---
  "Ilovaning maqsadi — uzoq yo'lni har kungi kichik qadamlarga bo'lish. Siz maqsad qo'yasiz, unga olib boradigan vazifalarni belgilaysiz, ilova esa bajarganingizni halol hisobda yuritadi. Vijdon — eng adolatli guvoh.": { en: "The app exists to break a long road into small daily steps. You set a goal, define the tasks leading to it, and the app keeps an honest account of what you do. Your conscience is the fairest witness." },
  "Oliy maqsadingiz matni, natija halqasi va yillik raqamli maqsadlaringiz shu yerda. Har maqsadni bosib jarayonini ko'rasiz — hafta, oy, olti oy va yil bo'yicha. Ko'p yillik rejada har yil alohida yuritiladi: yil tugagach keyingi yil vazifalarini qo'shasiz, eskisi saqlanib qoladi.": { en: "Your goal text, the result ring and your yearly numeric goals are here. Tap any goal to see its progress — by week, month, six months and year. In a multi-year plan each year is kept separately: when a year ends you add the next year's tasks, and the old ones remain." },
  "Uch xil narsa qo'shiladi: har kuni takrorlanadigan kundalik vazifa, katta maqsadga eltuvchi oliy vazifa, va yillik raqamli maqsad. Har vazifaga vaqt oralig'i berilsa, o'sha payt telefonga eslatma keladi — ilova yopiq bo'lsa ham.": { en: "Three things can be added: a daily task that repeats every day, an ultimate task leading to the bigger goal, and a yearly numeric goal. If a task has a time range, a reminder arrives on your phone at that time — even if the app is closed." },
  "Zikrlar, besh vaqt namoz, nafl namozlar va Qur'on xatmi. Bu bo'lim kundalik vazifalar foiziga aralashmaydi, alohida hisoblanadi. Masjidda o'qilgan namoz va nafllar reytingni oshiradi.": { en: "Dhikr, the five daily prayers, nafl prayers and the Qur'an khatm. This section does not affect the daily task percentage — it is counted separately. Prayers at the mosque and nafl prayers raise your rating." },
  "Ikki rejim bor. Fokusda ekran qorayadi va faqat taymer qoladi. Ochiq rejimda ilovadan chiqib ketsangiz ham vaqt tugaganda telefon xabar beradi. Ishlagan daqiqalaringiz tanlagan vazifangizga qo'shiladi.": { en: "There are two modes. In Focus the screen dims and only the timer remains. In Open mode your phone notifies you when the time is up, even if you leave the app. The minutes you work are added to the task you choose." },
  "Har kuni shu yerdan boshlaysiz. Vazifa katakchasini bosganingizda belgilash oynasi ochiladi. Rejadan ortiq ish qilsangiz «Rejadan tashqari amallar» bo'limiga yozasiz — u tegishli vazifaga «qo'shimcha» bo'lib qo'shiladi.": { en: "You start here every day. Tapping a task box opens the marking window. If you do more than planned, log it under «Extra work» — it is added to the related task as extra." },

  // --- Yangiliklar oynasi (v11) ---
  "Ish vaqti tugagach \"bu vaqtda nima qildingiz?\" deb so'raydi va tanlangan vazifaga daqiqa yozadi.": { en: "When the work time ends it asks \"what did you do in this time?\" and logs the minutes to the chosen task." },

  // --- v12: dumaloq tugmalar ---
  "Rejadan ortiq ish qilsangiz shu yerga yozasiz. U tegishli vazifaga «ziyoda» bo'lib qo'shiladi va statistikada foizni 100% dan yuqoriga chiqaradi.": { en: "Log here anything you do beyond the plan. It is added to the related task as «extra» and pushes your percentage above 100% in the statistics." },

  // --- v12: kirishdagi yangi/zaxira tanlovi ---
  "Yangi boshlayman": { en: "I am starting fresh" },

  // --- v12: vazifani bosib turib tahrirlash ---
  "Tahrirlash": { en: "Edit" },
  "Nomi, vaqti, kunlari va turi": { en: "Name, time, days and type" },
  "Tarixi bo'lsa arxivga tushadi": { en: "If it has history it goes to the archive" },
  "yoki mavjudlarini boshqaring": { en: "or manage existing ones" },
  "Ko'rish, tahrirlash, papkalarga ajratish, arxiv": { en: "View, edit, sort into folders, archive" },

  // --- v12: namoz ixcham qatori ---
  "masjidda o'qildi": { en: "prayed in the mosque" },

  // --- v12: ma'lumotnoma qayta yozildi ---
  "Xatm rejasini tahrirlash": { en: "Edit khatm plan" },
  "Har bo'lim nima qiladi?": { en: "What does each section do?" },
  "Bo'limlar va tugmalar batafsil izohlangan — o'qib chiqiladi": { en: "Sections and buttons explained in detail — for reading" },
  "Ilova bo'ylab qadam-baqadam yuriladi — ko'rsatib boriladi": { en: "A step-by-step walk through the app, each place shown to you" },
  "Oy": { en: "Month" },
  "6 oy": { en: "6 months" },
  "Vazifani belgilash": { en: "Marking a task" },
  "Vazifa vaqti va eslatma": { en: "Task time and reminder" },
  "Papkalar": { en: "Folders" },
  "Zaxira nusxa": { en: "Backup" },
  "Kunduzgi va tungi ko'rinish": { en: "Light and dark appearance" },
  "Kunning yuragi. Eng yuqorida bugungi natija halqasi — nechta vazifa bajarilgani va foizi. Ostida bugun bajariladigan vazifalar. Vaqt belgilangan vazifalar soat tartibida chiqadi.": { en: "The heart of the day. At the very top is today's result ring — how many tasks are done and the percentage. Below it are the tasks due today. Tasks with a set time appear in clock order." },
  "Vazifa katakchasini bosing — pastdan belgilash oynasi chiqadi. Uch javob bor: «qildim», «sababli qilmadim» (kasallik, safar kabi — bu statistikani pasaytirmaydi) va «qilmadim». Katakchani bir soniya bosib tursangiz tahrirlash va o'chirish tugmalari chiqadi.": { en: "Tap a task cell — the marking sheet slides up from below. There are three answers: «done», «missed with an excuse» (illness, travel and the like — this does not lower your statistics) and «not done». Hold the cell for about a second and Edit and Delete buttons appear." },
  "Pastdagi katta yashil tugma. Undan uch narsa qo'shiladi: har kuni takrorlanadigan kundalik vazifa, katta maqsadga eltuvchi oliy vazifa va yillik raqamli maqsad. Eng pastdagi «Barcha vazifalar» esa qo'shish uchun emas — bor vazifalarni ko'rish va boshqarish uchun.": { en: "The large green button at the bottom. Three things are added from it: a daily task that repeats every day, a great-goal task that leads to your big aim, and a yearly numeric goal. The «All tasks» row at the very bottom is not for adding — it is for viewing and managing what already exists." },
  "Har vazifaga vaqt oralig'i beriladi — masalan 08:00–09:00. O'sha vaqt kelganda telefonga eslatma keladi, ilova yopiq bo'lsa ham. Vazifa haftaning qaysi kunlari bajarilishini ham tanlaysiz.": { en: "Each task can be given a time range — for example 08:00–09:00. When that time comes a reminder arrives on your phone, even if the app is closed. You also choose which days of the week the task runs." },
  "Vazifalar ko'payib ketganda ularni papkalarga ajratasiz — masalan «Ilm», «Sog'liq», «Ish». Papkalar «Barcha vazifalar» bo'limida yaratiladi va vazifa ro'yxati shunga qarab guruhlanadi.": { en: "When tasks grow numerous you sort them into folders — for example «Knowledge», «Health», «Work». Folders are created in the «All tasks» section and the task list is grouped by them." },
  "Rejadan ortiq ish qilgan kuningiz shu yerga yozasiz. U tegishli vazifaga «ziyoda» bo'lib qo'shiladi va statistikada foizni 100% dan yuqoriga chiqaradi.": { en: "On a day you do more than planned, you record it here. It is added to the related task as «extra» and pushes your percentage above 100% in the statistics." },
  "Miqdori sanaladigan ishlar uchun: necha bet o'qildi, necha marta zikr aytildi, necha kilometr yurildi. Har kuni raqam kiritasiz, to'plangan miqdor va jarayon alohida ko'rinadi.": { en: "For work measured by amount: how many pages read, how many times a dhikr was said, how many kilometres walked. You enter a number each day, and the accumulated amount and progress are shown separately." },
  "Alohida bo'lim — kunlik vazifalar foiziga aralashmaydi. Tonggi va kechki zikrlar, besh vaqt namoz (har biri sunnat va farzga ajratilgan), tahajjud va kunduzgi nafllar shu yerda belgilanadi. Erkaklarda har namoz yonida «Masjidda» tugmasi bor — u reytingga bonus qo'shadi.": { en: "A separate section — it does not affect the daily task percentage. Morning and evening dhikr, the five daily prayers (each split into sunnah and fard), tahajjud and daytime nafl are marked here. For men there is an «In the mosque» button beside each prayer — it adds a bonus to the rating." },
  "Xatmni oldindan rejalashtirasiz: qachondan qachongacha va kuniga necha daqiqa yoki necha pora. Har kuni bajarganingizni belgilab borasiz, necha kun o'tgani yonida ko'rinib turadi. Rejani o'zgartirish uchun qatorni bosib turing.": { en: "You plan the khatm in advance: from when to when, and how many minutes or juz' per day. Each day you mark what you have completed, and the number of days passed is shown beside it. To change the plan, hold the row." },
  "Sarlavhadagi karavot tugmasi. Necha soat uxlashni yoki aniq vaqt oralig'ini belgilaysiz, so'ng har kuni qancha uxlaganingizni yozib borasiz. Haftalik o'rtacha va rejadan chetlashish ko'rsatiladi.": { en: "The bed button in the header. You set how many hours to sleep or an exact time range, then record how much you slept each day. The weekly average and the deviation from your plan are shown." },
  "Diqqatni jamlab ishlash taymeri. Ikki rejim bor: «Diqqatni jamlash»da ekran qorayadi va faqat taymer qoladi; «Ochiq rejim»da ilovadan chiqsangiz ham vaqt tugaganda telefon xabar beradi. Ishlagan daqiqalaringiz tanlagan vazifangizga qo'shiladi.": { en: "A timer for focused work. There are two modes: in «Focus» the screen goes dark and only the timer remains; in «Open mode» you may leave the app and the phone still notifies you when the time is up. The minutes you worked are added to the task you choose." },
  "Har kun o'sha kungi natijaga qarab bo'yaladi: to'liq bajarilgan kun yashil, yarmidan ko'pi sariq, past bo'lsa qizil. Dam kuni rangsiz — u hisobga kirmaydi. Kunni bossangiz o'sha kunning to'liq tafsiloti ochiladi.": { en: "Each day is coloured by that day's result: a fully completed day is green, more than half is yellow, and lower is red. The rest day has no colour — it is not counted. Tap a day to open its full details." },
  "Kunlik, haftalik va oylik ko'rinish. Har raqam yonida o'tgan davrga nisbatan farqi turadi — o'sdimi yoki tushdimi. Grafikdagi nuqtaga bossangiz qaysi kun ekani chiqadi.": { en: "Daily, weekly and monthly views. Beside each number is its difference from the previous period — whether it rose or fell. Tap a point on the chart to see which day it is." },
  "Maqsad matningiz, umumiy natija halqasi va yillik raqamli maqsadlaringiz. Har maqsadni bosib jarayonini ko'rasiz — hafta, oy, olti oy va yil bo'yicha. Ko'p yillik rejada har yil alohida yuritiladi: yil tugagach keyingi yil vazifalarini qo'shasiz.": { en: "The text of your goal, the overall result ring and your yearly numeric goals. Tap any goal to see its progress — by week, month, six months and year. In a multi-year plan each year is kept separately: when a year ends you add the next year's tasks." },
  "Reja tuzayotganda haftaning bir kunini dam kuni qilib belgilashingiz mumkin. O'sha kuni vazifalar so'ralmaydi va u statistikaga kirmaydi — foizingizni pasaytirmaydi.": { en: "While setting up your plan you may mark one day of the week as a rest day. On that day no tasks are asked of you and it does not enter the statistics — it will not lower your percentage." },
  "Sozlamalar → Ma'lumotlar. «PDF yuklab olish» bosilsa hamma ma'lumotingiz bitta faylga saqlanadi. Yangi telefonga o'tsangiz «PDF o'rnatish» orqali hammasini tiklaysiz. Ma'lumot faqat telefoningizda turadi — hech qayerga yuborilmaydi.": { en: "Settings → Data. Tap «Download PDF» and all your data is saved into a single file. When you move to a new phone you restore everything through «Install PDF». Your data stays only on your phone — it is never sent anywhere." },
  "Beshta til bor: o'zbekcha lotin va kirill yozuvda, inglizcha, arabcha va ruscha. Arabcha tanlansa butun ilova o'ngdan chapga o'giriladi.": { en: "There are five languages: Uzbek in Latin and Cyrillic script, English, Arabic and Russian. If Arabic is chosen the whole app turns right-to-left." },
  "Sarlavhadagi quyosh yoki oy tugmasi ilova ranglarini almashtiradi. Kechqurun ko'z charchamasligi uchun tungi ko'rinishni yoqib qo'ying.": { en: "The sun or moon button in the header switches the app's colours. Turn on the dark appearance in the evening so your eyes do not tire." },

  // --- v12 yangiliklari ---
  "12-yangilanish (v12)": { en: "Update 12 (v12)" },
  "Bugun sahifasida vazifa ustini bosib tursangiz «Tahrirlash» va «O'chirish» tugmalari chiqadi.": { en: "Hold a task on the Today page and «Edit» and «Delete» buttons appear." },
  "Namoz belgilangandan keyin ham «Masjidda» tugmasi joyida qoladi — endi uni bosishga ulguriladi.": { en: "The «At the mosque» button now stays in place after a prayer is marked — there is time to tap it." },
  "Qur'on xatmi qatorini bosib tursangiz reja tahriri ochiladi.": { en: "Hold the Qur'an khatm row to open the plan editor." },
  "Uyquga alohida ikonka berildi. Ilgari u tungi ko'rinish tugmasi bilan bir xil yarim oy edi.": { en: "Sleep now has its own icon. Before, it was the same crescent as the dark-appearance button." },
  "Sozlamalardagi «Qanday ishlaydi?» «Har bo'lim nima qiladi?» ga aylandi va o'n to'qqiz bandgacha kengaydi.": { en: "«How does it work?» in Settings became «What does each section do?» and grew to nineteen entries." },
  "Ekranda paydo bo'lib turadigan eski ishoralar olib tashlandi — ular tanishtiruv qo'llanmasi bilan takrorlanardi.": { en: "The old hints that popped up on screen were removed — they repeated what the guided tour already says." },
  "«Barcha vazifalar» qo'shish menyusida ajratildi: u qo'shish uchun emas, bor vazifalarni boshqarish uchun.": { en: "«All tasks» is now set apart in the add menu: it is not for adding, but for managing what exists." },
  "Maqsad jarayonidagi «Oy» va «6 oy» tugmalari boshqa tillarda ham to'g'ri chiqadigan bo'ldi.": { en: "The «Month» and «6 months» buttons in goal progress now display correctly in the other languages too." },

  // --- v12: fokus rejimi va kun xulosasi ---
  "Chiqish": { en: "Exit" },
  "Kun oxirida «bugun qanday o'tdi?» degan savolga bir jumla yozib qo'yasiz. Bugun sahifasidagi dumaloq tugmalardan ochiladi va Taqvimda o'sha kun ostida saqlanadi.": { en: "At the end of the day you write one sentence answering «how did today go?». It opens from the round buttons on the Today page and is kept under that day in the Calendar." },

  // --- v12: kirish ekrani va telegram bo'limi ---
  "Boshlaymiz": { en: "Let us begin" },
  "Ilovadan avval foydalanganmisiz?": { en: "Have you used the app before?" },
  "PDF orqali ko'chiraman": { en: "Restore from a PDF" },
  "Ilovadan avval foydalangan bo'lsangiz, Sozlamalardan olgan PDF zaxirangiz bor. Shu faylni tanlasangiz — vazifalaringiz, belgilashlaringiz va butun tarixingiz shu ilovaga ko'chib o'tadi.": { en: "If you have used the app before, you have a PDF backup taken from Settings. Choose that file and your tasks, your marks and your whole history move across into this app." },
  "Telegram kanalimizga o'tasizmi?": { en: "Open our Telegram channel?" },
  "Ilovalarimiz va bog'lanish": { en: "Our apps and contact" },
  "Barcha ilovalarimiz, yangilanishlar va biz bilan bog'lanish — Telegram kanalimizda": { en: "All our apps, updates and how to reach us — in our Telegram channel" },

  // --- v12: «Ilova haqida» bo'limi ---
  "Ilova haqida": { en: "About the app" },
  "Nega yaratildi va kimga kerak": { en: "Why it was made and who it is for" },
  "Yangilanishlar va aloqa uchun": { en: "Updates and contact" },
  "Assalomu alaykum. Hayotimiz davomida ko'pchiligimiz o'zimiz uchun turli xil katta maqsadlar qo'yamiz — «shu yili buni o'rganaman», «bu yili tashlayman», «u yilda mana buncha narsaga erishaman» va hokazo. Bir hafta o'tadi, ikki hafta o'tadi, ammo maqsadlarimizni bajarish tugul, qanday maqsadlar haqida o'ylaganimizni ham eslay olmaymiz. Maqsad yo'qolmaydi — u shunchaki har kungi kichik ishlarga bo'linmagani uchun qo'ldan chiqib ketadi.": { en: "Peace be upon you. Throughout our lives most of us set ourselves all kinds of large goals — «this year I will learn that», «this year I will give it up», «by that year I will have achieved this much», and so on. A week passes, two weeks pass, and not only have we failed to carry the goals out, we cannot even recall what goals we were thinking about. A goal does not vanish — it simply slips out of our hands because it was never broken down into small daily tasks." },
  "Aynan mana shu vaziyatda «Oliy maqsad» sizga yordamchi bo'ladi: ilova kattayu kichik maqsadlaringizni har kungi qadamlarga bo'lib beradi va o'sha qadamlarni shaffof holatda hisoblab boradi.": { en: "This is exactly where «Oliy maqsad» helps you: the app breaks your goals, large and small, into daily steps and keeps count of those steps openly." },
  "Bugun nimani bajardingiz, nimani qoldirdingiz, nimani sababli qoldirdingiz — hammasi yozilib boradi. Bir oydan keyin o'zingizga «harakat qildim shekilli» deb emas, aniq raqam bilan qaray olasiz.": { en: "What you did today, what you left undone, and what you left with a good reason — all of it is recorded. A month later you can look at yourself not with «I think I tried», but with an exact number." },
  "Bu yerda maqtov ham, tanbeh ham yo'q. Faqat ko'zgu bor.": { en: "There is no praise here and no reproach. There is only a mirror." },
  "Biz bu ilovani avvalo o'zimiz uchun yasagandik. Yozib boradigan daftarimiz bor edi, lekin daftar hisoblab bermaydi, eslatmaydi va yo'qolib ketish xavfi bor. Tayyor ilovalarni sinab ko'rdik — ko'pi ro'yxat tuzishga yaxshi, ammo uzoq yo'lni ko'rsatmaydi; shaxsiy ma'lumot daxlsizligi ham so'roq ostidagi masala edi.": { en: "We first built this app for ourselves. We kept a notebook, but a notebook does not count for you, does not remind you, and can be lost. We tried the apps that already existed — most are good at making lists but do not show the long road; and the privacy of personal data was a question mark as well." },
  "Shuning uchun ilovani yasash mobaynida uch tamal qoidani qat'iy belgiladik:": { en: "So while building the app we laid down three firm rules:" },
  "Ma'lumot faqat telefoningizda turadi. U hech qayerga ketmaydi. Ilovaning hech qanday serveri yo'q — shaxsiy ma'lumotlar telefondan tashqariga chiqmaydi.": { en: "Your data stays only on your phone. It goes nowhere. The app has no server at all — personal data never leaves the device." },
  "Serverlar bo'lmaganidan keyin ilova 100% internetsiz ishlaydi.": { en: "Since there are no servers, the app works fully without the internet." },
  "Ilova insonlar manfaati uchun yasalgan. Shu sabab unda umuman reklama va to'lovlar yo'q.": { en: "The app was made for people's benefit. That is why it carries no advertising and no payments whatsoever." },
  "Umr — bizga berilgan eng qimmatli narsa, ammo u sarflanayotganini ko'pincha sezmaymiz. Kunni yozib borishning o'zi hech narsani o'zgartirmaydi. Lekin u odamni bir ishga majbur qiladi — to'xtab, o'ziga qarashga.": { en: "A lifetime is the most precious thing given to us, yet we rarely notice it being spent. Writing the day down changes nothing by itself. But it forces a person into one thing — to stop and look at himself." },
  "Nazorat qilinmagan kun sezilmay o'tadi. Sanalgan kun esa qoladi.": { en: "An unwatched day passes unnoticed. A counted day stays." },

  // --- v12: namuna vazifalar ---
  "yoki tayyor namunadan boshlang": { en: "or start from a ready example" },
  "Sport bilan shug'ullanish": { en: "Exercise" },
  "Kitob o'qish": { en: "Reading a book" },
  "Sog'liq": { en: "Health" },
  "Ilm": { en: "Knowledge" },

  // --- v12: ibodat eslatmasi ---
  "Kechqurungi eslatma": { en: "Evening reminder" },
  "Har kuni {v} da eslatiladi": { en: "Reminds you every day at {v}" },
  "O'chirilgan": { en: "Turned off" },
  "Bugungi ibodatlaringizni belgilab qo'ying.": { en: "Mark today's worship." },

  // --- v12: ibodat qatori ---
  "Majburiy": { en: "Required" },
  "bajarildi": { en: "completed" },

  // --- v12: uyqu sahifasiga yo'l ---
  "Uyqu rejasi va kundaligi": { en: "Sleep plan and diary" },
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
  "Bugun:": "اليوم:",
  "Qolgan vazifalar": "مهام أخرى",
  "pora": "جزء",
  "{n} pomodoro": "{n} بومودورو",
  "{v} sof ish": "{v} عمل صافٍ",
  "Bugungi miqdor: {n} {b}": "مقدار اليوم: {n} {b}",
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
  "Tugatish": "إيقاف",
  "to'xtatish": "إيقاف",
  "To'xtatish": "إيقاف مؤقت",
  "To'xtatilgan": "متوقف مؤقتًا",
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
  "Kundalik reja": "خطة يومية",
  "Kundalik vazifalar": "المهام اليومية",
  "Keyingi vazifa": "المهمة التالية",
  "Bugunga vazifa yo'q": "لا مهام لليوم",
  "Turi yo'q": "بلا نوع",
  "Vazifa turi:": "النوع:",
  "Rejadan tashqari amal": "عمل غير مخطط",
  "Rejadan tashqari amallar": "أعمال غير مخططة",
  "Qo'shimcha": "زيادة",

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
  "Uxlash vaqti": "وقت النوم",
  "Turish vaqti": "وقت الاستيقاظ",
  "Pomodoro": "بومودورو",
  "Diqqatni jamlash": "وضع التركيز",
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
  "Kunlik miqdorni kiriting!": "أدخل المقدار اليومي!",
  "Yillik sonni kiriting.": "أدخل العدد السنوي.",
  "Yillar sonini tanlang.": "اختر عدد السنوات.",
  "Vazn kamayishi (kg)": "إنقاص الوزن (كجم)",
  "O'lchov": "المقياس",
  "Sanaladigan": "قابل للعد",
  "SANALADIGAN": "قابل للعد",
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
  "Rejaga muvofiq": "مطابق للخطة",
  "Rejaga ko'ra uyqu": "نوم حسب الخطة",
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
  "Boshlashga tayyor": "جاهز للبدء",
  "Ochiq rejim": "الوضع المفتوح",
  "Ish vaqti tugadi": "انتهى وقت العمل",
  "daq · Dam:": "د · الراحة:",
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
  "REJADAN TASHQARI AMALLAR": "أعمال إضافية",
  "Vaqtincha to'xtatish": "إيقاف مؤقت",
  "Tashlab qo'yish": "ترك المهمة",
  "(shu tur bir papka)": "(هذا النوع مجلد واحد)",
  "Oddiy ro'yxat": "قائمة بسيطة",
  "+ Ro'yxatga qo'shish": "+ إضافة إلى القائمة",
  "Nima qo'shamiz?": "ماذا نضيف؟",

  // --- Ibodat (davomi) ---
  "Qur'on xatmini rejalash": "التخطيط لختم القرآن",
  "Bismillah — boshlaymiz!": "بسم الله — لنبدأ!",

  // --- Xulosa, iqtibos, eslatma ---
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
  "Erkaklarda har namozda «masjidda o'qidim» tugmasi bo'ladi — reytingda balandroq baholanadi.": "للرجال زر «صليتُ في المسجد» مع كل صلاة — ويُقيَّم أعلى.",
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
  "hisoblanadi — qismiy bajarilish beradi, ortiqchasi «qo'shimcha»ga o'tadi.": "يُحتسب — فيعطي إنجازًا جزئيًا، والفائض ينتقل إلى «الزيادة».",

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
  "Bu vazifani tugatdingizmi? Tabriklaymiz!": "هل أنهيت هذه المهمة؟ تهانينا!",
  "Vazifani tashlab qo'yasizmi? Bu statistikada salbiy iz qoldiradi.": "هل تترك هذه المهمة؟ سيترك ذلك أثرًا سلبيًا في الإحصائيات.",
  "Bu vazifa hali boshlanmagan. Butunlay o'chirilsinmi?": "لم تبدأ هذه المهمة بعد. هل تُحذف نهائيًا؟",
  "Arxivlansinmi? Tarixi saqlanadi, ro'yxatdan chiqadi.": "هل تُؤرشَف؟ يبقى سجلها وتخرج من القائمة.",
  "Ko'pi bilan 7 kun. Undan ortig'i — vazifani tashlab qo'yish hisoblanadi.": "٧ أيام على الأكثر. وما زاد على ذلك يُعدّ تركًا للمهمة.",
  "«{nom}» necha kunga to'xtatilsin? To'xtatilgan kunlar statistikaga kirmaydi.": "كم يومًا تُوقَف «{nom}»؟ الأيام الموقوفة لا تدخل في الإحصائيات.",
  "Tartibni o'zgartiring — birinchi vazifa «Keyingi vazifa» kartasida chiqadi.": "غيّر الترتيب — تظهر المهمة الأولى في بطاقة «المهمة التالية».",
  "Vaqtlar faqat reja uchun — belgilashni kun davomida istalgan payt qilasiz.": "الأوقات للتخطيط فقط — ويمكنك التسجيل في أي وقت خلال اليوم.",
  "Vazifaga tegishli bo'lsa — o'sha vazifaga «qo'shimcha» qo'shiladi va statistikaga kiradi.": "إن كان يخص مهمة — تُضاف «زيادة» إلى تلك المهمة وتدخل في الإحصائيات.",
  "Rejadan ortiq ish qilsangiz — Bugun bo'limidagi «Rejadan tashqari amallar» bo'limiga yozing. Vijdon — eng adolatli guvoh.": "إن عملت أكثر من المخطط فسجّله في قسم «عمل إضافي» في صفحة اليوم. والضمير أعدل شاهد.",
  "Masalan: qo'shimcha kitob o'qidim": "مثال: قرأتُ كتابًا إضافيًا",
  "«{nom}» — {k}-kun (reja: {r} kun). Shoshilmang, lekin rejani ham unutmang.": "«{nom}» — اليوم {k} (المخطط: {r} يومًا). لا تستعجل، ولا تغفل عن الخطة.",
  "«{nom}» vazifasini boshlaysiz.": "ستبدأ مهمة «{nom}».",
  "«{nom}» so'nggi 30 kunda {n} marta sababli qoldirildi. Balki og'irlik qilayotgandir? Yengillashtirishingiz mumkin.": "تُركت «{nom}» بعذر {n} مرة في آخر ٣٠ يومًا. ولعلها ثقيلة عليك؟ يمكنك تخفيفها.",
  "Sababli: {n} marta (joriy 30 kunlik: {m}/3)": "بعذر: {n} مرة (٣٠ يومًا الحالية: {m}/٣)",
  "Bu vaqt «{nom}» ({a}–{b}) bilan to'qnashadi.": "هذا الوقت يتعارض مع «{nom}» ({a}–{b}).",
  "Pomodoro orqali {v} hisoblangan.": "احتُسب {v} عبر البومودورو.",
  "Kunlik vaqti: {v}. Ortiqcha ajratilgan vaqt belgilashda «qo'shimcha»ga o'tadi.": "الوقت اليومي: {v}. والوقت الزائد المخصّص ينتقل إلى «الزيادة» عند التسجيل.",
  "(shu tur bir papka bo'ladi)": "(يصبح هذا النوع مجلدًا واحدًا)",
  "(shu vaqtda eslatma keladi)": "(يصل التذكير في هذا الوقت)",
  "yoki yangi tur yozing...": "أو اكتب نوعًا جديدًا...",

  // --- Maqsad ---
  "Oliy maqsadlaringizni belgilang": "حدّد مقاصدك العليا",
  "Oliy maqsadingizni yozing...": "اكتب مقصدك الأعلى...",
  "Hali oliy maqsad belgilanmagan": "لم يُحدَّد مقصد أعلى بعد",
  "Maqsadingizni iloji boricha aniq va batafsil yozing.": "اكتب هدفك بأدقّ وأوفى ما تستطيع.",
  "Rejani qaytadan tuzasizmi?": "هل تعيد بناء الخطة؟",
  "Maqsadingizga umumiy qancha vaqtda yetishni niyat qilgansiz?": "في كم من الوقت تنوي بلوغ مقصدك؟",
  "Qachondan boshlaysiz?": "متى تريد أن تبدأ؟",
  "Masalan: 5 yil ichida kasbimda yetuk mutaxassis bo'lish va sog'lom turmush tarziga o'tish...": "مثال: أن أصير خبيرًا متمكّنًا في مهنتي خلال ٥ سنوات وأنتقل إلى نمط حياة صحي...",
  "Yillik raqamli maqsad — masalan 10 kitob": "هدف سنوي رقمي — مثلًا ١٠ كتب",
  "Yillik raqamli maqsadlar hali yo'q — bosib qo'shing": "لا أهداف سنوية رقمية بعد — اضغط لإضافتها",
  "Yil davomida nimani nechta qilmoqchisiz? Masalan «10 kitob», «100 dars».": "كم من ماذا تريد أن تنجز خلال السنة؟ مثلًا «١٠ كتب»، «١٠٠ درس».",
  "Yil davomida nimani nechta qilishni belgilang — masalan «yiliga 10 kitob», «100 dars». Bu raqamlar Maqsad bo'limidagi natijani yuritadi.": "حدّد كم من ماذا ستنجز خلال السنة — مثلًا «١٠ كتب في السنة»، «١٠٠ درس». هذه الأرقام تحرّك التقدّم في قسم الهدف.",
  "«{nom}» turidagi oliy vazifa tugatilganda hisob o'zi +1 bo'ladi.": "عند إنجاز مهمة عليا من نوع «{nom}» يزيد العدّاد ١ تلقائيًا.",
  "Bu maqsad qo'lda sanaladi — Bugun sahifasidagi «+1» tugmasi bilan.": "يُعدّ هذا الهدف يدويًا — بزر «+١» في صفحة اليوم.",
  "Bugun bo'limida «+1» tugmasi chiqadi — har safar o'zingiz bosasiz.": "يظهر زر «+١» في قسم اليوم — تضغطه بنفسك في كل مرة.",
  "Kunlik miqdor qanday o'lchanadi?": "كيف يُقاس المقدار اليومي؟",
  "Yiliga nechta? (masalan 10)": "كم في السنة؟ (مثلًا ١٠)",
  "Shunday davom etsangiz, yil oxirida taxminan": "بهذه الوتيرة، بنهاية السنة سيكون نحو",
  "{n} yillik maqsadlaringiz uchun rejangizni tuzishga tayyormisiz?": "هل أنت مستعد لوضع خطتك لمقاصد {n} سنوات؟",

  // --- Kun, hafta, dam ---
  "Bugun dam oling! Yaxshi dam — mehnatga hamdam": "اليوم يوم راحة — خذ راحتك",
  "Dam kuni foizga kirmaydi — bemalol dam oling.": "يوم الراحة لا يدخل في النسبة — فهو يوم راحة.",
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
  "Zaxira nusxa olganingizga ancha bo'ldi — Sozlamalardan yuklab oling.": "مضى وقت طويل على آخر نسخة احتياطية — نزِّل واحدة من الإعدادات.",
  "Majburiy bo'lim — to'ldirish shart!": "قسم إلزامي — يجب ملؤه",
  "Rejani tuzishni boshlaymiz.": "لنبدأ في وضع الخطة.",
  "Iltimos, ismingizni kiriting.": "من فضلك أدخل اسمك.",
  "Keyinroq davom ettiraman.": "سأكمل لاحقًا.",
  "Keyinroq sozlashim mumkin.": "يمكنني ضبطه لاحقًا.",

  // --- Yordam va kanal ---
  "tugmasi orqali kundalik yoki oliy maqsad vazifasini qo'shing.": "لإضافة مهمة يومية أو مهمة للمقصد الأعلى.",
  "Vazifa qo'shib, bir necha kun belgilab boring — natijalar, grafiklar va haftalik hisobot shu yerda ko'rinadi.": "أضِف مهمة وسجّلها بضعة أيام — ستظهر هنا النتائج والرسوم البيانية والتقرير الأسبوعي.",
  "Telegram ilovasi ochiladi.": "سيُفتح تطبيق تيليجرام.",
  "Masalan: yaxshi, unumli kun bo'ldi...": "مثال: كان يومًا طيبًا منتجًا...",
  "Masalan: Ingliz tili darsi": "مثال: درس اللغة الإنجليزية",
  "Masalan: Qur'on o'qish, sport...": "مثال: مطالعة، رياضة...",
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

  // --- Yangiliklar oynasi (v10) ---

  // --- v11: qisqa hafta kunlari ---
  "Ya": "أحد", "Du": "إثن", "Se": "ثلا", "Ch": "أرب", "Pa": "خمس", "Ju": "جمع", "Sh": "سبت",

  // --- v11: qisqa oy nomlari ---
  "yan": "ينا", "fev": "فبر", "mar": "مار", "apr": "أبر",
  "iyn": "يون", "iyl": "يول", "avg": "أغس",
  "sen": "سبت", "okt": "أكت", "noy": "نوف", "dek": "ديس",

  // --- v11: onboarding xulosa qatori ---
  "Muddat": "المدة",
  "Hafta boshi": "بداية الأسبوع",
  "yo'q": "لا يوجد",
  "{n} yil": "{n} سنة|{n} سنوات",
  "Shoshilmang — tayyor bo'lganingizda \"Ha\"ni tanlang. Eng muhimi — niyat.": "لا تستعجل — اختر «نعم» حين تكون مستعدًا. والأهم هو النية.",

  // --- v11: sozlamalar bo'limlarga ajratildi ---
  "Zaxira, qo'llanma, maqsadni qayta tuzish": "النسخ الاحتياطي، الدليل، إعادة بناء الهدف",
  "Ilovani ishlatish bo'yicha qo'llanma": "دليل استخدام التطبيق",
  "Rejani qaytadan tuzish": "إعادة بناء الخطة",
  "Hammasini o'chirib, boshidan boshlash": "حذف كل شيء والبدء من جديد",
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

  // --- v11: yozilgan narsalarni tahrirlash ---
  "Xulosani tahrirlang...": "عدّل الملاحظة...",
  "Xulosa o'chirilsinmi?": "هل تُحذف هذه الملاحظة؟",
  "Rejadan tashqari amal o'chirilsinmi?": "هل يُحذف هذا العمل الإضافي؟",

  // --- v11: birinchi yil izohi va qidiruv ---
  "Hozircha faqat birinchi yil vazifalarini belgilaysiz. Yil tugagach keyingi yilnikini qo'shasiz — o'tgan yil ma'lumotlari saqlanib qoladi ({n} yillik reja shunday boriladi).": "في الوقت الحالي تحدّد مهام السنة الأولى فقط. وعند انتهاء السنة تضيف مهام السنة التالية — وتبقى بيانات السنة الماضية محفوظة (هكذا تسير الخطة ذات {n} سنوات).",
  "Qidiruv natijalari ({n})": "نتائج البحث ({n})",

  // ===== v11: TANISHTIRUV TURI =====
  "Ilova bilan tanishib chiqasizmi?": "هل تودّ جولة سريعة في التطبيق؟",
  "Asosiy bo'limlarni qisqacha ko'rsataman — bir daqiqa vaqt oladi. Keyinroq Sozlamalar → Ma'lumotlar dan qayta ochishingiz mumkin.": "سأعرض عليك الأقسام الرئيسية باختصار — تستغرق دقيقة تقريبًا. ويمكنك فتحها لاحقًا من الإعدادات ← البيانات.",
  "Ha, ko'rsating": "نعم، اعرضها",
  "O'tkazib yuborish": "تخطّي",
  "Keyingisi": "التالي",

  // --- Qadam sarlavhalari ---
  "Maqsad bo'limi": "قسم الهدف",
  "Qo'shish tugmasi": "زر الإضافة",
  "Bugun sahifasi": "صفحة اليوم",

  // --- Qisqa to'plam ---
  "Bu ilova bir narsaga xizmat qiladi: katta maqsadingizni har kungi kichik ishlarga bo'lib berish va ularni halol hisobda yuritish. Keling, asosiy joylarni ko'rsataman.": "هذا التطبيق يخدم غرضًا واحدًا: تقسيم مقصدك الكبير إلى أعمال يومية صغيرة، وحفظ حساب أمين لها. دعني أريك الأماكن الرئيسية.",
  "Avval shu yerda oliy maqsadingizni yozasiz — nimaga erishmoqchisiz va necha yilda. Yillik raqamli maqsadlar ham shu yerda turadi.": "هنا تكتب أولًا مقصدك الأعلى — ما تريد بلوغه وفي كم سنة. وأهدافك السنوية الرقمية هنا أيضًا.",
  "Maqsadga eltuvchi vazifalarni shu tugma orqali qo'shasiz. Kundalik vazifa ham, oliy maqsad vazifasi ham shu yerdan.": "بهذا الزر تضيف المهام التي تقود إلى مقصدك — المهام اليومية ومهام المقصد الأعلى معًا.",
  "Zikr, besh vaqt namoz, nafllar va Qur'on xatmi shu yerda belgilanadi. Alohida hisoblanadi — kundalik foizga aralashmaydi.": "هنا تُسجَّل الأذكار والصلوات الخمس والنوافل وختم القرآن. تُحسب على حدة — ولا تؤثر على النسبة اليومية.",
  "Diqqatni bir joyga jamlab ishlash uchun taymer. Ishlagan vaqtingiz tegishli vazifaga o'zi yozib boriladi.": "مؤقّت للعمل بتركيز. والوقت الذي تعمله يُسجَّل تلقائيًا للمهمة المرتبطة به.",
  "Kunning yuragi shu yerda. Har kuni vazifalarni belgilab borasiz — qildim, sababli qilmadim yoki umuman qilmadim.": "قلب اليوم هنا. كل يوم تسجّل مهامك — فعلتُ، أو بعذر، أو لم أفعل مطلقًا.",

  // --- To'liq to'plam ---
  "Ilovaning maqsadi — uzoq yo'lni har kungi kichik qadamlarga bo'lish. Siz maqsad qo'yasiz, unga olib boradigan vazifalarni belgilaysiz, ilova esa bajarganingizni halol hisobda yuritadi. Vijdon — eng adolatli guvoh.": "غاية التطبيق تقسيم الطريق الطويل إلى خطوات يومية صغيرة. أنت تضع الهدف وتحدّد المهام التي تقود إليه، والتطبيق يحفظ حسابًا أمينًا لما تفعله. والضمير أعدل شاهد.",
  "Oliy maqsadingiz matni, natija halqasi va yillik raqamli maqsadlaringiz shu yerda. Har maqsadni bosib jarayonini ko'rasiz — hafta, oy, olti oy va yil bo'yicha. Ko'p yillik rejada har yil alohida yuritiladi: yil tugagach keyingi yil vazifalarini qo'shasiz, eskisi saqlanib qoladi.": "هنا نصّ مقصدك الأعلى وحلقة النتيجة وأهدافك السنوية الرقمية. اضغط أي هدف لترى تقدّمه — أسبوعيًا وشهريًا ونصف سنوي وسنوي. وفي الخطة متعددة السنوات تُحفظ كل سنة على حدة: عند انتهاء السنة تضيف مهام السنة التالية، وتبقى القديمة.",
  "Uch xil narsa qo'shiladi: har kuni takrorlanadigan kundalik vazifa, katta maqsadga eltuvchi oliy vazifa, va yillik raqamli maqsad. Har vazifaga vaqt oralig'i berilsa, o'sha payt telefonga eslatma keladi — ilova yopiq bo'lsa ham.": "تُضاف ثلاثة أشياء: مهمة يومية تتكرر كل يوم، ومهمة عليا تقود إلى الهدف الأكبر، وهدف سنوي رقمي. وإن حدّدت للمهمة فترة زمنية وصلك تذكير على هاتفك في وقتها — حتى لو كان التطبيق مغلقًا.",
  "Zikrlar, besh vaqt namoz, nafl namozlar va Qur'on xatmi. Bu bo'lim kundalik vazifalar foiziga aralashmaydi, alohida hisoblanadi. Masjidda o'qilgan namoz va nafllar reytingni oshiradi.": "الأذكار والصلوات الخمس وصلوات النوافل وختم القرآن. هذا القسم لا يؤثر على نسبة المهام اليومية، بل يُحسب على حدة. والصلاة في المسجد والنوافل ترفع التقييم.",
  "Ikki rejim bor. Fokusda ekran qorayadi va faqat taymer qoladi. Ochiq rejimda ilovadan chiqib ketsangiz ham vaqt tugaganda telefon xabar beradi. Ishlagan daqiqalaringiz tanlagan vazifangizga qo'shiladi.": "هناك وضعان. في التركيز تُعتَّم الشاشة ولا يبقى إلا المؤقّت. وفي الوضع المفتوح ينبّهك هاتفك عند انتهاء الوقت ولو خرجت من التطبيق. والدقائق التي تعملها تُضاف إلى المهمة التي تختارها.",
  "Har kuni shu yerdan boshlaysiz. Vazifa katakchasini bosganingizda belgilash oynasi ochiladi. Rejadan ortiq ish qilsangiz «Rejadan tashqari amallar» bo'limiga yozasiz — u tegishli vazifaga «qo'shimcha» bo'lib qo'shiladi.": "تبدأ من هنا كل يوم. وعند الضغط على مربّع المهمة تُفتح نافذة التسجيل. وإن عملت أكثر من المخطط فسجّله في «عمل إضافي» — يُضاف إلى المهمة المرتبطة كزيادة.",

  // --- Yangiliklar oynasi (v11) ---
  // Versiya raqami arabchada aralash chiqmasligi uchun qavs olib tashlandi
  // ("(v11)" -> raqam() uni "(v١١)" qilardi — lotin harf + arab raqam)
  "Ish vaqti tugagach \"bu vaqtda nima qildingiz?\" deb so'raydi va tanlangan vazifaga daqiqa yozadi.": "عند انتهاء وقت العمل يسأل: «ماذا فعلت في هذا الوقت؟» ويسجّل الدقائق للمهمة المختارة.",

  // --- v12: dumaloq tugmalar ---
  "Rejadan ortiq ish qilsangiz shu yerga yozasiz. U tegishli vazifaga «ziyoda» bo'lib qo'shiladi va statistikada foizni 100% dan yuqoriga chiqaradi.": "سجّل هنا كل ما تفعله فوق المخطط. يُضاف إلى المهمة المرتبطة كـ«زيادة» ويرفع نسبتك فوق ١٠٠٪ في الإحصائيات.",

  // --- v12: kirishdagi yangi/zaxira tanlovi ---
  "Yangi boshlayman": "سأبدأ من جديد",

  // --- v12: vazifani bosib turib tahrirlash ---
  "Tahrirlash": "تعديل",
  "Nomi, vaqti, kunlari va turi": "الاسم والوقت والأيام والنوع",
  "Tarixi bo'lsa arxivga tushadi": "إن كان له سجل فسينتقل إلى الأرشيف",
  "yoki mavjudlarini boshqaring": "أو أدِر الموجودة",
  "Ko'rish, tahrirlash, papkalarga ajratish, arxiv": "العرض والتعديل والتوزيع على المجلدات والأرشيف",

  // --- v12: namoz ixcham qatori ---
  "masjidda o'qildi": "أُدّيت في المسجد",

  // --- v12: ma'lumotnoma qayta yozildi ---
  "Xatm rejasini tahrirlash": "تعديل خطة الختمة",
  "Har bo'lim nima qiladi?": "ماذا يفعل كل قسم؟",
  "Bo'limlar va tugmalar batafsil izohlangan — o'qib chiqiladi": "شرح مفصّل للأقسام والأزرار — للقراءة",
  "Ilova bo'ylab qadam-baqadam yuriladi — ko'rsatib boriladi": "جولة خطوة بخطوة في التطبيق، يُشار لك إلى كل موضع",
  "Oy": "شهر",
  "6 oy": "6 أشهر",
  "Vazifani belgilash": "تعليم المهمة",
  "Vazifa vaqti va eslatma": "وقت المهمة والتذكير",
  "Papkalar": "المجلدات",
  "Zaxira nusxa": "النسخة الاحتياطية",
  "Kunduzgi va tungi ko'rinish": "المظهر النهاري والليلي",
  "Kunning yuragi. Eng yuqorida bugungi natija halqasi — nechta vazifa bajarilgani va foizi. Ostida bugun bajariladigan vazifalar. Vaqt belgilangan vazifalar soat tartibida chiqadi.": "قلب اليوم. في الأعلى حلقة نتيجة اليوم — كم مهمة أُنجزت والنسبة المئوية. وتحتها مهام اليوم. والمهام ذات الوقت المحدد تظهر بترتيب الساعة.",
  "Vazifa katakchasini bosing — pastdan belgilash oynasi chiqadi. Uch javob bor: «qildim», «sababli qilmadim» (kasallik, safar kabi — bu statistikani pasaytirmaydi) va «qilmadim». Katakchani bir soniya bosib tursangiz tahrirlash va o'chirish tugmalari chiqadi.": "اضغط على خانة المهمة — تظهر نافذة التعليم من الأسفل. وهناك ثلاث إجابات: «أدّيت»، و«تركت بعذر» (كالمرض والسفر — وهذا لا يخفض إحصاءاتك)، و«لم أؤدِّ». واضغط مطولًا على الخانة نحو ثانية فيظهر زرّا التعديل والحذف.",
  "Pastdagi katta yashil tugma. Undan uch narsa qo'shiladi: har kuni takrorlanadigan kundalik vazifa, katta maqsadga eltuvchi oliy vazifa va yillik raqamli maqsad. Eng pastdagi «Barcha vazifalar» esa qo'shish uchun emas — bor vazifalarni ko'rish va boshqarish uchun.": "الزر الأخضر الكبير في الأسفل. تُضاف منه ثلاثة أشياء: مهمة يومية تتكرر كل يوم، ومهمة تقود إلى هدفك الأسمى، وهدف رقمي سنوي. أما «كل المهام» في الأسفل فليست للإضافة — بل لعرض الموجود وإدارته.",
  "Har vazifaga vaqt oralig'i beriladi — masalan 08:00–09:00. O'sha vaqt kelganda telefonga eslatma keladi, ilova yopiq bo'lsa ham. Vazifa haftaning qaysi kunlari bajarilishini ham tanlaysiz.": "يمكن إعطاء كل مهمة نطاقًا زمنيًا — مثلًا 08:00–09:00. وعند حلول ذلك الوقت يصل تذكير إلى هاتفك، حتى لو كان التطبيق مغلقًا. وتختار أيضًا أيام الأسبوع التي تُؤدَّى فيها المهمة.",
  "Vazifalar ko'payib ketganda ularni papkalarga ajratasiz — masalan «Ilm», «Sog'liq», «Ish». Papkalar «Barcha vazifalar» bo'limida yaratiladi va vazifa ro'yxati shunga qarab guruhlanadi.": "عندما تكثر المهام توزّعها على مجلدات — مثل «العلم» و«الصحة» و«العمل». وتُنشأ المجلدات في قسم «كل المهام»، وتُجمَّع قائمة المهام بحسبها.",
  "Rejadan ortiq ish qilgan kuningiz shu yerga yozasiz. U tegishli vazifaga «ziyoda» bo'lib qo'shiladi va statistikada foizni 100% dan yuqoriga chiqaradi.": "في اليوم الذي تعمل فيه أكثر من المخطط تسجّله هنا. ويُضاف إلى المهمة المرتبطة كـ«زيادة» ويرفع نسبتك فوق 100% في الإحصائيات.",
  "Miqdori sanaladigan ishlar uchun: necha bet o'qildi, necha marta zikr aytildi, necha kilometr yurildi. Har kuni raqam kiritasiz, to'plangan miqdor va jarayon alohida ko'rinadi.": "للأعمال التي تُقاس بالمقدار: كم صفحة قُرئت، وكم مرة قيل الذكر، وكم كيلومترًا مُشي. تُدخل رقمًا كل يوم، ويُعرض المجموع المتراكم والتقدّم على حدة.",
  "Alohida bo'lim — kunlik vazifalar foiziga aralashmaydi. Tonggi va kechki zikrlar, besh vaqt namoz (har biri sunnat va farzga ajratilgan), tahajjud va kunduzgi nafllar shu yerda belgilanadi. Erkaklarda har namoz yonida «Masjidda» tugmasi bor — u reytingga bonus qo'shadi.": "قسم مستقل — لا يتداخل مع نسبة المهام اليومية. تُعلَّم هنا أذكار الصباح والمساء، والصلوات الخمس (كل منها مقسّمة إلى سنة وفرض)، والتهجد ونوافل النهار. وللرجال زر «في المسجد» بجانب كل صلاة — يضيف مكافأة إلى التقييم.",
  "Xatmni oldindan rejalashtirasiz: qachondan qachongacha va kuniga necha daqiqa yoki necha pora. Har kuni bajarganingizni belgilab borasiz, necha kun o'tgani yonida ko'rinib turadi. Rejani o'zgartirish uchun qatorni bosib turing.": "تخطّط للختمة مسبقًا: من متى إلى متى، وكم دقيقة أو كم جزءًا في اليوم. وتعلّم كل يوم ما أنجزته، ويظهر بجانبه عدد الأيام المنقضية. ولتغيير الخطة اضغط مطولًا على السطر.",
  "Sarlavhadagi karavot tugmasi. Necha soat uxlashni yoki aniq vaqt oralig'ini belgilaysiz, so'ng har kuni qancha uxlaganingizni yozib borasiz. Haftalik o'rtacha va rejadan chetlashish ko'rsatiladi.": "زر السرير في الترويسة. تحدّد كم ساعة تنام أو نطاقًا زمنيًا دقيقًا، ثم تسجّل كل يوم كم نمت. ويُعرض المتوسط الأسبوعي ومقدار الانحراف عن الخطة.",
  "Diqqatni jamlab ishlash taymeri. Ikki rejim bor: «Diqqatni jamlash»da ekran qorayadi va faqat taymer qoladi; «Ochiq rejim»da ilovadan chiqsangiz ham vaqt tugaganda telefon xabar beradi. Ishlagan daqiqalaringiz tanlagan vazifangizga qo'shiladi.": "مؤقّت للعمل بتركيز. وفيه وضعان: في «التركيز» تُظلم الشاشة ولا يبقى إلا المؤقّت؛ وفي «الوضع المفتوح» يمكنك مغادرة التطبيق ومع ذلك يُنبّهك الهاتف عند انتهاء الوقت. وتُضاف الدقائق التي عملتها إلى المهمة التي تختارها.",
  "Har kun o'sha kungi natijaga qarab bo'yaladi: to'liq bajarilgan kun yashil, yarmidan ko'pi sariq, past bo'lsa qizil. Dam kuni rangsiz — u hisobga kirmaydi. Kunni bossangiz o'sha kunning to'liq tafsiloti ochiladi.": "يُلوَّن كل يوم بحسب نتيجته: فاليوم المُنجَز كاملًا أخضر، وما زاد على النصف أصفر، والأدنى أحمر. ويوم الراحة بلا لون — فهو لا يُحتسب. واضغط على يوم لفتح تفاصيله كاملة.",
  "Kunlik, haftalik va oylik ko'rinish. Har raqam yonida o'tgan davrga nisbatan farqi turadi — o'sdimi yoki tushdimi. Grafikdagi nuqtaga bossangiz qaysi kun ekani chiqadi.": "عرض يومي وأسبوعي وشهري. وبجانب كل رقم فرقه عن الفترة السابقة — أارتفع أم انخفض. واضغط على نقطة في الرسم البياني لترى أيّ يوم هي.",
  "Maqsad matningiz, umumiy natija halqasi va yillik raqamli maqsadlaringiz. Har maqsadni bosib jarayonini ko'rasiz — hafta, oy, olti oy va yil bo'yicha. Ko'p yillik rejada har yil alohida yuritiladi: yil tugagach keyingi yil vazifalarini qo'shasiz.": "نصّ هدفك، وحلقة النتيجة العامة، وأهدافك الرقمية السنوية. اضغط على أيّ هدف لترى تقدّمه — بالأسبوع والشهر وستة أشهر والسنة. وفي الخطة متعددة السنوات تُدار كل سنة على حدة: فإذا انتهت سنة أضفت مهام السنة التالية.",
  "Reja tuzayotganda haftaning bir kunini dam kuni qilib belgilashingiz mumkin. O'sha kuni vazifalar so'ralmaydi va u statistikaga kirmaydi — foizingizni pasaytirmaydi.": "عند وضع خطتك يمكنك تعيين يوم واحد من الأسبوع يوم راحة. ففي ذلك اليوم لا تُطلب منك المهام ولا يدخل في الإحصاءات — ولن يخفض نسبتك.",
  "Sozlamalar → Ma'lumotlar. «PDF yuklab olish» bosilsa hamma ma'lumotingiz bitta faylga saqlanadi. Yangi telefonga o'tsangiz «PDF o'rnatish» orqali hammasini tiklaysiz. Ma'lumot faqat telefoningizda turadi — hech qayerga yuborilmaydi.": "الإعدادات ← البيانات. اضغط «تنزيل PDF» فتُحفظ كل بياناتك في ملف واحد. وإذا انتقلت إلى هاتف جديد استعدت كل شيء عبر «تثبيت PDF». وتبقى بياناتك في هاتفك وحده — ولا تُرسل إلى أي مكان.",
  "Beshta til bor: o'zbekcha lotin va kirill yozuvda, inglizcha, arabcha va ruscha. Arabcha tanlansa butun ilova o'ngdan chapga o'giriladi.": "هناك خمس لغات: الأوزبكية بالحرفين اللاتيني والسيريلي، والإنجليزية، والعربية، والروسية. وإذا اخترت العربية انقلب التطبيق كله من اليمين إلى اليسار.",
  "Sarlavhadagi quyosh yoki oy tugmasi ilova ranglarini almashtiradi. Kechqurun ko'z charchamasligi uchun tungi ko'rinishni yoqib qo'ying.": "زر الشمس أو القمر في الترويسة يبدّل ألوان التطبيق. فشغّل المظهر الليلي في المساء كي لا تتعب عيناك.",

  // --- v12 yangiliklari ---
  "12-yangilanish (v12)": "التحديث ١٢ (v12)",
  "Bugun sahifasida vazifa ustini bosib tursangiz «Tahrirlash» va «O'chirish» tugmalari chiqadi.": "اضغط مطولًا على مهمة في صفحة اليوم فيظهر زرّا «تعديل» و«حذف».",
  "Namoz belgilangandan keyin ham «Masjidda» tugmasi joyida qoladi — endi uni bosishga ulguriladi.": "يبقى زر «في المسجد» في مكانه بعد تعليم الصلاة — فصار هناك وقت للضغط عليه.",
  "Qur'on xatmi qatorini bosib tursangiz reja tahriri ochiladi.": "اضغط مطولًا على سطر ختمة القرآن ليُفتح تعديل الخطة.",
  "Uyquga alohida ikonka berildi. Ilgari u tungi ko'rinish tugmasi bilan bir xil yarim oy edi.": "صار للنوم أيقونة خاصة. وكان قبلُ هلالًا مثل زر المظهر الليلي نفسه.",
  "Sozlamalardagi «Qanday ishlaydi?» «Har bo'lim nima qiladi?» ga aylandi va o'n to'qqiz bandgacha kengaydi.": "صار «كيف يعمل؟» في الإعدادات «ماذا يفعل كل قسم؟» واتّسع إلى تسعة عشر بندًا.",
  "Ekranda paydo bo'lib turadigan eski ishoralar olib tashlandi — ular tanishtiruv qo'llanmasi bilan takrorlanardi.": "أُزيلت التلميحات القديمة التي كانت تظهر على الشاشة — فقد كانت تكرّر ما يقوله دليل التعريف.",
  "«Barcha vazifalar» qo'shish menyusida ajratildi: u qo'shish uchun emas, bor vazifalarni boshqarish uchun.": "فُصل «كل المهام» في قائمة الإضافة: فهو ليس للإضافة بل لإدارة الموجود.",
  "Maqsad jarayonidagi «Oy» va «6 oy» tugmalari boshqa tillarda ham to'g'ri chiqadigan bo'ldi.": "صار زرّا «شهر» و«٦ أشهر» في تقدّم الهدف يظهران بشكل صحيح في اللغات الأخرى أيضًا.",

  // --- v12: fokus rejimi va kun xulosasi ---
  "Chiqish": "خروج",
  "Kun oxirida «bugun qanday o'tdi?» degan savolga bir jumla yozib qo'yasiz. Bugun sahifasidagi dumaloq tugmalardan ochiladi va Taqvimda o'sha kun ostida saqlanadi.": "في نهاية اليوم تكتب جملة واحدة جوابًا عن «كيف مضى يومك؟». يُفتح من الأزرار الدائرية في صفحة اليوم ويُحفظ تحت ذلك اليوم في التقويم.",

  // --- v12: kirish ekrani va telegram bo'limi ---
  "Boshlaymiz": "لنبدأ",
  "Ilovadan avval foydalanganmisiz?": "هل استخدمت التطبيق من قبل؟",
  "PDF orqali ko'chiraman": "أنقل عبر ملف PDF",
  "Ilovadan avval foydalangan bo'lsangiz, Sozlamalardan olgan PDF zaxirangiz bor. Shu faylni tanlasangiz — vazifalaringiz, belgilashlaringiz va butun tarixingiz shu ilovaga ko'chib o'tadi.": "إن كنت قد استخدمت التطبيق من قبل فلديك نسخة PDF أخذتها من الإعدادات. اختر ذلك الملف فتنتقل مهامك وعلاماتك وتاريخك كله إلى هذا التطبيق.",
  "Telegram kanalimizga o'tasizmi?": "هل تفتح قناتنا على تيليجرام؟",
  "Ilovalarimiz va bog'lanish": "تطبيقاتنا والتواصل",
  "Barcha ilovalarimiz, yangilanishlar va biz bilan bog'lanish — Telegram kanalimizda": "كل تطبيقاتنا وتحديثاتنا وطريقة التواصل معنا — في قناتنا على تيليجرام",

  // --- v12: «Ilova haqida» bo'limi ---
  "Ilova haqida": "عن التطبيق",
  "Nega yaratildi va kimga kerak": "لماذا صُنع ولمن هو",
  "Yangilanishlar va aloqa uchun": "للتحديثات والتواصل",
  "Assalomu alaykum. Hayotimiz davomida ko'pchiligimiz o'zimiz uchun turli xil katta maqsadlar qo'yamiz — «shu yili buni o'rganaman», «bu yili tashlayman», «u yilda mana buncha narsaga erishaman» va hokazo. Bir hafta o'tadi, ikki hafta o'tadi, ammo maqsadlarimizni bajarish tugul, qanday maqsadlar haqida o'ylaganimizni ham eslay olmaymiz. Maqsad yo'qolmaydi — u shunchaki har kungi kichik ishlarga bo'linmagani uchun qo'ldan chiqib ketadi.": "السلام عليكم. كثير منا يضع لنفسه على مدى حياته أهدافًا كبيرة من كل نوع — «هذه السنة سأتعلم كذا»، «هذه السنة سأترك كذا»، «في تلك السنة سأبلغ هذا القدر» وهكذا. يمر أسبوع، ويمر أسبوعان، فلا نكون قد نفّذنا أهدافنا، بل لا نتذكر أصلًا ما الأهداف التي كنا نفكر فيها. الهدف لا يضيع — بل ينفلت من أيدينا لأنه لم يُقسَّم إلى أعمال يومية صغيرة.",
  "Aynan mana shu vaziyatda «Oliy maqsad» sizga yordamchi bo'ladi: ilova kattayu kichik maqsadlaringizni har kungi qadamlarga bo'lib beradi va o'sha qadamlarni shaffof holatda hisoblab boradi.": "وهنا بالضبط يعينك «المقصد الأعلى»: يقسّم التطبيق أهدافك الكبيرة والصغيرة إلى خطوات يومية، ويحسب تلك الخطوات بشفافية.",
  "Bugun nimani bajardingiz, nimani qoldirdingiz, nimani sababli qoldirdingiz — hammasi yozilib boradi. Bir oydan keyin o'zingizga «harakat qildim shekilli» deb emas, aniq raqam bilan qaray olasiz.": "ما أدّيته اليوم، وما تركته، وما تركته بعذر — كل ذلك يُسجَّل. وبعد شهر تستطيع أن تنظر إلى نفسك لا بعبارة «يبدو أني اجتهدت»، بل برقم دقيق.",
  "Bu yerda maqtov ham, tanbeh ham yo'q. Faqat ko'zgu bor.": "لا مدح هنا ولا لوم. هنا مرآة فحسب.",
  "Biz bu ilovani avvalo o'zimiz uchun yasagandik. Yozib boradigan daftarimiz bor edi, lekin daftar hisoblab bermaydi, eslatmaydi va yo'qolib ketish xavfi bor. Tayyor ilovalarni sinab ko'rdik — ko'pi ro'yxat tuzishga yaxshi, ammo uzoq yo'lni ko'rsatmaydi; shaxsiy ma'lumot daxlsizligi ham so'roq ostidagi masala edi.": "صنعنا هذا التطبيق أول ما صنعناه لأنفسنا. كان لنا دفتر نكتب فيه، لكن الدفتر لا يحسب عنك، ولا يذكّرك، ومعرّض للضياع. وجرّبنا التطبيقات الجاهزة — أكثرها جيد في إعداد القوائم، لكنه لا يُظهر الطريق الطويل؛ وكانت حرمة البيانات الشخصية أيضًا موضع سؤال.",
  "Shuning uchun ilovani yasash mobaynida uch tamal qoidani qat'iy belgiladik:": "لذلك وضعنا أثناء بناء التطبيق ثلاث قواعد راسخة:",
  "Ma'lumot faqat telefoningizda turadi. U hech qayerga ketmaydi. Ilovaning hech qanday serveri yo'q — shaxsiy ma'lumotlar telefondan tashqariga chiqmaydi.": "بياناتك تبقى في هاتفك وحده. لا تذهب إلى أي مكان. وليس للتطبيق أي خادم — فالبيانات الشخصية لا تخرج من الجهاز.",
  "Serverlar bo'lmaganidan keyin ilova 100% internetsiz ishlaydi.": "وما دام لا خوادم، فالتطبيق يعمل تمامًا بلا إنترنت.",
  "Ilova insonlar manfaati uchun yasalgan. Shu sabab unda umuman reklama va to'lovlar yo'q.": "صُنع التطبيق لمنفعة الناس. ولذلك ليس فيه إعلانات ولا مدفوعات البتة.",
  "Umr — bizga berilgan eng qimmatli narsa, ammo u sarflanayotganini ko'pincha sezmaymiz. Kunni yozib borishning o'zi hech narsani o'zgartirmaydi. Lekin u odamni bir ishga majbur qiladi — to'xtab, o'ziga qarashga.": "العمر أثمن ما أُعطينا، ومع ذلك قلّما نشعر به وهو يُنفَق. وتدوين اليوم بذاته لا يغيّر شيئًا. لكنه يُلزم المرء بأمر واحد — أن يتوقف وينظر إلى نفسه.",
  "Nazorat qilinmagan kun sezilmay o'tadi. Sanalgan kun esa qoladi.": "اليوم الذي لا يُراقَب يمضي دون أن يُشعر به. واليوم الذي يُحسَب يبقى.",

  // --- v12: namuna vazifalar ---
  "yoki tayyor namunadan boshlang": "أو ابدأ من نموذج جاهز",
  "Sport bilan shug'ullanish": "ممارسة الرياضة",
  "Kitob o'qish": "قراءة كتاب",
  "Sog'liq": "الصحة",
  "Ilm": "العلم",

  // --- v12: ibodat eslatmasi ---
  "Kechqurungi eslatma": "تذكير المساء",
  "Har kuni {v} da eslatiladi": "يذكّرك كل يوم في {v}",
  "O'chirilgan": "مُطفأ",
  "Bugungi ibodatlaringizni belgilab qo'ying.": "علّم عبادات اليوم.",

  // --- v12: ibodat qatori ---
  "Majburiy": "واجب",
  "bajarildi": "أُدّي",

  // --- v12: uyqu sahifasiga yo'l ---
  "Uyqu rejasi va kundaligi": "خطة النوم وسجله",
};

// Arabchani LUGAT ga qo'shamiz (kalitlar bir xil, faqat `ar` maydoni to'ldiriladi)
for (const k in LUGAT_AR) {
  if (!LUGAT[k]) LUGAT[k] = {};
  LUGAT[k].ar = LUGAT_AR[k];
}

// ---------- RUSCHA ----------
// Arabcha kabi alohida blokda — bir joydan ko'rib chiqish oson bo'lsin.
// Foydalanuvchi so'radi: rusiyzabon musulmonlar uchun.
// !!! TEKSHIRILMAGAN: ona tili sohibi ko'rib chiqishi tavsiya etiladi.
// Diniy atamalarda rus tilidagi qabul qilingan islomiy yozuv ishlatildi
// (намаз · зикр · нафль · ракаат · хатм · джуз · тахаджуд).
const LUGAT_RU: Record<string, string> = {
  // --- Ilova nomi va bo'limlar ---
  "Oliy maqsad": "Высшая цель",
  "oliy maqsad": "высшая цель",
  "Bugun": "Сегодня",
  "Bugun:": "Сегодня:",
  "Qolgan vazifalar": "Остальные задачи",
  "pora": "джуз",
  "{n} pomodoro": "{n} помодоро",
  "{v} sof ish": "{v} чистой работы",
  "Bugungi miqdor: {n} {b}": "Сегодняшний объём: {n} {b}",
  "Taqvim": "Календарь",
  "Statistika": "Статистика",
  "Sozlamalar": "Настройки",
  "Vazifalar": "Задачи",
  "Til": "Язык",
  "Ilova tili": "Язык приложения",

  // --- Ibodat ---
  "Ibodat": "Поклонение",
  "Ibodatlar": "Поклонение",
  "5 vaqt namoz": "Пять намазов",
  "Tahajjud": "Тахаджуд",
  "Nafl:": "Нафль:",
  "Kunduzgi nafl": "Дневные нафли",
  "Nafl namozlar (bonus)": "Нафль-намазы (бонус)",
  "rakaat": "ракаат",
  "Zikrlar": "Зикры",
  "Qur'on xatmi": "Хатм Корана",
  "yangi xatm": "новый хатм",
  "Xatm tugadi:": "Хатм завершён:",
  "Pora bilan": "По джузам",
  "Kuniga necha pora?": "Сколько джузов в день?",
  "to'liq o'qildi": "прочитано полностью",
  "Masjid:": "Мечеть:",
  "Masjidda": "В мечети",
  "Hijriy sana": "Дата по хиджре",
  "Oli Imron surasi · 200-oyat": "Сура Аль-Имран · аят 200",
  "Alloh taolo Qur'oni Karimda shunday marhamat qiladi:": "Всевышний Аллах говорит в Благородном Коране:",
  "Bugungi ibodat reytingi": "Оценка поклонения за сегодня",
  "Assalomu alaykum va rohmatullohi va barokatuhu": "Ассаламу алайкум ва рахматуллахи ва баракатух",

  // --- Kun va vaqt ---
  "Ertaga": "Завтра",
  "Hozir": "Сейчас",
  "Hafta": "Неделя",
  "Haftalik": "Еженедельно",
  "Oylik": "Ежемесячно",
  "Kunlik": "Ежедневно",
  "Kundalik": "Ежедневно",
  "kundalik": "ежедневно",
  "Har kuni": "Каждый день",
  "Shu hafta": "На этой неделе",
  "kun": "день",
  "hafta": "неделя",
  "Yil": "Год",
  "soat": "час",
  "daqiqa": "минута",
  "daq": "мин",
  "s": "ч",
  "gacha": "до",
  "dan": "с",
  "keyingi": "следующая",
  "Sana tanlang": "Выберите дату",
  "Vaqt tanlang": "Выберите время",
  "Vaqtni tanlang": "Выберите время",
  "Sanani tanlang": "Выберите дату",
  "Muddatsiz": "Без срока",
  "Vaqt oralig'i": "Промежуток времени",
  "Qachon tugaydi?": "Когда заканчивается?",
  "Qaysi kunlari?": "В какие дни?",
  "Dam kuni": "День отдыха",
  "Dam olish": "Отдых",
  "Bugun — dam kuni": "Сегодня день отдыха",

  // --- Milodiy oylar ---
  "yanvar": "январь", "fevral": "февраль", "mart": "март", "aprel": "апрель",
  "may": "май", "iyun": "июнь", "iyul": "июль", "avgust": "август",
  "sentabr": "сентябрь", "oktabr": "октябрь", "noyabr": "ноябрь", "dekabr": "декабрь",
  "yan": "янв", "fev": "фев", "mar": "мар", "apr": "апр",
  "iyn": "июн", "iyl": "июл", "avg": "авг",
  "sen": "сен", "okt": "окт", "noy": "ноя", "dek": "дек",

  // --- Hafta kunlari ---
  "Yakshanba": "Воскресенье", "Dushanba": "Понедельник", "Seshanba": "Вторник",
  "Chorshanba": "Среда", "Payshanba": "Четверг", "Juma": "Пятница", "Shanba": "Суббота",
  "Ya": "Вс", "Du": "Пн", "Se": "Вт", "Ch": "Ср", "Pa": "Чт", "Ju": "Пт", "Sh": "Сб",

  // --- Hijriy oylar ---
  "muharram": "мухаррам", "safar": "сафар", "rabiul-avval": "раби аль-авваль",
  "rabiul-oxir": "раби ас-сани", "jumadul-avval": "джумада аль-уля", "jumadul-oxir": "джумада ас-сания",
  "rajab": "раджаб", "sha'bon": "шаабан", "ramazon": "рамадан",
  "shavvol": "шавваль", "zulqa'da": "зуль-каада", "zulhijja": "зуль-хиджа",

  // --- Belgilash va holat ---
  "Qildim": "Выполнил",
  "✓ Qildim": "✓ Выполнил",
  "✗ Qilmadim": "✗ Не выполнил",
  "Sababli": "По уважительной причине",
  "Sababli:": "По причине:",
  "Sababli qilmadim": "Не выполнил по причине",
  "Umuman qilmadim": "Совсем не выполнил",
  "Bajarildi": "Выполнено",
  "Bajarildi:": "Выполнено:",
  "Bajarilmadi": "Не выполнено",
  "Bajarilmadi:": "Не выполнено:",
  "Belgilandi": "Отмечено",
  "Belgilanmagan": "Не отмечено",
  "Tugatdim": "Завершил",
  "Tayyor": "Готово",
  "Saqlandi ✓": "Сохранено ✓",
  "Bugungi natija": "Результат за сегодня",
  "Jarayon:": "Прогресс:",
  "O'rtacha": "Среднее",
  "O'rtacha:": "Среднее:",
  "Jami": "Всего",
  "Jami:": "Всего:",
  "Jami vaqt": "Общее время",
  "Umumiy vaqt": "Итоговое время",
  "Tanlangan:": "Выбрано:",

  // --- Tugmalar ---
  "OK": "ОК",
  "Ha": "Да",
  "Bekor": "Отмена",
  "Saqlash": "Сохранить",
  "Qo'shish": "Добавить",
  "O'chirish": "Удалить",
  "O'zgartirish": "Изменить",
  "tahrirlash": "изменить",
  "Davom": "Продолжить",
  "Davom etish": "Продолжить",
  "Davom ettirish": "Продолжить",
  "Boshlash": "Начать",
  "Boshlanish": "Начало",
  "Tugash": "Конец",
  "Tugatish": "Остановить",
  "to'xtatish": "остановить",
  "To'xtatish": "Пауза",
  "To'xtatilgan": "На паузе",
  "Tushunarli": "Понятно",
  "Yaxshi!": "Отлично!",
  "Arxivlash": "В архив",
  "Tartiblash": "Сортировать",
  "Sozlash": "Настроить",
  "Qayta tiklash": "Восстановить",
  "Keyingisi": "Далее",
  "O'tkazib yuborish": "Пропустить",
  "Ha, ko'rsating": "Да, покажите",

  // --- Vazifa ---
  "Vazifa": "Задача",
  "Vazifa nomi": "Название задачи",
  "Vazifa turi": "Тип задачи",
  "Yangi vazifa": "Новая задача",
  "Bugungi vazifalar": "Задачи на сегодня",
  "Barcha vazifalar": "Все задачи",
  "Bajarilgan vazifalar": "Выполненные задачи",
  "Kundalik reja": "Ежедневный план",
  "Kundalik vazifalar": "Ежедневные задачи",
  "Keyingi vazifa": "Следующая задача",
  "Bugunga vazifa yo'q": "На сегодня задач нет",
  "Turi yo'q": "Без типа",
  "Vazifa turi:": "Тип:",
  "Rejadan tashqari amal": "Внеплановая работа",
  "Rejadan tashqari amallar": "Внеплановые работы",
  "Qo'shimcha": "Сверх нормы",

  // --- Maqsad ---
  "Maqsad": "Цель",
  "Yangi maqsad": "Новая цель",
  "Oliy maqsadim": "Моя высшая цель",
  "Oliy maqsadlaringiz": "Ваши высшие цели",
  "Belgilangan maqsad": "Установленная цель",
  "Maqsadlar bajarildi": "Целей выполнено",
  "Maqsadga yetdingiz!": "Вы достигли цели!",
  "Reja": "План",
  "Reja yo'q": "Плана нет",

  // --- Uyqu va pomodoro ---
  "Uyqu": "Сон",
  "Uyqu rejasi": "Режим сна",
  "Uxlash vaqti": "Время отхода ко сну",
  "Turish vaqti": "Время подъёма",
  "Pomodoro": "Помодоро",
  "Diqqatni jamlash": "Режим фокуса",
  "Ish vaqti": "Рабочее время",
  "Ish:": "Работа:",
  "Kun tartibi": "Распорядок дня",

  // --- Boshqa ---
  "Erkak": "Мужчина",
  "Ayol": "Женщина",
  "Ma'lumotlar": "Данные",
  "Eslatma": "Напоминание",
  "Eslatma vaqti": "Время напоминания",
  "Xulosalarim": "Мои заметки",
  "Xulosa qo'shish": "Добавить заметку",
  "Kun xulosasi": "Итог дня",
  "Tonggi": "Светлая",
  "Tungi": "Тёмная",
  "(ixtiyoriy)": "(необязательно)",
  "tez orada": "скоро",
  "kg": "кг",
  "marta": "раз",
  "umumiy": "итого",
  "ma'lumot yo'q": "нет данных",
  "Hech narsa topilmadi.": "Ничего не найдено.",
  "Ilova yangiliklari": "Новости приложения",
  "PDF yuklab olish": "Скачать PDF",
  "Zaxira saqlandi": "Резервная копия сохранена",
  "Muddat": "Срок",
  "Hafta boshi": "Начало недели",
  "yo'q": "нет",
  // Ruschada ham sanoq yuklamasi yo'q — o'zbekcha "ta" kabi
  "ta": "",

  // ===== 2-to'plam =====
  // KO'PLIK: rus tilida uch shakl bor (1 / 2-4 / 5+), `tf()` esa faqat
  // ikkitasini beradi. "|" chapda birlik, o'ngda ko'plik — 2-4 oralig'ida
  // grammatik jihatdan aniq emas. Tekshiruvchi shunga e'tibor bersin.
  "{n} soat": "{n} час|{n} часов",
  "~{n} soat": "~{n} час|~{n} часов",
  "reja {n} soat": "план {n} час|план {n} часов",
  "Uyqu: {n} soat": "Сон: {n} час|Сон: {n} часов",
  "{n} kun": "{n} день|{n} дней",
  "{a}/{b} kun": "{a}/{b} дней",
  "{n} kundan keyin": "через {n} день|через {n} дней",
  "Reja: {n} kun": "План: {n} день|План: {n} дней",
  "{n} yil": "{n} год|{n} лет",
  "{y}-yil · {n} kun qoldi": "Год {y} · остался {n} день|Год {y} · осталось {n} дней",
  "kun · Umumiy:": "дней · Итого:",

  // --- Namoz nomlari ---
  "Bomdod": "Фаджр", "Peshin": "Зухр", "Asr": "Аср",
  "Shom": "Магриб", "Xufton": "Иша", "Vitr": "Витр",
  "2 sunnat": "2 сунна", "4 sunnat": "4 сунны",
  "2 farz": "2 фард", "3 farz": "3 фарда", "4 farz": "4 фарда", "3 vitr": "3 витра",
  "Tonggi zikrlar": "Утренние зикры",
  "Kechki zikrlar": "Вечерние зикры",
  "Uxlashdan oldingi zikrlar": "Зикры перед сном",
  "Qur'on xatmini rejalash": "Запланировать хатм Корана",
  "Bismillah — boshlaymiz!": "Бисмиллях — начнём!",

  // --- Vaqt va sana ---
  "Vaqtli": "Со временем",
  "vaqtsiz": "без времени",
  "vaqt yo'q": "нет времени",
  "vaqt berish": "задать время",
  "Vaqtni olib tashlash": "Убрать время",
  "Vaqt bilan (daqiqa)": "По времени (минуты)",
  "Aniq vaqt oralig'i bilan": "С точным промежутком времени",
  "Kunlik soat bilan": "По часам в день",
  "kun tartibida vaqti": "время в распорядке дня",
  "Bugundan": "С сегодня",
  "Ertadan": "С завтра",
  "Bir haftadan": "Через неделю",
  "{sana} gacha": "до {sana}",
  "shu davrda": "за этот период",
  "bugun tugadi": "на сегодня всё",
  "Qachondan boshlanadi?": "С какого дня начать?",
  "Qaysi kuni so'ralsin?": "В какой день спрашивать?",
  "HAFTA KUNLARI BO'YICHA": "ПО ДНЯМ НЕДЕЛИ",
  "Tugash sanasi kerak.": "Нужна дата окончания.",
  "Kun hali tugagani yo'q": "День ещё не закончился",
  "Dam kuni edi.": "Это был день отдыха.",
  "Dam olishsiz": "Без дня отдыха",
  "Dam tugadi": "Отдых окончен",
  "Oxirgi 7 kunda": "За последние 7 дней",
  "OXIRGI 90 KUN": "ПОСЛЕДНИЕ 90 ДНЕЙ",
  "Necha soat?": "Сколько часов?",
  "Kuniga necha daqiqa?": "Сколько минут в день?",
  "Qancha vaqtda?": "За какое время?",
  "Qachongacha?": "До какого срока?",
  "Jami nechta?": "Сколько всего?",
  "Umumiy sonni kiriting.": "Введите общее количество.",
  "Yillar sonini tanlang.": "Выберите количество лет.",
  "Yillik sonni kiriting.": "Введите годовое количество.",
  "Oylik yakun": "Итог месяца",

  // --- Belgilash ---
  "Belgilaymizmi?": "Отметим?",
  "Belgini olib tashlash": "Убрать отметку",
  "ta sababli": "по причине",
  "{n} sababli": "{n} по причине",
  "{n} bajarildi": "{n} выполнено",
  "ta ish qoldi": "задач осталось",
  "to'xtatilgan": "приостановлено",
  "tashlab qo'yilgan": "заброшено",
  "o'zgarishsiz": "без изменений",
  "uxlandi": "сон",
  "uxlandi.": "сон.",
  "rejada": "по плану",
  "{n} kam": "{n} меньше",
  "{n} ko'p": "{n} больше",
  "Rejaga muvofiq": "По плану",
  "Rejaga ko'ra uyqu": "Сон по плану",
  "✓ belgilandi": "✓ отмечено",
  "✗ belgilandi": "✗ отмечено",
  "to'liq bajarilgan.": "выполнено полностью.",
  " — rejadan oldin (bonus)": " — раньше срока (бонус)",
  " — rejadan kech": " — позже срока",
  "Muddat tugadi: {a}/{b}": "Срок истёк: {a}/{b}",
  "Amalda:": "Фактически:",
  "bugun: +{n}": "сегодня: +{n}",
  "Davomiyligi: {v}": "Длительность: {v}",
  "Jami ishlangan vaqt:": "Всего отработано:",
  "Eng samarali kun:": "Самый productive день:",
  "Bu hafta o'rtacha:": "Среднее за неделю:",
  "Har kuni kamida": "Я сплю не менее",
  "uxlayman": "каждый день",
  "da uxlayman (~{n} soat)": "(~{n} час)|(~{n} часов)",

  // --- Statistika ---
  "Kunlik faollik": "Дневная активность",
  "Kunlik faollik — 14 kun": "Дневная активность — 14 дней",
  "Haftalar taqqoslashi": "Сравнение недель",
  "Haftalik hisobot": "Недельный отчёт",
  "Vaqt qayerga ketdi": "Куда ушло время",
  "haftalik o'rtacha natija": "среднее за неделю",
  "oylik o'rtacha natija": "среднее за месяц",
  "o'tgan hafta bilan bir xil": "так же, как на прошлой неделе",
  "Statistika hali bo'sh": "Статистика пока пуста",
  "Ma'lumot hali yo'q.": "Данных пока нет.",
  "to'liq hisobotni ko'rish": "смотреть полный отчёт",
  "Ma'lumot hali yetarli emas": "Данных пока недостаточно",

  // --- Uyqu ---
  "Uxlash va turish vaqti": "Время сна и подъёма",
  "Hali uyqu yozuvi yo'q.": "Записей о сне пока нет.",
  "yana uxladingizmi? soat": "спали ещё? часов",
  "Sifatli uyqu uchun maslahatlar": "Советы для хорошего сна",

  // --- Pomodoro ---
  "Pomodoro — rejim tanlang": "Помодоро — выберите режим",
  "Boshlashga tayyor": "Готов начать",
  "Ochiq rejim": "Открытый режим",
  "Ish vaqti tugadi": "Рабочее время закончилось",
  "daq · Dam:": "мин · Отдых:",
  "Nima ish qildingiz?": "Чем вы занимались?",
  "Qaysi vazifaga tegishli?": "К какой задаче относится?",
  "Vazifa turi orqali": "По типу задачи",
  "vazifa turi orqali": "по типу задачи",
  "Boshqa — mustaqil ish": "Другое — отдельная работа",

  // --- Vazifa va maqsad ---
  "Vazifalar tarixi": "История задач",
  "Vazifa nomini yozing.": "Напишите название задачи.",
  "Yangi {x} vazifa": "Новая задача: {x}",
  "Oliy maqsad vazifasi": "Задача высшей цели",
  "Oliy maqsad vazifalari": "Задачи высшей цели",
  "Oliy maqsad belgilash": "Задать высшую цель",
  "Oliy maqsadni tahrirlash": "Изменить высшую цель",
  "Maqsad nomini yozing.": "Напишите название цели.",
  "ta maqsad belgilangan": "целей задано",
  "yillik maqsad": "годовая цель",
  "ta bo'ladi (maqsad —": "(цель —",
  "REJADAN TASHQARI AMALLAR": "ДОПОЛНИТЕЛЬНЫЕ РАБОТЫ",
  "Vaqtincha to'xtatish": "Приостановить",
  "Tashlab qo'yish": "Забросить",
  "(shu tur bir papka)": "(этот тип — одна папка)",
  "Oddiy ro'yxat": "Простой список",
  "+ Ro'yxatga qo'shish": "+ Добавить в список",
  "Nima qo'shamiz?": "Что добавим?",
  "Sanaladigan": "Подсчитываемая",
  "SANALADIGAN": "ПОДСЧЁТ",
  "qo'lda (+1)": "вручную (+1)",
  "O'zim sanayman": "Считаю сам",
  "O'lchov": "Мера",
  "Kuchli tomon": "Сильная сторона",
  "Vazn kamayishi (kg)": "Снижение веса (кг)",
  "Masalan: 10": "Например: 10",
  "Masalan: 30": "Например: 30",
  "Masalan: 100 ta dars.": "Например: 100 уроков.",
  "Masalan: Abdulloh": "Например: Абдулла",
  "Masalan: Kitob o'qish": "Например: Чтение книг",
  "Masalan: Video darslar": "Например: Видеоуроки",

  // --- Xulosa, eslatma, sozlama ---
  "Yangi xulosa...": "Новая заметка...",
  "Hali xulosa yo'q.": "Заметок пока нет.",
  "Xulosani tahrirlang...": "Измените заметку...",
  "Xulosa o'chirilsinmi?": "Удалить эту заметку?",
  "Rejadan tashqari amal o'chirilsinmi?": "Удалить эту дополнительную работу?",
  "Qo'shimcha eslatma": "Дополнительное напоминание",
  "Eslatma matni...": "Текст напоминания...",
  "Eslatmani o'qish": "Прочитать напоминание",
  "Fikringiz...": "Ваше мнение...",
  "{nom} vaqti keldi": "Время для {nom}",
  "Qo'shimcha sozlamalar": "Дополнительные настройки",
  "Majburiy bo'lim": "Обязательный раздел",
  "Rejani o'chirish": "Удалить план",
  "Rejangiz tayyor.": "Ваш план готов.",
  "Saqlab bo'lmadi": "Не удалось сохранить",
  "Oxirgi zaxira": "Последняя копия",
  "Oxirgi tasdiq": "Последнее подтверждение",
  "hali olinmagan": "ещё не создана",
  "PDF o'rnatish": "Установить из PDF",
  "Pastdagi": "Тот, что ниже",
  "E'tibor bering": "Обратите внимание",
  "shu nom": "это имя",
  "do'stim": "друг мой",
  "Shu sabab ey": "Итак, о",
  "(bo'sh — doimiy)": "(пусто — бессрочно)",
  "Yangilanish sanasi": "Дата обновления",
  "Ha, yuklansin": "Да, скачать",
  "Ha, tayyorman": "Да, я готов",
  "Ha, istayman": "Да, хочу",
  "Ha, o'taman": "Да, перейду",
  "Ha, o'chirilsin": "Да, удалить",
  "Ha, o'rnatilsin": "Да, установить",
  "Yo'q, hozir emas": "Нет, не сейчас",
  "Yo'q, hozir kerak emas": "Нет, сейчас не нужно",
  "Ismingiz nima?": "Как вас зовут?",
  "Qaysi tilni tanlaysiz?": "Какой язык выберете?",
  "To'g'ri, davom etamiz": "Верно, продолжим",

  // --- Yordam va tur sarlavhalari ---
  "Qo'shish (+)": "Добавление (+)",
  "Maqsad bo'limi": "Раздел цели",
  "Qo'shish tugmasi": "Кнопка добавления",
  "Bugun sahifasi": "Страница «Сегодня»",

  // ===== 3-to'plam: jumlalar va uzun matnlar =====

  // --- Diniy matnlar ---
  // Oyat — Э. Кулиев tarjimasi (rus tilida keng qabul qilingan).
  // Hadis — mashhur rivoyat. Ikkalasi ham TEKSHIRILISHI kerak.
  "Ey mo'minlar! Sabr qilinglar va sabr-toqat qilishda ustun bo'linglar hamda doimo belingiz bog'liq bo'lib turingiz! Va Allohdan qo'rqingiz! Shoyad najot topgaysizlar!": "О те, которые уверовали! Будьте терпеливы, запасайтесь терпением, несите службу на заставах и бойтесь Аллаха, — быть может, вы преуспеете.",
  "Oisha roziyallohu anhodan rivoyat qilindi: «Nabiy sollallohu alayhi vasallamdan: “Amallarning qay biri Allohga eng suyukli?” deb so'rashdi. U zot:": "Передаётся от Аиши (да будет доволен ею Аллах): Пророка ﷺ спросили: «Какие дела наиболее любимы Аллаху?» Он сказал:",
  "“Oz bo'lsa ham, davomlirog'i”": "«Самые постоянные, даже если они малы»",
  ", dedilar. Yana: “Amallardan toqatingiz yetadiganini zimmangizga olinglar”, dedilar.»": ". И добавил: «Берите на себя лишь те дела, которые вам по силам».",
  "Sahihul Buxoriy, 81-kitob, 6465-hadis.": "Сахих аль-Бухари, книга 81, хадис 6465.",
  ", solih amallardan bardavom bo'l! Garchi u oz bo'lsa ham. Alloh taolo kuch-quvvat bersin!": ", будь постоянен в праведных делах! Пусть даже они малы. Да укрепит тебя Всевышний Аллах!",
  "Alloh taolo maqsadingizga yetishga sizga kuch-quvvat va bardavomlik ato etsin.": "Да дарует вам Всевышний Аллах силу и постоянство в достижении вашей цели.",
  "Men sizga Oliy maqsadingizga erishishingiz uchun ko'makdosh bo'laman, biiznillah.": "Я буду вам помощником в достижении вашей высшей цели, би изнилляh.",
  "Dam tugadi — yangi pomodoroni o'zingiz boshlaysiz. Bismillah!": "Отдых окончен — следующий помодоро начинаете сами. Бисмиллях!",
  "Ibodatlar bo'limi uchun bir savol": "Один вопрос для раздела поклонения",
  "Bu hafta ibodat belgilanmagan.": "На этой неделе поклонение не отмечено.",
  "Xatm {sana} dan boshlanadi": "Хатм начинается с {sana}",
  "Xatm rejasi o'chirilsinmi? (kunlik belgilar tarixda qoladi)": "Удалить план хатма? (ежедневные отметки останутся в истории)",
  "Namoz belgilash to'g'ri sozlanishi uchun jinsingizni tanlang (bir marta so'raladi, saqlanadi):": "Выберите пол, чтобы отметки намаза настроились правильно (спрашивается один раз и сохраняется):",
  "Erkaklarda har namozda «masjidda o'qidim» tugmasi bo'ladi — reytingda balandroq baholanadi.": "У мужчин при каждом намазе есть кнопка «читал в мечети» — она оценивается выше.",
  "Kunlik vazifalar foiziga aralashmaydi — alohida hisoblanadi. Masjid va nafllar bonus beradi.": "Не влияет на процент ежедневных задач — считается отдельно. Мечеть и нафли дают бонус.",
  "Zikr, besh vaqt namoz, nafllar va Qur'on xatmi shu yerda belgilanadi. Alohida hisoblanadi — kundalik foizga aralashmaydi.": "Здесь отмечаются зикр, пять намазов, нафли и хатм Корана. Считается отдельно — не влияет на дневной процент.",
  "Zikrlar, besh vaqt namoz, nafl namozlar va Qur'on xatmi. Bu bo'lim kundalik vazifalar foiziga aralashmaydi, alohida hisoblanadi. Masjidda o'qilgan namoz va nafllar reytingni oshiradi.": "Зикры, пять намазов, нафль-намазы и хатм Корана. Этот раздел не влияет на процент ежедневных задач, считается отдельно. Намаз в мечети и нафли повышают оценку.",

  // --- Uyqu ---
  "Hali uyqu rejasi yo'q — quyida sozlang. Reja qo'yilgach, Bugun sahifasida har kuni belgilab borasiz.": "Режима сна пока нет — настройте ниже. После этого будете отмечать его каждый день на странице «Сегодня».",
  "Kuniga faqat bir marta belgilanadi. Kam uxlash — yuqori reyting.": "Отмечается только один раз в день. Меньше сна — выше оценка.",
  "Eslatma: bu ilovada uyqu reytingi teskari — rejadan KAM uxlash yuqori baholanadi.": "Примечание: в этом приложении оценка сна обратная — спать МЕНЬШЕ плана оценивается выше.",
  "Belgilagach qaytarib o'zgartirib bo'lmaydi. Keyin yana uxlasangiz + bilan qo'shasiz.": "После отметки изменить нельзя. Если поспите ещё — добавьте кнопкой +.",
  "Avval necha soat uxlaganingizni kiriting.": "Сначала введите, сколько часов вы спали.",
  "soat. Rejadan kam uxlash yuqori baholanadi.": "часов. Сон меньше плана оценивается выше.",
  "Rejadan {n} soat kam uxladingiz — reyting yuqori": "Вы спали на {n} час меньше плана — оценка высокая|Вы спали на {n} часов меньше плана — оценка высокая",
  "Rejadan {n} soat ko'p uxladingiz — reyting pasayadi": "Вы спали на {n} час больше плана — оценка снижается|Вы спали на {n} часов больше плана — оценка снижается",
  "Uxlashdan 1 soat oldin ekranlardan uzoqlashing va yengil kitob o'qing. Uxlashdan oldingi zikrlarni unutmang.": "За час до сна отложите экраны и почитайте лёгкую книгу. Не забывайте зикры перед сном.",
  "Uyqu rejasi o'chirilsinmi?": "Удалить режим сна?",
  "Bu hafta uyqu yozilmagan.": "На этой неделе сон не записан.",
  "Hozirgi vazningiz qancha? (haftalik o'lchov)": "Каков ваш текущий вес? (еженедельное измерение)",
  "Vazningizni nazorat qilib borishni istaysizmi?": "Хотите следить за своим весом?",
  "Vaznimni kuzatib boraman.": "Буду следить за весом.",
  "Necha kg kamaytirmoqchisiz?": "На сколько кг хотите похудеть?",

  // --- Pomodoro ---
  "Ekran qorayadi, faqat taymer va bugungi hisob ko'rinadi, ekran o'chmaydi. Chuqur diqqat uchun telefonning «Bezovta qilinmasin» rejimini ham yoqib qo'ying.": "Экран затемняется, остаются только таймер и счёт за сегодня, экран не гаснет. Для глубокого сосредоточения включите также режим «Не беспокоить».",
  "Ilovadan bemalol chiqishingiz mumkin — vaqt tugaganda telefon o'zi xabar beradi.": "Можете спокойно выйти из приложения — телефон сам сообщит, когда время выйдет.",
  "Taymer to'xtatilsinmi? (bu pomodoro hisobga kirmaydi)": "Остановить таймер? (этот помодоро не засчитается)",
  "Yangi pomodoroni o'zingiz boshlaysiz.": "Следующий помодоро начинаете сами.",
  "Ish vaqti tugadi! Bu vaqtda nima qilganingizni belgilang.": "Рабочее время закончилось! Отметьте, чем вы занимались.",
  "Bu vaqtda nima qilganingizni belgilang.": "Отметьте, чем вы занимались в это время.",
  "Bu vaqtda nima qildingiz? Tanlangan vazifaga": "Чем вы занимались в это время? К выбранной задаче",
  "bu vaqtda nima qildingiz?": "чем вы занимались в это время?",
  "Qaysi vazifaga tegishli ekanini tanlang (yoki «Boshqa»).": "Выберите, к какой задаче это относится (или «Другое»).",
  "Qancha vaqt sarflaganingizni kiriting.": "Введите, сколько времени вы потратили.",
  "Boshqa ish — vazifalarga yozilmasin": "Другая работа — не записывать ни к одной задаче",
  "Nima ish qilganingizni yozing.": "Напишите, чем вы занимались.",
  "hisoblanadi — qismiy bajarilish beradi, ortiqchasi «qo'shimcha»ga o'tadi.": "засчитывается — даёт частичное выполнение, а излишек переходит в «сверх нормы».",
  "Ikki rejim bor. Fokusda ekran qorayadi va faqat taymer qoladi. Ochiq rejimda ilovadan chiqib ketsangiz ham vaqt tugaganda telefon xabar beradi. Ishlagan daqiqalaringiz tanlagan vazifangizga qo'shiladi.": "Есть два режима. В фокусе экран затемняется и остаётся только таймер. В открытом режиме телефон уведомит вас по окончании времени, даже если вы вышли из приложения. Отработанные минуты добавляются к выбранной задаче.",
  "Diqqatni bir joyga jamlab ishlash uchun taymer. Ishlagan vaqtingiz tegishli vazifaga o'zi yozib boriladi.": "Таймер для сосредоточенной работы. Отработанное время само записывается к нужной задаче.",

  // --- Vazifa ---
  "Hali vazifa yo'q. Yuqoridagi tugma orqali qo'shing.": "Задач пока нет. Добавьте кнопкой выше.",
  "Bugunga vazifa yo'q. Vazifalar ro'yxati orqali qo'shing.": "На сегодня задач нет. Добавьте из списка задач.",
  "Bu kunga vazifa yo'q edi.": "На этот день задач не было.",
  "Hali oliy maqsad vazifasi yo'q.": "Задач высшей цели пока нет.",
  "Vazifa nomi bo'yicha qidirish...": "Поиск по названию задачи...",
  "Bu hafta — oliy vazifalar": "На этой неделе — высшие задачи",
  "Tugatilgan oliy vazifalar:": "Завершённые высшие задачи:",
  "Vaqti belgilanmagan vazifalar:": "Задачи без указанного времени:",
  "Har kuni takrorlanadigan ish": "Работа, повторяющаяся каждый день",
  "Katta maqsadga eltuvchi ish": "Работа, ведущая к большой цели",
  "Tugash vaqti boshlanishdan keyin bo'lsin": "Время окончания должно быть после начала",
  "Tugash vaqti boshlanishdan keyin bo'lishi kerak.": "Время окончания должно быть позже времени начала.",
  "Tugash sanasi boshlanishdan keyin bo'lishi kerak.": "Дата окончания должна быть позже даты начала.",
  "Taxminan necha kunda tugataman?": "Примерно за сколько дней завершу?",
  "Sanaladigan vazifada muddat majburiy — qachongacha yetkazasiz?": "Для подсчитываемой задачи срок обязателен — к какому времени успеете?",
  "Vazifaning kunlik vaqti {v} — undan KAM vaqt ajratib bo'lmaydi.": "Дневное время задачи {v} — выделить МЕНЬШЕ нельзя.",
  "Bu vazifani tugatdingizmi? Tabriklaymiz!": "Вы завершили эту задачу? Поздравляем!",
  "Vazifani tashlab qo'yasizmi? Bu statistikada salbiy iz qoldiradi.": "Забросить задачу? Это оставит отрицательный след в статистике.",
  "Bu vazifa hali boshlanmagan. Butunlay o'chirilsinmi?": "Эта задача ещё не начата. Удалить полностью?",
  "Arxivlansinmi? Tarixi saqlanadi, ro'yxatdan chiqadi.": "Отправить в архив? История сохранится, из списка исчезнет.",
  "Ko'pi bilan 7 kun. Undan ortig'i — vazifani tashlab qo'yish hisoblanadi.": "Максимум 7 дней. Дольше — считается, что задача заброшена.",
  "«{nom}» necha kunga to'xtatilsin? To'xtatilgan kunlar statistikaga kirmaydi.": "На сколько дней приостановить «{nom}»? Приостановленные дни не входят в статистику.",
  "Tartibni o'zgartiring — birinchi vazifa «Keyingi vazifa» kartasida chiqadi.": "Измените порядок — первая задача появится на карточке «Следующая задача».",
  "Vaqtlar faqat reja uchun — belgilashni kun davomida istalgan payt qilasiz.": "Время нужно только для плана — отмечать можно в любой момент дня.",
  "Vazifaga tegishli bo'lsa — o'sha vazifaga «qo'shimcha» qo'shiladi va statistikaga kiradi.": "Если относится к задаче — к ней добавится «сверх нормы» и войдёт в статистику.",
  "Rejadan ortiq ish qilsangiz — Bugun bo'limidagi «Rejadan tashqari amallar» bo'limiga yozing. Vijdon — eng adolatli guvoh.": "Если сделали больше плана — запишите в раздел «Дополнительная работа» на странице «Сегодня». Совесть — самый справедливый свидетель.",
  "Masalan: qo'shimcha kitob o'qidim": "Например: прочитал дополнительную книгу",
  "«{nom}» — {k}-kun (reja: {r} kun). Shoshilmang, lekin rejani ham unutmang.": "«{nom}» — день {k} (план: {r} дней). Не спешите, но и о плане не забывайте.",
  "«{nom}» vazifasini boshlaysiz.": "вы начнёте задачу «{nom}».",
  "«{nom}» so'nggi 30 kunda {n} marta sababli qoldirildi. Balki og'irlik qilayotgandir? Yengillashtirishingiz mumkin.": "«{nom}» была пропущена по причине {n} раз за последние 30 дней. Возможно, она тяжела? Её можно облегчить.",
  "Sababli: {n} marta (joriy 30 kunlik: {m}/3)": "По причине: {n} раз (текущие 30 дней: {m}/3)",
  "Bu vaqt «{nom}» ({a}–{b}) bilan to'qnashadi.": "Это время пересекается с «{nom}» ({a}–{b}).",
  "Pomodoro orqali {v} hisoblangan.": "Через помодоро засчитано {v}.",
  "Kunlik vaqti: {v}. Ortiqcha ajratilgan vaqt belgilashda «qo'shimcha»ga o'tadi.": "Дневное время: {v}. Излишне выделенное время при отметке уйдёт в «сверх нормы».",
  "(shu tur bir papka bo'ladi)": "(этот тип станет отдельной папкой)",
  "(shu vaqtda eslatma keladi)": "(в это время придёт напоминание)",
  "yoki yangi tur yozing...": "или напишите новый тип...",

  // --- Maqsad ---
  "Oliy maqsadlaringizni belgilang": "Задайте свои высшие цели",
  "Oliy maqsadingizni yozing...": "Напишите свою высшую цель...",
  "Hali oliy maqsad belgilanmagan": "Высшая цель ещё не задана",
  "Maqsadingizni iloji boricha aniq va batafsil yozing.": "Опишите свою цель как можно точнее и подробнее.",
  "Rejani qaytadan tuzasizmi?": "Перестроить план?",
  "Rejani qaytadan tuzish": "Перестроить план",
  "Hammasini o'chirib, boshidan boshlash": "Удалить всё и начать заново",
  "Maqsadingizga umumiy qancha vaqtda yetishni niyat qilgansiz?": "За какое время вы намерены достичь своей цели?",
  "Qachondan boshlaysiz?": "Когда хотите начать?",
  "Masalan: 5 yil ichida kasbimda yetuk mutaxassis bo'lish va sog'lom turmush tarziga o'tish...": "Например: за 5 лет стать зрелым специалистом в своей профессии и перейти к здоровому образу жизни...",
  "Yillik raqamli maqsad — masalan 10 kitob": "Годовая числовая цель — например 10 книг",
  "Yillik raqamli maqsadlar hali yo'q — bosib qo'shing": "Годовых числовых целей пока нет — нажмите, чтобы добавить",
  "Yil davomida nimani nechta qilmoqchisiz? Masalan «10 kitob», «100 dars».": "Сколько и чего хотите сделать за год? Например «10 книг», «100 уроков».",
  "Yil davomida nimani nechta qilishni belgilang — masalan «yiliga 10 kitob», «100 dars». Bu raqamlar Maqsad bo'limidagi natijani yuritadi.": "Задайте, сколько и чего сделаете за год — например «10 книг в год», «100 уроков». Эти числа ведут прогресс в разделе «Цель».",
  "«{nom}» turidagi oliy vazifa tugatilganda hisob o'zi +1 bo'ladi.": "При завершении высшей задачи типа «{nom}» счётчик сам увеличится на 1.",
  "Bu maqsad qo'lda sanaladi — Bugun sahifasidagi «+1» tugmasi bilan.": "Эта цель считается вручную — кнопкой «+1» на странице «Сегодня».",
  "Bugun bo'limida «+1» tugmasi chiqadi — har safar o'zingiz bosasiz.": "В разделе «Сегодня» появится кнопка «+1» — нажимаете её сами каждый раз.",
  "Kunlik miqdor qanday o'lchanadi?": "Как измеряется дневной объём?",
  "Kunlik miqdorni kiriting!": "Введите дневной объём!",
  "Yiliga nechta? (masalan 10)": "Сколько в год? (например 10)",
  "Shunday davom etsangiz, yil oxirida taxminan": "При таком темпе к концу года будет примерно",
  "{n} yillik maqsadlaringiz uchun rejangizni tuzishga tayyormisiz?": "Готовы составить план для своих целей на {n} лет?",
  "Hozircha faqat birinchi yil vazifalarini belgilaysiz. Yil tugagach keyingi yilnikini qo'shasiz — o'tgan yil ma'lumotlari saqlanib qoladi ({n} yillik reja shunday boriladi).": "Пока вы задаёте задачи только на первый год. По его окончании добавите задачи следующего года — данные прошедшего года сохранятся (так ведётся план на {n} лет).",
  "Avval shu yerda oliy maqsadingizni yozasiz — nimaga erishmoqchisiz va necha yilda. Yillik raqamli maqsadlar ham shu yerda turadi.": "Сначала здесь вы пишете свою высшую цель — чего хотите достичь и за сколько лет. Годовые числовые цели тоже здесь.",
  "Oliy maqsadingiz matni, natija halqasi va yillik raqamli maqsadlaringiz shu yerda. Har maqsadni bosib jarayonini ko'rasiz — hafta, oy, olti oy va yil bo'yicha. Ko'p yillik rejada har yil alohida yuritiladi: yil tugagach keyingi yil vazifalarini qo'shasiz, eskisi saqlanib qoladi.": "Здесь текст вашей высшей цели, кольцо результата и годовые числовые цели. Нажмите на любую цель, чтобы увидеть её прогресс — за неделю, месяц, полгода и год. В многолетнем плане каждый год ведётся отдельно: по окончании года добавляете задачи следующего, а прежние сохраняются.",
  "Maqsadga eltuvchi vazifalarni shu tugma orqali qo'shasiz. Kundalik vazifa ham, oliy maqsad vazifasi ham shu yerdan.": "Задачи, ведущие к цели, добавляются этой кнопкой — и ежедневные, и задачи высшей цели.",
  "Uch xil narsa qo'shiladi: har kuni takrorlanadigan kundalik vazifa, katta maqsadga eltuvchi oliy vazifa, va yillik raqamli maqsad. Har vazifaga vaqt oralig'i berilsa, o'sha payt telefonga eslatma keladi — ilova yopiq bo'lsa ham.": "Добавляются три вещи: ежедневная задача, повторяющаяся каждый день, высшая задача, ведущая к большой цели, и годовая числовая цель. Если задаче задан промежуток времени, в этот момент придёт напоминание — даже если приложение закрыто.",

  // --- Kun, hafta, dam ---
  "Bugun dam oling! Yaxshi dam — mehnatga hamdam": "Сегодня день отдыха — отдохните",
  "Dam kuni foizga kirmaydi — bemalol dam oling.": "День отдыха не входит в процент — это день покоя.",
  "Haftalik dam olish kuningizni belgilang!": "Выберите свой еженедельный день отдыха!",
  "Hafta qaysi kundan boshlansin?": "С какого дня начинается неделя?",
  "Haftalik statistika shu kundan hisoblanadi.": "Недельная статистика считается с этого дня.",
  "Yaxshi hordiq oling. Hafta yakunini ko'rib chiqing.": "Хорошо отдохните. Просмотрите итоги недели.",
  "Ajoyib — bugungi reja to'liq bajarildi": "Отлично — план на сегодня выполнен полностью",
  "Yarmidan oshdingiz — davom eting": "Вы прошли половину — продолжайте",
  "Yaxshi ketyapsiz, oz qoldi": "Идёте хорошо, осталось немного",
  "Rejadan biroz ortdasiz — bugun bir oz ko'proq harakat qiling.": "Вы немного отстаёте от плана — постарайтесь сегодня чуть больше.",
  "Bugungi ishlaringizni tekshirib qo'ying.": "Проверьте свои дела за сегодня.",
  "Bugun qanday o'tdi? (bir jumla — Taqvimda saqlanadi)": "Как прошёл день? (одно предложение — сохранится в календаре)",
  "O'tgan kunlar o'zgartirilmaydi.": "Прошедшие дни изменить нельзя.",
  "Oylik yakun oyning oxirgi dam kunida ochiladi.": "Итог месяца открывается в последний день отдыха месяца.",
  "Sababingiz qanchalik o'rinli? (1 — bahona, 10 — chindan uzr)": "Насколько уважительна ваша причина? (1 — отговорка, 10 — действительно уважительная)",
  "(ixtiyoriy — erta tugatsangiz reyting oshadi)": "(необязательно — досрочное завершение повышает оценку)",
  "Bu hafta vaqt yozilmagan.": "На этой неделе время не записано.",
  "Boshlanish sanasini belgilang.": "Укажите дату начала.",
  "Qaysi vaqt oralig'ida qilasiz?": "В какой промежуток времени будете делать?",
  "Keyingi 7 kun davomida qayta o'zgartirib bo'lmaydi.": "В течение следующих 7 дней изменить снова нельзя.",
  "Quyidagilar keyin o'zgartirilmaydi:": "Следующее нельзя изменить позже:",
  "Kunning yuragi shu yerda. Har kuni vazifalarni belgilab borasiz — qildim, sababli qilmadim yoki umuman qilmadim.": "Сердце дня здесь. Каждый день вы отмечаете задачи — выполнил, не выполнил по причине или совсем не выполнил.",
  "Har kuni shu yerdan boshlaysiz. Vazifa katakchasini bosganingizda belgilash oynasi ochiladi. Rejadan ortiq ish qilsangiz «Rejadan tashqari amallar» bo'limiga yozasiz — u tegishli vazifaga «qo'shimcha» bo'lib qo'shiladi.": "Каждый день вы начинаете отсюда. При нажатии на квадрат задачи открывается окно отметки. Если сделали больше плана — запишите в «Дополнительную работу», и это добавится к нужной задаче как «сверх нормы».",

  // --- Ma'lumot va zaxira ---
  "Ma'lumotlaringiz telefon xotirasiga saqlanadi": "Ваши данные хранятся в памяти телефона",
  "Ma'lumot almashtirilsinmi?": "Заменить данные?",
  "Fayldagi ma'lumot ilovaga yuklanadi": "Данные из файла загрузятся в приложение",
  "Hozirgi barcha ma'lumotlaringiz fayldagi bilan almashtiriladi. Bu amalni ortga qaytarib bo'lmaydi.": "Все ваши текущие данные будут заменены данными из файла. Отменить это действие невозможно.",
  "«O'rnatish» amaldagi ma'lumotni almashtiradi — ogohlantiriladi.": "«Установить» заменяет текущие данные — вас предупредят.",
  "Bu fayl Oliy Maqsad zaxirasi emas.": "Это не резервная копия «Высшей цели».",
  "Fayl buzilgan yoki boshqa ilovaniki bo'lishi mumkin.": "Файл повреждён или принадлежит другому приложению.",
  "Bu amalni ortga qaytarib bo'lmaydi. Rostdan ham hammasini o'chirasizmi?": "Это действие необратимо. Вы действительно хотите удалить всё?",
  "Ushbu amal barcha ma'lumotlaringizni o'chiradi: vazifalar, belgilashlar, statistika. Ortga qaytarib bo'lmaydi.": "Это действие удалит все ваши данные: задачи, отметки, статистику. Отменить невозможно.",
  "Ma'lumotlaringiz PDF shaklida yuklansinmi?": "Скачать ваши данные в виде PDF?",
  "O'chirishdan oldin zaxira saqlab qo'yish tavsiya etiladi.": "Перед удалением рекомендуется сохранить резервную копию.",
  "Kirish sahifasi qaytadan ochiladi, lekin barcha tarix — belgilashlar, vazifalar, xulosalar — saqlanadi.": "Начальная страница откроется заново, но вся история — отметки, задачи, заметки — сохранится.",
  "Zaxira nusxa olganingizga ancha bo'ldi — Sozlamalardan yuklab oling.": "Давно не делали резервную копию — скачайте её в настройках.",
  "Majburiy bo'lim — to'ldirish shart!": "Обязательный раздел — заполнение необходимо",
  "Rejani tuzishni boshlaymiz.": "Начнём составлять план.",
  "Iltimos, ismingizni kiriting.": "Пожалуйста, введите ваше имя.",
  "Keyinroq davom ettiraman.": "Продолжу позже.",
  "Keyinroq sozlashim mumkin.": "Смогу настроить позже.",
  "Zaxira, qo'llanma, maqsadni qayta tuzish": "Копия, руководство, перестройка цели",

  // --- Yordam, kanal, til ---
  "Ilovani ishlatish bo'yicha qo'llanma": "Руководство по использованию",
  "tugmasi orqali kundalik yoki oliy maqsad vazifasini qo'shing.": "чтобы добавить ежедневную задачу или задачу высшей цели.",
  "Vazifa qo'shib, bir necha kun belgilab boring — natijalar, grafiklar va haftalik hisobot shu yerda ko'rinadi.": "Добавьте задачу и отмечайте её несколько дней — здесь появятся результаты, графики и недельный отчёт.",
  "Telegram ilovasi ochiladi.": "Откроется приложение Telegram.",
  "Masalan: yaxshi, unumli kun bo'ldi...": "Например: день был хорошим и продуктивным...",
  "Masalan: Ingliz tili darsi": "Например: Урок английского",
  "Masalan: Qur'on o'qish, sport...": "Например: чтение, спорт...",
  "Ilova tilini tanlang. Til istalgan vaqtda o'zgartirilishi mumkin.": "Выберите язык приложения. Язык можно изменить в любое время.",
  "Til o'zgartirilganda ba'zi ma'lumotlar qayta yuklanishi mumkin.": "При смене языка некоторые данные могут перезагрузиться.",
  "Ilova bilan tanishib chiqasizmi?": "Хотите познакомиться с приложением?",
  "Asosiy bo'limlarni qisqacha ko'rsataman — bir daqiqa vaqt oladi. Keyinroq Sozlamalar → Ma'lumotlar dan qayta ochishingiz mumkin.": "Кратко покажу основные разделы — это займёт около минуты. Позже можно открыть снова в Настройках → Данные.",
  "Bu ilova bir narsaga xizmat qiladi: katta maqsadingizni har kungi kichik ishlarga bo'lib berish va ularni halol hisobda yuritish. Keling, asosiy joylarni ko'rsataman.": "Это приложение служит одному: разбить вашу большую цель на маленькие ежедневные дела и вести им честный счёт. Давайте покажу основные места.",
  "Ilovaning maqsadi — uzoq yo'lni har kungi kichik qadamlarga bo'lish. Siz maqsad qo'yasiz, unga olib boradigan vazifalarni belgilaysiz, ilova esa bajarganingizni halol hisobda yuritadi. Vijdon — eng adolatli guvoh.": "Цель приложения — разбить долгий путь на маленькие ежедневные шаги. Вы ставите цель, определяете ведущие к ней задачи, а приложение честно ведёт счёт сделанному. Совесть — самый справедливый свидетель.",
  "Shoshilmang — tayyor bo'lganingizda \"Ha\"ni tanlang. Eng muhimi — niyat.": "Не спешите — выберите «Да», когда будете готовы. Главное — намерение.",
  "Yangi hijriy oy boshlandi. Sana to'g'ri ko'rsatilyaptimi? Kerak bo'lsa bir kunga suring.": "Начался новый месяц по хиджре. Дата отображается верно? При необходимости сдвиньте на день.",
  "Qidiruv natijalari ({n})": "Результаты поиска ({n})",
  "Barakalla, {nom}! Bugungi barcha ishlar bajarildi": "Молодец, {nom}! Все дела на сегодня выполнены",

  // --- Yangiliklar oynasi (v10) ---

  // --- Yangiliklar oynasi (v11) ---
  "Ish vaqti tugagach \"bu vaqtda nima qildingiz?\" deb so'raydi va tanlangan vazifaga daqiqa yozadi.": "По окончании рабочего времени спрашивает «чем вы занимались в это время?» и записывает минуты к выбранной задаче.",

  // --- v12: dumaloq tugmalar ---
  "Rejadan ortiq ish qilsangiz shu yerga yozasiz. U tegishli vazifaga «ziyoda» bo'lib qo'shiladi va statistikada foizni 100% dan yuqoriga chiqaradi.": "Сюда записывайте всё, что сделали сверх плана. Это добавится к нужной задаче как «сверх нормы» и поднимет процент выше 100%.",

  // --- v12: kirishdagi yangi/zaxira tanlovi ---
  "Yangi boshlayman": "Начинаю заново",

  // --- v12: vazifani bosib turib tahrirlash ---
  "Tahrirlash": "Изменить",
  "Nomi, vaqti, kunlari va turi": "Название, время, дни и тип",
  "Tarixi bo'lsa arxivga tushadi": "Если есть история — уйдёт в архив",
  "yoki mavjudlarini boshqaring": "или управляйте существующими",
  "Ko'rish, tahrirlash, papkalarga ajratish, arxiv": "Просмотр, изменение, распределение по папкам, архив",

  // --- v12: namoz ixcham qatori ---
  "masjidda o'qildi": "прочитано в мечети",

  // --- v12: ma'lumotnoma qayta yozildi ---
  "Xatm rejasini tahrirlash": "Изменить план хатма",
  "Har bo'lim nima qiladi?": "Что делает каждый раздел?",
  "Bo'limlar va tugmalar batafsil izohlangan — o'qib chiqiladi": "Разделы и кнопки описаны подробно — для чтения",
  "Ilova bo'ylab qadam-baqadam yuriladi — ko'rsatib boriladi": "Пошаговая прогулка по приложению — каждое место показывается",
  "Oy": "Месяц",
  "6 oy": "6 месяцев",
  "Vazifani belgilash": "Отметка задачи",
  "Vazifa vaqti va eslatma": "Время задачи и напоминание",
  "Papkalar": "Папки",
  "Zaxira nusxa": "Резервная копия",
  "Kunduzgi va tungi ko'rinish": "Светлый и тёмный вид",
  "Kunning yuragi. Eng yuqorida bugungi natija halqasi — nechta vazifa bajarilgani va foizi. Ostida bugun bajariladigan vazifalar. Vaqt belgilangan vazifalar soat tartibida chiqadi.": "Сердце дня. В самом верху — кольцо результата за сегодня: сколько задач выполнено и процент. Ниже — задачи на сегодня. Задачи с заданным временем идут по часам.",
  "Vazifa katakchasini bosing — pastdan belgilash oynasi chiqadi. Uch javob bor: «qildim», «sababli qilmadim» (kasallik, safar kabi — bu statistikani pasaytirmaydi) va «qilmadim». Katakchani bir soniya bosib tursangiz tahrirlash va o'chirish tugmalari chiqadi.": "Нажмите на ячейку задачи — снизу появится окно отметки. Три ответа: «сделал», «не сделал по уважительной причине» (болезнь, поездка — это не снижает статистику) и «не сделал». Удержите ячейку около секунды — появятся кнопки «Изменить» и «Удалить».",
  "Pastdagi katta yashil tugma. Undan uch narsa qo'shiladi: har kuni takrorlanadigan kundalik vazifa, katta maqsadga eltuvchi oliy vazifa va yillik raqamli maqsad. Eng pastdagi «Barcha vazifalar» esa qo'shish uchun emas — bor vazifalarni ko'rish va boshqarish uchun.": "Большая зелёная кнопка внизу. Из неё добавляются три вещи: ежедневная задача, повторяющаяся каждый день, задача высшей цели и годовая числовая цель. А «Все задачи» в самом низу — не для добавления, а для просмотра и управления тем, что уже есть.",
  "Har vazifaga vaqt oralig'i beriladi — masalan 08:00–09:00. O'sha vaqt kelganda telefonga eslatma keladi, ilova yopiq bo'lsa ham. Vazifa haftaning qaysi kunlari bajarilishini ham tanlaysiz.": "Каждой задаче можно задать промежуток времени — например 08:00–09:00. Когда это время наступит, на телефон придёт напоминание, даже если приложение закрыто. Вы также выбираете, в какие дни недели выполняется задача.",
  "Vazifalar ko'payib ketganda ularni papkalarga ajratasiz — masalan «Ilm», «Sog'liq», «Ish». Papkalar «Barcha vazifalar» bo'limida yaratiladi va vazifa ro'yxati shunga qarab guruhlanadi.": "Когда задач становится много, вы раскладываете их по папкам — например «Знание», «Здоровье», «Работа». Папки создаются в разделе «Все задачи», и список задач группируется по ним.",
  "Rejadan ortiq ish qilgan kuningiz shu yerga yozasiz. U tegishli vazifaga «ziyoda» bo'lib qo'shiladi va statistikada foizni 100% dan yuqoriga chiqaradi.": "В день, когда сделали больше плана, записываете это сюда. Оно добавится к нужной задаче как «сверх нормы» и поднимет процент выше 100%.",
  "Miqdori sanaladigan ishlar uchun: necha bet o'qildi, necha marta zikr aytildi, necha kilometr yurildi. Har kuni raqam kiritasiz, to'plangan miqdor va jarayon alohida ko'rinadi.": "Для дел, измеряемых количеством: сколько страниц прочитано, сколько раз произнесён зикр, сколько километров пройдено. Каждый день вводите число, а накопленный итог и ход показываются отдельно.",
  "Alohida bo'lim — kunlik vazifalar foiziga aralashmaydi. Tonggi va kechki zikrlar, besh vaqt namoz (har biri sunnat va farzga ajratilgan), tahajjud va kunduzgi nafllar shu yerda belgilanadi. Erkaklarda har namoz yonida «Masjidda» tugmasi bor — u reytingga bonus qo'shadi.": "Отдельный раздел — он не влияет на процент ежедневных задач. Здесь отмечаются утренние и вечерние зикры, пять намазов (каждый разделён на сунну и фард), тахаджуд и дневные нафли. У мужчин рядом с каждым намазом есть кнопка «В мечети» — она добавляет бонус к рейтингу.",
  "Xatmni oldindan rejalashtirasiz: qachondan qachongacha va kuniga necha daqiqa yoki necha pora. Har kuni bajarganingizni belgilab borasiz, necha kun o'tgani yonida ko'rinib turadi. Rejani o'zgartirish uchun qatorni bosib turing.": "Хатм планируется заранее: с какого по какое число и сколько минут или джузов в день. Каждый день вы отмечаете выполненное, а рядом видно, сколько дней прошло. Чтобы изменить план, удержите строку.",
  "Sarlavhadagi karavot tugmasi. Necha soat uxlashni yoki aniq vaqt oralig'ini belgilaysiz, so'ng har kuni qancha uxlaganingizni yozib borasiz. Haftalik o'rtacha va rejadan chetlashish ko'rsatiladi.": "Кнопка с кроватью в шапке. Вы задаёте, сколько часов спать, или точный промежуток времени, а затем каждый день записываете, сколько поспали. Показываются недельное среднее и отклонение от плана.",
  "Diqqatni jamlab ishlash taymeri. Ikki rejim bor: «Diqqatni jamlash»da ekran qorayadi va faqat taymer qoladi; «Ochiq rejim»da ilovadan chiqsangiz ham vaqt tugaganda telefon xabar beradi. Ishlagan daqiqalaringiz tanlagan vazifangizga qo'shiladi.": "Таймер для сосредоточенной работы. Два режима: в «Сосредоточении» экран темнеет и остаётся только таймер; в «Открытом режиме» можно выйти из приложения — телефон всё равно сообщит, когда время выйдет. Отработанные минуты добавляются к выбранной задаче.",
  "Har kun o'sha kungi natijaga qarab bo'yaladi: to'liq bajarilgan kun yashil, yarmidan ko'pi sariq, past bo'lsa qizil. Dam kuni rangsiz — u hisobga kirmaydi. Kunni bossangiz o'sha kunning to'liq tafsiloti ochiladi.": "Каждый день окрашивается по его результату: полностью выполненный день зелёный, больше половины — жёлтый, ниже — красный. Выходной день без цвета — он не учитывается. Нажмите на день, чтобы открыть его полные подробности.",
  "Kunlik, haftalik va oylik ko'rinish. Har raqam yonida o'tgan davrga nisbatan farqi turadi — o'sdimi yoki tushdimi. Grafikdagi nuqtaga bossangiz qaysi kun ekani chiqadi.": "Дневной, недельный и месячный вид. Рядом с каждым числом — его разница с прошлым периодом: выросло или упало. Нажмите на точку графика, чтобы увидеть, какой это день.",
  "Maqsad matningiz, umumiy natija halqasi va yillik raqamli maqsadlaringiz. Har maqsadni bosib jarayonini ko'rasiz — hafta, oy, olti oy va yil bo'yicha. Ko'p yillik rejada har yil alohida yuritiladi: yil tugagach keyingi yil vazifalarini qo'shasiz.": "Текст вашей цели, кольцо общего результата и годовые числовые цели. Нажмите на любую цель, чтобы увидеть её ход — за неделю, месяц, полгода и год. В многолетнем плане каждый год ведётся отдельно: когда год закончится, вы добавите задачи следующего.",
  "Reja tuzayotganda haftaning bir kunini dam kuni qilib belgilashingiz mumkin. O'sha kuni vazifalar so'ralmaydi va u statistikaga kirmaydi — foizingizni pasaytirmaydi.": "При составлении плана можно отметить один день недели как выходной. В этот день задачи не спрашиваются, и он не входит в статистику — ваш процент не снизится.",
  "Sozlamalar → Ma'lumotlar. «PDF yuklab olish» bosilsa hamma ma'lumotingiz bitta faylga saqlanadi. Yangi telefonga o'tsangiz «PDF o'rnatish» orqali hammasini tiklaysiz. Ma'lumot faqat telefoningizda turadi — hech qayerga yuborilmaydi.": "Настройки → Данные. Нажмите «Скачать PDF» — и все ваши данные сохранятся в один файл. Перейдя на новый телефон, вы восстановите всё через «Установить PDF». Данные хранятся только на вашем телефоне и никуда не отправляются.",
  "Beshta til bor: o'zbekcha lotin va kirill yozuvda, inglizcha, arabcha va ruscha. Arabcha tanlansa butun ilova o'ngdan chapga o'giriladi.": "Пять языков: узбекский латиницей и кириллицей, английский, арабский и русский. При выборе арабского всё приложение разворачивается справа налево.",
  "Sarlavhadagi quyosh yoki oy tugmasi ilova ranglarini almashtiradi. Kechqurun ko'z charchamasligi uchun tungi ko'rinishni yoqib qo'ying.": "Кнопка солнца или луны в шапке переключает цвета приложения. Вечером включайте тёмный вид, чтобы глаза не уставали.",

  // --- v12 yangiliklari ---
  "12-yangilanish (v12)": "Обновление 12 (v12)",
  "Bugun sahifasida vazifa ustini bosib tursangiz «Tahrirlash» va «O'chirish» tugmalari chiqadi.": "Удержите задачу на странице «Сегодня» — появятся кнопки «Изменить» и «Удалить».",
  "Namoz belgilangandan keyin ham «Masjidda» tugmasi joyida qoladi — endi uni bosishga ulguriladi.": "Кнопка «В мечети» теперь остаётся на месте после отметки намаза — успеваете её нажать.",
  "Qur'on xatmi qatorini bosib tursangiz reja tahriri ochiladi.": "Удержите строку хатма Корана — откроется изменение плана.",
  "Uyquga alohida ikonka berildi. Ilgari u tungi ko'rinish tugmasi bilan bir xil yarim oy edi.": "У сна теперь своя иконка. Раньше это был тот же полумесяц, что и у кнопки тёмного вида.",
  "Sozlamalardagi «Qanday ishlaydi?» «Har bo'lim nima qiladi?» ga aylandi va o'n to'qqiz bandgacha kengaydi.": "«Как это работает?» в настройках стало «Что делает каждый раздел?» и выросло до девятнадцати пунктов.",
  "Ekranda paydo bo'lib turadigan eski ishoralar olib tashlandi — ular tanishtiruv qo'llanmasi bilan takrorlanardi.": "Старые подсказки, всплывавшие на экране, убраны — они повторяли то, что уже говорит обучающий тур.",
  "«Barcha vazifalar» qo'shish menyusida ajratildi: u qo'shish uchun emas, bor vazifalarni boshqarish uchun.": "«Все задачи» отделены в меню добавления: это не для добавления, а для управления тем, что есть.",
  "Maqsad jarayonidagi «Oy» va «6 oy» tugmalari boshqa tillarda ham to'g'ri chiqadigan bo'ldi.": "Кнопки «Месяц» и «6 месяцев» в ходе цели теперь правильно отображаются и на других языках.",

  // --- v12: fokus rejimi va kun xulosasi ---
  "Chiqish": "Выйти",
  "Kun oxirida «bugun qanday o'tdi?» degan savolga bir jumla yozib qo'yasiz. Bugun sahifasidagi dumaloq tugmalardan ochiladi va Taqvimda o'sha kun ostida saqlanadi.": "В конце дня вы пишете одно предложение в ответ на вопрос «как прошёл сегодняшний день?». Открывается круглыми кнопками на странице «Сегодня» и сохраняется под этим днём в Календаре.",

  // --- v12: kirish ekrani va telegram bo'limi ---
  "Boshlaymiz": "Начнём",
  "Ilovadan avval foydalanganmisiz?": "Вы уже пользовались приложением?",
  "PDF orqali ko'chiraman": "Перенесу из PDF",
  "Ilovadan avval foydalangan bo'lsangiz, Sozlamalardan olgan PDF zaxirangiz bor. Shu faylni tanlasangiz — vazifalaringiz, belgilashlaringiz va butun tarixingiz shu ilovaga ko'chib o'tadi.": "Если вы уже пользовались приложением, у вас есть PDF-копия, сделанная из Настроек. Выберите этот файл — и ваши задачи, отметки и вся история перейдут в это приложение.",
  "Telegram kanalimizga o'tasizmi?": "Перейти в наш Telegram-канал?",
  "Ilovalarimiz va bog'lanish": "Наши приложения и связь",
  "Barcha ilovalarimiz, yangilanishlar va biz bilan bog'lanish — Telegram kanalimizda": "Все наши приложения, обновления и связь с нами — в нашем Telegram-канале",

  // --- v12: «Ilova haqida» bo'limi ---
  "Ilova haqida": "О приложении",
  "Nega yaratildi va kimga kerak": "Зачем создано и кому нужно",
  "Yangilanishlar va aloqa uchun": "Обновления и связь",
  "Assalomu alaykum. Hayotimiz davomida ko'pchiligimiz o'zimiz uchun turli xil katta maqsadlar qo'yamiz — «shu yili buni o'rganaman», «bu yili tashlayman», «u yilda mana buncha narsaga erishaman» va hokazo. Bir hafta o'tadi, ikki hafta o'tadi, ammo maqsadlarimizni bajarish tugul, qanday maqsadlar haqida o'ylaganimizni ham eslay olmaymiz. Maqsad yo'qolmaydi — u shunchaki har kungi kichik ishlarga bo'linmagani uchun qo'ldan chiqib ketadi.": "Ассаламу алайкум. На протяжении жизни многие из нас ставят себе самые разные большие цели — «в этом году научусь тому», «в этом году брошу это», «к тому году достигну вот столького» и так далее. Проходит неделя, проходят две, и мы не только не выполнили свои цели — мы даже не помним, о каких целях думали. Цель не исчезает: она просто ускользает из рук, потому что не была разбита на маленькие ежедневные дела.",
  "Aynan mana shu vaziyatda «Oliy maqsad» sizga yordamchi bo'ladi: ilova kattayu kichik maqsadlaringizni har kungi qadamlarga bo'lib beradi va o'sha qadamlarni shaffof holatda hisoblab boradi.": "Именно здесь «Oliy maqsad» вам помогает: приложение разбивает ваши цели, большие и малые, на ежедневные шаги и прозрачно ведёт им счёт.",
  "Bugun nimani bajardingiz, nimani qoldirdingiz, nimani sababli qoldirdingiz — hammasi yozilib boradi. Bir oydan keyin o'zingizga «harakat qildim shekilli» deb emas, aniq raqam bilan qaray olasiz.": "Что вы сделали сегодня, что оставили, а что оставили по уважительной причине — всё это записывается. Через месяц вы посмотрите на себя не словами «вроде бы старался», а точным числом.",
  "Bu yerda maqtov ham, tanbeh ham yo'q. Faqat ko'zgu bor.": "Здесь нет ни похвалы, ни упрёка. Здесь только зеркало.",
  "Biz bu ilovani avvalo o'zimiz uchun yasagandik. Yozib boradigan daftarimiz bor edi, lekin daftar hisoblab bermaydi, eslatmaydi va yo'qolib ketish xavfi bor. Tayyor ilovalarni sinab ko'rdik — ko'pi ro'yxat tuzishga yaxshi, ammo uzoq yo'lni ko'rsatmaydi; shaxsiy ma'lumot daxlsizligi ham so'roq ostidagi masala edi.": "Это приложение мы сделали прежде всего для себя. У нас была тетрадь, но тетрадь не считает за вас, не напоминает и может потеряться. Мы пробовали готовые приложения — большинство хороши для составления списков, но не показывают длинный путь; да и неприкосновенность личных данных оставалась под вопросом.",
  "Shuning uchun ilovani yasash mobaynida uch tamal qoidani qat'iy belgiladik:": "Поэтому при создании приложения мы твёрдо установили три правила:",
  "Ma'lumot faqat telefoningizda turadi. U hech qayerga ketmaydi. Ilovaning hech qanday serveri yo'q — shaxsiy ma'lumotlar telefondan tashqariga chiqmaydi.": "Данные хранятся только на вашем телефоне. Они никуда не уходят. У приложения вообще нет сервера — личные данные не покидают устройство.",
  "Serverlar bo'lmaganidan keyin ilova 100% internetsiz ishlaydi.": "Раз серверов нет, приложение полностью работает без интернета.",
  "Ilova insonlar manfaati uchun yasalgan. Shu sabab unda umuman reklama va to'lovlar yo'q.": "Приложение сделано ради пользы людей. Поэтому в нём нет ни рекламы, ни платежей.",
  "Umr — bizga berilgan eng qimmatli narsa, ammo u sarflanayotganini ko'pincha sezmaymiz. Kunni yozib borishning o'zi hech narsani o'zgartirmaydi. Lekin u odamni bir ishga majbur qiladi — to'xtab, o'ziga qarashga.": "Жизнь — самое ценное, что нам дано, но мы редко замечаем, как она расходуется. Запись дня сама по себе ничего не меняет. Но она вынуждает человека к одному — остановиться и взглянуть на себя.",
  "Nazorat qilinmagan kun sezilmay o'tadi. Sanalgan kun esa qoladi.": "День без присмотра проходит незаметно. А сочтённый день остаётся.",

  // --- v12: namuna vazifalar ---
  "yoki tayyor namunadan boshlang": "или начните с готового примера",
  "Sport bilan shug'ullanish": "Заниматься спортом",
  "Kitob o'qish": "Чтение книги",
  "Sog'liq": "Здоровье",
  "Ilm": "Знание",

  // --- v12: ibodat eslatmasi ---
  "Kechqurungi eslatma": "Вечернее напоминание",
  "Har kuni {v} da eslatiladi": "Напоминает каждый день в {v}",
  "O'chirilgan": "Отключено",
  "Bugungi ibodatlaringizni belgilab qo'ying.": "Отметьте сегодняшнее поклонение.",

  // --- v12: ibodat qatori ---
  "Majburiy": "Обязательно",
  "bajarildi": "выполнено",

  // --- v12: uyqu sahifasiga yo'l ---
  "Uyqu rejasi va kundaligi": "План сна и дневник",
};

// Ruschani LUGAT ga qo'shamiz
for (const k in LUGAT_RU) {
  if (!LUGAT[k]) LUGAT[k] = {};
  LUGAT[k].ru = LUGAT_RU[k];
}

// Avtomatik kirill o'girish xato chiqqan matnlar (istisno):  "Ma'no": "Маъно"
export const KIRIL_ISTISNO: Record<string, string> = {
  // Versiya belgisi LOTIN qolishi kerak: toKiril() "v12" ni "в12" qilib yuborardi.
  // (Qisqartma himoyasi faqat BOSH harfli qisqartmalarni saqlaydi, "v" esa kichik.)
  // YANGILANISHDA: bu qatorni ham yangi versiyaga o'zgartirish esdan chiqmasin.
  "12-yangilanish (v12)": "12-янгиланиш (v12)",
};

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
// LOTIN HARFIGA YOPISHGAN RAQAM O'GIRILMAYDI: "v12" -> "v12" (ilgari "v١٢"
// chiqib, versiya belgisi buzilardi). Xuddi shu qoida kirillcha uchun
// KIRIL_ISTISNO orqali hal qilingan. Oddiy sonlarga ta'sir qilmaydi:
// "08:00", "100%", "5 kun" — ularning oldida lotin harfi yo'q.
export function raqam(s: string | number): string {
  const t = String(s);
  if (CUR !== "ar") return t;
  return t.replace(/[A-Za-z][0-9]+|[0-9]/g, m => /[A-Za-z]/.test(m) ? m : AR_RAQAM[+m]);
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
