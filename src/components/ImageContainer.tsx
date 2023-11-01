import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={() => deleteImage(image.id)}
      className=" col-span-1 row-span-1 bg-white"
    >
      <div {...attributes} {...listeners} className="p-2">
        <img className=" w-52 h-52" src={image.image} alt={image.alt} />
      </div>
    </div>
  );
};

export default ImageContainer;
