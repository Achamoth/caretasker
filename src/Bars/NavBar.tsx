import { Link, useLocation } from "react-router-dom";
import styles from "./NavBar.module.css";

export function NavBar(): React.ReactElement {
  let mockProviderName = "ammar"; // Since I have no authentication
  let pathname = useLocation().pathname;
  const getRoute = (): Route => {
    if (pathname.match("/providers/[a-z]+/qualifications"))
      return "qualifications";
    if (pathname.match("/providers/[a-z]+/history")) return "history";
    if (pathname.match("/providers/[a-z]+/shifts")) return "shifts";
    if (pathname.match("/providers/[a-z]+/search")) return "search";
    if (pathname.match("/providers/[a-z]+/training")) return "training";
    if (pathname.match("/providers/[a-z]+")) return "profile";
    return "home";
  };

  const activeRoute = (route: Route) =>
    route === getRoute() ? styles.active : undefined;

  return (
    <div className={styles.navigation}>
      <Link className={styles.linkNoStyle} to={"/"}>
        <div className={classNames([styles.link, activeRoute("home")])}>
          Home
        </div>
      </Link>
      <Link
        className={styles.linkNoStyle}
        to={`/providers/${mockProviderName}`}
      >
        <div className={classNames([styles.link, activeRoute("profile")])}>
          Profile
        </div>
      </Link>

      <Link
        className={styles.linkNoStyle}
        to={`/providers/${mockProviderName}/qualifications`}
      >
        <div
          className={classNames([styles.link, activeRoute("qualifications")])}
        >
          Qualifications
        </div>
      </Link>

      <Link
        className={styles.linkNoStyle}
        to={`/providers/${mockProviderName}/history`}
      >
        <div className={classNames([styles.link, activeRoute("history")])}>
          History
        </div>
      </Link>

      <Link
        className={styles.linkNoStyle}
        to={`/providers/${mockProviderName}/shifts`}
      >
        <div className={classNames([styles.link, activeRoute("shifts")])}>
          My Shifts
        </div>
      </Link>

      <Link
        className={styles.linkNoStyle}
        to={`/providers/${mockProviderName}/search`}
      >
        <div className={classNames([styles.link, activeRoute("search")])}>
          Available Shifts
        </div>
      </Link>

      <Link
        className={styles.linkNoStyle}
        to={`/providers/${mockProviderName}/training`}
      >
        <div className={classNames([styles.link, activeRoute("training")])}>
          Training
        </div>
      </Link>
    </div>
  );
}

function classNames(classes: Array<string | undefined>): string {
  return classes?.filter((it) => !!it).join(" ");
}

type Route =
  | "home"
  | "profile"
  | "qualifications"
  | "history"
  | "shifts"
  | "search"
  | "training";
