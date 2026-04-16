
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div>
      <header>
        <h1>My App</h1>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <p>Footer</p>
      </footer>
    </div>
  );
}

//bu helelik numune ucun yazilib duzelt bunu gelecekde