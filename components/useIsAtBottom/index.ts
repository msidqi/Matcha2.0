import { useEffect, useState } from "react";
import { debounce } from "@/utils/debounce";

const useIsAtBottom = ({containerRef}: {containerRef?: React.RefObject<HTMLDivElement>}) => {
  const [isAtBottom, setIsAtBottom] = useState<boolean>(true);

  const scrollToBottom = (container: HTMLDivElement) => {
    container.scrollTop = container.scrollHeight;
  };

    /* -- scroll to bottom && set onscroll event -- */
    useEffect(() => {
      let _mount = true;
  
      if (containerRef?.current) {
        scrollToBottom(containerRef.current);
        containerRef.current.onscroll = debounce(() => {
          if (
            containerRef.current &&
            containerRef.current.scrollTop +
              containerRef.current.clientHeight ===
              containerRef.current.scrollHeight
          ) {
            _mount && setIsAtBottom(true);
          } else if (isAtBottom) {
            _mount && setIsAtBottom(false);
          }
        }, 100);
      }
  
      return () => {
        _mount = false;
      };
    }, [containerRef]);
  return {isAtBottom}
}

export default useIsAtBottom