import { defaultImage } from "../constant/global";

const GalleryLayout = () => {
  return (
    <div>
      <h1>GalleryLayout</h1>

      {defaultImage.map((item) => {
        return (
          <div key={item.id}>
            <img src={item.image} alt={item.alt} />
            <p>{item.alt}</p>
          </div>
        );
      })}
    </div>
  );
};

export default GalleryLayout;
