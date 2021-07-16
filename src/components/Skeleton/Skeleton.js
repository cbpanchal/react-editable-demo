import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { skeletonContainer } from "../styles/tableStyle";

const SkeletonComponent = () => {
  return (
    <div style={{ ...skeletonContainer }}>
      <Skeleton width={100} />
    </div>
  );
};

export default SkeletonComponent;
