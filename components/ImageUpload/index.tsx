import React from 'react'
import ImagePreview from './imagePreview'

type ImagePreviewProps = {
    title: string;
    id: string;
    src: string;
    objectURL: string;
    size: string;
}

const ImageUpload = () => {
    const [FILES, setFILES] = React.useState({})
    // const [counter, setCounter] = React.useState(0)
    const [showDropFileAction, setDropFileAction] = React.useState(false)
    const [isEmpty, setIsEmpty] = React.useState(false)
    const [isDraggedover, setIsDraggedover] = React.useState(false)
    const [imagePreviews, setImagePreviews] = React.useState<ImagePreviewProps[]>([])

    const fileTemplRef = React.createRef()
    const imageTemplRef = React.createRef()
    const emptyRef = React.createRef()
    const fileTempl = fileTemplRef.current,//document.getElementById("file-template"),
        imageTempl = imageTemplRef.current,//document.getElementById("image-template"),
        empty = emptyRef.current;//document.getElementById("empty");

    const handleImagePrevewDelete = (indexToDelete: number) => {
        const elem = imagePreviews[indexToDelete]
        console.log(elem)
        if (elem) {
            URL.revokeObjectURL(elem.objectURL)
            setImagePreviews(imagePreviews.filter((_, i) => i !== indexToDelete))
        }
    }
    // check if file is of type image and prepend the initialied
    // template to the target element
    function addFile(target, file) {
        const isImage = file.type.match("image.*"),
            objectURL = URL.createObjectURL(file);
        if (!isImage) console.error('not an image')
        console.log('objectURL', objectURL)

        // const clone = imageTempl.content.cloneNode(true);
        const cloneProps: ImagePreviewProps = {
            title: file.name,
            id: objectURL,
            objectURL: objectURL,
            src: objectURL,
            size: file.size > 1024
                ? file.size > 1048576
                    ? Math.round(file.size / 1048576) + "mb"
                    : Math.round(file.size / 1024) + "kb"
                : file.size + "b"
        }
        // clone.querySelector("h1").textContent = file.name;
        // clone.querySelector("li").id = objectURL;
        // clone.querySelector(".delete").dataset.target = objectURL;
        // clone.querySelector(".size").textContent =
        // file.size > 1024
        //     ? file.size > 1048576
        //         ? Math.round(file.size / 1048576) + "mb"
        //         : Math.round(file.size / 1024) + "kb"
        //     : file.size + "b";

        if (isImage) {
            console.log('render preview with props =>', cloneProps)
        }
        // isImage &&
        //     Object.assign(clone.querySelector("img"), {
        //         src: objectURL,
        //         alt: file.name
        //     });

        // empty.classList.add("hidden");
        setIsEmpty(true)
        // target.prepend(clone);
        setImagePreviews([...imagePreviews, cloneProps])

        setFILES({ ...FILES, objectURL: file })
    }
    console.log('FILES', FILES)
    const galleryRef = React.createRef()
    const overlayRef = React.createRef()
    const gallery = galleryRef.current, //document.getElementById("gallery"),
        overlay = overlayRef.current;//document.getElementById("overlay");

    const hiddenRef = React.createRef()
    // click the hidden input of type file if the visible button is clicked
    // and capture the selected files
    // const hidden = document.getElementById("hidden-input");
    const onButtonClick = () => hiddenRef.current.click();
    const onHiddenChange = (e) => {
        for (const file of e.target.files) {
            addFile(gallery, file);
        }
    };

    // use to check if a file is being dragged
    // const hasFiles = ({ dataTransfer: { types = [] } }) =>
    //     types.indexOf("Files") > -1;
    const hasFiles = () => imagePreviews.length > 0;



    // reset counter and append file to gallery when file is dropped
    function dropHandler(ev) {
        ev.preventDefault();
        for (const file of ev.dataTransfer.files) {
            addFile(gallery, file);
            // setIsDraggedover(false)
            // setCounter(0);
        }
    }

    // only react to actual files being dragged
    function dragEnterHandler(e) {
        e.preventDefault();
        if (!hasFiles(e)) {
            return;
        }
        console.log('hasFiles', imagePreviews.length > 0)
        // setCounter((prevCounter) => prevCounter + 1);
        // if (counter + 1)
        //     setIsDraggedover(true)
    }

    function dragLeaveHandler(e) {
        // setCounter((prevCounter) => prevCounter - 1)
        // if (1 > counter - 1)
        //     setIsDraggedover(false)
        // console.log('counter', counter)
    }

    function dragOverHandler(e) {
        // if (hasFiles(e)) {
        e.preventDefault();
        // }
    }

    // event delegation to caputre delete events
    // fron the waste buckets in the file preview cards
    const onGalleryClick = ({ target }) => {
        // if (target.classList.contains("delete")) {
        //     const ou = target.dataset.target;
        //     document.getElementById(ou).remove(ou);
        //     gallery.children.length === 1 && setIsEmpty(false)//empty.classList.remove("hidden");
        //     delete FILES[ou];
        //     setFILES({ ...FILES })
        // }
    };

    // print all selected files
    const handleSubmit = () => {
        alert(`Submitted Files:\n${JSON.stringify(FILES)}`);
        console.log(FILES);
    };

    // clear entire selection
    const clearSelection = () => {
        // while (gallery.children.length > 0) {
        //     gallery.lastChild.remove();
        // }
        // setFILES({})
        setImagePreviews([])
        // empty.classList.remove("hidden");
        setIsEmpty(false)
        // gallery.append(empty);
    };

    return (
        <>
            <div className="bg-gray-500 h-screen w-screen sm:px-8 md:px-16 sm:py-8">
                <main className="container mx-auto max-w-screen-lg h-full">
                    {/* file upload modal */}
                    <article aria-label="File Upload Modal" className="relative h-full flex flex-col bg-white shadow-xl rounded-none sm:rounded-md" onDrop={dropHandler} onDragOver={dragOverHandler} onDragLeave={dragLeaveHandler} onDragEnter={dragEnterHandler}>
                        {/* overlay */}
                        <div id="overlay" ref={overlayRef} className={`w-full h-full absolute top-0 left-0 pointer-events-none z-50 flex flex-col items-center justify-center rounded-md ${isDraggedover && ' bg-gray-100 bg-opacity-50'}`}>
                            <i>
                                <svg className="fill-current w-12 h-12 mb-3 text-blue-700" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M19.479 10.092c-.212-3.951-3.473-7.092-7.479-7.092-4.005 0-7.267 3.141-7.479 7.092-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408zm-7.479-1.092l4 4h-3v4h-2v-4h-3l4-4z" />
                                </svg>
                            </i>
                            <p className="text-lg text-blue-700">Drop files to upload</p>
                        </div>

                        {/* scroll area */}
                        <section className="overflow-auto p-8 w-full h-full flex flex-col">
                            <header className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
                                <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
                                    <span>Drag and drop your</span>&nbsp;<span>files anywhere or</span>
                                </p>
                                <input id="hidden-input" onChange={onHiddenChange} ref={hiddenRef} type="file" multiple className="hidden" />
                                <button id="button" onClick={onButtonClick} className="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none">
                                    Upload a file
                                </button>
                            </header>

                            <h1 className="pt-8 pb-3 font-semibold sm:text-lg text-gray-900">
                                To Upload
                            </h1>

                            <ul id="gallery" onClick={onGalleryClick} className="flex flex-1 flex-wrap -m-1">
                                {imagePreviews.map((elem, index) => (
                                    <ImagePreview key={index} {...elem} onClickDelete={() => handleImagePrevewDelete(index)} />
                                ))}
                                <li id="empty" className={`h-full w-full text-center flex flex-col justify-center items-center ${isEmpty && 'hidden'}`}>
                                    <img className="mx-auto w-32" src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png" alt="no data" />
                                    <span className="text-small text-gray-500">No files selected</span>
                                </li>
                            </ul>
                        </section>

                        {/* sticky footer */}
                        <footer className="flex justify-end px-8 pb-8 pt-4">
                            <button id="submit" onClick={handleSubmit} className="rounded-sm px-3 py-1 bg-blue-700 hover:bg-blue-500 text-white focus:shadow-outline focus:outline-none">
                                Upload now
                            </button>
                            <button id="cancel" onClick={clearSelection} className="ml-3 rounded-sm px-3 py-1 hover:bg-gray-300 focus:shadow-outline focus:outline-none">
                                Cancel
                            </button>
                        </footer>
                    </article>
                </main>
            </div>
            {/* <template id="image-template" ref={imageTemplRef}>
                <li className="block p-1 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/8 h-24">
                    <article tabIndex={0} className="group hasImage w-full h-full rounded-md focus:outline-none focus:shadow-outline bg-gray-100 cursor-pointer relative text-transparent hover:text-white shadow-sm">
                        <img alt="upload preview" className="img-preview w-full h-full sticky object-cover rounded-md bg-fixed" />

                        <section className="flex flex-col rounded-md text-xs break-words w-full h-full z-20 absolute top-0 py-2 px-3">
                            <h1 className="flex-1"></h1>
                            <div className="flex">
                                <span className="p-1">
                                    <i>
                                        <svg className="fill-current w-4 h-4 ml-auto pt-" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                            <path d="M5 8.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5zm9 .5l-2.519 4-2.481-1.96-4 5.96h14l-5-8zm8-4v14h-20v-14h20zm2-2h-24v18h24v-18z" />
                                        </svg>
                                    </i>
                                </span>

                                <p className="p-1 size text-xs"></p>
                                <button className="delete ml-auto focus:outline-none hover:bg-gray-300 p-1 rounded-md">
                                    <svg className="pointer-events-none fill-current w-4 h-4 ml-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path className="pointer-events-none" d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z" />
                                    </svg>
                                </button>
                            </div>
                        </section>
                    </article>
                </li>
            </template> */}
        </>
    )
}

export default ImageUpload


//         <style>
//             .hasImage:hover section {
//                 background - color: rgba(5, 5, 5, 0.4);
// }
// .hasImage:hover button:hover {
//                 background: rgba(5, 5, 5, 0.45);
// }

// #overlay p,
// i {
//                 opacity: 0;
// }

// #overlay.draggedover {
//                 background - color: rgba(255, 255, 255, 0.7);
// }
// #overlay.draggedover p,
// #overlay.draggedover i {
//                 opacity: 1;
// }

// .group:hover .group-hover\:text-blue-800 {
//                 color: #2b6cb0;
// }
// </style>