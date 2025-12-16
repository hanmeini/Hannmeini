export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/"], // Disallow admin and api routes
    },
    sitemap: "https://www.hanmeini.my.id/sitemap.xml",
  };
}
