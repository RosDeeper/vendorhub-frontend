import { 
  LibAccordion, 
  AccordionItem,
  AccordionContent,
  AccordionTrigger
} from "./lib-ui";

type AccordionProps = {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
};

export const Accordion = ({
  title,
  children,
  defaultOpen = false,
  className,
}: AccordionProps) => {
  const value = 'item';

  return (
    <LibAccordion 
      type='single' 
      collapsible
      defaultValue={defaultOpen ? value : undefined}
      className={className}
    >
      <AccordionItem value={value}>
        <AccordionTrigger>{title}</AccordionTrigger>
        <AccordionContent>{children}</AccordionContent>
      </AccordionItem>
    </LibAccordion>
  );
};
