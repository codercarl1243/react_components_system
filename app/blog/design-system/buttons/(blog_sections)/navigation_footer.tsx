import Heading from "@/components/heading";
import PostNavigation from "@/components/post/navigation";
import PostSection from "@/components/post/post.section";


export default function NavigationFooter() {

    return (
        <PostSection id="series-navigation">
            <Heading as={"h2"}>Continue the Series</Heading>
            <PostNavigation
                next={{
                    href: "/blog/design-system/buttons/sliders",
                    heading: "Slider Buttons"
                }} />
        </PostSection>
    )
}