export type Page = {
  TITLE: string;
  DESCRIPTION: string;
};

export interface Site extends Page {
  AUTHOR: string;
}

// Add BaseHeadProps interface
export interface BaseHeadProps {
  title: string;
  description: string;
  image?: string;
}

// Add OptimizedImageProps interface
export interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  class?: string;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
  sizes?: string;
  fetchpriority?: 'high' | 'low' | 'auto';
  critical?: boolean;
  darkModeFilter?: boolean;
}

// Add TableOfContentsProps interface
export interface TableOfContentsProps {
  headings: import('astro').MarkdownHeading[]; // Use import type for MarkdownHeading
  title?: string;
  minDepth?: number;
  maxDepth?: number;
  position?: 'sidebar' | 'inline';
  class?: string;
  collapsible?: boolean;
}

// Add TocDrawerProps interface
export interface TocDrawerProps {
  headings: import('astro').MarkdownHeading[]; // Use import type
  title?: string;
  minDepth?: number;
  maxDepth?: number;
  class?: string;
}

// Add TocSidebarProps interface
export interface TocSidebarProps {
  headings: import('astro').MarkdownHeading[]; // Use import type
  title?: string;
  minDepth?: number;
  maxDepth?: number;
  class?: string;
}


export type Links = {
  TEXT: string;
  HREF: string;
}[];

export type Socials = {
  NAME: string;
  ICON: string;
  TEXT: string;
  HREF: string;
}[];
