/**
 * @date 01-09-2023
 * @param inputType = "text" as string,
 * @param handleKeyPress = (keyPress: any, ...props) => {},
 * @param setName = "" as string,
 * @param setWidth = "" as string,
 * @param textarea = false as boolean,
 * @param setHeight = "" as string,
 * @param placeholder = "" as string,
 * @param textColor = "text-quiz-black" as string,
 * @param bgcolor = "bg-quiz-dark-grey-15" as string,
 * @param extraClassName = "" as string,
 * @param readOnly = false as boolean,
 * @param autoFocus = false as boolean,
 * @param autoComplete = false as boolean,
 */
function InputField({
  inputType = "text" as string,
  handleChange = (change: any, ..._props: any) => { },
  handleKeyPress = (_keyPress: any, ..._props: any) => { },
  id = "" as string,
  setName = "" as string,
  setWidth = "" as string,
  setHeight = "" as string,
  placeholder = "" as string,
  textColor = "text-quiz-black" as string,
  bgcolor = "bg-quiz-grey-15" as string,
  extraClassName = "px-4" as string,
  readOnly = false as boolean,
  autoFocus = false as boolean,
  autoComplete = false as boolean,
  ...rest
}) {
  const InputElement = "input";
  /* here the rest is used to take for other fields like (defultValue/value,key,etc) */
  return (
    <InputElement
      type={inputType}
      autoComplete={autoComplete ? "on" : "off"}
      placeholder={placeholder}
      name={setName}
      id={id ? setName + "-" + id : setName}
      autoFocus={autoFocus}
      readOnly={readOnly}
      className={`${bgcolor} ${textColor} text-left outline-none font-medium ${setHeight ? setHeight : "h-9"} text-quiz-grey ${setWidth ? setWidth : "w-full"} rounded-[20px] text-base leading-4 ${extraClassName}`}
      onChange={handleChange}
      onKeyDown={(event) =>
        handleKeyPress(event)
      }
      {...rest}
    />
  );
}

export default InputField;
