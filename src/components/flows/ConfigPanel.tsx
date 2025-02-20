import React from "react";

export const ConfigPanel = () => {
  return (
    <div className="bg-[rgba(54,54,54,1)] grow text-[#010101] font-medium w-full pt-[11px] pb-0.5">
      <div className="flex w-full flex-col text-base px-[13px] max-md:pr-5">
        <h2 className="text-xl font-bold max-md:ml-0.5">cart_campaign</h2>

        <div className="flex items-stretch gap-[9px] mt-[27px]">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/ddf789af42b44eaea963851b07583965/0abd1e51eae8ced6f21674a24f5792480fc6e96d70d453f1568256f1f0d3bf71?placeholderIfAbsent=true"
            className="aspect-[1] object-contain w-3 shrink-0 my-auto"
            alt="Check icon"
          />
          <div>Last 2 commits scanned</div>
        </div>

        <div className="flex items-stretch gap-[9px] mt-2.5">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/ddf789af42b44eaea963851b07583965/0abd1e51eae8ced6f21674a24f5792480fc6e96d70d453f1568256f1f0d3bf71?placeholderIfAbsent=true"
            className="aspect-[1] object-contain w-3 shrink-0 my-auto"
            alt="Check icon"
          />
          <div>5 entry points identified</div>
        </div>

        <h3 className="mt-5 max-md:ml-0.5">Selected flow</h3>
        <div className="rounded border self-stretch flex items-stretch gap-5 justify-between mt-3 pt-[7px] pb-[13px] px-[17px] border-[rgba(217,217,217,1)] border-solid max-md:ml-0.5">
          <div>POST /carts/{"{carts_id}"}</div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/ddf789af42b44eaea963851b07583965/3a3e4d1f682208d35296b24a7b6bd5d27eba16a8b8d7bf9729fd842d9e6ac72e?placeholderIfAbsent=true"
            className="aspect-[1.22] object-contain w-[11px] shrink-0 mt-1.5 rounded-[1px]"
            alt="Dropdown arrow"
          />
        </div>

        <h3 className="mt-[23px] max-md:ml-0.5">Dependencies</h3>
        <p className="text-sm mt-2.5 max-md:ml-0.5">
          Select the ones you want to mock
        </p>

        <div className="flex flex-col gap-[21px] mt-[13px]">
          {[
            "httpx",
            "product_client",
            "sqlalchemy.orm",
            "cart_crud",
            "cartModel",
          ].map((dep, index) => (
            <div
              key={dep}
              className="flex items-stretch gap-3 text-[15px] whitespace-nowrap max-md:ml-[3px]"
            >
              <div
                className={`${index < 2 ? "bg-[rgba(0,159,249,1)]" : "border border-[rgba(100,100,100,1)]"} flex w-4 shrink-0 h-4 my-auto rounded-sm`}
              />
              <div>{dep}</div>
            </div>
          ))}
        </div>

        <h3 className="mt-10 max-md:ml-0.5">Databases</h3>
        <p className="text-sm mt-2.5 max-md:ml-0.5">
          Select if you want to mock databases
        </p>

        <div className="flex flex-col gap-[21px] mt-[15px]">
          <div className="flex items-stretch gap-3 text-[15px] max-md:ml-[3px]">
            <div className="border flex w-4 shrink-0 h-4 my-auto rounded-sm border-[rgba(100,100,100,1)]" />
            <div>I want to mock databases</div>
          </div>
          <div className="flex items-stretch gap-3 text-[15px] max-md:ml-[3px]">
            <div className="bg-[rgba(0,159,249,1)] flex w-4 shrink-0 h-4 my-auto rounded-sm" />
            <div>I don't want to mock database</div>
          </div>
        </div>

        <h3 className="mt-[30px] max-md:ml-0.5">Database Configurations</h3>

        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/ddf789af42b44eaea963851b07583965/b9ab62272cedfa6df783180cccae2c4acc5fe096877a3218e253b5af569701a4?placeholderIfAbsent=true"
          className="aspect-[6.54] object-contain w-full self-stretch mt-[27px] rounded-[0px_0px_0px_0px] max-md:ml-[3px] max-md:mr-1.5"
          alt="Database config"
        />

        <label className="text-sm font-normal z-10 ml-[26px] mt-4 max-md:ml-2.5">
          Database Password
          <div className="rounded border self-stretch flex w-full shrink-0 h-[42px] border-[rgba(255,173,98,1)] border-solid max-md:ml-[3px] max-md:mr-1.5" />
        </label>

        <label className="text-sm font-normal z-10 ml-[26px] mt-4 max-md:ml-2.5">
          Database Hostname
          <div className="rounded border self-stretch flex w-full shrink-0 h-[42px] border-[rgba(255,173,98,1)] border-solid max-md:ml-[3px] max-md:mr-1.5" />
        </label>
      </div>

      <div className="bg-[rgba(54,54,54,1)] z-10 flex flex-col text-sm whitespace-nowrap justify-center -mt-2.5 px-[76px] py-2.5 border-[rgba(89,88,88,1)] border-t max-md:pl-5">
        <button className="rounded bg-[rgba(0,159,249,1)] shadow-[0px_2px_4px_rgba(0,0,0,0.25)] px-[21px] py-3 max-md:px-5">
          Save
        </button>
      </div>
    </div>
  );
};
