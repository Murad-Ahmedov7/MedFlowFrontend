import { AuthContext } from "@/features/auth/context/AuthContext";
import { tokenService } from "@/services/tokenService";
import { queryClient } from "@/shared/lib/react-query/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

// export const Providers = ({ children }: Props) => {
//   return (
//     <>
//       {/* gələcəkdə buraya əlavə edə bilərsən:
//           AuthProvider
//           ThemeProvider
//       */}
//       {children}
//     </>
//   );
// };

// //bunu daha yaxsi et (ReactNodesuz olur?)

// //providers islet necese




// export const Providers = ({ children }: Props) => {
//   const token = tokenService.getToken();

//   let role: string | null = null;

//   if (token) {
//     try {
//       const decoded: any = jwtDecode(token);
//       role =
//         decoded[
//           "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
//         ].toLowerCase() ?? null;
//     } catch {
//       role = null;
//     }
//   }


export const Providers = ({ children }: Props) => {
  const [role, setRole] = useState<string | null>(null);

  // 🔥 decode funksiyası
  const decodeRole = () => {
    const token = tokenService.getToken();

    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);

      return (
        decoded[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ]?.toLowerCase() ?? null
      );
    } catch {
      return null;
    }
  };

  // 🔥 App açılarkən role hesabla
  useEffect(() => {
    setRole(decodeRole());
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ role, setRole }}>{children}</AuthContext.Provider>
    </QueryClientProvider>
  );
};

// QueryClient = global state-dir → 1 dəfə yaradılmalıdır
// ❌ Səhv yanaşma (əgər ayrıca fayl olmasa)
// export const Providers = () => {
//   const queryClient = new QueryClient(); // ❌

//   return (
//     <QueryClientProvider client={queryClient}>

// 👉 Problem:

// hər render → yeni client
// cache silinir
// query-lər yenidən işləyir
// performans düşür
// ✅ Niyə ayrıca fayl düzgündür
// 1️⃣ Singleton prinsip
// App boyunca 1 ədəd QueryClient










// ❌ PROBLEM (dəqiq)

// Sənin flow belə idi:

// Doctor login → role = doctor ✔
// Logout → token silinir ✔
// Admin login → token dəyişir ✔
// Amma UI hələ də doctor kimi qalır ❌
// Yalnız refresh → düzəlir ✔




// 🔥 KÖK SƏBƏB

// Səndə role belə idi:

// let role = ...

// ➡️ bu:

// React state deyil ❌
// React bunu izləmir ❌






// ❗ Nəticə
// Hadisə	React görür?
// token dəyişdi	❌
// route dəyişdi	❌
// state dəyişdi	✔

// ➡️ səndə state yox idi → UI dəyişmirdi






// ❗ “Page dəyişir, niyə dəyişmir?” sualının cavabı

// Sən belə düşünürdün:

// Page dəyişir → mount olur → role dəyişməlidir

// ➡️ YANLIŞ

// 🔍 Əslində nə olur

// Struktur:

// <Providers>        ← 🔴 SABİT (GLOBAL)
//   <App>
//     <Routes>       ← 🔁 dəyişir
//       <Page />     ← 🔁 dəyişir
// ✔️ Route change zamanı
// Page → mount olur ✔
// Routes → dəyişir ✔








// ❌ Amma
// <AuthContext.Provider>

// ➡️ bu:

// yuxarıdadır
// dəyişmir
// mount olmur





// 🔥 Əsas prinsip

// 👉 React yalnız dəyişən hissəni render edir
// 👉 parent dəyişmirsə → ona toxunmur




// ❗ Ona görə
// Hadisə	Provider
// navigate()	❌ dəyişmir
// login	❌ dəyişmir
// refresh	✔ yenidən qurulur



// ✔️ Niyə refresh işləyirdi?
// F5 → bütün app restart olunur




// ➡️:

// Provider yenidən mount olunur ✔
// token oxunur ✔
// role yenidən hesablanır ✔



// ✔️ HƏLL (nəyi dəyişdik)
// 1. role-u state etdik
// const [role, setRole] = useState(null);


// 2. Context-ə setter əlavə etdik
// { role, setRole }


// 3. Login-də update etdik
// setRole(decodedRole);


// 4. Logout-da sıfırladıq
// setRole(null);


// 5. App açılarkən oxuduq
// useEffect(() => {
//   setRole(getRoleFromToken());
// }, []);



// 🔥 NƏ DƏYİŞDİ
// Əvvəl	                      İndi
// token dəyişir → UI dəyişmir	token dəyişir → UI dərhal dəyişir ✔
// refresh lazım idi	          refresh lazım deyil ✔
// role static idi	            role reactive oldu ✔


// 🔥 ƏN VACİB ANLAYIŞ (mount məsələsi)

// 👉 Page mount olur, amma Provider mount olmur

// ✔️ Sadə model
// Providers (global bina)
//    ↓
// Pages (otaqlar)

// 👉 sən otağı dəyişirsən
// 👉 bina qalır

// ✔️ Nəticə

// 👉 Route change = yalnız UI dəyişir
// 👉 State change = data dəyişir

// 🔥 QIZIL QAYDA
// localStorage dəyişməsi → React görmür ❌
// state dəyişməsi → React görür ✔
// ✔️ FINAL FLOW (indi düzgün)
// login → token dəyişdi → setRole() → Provider update → UI rerender ✔








// 🔥 ƏSAS FƏRQ (ən vacib hissə)
// ✔️ 1. Login zamanı setRole — dərhal update
// setRole(decodedRole);

// 👉 səbəb:

// token dəyişir
// React bunu görmür ❌
// UI dəyişməz ❌

// ➡️ ona görə:

// 👉 React-ə məcburi deyirik: “state dəyişdi”



// ✔️ 2. App başlayanda setRole — bərpa (recovery)
// useEffect(() => {
//   setRole(decodeRole());
// }, []);

// 👉 səbəb:

// refresh zamanı state silinir ❌
// amma token qalır ✔

// ➡️ ona görə:

// 👉 token-dən role-u yenidən qururuq

// 🔥 QISA MÜQAYİSƏ
// Harada	Niyə
// Login-də	UI dərhal dəyişsin
// App start-da	refresh-dən sonra bərpa olunsun





// Qısa və sərt:

// 👉 Refresh = səhifə yenidən yüklənir → bütün JavaScript yenidən başlayır → state sıfırlanır.




// 🔥 Əsas səbəb

// React state:

// useState()

// 👉 yalnız yaddaşda (RAM-da) saxlanır





// 🔍 Refresh zamanı nə baş verir
// 1. Browser edir:
// window.location.reload()


// 2. Nəticə:
// bütün JS prosesi dayanır ❌
// bütün dəyişənlər silinir ❌
// React app sıfırdan başlayır ❌


// 3. Sənin state
// const [role, setRole] = useState(null);



// ➡️ yenidən:

// role = null
// ❗ Niyə belə dizayn edilib?




// Çünki:

// 👉 browser hər refresh-də:

// təmiz start verir
// əvvəlki JS yaddaşı saxlamır



// 🔥 Amma localStorage niyə qalır?
// localStorage

// ➡️ bu:

// diskdə saxlanır ✔
// browser tərəfindən qorunur ✔


// ✔️ Müqayisə
// Data	          Harada	    Refresh sonrası
// state	        RAM	        ❌ silinir
// localStorage	  disk	      ✔ qalır

// 🔥 Sadə analogiya
// state = RAM
// localStorage = SSD

// Refresh:

// RAM silinir ❌
// SSD qalır ✔



// ✔️ Ona görə biz nə edirik
// useEffect(() => {
//   setRole(decodeRole());
// }, []);

// ➡️ diskdən RAM-a yenidən yazırıq



// ✔️ Nəticə

// 👉 refresh zamanı state silinir, çünki:

// JS prosesi yenidən başlayır
// RAM təmizlənir


// 🔥 Qızıl qayda
// State = temporary
// Storage = persistent


//buna uygun bir numune kod yaz.

//ve ram ve ssd istifadeesi render mount mesleeni tam basa dus







// Qısa və dəqiq:

// 👉 React tree = component-lərin bir-birinə bağlı iyerarxiyası (ağac strukturu)

// 🌳 Sadə izah

// React app belə düşünülür:

// App
//  ├── Navbar
//  ├── Sidebar
//  └── Page
//       ├── Table
//       └── Button

// 👉 buna deyirik: React tree







// 🔥 Niyə “tree” deyilir?

// Çünki:

// 1 root var (App)
// onun child-ları var
// onların da child-ları var

// ➡️ tam ağac kimidir 🌳








// ✔️ Sənin project-də real misal
// <Providers>          // root
//   <App>
//     <Routes>
//       <DepartmentsPage>
//         <DepartmentsTable />

// Tree kimi görünüş:
// Providers
//  └── App
//       └── Routes
//            └── DepartmentsPage
//                 └── DepartmentsTable







// ❗ Sənin bug bununla bağlı idi

// 👉 sən düşünürdün:

// “Page dəyişdi → hər şey dəyişdi”

// ➡️ amma:

// Providers (yuxarı)
//    ↓ dəyişmir ❌
// Page (aşağı)
//    ↓ dəyişir ✔




// 🔥 Əsas məntiq

// 👉 React yalnız tree-də dəyişən node-ları yeniləyir

// Misal
// navigate("/departments")

// ➡️ dəyişir:

// Routes → Page

// ➡️ dəyişmir:

// Providers ❌



// ✔️ Ona görə role dəyişmirdi
// role → Providers içində idi
// Providers → dəyişmirdi
// UI → köhnə qalırdı





// ✔️ Nəticə

// 👉 React tree = component-lərin quruluşu

// 👉 və:

// yuxarı dəyişməzsə → aşağı dəyişə bilər
// aşağı dəyişsə → yuxarı dəyişmir





// ✔️ QAYDA 1

// 👉 React yalnız state/props dəyişəndə rerender edir

// ✔️ QAYDA 2

// 👉 localStorage dəyişməsi React-i trigger etmir

// ✔️ QAYDA 3

// 👉 Provider yuxarıdadırsa, route change onu dəyişmir


//burdaki qaydalarin duzgunluyu yoxlaa.

//mount re render ve set olanda nece rerender edir ve s onlarin hamisin arasidr ve bunu da bir de arasidr.