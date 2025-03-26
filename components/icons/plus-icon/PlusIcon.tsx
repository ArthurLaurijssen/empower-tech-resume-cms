import React from "react";
import { IconBase } from "@/components/icons/base/IconBase";
import { IconProps } from "@/components/icons/base/types";

export const PlusIcon: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <path
      fillRule="evenodd"
      d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
    />
  </IconBase>
);
