"useclient"

import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button, Card, Input } from "@/components/ui/ui-imports";

export default function AddNewDebt() {
    return (
        <>                <div className="mt-12">
            <h2 className="text-3xl font-bold mb-4">Add New Entries</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="bg-[#1E1E1E]">
                    <CardHeader>
                        <CardTitle>Add Income</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Input className="mb-4" placeholder="Income Source" type="text" />
                        <Input className="mb-4" placeholder="Amount" type="number" />
                        <Button>Add Income</Button>
                    </CardContent>
                </Card>
                <Card className="bg-[#1E1E1E]">
                    <CardHeader>
                        <CardTitle>Add Debt</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Input className="mb-4" placeholder="Name" type="text" />
                        <Input className="mb-4" placeholder="Creditor" type="text" />
                        <Input className="mb-4" placeholder="Amount" type="number" />
                        <Input className="mb-4" placeholder="Date" type="date" />
                        <Input className="mb-4" placeholder="Amount Paid Off" type="number" />
                        <Button>Add Debt</Button>
                    </CardContent>
                </Card>
                <Card className="bg-[#1E1E1E]">
                    <CardHeader>
                        <CardTitle>Add Deposit</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Input className="mb-4" placeholder="Deposit Source" type="text" />
                        <Input className="mb-4" placeholder="Amount" type="number" />
                        <Button>Add Deposit</Button>
                    </CardContent>
                </Card>
            </div></div></>
    )
}
