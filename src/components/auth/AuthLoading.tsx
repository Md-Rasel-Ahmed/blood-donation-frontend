import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

export default function AuthLoading({ label }: { label?: string }) {
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <div>
        <Button disabled size="lg">
          <Spinner data-icon="inline-start" />
          {label}
        </Button>
      </div>
    </div>
  );
}
