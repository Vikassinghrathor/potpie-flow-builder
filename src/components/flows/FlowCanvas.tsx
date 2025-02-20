import React from "react";
import { CodeBlock } from "./CodeBlock";

export const FlowCanvas = () => {
  return (
    <div className="bg-[rgba(20,26,32,1)] flex w-full flex-col items-stretch mx-auto max-md:max-w-full">
      <div className="z-10 mt-[-50px] w-[400px] max-w-full mr-[42px] max-md:mr-2.5">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
          <div className="w-[35%] max-md:w-full max-md:ml-0">
            <img
              loading="lazy"
              srcSet="https://cdn.builder.io/api/v1/image/assets/ddf789af42b44eaea963851b07583965/6865fbf453d8555b9f197596f9f123b6b5d49536ef851bd7fcb8f968353b3c7e?placeholderIfAbsent=true&width=100 100w, https://cdn.builder.io/api/v1/image/assets/ddf789af42b44eaea963851b07583965/6865fbf453d8555b9f197596f9f123b6b5d49536ef851bd7fcb8f968353b3c7e?placeholderIfAbsent=true&width=200 200w"
              className="aspect-[0.4] object-contain w-[141px] shrink-0 max-w-full self-stretch my-auto max-md:mt-10"
              alt="Flow connection"
            />
          </div>
          <div className="w-[65%] ml-5 max-md:w-full max-md:ml-0">
            <div className="grow text-[#010101]">
              <CodeBlock
                title="check_inventory"
                dependencies={["httpx"]}
                params={["product_id", "quantity"]}
                responseObject="bool"
              />

              <CodeBlock
                title="cart_crud.py"
                dependencies={["sqlalchemy"]}
                params={["product_id", "quantity"]}
                responseObject="None"
                className="mt-[34px]"
              />

              <CodeBlock
                title="product_client.py"
                dependencies={["sqlalchemy"]}
                params={["cart_id", "product_id", "db", "quantity"]}
                responseObject="CartItem"
                className="mt-[34px]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[rgba(54,54,54,1)] border z-10 flex mt-[-37px] items-stretch gap-1 text-base text-[#010101] font-medium flex-wrap px-[11px] py-[9px] border-[rgba(89,88,88,1)] border-solid">
        <div>cart</div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/ddf789af42b44eaea963851b07583965/9f46b071f0d21d184b07d0ea679e406b8470bc40aba96925de8dabd3fa31bfea?placeholderIfAbsent=true"
          className="aspect-[0.89] object-contain w-2 shrink-0 my-auto"
          alt="Separator"
        />
        <div className="grow shrink w-[105px]">cart_routes.py</div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/ddf789af42b44eaea963851b07583965/9f46b071f0d21d184b07d0ea679e406b8470bc40aba96925de8dabd3fa31bfea?placeholderIfAbsent=true"
          className="aspect-[0.89] object-contain w-2 shrink-0 my-auto"
          alt="Separator"
        />
        <div className="grow shrink w-[877px] max-md:max-w-full">
          POST /carts/{"{cart_id}"}
        </div>
      </div>
    </div>
  );
};
