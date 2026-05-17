export function assetPath(path: string): string {
  const cleanPath = path.replace(/^\/+/, "");
  return `${import.meta.env.BASE_URL}${cleanPath}`;
}

export function installAssetCssVariables(): void {
  const assets = {
    "--asset-home-bg": "assets/backgrounds/home-bg.png",
    "--asset-learning-bg": "assets/backgrounds/learning-bg.png",
    "--asset-button-small": "assets/buttons/small-round.png",
    "--asset-button-function": "assets/buttons/function-medium.png",
    "--asset-rating-again": "assets/buttons/rating-unknown.png",
    "--asset-rating-fuzzy": "assets/buttons/rating-fuzzy.png",
    "--asset-rating-known": "assets/buttons/rating-known.png",
    "--asset-training-card": "assets/panels/training-card.png",
    "--asset-analysis-panel": "assets/panels/analysis-panel.png",
    "--asset-hint-panel": "assets/panels/hint-panel.png",
  };

  Object.entries(assets).forEach(([name, path]) => {
    document.documentElement.style.setProperty(name, `url("${assetPath(path)}")`);
  });
}
