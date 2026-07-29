# Oliy maqsad

5 yillik shaxsiy intizom, ibodat va maqsad kuzatuvchi Android ilovasi.

- **To'liq oflayn** — server yo'q, hisob yo'q, AI yo'q, telemetriya yo'q
- **Ma'lumot faqat telefonda** — brauzer `localStorage` ida (`om3_*` kalitlari)
- **Besh til:** o'zbek (lotin) · o'zbek (kirill) · English · العربية · русский
- **Zaxira:** PDF hisobot ichiga yashiringan to'liq nusxa (Sozlamalar → Zaxira)

## Texnologiya

React 19 + TypeScript + Tailwind CSS v4 + Vite. Android qobig'i — Capacitor.

| Fayl | Nima |
|---|---|
| `src/App.tsx` | Butun ilova — ekranlar, hisoblar, ma'lumot modeli |
| `src/tillar.ts` | Til tizimi va besh tilli lug'at |
| `src/oyat-shrift.ts` | Amiri Quran shrifti (subset, base64, OFL litsenziyasi) |

## Ishga tushirish

Talab: Node.js

```
npm install
npm run dev
```

Brauzerda `http://localhost:3000` ochiladi.

## APK qurish

```
npm run build
npx cap sync android
```

Keyin Android Studio → Build → Generate App Bundles or APKs.

Versiya raqami bitta joyda: `android/app/build.gradle` boshidagi
`omVersiya` va `omVersiyaKodi`.

## Muhim qoidalar

- **Tailwind CDN skripti `index.html` ga qo'shilmasin** — Tailwind qurish paytida
  CSS ga joylanadi. CDN oflayn ilovada faqat kutish qo'shadi
- **Google Fonts `@import` `index.css` ga qo'shilmasin** — chizishni to'sadi va
  oflayn baribir yuklanmaydi. Shrift kerak bo'lsa ilova ichiga joylansin
- Har yangilanishdan oldin telefondan PDF zaxira olinsin

Batafsil: `LOYIHA.md` (joriy holat) va `TARIX.md` (to'liq tarix).
