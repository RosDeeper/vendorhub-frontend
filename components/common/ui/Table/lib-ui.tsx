import { MoreHorizontal } from "lucide-react";

import { buttonVariants } from "@/components/ui";
import { cn } from "@/lib";

// /////////////////// TABLE //////////////////////
const UITable = ({ className, ...props }: React.ComponentProps<"table">) => {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-auto"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  );
};

const TableHeader = ({ className, ...props }: React.ComponentProps<"thead">) => {
  return (
    <thead
      data-slot="table-header"
      className={cn("rounded bg-[#E2E0D0]", className)}
      {...props}
    />
  );
};

const TableBody = ({ className, ...props }: React.ComponentProps<"tbody">) => {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
};

const TableFooter = ({ className, ...props }: React.ComponentProps<"tfoot">) => {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  );
};

const TableRow = ({ className, ...props }: React.ComponentProps<"tr">) => {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      )}
      {...props}
    />
  );
};

const TableHead = ({ className, ...props }: React.ComponentProps<"th">) => {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap",
        "[&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-0.5",
        className
      )}
      {...props}
    />
  );
};

const TableCell = ({ className, ...props }: React.ComponentProps<"td">) => {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-0.5",
        className
      )}
      {...props}
    />
  );
};

const TableCaption = ({
  className,
  ...props
}: React.ComponentProps<"caption">) => {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  );
};

// /////////////////// PAGINATION //////////////////////
const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => {
  return (
    <nav
      data-slot="pagination"
      role="navigation"
      aria-label="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
};

const PaginationContent = ({
  className,
  ...props
}: React.ComponentProps<"ul">) => {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  );
};

const PaginationItem = ({ className, ...props }: React.ComponentProps<"li">) => {
  return (
    <li data-slot="pagination-item" className={cn("", className)} {...props} />
  );
};

const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}: React.ComponentProps<"a"> & {
  isActive?: boolean
  size?: "default" | "sm" | "lg" | "icon"
}) => {
  return (
    <a
      data-slot="pagination-link"
      aria-current={isActive ? "page" : undefined}
      className={cn(
        buttonVariants({
          variant: "noShadow",
          size,
        }),
        className,
        isActive && "bg-black text-white",
      )}
      {...props}
    />
  );
};

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => {
  return (
    <span
      data-slot="pagination-ellipsis"
      aria-hidden
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
};

export {
  UITable,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,

  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
};
