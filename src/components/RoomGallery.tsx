import { useEffect, useState } from "react";
import type { EmblaCarouselType } from "embla-carousel";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

type RoomImage = {
  src: string;
  alt: string;
};

export function RoomGallery({ images }: { images: RoomImage[] }) {
  const [open, setOpen] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [api, setApi] = useState<EmblaCarouselType>();

  useEffect(() => {
    if (!api) return;
    const updateIndex = () => setSelectedIndex(api.selectedScrollSnap());
    updateIndex();
    api.on("select", updateIndex);
    return () => {
      api.off("select", updateIndex);
    };
  }, [api]);

  useEffect(() => {
    if (!open || !api) return;
    api.scrollTo(initialIndex, true);
    setSelectedIndex(initialIndex);
  }, [api, initialIndex, open]);

  function openAt(index: number) {
    setInitialIndex(index);
    setSelectedIndex(index);
    setOpen(true);
  }

  return (
    <>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {images.map((image, index) => (
          <Button
            key={image.src}
            type="button"
            variant="ghost"
            onClick={() => openAt(index)}
            className="h-auto overflow-hidden rounded-lg p-0 focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={`Ava suurelt: ${image.alt}`}
          >
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              className="aspect-square w-full object-cover transition-transform duration-200 hover:scale-[1.02] motion-reduce:transition-none"
            />
          </Button>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[calc(100vw-1rem)] max-w-5xl border-0 bg-background p-2 shadow-xl sm:rounded-xl sm:p-4 [&>button]:right-3 [&>button]:top-3 [&>button]:z-20 [&>button]:flex [&>button]:size-10 [&>button]:items-center [&>button]:justify-center [&>button]:rounded-full [&>button]:bg-background [&>button]:opacity-100 [&>button_svg]:size-5">
          <DialogTitle className="sr-only">Studio MindZi ruumide galerii</DialogTitle>
          <Carousel
            setApi={setApi}
            opts={{ loop: true, startIndex: initialIndex }}
            className="w-full"
          >
            <CarouselContent className="-ml-2">
              {images.map((image) => (
                <CarouselItem key={image.src} className="pl-2">
                  <div className="flex h-[min(78vh,760px)] items-center justify-center">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="max-h-full w-auto max-w-full select-none object-contain"
                      draggable={false}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 size-11 border-border bg-background shadow-md sm:left-4" />
            <CarouselNext className="right-2 size-11 border-border bg-background shadow-md sm:right-4" />
          </Carousel>
          <p className="text-center text-sm text-muted-foreground" aria-live="polite">
            {selectedIndex + 1} / {images.length}
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
}