import { useState } from "react";

const useForceUpdate = () => {
  const [value, setValue] = useState < boolean > true;

  const forceRefresh = () => setValue(!value);

  return [value, forceRefresh];
};

export default useForceUpdate;
