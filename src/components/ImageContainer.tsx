import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Checkbox } from "@material-tailwind/react";
import { Id, Images } from "../types";

interface ImageProps {
  image: Images;
  deleteImage: (id: Id) => void;
}

const ImageContainer = ({ image, deleteImage }: ImageProps) => {
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
      className="relative z-10 col-span-1 row-span-1 bg-white hover:bg-white/75 rounded-md w-60 h-60 p-3"
    >
      <div {...attributes} {...listeners} className=" h-full w-full">
        <div className="absolute ">
          <Checkbox onClick={() => deleteImage(image.id)} />
        </div>
        <div>
          <img className="z-10 " src={image.image} alt={image.alt} />
        </div>
      </div>
    </div>
  );
};

export default ImageContainer;
