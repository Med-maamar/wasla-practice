/**
 * Home page route.
 *
 * The page stays intentionally thin and delegates rendering to the layout
 * component layer.
 */
import { HomePageView } from "@/components/layout";

/**
 * Renders the application home page.
 *
 * @returns The localized home page view.
 */
export default function HomePage() {
  return <HomePageView />;
}
