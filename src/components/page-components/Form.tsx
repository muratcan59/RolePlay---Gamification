import React from "react";
import { useForm, FormProvider } from "react-hook-form";
const Form = ({ defaultValues, children, onSubmit }: any) => {
  const methods = useForm({ defaultValues });
  return (
    <div className="content">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) => onSubmit(data, methods))}
          autoComplete="off"
        >
          {Array.isArray(children)
            ? children.map(child => {
              return child?.props && child?.props.name
                ? React.createElement(child.type, {
                  ...{
                    ...child.props,
                    register: methods.register,
                    key: child.props.name,
                  },
                })
                : child;
            })
            : children}
        </form>
      </FormProvider>
    </div>
  );
};

export default Form;