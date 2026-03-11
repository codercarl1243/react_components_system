import { ReactNode } from "react";

export interface Project {
    id: string;
    title: string;
    description: string;
    status: "active" | "experimental" | "archived"
    content: () => ReactNode;
    image: {
        src: string;
        alt: string;
    }
    slug: string;
    featured?: boolean;
    github?: string;
    demo?: string;
    tech: string[];
    createdAt: Date;
}