import { ErrorBoundary } from "app/components/error-boundary";
import { Feed } from "app/components/feed";
import { Feed as FeedDesktop } from "app/components/feed/feed.md";
import { withColorScheme } from "app/components/memo-with-theme";

import { Hidden } from "design-system/hidden";

const HomeScreen = withColorScheme(() => {
  return (
    <ErrorBoundary>
      <Hidden from="md">
        <Feed />
      </Hidden>
      <Hidden until="md">
        <FeedDesktop />
      </Hidden>
    </ErrorBoundary>
  );
});

export { HomeScreen };
