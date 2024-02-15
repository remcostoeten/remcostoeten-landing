import { Input } from "@/components/ui/input"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { FirebaseForm } from "./FirestormForm"



export default function NewProjectForm() {
    const fields = [
        { name: 'name', type: 'text', placeholder: 'A category name' },
        { name: 'description', type: 'textarea', placeholder: 'Description' },
        // { name: 'category', type: 'select', options: [{ id: 'categories', name: 'Categories' }] },
    ];

    return (
        <FirebaseForm fields={fields} collectionName="categories" />
    )
}

function XIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
        </svg>
    )
}
