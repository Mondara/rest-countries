import React from "react";
import { FaChevronDown } from "react-icons/fa";

import "./dropdown.scss";

interface Props {
  title: string;
  list: string[];
  selected: string;
  select: (id: number) => void;
  open: boolean;
  toggleOpen: () => void;
}

export const Dropdown: React.FC<Props> = ({
  title,
  list,
  selected,
  select,
  open,
  toggleOpen,
}) => {
  return (
    <div className="dd-wrapper">
      <button type="button" className="dd-header" onClick={toggleOpen}>
        <div className="dd-header-title">{selected || title}</div>
        <FaChevronDown className="dd-header-icon" />
      </button>
      {open && (
        <div className="dd-list">
          {list.map((region, indx) => (
            <button
              key={indx}
              type="button"
              className="dd-list-item"
              onClick={() => select(indx)}
            >
              {region}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
