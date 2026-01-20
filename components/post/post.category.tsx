import { BlogCategory } from "@/lib/blog/blog.types";
import { Block } from "@/components/primitives";

type CategoryPillProps = {
    category: BlogCategory;
}

export default function CategoryPill({category}: CategoryPillProps) {
  return (
        <Block
          as="span"
          variant="secondary"
          variantAppearance="tonal"
          paint={["foreground", "background"]}
          className="latest-posts__meta surface-frame px-2"
        >
          {category}
        </Block>
  );
}