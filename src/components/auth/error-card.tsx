import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardFooter } from "@/components/ui/card";

export const ErrorCard = () => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader className="items-center">
        <h1 className="text-4xl font-medium mb-5">🔐AUTH</h1>
        Oops! Something went wrong!
      </CardHeader>
      <CardFooter>
        <Button
          variant="link"
          className="font-normal w-full"
          size="sm"
          asChild
        ></Button>
      </CardFooter>
    </Card>
  );
};
