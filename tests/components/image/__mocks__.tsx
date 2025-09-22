export const mockNextImage = jest.fn((props: any) => {
  const { onLoad, onError, priority, ...rest } = props;
  return (
    <img
      {...rest}
      onLoad={onLoad}
      onError={onError}
      // Handle priority as HTML attribute for testing
      {...(priority ? { priority: 'true' } : {})}
      data-testid="next-image"
    />
  );
});

// Mock imageVariants data
export const mockImageVariants = {
  default: {
    width: 1200,
    height: 800,
    sizes: "(max-width: 768px) 100vw, 1200px",
    aspectRatio: 1.5,
    blurDataURL: "data:image/svg+xml;base64,test-blur",
    quality: 85,
  },
  hero: {
    width: 1920,
    height: 1080,
    sizes: "(max-width: 768px) 100vw, 1920px",
    aspectRatio: 16 / 9,
    blurDataURL: "data:image/svg+xml;base64,hero-blur",
    quality: 90,
  },
  logo: {
    width: 100,
    height: 100,
    sizes: "100px",
    aspectRatio: 1,
    blurDataURL: "data:image/svg+xml;base64,logo-blur",
    quality: 95,
  },
  card: {
    width: 400,
    height: 300,
    sizes: "(max-width: 640px) 100vw, 400px",
    aspectRatio: 4 / 3,
    blurDataURL: "data:image/svg+xml;base64,card-blur",
    quality: 80,
  },
  featured: {
    width: 1440,
    height: 810,
    sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 90vw, (max-width: 1440px) 80vw, 1440px",
    aspectRatio: 16 / 9,
    blurDataURL: "data:image/svg+xml;base64,featured-blur",
    quality: 90,
  },
  banner: {
    width: 1200,
    height: 400,
    sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 90vw, (max-width: 1200px) 85vw, 1200px",
    aspectRatio: 3,
    blurDataURL: "data:image/svg+xml;base64,banner-blur",
    quality: 88,
  },
  rectangleLogo: {
    width: 400,
    height: 100,
    sizes: "(max-width: 640px) 300px, (max-width: 768px) 350px, 400px",
    aspectRatio: 4,
    blurDataURL: "data:image/svg+xml;base64,rectangle-logo-blur",
    quality: 95,
  },
  general: {
    width: 1080,
    height: 1080,
    sizes: "(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 60vw, (max-width: 1200px) 50vw, 540px",
    aspectRatio: 1,
    blurDataURL: "data:image/svg+xml;base64,general-blur",
    quality: 85,
  },
};

// Setup function to apply all mocks
export const setupImageMocks = () => {
  jest.mock('next/image', () => mockNextImage);
  
  jest.mock('../../../components/image/imageVariants', () => ({
    imageVariants: mockImageVariants,
  }));
};