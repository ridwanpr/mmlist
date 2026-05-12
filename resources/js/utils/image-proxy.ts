export function useImageProxy() {
  const proxyImage = (url: string) => {
    if (!url) return "";

    const base64Url = btoa(url)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    return `/asset/image/${base64Url}`;
  };

  return { proxyImage };
}
