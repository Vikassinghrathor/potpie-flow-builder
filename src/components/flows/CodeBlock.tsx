import React from "react";

interface CodeBlockProps {
  title: string;
  dependencies?: string[];
  params?: string[];
  responseObject?: string;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  title,
  dependencies = [],
  params = [],
  responseObject,
  className = "",
}) => {
  return (
    <div
      className={`rounded bg-[rgba(24,30,37,1)] border text-[#010101] pb-[17px] border-[rgba(255,173,98,1)] border-solid ${className}`}
    >
      <div className="border text-sm font-medium whitespace-nowrap px-[9px] py-1.5 rounded-[4px_4px_0px_0px] border-[rgba(255,173,98,1)] border-solid">
        {title}
      </div>
      <div className="flex flex-col text-[10px] font-normal mt-[15px] pl-[9px] pr-[26px]">
        <div className="text-sm font-medium">{title.split(".")[0]}</div>
        {dependencies.length > 0 && (
          <div className="mt-1.5">
            <span className="text-[rgba(255,173,98,1)]">"DependentLibs"</span> :{" "}
            {JSON.stringify(dependencies)}
          </div>
        )}
        {params.length > 0 && (
          <div className="mt-1.5">
            <span className="text-[rgba(255,173,98,1)]">"Params"</span> :{" "}
            {JSON.stringify(params)}
          </div>
        )}
        {responseObject && (
          <div className="mt-[5px]">
            <span className="text-[rgba(255,173,98,1)]">"ResponseObject"</span>{" "}
            : {JSON.stringify(responseObject)}
          </div>
        )}
      </div>
    </div>
  );
};
