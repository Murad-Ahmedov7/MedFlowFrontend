import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./router";

export default function App() {
  return <RouterProvider router={router} />;
}

//#region AUTH + USER + ROLE


//11)useform yaz sign upda tamamla sign in-de de yaz. //inpulari refresh et //umumi olaraq ilk once sign in-i duzelt. //useform alert islet ve ya basqa bir sey

//35)token ve interceptor isleyir ona bax. //REFRESH VE TOKENIN TAM DUZ ISLEDYIN NECE BILIM?

//ancaq admin yarada bilecek onu duzelt backende(token icinden role-u gotur ve ya repsonse da qaytar? )

//AUTDAKI ERROR REPSONSE-I ISLETMENDIM NE EDIM BAX

//12)sign in ve sign up formda bunu duzelt daha yaxsi et

//13)protected route yaz.codex ve claude code islet.

//2)sidebar da role gore goster funksiyalari

//role-u doctor sence elave bir dene de department-e gore acilaq yer 

//refresh token normal token nece isleyecek ? ve vaxti bitende silisin her ikisi?

//#endregion


//#region 🧾 FORM + VALIDATION
//--------------------------SignUpForm.tsx(yeni sign up ucun olan form)-----------------------------

//phone- silmek olmur tek tek

//phone-u ancaq required yox az gonderende ve s onu da at

//phone unique olmalidir deye onu backende duzelt

//1)email-i yoxla ki register olub?(ama request getmesin niyese?)

//real time duzgun islmeir errorlar deyesen(sign in form ucun de bax)

//--------------------------SignUpForm.tsx(yeni sign up ucun olan form)-----------------------------
//#endregion


//#region⚙️ API + SERVICE + DATA FETCHING

// ❗ BU ARTIQ SADƏ API DEYİL

// Əgər bu olsaydı:

// return apiClient.post(...)

// 👉 onda:

// authApi olardı

// Amma sən:

// response parse edirsən ✅
// error mapping edirsən ✅
// business error handle edirsən ✅

// ➡️ bu artıq:

// SERVICE-dir

//servicedi deye adi servicedi

//tokeni local storagede yazmaq duzgun deyil.
//#endregion


//#region🧠 ERROR + LOADING + GLOBAL HANDLE

//error try caytch bu proyekrde sifirdan basa dus yaz nese et

//error mentiqini tam basa dus mende sorgulardi bir de catch icinde throw Error ve ya error eden digerlerine  oturur bu error ust qatlarda yene catch ile tutulur.throw atmadan

//loading ver errorlari islet  hem burda hem her yerde

// 16)error hallari hamisin backende gotur ve fronta nezere al  14)loadinglere ve errorlara  bax bu form ve umumi hamisid gor duzdu?

//21)errorlari ve loadignleri idare et

//8)glbaol error handle middlewate yaz.

//umumi backende de error response pisdi ona gore try catch ve erroru sifrinda duzelt\

//1)comment yaz kodlara(ilk once app folder)

//toast yaz

//11)loading skeloton yaz //skeloton yaz

//#endregion


//#region 🏗️ STRUCTURE + CLEAN CODE + TYPES


//folder structure-a bir de bax gor ne eksikdi


//22)//componenets folder  ucun ne ola biler


//9)//kodu umumi basa dus her yerde olan //butun kodu analiz et(ve bu yazilis duzdu ona bax(authloayut signinForm ve s) ve comment yaz)

//hamisin adlandirmasini bax

//alias anca src/ yox yeni her bir folder ucun et ayri ayri

//import aliaslari et her yerde ve bu type alias nedi ona da bax?

////19)import aliasdi bu . ile yox basqa index ile cagirma

//15)//any yerine ne yazim? anyler ile islemek olar?

//htmlFor nedi? ve isledim onu?


//#endregion


//#region 🎨 UI/UX + DIGER (design, tool, plan, karyera və s.)

//6)animation yaz

//7)skeleton yaz

//20)dizayn global etme tailwind

//5)global dizayn ver harda edilirdi ve . ile  ic ice noqte yazmirdiq e onu da oyren

//duzelt bunu

//  <div className="w-100 h-45">
//     <img src="/images/medflow-logo.png" alt="Logo" className="w-full  " />
//   </div>


//17)ic icnde div yazmagi verdis et? ve bir divin icindeki element kenara cixir bu normaldi?


//4)basqa hansi texnologiyalar isledim zustand ve s

//redis ve s onlara ne edeceyik?

//backende olan suallarmini da arasdir ve muellimin atidgi record strcut nedir bax..

//33)backendde SignalR de yaz.


//#endregion




//#region Ekran resolution

// | Ekran resolution (width × height) | Təxmini height (px) | Qeyd                       |
// | --------------------------------- | ------------------- | -------------------------- |
// | 640 × 360   (sm)                  | 48–50px             | Kiçik mobil                |
// | 768 × 1024  (md, tablet)          | 56–60px             | Tablet / portret           |
// | 1024 × 768  (lg, desktop)         | 64–70px             | Normal desktop             |
// | 1280 × 720  (xl, widescreen)      | 80px                | Böyük desktop / widescreen |
// | 1536 × 864  (2xl, extra-wide)     | 96px                | Extra-wide desktop         |
// | 1920 × 1080                       | 100–110px           | Full HD                    |
// | 2560 × 1440                       | 120–130px           | 2K                         |
// | 2960 × 1440 / 2960 × 1600         | 140–150px           | Ultra-wide / 4K            |


//#endregion



//#region edilecekler

//1)endpoint cagiranda ya useEffuect yaz ya da query

//10)useQuery yazmadim?(ve ya usefeecct ile yazmadim) hem autda qos ve hamsinda da qos

//2)TELEFON VE BURADAKI QEYDLER VE SON SON OLAN FAYLA BAX VE MEDFLOW FRONTEND OLANA VE SONRA NE EEDECEM PLAN QUR

//3)HER YERDE OLAN SEYLERI YIG SONRA PLAN YAZ( //TELEFON VE BURADAKI QEYDLER VE SON SON OLAN FAYLA BAX VE MEDFLOW FRONTEND OLANA VE SONRA NE EEDECEM PLAN QUR ikincni PROYEKTDE OLAN UMUMI ISTEKLERI YIG SONRA PROBLEMLER)

//signin signup youtubada video kimi paylas

//19)yazdigimi video kimi paylas linkedin ve hemicnin read me de yaz ve github-da video qoy ve arasidr

// her hansi bir ise qebul olmaq ucun cv atmaqdan basqa ne edim?

// vaxti uzat proyekt ucun

//bu sign up mesleensi tam bax cunki problemlidir cunki meslene patient sing up edede ancaq ele ad soyad olur.eyni de doctor .ve receptionins menasi qalmir.meselen bele ola biler admin secdi role gore ancaq doctor ucun lazim olanlar patient ucun sence ancaq onun ucun lazim olanlar

//yta da sign up edenden sonra admin bir dasboadr olsun detalli melulmatlari orda yazsin artiq. ama bu iksii de mentiqsiz olur ele bil.


//teze funksionlaqi yazanda gptsiz yaz calis ve gpt ile meslehetles(mesleen autda sorus ki hansi hisseem ozum yaza bilerem hansinsa ise gerek hardansa baxim)


//9)evvel routes ile yazidig ile indiki yazdigimi muqayise et ve linkedinde paylas

//6) sade struktu yazan kimi brach ile bir push et ve linkedinde paylas(git ignore nedi?)

// https://www.youtube.com/watch?v=1pT2OlUlC04

// https://www.youtube.com/watch?v=QY2Sj7-MMgM




//umumi butun extensionlara bax.

//global tailwind ne edim

//componenets folder ne eedim?



//dil qos i18n ile(authda da qos)

//claude code ve codex yoxla

//kiber,sebeke,ai haqqinda en azi temel bilgeler oyren. ve komp xususiyleri haqqinda da.islemek ucun komp magazisinda

//agiz,goz,urek dermanlari,suaya qarsi acqi al ve nurlan muellimden endpoint adlandirmalarini sorus.


// [Authorize] burada backende role var. eger commit olunmamis olsa, onda notbukda  bunu bele edib yaz
// [HttpPost("sign-up")]

 // Untitled.txt bax desktopda

 //kod paylasmadan elave github readme ve qoy ve islemesini sekil ve videsounu da 


//#endregion

// https://www.youtube.com/watch?v=R7b3OlEyqug




//#region edilecekler 2


//min-h-screen max-h screen ve s ferqler

//7)history elave et kodumda(history commit-e getsin?)

//8)best vs extenstion elave et fa sound


//10)yeni guncellemeleri takip ele react netcore ves


// <LINK> TO={} BEZEN BELE BEZEN DE TO ICINDE ANCAQ DIRNAQ FERQI

//13)seo ucun ne lazimdir section tag ve s article  ve umumui bu tagler ne cur bir ferq olur div-e baxanda

//14)utils vs componenets folder

//15)folder strcutlear nece olmalidir?

//taiwlind sirasni auto eden bir sey var onu tap insta ve ya hardansa(headwind isledim?) ve taiwlind docs yukledim ona bax

//#endregion







//#region Layout,Page

// ❗ ƏN VACİB AYRIM
// Sual	Cavab
// Elementin ölçüsü dəyişir?	❌ breakpoint lazım deyil
// Struktur dəyişir?	✅ breakpoint istifadə et   bu duzdu qaydadir(meseln w-[90%] md:w-[70%] lg:w-[50%])

// Unexpected Application Error!
// 404 Not Found
// 💿 Hey developer 👋

// You can provide a way better UX than this when your app throws errors by providing your own ErrorBoundary or errorElement prop on your route.

//kodumun mobil app-ni yaz bir de olculeri neden sonra mobil sayilir ve mobill app yazim eger webde de mobile gore duzeldecemse?(mobili tam nezera alamyacam web app ucun ama tam da buraxma helelik)

// sign-in/
//   SignInPage.tsx
//   SignInForm.tsx
//   useSignIn.ts
//   validation.ts

// 🔥 SEMANTIC HTML ÜSTÜNLÜKLƏRİ
// Üstünlük	İzah
// SEO	Google daha yaxşı anlayır
// Accessibility	screen reader-lar düzgün oxuyur
// Oxunaqlılıq	kod daha aydın olur bu seciotn main foot header ne vaxt isledim oyren

//typescript ucun react native-e bax

// Fayl tipi	Extension
// .tsx, .ts	❌ yazmırıq
// .json, .css, .png	✅ yazırıq

// 🧠 LAYOUT — DƏQİQ TƏRİF

// 👉 Layout — bir neçə səhifənin ortaq (təkrar olunan) UI hissəsini idarə edən container komponentdir.

// Layout = sabit hissə
// Page   = dəyişən hissə

// 🧠 📌 LAYOUT — SON TƏRİF

// 👉 Layout — bir neçə səhifə üçün ortaq olan sabit UI çərçivəsini təmin edən container komponentdir.

// 🔑 Açılması:
// sabit hissələri saxlayır (Header, Sidebar, Footer)
// içində <Outlet /> olur
// page-ləri “sarır”
// 🧠 1 cümlə ilə:

// 👉 Layout səhifənin çərçivəsidir

// 🧠 📌 PAGE — SON TƏRİF

// 👉 Page — router tərəfindən render olunan, məlumatı alıb UI ilə birləşdirən container komponentdir.

// 🔑 Açılması:
// URL ilə bağlıdır
// hook-ları çağırır
// UI komponentləri birləşdirir
// loading/error idarə edir
// 🧠 1 cümlə ilə:

// 👉 Page məlumatı alır və ekranda göstərir

// 🔥 ƏN SADƏ FƏRQ
// Layout = sabit (dəyişmir)
// Page   = dəyişən (content)
// 🧱 BİRLİKDƏ
// Layout
//  ├── Header
//  ├── Page (dəyişir)
//  └── Footer
// 🎯 SON FORMUL

// 👉 Layout + Page = gördüyün tam səhifə

//#endregion


//#region folder structure

//https://dev.to/pramod_boda/recommended-folder-structure-for-react-2025-48mc

// src/
// ├── app/                 # App-level config (router, providers)
// │   ├── App.tsx
// │   ├── router.tsx
// │   └── providers.tsx
// │
// ├── pages/               # Route-lara uyğun səhifələr
// │   ├── HomePage.tsx
// │   ├── RouteBuilderPage.tsx
// │   └── NotFoundPage.tsx
// │
// ├── features/            # ƏN VACİB hissə (domain-based)
// │   ├── auth/
// │   │   ├── auth.api.ts
// │   │   ├── auth.types.ts
// │   │   ├── auth.hooks.ts
// │   │   └── AuthForm.tsx

// features
// / auth/
//  services/
//       authService.ts
//  hooks/
//         useLogin.ts
//  types/
//         auth.types.ts
//  components/
//            AuthForm.tsx
//             AuthInput.tsx

// │   │
// │   ├── route/
// │   │   ├── route.api.ts
// │   │   ├── route.types.ts
// │   │   ├── route.hooks.ts
// │   │   ├── RouteTimeline.tsx
// │   │   └── RouteMap.tsx
// │   │
// │   └── location/
// │       ├── location.api.ts
// │       ├── location.types.ts
// │       └── LocationCard.tsx
// │
// ├── components/          # Reusable (generic UI)
// │   ├── Button.tsx
// │   ├── Input.tsx
// │   └── Modal.tsx
// │
// ├── layouts/             # Layout-lar
// │   ├── MainLayout.tsx
// │   └── DashboardLayout.tsx
// │
// ├── services/            # Global API config
// │   ├── apiClient.ts     # axios instance
// │   └── interceptors.ts
// │
// ├── hooks/               # Global reusable hooks
// │   └── useDebounce.ts
// │
// ├── utils/               # Helper functions
// │   ├── formatDate.ts
// │   └── constants.ts  bes helpers? folder
// │
// ├── types/               # Global types
// │   └── common.types.ts
// │
// ├── styles/              # Global CSS
// │   └── global.css
// │
// └── main.tsx             # Entry point

// Variant	UX	Complexity
// SignUp + SignIn	orta	sadə ✔
// SignUp → token	yaxşı ✔	bir az əlavə logic


//#endregion



// #region Responsive Layout Principles
// 🧠 ƏSAS SƏBƏB (ən vacib hissə)
// 👉 1. % width → ekrana bağlıdır
// w-[60%]

// Eyni class:

// 1200px → 720px
// 1400px → 840px

// 👉 yəni UI kontrolsuz böyüyür ❌

// 👉 2. Breakpoint + % → jump yaradır
// lg:w-[60%] xl:w-[50%]
// 1279px → 60%
// 1280px → 50%

// 👉 birdən dəyişir → UI “tullanır” ❌

// 👉 3. UI elementlər sabit olmalıdır

// Login form:

// çox geniş olmamalıdır
// çox dar olmamalıdır

// 👉 ona görə:

// max-w-md

// ➡️ limit qoyursan → sabit qalır ✅

// ⚖️ BƏS BREAKPOINT NİYƏ VAR?

// Çünki bəzi şeylər:
// 👉 ölçü deyil, struktur məsələsidir

// 🔥 Məsələn:
// 1. Layout dəyişir
// flex flex-col md:flex-row

// 👉 bu % ilə həll olunmur

// 2. Grid dəyişir
// grid-cols-1 md:grid-cols-2

// 👉 bu da ölçü deyil, struktur

// 3. UX dəyişir
// text-center md:text-left

// 👉 fərqli davranış

// 💎 QISA MÜQAYİSƏ
// Problem	Həll
// Element çox böyüyür	max-w
// Elementlər düzülüş dəyişir	breakpoint
// ⚡ ƏN VACİB DƏRS

// 👉 Breakpoint:

// ölçünü “fine-tune” etmək üçün deyil ❌
// layout davranışını dəyişmək üçündür ✅
// 🔥 SADƏ ANALOGİYA

// Bunu belə düşün:

// 📏 max-w → “bu qutu 500px-dən böyük olmasın”
// 🧱 md:flex-row → “bu qutular yan-yana keçsin”
// #endregion