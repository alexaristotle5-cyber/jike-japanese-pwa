export type RouteName = "home" | "sentences" | "study" | "review" | "settings" | "account";

export function getRoute(): RouteName {
  const hash = window.location.hash.replace("#", "");

  if (hash === "sentences" || hash === "study" || hash === "review" || hash === "settings" || hash === "account") {
    return hash;
  }

  return "home";
}

export function navigate(route: RouteName): void {
  window.location.hash = route === "home" ? "" : route;
}

export function onRouteChange(render: () => void): void {
  window.addEventListener("hashchange", render);
}
