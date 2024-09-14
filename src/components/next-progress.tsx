"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const NextProgress = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ProgressBar
        height="4px"
        color="#fffd00"
        options={{ showSpinner: false }}
        shallowRouting
      />
      {children}
    </>
  );
};

export default NextProgress;
