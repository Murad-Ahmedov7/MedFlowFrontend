import { queryClient } from "@/shared/lib/react-query/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";

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

export const Providers = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
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

