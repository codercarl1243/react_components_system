import Post from "@/components/post";
import Introduction from "./(blog_sections)/introduction";
import Section1 from './(blog_sections)/section1';
import Section2 from './(blog_sections)/section2';
import Section3 from './(blog_sections)/section3';
import Section4 from './(blog_sections)/section4';
import Section5 from './(blog_sections)/section5';
import Section6 from './(blog_sections)/section6';
import Section7 from './(blog_sections)/section7';
import WhatsNext from "./(blog_sections)/whatsNext";
import Resources from "./(blog_sections)/resources"

export default function ThemingPage() {

    return (
        <Post>
            <Introduction />
            <Section1 />
            <Section2 />
            <Section3 />
            <Section4 />
            <Section5 />
            <Section6 />
            <Section7 />
            <WhatsNext />
            <Resources />
        </Post>
    )
}