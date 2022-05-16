import React from "react";
import {
  Menu,
  MenuItem,
  Button,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@material-ui/core";
import {
  AttachMoney,
  KeyboardArrowDown,
  KeyboardArrowUp,
  CheckCircle,
  List,
} from "@material-ui/icons";
import AbcIcon from "@mui/icons-material/Abc";

const SortBar = ({ productsSort }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //   const handleSortAtoZ = () => {
  //     setAnchorEl(null);
  //     productsSort("name", "desc");
  //   };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        style={{ marginBottom: "25px" }}
      >
        <List />
        Sort
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => productsSort("created", "asc")}>
          Default
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => productsSort("name", "desc")}>
          <AbcIcon />
          Name (Z to A)
          <KeyboardArrowUp />
        </MenuItem>
        <MenuItem onClick={() => productsSort("name", "asc")}>
          <AbcIcon />
          Name (A to Z)
          <KeyboardArrowDown />
        </MenuItem>
        <MenuItem onClick={() => productsSort("price", "asc")}>
          <AttachMoney />
          Price (Low to High)
          <KeyboardArrowUp />
        </MenuItem>
        <MenuItem onClick={() => productsSort("price", "desc")}>
          <AttachMoney />
          Price (High to Low)
          <KeyboardArrowDown />
        </MenuItem>
      </Menu>
    </div>
  );
};

export default SortBar;
