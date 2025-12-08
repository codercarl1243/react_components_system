import { TImageVariants } from "@/components/image/image.type";

export const imageVariants = {
    logo: {
        width: 100,
        height: 100,
        sizes: "(max-width: 640px) 80px, 100px",
        aspectRatio: 1,
        blurDataURL: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+",
        quality: 100
    },
    rectangleLogo: {
        width: 400,
        height: 100,
        sizes: "(max-width: 640px) 300px, (max-width: 768px) 350px, 400px",
        aspectRatio: 4,
        blurDataURL: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+",
        quality: 100
    },
    card: {
        width: 400,
        height: 300,
        sizes: "(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 400px",
        aspectRatio: 4 / 3,
        blurDataURL: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+",
        quality: 75
    },
    featured: {
        width: 1440,
        height: 810,
        sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 90vw, (max-width: 1440px) 80vw, 1440px",
        aspectRatio: 16 / 9,
        blurDataURL: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI4MTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2YzZjRmNiIvPjwvc3ZnPg==",
        quality: 100
    },
    default: {
        width: 1200,
        height: 800,
        sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 90vw, (max-width: 1200px) 80vw, 1200px",
        aspectRatio: "auto",
        blurDataURL: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI4MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2YzZjRmNiIvPjwvc3ZnPg==",
        quality: 75
    },
    hero: {
        width: 1920,
        height: 1080,
        sizes: "(max-width: 768px) 100vw, (max-width: 1440px) 95vw, 1920px",
        aspectRatio: 16 / 9,
        blurDataURL: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmM2Y0ZjYiLz48L3N2Zz4=",
        quality: 100
    },
    banner: {
        width: 1200,
        height: 400,
        sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 90vw, (max-width: 1200px) 85vw, 1200px",
        aspectRatio: 3,
        blurDataURL: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI0MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2YzZjRmNiIvPjwvc3ZnPg==",
        quality: 100
    },
    general: {
        width: 1080,
        height: 1080,
        sizes: "(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 60vw, (max-width: 1200px) 50vw, 540px",
        aspectRatio: 1,
        blurDataURL: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTA4MCIgaGVpZ2h0PSIxMDgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmM2Y0ZjYiLz48L3N2Zz4=",
        quality: 75
    },
    textWithImage: {
        width: 400,
        height: 200,
        sizes: "(max-width: 600px) 100vw, (max-width: 900px) 50vw, 400px",
        aspectRatio: 'auto',
        blurDataURL: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+",
        quality: 75
    },
} as const satisfies TImageVariants;