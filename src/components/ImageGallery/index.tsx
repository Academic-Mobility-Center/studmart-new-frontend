import "./style.css";

function ImageGallery() {
  return (
    <div className="image-container-flex-row">
      <img src="/icons/image-gallery/layout.svg" alt="" className="image-container" />
      <img src="/icons/image-gallery/girl.svg"  className="image-container-with-blend-mode" />
    </div>
  );
}

export default ImageGallery;
