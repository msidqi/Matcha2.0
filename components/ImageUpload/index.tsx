import React from "react";
import ImagePreview from "./ImagePreview";
import { ImagePreviewProps } from "@/interfaces";
import {
  makeImageData,
  deleteImageData,
  fileIsImage,
} from "@/utils/makeImageData";

interface ImageUploadProps {
  setImagePreviews: React.Dispatch<React.SetStateAction<ImagePreviewProps[]>>;
  imagePreviews: ImagePreviewProps[];
  limit?: number;
}

const ImageUpload = ({
  limit = 0,
  imagePreviews = [],
  setImagePreviews,
}: ImageUploadProps): JSX.Element => {
  const [counter, setCounter] = React.useState(0);
  const [isEmpty, setIsEmpty] = React.useState(true);
  const [isDraggedover, setIsDraggedover] = React.useState(false);
  // const [imagePreviews, setImagePreviews] = React.useState<ImagePreviewProps[]>([])

  const handleImagePrevewDelete = (indexToDelete: number) => {
    const elem = imagePreviews[indexToDelete];
    if (elem) {
      deleteImageData(elem.objectURL);
      imagePreviews.splice(indexToDelete, 1);
      setImagePreviews([...imagePreviews]);
      imagePreviews.length === 0 && setIsEmpty(true);
    }
  };

  function addImages(images: FileList) {
    console.log(images);
    const allNewImages: ImagePreviewProps[] = [];
    let toAddCounter = 1;
    for (const key in images) {
      if (toAddCounter + imagePreviews.length > limit) {
        console.log(`cannot exceed limit of ${limit}`);
        break;
      }
      const isImage = fileIsImage(images[key]);
      if (isImage) {
        allNewImages.push(makeImageData(images[key]));
        toAddCounter++;
      }
    }
    if (allNewImages.length !== 0) {
      setImagePreviews([...imagePreviews, ...allNewImages]);
      setIsEmpty(false);
    }
  }

  const hiddenInputRef = React.createRef<HTMLInputElement>();
  const onButtonClick = () => {
    if (!limit) {
      hiddenInputRef.current && hiddenInputRef.current.click();
    } else if (imagePreviews.length < limit) {
      hiddenInputRef.current && hiddenInputRef.current.click();
    } else {
      console.log(`cannot exceed limit of ${limit}`);
    }
  };
  const onHiddenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files) addImages(e.target.files);
  };

  // reset counter and append file to gallery when file is dropped
  function dropHandler(e: React.DragEvent<HTMLElement>) {
    e.preventDefault();
    if (e.dataTransfer?.files) {
      addImages(e.dataTransfer.files);
      setIsDraggedover(false);
      setCounter(0);
    }
  }

  function dragEnterHandler() {
    // is being draged
    if (counter + 1 && !isDraggedover) setIsDraggedover(true);
    setCounter(counter + 1);
  }

  function dragLeaveHandler() {
    // only set isDraggedOver to false if  this is the last dragLeave event to activate (to avoid children leave events)
    counter - 1 < 1 && setIsDraggedover(false);
    setCounter(counter - 1);
  }

  function dragOverHandler(e: React.DragEvent<HTMLElement>) {
    !isDraggedover && setIsDraggedover(true);
    // disable browser display image aciton
    e.preventDefault();
  }

  // print all selected files
  /*const handleSubmit = () => {
    alert(`Submitted Files:\n${JSON.stringify(imagePreviews)}`);
  };

  // clear entire selection
  const clearSelection = () => {
    setImagePreviews([]);
    setIsEmpty(true);
  };*/

  return (
    // <div className="bg-gray-500 h-screen w-screen sm:px-8 md:px-16 sm:py-8">
    <main className="container mx-auto max-w-screen-lg h-full">
      {/* file upload modal */}
      <article
        aria-label="File Upload Modal"
        className="relative h-full flex flex-col bg-white rounded-none sm:rounded-md"
        onDrop={dropHandler}
        onDragOver={dragOverHandler}
        onDragLeave={dragLeaveHandler}
        onDragEnter={dragEnterHandler}
      >
        {/* overlay */}
        {isDraggedover && (
          <div
            id="overlay"
            className={`w-full h-full absolute top-0 left-0 pointer-events-none z-50 flex flex-col items-center justify-center rounded-md bg-gray-100 bg-opacity-50`}
          >
            <i>
              <svg
                className="fill-current w-12 h-12 mb-3 text-blue-700"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M19.479 10.092c-.212-3.951-3.473-7.092-7.479-7.092-4.005 0-7.267 3.141-7.479 7.092-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408zm-7.479-1.092l4 4h-3v4h-2v-4h-3l4-4z" />
              </svg>
            </i>
            <p className="text-lg text-blue-700">Drop images to upload</p>
          </div>
        )}

        {/* scroll area */}
        <section className="overflow-auto p-8 w-full h-full flex flex-col">
          <header className="border-dashed border-2 border-gray-400 py-12 sm:flex flex-col justify-center items-center hidden">
            <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
              <span>Drag and drop your</span>&nbsp;
              <span>images anywhere or</span>
            </p>
            <input
              id="hidden-input"
              onChange={onHiddenChange}
              ref={hiddenInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
            />
            <button
              id="button"
              onClick={onButtonClick}
              className="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
            >
              Upload an image
            </button>
          </header>

          <h1 className="sm:pt-8 pb-3 font-semibold sm:text-lg text-gray-900">
            To Upload
          </h1>

          <ul id="gallery" className="flex flex-1 flex-wrap -m-1">
            {imagePreviews.map(({ objectURL, ...elem }, index) => (
              <ImagePreview
                key={index}
                {...elem}
                src={objectURL}
                onClickDelete={() => handleImagePrevewDelete(index)}
              />
            ))}
            {imagePreviews.length < limit && (
              <li
                className="block p-1 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/8 h-24 sm:hidden"
                onClick={onButtonClick}
              >
                <article
                  tabIndex={0}
                  style={{ boxShadow: "inset 0 0 0 .5em #e4e4e4" }}
                  className="flex justify-center items-center group hasImage w-full h-full rounded-2xl focus:outline-none focus:shadow-outline  cursor-pointer relative text-transparent hover:text-white hover:shadow-sm "
                >
                  <img
                    alt="upload preview"
                    src="/add.svg"
                    className="h-1/2 object-cover"
                  />
                </article>
              </li>
            )}
            <li
              id="empty"
              className={`h-full w-full text-center flex flex-col justify-center items-center ${
                !isEmpty && "hidden"
              }`}
            >
              <img
                className="mx-auto w-32"
                src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
                alt="no data"
              />
              <span className="text-small text-gray-500">
                No images selected
              </span>
            </li>
          </ul>
        </section>

        {/* sticky footer */}
        {/* <footer className="flex justify-end px-8 pb-8 pt-4">
                    <button id="submit" onClick={handleSubmit} className="rounded-sm px-3 py-1 bg-blue-700 hover:bg-blue-500 text-white focus:shadow-outline focus:outline-none">
                        Upload now
                            </button>
                    <button id="cancel" onClick={clearSelection} className="ml-3 rounded-sm px-3 py-1 hover:bg-gray-300 focus:shadow-outline focus:outline-none">
                        Cancel
                            </button>
                </footer> */}
      </article>
    </main>
    // </div>
  );
};

export default ImageUpload;
