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
- Kod: **`src/App.tsx`** (~4690 satr) + **`src/tillar.ts`** (til tizimi va lug'at). Ilgari bitta fayl edi — AI Studio uchun; endi shart emas
- Dizayn: premium, jiddiy, savlatli. Tungi: #16130F fon / #201B15 karta / #59B483 yashil / #D7A94B oltin. Tonggi: krem-oq. Radius: karta 20 / tugma 18 / input 16
- **QAT'IY QOIDALAR:** emoji YO'Q (faqat ichki SVG ikonka) · ko'k rang YO'Q · qizil faqat o'chirishda · bir sahifada max 3 urg'u rang · chaqnoq ranglar taqiq
- Logo: tog' cho'qqisi + bayroq. Ichki SVG `Logo` komponenti. Tonggi mavzuda yashil, tungida qaymoqrang (#EADFC6)

## YANGILASH TARTIBI
1. Kod VS Code orqali `C:\oliy-maqsad` da to'g'ridan-to'g'ri yangilanadi (qo'lda ko'chirish YO'Q)
2. `yangilash.bat` (npm run build + npx cap sync android) — men bajarsam shart emas
3. Android Studio → Build → Generate App Bundles or APKs → Generate APKs → telefonga o'rnatish (ma'lumot saqlanadi)
4. `git add -A && git commit -m "..." && git push`

!!! **GOOGLE AI STUDIO TASHLANDI (2026-07-27).** Endi u yerga hech narsa ko'chirilmaydi — kod ikki faylda,
qo'lda nusxalash saytni buzadi. `oliy-maqsad.ai.studio` eskirgan holicha qoladi.
**Sayt KELAJAKDA kerak** (foydalanuvchi so'zi): Play Market bosqichida iPhone va kompyuter egalari
ilovadan sayt orqali foydalanishi uchun — GitHub'dan AVTOMATIK yangilanadigan hosting (Netlify/Vercel) sozlanadi.
AI Studio ketgani uchun ikki eski cheklov ham bekor: (a) bitta fayl majburiyati, (b) plaginlarni import'siz chaqirish.
## GITHUB (kod zaxirasi, 2026-07-27 da sozlandi)
- Repo: **https://github.com/komakdoshdasturchi/oliy-maqsad** (private). Mahalliy: `C:\oliy-maqsad`, branch `main`
- Birinchi commit `9c96bf9` = v9 holati (87 fayl, 8 MB)
- **Faqat KOD** zaxiralanadi. Shaxsiy ma'lumot (localStorage `om3_*`) telefonda qoladi — foydalanuvchi qarori, javobgarlik o'zida
- `.gitignore` chetlatadi: `node_modules`, `build`, `dist`, `.env*`, `*.keystore/*.jks`, `oliy-maqsad-zaxira-*.pdf`, `*.zip/*.rar`, `*.apk/*.aab`, `android/.gradle`, `android/local.properties`
- **Har yangilanishdan keyin:** `git add -A && git commit -m "vN: ..." && git push`
- **Ortga qaytish:** `git log --oneline` bilan versiyani top → `git checkout <hash> -- src/App.tsx`
- Kirish Windows Credential Manager'da saqlangan (`komakdoshdasturchi`), parol so'ralmaydi
- **MUHIM:** push/fetch dan oldin doim `GIT_TERMINAL_PROMPT=0` qo'y — aks holda git terminal so'rovini kutib **cheksiz qotib qoladi**. To'g'ri shakl: `GIT_TERMINAL_PROMPT=0 git push`

## HOZIRGI HOLAT (v9)
Katta yangilanish tugadi, **build ✓ va cap sync ✓**, lekin **TELEFONDA SINALMAGAN — APK qayta qurish kerak**.
v9 da bajarilganlar (tafsiloti TARIX.md da): premium vaqt/sana/kun tanlagichlari va tasdiq oynasi (barcha `window.confirm/alert/prompt` almashtirildi) · Statistika butunlay qayta (Kunlik/Haftalik/Oylik) · Oliy maqsad butunlay qayta (4 blok) · Taqvim ranglari · bildirishnoma tanlangan kunlarda + oq siluet logo · ziyoda foizga qo'shilishi · emoji 0 · splash · yo'l-yo'riq ishoralari · PDF yuklab olish xatosi tuzatildi.

**TELEFONDA SINASH RO'YXATI:** PDF yuklab olish (Filesystem+Share yo'li — brauzerda sinab bo'lmaydi) · bildirishnomalar (tanlangan kunlarda, oq logo) · haptika · Pomodoro fokus rejimi · premium tanlagichlar · Statistika 3 ko'rinish · v9 yangiliklar oynasi.

## HOZIRGI ISH: TILLAR
**Til tizimi — `src/tillar.ts`** (alohida fayl, 2026-07-27 da ajratildi). Tafsiloti TARIX.md, "TILLAR" bo'limi:
- Eksport: `tr(s)` · `tf(s, vals)` · `setCur(lang)` · `getCur()` · `TILLAR` · `LUGAT` · `KIRIL_ISTISNO` · `toKiril()`. App.tsx da: `import { Lang, TILLAR, tr, tf, setCur } from "./tillar"` va render ichida `setCur(lang)`.
- Nomi `t` EMAS, **`tr`** — `t` ilovada Task o'zgaruvchisi, to'qnashadi! · `LUGAT` (hozircha bo'sh) · `toKiril()` avto-o'girgich (kesh bilan, qoida tartibi muhim) · `KIRIL_ISTISNO`
- **Kalit = o'zbekcha lotin matnning O'ZI**: `tr("Bugun")`. Tarjima topilmasa o'zbekchasi ko'rinadi — hech qachon buzilmaydi
- Yangi kalit: `om3_lang` (default "uz"). Tillar: `uz` · `uzk` (kirill, avto, sinov) · `en` (**qo'lda** tarjima kerak) · `ar`
- **Ruscha olib tashlandi**, o'rniga English
- **Alohida `TilPage` sahifasi** (`page="til"`, Sozlamalar→"Ilova tili" qatoridan ochiladi, orqaga → Sozlamalar): ro'yxat ko'rinishi, har qatorda gradient plitka (O'/ў/Aa/ض) + nom + radio. `en` xira va o'chiq; `ar` tanlanadigan (holat "sinov")

**2-bosqich: O'RASH TUGADI — 479 ta `tr()` + 6 ta `tf()`.** Ilovada o'zbekcha matn qolmadi (tafsiloti TARIX.md).
- **KIRILL TAYYOR** — avtomatik o'girish ishlaydi, lug'atga bir dona yozuv kerak bo'lmadi
- Tarjima QILINMAYDIGANLAR (ataylab): foydalanuvchi ma'lumoti (vazifa nomi, tur, iqtibos) · PDF hisobot matni (ASCII shrift cheklovi) · lotin qisqartmalar PDF/OK (toKiril himoyalaydi) · til nomlari
- Modul massivlari (OYLAR/KUNLAR/ZIKRLAR/NAMOZLAR/NEWS_ITEMS/HELP_ITEMS) xom holicha — `tr()` ular **ishlatilgan joyda** qo'llanadi

**3-bosqich: RTL POYDEVORI TAYYOR** (2026-07-27, commit `3a439b1`). Arabcha endi **tanlanadi** (holat "sinov") — ilova o'ngdan chapga aylanadi, matn hozircha o'zbekcha.
- `useEffect` → `document.documentElement.dir` = `ar` bo'lsa "rtl", aks holda "ltr" (+ `.lang`). `<html>` ga qo'yiladi, shuning uchun modal/sheet ham to'g'ri
- CSS (styleBlock oxirida): `[dir="rtl"] .text-left:not([dir])` → o'ngga, `.text-right:not([dir])` → chapga. **`:not([dir])` MUHIM** — arabcha hadis/oyat o'z `dir="rtl"` iga ega, ular tegilmasligi kerak
- `.om-yon` sinfi: `Icon` avtomatik qo'yadi (`YONALISHLI` to'plami: arrowLeft/Right, chevronLeft/Right) → RTL da `scaleX(-1)`
- `om-slide-l/r` animatsiyalari RTL da almashadi
- Yo'nalishli uslublar mantiqiyga o'tkazildi: `borderLeft*` → `borderInlineStart*` (9 joy) · `ml-auto` → `ms-auto` · `marginLeft/Right` → `marginInlineStart/End`
- **QOIDA:** bundan keyin `ml-/mr-/pl-/pr-`, `text-left/right`, `borderLeft/Right` ishlatilmasin — mantiqiy variantlari (`ms-/me-/ps-/pe-`, `borderInlineStart/End`) qo'llanilsin
- Hali qilinmagan: arabcha tarjima (LUGAT), arab raqamlari/sana formati, PDF da arabcha (ASCII cheklovi — ehtimol umuman imkonsiz)

**4-bosqich: ENGLISH — TUGADI ✓** (2026-07-27). `LUGAT` da **520 / 520**, `en` holati **"tayyor"**, o'lik kalit 0. `en` endi tanlanadi (holat "sinov", izoh "Sinov · qisman tarjima"). Tarjimasi yo'q matn avtomatik o'zbekcha ko'rinadi.
- Bajarilgani: interfeys so'zlari (≤12 belgi) — tugma, sarlavha, menyu, ibodat atamalari, kun/vaqt
- **Diniy atamalar transliteratsiya qilindi, tarjima emas:** Tahajjud · Dhikr · Nafl · rak'ah · khatm · juz' · Hijri. Ingliz tilidagi qabul qilingan islomiy yozuv
- **`tr()` TUZATILDI:** `if (v)` → `if (v !== undefined)`. Sababi: o'zbekcha "ta" sanoq yuklamasi inglizchada **ataylab bo'sh** (`"5 ta"` → `"5"`), bo'sh qiymat esa avval e'tiborsiz qolardi
- Kalitlar tekshirildi: 174 tasi ham App.tsx da haqiqatan mavjud, o'lik yozuv yo'q

**5-bosqich: O'RALMAGAN MATNLAR TUZATILDI** (2026-07-27). Avvalgi "o'rash tugadi" degan yozuv **noto'g'ri edi** — skript JSX ichida o'rtasida qiymat turgan jumlalarni butunlay o'tkazib yuborgan. **32 ta joy** topildi va `tf()` ga o'raldi.
- Buzilgan holat kirillda ham ko'rinardi: «Хатм 20.07.2026 **dan boshlanadi**» — bitta jumlada ikki alifbo
- **`tf()` ga KO'PLIK qo'shildi:** tarjimada `"|"` — chapda birlik, o'ngda ko'plik (`"{n} soat": { en: "{n} hour|{n} hours" }`). Tanlov `vals` dagi birinchi son bo'yicha. O'zbek/kirillda "|" yo'q, ta'sir qilmaydi
- **`toKiril()` XATOSI TUZATILDI (muhim):** u `{n}` egallagichini ham o'girib `{н}` qilardi, natijada `tf()` uni topa olmay ekranda «Уйқу: **{н}** соат» ko'rinardi. Endi `{...}` bloklari lotin qisqartmalar kabi chetga olinadi. **Bu xato ilgari ham bor edi** — 6 ta eski `tf()` chaqiruvi kirillda shu sababdan buzuq chiqqan
- Sinov usuli: `npx esbuild src/tillar.ts --format=esm --outfile=X.mjs` → node bilan tr/tf ni to'g'ridan-to'g'ri sinash (localStorage yo'qligi try/catch bilan qoplangan)
- **QOIDA:** JSX ichida qiymat bilan aralashgan matn **hech qachon** xom qoldirilmasin — butun jumla bitta `tf()` ga o'ralsin. Bo'lak-bo'lak `tr()` faqat so'z tartibi o'zgarmaydigan joyda

**6-bosqich: ILOVA NOMI TARJIMA QILINDI** (2026-07-27). Logo tagidagi yozuv har tilda o'zgaradi:
`Oliy maqsad` · `Олий мақсад` (avtomatik) · `Ultimate goal` · `المقصد الأعلى`
- Bitta kalit — logo tagi, splash, sarlavha, **bildirishnoma sarlavhasi** va "oliy maqsad" vazifa turkumi hammasi shu yozuvdan oladi
- Bildirishnomalarda `"Oliy Maqsad"` (bosh M) xom holda edi — `tr("Oliy maqsad")` ga o'tkazildi (3 joy). O'zbekchada bosh harf `M` → kichik `m` bo'ldi
- `document.title` ham til bilan almashadi (brauzer yorlig'i / PWA sarlavhasi)
- **Telefondagi ILOVA BELGISI ostidagi nom** — `android/app/src/main/res/values-en/` · `values-ar/` · `values-b+uz+Cyrl/` papkalariga `strings.xml` qo'shildi (faqat `app_name` va `title_activity_main`; `package_name`/`custom_url_scheme` `values/` dan meros)
- **CHEKLOV (foydalanuvchiga aytilgan):** launcher nomi **telefon TIZIM tiliga** ergashadi, ilova ichidagi til tanloviga EMAS. Android web/Capacitor ilovasiga ish paytida launcher yorlig'ini o'zgartirishga ruxsat bermaydi — bu launcher ikonka cheklovi bilan bir xil sabab
- `public/manifest.json` (PWA o'rnatish nomi) statik, o'zbekcha qoladi

**QUR'ON VA HADIS — o'zimiz tarjima QILMADIK.** E'tirof etilgan ingliz tarjimalari olindi, `tillar.ts` da izoh bilan belgilangan:
- Oyat (Qur'on 3:200) — **Sahih International**
- Hadis (Sahih al-Bukhari 6465, Oisha r.a.) — **Muhsin Khan**
- **!!! FOYDALANUVCHI TEKSHIRISHI KERAK:** bu ikki matn xotiradan yozildi, bosma manba bilan solishtirilmagan. Play Market bosqichidan oldin albatta tasdiqlansin
- Hadis uch bo'lakka bo'lingan (o'rtasi qalin yashil) — bo'laklar ingliz tili tartibiga moslab yozilgan, alohida tahrirlanmasin

**7-bosqich: ARABCHA — 520 / 520 TUGADI ✓** (2026-07-27). `ar` holati **"tayyor"**, izoh "Arab yozuvi".
- Oyat va hadisda arabcha **ASL matn** qo'yildi (tarjima emas). Oyat — `OyatCard` dan aynan nusxa; hadis — mashhur rivoyat matni
- **!!! IKKI OGOHLANTIRISH (ikkalasi ham `tillar.ts` da yozilgan):**
  1. **HADIS MATNI ISHONCHLI MANBA BILAN SOLISHTIRILMAGAN.** Play Market / ommaga chiqarishdan oldin `sunnah.com/bukhari:6465` yoki bosma Sahihul Buxoriy bilan tekshirilsin. Farq bo'lsa manbadagi olinsin
  2. **BUTUN ARABCHA TARJIMA ONA TILI SOHIBI TOMONIDAN KO'RILMAGAN.** Atamalar to'g'ri, ammo uslub va ohang tekshirilishi kerak
- **KO'PLIK CHEKLOVI:** arab tilida son bilan kelishuv murakkab (1 / 2 / 3-10 / 11+), `tf()` esa faqat ikki shakl beradi. 11 dan katta sonlarda grammatik jihatdan aniq emas — tekshiruvchi shunga e'tibor bersin
- Arabchada hadis matni maxsus arab shriftisiz chiqadi (tizim shrifti bilan). Oyat esa `Noto Naskh Arabic` bilan — xohlansa hadisga ham qo'shiladi
- **Arabcha ALOHIDA blokda:** `tillar.ts` dagi `const LUGAT_AR: Record<string, string>` — pastida sodda halqa bilan `LUGAT[k].ar` ga qo'shiladi. Sabab: arab tilini biladigan odam butun tarjimani **bir joydan** ko'rib chiqa olsin
- Bajarilgani: bo'limlar, ibodat atamalari, kun/vaqt, belgilash, tugmalar, vazifa, maqsad, uyqu/pomodoro
- Diniy atamalar arabcha ASLIDA: العبادة · الصلوات الخمس · التهجد · الأذكار · ختم القرآن · النافلة · ركعة · التاريخ الهجري
- **OYAT KARTASI (`OyatCard`):** arabchada ma'no tarjimasi **ko'rsatilmaydi** — yuqorida oyatning asli turibdi (`getCur() !== "ar"` sharti). Foydalanuvchi qarori: «oyat tursa bas, tarjima kerak emas»
- **!!! TEKSHIRILMAGAN — ARAB TILINI BILADIGAN ODAM KO'RIB CHIQISHI SHART.** `tillar.ts` da ham shu izoh yozilgan. Play Market bosqichidan oldin albatta
- **HADISNING ARABCHA ASLI YO'Q:** onboarding 11-qadamdagi Buxoriy 6465 hadisi kodda faqat o'zbekcha. Arabcha aslini **foydalanuvchi ishonchli manbadan berishi kerak** (sunnah.com yoki bosma). Xotiradan yozilmasin
- PDF hisobotda arabcha ishlamaydi (ASCII shrift cheklovi)

**Tekshirish usuli (har bosqichdan keyin):** `LUGAT` kalitlarini App.tsx dagi `tr("...")`/`tf("...")` matnlari bilan `comm` orqali solishtirish — o'lik kalit ham, tarjimasiz matn ham qolmasin
- **!!! BU TEKSHIRUVNING KO'R NUQTASI:** modul massivlari (`ZIKRLAR`, `NAMOZLAR`, `HELP_ITEMS`, `NEWS_ITEMS`, `OYLAR`, `KUNLAR`, `HIJRI_OYLAR`) `tr()` ga **ishlatilgan joyda** beriladi, shuning uchun grep ularni **TOPMAYDI**. Massiv o'zgartirilsa tarjimasi ham QO'LDA qo'shilsin. 2026-07-27 da aynan shu sababdan 38 ta matn tarjimasiz qolib ketgan edi
- **NEWS_ITEMS yangilanganda** yangi bandlar ham `LUGAT` va `LUGAT_AR` ga qo'shilsin

**8-bosqich: TIL SO'ROVI, SANA NOMLARI, ARAB RAQAMLARI, OYAT KARTASI** (2026-07-27). Lug'at **552 / 552** to'rt tilda ham.
- **`om3_langask`** (yangi kalit, 28-chi): "" = hali so'ralmagan, "1" = so'ralgan. Bir marta ishlaydi
- **`TilSorov` oynasi ikki holatda:**
  · YANGI o'rnatish (`!plan && !langAsk`) — salomlashuvdan **OLDIN**, to'liq ekran, **✕ YO'Q** (til tanlanishi shart). Keyingi butun onboarding tanlangan tilda ketadi
  · YANGILANISH (`plan && !langAsk`) — ilova ustida bir marta, **✕ bilan yopib ketish mumkin**. `NewsModal` endi `langAsk` ni kutadi (avval chiqmasin)
- **`TilRoyxat`** — til qatorlari alohida komponentga chiqarildi, `TilPage` va `TilSorov` ikkalasi ham shuni ishlatadi. Ixchamlashtirildi: plitka 56→44px, matn 15→14px, radio 24→20px
- **ARAB RAQAMLARI:** `raqam()` (eksport qilingan) g'arb raqamlarini ٠-٩ ga o'giradi. `tr()` va `tf()` chiqishiga qo'llanadi — sana, soat, foiz, hisoblar arabcha chiqadi. Boshqa tillarda ta'sir qilmaydi
  - **QOLGAN KAMCHILIK:** JSX ichida `tr/tf` dan o'tmaydigan xom sonlar (masalan `<b>{total}/{target}</b>`) hamon lotin raqamida. Kerak bo'lsa `raqam()` bilan o'ralsin
- **OYLAR / KUNLAR / HIJRI_OYLAR** tarjima qilindi (32 yangi kalit). Hijriy oylar arabchada ASL nomlari bilan: محرم · صفر · ربيع الأول ...
- **`OyatCard` qayta ishlangan:** halqa ichida kitob ikonkasi + nuqta · oyat ikki yonida oltin to'rt qirrali bezak (`Yulduzcha`) · nuqtali ajratgich chiziq · manba oltin doira ichida. Arabchada tarjima **va ajratgich** ko'rsatilmaydi

## v12 (2026-08-02) — UZOQ BOSISH, IKKILANGAN QO'LLANMA, MA'LUMOTNOMA
Lug'at **648 kalit**, en/ar/ru da **647 tadan** ("ta" ataylab bo'sh).
APK haqiqiy build bilan tekshirildi: `Oliy maqsad v12 (debug).apk`.

**Qo'shilgan/o'zgargan:**
- **Uzoq bosish (480 ms) = tahrirlash.** Ikki joyda: Bugundagi faol vazifa (→ Tahrirlash/O'chirish, `bosib()` BugunView da) va Ibodatlardagi xatm qatori (→ reja tahriri, `uzunBosish()` IbadatPage da). Ikkalasida ham `onPointerDown` da `uzun=false` qilinadi — shu sabab modal bosishni yutib yuborsa ham keyingi teginish buzilmaydi
- **Namoz kartasi:** to'liq belgilangach «Masjidda» tugmasi IXCHAM qatorda ham qoladi. `togglePr` endi to'liq bo'lganda `openPr[pid]=false` qiladi — ilgari bir marta ochilgach hech qachon yopilmasdi
- **`bed` ikonkasi** uyqu uchun. Ilgari uyqu ham, mavzu tugmasi ham `moon` edi
- **`OyatCard`** dan kitob ikonkasi + nuqta olib tashlandi (128-qatordagi ta'rif eskirdi)
- **Eski `Hint` ishoralari o'chirildi** (`add`, `tiles`, `mark`) — tanishtiruv turi bilan ikkilanardi. **`birinchiYil` QOLDI** — u tur ko'rsatmaydigan narsani aytadi
- **«Qanday ishlaydi?» → «Har bo'lim nima qiladi?»**, 10 banddan 19 ga kengaydi. Turdan farqi izohda aytiladi: tur *ko'rsatib boradi*, ma'lumotnoma *o'qib chiqiladi*

**TOPILGAN VA TUZATILGAN XATOLAR:**
1. **`MPER` da modul darajasidagi `tr()`** — `const MPER = [{ n: tr("Hafta") }...]` modul yuklanganda BIR MARTA hisoblanardi, til almashtirilsa eski tilda qolib ketardi. «Oy» va «6 oy» esa umuman o'ralmagan edi. Matnlar xom saqlanadigan bo'ldi, `tr()` chizishda chaqiriladi. **QOIDA: modul darajasidagi const ichida `tr()` CHAQIRILMAYDI** (funksiya ichida bo'lsa mayli — `fmtUz`, `fmtMin` shunday)
2. **`raqam()` versiya belgisini buzardi** — arabchada "(v12)" → "(v١٢)". Endi lotin harfiga yopishgan raqamlar o'girilmaydi: `/[A-Za-z][0-9]+|[0-9]/`. Oddiy sonlarga ta'siri yo'q ("08:00", "100%", "2026-yil" hammasi avvalgidek). Kirillchada shu muammo `KIRIL_ISTISNO` orqali hal qilingan

**YANGILANISH CHIQARISHDA UCH JOY:** `NEWS_VER/LABEL/DATE/ITEMS` (App.tsx) · `KIRIL_ISTISNO` dagi versiya qatori (tillar.ts) · `omVersiya`/`omVersiyaKodi` (build.gradle) · `package.json` version

## v11 — XATOLAR TUZATILDI (2026-07-28)
Sakkizta xato yopildi. Lug'at **613 / 613** (uz · uzk · en · ar).
1. **Oyat shrifti** — Scheherazade New / Amiri / Noto Naskh Arabic UI oldinga qo'yildi, vazn 400 ga qotirildi, o'lcham 17→19px, qator oralig'i 2.25→2.5. **Agar hali ham og'ir ko'rinsa — yagona ishonchli yechim shriftni ilova ichiga joylash (~150-400 KB)**
2. **Oyat sarlavhasi** — «Alloh taolo Qur'oni Karimda shunday marhamat qiladi:» (eski kalit o'chirildi)
3+6. **Hafta kunlari** — `KUN_QISQA` va `OY_QISQA` tarjima qilindi. Ikki taqvimda sarlavha **qotirib yozilgan** edi (`["Du","Se",...]`) → `KUN_QISQA_DUSH` bilan almashtirildi
4. **Arab raqamlarini qabul qilish** — `parseInt`/`parseFloat` modul darajasida qayta e'lon qilindi, ikkalasi ham `son()` orqali ٠-٩ ni 0-9 ga o'giradi. **Bitta joyda — butun fayl uchun.** G'arb raqamlariga ta'siri yo'q, `parseISO` Date konstruktoridan foydalangani uchun tegilmagan
5. **Onboarding xulosasi** — «Muddat / Boshlanish / Hafta boshi / yo'q» xom edi, `tr()` ga o'raldi
7. **Taqvim raqamlari** — `raqam()` qo'llandi (`fmtUz`, `fmtUzFull`, ikki taqvim, kun oynasi, sarlavha)
8. **«Shoshilmang...»** — `tr()` da edi, lekin lug'atda yo'q edi. **SABOQ:** ichida `\"` bo'lgan matnlarni `grep 'tr("...")'` tekshiruvi TOPMAYDI — shu sababli sezilmay qolgan

## v11 — RUS TILI QO'SHILDI (2026-07-28)
Lug'at **633 / 633** BESH tilda: uz · uzk · en · ar · **ru**.
- Sabab (foydalanuvchi): rusiyzabon musulmonlar. v3 da ruscha olib tashlangan edi — bu qaror QAYTARILDI
- `LUGAT_RU` alohida blokda (arabcha kabi), pastida halqa bilan `LUGAT[k].ru` ga qo'shiladi
- Diniy atamalar rus tilidagi qabul qilingan islomiy yozuvda: намаз · зикр · нафль · ракаат · хатм · джуз · тахаджуд · Фаджр/Зухр/Аср/Магриб/Иша
- Oyat — Э. Кулиев tarjimasi; hadis — mashhur rivoyat. **Ikkalasi ham TEKSHIRILMAGAN**
- `holat: "sinov"` — ona tili sohibi ko'rmaguncha shunday qolsin
- **KO'PLIK CHEKLOVI:** rus tilida uch shakl (1 / 2-4 / 5+), `tf()` faqat ikkitasini beradi. 2-4 oralig'ida grammatik jihatdan aniq emas
- Android: `values-ru/strings.xml` → «Высшая цель»
- **SABOQ:** `LUGAT_RU` ga LUGAT da YO'Q kalit yozilsa, u jimgina yangi kalit yaratadi va sezilmaydi. Tekshiruv: `ru` bor-u `en` yo'q kalitlarni sanash (shu yo'l bilan 4 ta xato topildi)

## TO'LIQ TEKSHIRUV (2026-07-28) — natija toza
`npx tsc --noEmit` → **0 xato** · qurilish toza · lug'at **634/634** (en·ar·ru) · takror yo'q · o'ralmagan matn yo'q.

**Uchta muammo topildi va tuzatildi:**
1. **`@types/react` UMUMAN O'RNATILMAGAN edi** — `package.json` da ham yo'q edi. Shu sababli `tsc` JSX ni tekshira olmasdi va 14 ta soxta «key» xatosi berardi. **Bu eng jiddiy topilma:** tekshirgich ko'r bo'lgani uchun HAQIQIY xatolar ham ko'rinmay yotgan. `npm i -D @types/react @types/react-dom` → 0 xato
2. **Lug'atda 3 ta takrorlangan kalit** (`Boshlanish` ×2, `Xulosalarim`) — qiymatlari bir xil edi, shuning uchun tarjima yo'qolmagan, ammo takror kelajakda tuzoq: biri tahrirlansa ikkinchisi jimgina g'olib chiqadi
3. **Ekranlangan qo'shtirnoqli matn tarjimasiz qolgan** (`Ish vaqti tugagach \"...\"`) — 8-xatodagi tuzoqning takrori

**TEKSHIRUV SKRIPTLARI (yana kerak bo'lsa qayta yozilsin):**
- Takror kalit: har `};` blokida kalitlarni Map bilan sanash
- Massiv matnlari: OYLAR/KUNLAR/NAMOZLAR/HELP_ITEMS/NEWS_ITEMS/TUR_* dan qatorlarni olib lug'at bilan solishtirish (id lar — `bomdod`, `nav-maqsad` — tarjima emas, chetlansin)
- **DIQQAT:** `"..."` bo'yicha oddiy regex ekranlangan qo'shtirnoqdan keyin ADASHADI va soxta «o'lik kalit» beradi. `tr\("((?:[^"\\]|\\.)*)"` shaklini ishlating
- **Bash heredoc teskari chiziqni yeydi** — regexli skriptlarni Write bilan yozing, `cat > ... <<'EOF'` bilan emas

## TEXNIK XOTIRA
- **Ma'lumot kalitlari (27 ta):** om3_plan, om3_tasks, om3_logs, om3_extras, om3_counts, om3_countlog, om3_weights, om3_notes, om3_sleepcfg, om3_sleeplog, om3_pomocfg, om3_pomolog, om3_settings, om3_ibadat, om3_khatm, om3_gender, om3_daymode, om3_ui, om3_quotes, om3_news, om3_hints, om3_lang, om3_folders, om3_ver + eski (om3_books, om3_cats, om3_groups)
- **Migratsiya:** `om3_ver = "4"`. v3→v4 da har vazifaga `createdAt` qo'shildi (o'tmishni muzlatish — statistika buzilishini tuzatgan)
- **Plaginlar (5):** @capacitor/app, haptics, local-notifications, filesystem, share. Kirish **importsiz** — `capPlug(name)` orqali `window.Capacitor.Plugins` (AI Studio saytiga xavfsiz)
- **Android:** `res/drawable/ic_stat_om.xml` — bildirishnoma oq siluet logosi. `mipmap-*` — yashil launcher ikonkalari (shaffof fon)
- **APK NOMI AVTOMATIK ✓ (2026-08-02 da haqiqiy build bilan tasdiqlandi).** `android/app/build.gradle` boshidagi `omVersiya` va `omVersiyaKodi` — yagona manba. Undan `versionName`, `versionCode` va fayl nomi olinadi. Natija: `Oliy maqsad v11 (debug).apk`, release da esa `Oliy maqsad v11.apk`. Yangilanish chiqarganda **faqat shu ikki qatorni** o'zgartirish kifoya
- **JAVA TUZOG'I:** tizimdagi `java` — **8-versiya**, Gradle esa 11+ talab qiladi. Terminaldan qurish uchun har safar `$env:JAVA_HOME = "C:\Program Files\Android\Android Studio\jbr"` (u yerda Java 21). Shu qilinmasa «This build uses a Java 8 JVM» xatosi chiqadi. Xuddi shu sabab VS Code «Gradle for Java» kengaytmasi ham qulardi («Unrecognized option: --add-opens») — 2026-08-02 da VS Code `settings.json` ga `java.jdt.ls.java.home` va `java.import.gradle.java.home` yozib qo'yildi
- **Ishlatilmayotgan (o'chirilishi mumkin):** uzluksizlik(), DayChips, FolderEdit, HadisCard, HalolCard, Folder.importance, settings.remindersOn/reminderTimes (UI yo'q)

## MUHIM ESLATMALAR
- **Ma'lumot xavfsizligi:** har yangilanish eski ma'lumotlarni saqlashi SHART. Katta o'zgarishdan oldin zaxira oldirish
- **SABOQ (2026-07-27):** avtomatik `tr()` o'rash skripti `<style>` bloki ichidagi CSS ga ham tegib ketgan edi — `font-family: tr("Inter")` chiqib, butun shrift qoidasi buzilgan (v9 dan beri, `3a439b1` da tuzatildi). Shablon satri (backtick) ichida `tr()` **bajarilmaydi**, matn holicha qoladi. Skript ishlatilsa, `<style>` va boshqa backtick bloklari chetlab o'tilsin
- AI Studio'da kod FAQAT qo'lda joylanadi (Gemini chatiga ishonilmaydi)
- Android Studio yangilash takliflari doim RAD etiladi
- ~~package.json da @google/genai qoldiq turibdi~~ — 2026-07-29 da olib tashlandi
- **NewsModal qoidasi:** yangiliklar oynasiga "Bu oyna bir marta ko'rinadi" kabi pastki izoh QO'SHILMAYDI. Faqat: logo+sarlavha, oltin versiya/sana qatori, ✕, raqamlangan ro'yxat. Keyingi yangilanishda NEWS_VER/LABEL/DATE/ITEMS ni yangilash kifoya (hozir v9)
- **KEYINGI YANGILANISHDA ESLATISH:** ilovaning **ommaga mosligi** (mass-market) haqida gaplashish — foydalanuvchi so'radi
- **ANDOZA QOLDIQLARI — TOZALANDI ✓ (2026-07-29).** Pastdagi «TAFTISH» bo'limiga qarang
- **SINOVDA TEKSHIRISH:** begona odam "Oliy maqsad belgilash"ni topa oladimi (u pastdagi + menyusiga ko'chirilgan)

## TAFTISH VA TOZALASH (2026-07-29)
Sabab: ko'ngillilar «ilova sekin» deyishdi. Bir dasturchi «lazy loading yo'qligidan» dedi — **noto'g'ri tashxis**.
Butun kod, papka va sozlamalar taftish qilindi. Haqiqiy sabab: AI Studio andozasidan qolgan uch qator.

**Tiklash nuqtasi: `05b04e2`** (tozalashdan oldingi holat). Ortga qaytish: `git checkout 05b04e2 -- <fayl>`

### BAJARILDI
1. **`index.html` — Tailwind CDN skripti olib tashlandi.** To'suvchi skript edi, ilova har ochilganda
   tarmoq javobini kutardi. Tekshirildi: kodda dinamik sinf nomi (`` className={`...`} ``) **0 ta**,
   qurilgan CSS da 354 qoida (jumladan `text-[11px]` kabi ixtiyoriy qiymatlilar) — CDN hech narsa bermayotgan edi
2. **`src/index.css` — Google Fonts `@import` olib tashlandi.** CSS `@import` chizishni **to'sadi**;
   oflayn baribir yuklanmasdi. Body ranglari `#fafafa/#171717` → `#F4EFE6/#26221B` (dizayn rangi)
   - **`* { transition-property: ... }` qoidasi ATAYLAB saqlandi** — u butun ilovada ishlaydi
3. **`public/icon.png` — 2.15 MB → 101 KB** (1254×1254 → 192×192). APK dagi vazifasi **nol** edi:
   favicon va PWA ikonkasi, ikkalasi ham APK da ma'nosiz. Haqiqiy ilova belgisi `res/mipmap-*` dan
   - Natija: **APK web fayllari 2.7 MB → 739 KB**
4. **Splash 1250 ms → 600 ms.** `om-pop` animatsiyasi 220 ms; qolgan ~1030 ms ekran qotib turardi
5. **8 ta ishlatilmaydigan paket olib tashlandi:** `@google/genai` (17 MB), `lucide-react`, `motion`,
   `express`, `dotenv`, `@types/express`, `autoprefixer`, `tsx` + `dependencies` dagi ortiqcha `vite`.
   `npm install`: 129 paket ketdi. **5 Capacitor plagini saqlandi — hammasi ishlatiladi**
6. **O'chirildi:** `metadata.json` (tavsifi «AI faqat maslahat beradi» — ilovada AI yo'q), `.env.example`
7. **Qayta yozildi:** `README.md` (Google banneri o'rniga o'z hujjati), `vite.config.ts` (DISABLE_HMR va
   ishlatilmaydigan `@` alias ketdi), `package.json` (nomi `react-example` → `oliy-maqsad`)

**Tekshiruv:** `tsc --noEmit` 0 xato · qurilish toza · brauzerda **tashqi stylesheet 0 ta** ·
konsol xatosi yo'q · `rounded-3xl`→24px, `text-[11px]`→11px (uslublar buzilmagan)

### TOPILDI, LEKIN HALI TUZATILMAGAN — navbat bilan
**Ma'lumot xavfsizligi (Play Market'dan oldin):**
- `useStored` da `localStorage.setItem` **`try/catch` siz** — xotira to'lsa ilova jimgina yiqiladi
- `importFile` faqat `data.om3_plan` borligini tekshiradi — buzuq fayl ustiga yozadi, ortga yo'l yo'q
- `.json` shaklidagi zaxira yo'q (faqat PDF; PDF siqilsa ichidagi base64 buziladi)

**Sifat poydevori (Play Market'dan keyin):**
- **`tsconfig.json` da `"strict": true` YO'Q** → `strictNullChecks` o'chiq. Kodda `.find(...)` juda ko'p,
  har biri potensial qulash, tekshirgich ularni **ko'rmayapti**. Yoqilsa ~50–200 xato chiqishi kutiladi —
  ular yangi emas, **hozir ham mavjud**, shunchaki ko'rinadigan bo'ladi. (`@types/react` yo'qligining ukasi)
- Memoizatsiya **nol** (`useMemo`/`useCallback`/`memo` = 0) — har belgilashda butun ekran va butun
  statistika qayta hisoblanadi. Yillar o'tgani sari yomonlashadi
- `* { transition }` qoidasi **har bir elementga** tegadi — kerakli joylarga toraytirilsin
- Test **umuman yo'q** — `markFrac`, `ibScore`, `periodAvg` xatosi jimgina noto'g'ri raqam ko'rsatadi
- `App.tsx` 5113 satr · `capPlug` → `(window as any)`, tip xavfsizligi yo'q · `parseInt`/`parseFloat`
  soyalash · `setCur(lang)` render tanasida (React qoidasiga zid)
- `build.gradle` da `minifyEnabled false` — **ehtiyot bilan**: R8 Capacitor plaginlarini buzishi mumkin
- `npm audit`: 2 ta zaiflik (`brace-expansion`, `tar`) — **faqat qurish vositalarida**, telefonga tushmaydi

**Yetishmayotgan:**
- **Shrift ilova ichida emas** — Inter hech qachon yuklanmaydi, telefonda Roboto ko'rinadi.
  Namuna bor: `src/oyat-shrift.ts` (Amiri Quran, base64, OFL). Foydalanuvchi hajmdan qo'rqmaydi
- `AndroidManifest.xml` da `screenOrientation` yo'q — ilova yonboshlatilsa buziladi
- `allowBackup="true"` — Android avtomatik zaxirasi **yoqilgan** (Google hisobiga). Yangi telefonga
  o'tganda tiklanadi, lekin kuniga bir marta va faqat quvvat+Wi-Fi da. Kundalik himoya sifatida yaramaydi
- `Logolar/` — git omborida 5.3 MB (`Mockup.psd` 3.4 MB). APK ga tushmaydi, lekin har `clone` da yuklanadi

## TIL TAHLILI VA TUZATISH (2026-07-29)
532 ta interfeys matni ko'rib chiqildi, foydalanuvchi bilan birma-bir kelishildi. Lug'at **633/633/633**.

### ATAMA QARORLARI — bundan keyin shu ishlatilsin
| Tushuncha | To'g'ri so'z | Ishlatilmaydi |
|---|---|---|
| Vazifa turkumi | **Vazifa turi** | ~~Turkum~~ ~~Turi~~ ~~Turkumsiz~~ |
| Turi bo'sh (vazifa ostida) | **Turi yo'q** | |
| Turi bo'sh (guruh sarlavhasi) | **Qolgan vazifalar** | |
| Pomodoroni to'xtatib turish | **To'xtatish** / holat: **To'xtatilgan** | ~~Pauza~~ ~~Pauzada~~ |
| Pomodoroni butunlay tugatish | **Tugatish** | |
| Vazifani muzlatish | **Vaqtincha to'xtatish** | |
| Qorong'i pomodoro rejimi | **Diqqatni jamlash** | ~~Fokus~~ ~~Focus~~ |
| Rejadan ortiq bajarilgan vaqt | **«qo'shimcha»** | ~~ziyoda~~ |
| Reja tashqarisidagi ish bo'limi | **Rejadan tashqari amallar** | ~~Qo'shimcha ish~~ |
| Kunlik norma (xatm) | **miqdor** | ~~ulush~~ |
| Dam kuni | **dam olish** | ~~halovat~~ |

**Tinish belgilari qoidasi:** uzun tire `—` (qisqa `-` emas) · qo'shtirnoq `«...»`.
**ISTISNO:** onboarding'dagi hadis ichidagi `“...”` — u qo'shtirnoq ichidagi qo'shtirnoq, TEGILMAYDI.

### SIKL OLIB TASHLANDI
Pomodoroning kunlik maqsadi (`cycles`) butunlay ketdi: sozlama maydoni, izohi va
«2/3 pomodoro» dagi maqsad qismi. `PomoCfg.cycles` maydoni faqat eski saqlangan
sozlama o'qilganda xato bermasligi uchun turibdi — hech qayerda ishlatilmaydi.

### !!! XAVFLI HOLAT TUZATILDI
Sozlamalar → Ma'lumotlar da ikki tugma bir-birining ostida turardi va nomlari
deyarli bir xil edi, ikkinchisi esa **hamma ma'lumotni o'chiradi**. Endi:
**«Rejani qaytadan tuzish»** (tarix saqlanadi) va **«Hammasini o'chirib, boshidan boshlash»** (qizil).

### YANA UCH TARJIMASIZ MATN TOPILDI (5-bosqich tuzog'ining davomi)
`"Pauzada"` (Fokus rejimi) · `Bugungi ulush: {n} daqiqa/pora` (Ibodatlar) ·
`Bugun: {n}/{m} pomodoro ... sof ish` (Pomodoro). Uchalasi ham `tr()`/`tf()` ga o'raldi.

### !!! ENG MUHIM SABOQ — kalitni o'zgartirsangiz TARJIMA ORQADA QOLADI
Kalit nomi almashtirilganda `en`/`ar`/`ru` qiymatlari **eski ma'noda** qolib ketadi va
buni lug'at tekshiruvi **TOPMAYDI** (kalit bor, tarjima bor — lekin ma'nosi noto'g'ri).
17 ta shunday holat topildi, masalan `ar`/`ru` da hamon «fokus vaqti», inglizchada
«daily share», «reshape the goal» turardi.
**Yagona ishonchli usul:** `npx esbuild src/tillar.ts --format=esm --outfile=X.mjs`
→ node bilan `setCur(til)` qilib **besh tilda chiqishni ko'zdan kechirish**.

### TEKSHIRUV SKRIPTLARI — ikki xil kerak
1. `tr()`/`tf()` matnlari ↔ lug'at kalitlari
2. **Modul massivlari** (`HELP_ITEMS`, `TUR_TOLIQ`, `NEWS_ITEMS`, `NAMOZLAR`...) ↔ lug'at —
   bular `tr()` orqali o'tmaydi, 1-skript ularni **KO'RMAYDI**. Shu yo'l bilan 3 ta
   tarjimasiz qolgan matn topildi
- **DIQQAT:** lug'atda ba'zi kalitlar **bitta satrda bir nechtadan** yozilgan
  (`"Yakshanba": {...}, "Dushanba": {...},`). Regexni satr boshiga bog'lash (`^`) XATO —
  faqat birinchisini topadi. Shu sababdan dastlab 20 ta soxta «tarjimasiz» chiqdi
- Takror kalit tekshiruvida **izoh satrlari chetlansin** — izohdagi namuna (`// "Bugun": {...}`)
  soxta «takror» beradi

### HAL QILINMAGAN MAYDA IZLAR
- Sozlamalardagi «Zaxira, qo'llanma, **maqsadni qayta tuzish**» izohi — tugmalar nomi
  o'zgargani uchun biroz eskirdi
- `NEWS_ITEMS` (v11) da «**qo'shimcha ishlar**» yozuvi bor — tarixiy yozuv, ataylab tegilmadi
- «Eltuvchi» so'zi: foydalanuvchi tanlovi bo'yicha 3 joyda qoldi, 1 joyda «olib boradigan»
  bo'ldi — ataylab, bir xil emas

## KELAJAK REJALARI
- **!!! PLAY MARKET BOSQICHIDA BIRINCHI NAVBATDA ESLATISH (foydalanuvchi maxsus so'radi):** tashqi ilova belgisi (launcher ikonka) tanlovi funksiyasini qo'shish — Sozlamalar→Ko'rinishdan oq/yashil/sariq/4-variant logolardan birini tanlash. **Web/Capacitor'da MUMKIN EMAS** (Android activity-alias + native Kotlin/Java kerak). Logolar tayyor: `C:\oliy-maqsad\Logolar\`
- Play Market: $25 hisob, Capacitor AAB, ~12 sinovchi 14 kun yopiq test, maxfiylik siyosati sahifasi
- Firebase profil-sinxronlash — Play bosqichida
