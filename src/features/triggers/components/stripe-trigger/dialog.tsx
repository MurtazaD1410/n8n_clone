"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const StripeTriggerDialog = ({ open, onOpenChange }: Props) => {
  const params = useParams();
  const workflowId = params.workflowId as string;

  // construct webhook url
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const webhookUrl = `${baseUrl}/api/webhooks/stripe?workflowId=${workflowId}`;

  const copyToClipboard = () => {
    try {
      navigator.clipboard.writeText(webhookUrl);
      toast.success("Webhook URL copied to clipboard");
    } catch (error) {
      console.error("Failed to copy to clipboard", error);
      toast.error("Failed to copy to clipboard");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Stripe Trigger Configuration</DialogTitle>
          <DialogDescription>
            Configure this webhook URL in your Stripe dashboard to trigger the
            workflow when a payment event is received.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="webhook-url">Webhook URL</Label>
            <div className="flex gap-2">
              <Input
                id="webhook-url"
                value={webhookUrl}
                readOnly
                className="font-mono text-sm"
              />
              <Button
                variant="outline"
                size="icon"
                type="button"
                onClick={copyToClipboard}
              >
                <CopyIcon className="size-4" />
              </Button>
            </div>
          </div>
          <div className="rounded-lg bg-muted p-4 space-y-2">
            <h4 className="font-medium text-sm">Setup instructions:</h4>
            <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
              <li>Open your Stripe dashboard</li>
              <li>Go to Developers &rarr; Webhooks</li>
              <li>Click on 'Add endpoint'</li>
              <li>Copy and paste the webhook URL above</li>
              <li>
                Choose the events you want to trigger the workflow for (e.g.
                payment_intent.created)
              </li>
              <li>Save and copy the signing secret</li>
            </ol>
          </div>
          <div className="rounded-lg bg-muted p-4 space-y-2">
            <h4 className="font-medium text-sm">Available Variables</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>
                <code className="bg-background px-1 py-0.5 rounded">
                  {"{{ stripe.amount }}"}
                </code>
                - Amount of the payment
              </li>
              <li>
                <code className="bg-background px-1 py-0.5 rounded">
                  {"{{ stripe.currency }}"}
                </code>
                - Currency of the payment
              </li>
              <li>
                <code className="bg-background px-1 py-0.5 rounded">
                  {"{{ stripe.customer }}"}
                </code>
                - Customer ID of the payment
              </li>
              <li>
                <code className="bg-background px-1 py-0.5 rounded">
                  {"{{ json stripe }}"}
                </code>
                - JSON of the stripe event
              </li>
              <li>
                <code className="bg-background px-1 py-0.5 rounded">
                  {"{{ stripe.eventType }}"}
                </code>
                - Stripe event type (e.g. payment_intent.created)
              </li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
