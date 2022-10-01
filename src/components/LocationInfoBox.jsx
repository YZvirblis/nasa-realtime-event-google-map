import React from "react";

function LocationInfoBox({ info }) {
  return (
    <div className="max-w-sm h-full top-0 right-0 absolute bg-black text-white flex justify-center align-text-bottom mx-auto px-10 flex-col bg-opacity-50">
      <h1 className="text-4xl font-bold border-b4 border-gray-500 inline">
        Event info:
      </h1>
      <ul>
        <li className="my-3">
          ID: <strong>{info.id}</strong>
        </li>
        <li className="my-3">
          TITLE: <strong>{info.title}</strong>
        </li>
        {/* <li className="my-3">
          SOURCE:{" "}
          <strong>
            <a target={"_blank"} href={info.source} className="underline">
              {info.source}
            </a>
          </strong>
        </li> */}
      </ul>
    </div>
  );
}

export default LocationInfoBox;
