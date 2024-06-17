import { togglePopper } from "@/library/helper";
import { MenuItem, InputAdornment } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import AppInput from "../input/appInput";
import Loader from "../loader";
import AppPopper from "../popper/appPopper";

const AutoComplete = ({
  options,
  onSearch,
  onSelect,
  label = "",
  placeholder = "Search here",
  loading,
  count,
  disabled,
  initialState,
  onChange = () => {},
  error,
  helperText,
  className,
  index,
}) => {
  const [search, setSearch] = useState(initialState || "");
  const [size, setSize] = useState(5);
  const [menuOptions, setMenuOptions] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const popperRef = useRef(null);

  useEffect(() => {
    setMenuOptions(options);
  }, [options]);

  useEffect(() => {
    setSearch(initialState);
  }, [initialState]);

  const handleSelect = ({ option, description, ...item }) => {
    setSearch(description);
    if (anchorEl) togglePopper(setAnchorEl, popperRef);
    onSelect?.(option, description, index, item);
  };

  const handleChange = ({ target }) => {
    if (!anchorEl) togglePopper(setAnchorEl, popperRef);
    setSearch(target.value);
    onChange();
    onSearch?.(target.value, size);
  };

  const handleFocus = () => {
    if (!anchorEl && !disabled) {
      togglePopper(setAnchorEl, popperRef);
      onSearch?.(search, size);
    }
  };

  const handleLoadMore = () => {
    let temp = size;
    temp += 5;
    setSize(temp);
    onSearch?.(search, temp);
  };

  const render_loader = (
    <div className="min-h-[100px]">
      <Loader width={40} height={40} />
    </div>
  );

  const render_empty = (
    <div className="px-4 py-2 text-sm">No results found</div>
  );

  const render_data = (
    <>
      {menuOptions.map((option, index) => (
        <MenuItem
          key={`${option.value}-${index}`}
          onClick={() => handleSelect(option)}
        >
          {option.description}
        </MenuItem>
      ))}
      {count > size ? (
        <p
          className="h-[30px] text-center align-middle cursor-pointer text-primary-200 text-sm"
          onClick={handleLoadMore}
        >
          Load More
        </p>
      ) : null}
    </>
  );

  return (
    <div className={`w-full ${className}`}>
      <div ref={popperRef} onClick={handleFocus}>
        <AppInput
          value={search || ""}
          onChange={handleChange}
          label={null}
          placeholder={placeholder}
          endAdornment={
            <InputAdornment position="start">
              <FaCaretDown color="rgba(0, 0, 0, 0.54)" />
            </InputAdornment>
          }
          disabled={disabled}
          error={error}
          helperText={helperText}
        />
      </div>
      <AppPopper
        id={`autocomplete-components-menu-items}`}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        placement="bottom"
        sx={{ width: "100%" }}
        className="z-[10000]"
        offset={[0, 5]}
        arrow="false"
      >
        <div className="w-full max-h-[220px] min-w-[300px] overflow-auto overflow-x-hidden">
          {loading
            ? render_loader
            : menuOptions.length === 0
            ? render_empty
            : menuOptions.length
            ? render_data
            : null}
        </div>
      </AppPopper>
    </div>
  );
};
export default AutoComplete;
