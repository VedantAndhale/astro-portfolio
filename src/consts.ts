import type { Site, Page, Links, Socials } from "@types";

// Global
export const SITE: Site = {
  TITLE: "Vedant Andhale",
  DESCRIPTION: "Vedant Andhale's portfolio website and tech blog.",
  AUTHOR: "Vedant Andhale",
};

// Resume Page
export const RESUME: Page = {
  TITLE: "Resume",
  DESCRIPTION: "Hire Me",
};

// Blog Page
export const BLOG: Page = {
  TITLE: "Blog",
  DESCRIPTION: "Writing on topics I am passionate about.",
};

// Projects Page
export const PROJECTS: Page = {
  TITLE: "Projects",
  DESCRIPTION: "Recent projects I have worked on.",
};

// Search Page
export const SEARCH: Page = {
  TITLE: "Search",
  DESCRIPTION: "Search all posts and projects by keyword.",
};

// Links
export const LINKS: Links = [
  {
    TEXT: "Home",
    HREF: "/",
  },
  {
    TEXT: "Resume",
    HREF: "/resume",
  },
  {
    TEXT: "Projects",
    HREF: "/projects",
  },
  {
    TEXT: "Blog",
    HREF: "/blog",
  },

];

// Socials
export const SOCIALS: Socials = [
  {
    NAME: "Email",
    ICON: "email",
    TEXT: "portfolio@vedant.me",
    HREF: "mailto:portfolio@vedant.me",
  },
  {
    NAME: "Hire Me (Resume)",
    ICON: "resume",
    TEXT: "Download Resume",
    HREF: "https://links.vedant.me/resume"
  },
  {
    NAME: "Github",
    ICON: "github",
    TEXT: "VedantAndhale",
    HREF: "https://links.vedant.me/github",
  },
  {
    NAME: "LinkedIn",
    ICON: "linkedin",
    TEXT: "VedantAndhale",
    HREF: "https://links.vedant.me/linkedin",
  },
  {
    NAME: "Twitter/x",
    ICON: "twitter-x",
    TEXT: "VedantAndhale",
    HREF: "https://links.vedant.me/x"
  },


];
