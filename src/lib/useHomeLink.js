import { useLocation } from "react-router-dom";
import { useI18n } from "@/lib/i18n";

const HOME_PATHS = new Set(["/", "/home", "/en", "/en/home"]);

// Nav/Footer hash links (#work, #how, ...) only work in-page on the
// one-pager routes. From any other route they need to point back at the
// right-language home page first.
export function useHomeLink() {
  const { lang } = useI18n();
  const { pathname } = useLocation();
  const homeBase = lang === "en" ? "/en" : "/";
  const isHome = HOME_PATHS.has(pathname);
  return (hash) => (isHome ? hash : `${homeBase}${hash}`);
}
