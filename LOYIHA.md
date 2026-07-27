# OLIY MAQSAD — loyiha xotirasi
Yangilangan: 2026-07-27. Yangi sessiyada shu faylni o'qish yetarli.
Batafsil tarix (barcha bajarilgan ishlar, tuzatilgan xatolar, qarorlar) — **TARIX.md** da. Uni faqat kerak bo'lganda och.

## FOYDALANUVCHI VA QOIDALAR
- O'zbek, **texnik emas** — hamma ko'rsatma qadam-baqadam, sodda o'zbek tilida
- Diniy inson: shar'iy ilm, tarix, qalb tazkiyasi yo'lida 5 yillik shaxsiy reja
- Telefon — ASOSIY qurilma (APK). Kompyuter: Windows 11
- **Kod yozishdan OLDIN doim so'ra** — avval muhokama, ish pishgandan keyin kod
- Har yangilanishdan keyin nima qilinganini **TO'LIQ** ayt: nima, qayerga qo'yildi, foydalanuvchi qanday ko'radi. Sukut saqlanmasin
- Har yangilanish oxirida **so'ra**: "Telegram kanal uchun e'lon matni kerakmi?"
- "streak" so'zi emas — "uzluksizlik" (lekin bu ko'rsatkich ilovadan butunlay olib tashlangan)
- Limitni tejab ishla

## LOYIHA NIMA
5 yillik shaxsiy intizom/ibodat ilovasi. React + TypeScript + Tailwind (CDN), localStorage, **AI yo'q**, to'liq o'zbekcha, oflayn.
- Kod: **BITTA fayl — src/App.tsx** (~4650 satr). Har yangilanishda to'liq almashtiriladi
- Dizayn: premium, jiddiy, savlatli. Tungi: #16130F fon / #201B15 karta / #59B483 yashil / #D7A94B oltin. Tonggi: krem-oq. Radius: karta 20 / tugma 18 / input 16
- **QAT'IY QOIDALAR:** emoji YO'Q (faqat ichki SVG ikonka) · ko'k rang YO'Q · qizil faqat o'chirishda · bir sahifada max 3 urg'u rang · chaqnoq ranglar taqiq
- Logo: tog' cho'qqisi + bayroq. Ichki SVG `Logo` komponenti. Tonggi mavzuda yashil, tungida qaymoqrang (#EADFC6)

## YANGILASH TARTIBI
1. `src/App.tsx` → Google AI Studio'ga **qo'lda** joylash + Qayta nashr (sayt: oliy-maqsad.ai.studio)
2. `yangilash.bat` (npm run build + npx cap sync android) — men bajarsam shart emas
3. Android Studio → Build → Generate App Bundles or APKs → Generate APKs → telefonga o'rnatish (ma'lumot saqlanadi)

## GITHUB (kod zaxirasi, 2026-07-27 da sozlandi)
- Repo: **https://github.com/komakdoshdasturchi/oliy-maqsad** (private). Mahalliy: `C:\oliy-maqsad`, branch `main`
- Birinchi commit `9c96bf9` = v9 holati (87 fayl, 8 MB)
- **Faqat KOD** zaxiralanadi. Shaxsiy ma'lumot (localStorage `om3_*`) telefonda qoladi — foydalanuvchi qarori, javobgarlik o'zida
- `.gitignore` chetlatadi: `node_modules`, `build`, `dist`, `.env*`, `*.keystore/*.jks`, `oliy-maqsad-zaxira-*.pdf`, `*.zip/*.rar`, `*.apk/*.aab`, `android/.gradle`, `android/local.properties`
- **Har yangilanishdan keyin:** `git add -A && git commit -m "vN: ..." && git push`
- **Ortga qaytish:** `git log --oneline` bilan versiyani top → `git checkout <hash> -- src/App.tsx`
- Kirish Git Credential Manager orqali saqlangan (parol so'ralmaydi). Agar push qotib qolsa — foydalanuvchi terminalda o'zi bajarishi kerak (ruxsat oynasi faqat unda ochiladi)

## HOZIRGI HOLAT (v9)
Katta yangilanish tugadi, **build ✓ va cap sync ✓**, lekin **TELEFONDA SINALMAGAN — APK qayta qurish kerak**.
v9 da bajarilganlar (tafsiloti TARIX.md da): premium vaqt/sana/kun tanlagichlari va tasdiq oynasi (barcha `window.confirm/alert/prompt` almashtirildi) · Statistika butunlay qayta (Kunlik/Haftalik/Oylik) · Oliy maqsad butunlay qayta (4 blok) · Taqvim ranglari · bildirishnoma tanlangan kunlarda + oq siluet logo · ziyoda foizga qo'shilishi · emoji 0 · splash · yo'l-yo'riq ishoralari · PDF yuklab olish xatosi tuzatildi.

**TELEFONDA SINASH RO'YXATI:** PDF yuklab olish (Filesystem+Share yo'li — brauzerda sinab bo'lmaydi) · bildirishnomalar (tanlangan kunlarda, oq logo) · haptika · Pomodoro fokus rejimi · premium tanlagichlar · Statistika 3 ko'rinish · v9 yangiliklar oynasi.

## HOZIRGI ISH: TILLAR
**1-bosqich (poydevor) BAJARILDI** (tafsiloti TARIX.md, "TILLAR" bo'limi):
- **`tr(s)`** va **`tf(s, vals)`** funksiyalari (nomi `t` EMAS — `t` ilovada Task o'zgaruvchisi, to'qnashadi!) · `LUGAT` (hozircha bo'sh) · `toKiril()` avto-o'girgich (kesh bilan, qoida tartibi muhim) · `KIRIL_ISTISNO`
- **Kalit = o'zbekcha lotin matnning O'ZI**: `tr("Bugun")`. Tarjima topilmasa o'zbekchasi ko'rinadi — hech qachon buzilmaydi
- Yangi kalit: `om3_lang` (default "uz"). Tillar: `uz` · `uzk` (kirill, avto, sinov) · `en` (**qo'lda** tarjima kerak) · `ar`
- **Ruscha olib tashlandi**, o'rniga English
- **Alohida `TilPage` sahifasi** (`page="til"`, Sozlamalar→"Ilova tili" qatoridan ochiladi, orqaga → Sozlamalar): ro'yxat ko'rinishi, har qatorda gradient plitka (O'/ў/Aa/ض) + nom + radio. en/ar hozircha xira va o'chiq

**O'RASH: 419 ta matn BAJARILDI** (JSX matnlari, proplar, ternar/dialog matnlari — skript bilan, tafsiloti TARIX.md).
**KEYINGI QADAM (~110 matn qoldi):** modul massivlari (OYLAR/KUNLAR/ZIKRLAR/NAMOZLAR/HELP_ITEMS/NEWS_ITEMS) → ishlatilgan joyda `tr()` · ichida son bor jumlalar → `tf()` · qolgan aralash matnlar.
- Kirill rejimida qarasa, **lotin qolgan joy = hali o'ralmagan joy** (progress ko'rsatkichi)
- **EHTIYOT:** `tr()` ni modul darajasidagi `const` ichida CHAQIRMASLIK kerak (OYLAR/KUNLAR/NEWS_ITEMS/HELP_ITEMS xom o'zbekcha qoladi — `tr()` ular **ishlatilgan joyda** qo'llaniladi)
- Arabcha **oxirida**: u faqat tarjima emas, butun ilova o'ngdan chapga (RTL) ko'zguga aylanadi — alohida katta ish

## TEXNIK XOTIRA
- **Ma'lumot kalitlari (27 ta):** om3_plan, om3_tasks, om3_logs, om3_extras, om3_counts, om3_countlog, om3_weights, om3_notes, om3_sleepcfg, om3_sleeplog, om3_pomocfg, om3_pomolog, om3_settings, om3_ibadat, om3_khatm, om3_gender, om3_daymode, om3_ui, om3_quotes, om3_news, om3_hints, om3_lang, om3_folders, om3_ver + eski (om3_books, om3_cats, om3_groups)
- **Migratsiya:** `om3_ver = "4"`. v3→v4 da har vazifaga `createdAt` qo'shildi (o'tmishni muzlatish — statistika buzilishini tuzatgan)
- **Plaginlar (5):** @capacitor/app, haptics, local-notifications, filesystem, share. Kirish **importsiz** — `capPlug(name)` orqali `window.Capacitor.Plugins` (AI Studio saytiga xavfsiz)
- **Android:** `res/drawable/ic_stat_om.xml` — bildirishnoma oq siluet logosi. `mipmap-*` — yashil launcher ikonkalari (shaffof fon)
- **Ishlatilmayotgan (o'chirilishi mumkin):** uzluksizlik(), DayChips, FolderEdit, HadisCard, HalolCard, Folder.importance, settings.remindersOn/reminderTimes (UI yo'q)

## MUHIM ESLATMALAR
- **Ma'lumot xavfsizligi:** har yangilanish eski ma'lumotlarni saqlashi SHART. Katta o'zgarishdan oldin zaxira oldirish
- AI Studio'da kod FAQAT qo'lda joylanadi (Gemini chatiga ishonilmaydi)
- Android Studio yangilash takliflari doim RAD etiladi
- package.json da @google/genai qoldiq turibdi — zarari yo'q
- **NewsModal qoidasi:** yangiliklar oynasiga "Bu oyna bir marta ko'rinadi" kabi pastki izoh QO'SHILMAYDI. Faqat: logo+sarlavha, oltin versiya/sana qatori, ✕, raqamlangan ro'yxat. Keyingi yangilanishda NEWS_VER/LABEL/DATE/ITEMS ni yangilash kifoya (hozir v9)
- **KEYINGI YANGILANISHDA ESLATISH:** ilovaning **ommaga mosligi** (mass-market) haqida gaplashish — foydalanuvchi so'radi
- **SINOVDA TEKSHIRISH:** begona odam "Oliy maqsad belgilash"ni topa oladimi (u pastdagi + menyusiga ko'chirilgan)

## KELAJAK REJALARI
- **!!! PLAY MARKET BOSQICHIDA BIRINCHI NAVBATDA ESLATISH (foydalanuvchi maxsus so'radi):** tashqi ilova belgisi (launcher ikonka) tanlovi funksiyasini qo'shish — Sozlamalar→Ko'rinishdan oq/yashil/sariq/4-variant logolardan birini tanlash. **Web/Capacitor'da MUMKIN EMAS** (Android activity-alias + native Kotlin/Java kerak). Logolar tayyor: `C:\oliy-maqsad\Logolar\`
- Play Market: $25 hisob, Capacitor AAB, ~12 sinovchi 14 kun yopiq test, maxfiylik siyosati sahifasi
- Firebase profil-sinxronlash — Play bosqichida
