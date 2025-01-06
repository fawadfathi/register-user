import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

const Settins = async () => {
  const session = await auth();

  return (
    <div>
      {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
      >
        <Button type="submit">Log Out</Button>
      </form>
    </div>
  );
};

export default Settins;
