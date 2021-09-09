declare module '*.scss' {
    const content: Record<string, string>;
    export default content;
}

// declare module "*.svg" {
//     const content: any;
//     export default content;
// }

declare module '*.svg' {
    // import React = require('react');
    // export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    // const src: string;
    // export default src;
    import { ReactElement, SVGProps } from "react";
    const content: (props: SVGProps<SVGElement>) => ReactElement;
    export default content;
}