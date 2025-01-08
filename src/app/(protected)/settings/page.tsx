import { auth, signOut } from "@/auth";

const Settins = async () => {
  const session = await auth();

  return (
    <div className="p-5">
      <div>
        {session && (
          <ul>
            {Object.entries(session).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {JSON.stringify(value)}
              </li>
            ))}
          </ul>
        )}
      </div>

      <form
        action={async () => {
          "use server";

          await signOut();
        }}
      >
        <button
          type="submit"
          className="bg-gray-50 hover:bg-gray-100 border px-2 text-xs py-1 mt-4"
        >
          Log Out
        </button>
      </form>
    </div>
  );
};

export default Settins;
