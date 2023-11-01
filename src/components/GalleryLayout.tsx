/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useMemo, useState } from "react";

import { Button } from "@material-tailwind/react";
import { createPortal } from "react-dom";
import { defaultImages } from "../constant/global";
import ImageIcon from "../icons/ImageIcon";
import PlusIcon from "../icons/PlusIcon";
import TrashIcon from "../icons/TrashIcon";
import { Images } from "../types";
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

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 5,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      distance: 5,
    },
  });
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 5,
    },
  });
  // const sensors = useSensors(useSensor(PointerSensor));
  const sensors = useSensors(pointerSensor, touchSensor, mouseSensor);

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

  return (
    <div className="m-auto flex min-h-screen max-w-7xl items-center">
      <div className="m-auto border rounded-lg shadow w-full  md:w-[80%] h-full p-2 md:p-0 ">
        <div className="p-5 border-b shadow-sm flex items-center justify-between">
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-5 p:2 md:p-4">
          <DndContext
            sensors={sensors}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          >
            <SortableContext items={imageId}>
              {images.map((img, index) => {
                const isFirstImage = index === 0;

                return (
                  <ImageContainer
                    toggleItemSelection={toggleItemSelection}
                    deleteSelectedItems={deleteSelectedItems}
                    selectedItems={selectedItems}
                    key={img.id}
                    image={img}
                    isFirstImage={isFirstImage}
                  />
                );
              })}
              <div className=" lg:w-[180px] lg:h-[180px] border-2 border-dashed border-gray-400  rounded flex flex-col items-center justify-center gap-2">
                <ImageIcon className="w-10 h-10 text-gray-600" />
                <p className="flex gap-1 text-gray-500">
                  Add Image <PlusIcon />
                </p>
              </div>
            </SortableContext>

            {/* Active */}

            {createPortal(
              <DragOverlay>
                {activeImage && (
                  <ImageContainer
                    toggleItemSelection={toggleItemSelection}
                    deleteSelectedItems={deleteSelectedItems}
                    selectedItems={selectedItems}
                    image={activeImage}
                    isFirstImage={true}
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
