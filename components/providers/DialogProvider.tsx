'use client';

import { createContext, useState, useCallback } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,

  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,

  Drawer, 
  DrawerContent, 
  DrawerHeader, 
  DrawerTitle,

  Button
} from "@/components/common";

type DialogSize = "sm" | "md" | "lg" | "xl";

type DrawerSide = "right" | "left" | "bottom" | "top";

type OpenDialogOptions = {
  type: 'alert' | 'dialog' | 'drawer';
  title?: string;
  content?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;

  size?: DialogSize;
  side?: DrawerSide;

  onConfirm?: () => void;
  onCancel?: () => void;
};

type DialogContextType = {
  open: (options: OpenDialogOptions) => void,
  close: () => void,
};

export const DialogContext = createContext<DialogContextType | null>(null);

export const DialogProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<OpenDialogOptions | null>(null);

  const open = useCallback((opts: OpenDialogOptions) => {
    setOptions(opts);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleConfirmDialog = () => {
    options?.onConfirm?.();
    close();
  };

  const handleCancelDialog = () => {
    options?.onCancel?.();
    close();
  };

  const onOpenChange = (openState: boolean) => {
    setIsOpen(openState);

    if (!openState) {
      setTimeout(() => setOptions(null), 200);
    }
  };

  const sizeClass = {
    sm: "sm:max-w-sm",
    md: "sm:max-w-lg",
    lg: "sm:max-w-2xl",
    xl: "sm:max-w-[1000px]",
  }[options?.size ?? "md"];

  return (
    <DialogContext.Provider value={{ open, close }}>
      {children}

      {options?.type === 'alert' && (
        <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
          <AlertDialogContent className={sizeClass}>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {options?.title}
                </AlertDialogTitle>
              </AlertDialogHeader>

            <div className="py-2">{options?.content}</div>

            <AlertDialogFooter>
              {options?.cancelText && (
                <AlertDialogCancel
                  onClick={handleCancelDialog}
                >
                  {options?.cancelText ?? "Cancel"}
                </AlertDialogCancel>
              )}

              {options?.confirmText && (
                <AlertDialogAction
                  onClick={handleConfirmDialog}
                >
                  {options?.confirmText ?? "Confirm"}
                </AlertDialogAction>
              )}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      {options?.type === 'dialog' && (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
          <DialogContent className={sizeClass}>
            <DialogHeader>
              <DialogTitle>{options?.title}</DialogTitle>
            </DialogHeader>

            <div className="py-2">{options?.content}</div>

            {(options?.cancelText || options?.confirmText) && (
              <DialogFooter>
                {(options?.cancelText && options?.cancelText !== '') && (
                  <Button 
                    label={options?.cancelText}
                    onClick={handleCancelDialog}
                  />
                  
                )}
                {(options?.confirmText && options?.confirmText !== '') && (
                  <Button 
                    label={options?.confirmText}
                    onClick={handleConfirmDialog}
                  />
                )}
              </DialogFooter>
            )}

          </DialogContent>
        </Dialog>
      )}
      {options?.type === 'drawer' && (
        <Drawer open={isOpen} onOpenChange={onOpenChange} direction={options?.side ?? 'top'}>
          <DrawerContent 
            className='flex flex-col bg-[#EFF2F4]'
            style={{ padding: '16px 24px' }}
          >
            <DrawerHeader>
              {options?.title ? (
                <DrawerTitle>{options.title}</DrawerTitle>
              ) : (
                <VisuallyHidden>
                  <DrawerTitle>Drawer</DrawerTitle>
                </VisuallyHidden>
              )}
            </DrawerHeader>

            <div className="flex-1 pt-4">
              {options?.content}
            </div>

            {(options?.confirmText || options?.cancelText) && (
              <div className="border-t px-4 py-3 flex justify-end gap-2">
                {options?.cancelText && (
                  <Button onClick={handleCancelDialog}>
                    {options.cancelText}
                  </Button>
                )}
                {options?.confirmText && (
                  <Button onClick={handleConfirmDialog}>
                    {options.confirmText}
                  </Button>
                )}
              </div>
            )}

            <div className="flex justify-center mt-4!">
              <div className="h-2 w-40 rounded-full bg-[#2C3E50]" />
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </DialogContext.Provider>
  )
};
