import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Image from '@/components/image';

describe('Image Component', () => {
  const defaultProps = {
    src: '/test-image.jpg',
    alt: 'Test image',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders with required props', () => {
      render(<Image {...defaultProps} />);
      const image = screen.getByTestId('next-image');
      const wrapper = image.parentElement;
      
      expect(wrapper).toBeInTheDocument();
      expect(wrapper).toHaveClass('image-wrapper', 'image');
      expect(image).toHaveAttribute('src', '/test-image.jpg');
      expect(image).toHaveAttribute('alt', 'Test image');
    });

    it('applies default variant when no variant specified', () => {
      render(<Image {...defaultProps} />);
      const image = screen.getByTestId('next-image');
      
      expect(image).toHaveAttribute('width', '1200');
      expect(image).toHaveAttribute('height', '800');
      expect(image).toHaveAttribute('quality', '85');
    });
  });

  describe('Variant Behavior', () => {
    it('applies hero variant configuration', () => {
      render(<Image {...defaultProps} variant="hero" />);
      const image = screen.getByTestId('next-image');
      
      expect(image).toHaveAttribute('width', '1920');
      expect(image).toHaveAttribute('height', '1080');
      expect(image).toHaveAttribute('quality', '90');
      expect(image).toHaveAttribute('sizes', '(max-width: 768px) 100vw, 1920px');
    });

    it('applies logo variant configuration', () => {
      render(<Image {...defaultProps} variant="logo" />);
      const image = screen.getByTestId('next-image');
      
      expect(image).toHaveAttribute('width', '100');
      expect(image).toHaveAttribute('height', '100');
      expect(image).toHaveAttribute('quality', '95');
    });

    it('applies card variant configuration', () => {
      render(<Image {...defaultProps} variant="card" />);
      const image = screen.getByTestId('next-image');
      
      expect(image).toHaveAttribute('width', '400');
      expect(image).toHaveAttribute('height', '300');
      expect(image).toHaveAttribute('quality', '80');
    });
  });

  describe('CSS Classes', () => {
    it('applies base wrapper classes', () => {
      render(<Image {...defaultProps} />);
      const image = screen.getByTestId('next-image');
      const wrapper = image.parentElement;
      
      expect(wrapper).toHaveClass('image-wrapper', 'image');
    });

    it('applies variant-specific class to image only', () => {
      render(<Image {...defaultProps} variant="hero" />);
      const image = screen.getByTestId('next-image');
      
      // Image gets variant class
      expect(image).toHaveClass('image--hero');
      // But NOT the base 'image' class - that's on the wrapper
      expect(image).not.toHaveClass('image');
    });

    it('applies loading class to wrapper initially', () => {
      render(<Image {...defaultProps} variant="card" />);
      const image = screen.getByTestId('next-image');
      const wrapper = image.parentElement;
      
      // Loading class is on the wrapper, not the image
      expect(wrapper).toHaveClass('image-loading');
      expect(image).not.toHaveClass('image-loading');
    });

    it('merges custom className with wrapper classes', () => {
      render(<Image {...defaultProps} className="custom-class" />);
      const image = screen.getByTestId('next-image');
      const wrapper = image.parentElement;
      
      // Custom class goes on wrapper with other wrapper classes
      expect(wrapper).toHaveClass('image-wrapper', 'image', 'custom-class');
      // Image doesn't get the custom class
      expect(image).not.toHaveClass('custom-class');
    });
  });

  describe('Priority Handling', () => {
    it('sets priority for hero variant', () => {
      render(<Image {...defaultProps} variant="hero" />);
      const image = screen.getByTestId('next-image');
      
      expect(image).toHaveAttribute('priority', 'true');
    });

    it('does not set priority for card variant', () => {
      render(<Image {...defaultProps} variant="card" />);
      const image = screen.getByTestId('next-image');
      
      expect(image).not.toHaveAttribute('priority');
    });

    it('allows priority override', () => {
      render(<Image {...defaultProps} variant="card" priority={true} />);
      const image = screen.getByTestId('next-image');
      
      expect(image).toHaveAttribute('priority', 'true');
    });
  });

  describe('Placeholder and Blur', () => {
    it('sets default blur placeholder', () => {
      render(<Image {...defaultProps} variant="hero" />);
      const image = screen.getByTestId('next-image');
      
      expect(image).toHaveAttribute('placeholder', 'blur');
      expect(image).toHaveAttribute('blurDataURL', 'data:image/svg+xml;base64,hero-blur');
    });

    it('allows custom blurDataURL override', () => {
      const customBlur = 'data:image/svg+xml;base64,custom-blur';
      render(<Image {...defaultProps} blurDataURL={customBlur} />);
      const image = screen.getByTestId('next-image');
      
      expect(image).toHaveAttribute('blurDataURL', customBlur);
    });

    it('allows placeholder override', () => {
      render(<Image {...defaultProps} placeholder="empty" />);
      const image = screen.getByTestId('next-image');
      
      expect(image).toHaveAttribute('placeholder', 'empty');
    });
  });

  describe('Style Handling', () => {
    it('applies aspectRatio from variant', () => {
      render(<Image {...defaultProps} variant="hero" />);
      const image = screen.getByTestId('next-image');
      
      expect(image).toHaveStyle({ aspectRatio: 16/9 });
    });

    it('merges custom styles with aspectRatio', () => {
      const customStyle = { border: '1px solid red', aspectRatio: 2 };
      render(<Image {...defaultProps} style={customStyle} />);
      const image = screen.getByTestId('next-image');
      
      expect(image).toHaveStyle({ 
        border: '1px solid red',
        aspectRatio: 2 // Custom aspectRatio should override
      });
    });
  });

  describe('Loading State', () => {
    it('has data-loading attribute and wrapper class initially', () => {
      render(<Image {...defaultProps} />);
      const image = screen.getByTestId('next-image');
      const wrapper = image.parentElement;
      
      expect(image).toHaveAttribute('data-loading', 'true');
      expect(wrapper).toHaveClass('image-loading');
    });

    it('removes loading state on successful load', () => {
      render(<Image {...defaultProps} />);
      const image = screen.getByTestId('next-image');
      const wrapper = image.parentElement;
      
      // Initially loading
      expect(wrapper).toHaveClass('image-loading');
      expect(image).toHaveAttribute('data-loading', 'true');
      
      // After load event
      fireEvent.load(image);
      
      expect(wrapper).not.toHaveClass('image-loading');
      expect(image).toHaveAttribute('data-loading', 'false');
    });

    it('removes loading state on error', () => {
      render(<Image {...defaultProps} />);
      const image = screen.getByTestId('next-image');
      const wrapper = image.parentElement;
      
      // Initially loading
      expect(wrapper).toHaveClass('image-loading');
      expect(image).toHaveAttribute('data-loading', 'true');
      
      // After error event
      fireEvent.error(image);
      
      expect(wrapper).not.toHaveClass('image-loading');
      expect(image).toHaveAttribute('data-loading', 'false');
    });
  });

  describe('Event Handling', () => {
    it('calls custom onLoad handler', () => {
      const mockOnLoad = jest.fn();
      render(<Image {...defaultProps} onLoad={mockOnLoad} />);
      const image = screen.getByTestId('next-image');
      
      fireEvent.load(image);
      
      expect(mockOnLoad).toHaveBeenCalledTimes(1);
    });

    it('calls custom onError handler', () => {
      const mockOnError = jest.fn();
      render(<Image {...defaultProps} onError={mockOnError} />);
      const image = screen.getByTestId('next-image');
      
      fireEvent.error(image);
      
      expect(mockOnError).toHaveBeenCalledTimes(1);
    });
  });

  describe('Prop Overrides', () => {
    it('allows quality override', () => {
      render(<Image {...defaultProps} variant="card" quality={100} />);
      const image = screen.getByTestId('next-image');
      
      expect(image).toHaveAttribute('quality', '100');
    });

    it('allows sizes override', () => {
      render(<Image {...defaultProps} sizes="(max-width: 640px) 100vw, 50vw" />);
      const image = screen.getByTestId('next-image');
      
      expect(image).toHaveAttribute('sizes', '(max-width: 640px) 100vw, 50vw');
    });

    it('allows dimensions override', () => {
      render(<Image {...defaultProps} width={500} height={300} />);
      const image = screen.getByTestId('next-image');
      
      expect(image).toHaveAttribute('width', '500');
      expect(image).toHaveAttribute('height', '300');
    });

    it('passes through additional Next.js Image props', () => {
      render(
        <Image 
          {...defaultProps} 
          loading="eager"
          data-custom="test"
        />
      );
      const image = screen.getByTestId('next-image');
      
      expect(image).toHaveAttribute('loading', 'eager');
      expect(image).toHaveAttribute('data-custom', 'test');
    });
  });

  describe('Edge Cases', () => {
    it('handles undefined variant gracefully', () => {
      render(<Image {...defaultProps} variant={undefined} />);
      const image = screen.getByTestId('next-image');
      
      // Should fallback to default variant
      expect(image).toHaveAttribute('width', '1200');
      expect(image).toHaveAttribute('height', '800');
    });

    it('handles empty alt text', () => {
      render(<Image src="/test.jpg" alt="" />);
      const image = screen.getByTestId('next-image');
      
      expect(image).toHaveAttribute('alt', '');
    });
  });
});