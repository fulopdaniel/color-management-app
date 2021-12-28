import { useEffect, useState } from "react";

export const useMount = () => {
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    return () => setIsMounted(false);
  });

  return {isMounted};
};
