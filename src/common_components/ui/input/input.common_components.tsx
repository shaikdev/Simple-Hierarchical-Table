import "./input.common_components.scss";
import { Fragment, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import _ from "lodash";

interface IInputComponent {
  type: string;
  name: string;
  label: string;
  className?: string;
  rules?: any;
  control: any;
  icon?: any;
}

const InputComponent = (props: IInputComponent) => {
  const [focus, setFocus] = useState(false);
  return (
    <Fragment>
      <Controller
        name={props.name}
        rules={props.rules || {}}
        control={props.control}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <Fragment>
            <div className="input_container_label">{props.label}</div>
            <div
              className={`input_field_container ${
                error ? "input_border_error" : null
              }`}
            >
              <div className="input_field_wrapper">
                <input
                  value={value}
                  onChange={onChange}
                  name={props.name}
                  onFocus={() => setFocus(true)}
                  onBlur={() => {
                    setFocus(false);
                  }}
                  className={`input_field ${props.className}`}
                  type={props.type}
                  id={props.name}
                />
              </div>
              {props.icon && <div className="input_eye_wrapper">eye</div>}
            </div>
            {error && (
              <div className="input_field_error_message">{error.message}</div>
            )}
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default InputComponent;
