import { FieldValues, SubmitHandler } from "react-hook-form";
import MyForm from "./components/form/MyForm";
import MyInput from "./components/form/MyInput";
import MainLayout from "./components/layouts/MainLayout";
import config from "./config";

function App() {
  console.log(config.serverUrl);
  const obj = { name: "hi" };
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    
  };
  return (
    <>
      <MainLayout />
      <MyForm onSubmit={onSubmit} defaultValues={obj}>
        <MyInput type="text" name="name" />
      </MyForm>
    </>
  );
}

export default App;
