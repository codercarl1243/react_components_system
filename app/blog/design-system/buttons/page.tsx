
import Post from "@/components/post";
import { type Metadata } from "next";
import { getRelatedPosts } from "@/lib/blogPosts";
import {
  Foundation,
  Setup,
  BuildingTheButton,
  InteractionLogic,
  EssentialFeatures,
  Accessibility,
  Css,
  Testing,
  Outro,
  WhatsNext,
  NavigationFooter,
  Resources,
  Sidebar,
} from './[blog_sections]';
export const metadata: Metadata = { title: 'Buttons · Design System' }

export default function ButtonsBasePage() {
    const relatedPosts = getRelatedPosts('design__button__01');

    return (
        <>
            <Post>
                <Foundation />
                <Setup />
                <BuildingTheButton />
                <InteractionLogic />
                <EssentialFeatures />
                <Accessibility />
                <Css />
                <Testing />
                <Outro />
                <WhatsNext />
                <Resources />
                <NavigationFooter />
            </Post >
            <Sidebar relatedPosts={relatedPosts} />
        </>
    )
}