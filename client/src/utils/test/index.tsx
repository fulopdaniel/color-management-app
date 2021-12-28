import React from "react";
import { render, RenderOptions } from "@testing-library/react";
import ColorProvider from "../../providers/ColorProvider"
import { BrowserRouter } from "react-router-dom";
import { Formik } from "formik";


const AllTheProviders: React.FC = ({ children }) => {
  return (
    <ColorProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </ColorProvider>
  );
};

export const MockFormik: React.FC = ({children}) => {
  return (
    <Formik initialValues={{}} onSubmit={()=>{}}>
      {children}
    </Formik>
  )
}

const customRender = (ui: any, options?: RenderOptions) =>
  render(ui, { wrapper: AllTheProviders, ...options });



// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };