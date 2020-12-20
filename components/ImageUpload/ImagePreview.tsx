
export interface ImagePreviewProps {
    src: string;
    title?: string;
    onClickDelete: () => void;
    size?: string;
};
const ImagePreview = ({ onClickDelete, title, size, src }: ImagePreviewProps) => {
    return (
        <>
            {/*id="image-template"*/}
            {/* <template > */}
            <li className="block p-1 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/8 h-24">
                {/* <li className="block p-1 w-1/3 max-h-24 h-24"> */}
                <article tabIndex={0} className="group hasImage w-full h-full rounded-lg focus:outline-none focus:shadow-outline bg-gray-100 cursor-pointer relative text-transparent hover:text-white hover:shadow-sm ">
                    <img alt="upload preview" src={src} className="img-preview w-full h-full sticky object-cover rounded-lg bg-fixed" />

                    <section className="flex flex-col rounded-md text-xs break-words w-full h-full z-20 absolute top-0 py-2 px-3">
                        {/* <h1 className="flex-1">{title}</h1> */}
                        <div className="flex">
                            <span className="p-1">
                                <i>
                                    <svg className="fill-current w-4 h-4 ml-auto pt-" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M5 8.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5zm9 .5l-2.519 4-2.481-1.96-4 5.96h14l-5-8zm8-4v14h-20v-14h20zm2-2h-24v18h24v-18z" />
                                    </svg>
                                </i>
                            </span>

                            <p className="p-1 size text-xs">{size}</p>
                            <button className="delete ml-auto focus:outline-none hover:bg-gray-300 p-1 rounded-md" onClick={onClickDelete}>
                                <svg className="pointer-events-none fill-current w-4 h-4 ml-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path className="pointer-events-none" d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z" />
                                </svg>
                            </button>
                        </div>
                        <button onClick={onClickDelete} className="absolute bottom-0 right-0">
                            <svg onClick={onClickDelete} className="pointer-events-none fill-current w-6 h-6 ml-auto" width="34" height="33" viewBox="0 0 34 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="17.0166" cy="16.1963" r="16.1833" fill="#F64264" />
                                <rect width="2.6589" height="18.6123" rx="1.32945" transform="matrix(0.709716 0.704488 -0.709716 0.704488 22.6832 8.75336)" fill="#F8F8F8" />
                                <rect width="2.65878" height="18.6114" rx="1.32939" transform="matrix(0.709228 -0.704979 0.709228 0.704979 9.46448 10.5186)" fill="#F8F8F8" />
                            </svg>
                        </button>
                    </section>
                </article>
            </li>
            <style jsx>{`
                .hasImage:hover section {
                    background - color: rgba(5, 5, 5, 0.4);
                }
                .hasImage:hover button:hover {
                                background: rgba(5, 5, 5, 0.45);
                }

                #overlay p,
                i {
                                opacity: 0;
                }

                #overlay.draggedover {
                                background - color: rgba(255, 255, 255, 0.7);
                }
                #overlay.draggedover p,
                #overlay.draggedover i {
                                opacity: 1;
                }

                .group:hover .group-hover\:text-blue-800 {
                                color: #2b6cb0;
                }
        `}
            </style>
        </>
    )
}

export default ImagePreview;
