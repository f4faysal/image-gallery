import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Checkbox } from "@material-tailwind/react";
import { Id, Images } from "../types";

interface ImageProps {
  image: Images;
  deleteImage: (id: Id) => void;
  selectedItems: number[];
  deleteSelectedItems: () => void;
  toggleItemSelection: (id: number) => void;
}

const ImageContainer = ({
  image,
  deleteImage,
  selectedItems,
  toggleItemSelection,
}: ImageProps) => {
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

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="
      bg-columnBackgroundColor
      opacity-40
      border-2
      border-pink-500
      rounded-md
      flex
      flex-col
      "
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative bg-white  col-span-1 row-span-1 rounded-md w-60 h-60 p-3 border shadow-lg group"
    >
      <div
        {...attributes}
        {...listeners}
        className={`h-full w-full rounded-md`}
      >
        <div className={`absolute z-10 hidden group-hover:block`}>
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
