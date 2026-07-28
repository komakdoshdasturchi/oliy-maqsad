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
- **Ishlatilmayotgan (o'chirilishi mumkin):** uzluksizlik(), DayChips, FolderEdit, HadisCard, HalolCard, Folder.importance, settings.remindersOn/reminderTimes (UI yo'q)

## MUHIM ESLATMALAR
- **Ma'lumot xavfsizligi:** har yangilanish eski ma'lumotlarni saqlashi SHART. Katta o'zgarishdan oldin zaxira oldirish
- **SABOQ (2026-07-27):** avtomatik `tr()` o'rash skripti `<style>` bloki ichidagi CSS ga ham tegib ketgan edi — `font-family: tr("Inter")` chiqib, butun shrift qoidasi buzilgan (v9 dan beri, `3a439b1` da tuzatildi). Shablon satri (backtick) ichida `tr()` **bajarilmaydi**, matn holicha qoladi. Skript ishlatilsa, `<style>` va boshqa backtick bloklari chetlab o'tilsin
- AI Studio'da kod FAQAT qo'lda joylanadi (Gemini chatiga ishonilmaydi)
- Android Studio yangilash takliflari doim RAD etiladi
- package.json da @google/genai qoldiq turibdi — zarari yo'q
- **NewsModal qoidasi:** yangiliklar oynasiga "Bu oyna bir marta ko'rinadi" kabi pastki izoh QO'SHILMAYDI. Faqat: logo+sarlavha, oltin versiya/sana qatori, ✕, raqamlangan ro'yxat. Keyingi yangilanishda NEWS_VER/LABEL/DATE/ITEMS ni yangilash kifoya (hozir v9)
- **KEYINGI YANGILANISHDA ESLATISH:** ilovaning **ommaga mosligi** (mass-market) haqida gaplashish — foydalanuvchi so'radi
- **!!! TARJIMA ISHLARI TUGAGACH ESLATISH (foydalanuvchi 2026-07-27 da so'radi): andoza qoldiqlarini tozalash.** AI Studio namunasidan qolgan, hech kim ataylab qo'shmagan (`package.json` nomi hali ham `"react-example"`, `index.html`/`index.css` 19-iyuldan beri o'zgarmagan):
  1. `index.html` dagi `<script src="https://cdn.tailwindcss.com">` — **keraksiz**, Tailwind allaqachon `@tailwindcss/vite` orqali ichiga qurilgan. Oflayn bekor so'rov
  2. `index.css` dagi `@import url(fonts.googleapis.com...)` — oflayn yuklanmaydi, telefonda Inter baribir ko'rinmaydi (Roboto ga tushadi). Shriftni ilova ichiga joylash kerak
  3. `index.css` dagi namuna ranglari (`#fafafa`, `#171717`) — dizaynga mos emas, App.tsx styleBlock ustidan yozadi
  - **EHTIYOT:** `index.css` butunlay o'lik EMAS — `main.tsx` uni yuklaydi va ichidagi `* { transition-property: ... }` qoidasi butun ilovada ishlaydi. O'chirishdan oldin o'sha qism ko'chirib olinsin
- **SINOVDA TEKSHIRISH:** begona odam "Oliy maqsad belgilash"ni topa oladimi (u pastdagi + menyusiga ko'chirilgan)

## KELAJAK REJALARI
- **!!! PLAY MARKET BOSQICHIDA BIRINCHI NAVBATDA ESLATISH (foydalanuvchi maxsus so'radi):** tashqi ilova belgisi (launcher ikonka) tanlovi funksiyasini qo'shish — Sozlamalar→Ko'rinishdan oq/yashil/sariq/4-variant logolardan birini tanlash. **Web/Capacitor'da MUMKIN EMAS** (Android activity-alias + native Kotlin/Java kerak). Logolar tayyor: `C:\oliy-maqsad\Logolar\`
- Play Market: $25 hisob, Capacitor AAB, ~12 sinovchi 14 kun yopiq test, maxfiylik siyosati sahifasi
- Firebase profil-sinxronlash — Play bosqichida
