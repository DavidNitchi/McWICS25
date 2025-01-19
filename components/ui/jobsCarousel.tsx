"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CarouselCard from "../carouselCard";

export default function JobsCarousel(props?: { data?: any }) {
  return (
    <Carousel className="w-3/4">
      <CarouselContent className="w-64 px-2">
        {Array.from({ length: 10 }).map((_, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-56 basis-40 ml-2">
            <div className="p-2 border shadow rounded-lg h-40 hover:underline">
              {props ? (
                <CarouselCard
                  title={props.data[index].title ?? ""}
                  description={props.data[index].description ?? ""}
                  link={props.data[index].link ?? "#"}
                />
              ) : (
                <CarouselCard />
              )}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

//md:basis-1/2 lg:basis-1/3
//-ml-1
