import React from "react";
import withLazyComponent from "../hocs/withLazyComponent";

export function lazyComponent(callback, fallback) {
  const LazyComponent = React.lazy(callback);
  return withLazyComponent(LazyComponent, fallback);
}
