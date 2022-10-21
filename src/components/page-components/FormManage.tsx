import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import CDN from "../../helpers/cdn";
const Form = ({ defaultValues, children, onSubmit }: any) => {
  const methods = useForm({ defaultValues });
  const [called, setCalled] = useState(false);
  return (
    <div className="content">
      <link
        type="text/css"
        rel="stylesheet"
        href={CDN("/css/veri.giris.css")}
      ></link>
      <FormProvider {...methods}>
        <form
          onSubmit={onSubmit && methods.handleSubmit(async (data) => { 
            if (called) return; 
            setCalled(true);
            await onSubmit(data, methods);
            setCalled(false);
          })}
          className={"fd" + (called ? " called" : "")}
          autoComplete="off"
        >
          {Array.isArray(children)
            ? children.map(child => {
              return child?.props.name
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
