import Image from "next/image";
import React from "react";

function InvalidLink() {
  return (
    <div>
      <Image
        alt="not-found"
        src={`https://http.cat/404`}
        width={200}
        height={200}
      />
    </div>
  );
}

export default InvalidLink;
