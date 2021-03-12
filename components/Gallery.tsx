import { FormEvent, useRef, useState } from "react";
import { prop } from "./ActualIndex";
import styles from "./Gallery.module.css";

type ImageProps = {
  images: prop["data"]["images"];
};

const Gallery = ({ images }: ImageProps) => {
  const photosInput = useRef<HTMLInputElement>(null);
  const [photoName, setPhotoName] = useState("");

  const submitImage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const currentPhotosInput = photosInput.current;
    if (currentPhotosInput?.files?.length) {
      const formData = new FormData();
      formData.append("photos", currentPhotosInput.files[0]);
      setPhotoName("Bildet vises når det blir godkjent:)");
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      })
        .then()
        .catch((error) => {
          setPhotoName("");
          console.error(error);
        });
      currentPhotosInput.value = "";
    } else {
      setPhotoName("");
    }
  };
  return (
    <div>
      <form onSubmit={submitImage} className={styles.imageForm}>
        <label htmlFor="photos">
          {photoName ? (
            <div>{photoName}</div>
          ) : (
            <img src="upload_file.svg" alt="" />
          )}
        </label>

        <input type="submit" value="LAST OPP BILDE" />
        <input
          type="file"
          name="photos"
          ref={photosInput}
          multiple={false}
          onChange={(e) => {
            setPhotoName(e.target.value);
          }}
        />
      </form>
      <div className={styles.container}>
        {images.map((image) => {
          images;
          return <img src={image.url} key={image.url} />;
        })}
      </div>
    </div>
  );
};
export default Gallery;
