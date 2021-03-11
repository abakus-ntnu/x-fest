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
      setPhotoName(
        "Ferdig! Bildet vises når det blir godkjent:). Trykk for å laste opp flere bilder."
      );
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      })
        .then()
        .catch((error) => {
          setPhotoName("Opplastning feilet. Prøv en annen fil.");
          console.error(error);
        });
      currentPhotosInput.value = "";
    } else {
      setPhotoName("Trykk her for å velge fil først.");
    }
  };
  return (
    <div className={styles.container}>
      <form onSubmit={submitImage} className={styles.imageForm}>
        <label>
          {photoName ? photoName : "Slipp et bilde her eller trykk på meg!"}
        </label>
        <input
          type="file"
          name="photos"
          ref={photosInput}
          multiple={false}
          onChange={(e) => {
            setPhotoName(e.target.value);
          }}
        />
        <input type="submit" value="Last opp bilde" />
      </form>
      {images.reverse().map((image) => {
        return <img src={image.url} key={image.url} />;
      })}
    </div>
  );
};
export default Gallery;
