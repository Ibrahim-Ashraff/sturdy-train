import React from "react";


export const input = React.forwardRef((props, ref) => {
  let errorMessage = null;
  let inputElem = null;
  let inputClasses = `form-input`;
  if (props.extraClass) {
    inputClasses += ` ${props.extraClass}`;
  }
  if (props.touched && props.validation) {
    if (!props.validation.valid) {
      inputClasses += " form-input--error";
      errorMessage = (
        <p className="form-input--error-message">{props.errorMessage}</p>
      );
    }
  }

  switch (props.type) {

    case "checkbox":
      inputElem = (
        <>
          <label className="checkbox" htmlFor={props.preset.name}>
            <input
              checked={props.preset.checked}
              type={props.type}
              id={props.preset.name}
              className={inputClasses}
              style={props.styles}
              value={props.checked}
              onChange={props.changed}
              {...props.preset}
            />
            <span>{props.preset.label}</span></label>
        </>
      )
      break;

    case "select":
      inputElem = (
        <div className="select-container">
          <select
            ref={ref}
            className={inputClasses}
            value={props.value}
            optionname={props.optionname}
            onChange={props.changed}
            {...props.preset}>
            <option value="">-- Select --</option>
            {props.preset.options && Array.isArray(props.preset.options)
              ? props.preset.options.map((el) => {
                return (
                  <option
                    defaultValue={el.selected}
                    disabled={el.disabled}
                    value={el.id}>
                    {el.name}
                  </option>
                );
              })
              : props.preset.options}
          </select>
        </div>
      )
      break;


    case "input":
      inputElem = (
        <>
          <input
            ref={ref}
            id={props.preset.name}
            className={inputClasses}
            style={props.styles}
            value={props.value}
            onChange={props.changed}
            name={props.preset.name}
            {...props.preset}
          />
        </>
      );
      break;
    case "date":
      inputElem = (
        <>
          <input
            type={props.type}
            id={props.preset.name}
            className={inputClasses}
            style={props.styles}
            value={props.value}
            onChange={props.changed}
            {...props.preset} />
        </>
      );
      break;
    case "textarea":
      inputElem = (
        <textarea
          id={props.preset.name}
          className={inputClasses}
          style={props.styles}
          onChange={props.changed}
          value={props.value}
          {...props.preset}
        ></textarea>
      );
      break;
    case "title":
      inputElem = (
        <>
          <h2 value="">{props.preset.title}</h2>
        </>
      );
      break;

    default:
      break;
  }
  return (
    <React.Fragment>
      {props.type !== "checkbox" && <label className={props.preset.required} htmlFor={props.preset.name}>{props.preset.label}</label>}
      {inputElem}
      {errorMessage}
    </React.Fragment>
  );
});

const FormGroup = (props) => {
  return (
    <div style={props.styles} className="form-group">
      {props.children}
    </div>
  );
};
export default FormGroup;
