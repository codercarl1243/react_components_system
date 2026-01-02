import { Block } from "./primitives";

export default function SkipLink () {
  return (
        <Block as="a"
            href="#main-content"
            className="skip-link"
            id="skip-link"
            variant="primary"
            variantAppearance="tonal"
            paint="all"
        >
            Skip to main content
        </Block>
  )
}
