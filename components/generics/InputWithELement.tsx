// Import necessary components from '@c/ui/ui-imports'
import { Label, Input, Checkbox } from '@c/ui/ui-imports';

// Define the prop types for InputWithLabel component
type InputWithLabelProps = {
    label?: any;
    value?: any;
    placeholder?: any;
    className?: any;
    type?: any;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    dark?: boolean;
    light?: boolean;
};

// InputWithLabel component
export default function InputWithLabel({ label, type, className, value, placeholder, onChange, dark, light }: InputWithLabelProps) {
    // Define the inputClass based on the dark and light props
    const inputClass = `border-cream bg-transparent ${dark ? 'dark-text' : light ? 'light-text' : ''}`;

    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            <Label className={dark ? 'dark-text' : 'light-text'}>{label}</Label>
            <Input
                type={type}
                className={inputClass}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
            />
        </div>
    );
}

// Define the prop types for CheckboxWithLabel component
type CheckboxWithLabelProps = {
    label?: any;
    value?: any;
    defaultValue?: any;
    className?: any;
    checked?: any;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

// CheckboxWithLabel component
export const CheckboxWithLabel = ({ label, className, value, defaultValue, checked }: CheckboxWithLabelProps) => {
    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            <Label>{label}</Label>
            <Checkbox value={value} checked={checked} defaultValue={defaultValue} />
        </div>
    );
};
