import { Icons } from "../icons";
import { Badge } from "../ui/badge";

export default function CommandPrompt() {
    return (
        <div className="mb-6 flex items-center justify-start">
            <Icons.terminal className="mr-2" />
            <span className="grow">cmd + k</span>
            <Badge variant="secondary">AI Powered</Badge>
        </div>
    );
}
