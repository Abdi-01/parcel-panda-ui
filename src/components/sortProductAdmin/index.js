import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Menu,
} from "@material-ui/core/";

const options = [
  "Name: Ascending",
  "Name: Descending",
  "Stock: Low to High",
  "Stock: High to Low",
];

const SortProductAdmin = ({ sort, setSort }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const selectedSort = (index) => {
    if (index === 0) {
      setSort({...sort, column: "name", order: "ASC"})
    } else if (index === 1) {
      setSort({...sort, column: "name", order: "DESC"})
    } else if (index === 2) {
      setSort({...sort, column: "stock", order: "ASC"})
    } else if (index === 3) {
      setSort({...sort, column: "stock", order: "DESC"})
    }
  }

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    selectedSort(index)
    setAnchorEl(null);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  return (
    <div>
      <List component="nav" aria-label="Device settings">
        <ListItem
          button
          aria-haspopup="true"
          aria-controls="lock-menu"
          aria-label="sort by"
          onClick={handleClickListItem}
        >
          <ListItemText primary="Sort by" secondary={options[selectedIndex]} />
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            // disabled={index === 0}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default SortProductAdmin;
