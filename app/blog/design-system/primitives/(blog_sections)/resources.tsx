import InlineCode from "@/components/code/inlineCode";
import Heading from "@/components/heading";


export default function Resources() {


    return (
        <>

            <Heading as="h3" headingSize={4}>Typescript notes</Heading>
            <p>
                The shared <InlineCode codeString="PrimitiveProps" /> type uses <InlineCode codeString="Omit" lang="ts" /> to remove any existing <InlineCode codeString="as" /> prop from <InlineCode codeString="ComponentProps<T>" lang="ts" />.
                This prevents duplicate or conflicting polymorphic definitions when composing custom element types.
            </p>
        </>

    )
}