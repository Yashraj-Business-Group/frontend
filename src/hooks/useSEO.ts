import { useEffect } from 'react';

interface SEOOptions {
  title: string;
  description: string;
}

const setMetaTag = (attr: 'name' | 'property', key: string, content: string) => {
  let tag = document.querySelector(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
};

/** Sets the document title and description meta tags for the current page. */
export const useSEO = ({ title, description }: SEOOptions) => {
  useEffect(() => {
    const fullTitle = `${title} | Yashraj Business Group`;
    document.title = fullTitle;
    setMetaTag('name', 'description', description);
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', window.location.href);
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description);
  }, [title, description]);
};
