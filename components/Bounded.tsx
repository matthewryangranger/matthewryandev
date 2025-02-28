import React from "react";
import clsx from "clsx";

type BoundedProps<C extends React.ElementType = "section"> = {
    as?: C;
    className?: string;
    children: React.ReactNode;
} & React.ComponentPropsWithoutRef<C>;

const Bounded = React.forwardRef<HTMLElement, BoundedProps>(
    ({ as: Comp = "section", className, children, ...restProps }, ref) => {
        return (
            <Comp
                ref={ref}
                className={clsx("px-4 py-10 md:px-6 md:py-14 lg:py-16", className)}
                {...restProps}
            >
                <div className="mx-auto w-full max-w-7xl">{children}</div>
            </Comp>
        );
    },
);

// Set a display name for the component
Bounded.displayName = "Bounded";

export default Bounded;