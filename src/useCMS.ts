import { useState, useEffect } from 'react';
import { CMSContent, DEFAULT_CONTENT } from './types';

export function useCMS() {
  const [content, setContent] = useState<CMSContent>(DEFAULT_CONTENT);

  const getPath = (pathString: string) => {
    if (!pathString) return '';
    const clean = pathString.startsWith('/') ? pathString.slice(1) : pathString;
    const baseUrl = import.meta.env.BASE_URL || '/';
    return `${baseUrl}${baseUrl.endsWith('/') ? '' : '/'}${clean}`;
  };

  useEffect(() => {
    const baseUrl = import.meta.env.BASE_URL || '/';
    const jsonPath = `${baseUrl}${baseUrl.endsWith('/') ? '' : '/'}content/homepage.json`;

    fetch(jsonPath)
      .then((res) => {
        if (!res.ok) throw new Error("CMS JSON data fallback");
        return res.json();
      })
      .then((data) => {
        setContent({
          logo: data.logo || DEFAULT_CONTENT.logo,
          hero_image: data.hero_section?.hero_image || DEFAULT_CONTENT.hero_image,
          hero_title: data.hero_section?.hero_title || DEFAULT_CONTENT.hero_title,
          hero_subtitle: data.hero_section?.hero_subtitle || DEFAULT_CONTENT.hero_subtitle,
          hero_description: data.hero_section?.hero_description || DEFAULT_CONTENT.hero_description,
          about_image: data.about_section?.about_image || DEFAULT_CONTENT.about_image,
          about_title: data.about_section?.about_title || DEFAULT_CONTENT.about_title,
          about_description: data.about_section?.about_description || DEFAULT_CONTENT.about_description,
          gallery_images: data.gallery_section?.gallery_images && Array.isArray(data.gallery_section.gallery_images)
            ? data.gallery_section.gallery_images.map((item: any) => typeof item === 'object' ? item.image : item)
            : DEFAULT_CONTENT.gallery_images
        });
      })
      .catch((err) => console.warn("Using defaults:", err));
  }, []);

  return { content, getPath };
}
