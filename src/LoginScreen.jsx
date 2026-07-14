import { Button } from "./components/ui/button";
import { auth, provider } from "./firebase";
import { signInWithPopup } from "firebase/auth";

export function LoginScreen() {
  const signIn = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <h1 className="text-6xl text-white">Mental Maths</h1>

      <Button
        className="bg-blue-500 hover:bg-blue-600 p-6"
        onClick={signIn}
      >
        Sign in with Google
      </Button>
    </div>
  );
}