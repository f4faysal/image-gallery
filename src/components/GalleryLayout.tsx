/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useMemo, useState } from "react";

import { createPortal } from "react-dom";
import { defaultImages } from "../constant/global";
import { Id, Images } from "../types";
import ImageContainer from "./ImageContainer";

const GalleryLayout = () => {
  const [images, setImages] = useState<Images[]>(defaultImages);
  const [activeImage, setActiveImage] = useState<Images | null>(null);

  const imageId = useMemo(() => images.map((image) => image.id), [images]);

  function onDragEnd(event: DragEndEvent) {
    // setActiveImage(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    // const isActiveAImage = active.data.current?.type === "Image";
    // if (!isActiveAImage) return;

    setImages((images) => {
      const activeImgumnIndex = images.findIndex((img) => img.id === activeId);

      const overImgumnIndex = images.findIndex((img) => img.id === overId);

      return arrayMove(images, activeImgumnIndex, overImgumnIndex);
    });
  }

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Images") {
      setActiveImage(event.active.data.current?.image);
      return;
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  function deleteImage(id: Id) {
    // const newImages = images.filter((image) => image.id !== id);
    // setImages(newImages);

    console.log(id);
  }

  return (
    <div
      className="  m-auto
    flex
    min-h-screen
    w-full
    items-center
    px-[40px]"
    >
      <div className="m-auto grid grid-cols-2  md:grid-cols-5 gap-8 p-10">
        <DndContext
          sensors={sensors}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          // onDragOver={onDragOver}
        >
          <SortableContext items={imageId}>
            {/* <div className="border col-span-2  row-span-2">
              <h1 className="text-2xl ">image 1</h1>
            </div> */}

            {images.map((img) => {
              return (
                <ImageContainer
                  key={img.id}
                  deleteImage={deleteImage}
                  image={img}
                />
              );
            })}
          </SortableContext>

          {/* Active */}

          {createPortal(
            <DragOverlay>
              {activeImage && (
                <ImageContainer deleteImage={deleteImage} image={activeImage} />
              )}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      </div>

      {/* {defaultImage.map((item) => {
        return (
          <div key={item.id}>
            <img src={item.image} alt={item.alt} />
            <p>{item.alt}</p>
          </div>
        );
      })} */}
    </div>
  );
};

export default GalleryLayout;
