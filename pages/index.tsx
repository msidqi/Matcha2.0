import Layout from "@/components/ui/Layout";
import Carousel from "@/modules/Carousel/components/Carousel";
import ArrowNext from "@/components/ui/Icons/ArrowNext";
import ArrowPrev from "@/components/ui/Icons/ArrowPrev";

const index = (): JSX.Element => {
  return (
    <Layout>
      <Carousel
        containerClassName="h-44 bg-red-50 w-96"
        prevArrow={
          <button className="cursor-pointer">
            <ArrowPrev />
          </button>
        }
        nextArrow={
          <button className="cursor-pointer">
            <ArrowNext />
          </button>
        }
        items={[<div>hello</div>, <div>world</div>, <div>test</div>]}
      />
    </Layout>
  );
};

export default index;
