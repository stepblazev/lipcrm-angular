import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface IMenuLink {
  href: string;
  name: string;
  icon: IconDefinition | null;
}
