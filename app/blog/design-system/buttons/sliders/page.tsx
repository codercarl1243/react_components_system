import Heading from "@/components/heading";
import Post from "@/components/post";
import PostBanner from "@/components/post/post.banner";
import PostSection from "@/components/post/post.section";
import PostSideBar from "@/components/post/post.sidebar";


export default function SlidersPage(){

    return (
<>
<Post>
    <PostSection>
        <PostBanner
                                title={"Slider Buttons"}
                                image={{
                                    src: "",
                                    alt: undefined
                                }}
                            />
    </PostSection>
</Post>
                    <PostSideBar
                        contents={[
                            { id: "project-structure", href: "#project-structure", label: "Project Structure" },
                            { id: "starting-code", href: "#starting-code", label: "Starting Code" },
                            { id: "onclick-handler", href: "#onclick-handler", label: "The onClick Handler with Custom Hook" },
                            { id: "type-safety", href: "#type-safety", label: "Adding Type-Safety" },
                            { id: "css-styling", href: "#css-styling", label: "CSS Styling" },
                            { id: "final-touches", href: "#final-touches", label: "Final Touches" },
                            { id: "summary", href: "#summary", label: "Summary" },
                        ]}
                    />
</>
    )
}