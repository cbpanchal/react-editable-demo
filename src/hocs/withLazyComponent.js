import React, { Suspense } from "react";
import Loader from "@material-ui/core/CircularProgress";

/**
 * @description Default loader
 * @type {JSX.Element}
 */
const FallbackLoader = <Loader />;

/**
 * @description HOC that wraps Component into Suspense and have fallback
 * @param {JSX.Element} ContainerComponent - Component
 * @param {(JSX.Element|null)} [fallback=FallbackLoader] fallback - Fallback prop that passed to Suspense
 * @returns {JSX.Element} - WrappedComponent
 */
export default function withLazyComponent(
  ContainerComponent,
  fallback = FallbackLoader
) {
  const LazyComponent = (props) => (
    <Suspense fallback={fallback}>
      <ContainerComponent {...props} />
    </Suspense>
  );

  LazyComponent.displayName = `WithLazyComponent(${
    ContainerComponent.displayName ||
    ContainerComponent.name ||
    "ContainerComponent"
  })`;

  return LazyComponent;
}
