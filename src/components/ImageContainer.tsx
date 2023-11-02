import { useSortable } from "@dnd-kit/sortable";
import { Checkbox } from "@material-tailwind/react";

import { Images } from "../types";

interface ImageProps {
  image: Images;
  selectedItems: number[];
  deleteSelectedItems: () => void;
  toggleItemSelection: (id: number) => void;
}

const ImageContainer = ({
  image,
  selectedItems,
  toggleItemSelection,
}: ImageProps) => {
  // useSortable is a hook that allows you to create a sortable element.
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: image.id,
    data: {
      type: "Images",
      image,
    },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition,
      }
    : undefined;

  // isDragging is a boolean that indicates whether the item is currently being dragged.
  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className={`w-[180px] h-[180px] opacity-40 border-2 rounded-md bg-gray-400`}
      ></div>
    );
  }

  return (
    <div
      {...attributes}
      ref={setNodeRef}
      style={style}
      className="bg-white shadow-lg z-30"
    >
      <div
        {...listeners}
        className={`h-full w-full rounded-md overflow-hidden bg-white`}
      >
        <div
          className={`absolute z-50 ${
            selectedItems.includes(image.id) ? "block" : "hidden"
          } group-hover:block`}
        >
          <Checkbox
            color="red"
            checked={selectedItems.includes(image.id)}
            onChange={() => toggleItemSelection(image.id)}
          />
        </div>
        <div>
          <img
            className="group-hover:opacity-25 transform transition-all duration-500 rounded hover:scale-105"
            src={image.image}
            alt={image.alt}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageContainer;
