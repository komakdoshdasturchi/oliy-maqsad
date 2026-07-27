# OLIY MAQSAD — loyiha xotira fayli (handoff)
Yangilangan: 2026-07-20. Yangi sessiyada Claude shu faylni o'qisa, to'liq kontekstga ega bo'ladi.

## FOYDALANUVCHI HAQIDA
- O'zbek, texnik emas — hamma ko'rsatma qadam-baqadam, sodda o'zbek tilida beriladi
- Diniy inson: shar'iy ilm, tarix, qalb tazkiyasi yo'lida 5 yillik shaxsiy reja qurgan
- Qoidalari: kod yozishdan OLDIN doim "yozaymi?" deb so'rash; takliflarni avval muhokama qilish; limitni tejash; "streak" so'zi emas — "uzluksizlik"
- Kompyuter: Windows 11, Chrome (Turkcha interfeys ba'zan). Telefon — ASOSIY qurilma (APK)

## LOYIHA NIMA
"Oliy Maqsad" — 5 yillik shaxsiy intizom/ibodat ilovasi. React + TypeScript + Tailwind (CDN), localStorage, AI YO'Q (API kalit kerak emas), to'liq o'zbekcha, oflayn ishlaydi.
- Kod: BITTA fayl — src/App.tsx (~2000 satr). Har yangilanishda to'liq almashtiriladi
- Dizayn: iliq krem fon (#f3ede1), to'q yashil (#1e5c40), oltin (#b8862f), qorong'u rejim bor. Jiddiy, savlatli — chaqnoq ranglar TAQIQ. Ranglar faqat yupqa urg'u sifatida
- Joylashuvlar: (1) Google AI Studio loyihasi → sayt https://oliy-maqsad.ai.studio (Publish tugmasi bilan), (2) C:\oliy-maqsad — lokal nusxa, Capacitor bilan APK quriladi
- Yangilash tartibi: yangi App.tsx → AI Studio'ga joylash + Qayta nashr; C:\oliy-maqsad\src\App.tsx ga joylash → yangilash.bat (npm run build + npx cap sync android) → Android Studio: Build → Generate App Bundles or APKs → Generate APKs → app-debug.apk Telegram orqali telefonga, ustidan o'rnatiladi (ma'lumot saqlanadi)
- Ma'lumot xavfsizligi QOIDASI: har yangilanish eski ma'lumotlarni saqlashi SHART (localStorage om3_* kalitlari + migratsiya funksiyasi bor, om3_ver bilan versiyalanadi)

## HOZIRGI HOLAT (v4 — telefonda ishlab turibdi)
Amaldagi App.tsx da bor: kirish sahifasi (ism, oliy maqsad matni, yillar 1-10, boshlanish sanasi, dam kuni, hafta boshi — oxirgi 4 tasi O'ZGARMAS, ogohlantirish bilan; dinamik ko'rsatkichlar: "type" (vazifa turi orqali) va "manual" (+1); vazn ixtiyoriy, haftalik so'rov kuni). 4 tab: Bugun (salomlashuv "Assalomu alaykum, {ism}", milodiy+hijriy sana (umalqura, ±offset), hadis kartochkasi (Muslim 6627 "kuchli mo'min", arab+tarjima), progress halqa, vazifalar ✓/✗ sababli (30 kunlik hisob, >3 ogohlantirish), uyqu bitta kartochkada, +1 sanagichlar, qo'shimcha ishlar formasi, kunlik bir qator xulosa, HALOL BO'L kartochkasi, dam kuni — haftalik hisobot) · Taqvim (rangli, kun tafsiloti read-only) · Statistika (hafta/oy/yil, uzluksizlik, nishonlar, sabablilar, turlar, pomodoro, uyqu, vazifa sahifalari) · Oliy Maqsad (maqsad matni, N-yil/365, ko'rsatkich chiziqlari, soatlar, vazn grafigi, vaqt-reja taqqoslovi). Header: shior "Maqsadsiz inson = O'lik insondir!", reja muddati va qolgan kunlar, 🍅 📋 ⚙ tugmalar. 📋: Kundalik / ⭐ Oliy maqsad vazifalari, papkalar (nom+muhimlik 1-10), vazifa: nom/tur(datalist)/daqiqa-soat tanlovli vaqt/papka/boshlanish/tugash/hafta kunlari/eslatma vaqti+matni; to'xtatish maks 7 kun, tashlab qo'yish, arxiv, qayta tiklash, boshlanmagan bo'lsa o'chirish, oliy: taxminiy muddat, ✅ Tugatdim (tur bo'yicha metrikaga +1), xulosalar kundaligi. Uyqu rejasi (soat yoki oraliq). 🍅 Pomodoro (sozlanadigan ish/dam, hozircha avtomatik davom etadi — v5 da o'zgaradi). ⚙: zaxira JSON+PDF, eslatmalar, hijriy tuzatgich, qorong'u rejim, maqsadni yangilash (qayta shakllantirish / noldan HA yozib).
Yillar 20-iyuldan: 1-yil 2026-07-20 → 2027-07-19. Ko'rsatkichlari: fiqh 6 / tarix 10 / qalb 10 kitob (endi tur orqali), podcast 100 (+1), vazn −12 kg (payshanba). Dam: juma. Hafta boshi: shanba.

## V5 HOLATI (2026-07-20: KOD YOZILDI, brauzerda sinovdan o'tdi, ~3000 satr)
v5 C:\oliy-maqsad\src\App.tsx da tayyor. vite build ✓. Sinovdan o'tganlar: migratsiya (om3_ver 2→3, done→{st:full}, excused→{st:excused,excuseScore:5}, tasks+kind), ibodat bo'limi (zikr/namoz guruhlari/ixcham qator/masjid/reyting), MarkSheet (4 tugma, ziyoda, sababli 1-10), orqaga ishorasi (global backStack, history.back() chaqirilmaydi — bitta qo'riqchi yozuv), kun tartibi (qulf 7 kun, to'qnashuv+min vaqt tekshiruvi, slot>vazifa → avtomatik ziyoda), sanaladigan vazifa yaratish, PDF zaxira (%%OMDATA base64, tiklash ✓), barcha tablar xatosiz. Hali telefonda SINALMAGAN: PomoAsk oqimi (taymer), eslatmalar, Capacitor orqaga ishorasi.
Yangi kalitlar: om3_ibadat, om3_khatm, om3_gender, om3_daymode, om3_countlog, om3_ui. .claude/launch.json qo'shildi (dev server preview uchun).
2026-07-21: PREMIUM UI REDIZAYN boshlandi (funksiyalar 100% saqlangan). Bajarilgan: yangi dark palitra (:root=premium light, .om-dark=mockup: #16130F/#201B15/#59B483/#D7A94B/#F5F5F5/#A5A5A5, --blue endi #8C9A86 sage), Inter+global CSS+animatsiyalar (om-fade/pop/sheet/press), ichki SVG Icon komponenti+ICONS map (emoji o'rniga, oflayn), premium Card/Sec(ikonkali), yangi header (salom+sana+4 ikonka), pastki nav + katta yashil FAB (+ tezkor vazifa qo'shadi), HadisCard/Cell(type ikonka+papka)/IbadatBlock qayta, Pomodoro katta ring, Taqvim polish. 2026-07-21 (davomi): QOLGAN SAHIFALAR HAM BEZALDI — Ibodat sahifa (bo'limlarga: ZIKRLAR/5 VAQT NAMOZ/NAFL/QUR'ON, ikonkali qatorlar), Sozlama (bo'lim ikonkalari), Maqsad (hero card + h3 ikonkalar), Statistika (SECS pill+ikonka, h3 emoji tozalandi), Vazifalar (TaskBtn ikonka chip+meta, papka ikonka). Har sahifadan keyin build ✓. Brauzerda matn orqali tasdiqlandi: barcha sahifa render, emoji YO'Q (faqat 👋 salom va 🍅 pomo ring qoldi ataylab). Skrinshot xizmati bu sessiyada ishlamadi (muhit muammosi). scratchpad/*.py skriptlari saqlangan.
QOLISHI MUMKIN (mayda, keyin): Statistika badge emojilari (🔥⭐🏆), modal/sheet ichidagi ba'zi belgilar, DayDetail emoji. Asosiy premium redizayn TUGADI.
INCIDENT (hal qilindi): Python bilan Pomodoro ring joylashda `</Card>` 6-probelda qidirilib, BugunView oddiy-kun + WeightCard + ExtraForm + TaqvimView kalendar O'CHIB KETDI. scratchpad/restore.py bilan asl v5 holicha to'liq tiklandi, build ✓. SABOQ: Python replace'da indentatsiya aniq bo'lsin, har replace'dan keyin `npx tsc`+build.
DIZAYN SPEC (foydalanuvchi bergan): Apple/Linear/Notion/TickTick uslubi; ranglar yuqorida; radius card 20/btn 18/input 16; 8px grid; emoji YO'Q (SVG); ko'k YO'Q; qizil faqat delete; bir sahifada max 3 accent.
2026-07-20: foydalanuvchi APK qurib telefonga o'rnatdi. MUAMMO topildi: APKda orqaga ishorasi ishlamadi (Capacitor'da history default boshqarilmaydi). TUZATISH: @capacitor/app@8.1.1 o'rnatildi, App.tsx da window.Capacitor.Plugins.App orqali backButton tinglovchisi qo'shildi (import YO'Q — AI Studio saytiga xavfsiz), backStack bo'sh bo'lsa minimizeApp. build+sync qilindi ✓. Foydalanuvchi APKni QAYTA qurishi kerak. Telefonda sinash kutilmoqda: orqaga ishorasi (tuzatilgan), Pomodoro oqimi.

2026-07-22: MOCKUP ELEMENTLARI QO'SHILDI (brauzerda matn orqali sinaldi, build ✓; telefonda SINALMAGAN — APK qayta qurish kerak):
- Bugun: "Keyingi vazifa" yashil karta (birinchi bajarilmagan vazifa, kun tartibida vaqti eng yaqini; "Boshlash" → Pomodoro sahifa + taymer avto-start; kartani bosish → MarkSheet)
- Bugun: 4 mini-kartochka qatori (Ibodatlar % "Majburiy bo'lim" / Uyqu / Pomodoro / Eslatmalar) — oddiy kunda eski katta Ibodatlar kirish kartasi O'RNIDA (dam kunida eski karta qoladi); har biri tegishli sahifani ochadi. BugunView yangi proplar: pomoLog, openUyqu, openSozlama, openPomo, startPomo
- Bugun: HadisCard oddiy kunga QAYTARILDI (redizayndan keyin faqat dam kunida qolgan ekan)
- Yangi UyquPage (page="uyqu", faqat mini-kartadan ochiladi, header tugmasi YO'Q): tungi ko'k hero (soat, uxlash/turish vaqtlari), hafta belgilari (uyqu vazifasi loglaridan), o'rtacha, maslahatlar kartasi, SleepPlanCard (tahrirlash)
- Vazifalar: qidiruv (sarlavha yonida ikonka → input; nom+tur bo'yicha, IKKALA scope bo'ylab; natijalar alohida kartada, papkalar yashirinadi)
- PomoCfg.cycles qo'shildi (eski saqlangan cfg'da bo'lmasa `|| 3` ishlatiladi — migratsiya kerak emas): Sozlashda "Sikl: N marta", ring ostida "Bugun: X/N pomodoro" (yetganda yashil)
- TUZATILDI: header masjid tugmasi pg="ibadat" (xato) → "ibodat" — shu sabab Ibodatlar sahifasi header'dan OCHILMAS edi
- TUZATILDI: uyqu vazifasi useEffect'i StrictMode'da IKKI marta qo'shishi mumkin edi → setTasks ichida some() himoyasi
- Eslatma: `npx tsc` dagi "Property 'key' does not exist" xatolari ESKI va zararsiz (@types/react o'rnatilmagan) — build toza o'tadi
- Telefonda sinash ro'yxatiga qo'shildi: Keyingi vazifa kartasi, mini-kartalar, UyquPage, qidiruv, sikl

2026-07-22 (2-to'plam, foydalanuvchi takliflari asosida; brauzerda sinaldi, build ✓, cap sync ✓):
- PLAGINLAR QO'SHILDI: @capacitor/local-notifications@8.2.1, @capacitor/haptics@8.0.2 (APK QAYTA QURILISHI SHART). Kirish importsiz — capPlug()/LN() orqali window.Capacitor.Plugins (AI Studio saytiga xavfsiz)
- Telefon bildirishnomalari: kunlik eslatmalar (umumiy + vazifa remTime) LocalNotifications.schedule({on:{hour,minute}}) bilan rejalanadi (id<3000, har o'zgarishda qayta rejalanadi, 2s debounce); ilova yopiq bo'lsa ham chalinadi. Cheklov: dam kunini o'tkazib yubormaydi (soddalik uchun)
- Pomodoro tugashi: id 3001 aniq vaqtga rejalanadi (fonda ham keladi). Ongoing "X daqiqa qoldi" (id 3002) OLIB TASHLANDI — foydalanuvchi so'rovi: qotib turgan raqam chalg'itadi; suzuvchi/jonli taymer Play Market bosqichida native kod bilan
- Pomodoro REJIM TANLOVI (Boshlashda Sheet): Fokus (PomoState.mode="focus" → FocusOverlay: qop-qora ekran, katta taymer, wake lock navigator.wakeLock, ichki eslatmalar jim, "Fokusdan chiqish" mode="open" qiladi) / Ochiq (bildirishnoma bilan). DND avtomatik YOQILMAYDI — Android ruxsat bermaydi, tanlov matnida qo'lda yoqish tavsiya qilinadi. lastPomoMode ref — dam fazasi ham shu rejimda
- Maqsad: ko'rsatkich qatori bosilsa Modal — biriktirilgan oliy vazifalar (holati/foizi/muddati); JONLI FOIZ: tugallanmagan vazifa qisman hissa qo'shadi — vaqtli: ishlangan kunlar (full/extra) / plannedDays (yo endDate oralig'i), cap 0.95; sanaladigan: son/nishon cap 0.95; muddatsiz vazifa hissa qo'shmaydi (modal ichida aytilgan). MaqsadView endi countLog oladi
- Shaxsiy iqtiboslar: om3_quotes (YANGI KALIT) {id,text,pos:top|mid|bottom}; Sozlamalarda qo'shish/tahrir/o'chirish, Bugunda 3 joyda ko'rinadi (dam kunida hadis ostida hammasi)
- Statistika Vaqt bo'limi: "Eng faol kun" (hafta kuni bo'yicha yig'indi) va "Eng ko'p vaqt (bir kunda)" kartalari
- Haptika: MarkSheet tugmalari, IbadatPage upd(), addCount, rejim tanlash — buzz() (faqat telefonda seziladi)
- PomoPage Boshlash endi onStart prop (App'dagi pomoModeAsk Sheet ochadi); startPomo avto-start QILMAYDI, tanlov so'raydi
- Telefonda SINALMAGAN: bildirishnomalar (ruxsat so'rovi, kunlik, 3001/3002), haptika, wake lock, ongoing bildirishnoma

2026-07-24: ILOVA IKONKASI (launcher) yangilandi. Manba: C:\oliy-maqsad\Logolar\ (foydalanuvchi qo'shgan — tog'+bayroq "M" logo, 3 rang: qora/oltin/yashil + oliy maqsad.svg). Yashil variant (yashil.png, #58b483, shaffof fon) barcha mipmap o'lchamlarida qayta yaratildi (PowerShell System.Drawing, bbox 53..1877/289..1452 kesib markazlashtirilgan: foreground 0.64 xavfsiz zona, legacy launcher/round 0.88). ic_launcher_background #FFFFFF→#00000000 (shaffof, "kesilgan" ko'rinish). Faqat android/res o'zgardi — cap sync/web build shart emas, APK qayta qurilsa yetarli. Eslatma: ba'zi launcherlar adaptive ikonaga o'z plastinkasini majburlashi mumkin.

2026-07-24: ONBOARDING QAYTA YOZILDI (mockup asosida, 11 bosqichli sehrgar). Eski bitta uzun sahifa → qadam-baqadam. Yangi Logo komponenti (SVG tog'+bayroq, Logolar/oliy maqsad.svg dan polygon+2 path, rangga moslashadi) header/sahifalarda ishlatsa bo'ladi. Bosqichlar: 1 salom(logo) · 2 ism · 3 maqsad(300 belgi sanagich) · 4 yillar(1-15 grid) · 5 "Yaxshi!" tayyormisiz(radio, "Ha" majburiy) · 6 boshlanish(ichki oy kalendar) · 7 dam kuni(8 variant) · 8 hafta boshi(7 kun) · 9 vazn(Ha/Yo'q majburiy, Ha→target+kun) · 10 "Rejangiz tayyor"+o'zgarmas sozlamalar xulosasi(eski confirm o'rniga) · 11 hadis(shaxsiy, ism bilan)+"Bismillah boshlaymiz". Orqaga: BackCloser key={"ob"+step}. Yangi ikonka: user, flag. Brauzerda 11 bosqich to'liq sinaldi, build ✓, plan saqlanadi.
!!! MUHIM QAROR: mockupda YILLIK KO'RSATKICHLAR (metrics) qadami YO'Q — onboardingdan OLIB TASHLANDI, plan.metrics=[] bilan boshlanadi. Foydalanuvchi keyin Maqsad→tahrirlash (MetricsEdit) orqali qo'shadi. Bu foydalanuvchi bilan muhokama qilinishi kerak (kirishda so'ralmasa, yangi foydalanuvchi ko'rsatkichsiz qoladi). Kerak bo'lsa 12-bosqich sifatida qaytariladi.
ESLATMA: eski onboardingda restDay faqat Juma/Shanba/Yakshanba edi, endi 7 kun ham; weekStart ham 7 kun (mockupga mos).

2026-07-24: STATISTIKA BUZILISHI TUZATILDI (foydalanuvchi 14-bandli katta redizayn rejasining 1-bosqichi). SABAB: dayStats har o'tgan kunni HOZIRGI vazifalardan qayta hisoblardi; vazifa qachon yaratilgani eslanmasdi (faqat startDate). Yangi/o'tmish-sanали vazifa o'tgan kunlar maxrajiga kirib, belgisi yo'qligi uchun "qilinmagan" bo'lib, oldingi 100% kunlar tushib ketardi (klon emas, shu latent xato). YECHIM: Task.createdAt qo'shildi; taskActiveOn'da `if(t.createdAt && d<t.createdAt) return false` (o'tmish muzlatiladi). Migratsiya v3→v4 (om3_ver "4"): har vazifaga createdAt = firstLog(eng erta belgi sanasi) || startDate — shu bilan xato tushган kunlar tiklanadi. Yangi vazifa yaratilganda createdAt=today (4 joy: TaskForm time/count, ExtraForm rec, uyqu vazifasi). Node bilan sinaldi: buzilgan 07-23 kuni 50%→100% tiklandi. build ✓, cap sync ✓. TELEFONDA sinamagan. Foydalanuvchi APK qayta qurishi kerak.
QOLGAN REDIZAYN BOSQICHLARI (foydalanuvchi tasdiqlagan, keyingi): 2) Bugun tozalash (logo+sana yuqorida, Oli Imron 200 oyati past, salom/hadis/motivatsiya olib tashlanadi) · 3) vazifa/tur/papka BIRLASHTIRISH (tur=papka, muhimlik olib tashlanadi, add-task premium: kundalik/oliy→vaqtli/sanaladigan→nom→tur, "qaysi vaqt oralig'ida" + o'sha vaqtda auto bildirishnoma, "papka tanlang"/"qaysi kunlari" olib tashlanadi, tur bo'yicha auto-guruh) · 4) belgilash soddalash (ziyoda→Qo'shimcha ish; ziyoda statistikaga kirmayapti-TUZATISH) + kunlik stat · 5) Sozlamalar qayta (Ma'lumotlar PDF yuklab/o'rnatish premium, Eslatma bo'limi OLIB TASHLANADI, Telegram https://telegram.me/Oliymaqsad_apk tasdiq bilan, Ko'rinish: tonggi/tungi mavzu). QARORLAR: logo B-variant (tonggi=yashil, tungi=qaymoqrang, ostida mos rangda "Oliy maqsad"); tashqi launcher ikonka almashtirish MUMKIN EMAS (native kerak)→Play bosqichiga; oliy maqsadlar Vazifalar→Oliy'da belgilanadi; logo hamma joyda bir xil (chap yuqorida + "Oliy maqsad" yozuvi). Logolar papkasida 4-variant.jpg ham bor.

2026-07-25: 2-BOSQICH (Bugun tozalash) + 3-bosqich boshlanishi. Bajarildi: Logo komponenti header'da (chap yuqorida logo + "Oliy maqsad" yozuvi, logoColor=settings.dark?"#EADFC6"(qaymoq):var(--green) — B variant), salomlashuv/"Maqsadsiz inson"/daysLeft OLIB TASHLANDI, sana ixcham bir qator (dd-oy · yil · hijriy · KUN). HadisCard va HalolCard BugunView'dan olib tashlandi (funksiyalar hali turibdi, ishlatilmaydi), o'rniga OyatCard (Oli Imron 200-oyat: arab RTL + tarjima + manba, markazda, eng pastda — oddiy va dam kunida). 3-bosqich xatosi tuzatildi: types endi `plan.metrics.map(m=>m.typeName||m.name)` (avval filter(typeName) — qo'lda sanaladigan maqsadlar chiqmasdi; 2 joyda: VazifalarPage+App). build ✓, cap sync ✓.
3-BOSQICH QOLGANI (KATTA, arxitektura — keyingi fokusli ish): add-task premium redizayn (kundalik/oliy→vaqtli/sanaladigan→nom→tur premium selektor→"qaysi vaqt oralig'ida"+o'sha vaqtda auto bildirishnoma→eslatma), papka/tur BIRLASHTIRISH (tur=papka, folderId olib tashlanadi/tur bo'yicha auto-guruh), muhimlik(importance) OLIB TASHLANADI, "papka tanlang"/"qaysi kunlari" olib tashlanadi, boshlanish tugmalari yonma-yon premium, oliy maqsadlar Vazifalar→Oliy'da belgilanadi (7-band). Bular Task modeliga tegadi (minutes→vaqt oralig'i?, folderId→type), ehtiyot bilan.

2026-07-25 (davomi): 3-BOSQICH YADROSI BAJARILDI (brauzerda sinaldi ✓). TaskForm TO'LIQ QAYTA YOZILDI premium Sheet ko'rinishida: Turkum(Kundalik/Oliy segment) → O'lchov(Vaqtli/Sanaladigan) → nom → TUR chiplar (types dan, +yangi tur input) → "Qaysi vaqt oralig'ida qilasiz?" (from-to time, minutes=to-from avtomatik, schedFrom/schedTo saqlanadi) → boshlanish tugmalari (Bugundan/Ertadan/Sana...) → oliy: taxminiy kun → qo'shimcha eslatma. OLIB TASHLANDI: papka tanlash, muhimlik, "qaysi kunlari"(DayChips), kunlik DurationField. folderId=null (tur=papka). VazifalarPage: papka o'rniga TUR bo'yicha guruhlash (grouped, "Turkumsiz" fallback), YANGI PAPKA formasi va FolderEdit ishlatilmaydi (funksiyalar hali turibdi). Bildirishnoma: schedFrom uchun ham auto-notify qo'shildi (LocalNotifications, dep array'ga schedFrom). Sinov: Aqida darsi 10:00-11:30→minutes=90, tur bo'yicha auto-guruh ✓. build+sync ✓.
3-BOSQICH QOLGANI (keyingi): TaskEdit hali eski papka/muhimlik UI'da (eski vazifa tahrirlash) — yangi ko'rinishga o'tkazish kerak; vazifa TARTIBLASH (drag, 3-band); Oliy maqsadlarni Vazifalar→Oliy'da "Oliy maqsadlaringni belgilang" + sanaladigan oliy auto Bugun sanaladiganlarga (7-band); premium sticker oliy uchun (6-band). Ishlatilmayotgan: DurationField, DayChips, FolderEdit, HadisCard, HalolCard. Keyingi bosqichlar: 4) belgilash soddalash (ziyoda→Qo'shimcha ish, stat tuzatish) 5) Sozlamalar qayta+Telegram+Ko'rinish.

2026-07-25 (davomi): DAM KUNI BILDIRISHNOMA TUZATILDI. Telefon bildirishnomalari (reminderTimes + schedFrom + remTime) endi dam kunini (plan.restDay, dinamik — qattiq yozilmagan) O'TKAZIB YUBORADI. pushDaily() helper: restDay null bo'lsa on:{hour,minute} (har kuni), aks holda 6 ta hafta-kuni (weekday=jsDay+1, Capacitor 1=Yakshanba) dam kunidan tashqari. Bugun sahifasi dam kunida O'ZGARMADI (uyqu/oyat/ibodat/xulosa/hisobot — hammasi qoladi, faqat vazifa ro'yxati chiqmaydi — bu allaqachon shunday edi). ESLATMA: hozir alohida "ibodat bildirishnomasi" YO'Q — shuning uchun dam kuni umuman jim (ibodat eslatmasi kerak bo'lsa yangi funksiya sifatida qo'shiladi, vaqtini foydalanuvchi belgilashi kerak). build+sync ✓.

2026-07-25 (davomi): 4-BOSQICH (belgilash soddalash) — brauzerda sinaldi ✓. MarkSheet: "Ortig'i bilan qildim (ziyoda)" tugmasi VA extra mode OLIB TASHLANDI; qolgan 3 tugma premium ikonkali (Qildim/Sababli/Umuman qilmadim), emoji yo'q. ExtraForm TO'LIQ QAYTA YOZILDI (Sheet, premium): nom + vaqt + "Qaysi vazifaga tegishli?" (faol vazifalar ro'yxati + "Boshqa — mustaqil ish") + tur(Boshqa uchun). Vazifaga tegishli bo'lsa → o'sha vazifaga ziyoda hisoblanadi (creditMinutes mantiqi: creditedMin→full→extra) + tarix uchun Extra{counts:false}; Boshqa → Extra{counts:true} (soatlarga kiradi). SHU BILAN ziyoda statistikaga kiradi (12-band xatosi tuzatildi). Extra interfeysiga type?, taskId? qo'shildi. OLIB TASHLANDI: rec(davomiy), counts checkbox, papka select. Cell subtitle "Papkasiz"→tur ko'rsatadi. Sinov: Quduriy'ga 30daq→creditedMin:30, Extra counts:false ✓. build+sync ✓.
QOLGAN (kichik): 13-band kunlik statistika Statistika bo'limida (haftalik bar chart allaqachon kun-kun ko'rsatadi — deyarli bor). Keyingi: 5-BOSQICH Sozlamalar qayta qurish (Ma'lumotlar PDF premium, Eslatma bo'limi olib tashlash, Telegram https://telegram.me/Oliymaqsad_apk, Ko'rinish: tonggi/tungi mavzu + logo B-variant almashishi, Hijriy/iqtibos premium). Va TaskEdit hali eski papka UI'da — yangilash kerak.

2026-07-25 (davomi): 5-BOSQICH — SOZLAMALAR QAYTA QURILDI (premium, brauzerda sinaldi ✓). Bo'limlar: MA'LUMOTLAR (PDF yuklab olish / PDF o'rnatish — 2 ustun premium kartochka, download/upload ikonka, o'rnatish ogohlantirish bilan, yashirin file input+fileRef); KO'RINISH (Tonggi/Tungi mavzu 2 kartochka, sun/moon; settings.dark ni to'g'ridan-to'g'ri o'rnatadi); HIJRIY SANA TUZATGICHI (premium −/+); ILOVA YANGILIKLARI (Telegram kartochka #229ED9, bosilsa confirm→window.open https://telegram.me/Oliymaqsad_apk); SHAXSIY IQTIBOSLAR (o'zgarmadi); MAQSAD (replan/reset). OLIB TASHLANDI: ESLATMALAR bo'limi (endi har vazifa o'z vaqt oralig'i bildirishnomasi bor). Yangi ikonka: send, download, upload. SecLabel helper. Logo B-variant ishlaydi: Tungi→logo fill #EADFC6 (qaymoq), Tonggi→var(--green). Dark rejim o'zgaruvchilari to'g'ri (preview'da getComputedStyle bg ziddiyatli — muhit artefakti). build+sync ✓.
!!! ESLATMA: settings.remindersOn endi UI'siz (default false) — umumiy kunlik eslatma yo'q, faqat vazifa schedFrom/remTime. Bugun'dagi "Eslatmalar" mini-kartochka hali settings.reminderTimes ko'rsatadi (orphan, "O'chiq" chiqadi) — keyin tuzatish mumkin. TaskEdit hali eski papka/muhimlik UI'da. Ishlatilmaydi: DurationField(qisman), DayChips, FolderEdit, HadisCard, HalolCard, Folder importance.
BARCHA 5 BOSQICH TUGADI (1 statistika, 2 Bugun tozalash, 3 add-task/tur birlashtirish, 4 belgilash, 5 sozlamalar). Telefonda to'liq sinov kerak. QOLGAN mayda: TaskEdit premium, vazifa tartiblash(drag 3-band), Oliy maqsad Vazifalar→Oliy'da belgilash(7-band), kun tartibi alohida joy(10-band), splash(1-band), ibodat bildirishnomasi(ixtiyoriy), boshqa rangli launcher logolar(Play bosqichi).

2026-07-25 (davomi 2): QOLGAN MAYDA ISHLAR — brauzerda sinaldi ✓.
- TaskEdit TO'LIQ QAYTA YOZILDI (Modal→Sheet, premium): tur chiplari + "Qaysi vaqt oralig'ida" (schedFrom/schedTo, minutes avtomatik qayta hisoblanadi) + Qachongacha + qo'shimcha eslatma. OLIB TASHLANDI: papka select, DayChips (qaysi kunlari), kunlik DurationField. Amal tugmalari ikonkali (emoji yo'q): Tugatdim/O'chirish/To'xtatish/Davom ettirish/Qayta tiklash/Arxivlash. "XULOSALARIM" emoji tozalandi.
- Bugun "Eslatmalar" mini-kartochka YETIM QOLGANI TUZATILDI: endi settings.reminderTimes emas, faol vazifalarning schedFrom+remTime vaqtlarini sanaydi ("N ta" + "keyingi HH:MM"/"bugun tugadi"/"vaqt yo'q"), bosilsa Vazifalar sahifasi ochiladi (openVazifalar propi qo'shildi).
- 7-BAND: MetricsEdit premium Sheet'ga aylantirildi ("Oliy maqsadlaringiz": ro'yxat+target inline tahrir+o'chirish, Yangi maqsad: nom/yillik son/["Vazifa turi orqali"|"O'zim sanayman"] segment). VazifalarPage→Oliy tabiga "Oliy maqsadlaringizni belgilang" kartasi qo'shildi (N ta belgilangan ko'rsatadi) → shu Sheet ochiladi. VazifalarPage endi setPlan propini oladi. MaqsadView'dagi eski "tahrirlash" kirishi ham ishlaydi (ikki yo'l).
- Eslatma: sanaladigan oliy vazifa allaqachon Bugun→"Sanaladigan vazifalar"da chiqadi (kind==="count" && startDate<=today).
QOLGAN (kichik, xohishga qarab): vazifa tartiblash/drag (3-band), kun tartibi alohida tugma (10-band), splash ekrani (1-band), onboarding bosqichlari orasida yon sirpanish animatsiyasi, ibodat bildirishnomasi (dam kuni uchun), boshqa rangli launcher logolar (Play bosqichi — native kerak). Ishlatilmaydi: DayChips, FolderEdit, HadisCard, HalolCard, Folder.importance, settings.remindersOn/reminderTimes (UI yo'q).

2026-07-25 (davomi 3): SPLASH + ANIMATSIYA + TARTIBLASH — brauzerda sinaldi ✓.
- SPLASH ekrani: App'da `splash` state (1250ms setTimeout), barcha hooklardan KEYIN, `if(!plan)` dan OLDIN early return. Markazda Logo 78px + "Oliy maqsad" (om-pop animatsiya), rangi mavzuga qarab (dark→#EADFC6, light→green). Onboarding div'iga ham om-dark class qo'shildi.
- ONBOARDING YON SIRPANISH: styleBlock'ga omSlideL/omSlideR keyframes + .om-slide-l/.om-slide-r (.34s). Onboarding'da `dir` state ("l"=oldinga, "r"=orqaga); next()→dir="l", back()→dir="r"; step div className dinamik. (Foydalanuvchi "1-variant yon sirpanish"ni tasdiqlagan edi.)
- VAZIFA TARTIBLASH (3-band): Task.order?: number qo'shildi. BugunView'da `act` order bo'yicha saralanadi (order ?? 9999). moveTask(id, delta) — swap qilib butun ro'yxatga order=index yozadi (buzz bilan). Sec ichida 2 pill tugma: "Kun tartibi" (switchMode — 10-band, endi chiroyli joyda) va "Tartiblash/Tayyor" (reorder toggle). Reorder rejimida vertikal ro'yxat: raqam + nom/tur + chevronUp/Down (chekkalarda o'chirilgan). Eski "Rejim: ... rejimni o'zgartirish" qatori olib tashlandi. SINOV: Aqida darsi 3→1 surildi, order localStorage'ga yozildi, "KEYINGI VAZIFA" kartasi Aqida darsi'ga o'zgardi ✓ (tepadagi keyingi vazifa endi tasodifiy emas, tartibning birinchisi).
QOLGAN (ixtiyoriy): dam kuni ibodat eslatmasi (alohida funksiya kerak), boshqa rangli launcher logolar (native/Play bosqichi), Kirill alifbosi.

2026-07-25 (davomi 4): ILOVA YANGILIKLARI OYNASI (bir martalik) — brauzerda sinaldi ✓. Konstantalar fayl boshida (HadisCard oldida): NEWS_VER="v8", NEWS_LABEL="8-yangilanish (v8)", NEWS_DATE="2026-07-25", NEWS_ITEMS[8] (raqamlangan, ikonkasiz sodda jumlalar — foydalanuvchi matnni tasdiqlagan). NewsModal: markazda kartochka, chap yuqorida Logo(26)+"Ilova yangiliklari", ostida oltin qatorda NEWS_LABEL · milodiy · hijriy(settings.hijriOffset bilan), o'ng yuqorida faqat ✕; qatorlar orasida yupqa border-top; pastda "Bu oyna bir marta ko'rinadi". om-pop+om-overlay animatsiya, useBack qo'llab-quvvatlaydi.
!!! QOIDA (foydalanuvchi 2026-07-25 da aytdi): NewsModal pastiga "Bu oyna bir marta ko'rinadi" kabi IZOH YOZUVI QO'SHILMAYDI — keyingi yangilanishlarda ham. Oyna faqat: logo+sarlavha, oltin versiya/sana qatori, ✕, raqamlangan ro'yxat.
Ulanishi: om3_news (YANGI KALIT) — ✕ bosilganda setNews(NEWS_VER). Ko'rsatish sharti: `news !== NEWS_VER && gender !== null` (gender modal bilan to'qnashmasligi uchun). Onboarding tugaganda avtomatik setNews(NEWS_VER) — yangi foydalanuvchiga chiqmaydi. KEYINGI YANGILANISHDA: NEWS_VER/NEWS_LABEL/NEWS_DATE/NEWS_ITEMS ni yangilash kifoya — oyna hammaga BIR MARTA qayta chiqadi.

## v5 SPEC (bajarilgan ro'yxat):
1. IBODATLAR BO'LIMI (Bugun tepasida, chiroyli; alohida — dunyoviy foizlarga aralashMAYDI, o'z "Ibodat reytingi" bor):
   - Zikrlar: 3 katakcha (Tonggi, Kechki/tungi, Uxlashdan oldingi) — kun ichida bir marta belgilanadi
   - 5 vaqt namoz: birinchi kirishda jins so'raladi (bir marta, saqlanadi). Bomdod(2S+2F), Peshin(4S+4F+2S), Asr(4F), Shom(3F+2S), Xufton(4F+2S), Vitr. Har rakaat guruhi alohida belgilanadi. Erkak bo'lsa har namozda 🕌 tugmasi — masjidda o'qigani (reytingda balandroq). Ayolda masjid yo'q
   - Nafllar: Tahajjud va Kunduzgi nafl — + bilan rakaat sanaladi, reytingga bonus
   - Qur'on xatmi: boshlanish/tugash sanasi + kunlik vaqt yoki pora — majburiy ro'yxatda turadi
2. Statistika bo'limlarga ajratiladi: Vaqt (pomodoro alohida / pomodorosiz alohida / umumiy; hafta-oy-yil), Ibodat, Vazifalar kesimi, Turlar, Uyqu, Rekordlar...
3. Bugun: ikki rejim — vazifa ro'yxati (hozirgidek) YOKI kun tartibi (har ishga boshlanish-tugash vaqti, to'qnashuv taqiqlanadi; faqat amaldagi vazifalar; kiritilmagan vazifa uchun "to'xtatasizmi?" so'raydi; vazifadagi vaqtdan KAM belgilab bo'lmaydi, ortiq belgilansa farqi "ziyoda"ga; rejim tanlovi sozlangandan keyin 7 kun qulflanadi). Vaqtlar faqat reja uchun — belgilash kun davomida istalgan payt (vijdonga havola). Vazifalar 3 USTUN, faqat nom+vaqt+papka, tugmalarsiz; bosilganda: 100% qildim / ortig'i bilan (qancha — daqiqa/soat) / sababli (o'rinlilik 1-10) / umuman qilmadim; faqat shu kun ichida o'zgartirish/yaxshilash mumkin; kundalik yashil, oliy oltin rangda
4. Sanaladigan vazifa turi: yaratishda tanlov — vaqtli yoki sanaladigan (masalan 100 ta tafsir darsi, qachondan-qachongacha); Bugun pastida "Sanaladigan vazifalar" + tugmasi bilan; kunlik normasiz, kunlik foizga kirmaydi; tugash sanasidan keyin + ishlamaydi; ortda qolsa ogohlantiradi; oliy ko'rsatkichlar ham sanaladigan bo'la oladi
6. Muddatidan oldin 100% yakunlash: Tugatdim erta bosilsa reyting oshadi (qancha erta — shuncha ko'p)
7. Pomodoro: ⏸ pauza; ish tugagach AVTOMATIK DAVOM ETMAYDI — "Bu vaqtda nima qildingiz?" + faol vazifalar ro'yxati; tanlansa o'sha vazifaga daqiqa hisoblanadi (50 daqiqalik vazifaga 25 daq = yarmi); ortiqcha → "ziyoda" + reytingga plus
8. Pomodorosiz ish ham to'liq hisobda (vazifalar/umumiy statistikada), faqat pomodoro bo'limida ko'rinmaydi
9. Bugun'da panel: bugungi reja soatlari vs qilingan (raqam+grafik, 100%+ mumkin, ziyoda qo'shiladi)
10. Interfeys: bo'limlar rang urg'ulari bilan ajratiladi, LEKIN savlat/jiddiylik saqlanadi (chaqnoqlik yo'q)
11. Orqaga qaytish: ekran tugmalari o'rniga telefonning o'z orqaga ishorasi (history API + Capacitor backButton); Taqvim oy tugmalari qoladi
12. Zaxira: "PDF yuklab olish" — haqiqiy o'qiladigan PDF hisobot ichiga BASE64 JSON ma'lumot yashiriladi (masalan %%OMDATA marker EOF dan keyin); "PDF o'rnatish" — fayldan markerni o'qib to'liq tiklaydi (amaldagini o'chirishdan ogohlantirib). JSON tugmasi olib tashlanadi. Profil/parol (Firebase) — Play Market bosqichiga qoldirilgan
Belgilash modeli o'zgaradi: binary o'rniga {status: full|extra|excused|missed, extraMin?, excuseScore 1-10?}; pomodoro daqiqalari qismiy bajarilish beradi (creditedMin/minutes). Eski om3_logs dan migratsiya SHART.
14. (2026-07-20 kech qo'shildi, YOZILDI+sinaldi) Ibodatlar Bugun ichida emas — ALOHIDA SAHIFA (header 🕌 tugmasi, xuddi 📋 kabi); Bugunda "Majburiy bo'lim — to'ldirish shart" yozuvli kirish kartochkasi (reyting bilan).
15. (2026-07-20 kech qo'shildi, YOZILDI+sinaldi) Uyqu TESKARI reyting: rejadan kam uxlash = yuqori reyting, ko'p = past. Kuniga BIR marta ✓ Qildim / ✗ Qilmadim (confirm bilan, qaytarib bo'lmaydi; ✗ endi missed — kunlik foizga salbiy). Belgilagach faqat + bilan soat qo'shiladi (jami rejadan oshsa reyting tushadi). Stat Uyqu bo'limi ham teskari (yashil = kam).
13. UI soddalashtirish (2026-07-20 kelishildi, HAMMASI tasdiqlangan):
   - Bugun'dagi har bo'lim yig'iladigan kartochka (sarlavha bosilsa ochilib-yopiladi, yig'ilganda bir qator xulosa ko'rinadi, holati saqlanadi)
   - Tab tugmalari ekran PASTIGA ko'chadi (bir qo'lda ishlatish uchun)
   - Belgilash pastdan chiqadigan oyna (bottom sheet): 4 katta tugma — 100% / ortig'i bilan / sababli / qilmadim
   - Shartli ko'rsatish: vazn kartochkasi faqat so'rov kuni (payshanba), haftalik hisobot faqat dam kuni (juma)
   - Bugun ochilganda birinchi bajarilmagan vazifaga avto-scroll
   - Namoz to'liq belgilangach qatori ixcham yashil holatga o'tadi
   - ⚙ Sozlamalar guruhlanadi: Zaxira / Ko'rinish / Eslatmalar / Maqsad

## DIZAYN ISHI — YARIM QOLGAN (2026-07-20, KOD HOZIR BUZUQ!)
Foydalanuvchi UI/UX ni premium (dark, Apple/Linear/Notion uslubi) qilishni so'radi — mockup + batafsil spec berdi. Ranglar: bg #16130F, card #201B15, primary #59B483, accent #D7A94B, text #F5F5F5, muted #A5A5A5, ko'k RANG YO'Q, qizil faqat delete. Radius: card 20, btn 18, input 16. Emoji O'RNIGA ichki SVG ikonka. FAB markazda katta. Funksiya O'CHIRILMAYDI — faqat ko'rinish.
BAJARILDI: yangi palitra + global CSS/animatsiya (styleBlock), Icon komponenti + ICONS map (~45 ta SVG, dangerouslySetInnerHTML), Card om-card class, header qayta qurilgan (salom+sana+4 kichik ikonka HdrBtn), pastki nav FAB bilan (NavBtn, + tugma showAdd TaskForm ochadi), Sec komponenti icon prop qabul qiladi, HadisCard/Cell(vazifa kataklari, typeIcon)/IbadatBlock premium, Bugun emojilari tozalandi, sahifa H2 sarlavhalari (Ibodatlar/Vazifalar/Pomodoro/Sozlamalar) ikonka bilan.
!!! XATO: Pomodoro ring markupi noto'g'ri joyga — BugunView dam-kuni return ichiga (~satr 1320, `<Card className="flex flex-col items-center py-8">`) tushib qoldi. U yerda pomo/cfg/leftMs/mm/ss/tLog YO'Q → build buzuq (esbuild: Unexpected export). TUZATISH: 1320-satrdagi ring Card ni O'CHIRIB, o'rniga ESKI dam-kuni "Bugun — dam kuni" kartochkasini qaytarish (😌 5xl, "Bugun — dam kuni", "Yaxshi hordiq oling..."). So'ng xuddi shu ring markupni ASL Pomodoro kartochkasiga (~satr 2699, `<Card className="text-center">` PomoPage ichida) qo'yish.
QOLGAN ISH: Ibodat sahifa rowlari, Statistika dashboard, Maqsad hero, Sozlama iOS-uslub, Taqvim, MarkSheet/Modallar polish, qolgan emojilar (⭐ 📊 😴 🏆 🔥 va h.k.) → ikonka. Fable modelida davom ettiriladi.

## 2026-07-25 KELISHILGAN QARORLAR (kod yozilmagan, muhokama bosqichi)
Foydalanuvchi 14 bandli muammo ro'yxati berdi; quyidagi qarorlar TASDIQLANDI:
- Yil xaritasi (heatmap kvadratchalar) — SHART EMAS, qilinmaydi
- Dam kuni statistika = HAFTALIK HISOBOT rejimiga o'tadi — HA
- Pomodoro/pomodorosiz bo'linishi — OLIB TASHLANADI (pomodoro soni bitta raqam bo'lib qoladi)
- Vazifalar ro'yxatiga kirish: HOZIRGIDEK pastdagi + orqali. Tepadagi (sozlamalar yonidagi) Vazifalar tugmasi VA Ibodat tugmasi OLIB TASHLANADI — tepada FAQAT Sozlamalar qoladi (to'g'ri tishli-g'ildirak ikonka + ostida "Sozlamalar" yozuvi). "Oliy maqsad belgilash" (metrics) ham pastdagi + ichiga ko'chadi
- Bildirishnoma logosi: OQ SILUET bo'lishiga rozi (Android cheklovi)
- STATISTIKA BO'LIMLARI KO'RINISHI: Vaqt · Vazifa · Uyqu — HAR KUNI. Ibodat va Turlar — HAFTADA BIR (dam kunida). Rekordlar — OYDA BIR. Boshqa bo'lim yo'q.
Tasdiqlangan tavsiyalar (mening takliflarim, foydalanuvchi ma'qulladi): taqqoslash (oldingi davr bilan), bir jumlalik xulosa, uzluksizlikni yuqoriga chiqarish, kuchli/bo'sh tomon kartochkalari, chiziqli SVG grafik (faqat JAMLANUVCHI ma'lumotga o'sadigan chiziq; kunlik foizga ustuncha/halol chiziq), "Uyqu kundaligi" ro'yxati, ziyoda foizga qo'shilishi (XATO — markFrac full/extra ga bir xil 1 beradi, 100% da to'xtaydi).
UZLUKSIZLIK (streak) BUTUNLAY OLIB TASHLANADI — statistikada ham, hech qayerda ham ko'rsatilmaydi (uzluksizlik() funksiyasi va unga bog'liq nishonlar o'chadi). O'rniga TAQVIM KUN RANGLARI aniq qoidaga o'tadi (foydalanuvchi tasdiqladi): 100% → YASHIL · 40–99% → SARIQ · 40% dan kam → QIZIL · dam kuni → RANGSIZ (neytral, hisobga kirmaydi). Eski kod noto'g'ri edi: pct>0 bo'lsa sariq, pct=0 bo'lsa qizil (ya'ni 5% ham sariq bo'lardi).
Qo'shimcha qarorlar: Rekordlar OYNING OXIRGI DAM KUNIDA chiqadi ("oylik yakun"). Dam kunidagi haftalik hisobot STATISTIKA bo'limida ko'rinadi (a varianti) — o'sha kuni Statistika "haftalik hisobot" ko'rinishiga o'tadi; Bugun — amal kuni, Statistika — hisob kuni.
Premium to'plam yasaladi (15 native input + 40 tizim oynasi o'rniga): VAQT tanlagich (aylanadigan ustunlar, daqiqa 5 lik qadam, oraliq "dan-gacha" bitta oynada + davomiylik), SANA tanlagich (kalendar, OK tugmasisiz — bosdi/tanlandi/yopildi, tezkor "Bugun/Ertaga", hijriy sana), KUN tanlagich (rang-barang ma'nosiz ikonkalar YO'Q — doira ichida Du/Se/Ch..., bitta rangda, "kuni so'ralsin" takrori yo'q), TASDIQ oynasi.

## STATISTIKA — YANGI SPEC (2026-07-25, foydalanuvchi mockup + izohlar bilan tasdiqladi; KOD YOZILMAGAN)
Tepada 3 ta tab: **Kunlik · Haftalik · Oylik** (YILLIK hozir KERAK EMAS — keyinga).
KUNLIK ko'rinish (mockup asosida — faqat shu, boshqa hech narsa):
1. Katta halqa: bugungi umumiy natija % ("Bugungi natija") — kundalik VA oliy vazifalar BIRGALIKDA
2. Ostida rag'batlantiruvchi bir jumla + NOZIK IKONKA (emoji YO'Q)
3. Grafik ("Kunlik faollik"): SOATLAR O'QI YO'Q — har nuqta = BIR KUN, kunlik o'sish. Foydalanuvchi talabi: nuqtalar orasidagi kun qaysi kunga tegishli ekani BILINISHI kerak → sana yorliqlari + nuqtaga bosilganda kun va qiymat chiqadi (tooltip)
4. Ikki kartochka: "Bajarilgan vazifalar" (12/15) va "Umumiy vaqt" (6s 45d) — ikkalasi FAQAT BUGUNGI, har birida KECHAGIGA nisbatan ↑/↓ farqi
5. "Ketma-ketlik" va "Maqsadlar" kartochkalari YO'Q (uzluksizlik butunlay olib tashlangan)
Qolgan hamma ko'rsatkich (Uyqu, Ibodat, Turlar, kuchli/bo'sh tomon, ziyoda va h.k.) — HAFTALIK statistikaga o'tadi. Uyqu ham kunlikda YO'Q.
HAFTALIK va OYLIK ko'rinishlar: kunlikdan BOSHQACHA, premium va JUDA TUSHUNARLI bo'lishi kerak (dizayni hali kelishilmagan). HAFTALIK HISOBOT JOYI (aniqlashtirildi, foydalanuvchi "2" ni tanladi): IKKI JOYDA — to'liq hisobot Statistikada; Bugun sahifasida dam kuni QISQA XULOSA kartasi ("Haftangiz 78% — to'liq hisobotni ko'rish"), bosilsa Statistikaga olib boradi.

### BAJARILDI (2026-07-25 kech, brauzerda sinaldi ✓) — A-BOSQICH POYDEVOR:
- minToHm() yordamchisi qo'shildi. DAYS_ORDER = [1,2,3,4,5,6,0]
- Wheel: aylanadigan ustun (scroll-snap, bosib tanlanadi, 44px qator)
- TimeRangeSheet: "Boshlanish/Tugash" tablari, ikki g'ildirak (soat 0-23, daqiqa 5 lik qadam), "Hozir" + davomiylik chiplari (30/1s/1.5s/2s), jonli "Davomiyligi: N", manfiy oraliqda ogohlantirish+Saqlash o'chiq. `single` rejimi ham bor (eslatma vaqti uchun — tab/chip/davomiylik yashiriladi)
- DateSheet: tezkor "Bugun/Ertaga/Bir haftadan", oy kalendari, OK TUGMASI YO'Q (bosdi→tanlandi→yopildi), min bilan xira sanalar, ostida "sana · hijriy"
- DayCircles: bir qatorda 7 doira (Du..Ya), single rejimi ham bor, accent rangi sozlanadi
- DialogHost + omConfirm()/omAlert(): global dialog bus (dlgSet), Promise qaytaradi; App'da <DialogHost/> render qilinadi. window.confirm/alert o'rniga ishlatiladi (hozircha faqat TaskForm'da almashtirildi — QOLGAN ~38 joy hali eski)
- TaskForm ULANDI: vaqt oralig'i tugmasi→TimeRangeSheet, "Qaysi kunlari?" QAYTARILDI (Har kuni + DayCircles, days saqlanadi), boshlanish "Sana..."→DateSheet (window.prompt o'chdi), sanaladiganda "Qachongacha"→DateSheet, eslatma→TimeRangeSheet single
SINOV: 10:00→11:00 tanlandi, "Davomiyligi: 1 s" ✓, noto'g'ri oraliqda ogohlantirish ✓, sana bosilganda darhol yopildi ✓, hijriy ko'rindi ✓. build+sync ✓.
### A-BOSQICH TUGADI (2026-07-26): TIZIM OYNALARI 100% ALMASHTIRILDI
- TaskEdit ham ulandi: vaqt oralig'i tugmasi, "Qaysi kunlari?" (Har kuni + DayCircles, days saqlanadi), Qachongacha→DateSheet, eslatma→single TimeRangeSheet
- TimeRangeSheet'ga `wrap` prop qo'shildi (yarim tundan o'tuvchi oraliq: dur = (to-from+1440)%1440) — uyqu rejasi 23:00→06:00 uchun. SleepPlanCard range tanlash endi TimeRangeSheet wrap bilan
- Onboarding 9-bosqich: vazn kuni select→DayCircles single (13-band ✓)
- Sozlamalar fullReset: "HA" yozish O'CHDI → ikki bosqichli premium omConfirm (danger) (14-band ✓). replan, importFile, openTelegram ham omConfirm'ga o'tdi
- PauseSheet yaratildi (1-7 kun tugmalari) — BugunView pausePrompt va TaskEdit "To'xtatish" window.prompt o'rniga
- window.alert (18) → omAlert: global replace. window.confirm (16 ta haqiqiy) → omConfirm: `onClick={() => { if (window.confirm(` → `onClick={async () => { if (await omConfirm(` regex + 5 tasi qo'lda (count maqsad, switchMode, saveSleep, openTelegram, importFile)
- QOLDI: 0 ta window.alert/confirm/prompt (faqat omConfirm ichidagi zaxira fallback va izohlar). SINALDI: PauseSheet ✓, tasdiq oynasi ✓, build+sync ✓
### B-BOSQICH TUGADI (2026-07-26, brauzerda sinaldi ✓)
- OyatCard: "200-oyatida"→"200-oyatda" ✓; arab shrifti tuzatildi (mavjud bo'lmagan Amiri/Scheherazade→'Noto Naskh Arabic','Droid Arabic Naskh','Geeza Pro'; 21px→16px, lineHeight 2.15, wordSpacing .06em, max-w-[19rem]) — endi ixcham va o'qilishli
- Yangi "gear" ikonkasi (haqiqiy tishli g'ildirak, Lucide uslubi). Eski "settings" ikonka quyoshga o'xshardi
- HEADER: ibodat/pomo/vazifalar tugmalari OLIB TASHLANDI — faqat Sozlamalar qoldi (gear ikonka + ostida "Sozlamalar" yozuvi). HdrBtn ishlatilmaydi
- Pastdagi + endi ADD MENU ochadi (Sheet "Nima qo'shamiz?"): Kundalik vazifa · Oliy maqsad vazifasi · Oliy maqsad belgilash (MetricsEdit) · Barcha vazifalar (VazifalarPage — aks holda ro'yxat/arxiv/qidiruv/uyqu rejasiga kirish yo'li qolmasdi). showAdd endi null|"daily"|"oliy"
- Dam kuni Bugun'da: "Haftalik hisobot" kartasi o'rniga QISQA XULOSA kartasi ("Haftangiz N% · X bajarildi — to'liq hisobotni ko'rish") → bosilsa Statistika tabiga o'tadi (openStat propi)
- DINIY MISOLLAR UMUMIYGA ALMASHTIRILDI: "Fiqh kitoblari"→"Kitob o'qish", "Quduriy kitobini o'qish"→"Ingliz tili darsi", "Tafsir darslari"→"Video darslar", "100 ta tafsir darsi"→"100 ta dars", onboarding maqsad namunasi→"kasbimda yetuk mutaxassis + sog'lom turmush", iqtibos placeholder umumiy, kun xulosasi placeholder umumiy
SINOV: header 1 tugma ✓, + menyu 4 tanlov ✓, MetricsEdit + dan ochildi ✓, oyat matni to'g'ri ✓. build+sync ✓.
### C-BOSQICH TUGADI (2026-07-26)
- android/app/src/main/res/drawable/ic_stat_om.xml yaratildi — OQ SILUET vector drawable (tog'+bayroq, 1920 viewport, #FFFFFFFF). Barcha bildirishnomalarga `smallIcon: "ic_stat_om"` qo'shildi (kunlik eslatmalar + pomodoro 3001)
- pushDaily(body,h,mi,days?) — endi days paramini oladi: bo'sh bo'lsa har kuni, aks holda FAQAT tanlangan hafta kunlarida. Dam kuni har doim chiqarib tashlanadi. t.days uzatiladi (schedFrom va remTime uchun)
- Pomodoro bildirishnoma matnidan emoji olib tashlandi. useEffect dep arrayga t.days va plan.restDay qo'shildi
### F-BOSQICH TUGADI (2026-07-26, brauzerda sinaldi ✓) — OLIY MAQSAD BUTUNLAY QAYTA
Yangi tuzilma (4 blok): 1) Maqsad matni hero (yashil karta, pencil ikonka bilan tahrir — Sheet) · 2) KATTA HALQA: planPct = NATIJA foizi, markazda "N%" + "Maqsadlar bajarildi", ostida oltin yozuv "{yearNum}-yil · {N} kun qoldi" (faqat info) · 3) "{yearNum}-yil maqsadlari" kartasi: har maqsad qatori (nom + val/target + progress chizig'i), bosilsa JarayonSheet; pastida kichik "Vazifalar tarixi" kirishi (ikonka+yozuv, bahaybat emas); BO'SH HOLAT: "Hali oliy maqsad belgilanmagan" + katta "Oliy maqsad belgilash" tugmasi · 4) "Bu hafta — oliy vazifalar": Bajarildi/Bajarilmadi/Sababli 3 katak + har birida O'TGAN HAFTAGA nisbatan farq (Delta)
OLIB TASHLANDI: "Oldindasiz/Ortdasiz" hukmi, Soatlar hisobi, Vazn grafigi, yil yakuni kartalari (→ Statistikaga ko'chadi)
YANGI KOMPONENTLAR: MPER davrlar (Hafta/Oy/6 oy/Yil) + PerTabs · JarayonSheet (bitta maqsad: davr bo'yicha "shu davrda" va "yillik maqsad" kataklari, progress, PROGNOZ "shu tempda yil oxirida ~N ta bo'ladi", vazifalar ro'yxati) · VazifaTarixi (har oliy vazifa: davr bo'yicha % + Bajarildi/Bajarilmadi/Sababli, rang 80+/40+/past)
SINOV: Maqsad tab ✓, halqa+kun qoldi ✓, maqsad bosilganda Jarayon ochildi (Hafta/Oy/6oy/Yil) ✓, Vazifalar tarixi ✓, haftalik 3 katak+delta ✓
### D + E BOSQICHLARI TUGADI (2026-07-26, brauzerda sinaldi ✓)
ZIYODA XATOSI TUZATILDI: markFrac endi "extra" uchun 1 + extraMin/minutes (max 2) qaytaradi (avval full va extra ga bir xil 1 berardi). dayStats pct 150% gacha chiqadi (Math.min(...,150)). Shu bilan ortiqcha mehnat foizga qo'shiladi.
TAQVIM RANGLARI (E-bosqich): pct>=100 yashil · >=40 sariq · <40 qizil · dam kuni/null rangsiz. Oylik sanoq (g/yl/r) ham shu qoidaga o'tdi.
STATISTIKA BUTUNLAY QAYTA YOZILDI (eski 6 bo'limli SECS tizimi o'chdi):
- Yangi komponentlar: LineChart (SVG area+line, har nuqta = bir kun, nuqtaga bosilsa "sana + qiymat" chiqadi — foydalanuvchi talabi), Delta2 (o'tgan davrga nisbatan farq, chevron bilan), StatCard, UyquKundaligi (Sheet: kun + soat + rejaga nisbatan kam/rejada/ko'p, oxirgi 40 yozuv)
- 3 tab: Kunlik · Haftalik · Oylik (Yillik yo'q)
- KUNLIK: katta halqa (Bugungi natija %) → rag'bat jumlasi + nozik IKONKA (emoji yo'q, pct ga qarab 4 xil) → "Kunlik faollik — 14 kun" LineChart (vaqt) → 2 StatCard (Bajarilgan vazifalar, Umumiy vaqt) har birida KECHAGIGA nisbatan Delta2 → "Oxirgi 7 kunda N kun to'liq bajarilgan" (momentum, jazolamaydi)
- HAFTALIK: hafta oralig'i + o'rtacha % + o'tgan haftaga Delta2 → 7 kunlik ustunchalar (TAQVIM RANGLARIDA) → 3 StatCard (Jami vaqt/Bajarildi/Ziyoda, har biri delta bilan) → Kuchli tomon + E'tibor bering → Uyqu (o'rtacha + "Uyqu kundaligi" tugmasi) → Ibodat (o'rtacha%, masjid, nafl) → "Vaqt qayerga ketdi" (turlar bo'yicha, foiz bilan)
- OYLIK: oy o'rtacha % + o'tgan oyga delta → LineChart (oy kunlari) → HAFTALAR TAQQOSLASHI (5 ustuncha) → 3 StatCard → kuchli/bo'sh → "Oylik yakun" FAQAT oyning oxirgi dam kunida (aks holda izoh yozuvi)
- Yordamchilar: taskPct, bestWorst, agg (min/done/extra)
EMOJI 100% TOZALANDI (46 ta → 0): pomodoro 🍅→timer ikonka, xatm/uyqu/papka/kun-tartibi sarlavhalari, DayDetail belgilari, PomoAsk, rejim tanlash. Ishlatilmayotgan TABS massivi o'chirildi. TaskDetailStat: Modal→Sheet, uzluksizlik qatori olib tashlandi (uzluksizlik() funksiyasi endi HECH QAYERDA ishlatilmaydi).
SINOV: Kunlik (halqa/grafik/2 karta/momentum) ✓, Haftalik (ziyoda 30 daq ko'rindi — xato tuzalgani tasdiqlandi, kuchli/bo'sh, uyqu, ibodat, turlar) ✓, Oylik (haftalar taqqoslashi, oylik yakun izohi) ✓, sahifada 0 emoji ✓
### I-BOSQICH TUGADI (2026-07-26) — YO'L-YO'RIQ. BARCHA BOSQICHLAR (A,B,C,D,E,F,G,H,I) YAKUNLANDI
- Hint komponenti: punktir oltin ramka, info ikonka, matn, ✕. om3_hints (YANGI KALIT) da saqlanadi. doneHint(k) App'da, BugunView'ga uzatiladi
- 3 ISHORA (har biri bir marta, ish bajarilsa AVTOMATIK yo'qoladi): "tiles" (mini-kartochkalar bosiladi — kartochka bosilganda o'chadi, openTile wrapper) · "mark" (vazifa katakchasini bosib belgilash — setMark chaqirilganda o'chadi) · "add" (pastdagi + haqida — FAB bosilganda o'chadi; nav ustida fixed holatda ko'rinadi)
- BO'SH EKRANLAR O'ZI O'RGATADI: Bugun'da vazifa yo'q → "Pastdagi + orqali qo'shing" (premium matn) · Statistika butunlay bo'sh (log va vazifa yo'q) → "Statistika hali bo'sh — vazifa qo'shib, bir necha kun belgilab boring" · Maqsad bo'sh → allaqachon F-bosqichda qilingan · Vazifalar bo'sh → allaqachon bor
- Sozlamalarda YORDAM bo'limi: "Qanday ishlaydi?" → HelpSheet (HELP_ITEMS: 10 ta bo'lim izohi — Bugun, Qo'shish, Vazifa vaqti, Qo'shimcha ish, Ibodatlar, Pomodoro, Taqvim, Statistika, Oliy maqsad, Zaxira)
- NEWS v8→v9 yangilandi (9 band: statistika, ziyoda foiz, oliy maqsad, tanlagichlar, kunlar, bildirishnoma logosi, taqvim ranglari, uyqu kundaligi, Qanday ishlaydi)
SINOV: 3 ishora chiqdi ✓, mini-kartochka bosilgach "tiles" ishorasi yo'qoldi va om3_hints ga yozildi ✓, HelpSheet ochildi ✓. build+sync ✓.
### XATO TUZATILDI (2026-07-26): PDF YUKLAB OLISH ISHLAMASDI
Foydalanuvchi xabari: "pdf yuklab olish ishlamayapti, bossa hech nima bo'lmayapti" (o'rnatish ishlaydi).
IKKI SABAB: (1) `<a download>` elementi DOM'ga QO'SHILMAGAN edi — detached anchor'da click() ko'p brauzerda ishlamaydi; (2) ASOSIY: Android WebView `blob:` havolani umuman yuklab olmaydi (Capacitor'da ma'lum cheklov) — shuning uchun telefonda hech narsa bo'lmasdi.
YECHIM: @capacitor/filesystem + @capacitor/share O'RNATILDI (endi 5 plagin). Yangi `saveFile(blob, filename)` yordamchisi: telefonda → blob'ni base64'ga o'giradi, Filesystem.writeFile({directory:"DOCUMENTS", recursive:true}), so'ng Share.share({url}) bilan ulashish oynasi (Telegram/Drive'ga saqlash uchun — foydalanuvchining odatdagi yo'li); Share yo'q/bekor bo'lsa omAlert bilan qayerga saqlangani aytiladi; xato bo'lsa ruxsat haqida ogohlantiradi. Brauzerda → anchor DOM'ga qo'shiladi, click, 1.5s dan keyin tozalanadi. pdfBackup va fullReset async bo'ldi.
SINOV (brauzer): tugma bosildi → anchor inDom:true, fayl nomi oliy-maqsad-zaxira-2026-07-26.pdf, lastBackup yozildi ✓. TELEFONDA SINALMAGAN (Filesystem/Share yo'li APK talab qiladi).
!!! TELEFONDA SINALMAGAN — APK QAYTA QURISH KERAK. Sinov ro'yxati: premium tanlagichlar (vaqt/sana/kun), tasdiq oynalari, bildirishnoma (tanlangan kunlarda + oq logo), yangi Statistika 3 ko'rinish, Oliy maqsad, Taqvim ranglari, ziyoda foiz, 3 ishora, Qanday ishlaydi, v9 yangiliklar oynasi.
ESKI KEYINGI: B (Bugun/header: oyat shrifti, 200-oyatda, tepada faqat Sozlamalar, tishli g'ildirak+yozuv, + ichida 3 tanlov, dam kuni xulosa kartasi) → C (bildirishnoma tanlangan kunlarda + oq siluet logo) → F (Oliy maqsad) → D (Statistika) → emoji tozalash + umumiy misollar

## KEYINGI YANGILANISH — TO'LIQ ISH RO'YXATI (2026-07-25 kelishildi, KOD YOZILMAGAN)
A. TIZIMLI (butun ilova bo'ylab, bir marta yasalib hamma joyda ishlatiladi):
 1. Premium VAQT tanlagich (aylanadigan ustunlar, daqiqa 5 lik qadam, "dan-gacha" bitta oynada + davomiylik, "Hozir")
 2. Premium SANA tanlagich (kalendar, OK tugmasisiz — bosdi/tanlandi/yopildi, tezkor "Bugun/Ertaga", ostida hijriy)
 3. Premium KUN tanlagich (bir qatorda 7 doira: Du Se Ch Pa Ju Sh Ya, bitta rangda, ma'nosiz rangli ikonkalar YO'Q)
 4. Premium TASDIQ oynasi — 40 ta window.confirm/alert/prompt o'rniga
 5. 96 ta emoji → premium ikonka
 6. Barcha misol/placeholderlar diniy emas, UMUMIY (Quduriy/Fiqh/Tafsir → Kitob o'qish/Sport/Til)
B. BUGUN + HEADER:
 7. Arab oyat shrifti tuzatish (hozir mavjud bo'lmagan shrift ko'rsatilgan → tizim shrifti, katta/qo'pol)
 8. "surasi 200-oyatida" → "surasi 200-oyatda"
 9. Tepada FAQAT Sozlamalar (Ibodat va Vazifalar tugmalari olib tashlanadi)
 10. Sozlamalar ikonkasi → haqiqiy tishli g'ildirak + ostida kichik "Sozlamalar" yozuvi
 11. Pastdagi + ichida: Kundalik vazifa · Oliy maqsad vazifasi · Oliy maqsad belgilash
 12. Dam kuni Bugun'da qisqa xulosa kartasi ("Haftangiz N% — to'liq hisobotni ko'rish") → Statistikaga o'tadi
C. VAZIFA TIZIMI:
 13. "QAYSI KUNLARI" QAYTARILADI (premium kun tanlagich, default "Har kuni") — olib tashlanishi XATO edi: har kunlik bo'lmagan ish uchun foiz tushib, taqvim rangi buzilardi
 14. Bildirishnoma FAQAT tanlangan kunlarda keladi (dam kunida umuman yo'q — allaqachon bor)
 15. Bildirishnoma logosi — OQ SILUET (android/res drawable + smallIcon)
D. STATISTIKA (butunlay qayta — spec yuqorida):
 16. 3 tab: Kunlik · Haftalik · Oylik (Yillik keyinga)
 17. Kunlik: halqa → jumla+nozik ikonka → kunlar grafigi (bosilsa kun+qiymat) → 2 kartochka (kechagiga ↑↓) → MINIMAL momentum qatori ("oxirgi 7 kunda N kun to'liq" — jazolamaydi, faqat xabar beradi)
 18. Haftalik: hafta oralig'i, o'rtacha %+farq, 7 kunlik ustunchalar (taqvim ranglarida), kartochkalar (vaqt/bajarilgan/ziyoda), Kuchli tomon + E'tibor bering, Uyqu + "Uyqu kundaligi", Ibodat, Turlar
 19. Oylik: o'rtacha %+farq, oy grafigi, HAFTALAR TAQQOSLASHI, kartochkalar, kuchli/bo'sh, Rekordlar (oyning oxirgi dam kunida)
 20. ZIYODA foizga qo'shilsin (XATO: markFrac full va extra ga bir xil 1 beradi → 100% da to'xtaydi)
 21. uzluksizlik() funksiyasi va nishonlari BUTUNLAY o'chadi
E. TAQVIM: 22. Kun ranglari 100%→yashil · 40–99%→sariq · <40%→qizil · dam kuni→rangsiz
F+. OLIY MAQSAD — ANIQLASHTIRILDI (2026-07-25 kechqurun, foydalanuvchi izohlari):
 F1. "Oliy maqsad qo'shish" v8 dagi vazifa qo'shish kabi SODDA va tushunarli bo'lsin. Sozlamalar yonidagi funksiya u yerdan olinib, pastdagi Vazifalar/Oliy maqsad bo'limining YUQORIROQ qismiga joylashadi
 F2. Har bir oliy maqsad ustiga bosilsa — o'sha maqsad bo'yicha HAFTALIK · OYLIK · 6 OYLIK · YILLIK statistika chiqadi
 F3. Maqsadlar ro'yxati eng tagida "umumiy statistika" kirishi — KICHIK ikonka + ostida yozuv (bahaybat karta emas). Bosilsa: har vazifa shu vaqtgacha qanday bajarilgani, tepasida davr tanlash (Statistikadagi kabi)
 F4. "Oldindasiz/Ortdasiz" yozuvi OLIB TASHLANADI. O'rniga: bu hafta umumiy nechta bajarilgan · bajarilmagan · sababli. Va foydalanuvchi yozgan maqsad matni ham tursin
 JAVOBLAR: (a) maqsad matni TEPADA (hero) · (b) katta halqa QOLADI, lekin FAQAT INFO (bosilmaydi, hukm qilmaydi) · (c) haftalik bajarilgan/bajarilmagan/sababli — UMUMIY (barcha oliy vazifalar bo'yicha)
 YAKUNIY TARTIB: 1) maqsad matni (hero, tepada) → 2) katta halqa (info) → 3) maqsadlar ro'yxati (har biri bosilsa haftalik/oylik/6oylik/yillik) → 4) kichik ikonka: umumiy statistika (har vazifa, davr tanlash bilan) → 5) pastda: bu hafta bajarilgan/bajarilmagan/sababli (umumiy)
 QO'SHIMCHA TASDIQLANGANLAR: HALQA = NATIJA foizi (maqsadlarning bajarilgani), ostida kichik yozuvda vaqt ("1-yil · 1822 kun qoldi") · NOMLAR FARQLANADI (chalkashmasligi uchun): asosiy bo'lim "Statistika", har maqsad ichidagi "Jarayon", ro'yxat oxiridagi umumiy "Vazifalar tarixi" (nomlar taklif — o'zgartirish mumkin) · BO'SH HOLAT: maqsad yo'q bo'lsa "Hali oliy maqsad belgilanmagan" + katta Qo'shish tugmasi (kirishdan metrics olib tashlangani uchun MAJBURIY) · haftalik hisob yonida O'TGAN HAFTA raqami taqqoslash uchun.
F. OLIY MAQSAD (butunlay qayta): 23. Uch blok — maqsad matni (ixcham) → katta halqa (5 yillik yo'lda X%, N-yil/365-kun) → yillik maqsadlar ro'yxati (chiziq + bosilsa tafsilot). 24. "Oliy maqsad belgilash" TEPAROQDA ixcham premium shaklda (Vazifalar→Oliy'da ham qoladi). 25. Soatlar hisobi/vazn grafigi/yil yakuni → Statistikaga ko'chadi
G. KIRISH: 26. Vazn kuni tanlash → premium kun tanlagich
H. SOZLAMALAR: 27. "Butunlay noldan boshlash" — "HA" yozish o'rniga premium tasdiq tugmasi (hozirgi XATO: katta harf talab qiladi + Android'da prompt ishonchsiz)
I. YO'L-YO'RIQ (tasdiqlandi — klassik ko'p bosqichli tour QILINMAYDI, chunki 11 bosqichli kirishdan keyin charchatadi):
 1. BO'SH EKRANLAR O'ZI O'RGATADI (asosiy usul): Vazifalar bo'sh → "Hali vazifa yo'q — pastdagi + orqali qo'shing"; Maqsad bo'sh → "Hali oliy maqsad belgilanmagan" + Qo'shish; Statistika bo'sh → "Bir necha kun belgilagach, natijalar shu yerda ko'rinadi"
 2. FAQAT 3 TA NOZIK ISHORA (o'zidan ko'rinmaydigan joylarga, har biri BIR marta, ish bajarilsa butunlay yo'qoladi, o'sha ekranga birinchi kirganda — kirishdan keyin darhol EMAS): (a) pastdagi + (vazifa/maqsad shu yerdan), (b) mini-kartochkalar qatori bosiladigani, (c) vazifa katakchasini bosib belgilash
 3. Sozlamalarda kichik "Qanday ishlaydi?" bo'limi (kim istasa qaytib o'qiydi)
!!! KEYINGI YANGILANISHDA ESLATISH: ilovaning OMMAGA MOSLIGI (mass-market) haqida gaplashish — foydalanuvchi so'radi.
!!! SINOVDA TEKSHIRISH: "Oliy maqsad belgilash"ni begona odam topa oladimi (ko'chirilgan narsalar topilmay qolish xavfi).

## KELAJAK REJALARI
- !!! PLAY MARKET BOSQICHIDA ESLATISH SHART (foydalanuvchi maxsus so'radi): TASHQI ILOVA BELGISI (launcher ikonka) TANLOVI funksiyasini qo'shish — foydalanuvchi Sozlamalar→Ko'rinishdan oq/yashil/sariq/4-variant logolardan birini tanlaydi. Web/Capacitor'da MUMKIN EMAS (Android activity-alias + native Kotlin/Java kerak). Logolar tayyor: C:\oliy-maqsad\Logolar\ (1/2/3-varyant + 4-variant.jpg + oliy maqsad.svg + oq.png). Play/native bosqichiga o'tilganda BIRINCHI navbatda shu eslatilsin.
- Kirill alifbosi varianti — Play Marketdan oldin
- Play Market: $25 hisob, Capacitor AAB, ~12 sinovchi 14 kun yopiq test; maxfiylik siyosati sahifasi kerak
- Firebase profil-sinxronlash — Play bosqichida

## MUHIM ESLATMALAR
- Har katta o'zgarishdan oldin foydalanuvchiga zaxira oldirish
- AI Studio'da kod FAQAT qo'lda joylanadi (Gemini chatiga ishonilmaydi)
- package.json da @google/genai qoldiq turibdi — zarari yo'q
- Android Studio yangilash takliflari doim RAD etiladi

## TILLAR — 1-BOSQICH (POYDEVOR) BAJARILDI (2026-07-26, brauzerda sinaldi ✓)
QARORLAR (foydalanuvchi tasdiqladi): lug'at App.tsx ICHIDA (bitta fayl nusxalash saqlanadi; keyin kerak bo'lsa ajratish oson) · KALIT = o'zbekcha lotin matnning O'ZI (t("Bugun")) — tarjima topilmasa o'zbekchasi ko'rinadi, hech qachon buzilmaydi · Sozlamalarda 4 til ko'rsatiladi.
QO'SHILGANI (App.tsx eng boshiga, import'dan keyin, ~60 satr): type Lang="uz"|"uzk"|"ru"|"ar" · TILLAR massivi (holat: tayyor|sinov|tez) · LUGAT (hozircha BO'SH — uz uchun yozuv kerak emas) · KIRIL_ISTISNO (avto-o'girish xato chiqqan matnlar uchun) · KIR_HARF + KIR_QOIDA + toKiril() kesh bilan · `let CUR` (localStorage om3_lang dan boshlanadi) · t(s) · tf(s,vals) — "{n} kun qoldi" kabi sonli matnlar uchun.
KIRIL QOIDA TARTIBI (muhim): 1) so'z boshidagi E→Э 2) o'/g'→ў/ғ 3) harflar orasidagi tutuq '→ъ 4) sh/ch/yo/yu/ya/ye 5) qolgan harflar. Shu tartib "yo'q→йўқ", "ma'no→маъно", "sherik→шерик" ni to'g'ri chiqaradi. Node bilan 33 ta matn sinaldi — hammasi to'g'ri.
ULANISHI: App'da `const [lang,setLang]=useStored<Lang>("om3_lang","uz"); CUR=lang;` (om3_ui dan keyin) — memo yo'q, til almashsa butun daraxt qayta chiziladi. SozlamaPage'ga lang/setLang proplari.
UI: Sozlamalar → "TIL" bo'limi (Ma'lumotlar bilan Ko'rinish orasida), 2x2 kartochka, yangi "globe" ikonkasi. O'zbekcha=tanlangan · Ўзбекча="Кирилл · синов" (BOSILADI — o'ralgan matnlarni sinash uchun) · Русский/العربية = xira, o'chiq ("tez orada").
YANGI KALIT: om3_lang (default "uz"). Eski 27 kalitga TEGILMADI.
SINOV: ilova ochildi (24 kalit joyida), TIL bo'limi ko'rindi, Ўзбекча bosildi → "TIL"→"ТИЛ", "tez orada"→"тез орада", om3_lang="uzk" saqlandi ✓. build ✓ cap sync ✓.
KEYINGI: 584 matnni t() ga o'rash — bo'lim-bo'lim (Bugun → Vazifalar → Ibodat → Pomodoro → Statistika → Maqsad → Taqvim → Sozlamalar → Kirish → oynalar). Kirill rejimida qaralsa, LOTIN qolgan joy = hali o'ralmagan joy (progress ko'rsatkichi). ESLATMA: t() ni modul darajasidagi const ichida CHAQIRMASLIK kerak (OYLAR/KUNLAR/NEWS_ITEMS/HELP_ITEMS xom o'zbekcha qoladi, t() ular ishlatilgan JOYDA qo'llaniladi).
### TILLAR TUZATISH (2026-07-26, foydalanuvchi so'rovi; brauzerda sinaldi ✓)
RUS TILI BUTUNLAY OLIB TASHLANDI (koddan ham). Lang endi: "uz"|"uzk"|"en"|"ar". O'rniga ENGLISH qo'shildi — DIQQAT: english avtomatik o'girilmaydi, 584 matn QO'LDA tarjima qilinadi (kirilldan farqli).
TILLAR massiviga `belgi` (Aa/Аа/Aa/أ) va `rang` maydonlari qo'shildi. Ranglar (foydalanuvchi tanlovi, bosiq ohangda — dizayn qoidasi buzilmasin uchun): uz #5B8AA6 ko'k-kulrang · uzk #B0574E g'ishtrang · en #C8843C kuzgi aranj · ar #4E9B72 zumrad.
KARTOCHKA: 44px rangli doira ichida alifbo belgisi (fon rang+"26", matn rang) + nom + izoh. TANLANGAN til o'z rangida ramka (2px) va rang+"14" fon oladi — yashil emas. Tanlanmagan sokin turadi, "tez orada" bo'lsa opacity .5 + disabled.
SINOV (computed style bilan tekshirildi, skrinshot xizmati bu muhitda ishlamaydi): 4 doira 4 xil rangda ✓, tanlangan Ўзбекча qizil ramka+fon ✓, English/العربية o'chiq ✓. build ✓ cap sync ✓.

## 2026-07-27 — TIL SAHIFASI (mockup dizayni)
Foydalanuvchi skrinshot berdi: Sozlamalar ichidagi 2x2 to'r EMAS, alohida sahifa — ro'yxat ko'rinishida.
- `TilPage` (SOZLAMALAR bo'limidan oldin): om-card header (chapda ← arrowLeft yashil, markazda "Til") · izoh matni · bitta om-card ichida 4 qator (border-t bilan ajratilgan): 56px gradient plitka + oq belgi + nom + kichik izoh + o'ngda radio (tanlanganda o'sha til rangida to'ladi) · pastda info ikonka + izoh
- TILLAR: nom mockupdagidek, `belgi` (O'/ў/Aa/ض), `grad` (gradient). Ranglar: uz #3B7BC4 · uzk #C0453C · en #D98A32 · ar #3E9E6E
- Ulanish: page union'ga "til"; SozlamaPage'da TIL bo'limi → bitta bosiladigan Card ("Ilova tili" + joriy til + chevron); SozlamaPage propi setLang O'RNIGA openTil; BackCloser page==="til" → "sozlama" (null emas)
- MOCKUPDAN ATAYLAB CHEKINISH (3 ta): (1) "Til o'zgartirilganda ba'zi ma'lumotlar qayta yuklanishi mumkin" YOZILMADI — bizda hech narsa qayta yuklanmaydi, yolg'on bo'lardi; o'rniga "Tarjimasi hali tayyor bo'lmagan matnlar o'zbekcha ko'rinadi" (2) en/ar disabled + opacity .45 + "tez orada" — tarjima yo'q, aks holda ilova buzuqdek ko'rinardi (3) ko'k rang dizayn qoidasida taqiq edi, foydalanuvchi so'ragani uchun FAQAT til plitkasida ishlatildi
- SINOV: sahifa ochildi ✓, 4 qator ✓, "O'zbek tili" → om3_lang="uz" ✓, English disabled ✓, ← Sozlamalarga qaytdi ✓. build ✓ cap sync ✓

## 2026-07-27 — MATNLARNI O'RASH, 1-TO'PLAM (419 ta)
Uch bosqichli skript bilan (scratchpad/wrap*.js), har bosqichdan keyin build:
1. JSX matn tugunlari `>Matn</` → `>{tr("Matn")}</` — 284 ta. Regex ATAYLAB tor: bir qatorda, ichida `{ } < >` yo'q, oxiri `</` bo'lishi shart (aks holda TS generiklari `Record<...>` buzilardi)
2. Proplar: placeholder/title/label/sub/text="..." → `={tr("...")}` — 71 ta
3. Ternar `? "A" : "B"` va omAlert/omConfirm("...") — 58 ta. Filtr: FAQAT bosh harfi katta matnlar (texnik qiymatlar "full"/"time"/"daily"/"om-card" kichik harfda — ular teginilmadi)
!!! XATO VA TUZATISH (muhim saboq): funksiya nomi `t` edi — ilovada `t` HAMMA JOYDA Task o'zgaruvchisi (tasks.map(t=>...)). Shu scope'larda `t("...")` Task obyektini chaqirib "t is not a function" bilan OQ EKRAN berdi. Build o'tgan, faqat ishlaganda ko'ringan. YECHIM: global `\bt\(` → `tr(` (421 ta). Endi tarjima funksiyasi **tr()**, formatli varianti **tf()**.
SINOV: kirill rejimida ilova ochildi, belgilash oynasi ishladi, om3_logs ga `{"st":"full"}` yozildi (texnik qiymat kirillga aylanmagan) ✓. Pastki nav: Бугун/Тақвим/Статистика/Мақсад ✓
QOLDI (~110): modul darajasidagi massivlar (OYLAR, KUNLAR, ZIKRLAR, NAMOZLAR, HELP_ITEMS, NEWS_ITEMS — ular ishlatilgan JOYDA tr() qo'llanadi) · ichida son bor jumlalar (~15 backtick — tf() kerak) · kichik harfli va aralash matnlar (~96)

## 2026-07-27 — MATNLARNI O'RASH TUGADI (479 tr + 6 tf)
Yuqoridagi 1-to'plamdan keyingi ishlar:
- **Modul massivlari:** OYLAR/OY_QISQA/KUNLAR/KUN_QISQA/HIJRI_OYLAR kirishlari `tr(MASSIV[i])` ga o'raldi (24 ta) — massivning O'ZI xom qoladi, chunki modul darajasida `tr()` chaqirilsa til almashganda yangilanmaydi. ZIKRLAR/NAMOZLAR/NEWS_ITEMS/HELP_ITEMS render joyida: `tr(z)`, `tr(pr.n)`, `tr(g)`, `tr(t)`, `tr(x.t)`, `tr(x.s)`
- **Son bor jumlalar:** 17 ta shablon `tf("... {n} ...", { n })` yoki `${tr("birlik")}` ga o'tkazildi (fmtMin "s"/"daq", uyqu, hafta, prognoz, bildirishnoma matni)
- **Aralash JSX tugunlari:** `>Matn {expr} matn<` shaklidagilar (birinchi skript ularni tashlab ketgan edi) qo'lda tuzatildi — Reja:, Bugun:, Jami:, ta ish qoldi, keyingi, kun surilgan, Masjidda, rakaat, umumiy, Kunlik soat bilan, Yangi {x} vazifa va h.k.
- **`toKiril` HIMOYASI qo'shildi:** lotin qisqartmalar (PDF, OK, JSON) o'girilmaydi — regex bilan vaqtincha `@@N@@` belgisiga almashtiriladi, o'girish tugagach qaytariladi. Aks holda "PDF yuklab olish" → "ПДФ юклаб олиш" bo'lardi
- **`tr()` ga himoya:** `if (!s || CUR === "uz") return s` — undefined kelsa yiqilmaydi
!!! IKKI XATO VA TUZATISH:
1. Skript JSX MATNI ichidagi qo'shtirnoqli iboralarni ham o'rab yubordi → ekranda `tr("Qo'shimcha ish")` degan yozuv chiqardi (2 joy: hadis matni va ziyoda izohi). Tuzatildi — matn tiklanib, butun jumla bitta `tr()` ga olindi, ichki qo'shtirnoqlar “...” ga o'zgartirildi
2. Heredoc orqali yozilgan skriptda `\b` va `\d` haqiqiy boshqaruv belgisiga aylanib ketdi (regex buzildi, build o'tdi, ish bermadi). SABOQ: regex yozadigan skript heredoc bilan emas, Write bilan yaratilsin; yoki `\b` o'rniga `(^|[^A-Za-z])` ishlatilsin
- **XAVFSIZLIK tekshiruvi:** ma'lumotga yoziladigan yagona joy topildi va qaytarildi — uyqu vazifasi `name: tr("Rejaga muvofiq uyqu")` → xom matn (aks holda kirill rejimida yaratilgan vazifa nomi kirillcha saqlanardi)
- SINOV: Bugun/Taqvim/Statistika/Maqsad — 0 ta lotin so'z (faqat foydalanuvchi ma'lumoti) · Sozlamalar, Yordam, Ibodat, Til sahifasi ✓ · belgilash → `{"st":"full"}` (texnik qiymat toza) ✓ · PDF qisqartmasi saqlandi ✓
- QOLDI (ataylab): PDF hisobot matni (ASCII), foydalanuvchi ma'lumoti, til nomlari, "Oliy Maqsad" ilova nomi

## 2026-07-27 — TIL TIZIMI ALOHIDA FAYLGA (`src/tillar.ts`) + AI STUDIO TASHLANDI
QAROR (foydalanuvchi): Google AI Studio endi kerak emas — kod VS Code + GitHub orqali boshqariladi.
Sayt KELAJAKDA kerak bo'ladi (Play Market bosqichida iPhone/desktop foydalanuvchilar uchun), lekin AI Studio emas —
GitHub'dan avtomatik yangilanadigan hosting (Netlify yoki Vercel). Hozir sozlanmadi, ilova pishgach.
NATIJA: "bitta fayl" cheklovi bekor bo'ldi → til tizimi `src/tillar.ts` ga ko'chirildi (App.tsx 4750 → 4693 satr).
- tillar.ts eksport qiladi: `Lang`, `TILLAR`, `LUGAT`, `KIRIL_ISTISNO`, `toKiril`, `setCur`, `getCur`, `tr`, `tf`
- `CUR` endi modul ichida yopiq (import qilingan o'zgaruvchiga qiymat berib bo'lmaydi) → App render ichida `setCur(lang)` chaqiradi
- `tr()` ga himoya qaytarildi: `if (!s || CUR === "uz") return s`
- Kirill kartochkasi "синов" dan **"tayyor"** holatiga o'tkazildi (o'rash tugagani uchun)
- SINOV: ajratishdan keyin kirill ishlaydi ✓, Til sahifasidan "O'zbek tili" bosilganda lotinga qaytdi ✓, build ✓ cap sync ✓
- ENGLISH endi FAQAT tillar.ts da yoziladi — App.tsx ga tegilmaydi (xavf kam, limit tejaladi)
