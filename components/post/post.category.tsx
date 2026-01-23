import { Block } from "@/components/primitives";
import clsx from "clsx";
import type { PostCategoryPillProps } from "@/components/post/post.type";

export default function CategoryPill({ category, className }: PostCategoryPillProps) {
  return (
    <Block
      as="span"
      variant="secondary"
      variantAppearance="tonal"
      paint={["foreground", "background"]}
      className={clsx(className, "category-pill surface-frame px-2")}
    >
      {category}
    </Block>
  );
}