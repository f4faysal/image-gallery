import { useSortable } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";

import { Checkbox } from "@material-tailwind/react";
import { Images } from "../types";

interface ImageProps {
  image: Images;
  selectedItems: number[];
  deleteSelectedItems: () => void;
  toggleItemSelection: (id: number) => void;
  isFirstImage?: boolean;
}

const ImageContainer = ({
  image,
  selectedItems,
  toggleItemSelection,
  isFirstImage,
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

  // const style = transform
  //   ? {
  //       transition,
  //       transform: CSS.Transform.toString(transform),
  //       opacity: isDragging ? 0.5 : 1,
  //     }
  //   : undefined;

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition,
      }
    : undefined;

  const containerClasses = isFirstImage
    ? `
    relative col-span-2 row-span-2 rounded-md  border shadow-lg group

  `
    : "relative col-span-1 row-span-1 rounded-md border shadow-lg group";

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className={` bg-columnBackgroundColor opacity-40 border-2 border-pink-500 rounded-md ${containerClasses} `}
      ></div>
    );
  }

  return (
    <div ref={setNodeRef} style={style} className={containerClasses}>
      <div
        {...attributes}
        {...listeners}
        className={`h-full w-full rounded-md overflow-hidden bg-white`}
      >
        <div
          className={`absolute z-10 ${
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
