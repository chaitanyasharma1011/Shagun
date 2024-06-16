import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import styled from "@emotion/styled";
import dayjs from "dayjs";
// import AppInput from "../input/appInput";

const CustomDatepicker = styled(DatePicker, {
  shouldForwardProp: (props) => props !== "inputStyles",
})(({ theme, inputStyles }) => ({
  width: "100%",
  ".MuiInputLabel-shrink": {
    top: 2,
  },
  ".MuiFormHelperText-root": {
    position: "absolute",
    bottom: "-1.7em",
  },
  "& label": {
    fontFamily: "var(--font-inter)",
    fontSize: 14,
  },
  "& .MuiOutlinedInput-root": {
    // width: 350,
    width: "100%",
    fontFamily: "var(--font-inter)",
    fontSize: 14,
    lineHeight: "1.429em",
    "& input": {
      padding: "10px 14px",
      height: "inherit",
    },
    "& fieldset": {
      borderColor: "black",
    },
  },
  ...inputStyles,
}));

const AppDatepicker = ({
  value = dayjs(),
  views = ["year", "month", "day"],
  name,
  label,
  onChange,
  //   renderInput,
  minDate,
  maxDate,
  disabled,
  sx = {},
  error = false,
  helperText,
  className,
}) => (
  <div className={`w-full ${className}`}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CustomDatepicker
        openTo="year"
        views={views}
        label={label}
        value={value}
        {...(minDate && { minDate })}
        {...(maxDate && { maxDate })}
        onChange={(newValue) =>
          onChange?.({ target: { name, value: newValue } })
        }
        sx={sx}
        error={error}
        helperText={helperText}
        disabled={disabled}
        // renderInput={(params) => (
        //   <AppInput
        //     {...params}
        //     sx={{
        //       width: "100%",
        //       "& .MuiOutlinedInput-root": {
        //         width: "100%",
        //       },
        //     }}
        //     error={error}
        //     helperText={helperText}
        //   />
        // )}
        format="DD/MM/YYYY"
      />
    </LocalizationProvider>
  </div>
);
export default AppDatepicker;
