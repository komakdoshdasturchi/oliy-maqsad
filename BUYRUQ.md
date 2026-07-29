# QOLGAN ISHLAR — buyruq matni

> Bu faylni VS Code'dagi yordamchiga to'liq nusxalab bering.

---

Salom. Men **Oliy maqsad** ilovasi ustida ishlayapman. Sen bilan davom etamiz.

## AVVAL SHULARNI QIL

1. **`LOYIHA.md` faylini to'liq o'qi** — loyihaning barcha qoidalari, atamalari va
   saboqlari o'sha yerda. Ayniqsa «TIL TAHLILI VA TUZATISH» va «TAFTISH VA TOZALASH» bo'limlari.
2. Men **texnik odam emasman** — hamma narsani sodda o'zbek tilida, qadam-baqadam tushuntir.
3. **Kod yozishdan OLDIN nima qilmoqchi ekaningni ayt va roziligimni ol.**
4. Har o'zgarishdan keyin **nima qilganingni to'liq ayt**: nima, qayerga qo'yildi, men qanday ko'raman.

## LOYIHA HAQIDA QISQACHA

- Papka: `C:\oliy-maqsad` · GitHub: `komakdoshdasturchi/oliy-maqsad` (branch `main`)
- React 19 + TypeScript + Tailwind CSS v4 + Vite. Android qobig'i — Capacitor
- Kod ikki faylda: **`src/App.tsx`** (~5000 satr, butun ilova) va **`src/tillar.ts`** (lug'at)
- Ilova **to'liq oflayn**: server yo'q, AI yo'q. Ma'lumot `localStorage` da (`om3_*` kalitlari)
- Besh til: o'zbek lotin · o'zbek kirill (avtomatik) · English · العربية · Русский

## QAT'IY QOIDALAR — buzilmasin

**Dizayn:**
- **emoji YO'Q** (faqat ichki SVG `Icon` komponenti) · **ko'k rang YO'Q** · qizil faqat o'chirishda
- Bir sahifada ko'pi bilan 3 ta urg'u rang · chaqnoq ranglar taqiq
- Radius: karta 20 · tugma 18 · input 16

**Til tizimi — ENG MUHIMI:**
- Ekranda ko'rinadigan **har bir matn** `tr("...")` yoki `tf("...", {...})` ichida bo'lishi SHART
- **Yangi yoki o'zgargan har bir kalit** `src/tillar.ts` dagi **uchala blokka** qo'shilsin:
  `LUGAT` (en) · `LUGAT_AR` (arabcha) · `LUGAT_RU` (ruscha). Kirill avtomatik, yozish shart emas
- Kalit = o'zbekcha matnning O'ZI. Masalan: `tr("Bugun")`
- **Jumla bo'laklarga bo'linmasin.** Ichida qiymat bo'lsa, butun jumla bitta `tf()` ga o'ralsin:
  - ✅ `tf("Xatm {sana} dan boshlanadi", { sana })`
  - ❌ `tr("Xatm")} {sana} {tr("dan boshlanadi")`

**RTL (arabcha o'ngdan chapga):**
- `ml-` `mr-` `pl-` `pr-` **ishlatilmasin** → `ms-` `me-` `ps-` `pe-`
- `text-left` `text-right` **ishlatilmasin** → mantiqiy variantlari
- `borderLeft` `borderRight` **ishlatilmasin** → `borderInlineStart` `borderInlineEnd`

---

# BAJARILADIGAN ISHLAR

## 1-ISH. Tanishtiruv tartibi o'zgaradi

**Hozir shunday:** til tanlash → tanishtiruv (11 qadam, 1-qadam salomlashuv)

**Kerakli tartib:**

```
1. TIL TANLASH        (hozirgidek, o'zgarmaydi)
2. SALOMLASHUV        "Assalomu alaykum va rohmatullohi va barokatuhu"
                      "Men sizga Oliy maqsadingizga erishishingiz uchun
                       ko'makdosh bo'laman, biiznillah."
3. YANGI / ESKI       ← YANGI EKRAN, pastda tushuntirilgan
4. TANISHTIRUV        (Ismingiz nima? dan boshlanadi)
```

### 3-qadam: yangi ekran

Ikkita katta tugma bo'lsin:

```
┌──────────────────────────────────┐
│   ┌──────────────────────────┐   │
│   │     Yangi boshlayman     │   │  ← yashil, asosiy
│   └──────────────────────────┘   │
│                                  │
│   ┌──────────────────────────┐   │
│   │   Zaxiradan tiklayman    │   │  ← chegarali, ikkilamchi
│   └──────────────────────────┘   │
│                                  │
│  Ilgari ishlatgan bo'lsangiz va  │
│  PDF zaxirangiz bo'lsa           │
└──────────────────────────────────┘
```

- **«Yangi boshlayman»** → tanishtiruv davom etadi (Ismingiz nima?)
- **«Zaxiradan tiklayman»** → PDF (yoki JSON) fayl tanlanadi va ma'lumot tiklanadi

**MUHIM:** tiklash mexanizmi **allaqachon yozilgan** — `SozlamaPage` ichidagi
`importFile` funksiyasi. Yangi mantiq yozma, o'shani qayta ishlat.

**BILIB QO'Y:** zaxira tiklanganda **barcha `om3_*` kalitlari** ustiga yoziladi,
jumladan `om3_lang` ham. Ya'ni odam o'zbekchani tanlab, ruscha zaxirani tiklasa —
ilova ruscha ochiladi. Bu **to'g'ri xatti-harakat** (tiklash = to'liq tiklash),
o'zgartirishga urinma, faqat menga eslatib qo'y.

### Texnik yo'l-yo'riq

- `Onboarding` funksiyasi — `src/App.tsx` ичida `function Onboarding(` deb qidir
- Uning ichida `const TOTAL = 11` va `{step === 1 && ...}` dan `{step === 11 && ...}` gacha qadamlar bor
- 1-qadam — salomlashuv. U **o'sha joyida qolsin**
- Yangi ekranni **2-qadam** qilib qo'shsang, qolgan qadamlar 3..12 ga suriladi va
  `TOTAL = 12` bo'ladi. **Qadam raqamlarini surishda juda ehtiyot bo'l** —
  `canNext` shartida ham `step === 2`, `step === 3`, `step === 5`, `step === 9` bor,
  ular ham surilishi kerak
- Yoki soddaroq yo'l: yangi ekranni Onboarding ichiga emas, **alohida komponent**
  qilib `App()` da ko'rsat. Qaysi yo'l yaxshiroq — o'zing hal qil va menga ayt

---

## 2-ISH. «Bugun» ekrani qayta joylashtiriladi

> Men senga **rasm** yuboraman — dumaloq tugmalar qanday ko'rinishi shu rasmda.
> Rasmni ko'rmaguningcha bu ishni boshlama.

### 2.1. Pomodoro yuqoriga ko'chadi

Hozir sarlavhada uchta tugma bor: **Uyqu · Mavzu (tonggi/tungi) · Sozlamalar**
(`src/App.tsx` da `togglePage("uyqu")` va `togglePage("sozlama")` deb qidir).

**Pomodoro** ham shu qatorga qo'shilsin — **Sozlamalar tugmasidan oldin**.

⚠️ **Diqqat:** to'rtta tugma tor telefonda (360px) sig'masligi mumkin. Qurgandan keyin
telefonda ko'rib, agar siqilib qolsa menga ayt — yozuvlarni olib tashlaymiz yoki
o'lchamini kichraytiramiz.

### 2.2. To'rtta katakcha butunlay olib tashlanadi

`src/App.tsx` da `<div className="grid grid-cols-4 gap-1.5">` deb qidir. Ichida
to'rtta `<Tile>` bor: **Ibodatlar · Uyqu · Pomodoro · Eslatma**.

| Katakcha | Nima bo'ladi |
|---|---|
| **Eslatma** | **O'chirilsin.** U bosilganda shunchaki Vazifalar ro'yxatini ochadi — o'ziga xos hech narsa qilmaydi, ortiqcha |
| **Uyqu** | **O'chirilsin.** Sarlavhadagi Uyqu tugmasi bilan bir xil sahifani ochadi — takror |
| **Pomodoro** | **O'chirilsin** (yuqoriga, sarlavhaga ko'chdi) |
| **Ibodatlar** | **O'chirilsin** (pastdagi dumaloq tugmalarga ko'chadi) |

Ya'ni bu `grid grid-cols-4` bloki butunlay yo'q bo'ladi.

### 2.3. Pastda dumaloq tugmalar qatori paydo bo'ladi

Bugun sahifasining **pastroq qismida**, kichik dumaloq tugmalar (sarlavhadagi
Sozlamalar tugmasiga o'xshash uslubda) — **to'rtta**:

1. **Ibodatlar** → Ibodatlar sahifasini ochadi
2. **Sanaladigan vazifalar** → oyna (Sheet) bo'lib ochiladi
3. **Rejadan tashqari amallar** → oyna (Sheet) bo'lib ochiladi
4. **Kun iqtiboslari** → oyna bo'lib ochiladi (ichida hozircha **Oyat kartasi** — `OyatCard`)

**Hozir ular ekranda ochiq turibdi**, dumaloq tugmaga aylangach **oyna ichiga** ko'chadi:
- `<Sec id="sanaladigan" ...>` bloki
- `<Sec id="extra" ...>` bloki
- `<OyatCard />` (ikki joyda chaqirilgan — ikkalasini ham tekshir)

Ilovada `Sheet` komponenti allaqachon bor, yangisini yozma.

### 2.4. Bitta xato tuzatilsin

`src/App.tsx` da shu qatorni top:

```js
const CountBlock = countTasks.length > 0 || true ? (
```

`|| true` — bu **xato**, sinov paytidan qolgan. U tufayli «Sanaladigan vazifalar»
bo'limi bitta ham vazifa bo'lmasa ham doim ko'rinadi. `|| true` ni olib tashla.

*(Agar 2.3 bajarilsa bu blok baribir oynaga ko'chadi — lekin `|| true` baribir
tuzatilsin, chunki bo'sh oyna ham keraksiz.)*

### Natija

```
HOZIR (10 blok)                    KEYIN (6 blok)
────────────────────────           ────────────────────────
[Logo] Oliy maqsad                 [Logo] Oliy maqsad
   [Uyqu][Mavzu][Sozlama]             [Uyqu][Pomo][Mavzu][Sozlama]
    ( halqa 0/1 )                      ( halqa 0/1 )
  Keyingi vazifa                     Keyingi vazifa
 [Ibodat][Uyqu][Pomo][Eslatma]      Bugungi vazifalar
  Bugungi vazifalar                  Rejaga ko'ra uyqu
  Sanaladigan vazifalar              Kun xulosasi
  Rejaga ko'ra uyqu
  Rejadan tashqari amallar             ●    ●    ●    ●
  Kun xulosasi                      Ibodat Sanoq Rejadan Iqtibos
  ( Oyat kartasi )                             tashqari
```

---

# HAR O'ZGARISHDAN KEYIN TEKSHIR

```
npx tsc --noEmit          → 0 xato bo'lishi shart
npm run build             → toza qurilishi shart
npx cap sync android      → APK uchun ko'chirish
```

## Lug'at tekshiruvi — SHART

Yangi yoki o'zgargan matn qo'shsang, quyidagilarni tekshir:

1. **`tr()`/`tf()` matnlari ↔ lug'at kalitlari** — tarjimasiz matn qolmasin
2. **Modul massivlari ↔ lug'at** — `HELP_ITEMS`, `TUR_TOLIQ`, `TUR_QISQA`,
   `NEWS_ITEMS`, `NAMOZLAR`, `ZIKRLAR`, `OYLAR`, `KUNLAR` va boshqalar.
   ⚠️ **Bu massivlar `tr()` orqali o'tmaydi**, shuning uchun oddiy `tr("...")`
   qidiruvi ularni **TOPMAYDI**. Alohida tekshirilsin
3. **Uchala blok teng bo'lsin:** `LUGAT` = `LUGAT_AR` = `LUGAT_RU` (hozir 627/627/627)
4. **Takror kalit bo'lmasin**

## ⚠️ ENG KATTA TUZOQ — bilib qo'y

Agar kalit **nomini o'zgartirsang**, `en`/`ar`/`ru` qiymatlari **eski ma'noda**
qolib ketadi va buni oddiy tekshiruv **TOPMAYDI** (kalit bor, tarjima bor —
lekin ma'nosi noto'g'ri).

**Yagona ishonchli usul:**

```
npx esbuild src/tillar.ts --format=esm --outfile=sinov.mjs
```

keyin node bilan `setCur("en")`, `setCur("ar")`, `setCur("ru")` qilib
**besh tilda chiqishni o'z ko'zing bilan ko'r**.

## Skript yozganda

- Regexli skriptlarni **fayl** qilib yoz, `bash heredoc` bilan emas — teskari chiziqni yeydi
- Lug'atda ba'zi kalitlar **bitta satrda bir nechtadan** yozilgan
  (`"Yakshanba": {...}, "Dushanba": {...},`) — regexni satr boshiga (`^`) bog'lama
- Takror tekshirganda **izoh satrlarini chetla** — izohdagi namuna soxta takror beradi

---

# SAQLASH

Ish tugagach:

```
git add -A
git commit -m "..."
GIT_TERMINAL_PROMPT=0 git push
```

⚠️ `GIT_TERMINAL_PROMPT=0` **shart** — aks holda git terminal so'rovini kutib
cheksiz qotib qoladi.

**Ortga qaytish kerak bo'lsa:** `git log --oneline` bilan versiyani top →
`git checkout <hash> -- src/App.tsx`

---

# MENDAN SO'RASH KERAK BO'LGANLAR

1. **Rasmni ko'rmasdan 2-ishni boshlama** — dumaloq tugmalar ko'rinishi rasmda
2. Sarlavhaga to'rtinchi tugma sig'masa — menga ayt
3. Har yangilanish oxirida so'ra: **«Telegram kanal uchun e'lon matni kerakmi?»**
