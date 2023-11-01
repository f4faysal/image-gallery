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

import { Button } from "@material-tailwind/react";
import { createPortal } from "react-dom";
import { defaultImages } from "../constant/global";
import TrashIcon from "../icons/TrashIcon";
import { Id, Images } from "../types";
import ImageContainer from "./ImageContainer";

const GalleryLayout = () => {
  const [images, setImages] = useState<Images[]>(defaultImages);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
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

  const toggleItemSelection = (itemId: number) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const deleteSelectedItems = () => {
    setImages(images.filter((item) => !selectedItems.includes(item.id)));
    setSelectedItems([]);
  };
  console.log(selectedItems);

  return (
    <div
      className="
    m-auto
    flex
    min-h-screen
    w-full
    items-center
    px-[40px]"
    >
      <div className="m-auto border rounded-lg shadow">
        <div className="p-5  border-b shadow-sm flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            {selectedItems.length === 0 && "Gallery"}&nbsp;
            <span className=" text-red-500">
              {selectedItems.length > 0 &&
                `Selected Delete ${selectedItems.length}`}
            </span>
          </h1>
          {selectedItems.length > 0 && (
            <Button size="sm" color="red" onClick={deleteSelectedItems}>
              <TrashIcon />
            </Button>
          )}
        </div>

        <div
          className="
      
      grid 
      grid-cols-2 
      md:grid-cols-3  
      lg:grid-cols-5 gap-8 p-10"
        >
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
                    toggleItemSelection={toggleItemSelection}
                    deleteSelectedItems={deleteSelectedItems}
                    selectedItems={selectedItems}
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
                  <ImageContainer
                    toggleItemSelection={toggleItemSelection}
                    deleteSelectedItems={deleteSelectedItems}
                    selectedItems={selectedItems}
                    deleteImage={deleteImage}
                    image={activeImage}
                  />
                )}
              </DragOverlay>,
              document.body
            )}
          </DndContext>
        </div>
      </div>
    </div>
  );
};

export default GalleryLayout;
