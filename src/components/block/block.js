import { useState } from "react";
import "./block.css";
export default function Block({ block, handleClick }) {
  const [src, setSrc] = useState(process.env.PUBLIC_URL + `/img/${block.img}`);

  let imgPath = process.env.PUBLIC_URL + `/img/${block.img}`;

  return (
    <div className="block">
      <a onClick={() => handleClick(block.order,block.id)}>
        <img className="block__img" src={imgPath} alt="" />
      </a>
    </div>
  );
}
