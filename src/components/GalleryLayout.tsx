import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { useMemo, useState } from "react";
import { defaultImages } from "../constant/global";
import { Id, Images } from "../types";
import ImageContainer from "./ImageContainer";

const GalleryLayout = () => {
  const [images, setImages] = useState<Images[]>(defaultImages);

  const imageId = useMemo(() => images.map((image) => image.id), [images]);

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
      <div className="m-auto grid grid-cols-3  md:grid-cols-5 gap-8 p-10">
        <DndContext>
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
