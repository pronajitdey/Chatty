import { ChangeEvent } from "react";


interface FormData {
  [key: string]: string
}

interface LoginInputFieldProps {
  labelName: string,
  fieldName: string,
  formData: FormData,
  fieldType: string,
  placeholderText: string,
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
}

const LoginInputField = ({
  labelName,
  fieldName,
  formData,
  fieldType,
  placeholderText,
  setFormData,
}: LoginInputFieldProps): React.JSX.Element => {
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => {
      prev[e.target.name] = e.target.value;
      return { ...prev };
    })
  }
  
  return (
    <div className="w-full flex flex-col gap-1 my-2">
      <label className="text-sm text-[--blue-secondary]" htmlFor={fieldName}>
        {labelName}
      </label>
      <input
        name={fieldName}
        value={formData[fieldName]}
        type={fieldType}
        onChange={(e) => {
          handleChange(e);
        }}
        placeholder={placeholderText}
        className="w-full border border-[--blue-primary] outline-none px-2 py-2 rounded-md shadow-sm font-medium text-sm text-[--blue-primary] placeholder:text-[--gray-primary] placeholder:text-sm placeholder:font-normal"
      />
    </div>
  );
};

export default LoginInputField