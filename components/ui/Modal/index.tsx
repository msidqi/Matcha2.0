import React from "react";

interface ModalProps {
  description: string;
  acceptText?: string;
  denyText?: string;
  title?: string;
  classNameButton?: string;
  buttonText?: string;
  onAccept: () => any;
  variant?: "primary" | "secondary";
  noButton?: boolean;
  doShowModal?: boolean;
}

const Modal = ({
  description,
  acceptText,
  denyText,
  classNameButton,
  buttonText,
  title,
  onAccept,
  variant = "primary",
  noButton,
  doShowModal,
}: ModalProps) => {
  const [showModal, setShowModal] = React.useState<boolean>(false);

  const onClickAccept = () => {
    onAccept();
    toggleModal();
  };
  const toggleModal = function () {
    !noButton && setShowModal(!showModal);
  };
  return (
    <div>
      {!noButton && (
        <button
          className={classNameButton} //"bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
          type="button"
          style={{ transition: "all .15s ease" }}
          onClick={toggleModal}
        >
          {buttonText || "Open"}
        </button>
      )}
      {(showModal || (noButton && doShowModal)) && (
        <>
          <div className="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
            <div className="relative w-auto my-6 mx-auto max-w-sm">
              {/* <!--content--> */}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/* <!--header--> */}
                {title && (
                  <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                    <h3 className="text-3xl font-semibold">{title}</h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={toggleModal}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                )}
                {/* <!--body--> */}
                <div className="relative p-4 pb-0 flex-auto">
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {description}
                  </p>
                </div>
                {/* <!--footer--> */}
                <div className="flex items-center justify-evenly p-4  rounded-b">
                  {denyText && (
                    <button
                      className="w-32 text-gray-500 bg-transparent border border-solid border-gray-500 hover:shadow-md font-bold uppercase text-sm px-8 py-3 rounded-xl outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      style={{ transition: "all .15s ease" }}
                      onClick={toggleModal}
                    >
                      {denyText || "Close"}
                    </button>
                  )}
                  <button
                    className={`w-32 text-white background-transparent ${
                      variant === "primary"
                        ? "bg-green-500 active:bg-green-600"
                        : "bg-red-500 active:bg-red-600"
                    }  rounded-xl font-bold hover:shadow-md uppercase px-8 py-3 text-sm outline-none focus:outline-none mr-1 mb-1`}
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={onClickAccept}
                  >
                    {acceptText || "Ok"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </div>
  );
};

export default Modal;
