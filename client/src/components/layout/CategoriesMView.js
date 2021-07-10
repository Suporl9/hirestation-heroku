import React from "react";
import { Link } from "react-router-dom";

export const CategoriesMView = () => {
  const Categories = [
    "Graphics-And-Design",
    "Game-Development",
    "Web-Programming",
    "Mobile-Apps",
  ];
  return (
    <div className="bg">
      <div className="categorywidth">
        <div className="flexcategoriessec">
          <div className="bigCategori">Categories:</div>
          <div className="ListofCategori">
            {Categories.map((categori, i) => (
              <Link
                to={`/category/${categori}`}
                className="listyleLinkPage"
                key={i}
              >
                <div className="bgforcat">
                  <span className="spancat">{categori}</span>
                </div>
              </Link>
              //   <div className="bgforcat" key="categori">
              //     <span className="spancat">{categori}</span>
              //   </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
