import { CSSProp } from "styled-components";

interface MyTheme {}

declare module "react" {
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    css?: CSSProp<DefaultTheme>;
  }
}
