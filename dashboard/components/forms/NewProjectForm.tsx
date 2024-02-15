import { Input } from "@/components/ui/input"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { FirebaseForm } from "./FirestormForm"



export default function NewProjectForm() {
    const fields = [
        { name: 'Category name', type: 'text', placeholder: 'A category name' },
        { name: 'description', type: 'textarea', placeholder: 'Description' },
        // { name: 'category', type: 'select', options: [{ id: 'categories', name: 'Categories' }] },
    ];

    return (
        <div className="fixed inset-0  bg-opacity-50 overflow-y-auto h-fit w-full flex justify-center items-center">
            <div className="relative bg-background rounded-lg p-6 w-full max-w-md mx-auto">
                <div className="p-6 space-y-6">
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-medium text-gray-300" htmlFor="token-name">

                        </label>
                        <Input id="token-name" placeholder="" />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-medium text-gray-300" htmlFor="environment-scope">
                            Environment scope
                        </label>
                        <Select>
                            <SelectTrigger id="environment-scope">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                                <SelectItem value="development">Development</SelectItem>
                                <SelectItem value="staging">Staging</SelectItem>
                                <SelectItem value="production">Production</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <fieldset>
                        <legend className="mb-2 text-sm font-medium text-gray-300">Expiry</legend>
                        <div className="flex items-center space-x-4">
                            <FirebaseForm fields={fields} collectionName="categories" />
                            <RadioGroup defaultValue="never">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem id="expiry-never" value="never" />
                                    <Label htmlFor="expiry-never">Never</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem id="expiry-7days" value="7days" />
                                    <Label htmlFor="expiry-7days">7 days</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem id="expiry-30days" value="30days" />
                                    <Label htmlFor="expiry-30days">30 days</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem id="expiry-60days" value="60days" />
                                    <Label htmlFor="expiry-60days">60 days</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem id="expiry-90days" value="90days" />
                                    <Label htmlFor="expiry-90days">90 days</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <p className="text-sm text-gray-400 mt-2">This token will never expire.</p>
                    </fieldset>
                </div>
                <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-600">
                    <Button variant="outline">Cancel</Button>
                    <Button>Create</Button>
                </div>
            </div>
        </div>
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
