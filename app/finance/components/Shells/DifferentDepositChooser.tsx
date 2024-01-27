import { ReactNode } from 'react';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

type TabProps = {
    title: string;
    description: string;
    values: ReactNode;
};

type DifferentDepositChooserProps = {
    tabs: TabProps[];
    defaultTabValue: string;
    t: string; // Assuming t is a string for localization
};

export function DifferentDepositChooser({
    tabs,
    defaultTabValue,
    t,
}: DifferentDepositChooserProps) {
    return (
        <Tabs defaultValue='Debt payoff' className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
                {tabs.map((tab, index) => (
                    <TabsTrigger key={index} value={tab.title}>
                        {tab.title}
                    </TabsTrigger>
                ))}
            </TabsList>
            {tabs.map((tab, index) => (
                <TabsContent key={index} value={tab.title}>
                    <Card>
                        <CardHeader>
                            <CardTitle>{tab.title}</CardTitle>
                            <CardDescription>{tab.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {tab.values}
                        </CardContent>
                        <CardFooter>
                            <Button>{`Save ${tab.title.toLowerCase()}`}</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            ))}
        </Tabs>
    );
}
