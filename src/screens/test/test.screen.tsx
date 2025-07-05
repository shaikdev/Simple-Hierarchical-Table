import { InputComponent, Validations } from "utils/imports.utils";
import { useForm } from "react-hook-form";
import "./test.screen.scss";
import { yupResolver } from "@hookform/resolvers/yup";

const TestScreen = () => {
  // hook form
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(Validations.testYup),
  });

  const onSubmit = (data: any) => {
    console.log("data", data);
  };
  return (
    <div className="container">
      <div style={{ width: "300px" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputComponent
            control={control}
            type="text"
            name="email"
            label="Email ID"
          />
          <InputComponent
            control={control}
            type="text"
            name="password"
            label="Password"
          />
          <button type="submit">submit</button>
        </form>
      </div>
    </div>
  );
};

export default TestScreen;
