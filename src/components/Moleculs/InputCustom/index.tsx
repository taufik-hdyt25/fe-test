import { Input, InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface IInputProps extends InputProps {
  label?: string;
  htmlFor?: string;
  placeHolder?: string;
  error?: string;
  isRequired?: boolean;
}
const InputCustom: React.FC<IInputProps> = ({
  label,
  htmlFor,
  // placeHolder,
  error,
  isRequired,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-2 flex-1">
      {label && (
        <Label htmlFor={htmlFor} className="text-left">
          {label}
          {isRequired && <span className="text-red-500">*</span>}
        </Label>
      )}
      <Input {...props} />
      {error && <div className="text-left text-xs text-red-400">{error}</div>}
    </div>
  );
};

export default InputCustom;
