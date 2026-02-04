'use client';

import * as React from "react";
import { useRouter } from "next/navigation";

import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbLink,
  BreadcrumbSeparator
} from "./lib-ui";

type BreadcrumbDataItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbDataItem[];
  className?: string;
};

export const Breadcrumbs = ({ items, className }: BreadcrumbsProps) => {
  const router = useRouter();

  if (!items || items.length === 0) return null;

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage
                    style={{
                      borderRadius: '99px',
                      color: '#2C3E50',
                    }}
                  >{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    href={item.href}
                    onClick={() => router.push(item.href || '')}
                    className="cursor-pointer"
                    style={{ color: '#2C3E50' }}
                  >
                    {item.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>

              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>    
    </Breadcrumb>
  );
};
