    import { StrictMode } from "react";
    import { createRoot } from "react-dom/client";
    import "./index.css";
    import App from "./app/App";
    import { Providers } from "./app/providers";
    import "./services/interceptors"; //bunu ele apiClient-da ve ya basqa yerde cagirim da yoxsa burda duzdu?
    import "@/shared/i18n";

    createRoot(document.getElementById("root")!).render(
      // <StrictMode>
        <Providers>
          <App />
        </Providers>
      //</StrictMode> 
    );
