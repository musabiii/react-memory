import "./grid.css";
import Block from "../block";
import { useState } from "react";

export default function Grid(props) {
  let dataInit = [];
  for (let i = 0; i < 16; i++) {
    let currentObj = {
      order: Math.random(),
      img: "back.png",
      id: (i % 8) + 1,
    };
    dataInit.push(currentObj);
  }

  const sortData = (arr) => {
    return arr.sort((a, b) => {
      if (a.order > b.order) {
        return 1;
      } else {
        return -1;
      }
    });
  };

  //state
  const dataInitSorted = sortData(dataInit);
  const [data, setData] = useState(dataInitSorted);
  const [openedBlock, setOpenedBlock] = useState(0);
  const [openedBlocks, setOpenedBlocks] = useState([]);

  //functions

  const showBlock = (order) => {
    const index = data.findIndex((el) => el.order === order);
    const old = data[index];
    setData((prev) => {
      const before = prev.slice(0, index);
      const after = prev.slice(index + 1);

      const newObj = {
        order: old.order,
        id: old.id,
        img: `img${old.id}.jpg`,
      };

      return [...before, newObj, ...after];
    });
  };

  const closeBlock = (order) => {
    const index = data.findIndex((el) => el.order === order);
    const old = data[index];
    setData((prev) => {
      const before = prev.slice(0, index);
      const after = prev.slice(index + 1);

      const newObj = {
        order: old.order,
        id: old.id,
        img: `back.png`,
      };

      return [...before, newObj, ...after];
    });
  };

  const handleClick = (order, id) => {

    if( openedBlocks.indexOf(id)>=0) {

      return;
    }

    showBlock(order);

    let idOpened = 0;
    if (!!openedBlock) {
      const index = data.findIndex((el) => el.order === openedBlock);
      idOpened = data[index].id;
    }

    if (!openedBlock) {
      setOpenedBlock(order);
    } else if (idOpened === id) {

      setOpenedBlock(0);
      setOpenedBlocks((prev) => {
        return [...prev, id];
      });

      if (openedBlocks.length === 7){
        alert('congratuate')
      }
    } else {
      setTimeout(() => {
        closeBlock(openedBlock);
        closeBlock(order);
      }, 1000);
      setOpenedBlock(0);
    }
  };

  const blocks = data.map((el) => {
    return (
      <>
        <Block block={el} key={el.order} handleClick={handleClick} />
      </>
    );
  });

  return <div className="grid">{blocks}</div>;
}
