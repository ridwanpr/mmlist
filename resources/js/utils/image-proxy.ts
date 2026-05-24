/// <reference types="vite/client" />
export function useImageProxy() {
  const proxyImage = (url: string) => {
    if (!url) return "";

    const base64Url = btoa(url)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    const proxyBase =
      import.meta.env.VITE_IMAGE_PROXY_URL ||
      "https://mamorulist-image-proxy.your-subdomain.workers.dev";

    return `${proxyBase}/${base64Url}`;
  };

  return { proxyImage };
}
