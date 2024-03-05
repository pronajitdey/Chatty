import { ChangeEvent } from "react";

interface FormData {
  [key: string]: string
}

interface DropdownProps {
  labelName: string,
  fieldName: string,
  formData: FormData,
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
}

const Dropdown = ({labelName, formData, fieldName, setFormData}: DropdownProps): React.JSX.Element => {

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev: FormData) => {
      prev[e.target.name] = e.target.value;
      return { ...prev };
    })
  }

  return (
    <div className="w-full flex-col gap-1 md:w-[50%] my-2">
      <label className="text-sm text-[--blue-secondary]" htmlFor="gender">
        {labelName}
      </label>
      <select
        name={fieldName}
        value={formData[fieldName]}
        id="gender"
        onChange={(e) => handleChange(e)}
        className="w-full border border-[--blue-primary] outline-none px-2 py-2 rounded-md shadow-sm font-medium text-sm text-[--blue-primary] placeholder:text-[--gray-primary] placeholder:text-sm placeholder:font-normal "
      >
        <option
          className="checked:bg-[--blue-secondary] checked:text-[--blue-primary]"
          value=""
        >
          Please select your gender
        </option>
        <option
          className="checked:bg-[--blue-secondary] checked:text-[--blue-primary]"
          value="male"
        >
          Male
        </option>
        <option
          className="checked:bg-[--blue-secondary] checked:text-[--blue-primary]"
          value="female"
        >
          Female
        </option>
      </select>
    </div>
  );
}

export default Dropdown