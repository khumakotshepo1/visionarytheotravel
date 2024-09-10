import { HeaderLogo } from "./HeaderLogo";
import { MainNavbar } from "./MainNav";

export function Header() {
  return (
    <header className="flex items-center justify-between p-4">
      <HeaderLogo />
      <MainNavbar />
    </header>
  );
}
