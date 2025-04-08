import React, { useState } from "react";
import styled from "styled-components/macro";
import downArrowIcon from "../assets/image/downArrow.png";
import Select from "react-select";
// import "./SelectStyle.css";

const InputBorder = styled.div`
  border: ${(props) =>
    props.error
      ? "1px solid red"
      : props.themeColor
      ? "1px solid #333741"
      : props.menuIsOpen
      ? "1px solid #FBA976"
      : "1px solid #D7DAE0"};
  box-shadow: ${(props) =>
    props.menuIsOpen
      ? props.themeColor
        ? "#F05D24"
        : "0px 0px 0px 2px #FEE8D6"
      : ""};
  border-radius: 8px;
  opacity: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: auto;
  height: auto;
  padding: 1px 0px;
  /* border-radius: 8px; */
  width: 100%;
  display: flex;
  background-color: ${(props) => (props.themeColor ? "#161b26" : "#ffffff")};

  img {
    height: 18px;
    width: 18px;
  }

  input {
    font: 1.1rem;
  }
  input::placeholder {
    font-size: 0.8rem !important;
    color: ${(props) => (props.themeColor ? "#94969C" : "#8A94A6")};
  }
`;
export const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* margin-bottom: 0.5rem; */
`;
export const InputLable = styled.label`
  font-size: 0.8rem;
  font-weight: 500;
  margin-bottom: 0.3rem;
  color: ${(props) => (props.themeColor ? "#CECFD2" : "#363a44")};
  margin-bottom: 0.5rem;
  text-transform: capitalize;

  @media (max-width: 351px) {
    font-size: 0.8rem;
  }
`;
export const InBox = styled.div`
  display: flex;
  color: ${(props) => (props.themeColor ? "#94969C" : "#8A94A6")};
  font-size: 0.8rem;
  align-items: center;
  width: 10%;

  img {
    height: 9px;
    width: 9px;
    object-fit: contain;
    margin-left: 4px;
  }
`;
export const BottomText = styled.label`
  font-size: 0.8rem;
  margin-top: 0.3rem;
  font-weight: 500;
  color: ${(props) => (props.themeColor ? "#94969C" : "#363A44")};
  text-transform: capitalize;

  @media (max-width: 351px) {
    font-size: 0.8rem;
  }
`;

export default function Input(props) {
  const {
    error,
    type,
    icon,
    noBorderBottom,
    label,
    star,
    optional,
    cursorNot,
    backColor,
    erroros,
    value,
    feildLoading,
    bottomText,
  } = props;
  const [showPassword, setShowPassword] = useState(false);
  const theme = false;

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      outline: state.isFocused ? "none" : null, // Hide outline on focus
      boxShadow: state.isFocused ? "none" : null, // Hide box shadow on focus
      backgroundColor: theme
        ? cursorNot
          ? "#161B26"
          : "#0C111D"
        : cursorNot
        ? "#F6F7F9"
        : "#ffffff",
      borderColor: error ? "red" : "#D7DAE0",
      // border: theme ? "1px solid #333741" : "none", // Border styles
      border: "none", // Border styles
      borderRadius: "8px",
      textTransform: "capitalize",
      "&:hover": {
        outline: state.isDisabled ? null : "none", // Conditionally hide outline on hover
        boxShadow: state.isDisabled ? null : "none", // Conditionally hide box shadow on hover
      },
    }),
    option: (provided, state) => ({
      ...provided,
      fontSize: "0.8rem", // Set your desired font size for the options
      textTransform: "capitalize",
      fontWeight: "500",
      cursor: state.isDisabled ? "not-allowed" : "default",
      // backgroundColor: "red",
      // backgroundColor: theme ? "#0C111D" : "#ffffff",
      // color: "#CECFD2",

      backgroundColor: state.isDisabled
        ? "#fff"
        : state.isSelected
        ? theme
          ? "#1F242F"
          : "#F6F7F9" // Color for selected option
        : state.isFocused
        ? theme
          ? "#1F242F"
          : "#F6F7F9" // Color for option under mouse pointer
        : theme
        ? "#0C111D"
        : "#ffffff", // Default background color
      color: state.isDisabled
        ? "#e7e7e7"
        : state.isSelected
        ? theme
          ? "#CECFD2"
          : "#363A44"
        : theme
        ? "#CECFD2"
        : "#363A44", // Text color for options
    }),
    // option: (provided, state) => ({
    //   ...provided,
    //   backgroundColor: state.isSelected
    //     ? theme ? "#SOME_SELECTED_COLOR" : "#SOME_OTHER_SELECTED_COLOR" // Color for selected option
    //     : state.isFocused
    //     ? theme ? "#SOME_HOVER_COLOR" : "#SOME_OTHER_HOVER_COLOR" // Color for option under mouse pointer
    //     : theme ? "#0C111D" : "#ffffff", // Default background color
    //   color: state.isSelected ? "#DESIRABLE_TEXT_COLOR_FOR_SELECTED" : "#CECFD2", // Text color for options
    // }),
    // MenuList: (provided, state) => ({
    //   ...provided,
    //   fontSize: "0.8rem", // Set your desired font size for the options
    //   textTransform: "capitalize",
    //   // backgroundColor: theme ? "##0C111D" : "#ffffff",
    //   backgroundColor: "red",
    // }),
    menu: (provided, state) => ({
      ...provided,
      backgroundColor: theme ? "#0C111D" : "#ffffff",
      // You can add other properties here to adjust the menu appearance
      border: theme ? "1px solid #333741" : "1px solid #D7DAE0", // Example to remove any border
      borderRadius: "8px", // Example to adjust border radius
      boxShadow: "0px 2px 4px -1px #0000000F, 0px 4px 6px -1px #0000001A",
      // You can add other properties here to adjust the menu appearance
      padding: "0 3px",
      width: "100%", // Allow the menu to expand
    }),
    MenuList: (provided, state) => ({
      ...provided,
      padding: "0px !important",
      backgroundColor: `${theme ? "#0C111D" : "#ffffff"} !important`,
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: theme ? "#CECFD2" : "#363A44",
      fontSize: "0.8rem", // Font size for the selected value
    }),
    placeholder: (provided, state) => ({
      ...provided,
      fontSize: "0.8rem", // Font size for the placeholder
    }),
    indicatorSeparator: (provided, state) => ({
      ...provided,
      backgroundColor: state.isDisabled ? "#ccc" : "#666", // Change the color based on the disabled state
      width: "0px", // Change the width of the separator
    }),
  };

  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const handleMenuOpen = () => {
    // Set the state to indicate that the menu is open
    setMenuIsOpen(true);
  };

  const handleMenuClose = () => {
    // Set the state to indicate that the menu is closed
    setMenuIsOpen(false);
  };
  return (
    <>
      <InputBox>
        <InputBorder
          menuIsOpen={menuIsOpen}
          error={error || erroros}
          themeColor={theme}
          style={{
            cursor: cursorNot ? "not-allowed" : "",
            opacity: cursorNot ? "0.7" : "1",
          }}
        >
          {icon ? (
            <InBox themeColor={theme}>
              IN <img src={downArrowIcon} alt="" />
            </InBox>
          ) : (
            ""
          )}
          <Select
            styles={customStyles}
            isSearchable={false}
            isClearable={false}
            onMenuOpen={handleMenuOpen}
            onMenuClose={handleMenuClose}
            formatCreateLabel={(userInput) => `${userInput} (Add New Address)`}
            isDisabled={cursorNot}
            {...props}
          />
        </InputBorder>
      </InputBox>
    </>
  );
}
