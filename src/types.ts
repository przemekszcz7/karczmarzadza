export interface CMSContent {
  logo: string;
  hero_image: string;
  hero_title: string;
  hero_subtitle: string;
  hero_description: string;
  about_image: string;
  about_title: string;
  about_description: string;
  gallery_images: string[];
}

export const DEFAULT_CONTENT: CMSContent = {
  logo: "/images/logo.jpg",
  hero_image: "/images/1.jpg",
  hero_title: "Twój Wyjątkowy Dzień",
  hero_subtitle: "W Rustykalnym Stylu",
  hero_description: "Odkryj miejsce, gdzie tradycja spotyka się z elegancją. Zapraszamy do Karczme Rządza.",
  about_image: "/images/2.jpg",
  about_title: "Tradycja spotyka elegancję...",
  about_description: "Nasza karczma to połączenie sielskiego klimatu z profesjonalną obsługą bankietową. Drewniane wnętrza, regionalna kuchnia i malownicza okolica nad rzeką Rządzą stworzą niezapomnianą atmosferę dla Państwa uroczystości.",
  gallery_images: [
    "/images/3.jpg",
    "/images/4.jpg",
    "/images/5.jpg",
    "/images/6.jpg"
  ]
};
